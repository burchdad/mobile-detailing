import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
test('unconfigured assessment returns fallback before rendering fields',()=>{
  const booking=read('components/Booking.tsx');
  assert.match(booking,/if \(!available\) return <AssessmentUnavailable/);
  const fallback=read('components/AssessmentUnavailable.tsx');
  assert.doesNotMatch(fallback,/<form|<input|fetch\(|process\.env/);
  assert.match(fallback,/does not collect or send an assessment request/);
  assert.match(read('app/assessment/page.tsx'),/readIntakeConfig\(process.env\)/);
});
test('existing contact paths and appointment terms are preserved',()=>{
  const fallback=read('components/AssessmentUnavailable.tsx');
  for(const href of ['tel:+19033308955','sms:+19033308955','mailto:hello@asmobiledetail.com'])
    assert.ok(fallback.includes(`href="${href}"`));
  assert.match(fallback,/An appointment is only confirmed after/);
  assert.match(read('components/Booking.tsx'),/does not confirm inbox delivery or an appointment/);
});
test('no CRM infrastructure or credentials are bundled',()=>{
  for(const path of ['app/admin','app/api/crm','lib/crm','db'])
    assert.equal(existsSync(new URL(`../${path}`,import.meta.url)),false,path);
  assert.doesNotMatch(read('components/Booking.tsx'),/AS_ASSESSMENT_RESEND_API_KEY|localStorage|sessionStorage/);
});
