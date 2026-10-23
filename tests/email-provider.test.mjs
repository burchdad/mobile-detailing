import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ResendEmailProvider, readEmailConfig } from '../lib/crm/email-provider.ts';
import { processOutbox } from '../lib/crm/outbox.ts';
const now = Date.parse('2026-10-23T15:00:00Z');
const id = '10000000-0000-4000-8000-000000000001';
const config = { apiKey: 're_synthetic_not_a_real_key', from: 'alerts@example.com', to: 'owner@example.com', siteOrigin: 'https://example.com' };
const input = () => ({ inquiryId: id, idempotencyKey: `as-outbox-${id}`, fullName: 'Synthetic private name', service: 'Synthetic service', firstAttemptAt: new Date(now).toISOString(), signal: new AbortController().signal });
const env = { AS_CRM_EMAIL_ENABLED: 'true', AS_CRM_EMAIL_API_KEY: config.apiKey, AS_CRM_EMAIL_FROM: config.from, AS_CRM_EMAIL_TO: config.to, AS_CRM_SITE_ORIGIN: config.siteOrigin };
test('email config defaults off and rejects ambiguous recipients and origins', () => {
  assert.equal(readEmailConfig({}), null);
  assert.equal(readEmailConfig({ ...env, AS_CRM_EMAIL_ENABLED: 'false' }), null);
  for (const to of ['owner@example.com,other@example.com', 'Owner <owner@example.com>', 'owner@example.com\r\nBcc: x@example.com']) assert.equal(readEmailConfig({ ...env, AS_CRM_EMAIL_TO: to }), null);
  for (const origin of ['http://example.com', 'https://user:pass@example.com', 'https://example.com/path', 'https://example.com:123']) assert.equal(readEmailConfig({ ...env, AS_CRM_SITE_ORIGIN: origin }), null);
  assert.deepEqual(readEmailConfig(env), config);
});
test('fixed endpoint, no redirects, stable idempotency and privacy-minimized plaintext', async () => {
  const requests = [];
  const provider = new ResendEmailProvider(config, async (url, init) => { requests.push({url,init}); return Response.json({id}); }, () => now);
  assert.deepEqual(await provider.send(input()), {messageId:id});
  await provider.send({...input(), fullName: 'Different name', service:'Changed service'});
  assert.equal(requests[0].url, 'https://api.resend.com/emails');
  assert.equal(requests[0].init.redirect, 'error');
  assert.equal(requests[0].init.headers['Idempotency-Key'], `as-outbox-${id}`);
  assert.equal(requests[0].init.body, requests[1].init.body);
  assert.doesNotMatch(requests[0].init.body, /Synthetic private|Synthetic service|Different name/);
  assert.deepEqual(JSON.parse(requests[0].init.body).to, ['owner@example.com']);
});
test('expired, missing, future or aborted attempt never reaches transport', async () => {
  let calls = 0;
  const provider = new ResendEmailProvider(config, async () => { calls++; return Response.json({id}); }, () => now);
  for (const firstAttemptAt of [undefined, 'invalid', new Date(now + 1).toISOString(), new Date(now - 23*3600000).toISOString()]) {
    await assert.rejects(provider.send({...input(), firstAttemptAt}));
  }
  await assert.rejects(provider.send({...input(), signal:AbortSignal.abort()}));
  await assert.rejects(provider.send({...input(), idempotencyKey:'wrong'}));
  await assert.rejects(provider.send({...input(), inquiryId:'bad\r\n'}));
  assert.equal(calls,0);
});
test('unconfirmed/error/malformed provider responses fail without leaking their body', async () => {
  for (const response of [new Response('sensitive provider error',{status:429}), Response.json({id:'bad'}), new Response('not JSON')]) {
    const provider = new ResendEmailProvider(config, async () => response, () => now);
    await assert.rejects(provider.send(input()), {message:"Email delivery unconfirmed."});
  }
});
test('worker forwards durable first attempt and enforces lease-safe timeout bounds before claiming', async () => {
  let calls=0;
  const db={call:async name => { calls++; return name==='as_claim_outbox' ? [{id,tenant:'as-detailing',inquiryId:id,leaseToken:id,firstAttemptAt:input().firstAttemptAt,payload:{fullName:'Synthetic',service:'Service'}}] : true; }};
  for (const ms of [0,-1,30001,NaN,1.5]) await assert.rejects(processOutbox(db,{},ms));
  assert.equal(calls,0);
  const result=await processOutbox(db,{send:async value=>{assert.equal(value.firstAttemptAt,input().firstAttemptAt);return {messageId:id};}});
  assert.equal(result.sent,1);
});
test('SQL retention protection fails old attempts and preserves original first attempt', () => {
  const sql=readFileSync(new URL('../db/as-crm-schema.sql',import.meta.url),'utf8');
  assert.match(sql,/first_attempt_at timestamptz/);
  assert.match(sql,/first_attempt_at=COALESCE\(first_attempt_at,now\(\)\)/);
  assert.match(sql,/last_error='delivery_window_expired'/);
  assert.match(sql,/first_attempt_at>now\(\)-interval '23 hours'/);
});
test('configured worker makes no calls when either independent switch/config is missing', async () => {
  const {runConfiguredOutbox}=await import('../lib/crm/worker.ts');
  const never=async()=>{throw new Error('Transport must not run');};
  assert.deepEqual(await runConfiguredOutbox({},never),{enabled:false});
  assert.deepEqual(await runConfiguredOutbox(env,never),{enabled:false});
  assert.deepEqual(await runConfiguredOutbox({...env, AS_CRM_ENABLED:'true'},never),{enabled:false});
});

test('transport failures are sanitized and provider acceptance is labeled honestly', async () => {
  const provider=new ResendEmailProvider(config,async()=>{throw new Error('sensitive transport error');},()=>now);
  await assert.rejects(provider.send(input()),{message:'Email delivery unconfirmed.'});
  assert.match(readFileSync(new URL('../components/StaffDashboard.tsx',import.meta.url),'utf8'),/accepted by email provider/);
});
