import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readCrmConfig } from '../lib/crm/config.ts';
import { handleIntake, handleList, handleUpdate, handleLogin, handleLogout } from '../lib/crm/handlers.ts';
import { digest, hashPassword, verifyPassword, requireSession, sessionCookie, sessionCookieName } from '../lib/crm/auth.ts';
import { DatabaseRpc, limitedJson } from '../lib/crm/rpc.ts';
import { CrmError, TENANT } from '../lib/crm/types.ts';
import { processOutbox, MockEmailProvider } from '../lib/crm/outbox.ts';

const env = { AS_CRM_ENABLED:'true', AS_CRM_DATABASE_URL:'https://abcdefghijklmnopqrst.supabase.co', AS_CRM_SERVICE_KEY:'server-only-test-key-'.repeat(3), AS_CRM_SITE_ORIGIN:'https://asdetailing.org', AS_CRM_INTAKE_TOKEN:'intake-only-test-key-'.repeat(3) };
const assessment = { fullName:'Synthetic Test',phone:'(555) 010-1234',email:'',vehicle:'2024 Test Car',service:'Signature Detail',condition:'Needs a reset',preferredDate:'2026-12-01',location:'Synthetic location',notes:'Test only' };
const token = 'b'.repeat(64);
const leadId = '12345678-1234-4234-8234-123456789abc';
const session = { id:randomUUID(),tenant:TENANT,email:'staff@example.invalid',role:'owner',active:true,expiresAt:'2099-01-01T00:00:00.000Z' };
const req = (path, body, options = {}) => new Request(`https://asdetailing.org${path}`, { method:options.method ?? (body ? 'POST' : 'GET'),headers:{ 'Content-Type':'application/json',origin:'https://asdetailing.org',cookie:`${sessionCookieName}=${token}`,...options.headers },...(body === undefined ? {} : { body:JSON.stringify(body) }) });
const intakeReq = (body = assessment, key = randomUUID(), extra = {}) => req('/api/crm/intake', {schemaVersion:1,source:'as-website-assessment',assessment:body,...extra}, {headers:{authorization:`Bearer ${env.AS_CRM_INTAKE_TOKEN}`,'idempotency-key':key}});
const update = {stage:'contacted',followUpDueAt:null,note:'Call attempted',version:1};
const stub = (fn) => ({ call:fn });
const receipt = {stored:true,notificationQueued:true,inquiryId:leadId};

