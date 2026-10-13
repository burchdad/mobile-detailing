import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAssessment, isAssessmentReceipt } from '../lib/assessment.ts';
import { handleAssessmentRequest, readIntakeConfig } from '../lib/assessment-intake.ts';

const valid = {
  fullName: 'Test Customer', phone: '(903) 555-0100', email: 'test@example.com',
  vehicle: 'Test Vehicle', service: 'Signature Detail', condition: 'Needs a reset',
  preferredDate: '2027-02-28', location: 'Test service area', notes: 'Synthetic test only', website: '',
};
const env = { AS_INTAKE_ENABLED: 'true', AS_INTAKE_WEBHOOK_URL: 'https://intake.example.com/assessment', AS_INTAKE_WEBHOOK_TOKEN: 'synthetic-test-token' };
const requestId = 'ad8b4475-1abf-4d9b-82b9-63a545a77cb2';
function request(body = valid, headers = {}) {
  return new Request('https://asdetailing.org/api/assessment', {
    method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: { origin: 'https://asdetailing.org', 'content-type': 'application/json', 'idempotency-key': requestId, ...headers },
  });
}
const receipt = () => Response.json({ stored: true, notificationQueued: true, inquiryId: 'test_inquiry_1' });

test('validates and trims only allowlisted fields', () => {
  const result = validateAssessment({ ...valid, fullName: ' Test Customer ', injected: 'discard' });
  assert.equal(result.ok, true); assert.equal(result.data.fullName, 'Test Customer');
  assert.equal(result.data.injected, undefined); assert.equal(result.data.website, undefined);
});
for (const [field, value] of Object.entries({ fullName: '', phone: '123', email: 'bad', vehicle: '', service: 'Free Service', condition: 'unknown', preferredDate: '2027-02-30', location: '', notes: 'x'.repeat(2001), website: 'spam' })) {
  test(`rejects invalid ${field}`, () => assert.equal(validateAssessment({ ...valid, [field]: value }).ok, false));
}
test('accepts optional email and notes but rejects non-string fields and control characters', () => {
  assert.equal(validateAssessment({ ...valid, email: '', notes: '' }).ok, true);
  assert.equal(validateAssessment({ ...valid, fullName: 123 }).ok, false);
  assert.equal(validateAssessment({ ...valid, notes: '\u0000' }).ok, false);
  assert.equal(validateAssessment([]).ok, false);
});
test('receipt requires an explicit status and safe identifier', () => {
  assert.equal(isAssessmentReceipt({ status: 'received', inquiryId: 'test_1' }), true);
  for (const item of [{ ok: true }, { status: 'received' }, { status: 'received', inquiryId: '<script>' }]) assert.equal(isAssessmentReceipt(item), false);
});
test('configuration fails closed', () => {
  for (const config of [{}, { ...env, AS_INTAKE_ENABLED: 'false' }, { ...env, AS_INTAKE_WEBHOOK_TOKEN: '' }, ...['http://intake.example.com', 'https://localhost', 'https://127.0.0.1/a', 'https://user:pass@intake.example.com', 'https://intake.example.com?token=secret'].map(url => ({ ...env, AS_INTAKE_WEBHOOK_URL: url }))]) assert.equal(readIntakeConfig(config), null);
  assert.equal(readIntakeConfig(env).url, env.AS_INTAKE_WEBHOOK_URL);
});
test('unconfigured intake returns 503 and never sends data', async () => {
  const result = await handleAssessmentRequest(request(), {}, () => { throw new Error('Unexpected network request'); });
  assert.equal(result.status, 503); assert.match((await result.json()).error, /has not been sent/);
});
test('rejects cross-origin requests, unsupported formats, and invalid idempotency keys', async () => {
  for (const [headers, status] of [[{ origin: 'https://other.example.com' }, 403], [{ origin: '' }, 403], [{ 'sec-fetch-site': 'cross-site' }, 403], [{ 'content-type': 'text/plain' }, 415], [{ 'idempotency-key': '' }, 400]]) {
    const result = await handleAssessmentRequest(request(valid, headers), env, () => { throw new Error('Unexpected network request'); });
    assert.equal(result.status, status);
  }
});
test('rejects malformed and oversized request bodies, including absent length', async () => {
  for (const payload of ['{invalid', JSON.stringify({ ...valid, notes: 'x'.repeat(13000) })]) {
    assert.equal((await handleAssessmentRequest(request(payload), env)).status, 400);
  }
});
test('confirmed durable save and notification queue returns a receipt', async () => {
  let calls = 0;
  const result = await handleAssessmentRequest(request(), env, async (url, options) => {
    calls++; assert.equal(url, env.AS_INTAKE_WEBHOOK_URL);
    assert.equal(options.headers['Idempotency-Key'], requestId);
    assert.equal(options.headers.Authorization, 'Bearer synthetic-test-token');
    assert.equal(options.redirect, 'error'); assert.equal(options.cache, 'no-store');
    const body = JSON.parse(options.body);
    assert.equal(body.source, 'as-website-assessment'); assert.equal(body.assessment.fullName, valid.fullName);
    assert.equal(body.assessment.website, undefined); assert.equal(body.appointment, undefined);
    return receipt();
  });
  assert.equal(calls, 1); assert.equal(result.status, 201);
  assert.deepEqual(await result.json(), { status: 'received', inquiryId: 'test_inquiry_1' });
  assert.equal(result.headers.get('cache-control'), 'no-store');
});
test('retries forward the same idempotency key to the durable receiver', async () => {
  const seen = [];
  for (let index = 0; index < 2; index++) await handleAssessmentRequest(request(), env, async (_url, options) => { seen.push(options.headers['Idempotency-Key']); return receipt(); });
  assert.deepEqual(seen, [requestId, requestId]);
});
test('never accepts HTTP success without a valid durable-save acknowledgement', async () => {
  for (const data of [{}, { ok: true }, { stored: true, inquiryId: 'test' }, { stored: true, notificationQueued: true, inquiryId: '<html>' }]) {
    const result = await handleAssessmentRequest(request(), env, async () => Response.json(data));
    assert.equal(result.status, 502);
  }
});
test('handles upstream failures, invalid responses, and connection/timeout errors without claiming failure to save', async () => {
  for (const send of [async () => new Response('', { status: 500 }), async () => new Response('not JSON'), async () => new Response('x'.repeat(13000)), async () => { throw new DOMException('test timeout', 'TimeoutError'); }]) {
    const result = await handleAssessmentRequest(request(), env, send);
    assert.equal(result.status, 502); const body = await result.json(); assert.match(body.error, /couldn't confirm receipt/);
    assert.doesNotMatch(JSON.stringify(body), /synthetic-test-token|Test Customer/);
  }
});
