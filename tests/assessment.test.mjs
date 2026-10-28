import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAssessment, isAssessmentReceipt, isReplyToEmail } from '../lib/assessment.ts';
import { handleAssessmentRequest, readIntakeConfig, createAssessmentLimiter } from '../lib/assessment-intake.ts';

const now = 1800000000000;
const env = {
  AS_ASSESSMENT_ENABLED: 'true', AS_ASSESSMENT_RESEND_API_KEY: 're_synthetic_key_for_tests_only',
  AS_ASSESSMENT_FROM: 'sender@example.com', AS_ASSESSMENT_TO: 'owner@example.com',
  AS_ASSESSMENT_SITE_ORIGIN: 'https://asdetailing.org',
};
const valid = { fullName: 'Synthetic Test', phone: '(903) 555-0100', email: 'test@example.com',
  vehicle: 'Test Vehicle', service: 'Signature Detail', condition: 'Needs a reset',
  preferredDate: '2027-02-28', location: 'Test service area', notes: 'Synthetic test only', website: '' };
const key = 'ad8b4475-1abf-4d9b-82b9-63a545a77cb2';
const id = 'b320f861-fae2-465f-9949-9b91c81fc560';
const accepted = async () => Response.json({ id });
const never = async () => { throw new Error('Unexpected network request'); };
function request(body = valid, headers = {}) {
  return new Request('https://asdetailing.org/api/assessment', { method: 'POST',
    headers: { origin: env.AS_ASSESSMENT_SITE_ORIGIN, 'content-type': 'application/json',
      'idempotency-key': key, 'x-assessment-started': String(now), ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body) });
}
const run = (req, config = env, send = accepted, allow = () => true) =>
  handleAssessmentRequest(req, config, send, allow, () => now);