test('CRM activation fails closed for missing flags/config and unsupported endpoints', () => {
  assert.equal(readCrmConfig({}),null);
  for (const changed of [{AS_CRM_ENABLED:'false'},{AS_CRM_SERVICE_KEY:''},{AS_CRM_DATABASE_URL:'http://localhost'},{AS_CRM_DATABASE_URL:'https://evil.example'},{AS_CRM_DATABASE_URL:'https://abcdefghijklmnopqrst.supabase.co/other'},{AS_CRM_SITE_ORIGIN:'http://asdetailing.org'},{AS_CRM_DATABASE_URL:'https://user:pass@abcdefghijklmnopqrst.supabase.co'}]) assert.equal(readCrmConfig({...env,...changed}),null);
  assert.ok(readCrmConfig(env));
});
test('disabled intake and staff API never call persistence', async () => {
  const db = stub(() => { throw new Error('must not call'); });
  assert.equal((await handleIntake(intakeReq(),{},db)).status,503);
  assert.equal((await handleList(req('/api/admin/leads'),{},db)).status,503);
});
test('opaque session rejects absent, duplicate and forged cookies without DB access',async () => {
  for (const cookie of ['',`${sessionCookieName}=admin`,`${sessionCookieName}=${token}; ${sessionCookieName}=${token}`]) {
    await assert.rejects(requireSession(req('/api/admin/leads',undefined,{headers:{cookie,'x-organization-id':TENANT,'x-user-role':'owner'}}),stub(() => assert.fail('unexpected database lookup'))),{status:401});
  }
});
test('expired/revoked/disabled/cross-tenant/nonstaff sessions cannot read leads',async () => {
  for (const value of [null,{...session,active:false},{...session,tenant:'another-client'},{...session,role:'customer'},{...session,expiresAt:'2000-01-01T00:00:00Z'},{...session,expiresAt:'nonsense'}]) {
    const calls=[]; const result = await handleList(req('/api/admin/leads'),env,stub(async name => { calls.push(name);return value; }));
    assert.equal(result.status,401); assert.deepEqual(calls,['as_session']);
  }
});
test('forged organization query fields are rejected after genuine session lookup',async () => {
  const result = await handleList(req('/api/admin/leads?organizationId=another-client'),env,stub(async name => { assert.equal(name,'as_session');return session; }));
  assert.equal(result.status,400);
});
test('staff listing carries only server-hashed session and fixed filters, never headers',async () => {
  const result=await handleList(req('/api/admin/leads?filter=due',{},{method:'POST',headers:{'x-organization-id':'evil'}}),env,stub(async (name,args)=> {
    if(name==='as_session') return session;
    assert.deepEqual(args,{p_session_hash:digest(token),p_filter:'due',p_offset:0});
    return {leads:[{tenant:TENANT}],hasMore:false};
  }));
  assert.equal(result.status,200); assert.match(result.headers.get('cache-control'),/no-store/);
  const body=await result.json(); assert.equal(body.calendarStatus,'not_connected'); assert.equal(body.emailStatus,'provider_not_connected');
});
test('database cross-tenant return is withheld rather than leaked',async()=>{
  const response=await handleList(req('/api/admin/leads'),env,stub(async name=>name==='as_session'?session:{leads:[{tenant:'another-client',fullName:'Private'}],hasMore:false}));
  assert.equal(response.status,503); assert.doesNotMatch(await response.text(),/Private/);
});
test('mutations reject cross-origin and host-derived origin spoofing',async()=>{
  for(const origin of ['https://evil.example','null','https://preview.example']) {
    const response=await handleUpdate(req(`/api/admin/leads/${leadId}`,update,{method:'PATCH',headers:{origin}}),leadId,env,stub(()=>assert.fail('database access')));
    assert.equal(response.status,403);
  }
});
test('mutations reject spoofed organization, relation and role inputs',async()=>{
  for(const extra of [{tenant:'other'},{organizationId:'other'},{customerId:randomUUID()},{role:'owner'},{session:{role:'owner'}}]) {
    const response=await handleUpdate(req(`/api/admin/leads/${leadId}`,{...update,...extra},{method:'PATCH'}),leadId,env,stub(async name=>{assert.equal(name,'as_session');return session;}));
    assert.equal(response.status,400);
  }
});
test('mutation validates lengths, stages, dates and optimistic version',async()=>{
  for(const change of [{stage:'admin'},{version:0},{version:1.5},{note:'x'.repeat(2001)},{followUpDueAt:'tomorrow'},{followUpDueAt:'2026-10-10'},{note:'bad\u0000value'},{manualBookingConfirmed:'true'}]) {
    const response=await handleUpdate(req(`/api/admin/leads/${leadId}`,{...update,...change},{method:'PATCH'}),leadId,env,stub(async name=>{assert.equal(name,'as_session');return session;}));
    assert.equal(response.status,400);
  }
});
test('valid mutation sends verified session, version and explicit booking acknowledgment',async()=>{
  const response=await handleUpdate(req(`/api/admin/leads/${leadId}`,{...update,stage:'booked',manualBookingConfirmed:true},{method:'PATCH'}),leadId,env,stub(async(name,args)=> {
    if(name==='as_session')return session;
    assert.equal(name,'as_update_lead'); assert.equal(args.p_session_hash,digest(token));assert.equal(args.p_booking_confirmed,true);assert.equal(args.p_version,1);return {updated:true};
  })); assert.equal(response.status,200);
});
test('session revocation at the DB mutation boundary is honored',async()=>{
  const response=await handleUpdate(req(`/api/admin/leads/${leadId}`,update,{method:'PATCH'}),leadId,env,stub(async name=>{if(name==='as_session')return session;throw new CrmError(401,'Please sign in again.');}));
  assert.equal(response.status,401);
});
test('intake credential is distinct from staff cookie and cannot read leads',async()=>{
  assert.equal((await handleIntake(req('/api/crm/intake',{schemaVersion:1,source:'as-website-assessment',assessment},{headers:{'idempotency-key':randomUUID()}}),env,stub(()=>assert.fail()))).status,401);
  assert.equal((await handleList(req('/api/admin/leads',undefined,{headers:{cookie:'',authorization:`Bearer ${env.AS_CRM_INTAKE_TOKEN}`}}),env,stub(()=>assert.fail()))).status,401);
});
test('intake rejects tenant/session injection at envelope and assessment level',async()=>{
  for(const request of [intakeReq(assessment,randomUUID(),{organizationId:'evil'}),intakeReq({...assessment,organizationId:'evil'}),intakeReq(assessment,randomUUID(),{session:{role:'owner'}})]) {
    assert.equal((await handleIntake(request,env,stub(()=>assert.fail('must not persist')))).status,400);
  }
});
test('intake sends canonical phone/email hash and returns repair-compatible durable receipt',async()=>{
  const captures=[];
  for(const phone of ['(555) 010-1234','+1 555-010-1234']) {
    const response=await handleIntake(intakeReq({...assessment,phone,email:'Test@Example.Invalid'}),env,stub(async(name,args)=>{assert.equal(name,'as_accept_inquiry');captures.push(args);return receipt;}));
    assert.equal(response.status,201); assert.deepEqual(await response.json(),receipt);
  }
  assert.equal(captures[0].p_payload_hash,captures[1].p_payload_hash);
  assert.equal(captures[0].p_assessment.phone,'5550101234'); assert.equal(captures[0].p_assessment.email,'test@example.invalid');
});
test('an incomplete/generic success receipt never becomes accepted',async()=>{
  for(const result of [{},{stored:true},{...receipt,notificationQueued:false},{...receipt,inquiryId:'unsafe value'}]) {
    assert.equal((await handleIntake(intakeReq(),env,stub(async()=>result))).status,503);
  }
});
test('conflicting retry and upstream failure remain errors without exposing PII',async()=>{
  const conflict=await handleIntake(intakeReq(),env,stub(async()=>{throw new CrmError(409,'This request changed.');}));assert.equal(conflict.status,409);
  const response=await handleIntake(intakeReq(),env,stub(async()=>{throw new Error('Secret connection and customer data');}));
  assert.equal(response.status,503);assert.doesNotMatch(await response.text(),/Secret|customer data/);
});
test('password hashes use random salts and constant-size validation',async()=>{
  const password='Synthetic-only-long-password';
  const first=await hashPassword(password),second=await hashPassword(password);
  assert.notEqual(first,second);assert.ok(await verifyPassword(password,first));assert.equal(await verifyPassword('wrong',first),false);assert.equal(await verifyPassword(password,'plaintext'),false);
});
test('login creates a hashed opaque token and secure host-only cookie',async()=>{
  const password='Synthetic-only-long-password';const passwordHash=await hashPassword(password);let issuedHash;
  const response=await handleLogin(req('/api/admin/session',{email:'STAFF@EXAMPLE.INVALID',password}),env,stub(async(name,args)=> {
    if(name==='as_login_candidate'){assert.equal(args.p_email,'staff@example.invalid');return {id:session.id,tenant:TENANT,passwordHash};}
    assert.equal(name,'as_create_session');issuedHash=args.p_session_hash;return true;
  }));
  assert.equal(response.status,200);const cookie=response.headers.get('set-cookie'); assert.match(cookie,/HttpOnly; Secure; SameSite=Strict/);assert.match(cookie,/__Host-as_staff=/);
  const issuedToken=cookie.split(';')[0].split('=')[1];assert.equal(issuedHash,digest(issuedToken));assert.notEqual(issuedHash,issuedToken);
});
test('login cannot accept arbitrary client role or disabled staff mid-login',async()=>{
  const password='Synthetic-only-long-password';const passwordHash=await hashPassword(password);
  assert.equal((await handleLogin(req('/api/admin/session',{email:'staff@example.invalid',password,role:'owner'}),env,stub(()=>assert.fail()))).status,400);
  const response=await handleLogin(req('/api/admin/session',{email:'staff@example.invalid',password}),env,stub(async name=>name==='as_login_candidate'?{id:session.id,tenant:TENANT,passwordHash}:false));assert.equal(response.status,401);
});
test('logout revokes server session before clearing cookie',async()=>{
  const calls=[];const response=await handleLogout(req('/api/admin/session',undefined,{method:'DELETE'}),env,stub(async(name,args)=>{calls.push(name);assert.equal(args.p_session_hash,digest(token));return true;}));
  assert.deepEqual(calls,['as_revoke_session']);assert.match(response.headers.get('set-cookie'),/Max-Age=0/);assert.equal(response.status,200);
});
test('DB transport sends server-only credentials and rejects redirect/errors',async()=>{
  const cfg=readCrmConfig(env);
  const rpc=new DatabaseRpc(cfg,async(url,options)=>{assert.equal(url,`${env.AS_CRM_DATABASE_URL}/rest/v1/rpc/as_session`);assert.equal(options.redirect,'error');assert.equal(options.headers.apikey,env.AS_CRM_SERVICE_KEY);return Response.json({error:'conflict'});});
  await assert.rejects(rpc.call('as_session',{}),{status:409});
  const failed=new DatabaseRpc(cfg,async()=>Response.json({secret:'leak'},{status:500}));await assert.rejects(failed.call('as_session',{}),error=>error.status===503&&!error.message.includes('leak'));
});
test('streamed request body limits are enforced without content-length',async()=>{
  const body=new ReadableStream({start(controller){controller.enqueue(new TextEncoder().encode('x'.repeat(12001)));controller.close();}});
  await assert.rejects(limitedJson(new Request('https://asdetailing.org',{method:'POST',body,duplex:'half'})),{status:400});
});
const job = {id:randomUUID(),tenant:TENANT,inquiryId:leadId,leaseToken:randomUUID(),attempts:1,payload:{fullName:'Synthetic Test',service:'Signature Detail'}};
test('mock email duplicate delivery keys produce one logical delivery',async()=>{
  const provider=new MockEmailProvider();const db=stub(async name=>name==='as_claim_outbox'?[job]:true);
  assert.deepEqual(await processOutbox(db,provider),{sent:1,retried:0,uncertain:0});
  await processOutbox(db,provider);assert.equal(provider.deliveries.size,1);
});
test('outbox timeout produces retry, preserves stable delivery key',async()=>{
  const settlements=[];const db=stub(async(name,args)=>{if(name==='as_claim_outbox')return [job];settlements.push(args);return true;});
  const result=await processOutbox(db,{send:()=>new Promise(()=>{})},5);
  assert.deepEqual(result,{sent:0,retried:1,uncertain:0});assert.equal(settlements[0].p_provider_id,null);assert.equal(settlements[0].p_lease_token,job.leaseToken);
});
test('outbox successful send with failed acknowledgement remains uncertain and retry-safe',async()=>{
  const provider=new MockEmailProvider();const db=stub(async name=>{if(name==='as_claim_outbox')return [job];throw new Error('connection lost');});
  assert.deepEqual(await processOutbox(db,provider),{sent:0,retried:0,uncertain:1});await processOutbox(db,provider);assert.equal(provider.deliveries.size,1);
});
test('outbox cross-tenant job is refused before provider call',async()=>{
  await assert.rejects(processOutbox(stub(async()=>[{...job,tenant:'another-client'}]),{send:()=>assert.fail('must not send')}),/Tenant mismatch/);
});
test('stale lease settlement never claims confirmed delivery',async()=>{
  const result=await processOutbox(stub(async name=>name==='as_claim_outbox'?[job]:false),new MockEmailProvider());assert.equal(result.sent,0);assert.equal(result.uncertain,1);
});
test('email header/query injection is rejected by intake validation',async()=>{
  for(const email of ['customer@example.com?bcc=other%40example.net','customer@example.com#body','customer@example.com&subject=bad']) {
    assert.equal((await handleIntake(intakeReq({...assessment,email}),env,stub(()=>assert.fail('must not persist')))).status,400);
  }
});
test('outbox claims only work it can start immediately',async()=>{
  await processOutbox(stub(async(name,args)=>{if(name==='as_claim_outbox'){assert.equal(args.p_limit,1);return [job];}return true;}),new MockEmailProvider());
});
test('modern Supabase secret keys are sent only as apikey, never as bearer JWT',async()=>{
  const cfg={...readCrmConfig(env),serviceKey:'sb_secret_synthetic_review_only_no_actual_credential'};
  const rpc=new DatabaseRpc(cfg,async(_,options)=>{assert.equal(options.headers.apikey,cfg.serviceKey);assert.equal(options.headers.Authorization,undefined);return Response.json(null);});
  assert.equal(await rpc.call('as_session',{}),null);
});
test('malformed and oversized provider responses are upstream failures, not customer errors',async()=>{
  for(const response of [new Response('not json'),Response.json({padding:'x'.repeat(2_000_001)})]) {
    await assert.rejects(new DatabaseRpc(readCrmConfig(env),async()=>response).call('as_session',{}),{status:503});
  }
});
test('stage update never reports success from a generic database response',async()=>{
  for(const value of [null,{},false,{updated:false}]) {
    const response=await handleUpdate(req(`/api/admin/leads/${leadId}`,update,{method:'PATCH'}),leadId,env,stub(async name=>name==='as_session'?session:value));
    assert.equal(response.status,503);
  }
});
test('parallel unchanged retry handlers preserve the same key/hash and committed receipt (mock RPC contract)',async()=>{
  const key=randomUUID();const calls=[];const db=stub(async(name,args)=>{calls.push({name,args});await new Promise(resolve=>setTimeout(resolve,2));return receipt;});
  const responses=await Promise.all(Array.from({length:12},()=>handleIntake(intakeReq(assessment,key),env,db)));
  assert.equal(calls.length,12);assert.equal(new Set(calls.map(x=>x.args.p_request_id)).size,1);assert.equal(new Set(calls.map(x=>x.args.p_payload_hash)).size,1);
  for(const response of responses){assert.equal(response.status,201);assert.deepEqual(await response.json(),receipt);}
  // The database integration suite, not this mock, must prove one row under concurrency.
});