test('configuration fails closed and never uses browser-provided routing', async () => {
  for (const config of [{}, {...env, AS_ASSESSMENT_ENABLED:'false'}, {...env, AS_ASSESSMENT_RESEND_API_KEY:''},
    {...env, AS_ASSESSMENT_TO:'bad'}, {...env, AS_ASSESSMENT_FROM:'sender@example.com\r\nBcc:evil@example.com'},
    ...['http://asdetailing.org','https://user:pass@asdetailing.org','https://asdetailing.org/path','https://asdetailing.org?key=x']
      .map(origin=>({...env, AS_ASSESSMENT_SITE_ORIGIN:origin}))]) {
    assert.equal(readIntakeConfig(config), null);
    assert.equal((await run(request(),config,never)).status,503);
  }
  assert.equal(readIntakeConfig(env).to, 'owner@example.com');
});
test('validation rejects invalid input and honeypot without sending', async () => {
  for (const [field,value] of Object.entries({fullName:'', phone:'123', email:'bad', vehicle:'',
    service:'Free Service',condition:'unknown',preferredDate:'2027-02-30',location:'',
    notes:'x'.repeat(2001),website:'spam'})) {
    assert.equal(validateAssessment({...valid,[field]:value}).ok,false,field);
    assert.equal((await run(request({...valid,[field]:value}),env,never)).status,400,field);
  }
  assert.equal(validateAssessment({...valid, fullName:123}).ok,false);
  assert.equal(validateAssessment({...valid, notes:'\u0000'}).ok,false);
  const result=validateAssessment({...valid, fullName:' Synthetic Test ', to:'evil@example.com'});
  assert.equal(result.data.fullName,'Synthetic Test'); assert.equal(result.data.to,undefined);
});
test('origin, request format, key and retry-window protections run before sending', async () => {
  for (const [headers,status] of [[{origin:'https://evil.example.com'},403],[{origin:''},403],
    [{'sec-fetch-site':'cross-site'},403],[{'content-type':'text/plain'},415],
    [{'idempotency-key':'bad'},409],[{'x-assessment-started':String(now-23*60*60*1000)},409],
    [{'x-assessment-started':String(now+1)},409],[{'x-assessment-started':''},409]]) {
    assert.equal((await run(request(valid,headers),env,never)).status,status);
  }
  assert.equal((await run(new Request('https://asdetailing.org/api/assessment'),env,never)).status,405);
});
test('rejects oversized and malformed bodies without sending',async()=>{
  for(const body of ['{bad',JSON.stringify({...valid,notes:'x'.repeat(13000)})])
    assert.equal((await run(request(body),env,never)).status,400);
});
test('success waits for provider acknowledgement, uses fixed headers and plain text',async()=>{
  let calls=0;
  const result=await run(request({...valid,to:'evil@example.com',subject:'injected'}),env,async(url,options)=>{
    calls++; assert.equal(url,'https://api.resend.com/emails');
    assert.equal(options.redirect,'error'); assert.equal(options.cache,'no-store');
    assert.equal(options.headers['Idempotency-Key'],'as-assessment-'+key);
    assert.equal(options.headers.Authorization,'Bearer '+env.AS_ASSESSMENT_RESEND_API_KEY);
    const body=JSON.parse(options.body);
    assert.deepEqual(body.to,['owner@example.com']); assert.equal(body.from,'sender@example.com');
    assert.equal(body.subject,'A&S vehicle assessment request');
    assert.equal(body.html,undefined); assert.equal(body.reply_to,valid.email);
    assert.match(body.text,/Synthetic Test/); assert.match(body.text,/not a confirmed appointment/);
    return Response.json({id});
  });
  assert.equal(calls,1); assert.equal(result.status,202);
  assert.equal(result.headers.get('cache-control'),'no-store');
  assert.deepEqual(await result.json(),{status:'accepted',messageId:id});
});
test('unchanged retries preserve provider payload and idempotency key',async()=>{
  const sent=[];
  for(let i=0;i<2;i++) await run(request(),env,async(_url,options)=>{
    sent.push([options.headers['Idempotency-Key'],options.body]);return Response.json({id});
  });
  assert.deepEqual(sent[0],sent[1]);
});
test('never treats malformed acknowledgement, provider failure or timeout as success',async()=>{
  for(const send of [
    async()=>Response.json({ok:true}),async()=>Response.json({id:'unsafe'}),
    async()=>new Response('not JSON'),async()=>new Response('x'.repeat(13000)),
    async()=>new Response('',{status:429}),async()=>new Response('',{status:409}),
    async()=>new Response('',{status:500}),async()=>{throw new DOMException('timeout','TimeoutError');}
  ]) {
    const result=await run(request(),env,send);
    assert.equal(result.status,502);
    const body=await result.json(); assert.match(body.error,/couldn't confirm/);
    assert.doesNotMatch(JSON.stringify(body),/Synthetic Test|synthetic_key|has not been sent/);
  }
});
test('rate limits stop sending and reset without retaining raw phone numbers',async()=>{
  assert.equal((await run(request(),env,never,()=>false)).status,429);
  let time=now; const allow=createAssessmentLimiter(()=>time);
  assert.equal(allow('(903) 555-0100'),true);
  assert.equal(allow('9035550100'),true);
  assert.equal(allow('9035550100'),true);
  assert.equal(allow('9035550100'),false);
  for(let i=0;i<27;i++)assert.equal(allow(String(1000000000+i)),true);
  assert.equal(allow('9999999999'),false);
  time+=60000;assert.equal(allow('9035550100'),true);
});
test('client only accepts the email acceptance contract, not old CRM receipts',()=>{
  assert.equal(isAssessmentReceipt({status:'accepted',messageId:id}),true);
  for(const receipt of [{status:'received',inquiryId:id},{ok:true},{status:'accepted'}, {status:'accepted',messageId:'<script>'}])
    assert.equal(isAssessmentReceipt(receipt),false);
});

test('Reply-To supports one validated optional customer address without changing routing',async()=>{
  for(const email of ['customer+details@example.com','first.last@example.co.uk','']) {
    let sent;
    const result=await run(request({...valid,email}),env,async(_url,options)=>{
      sent=JSON.parse(options.body);return Response.json({id});
    });
    assert.equal(result.status,202);
    assert.deepEqual(sent.to,['owner@example.com']);assert.equal(sent.from,'sender@example.com');
    assert.equal(sent.subject,'A&S vehicle assessment request');
    assert.equal(sent.reply_to,email || undefined);
    assert.equal(Object.hasOwn(sent,'reply_to'),Boolean(email));
  }
});
test('rejects malformed, multiple and header-injection Reply-To values before provider calls',async()=>{
  const emails=['one@example.com,two@example.com','one@example.com;two@example.com',
    'Name <one@example.com>','one@example.com\r\nBcc: two@example.com',
    'one@example.com\r\n','\none@example.com','one@example.com\nReply-To: two@example.com',
    'one..two@example.com','.one@example.com','one.@example.com','one@-example.com',
    'one@example-.com','one@exam_ple.com','one@example..com','one@localhost',
    'one@@example.com','"one"@example.com','oné@example.com','a'.repeat(65)+'@example.com'];
  for(const email of emails) {
    assert.equal(isReplyToEmail(email),false,email);
    assert.equal((await run(request({...valid,email}),env,never)).status,400,email);
  }
});
