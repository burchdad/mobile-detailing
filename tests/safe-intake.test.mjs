import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('assessment cannot collect or send details under any environment configuration', () => {
  const booking = read('components/Booking.tsx');
  const page = read('app/assessment/page.tsx');
  assert.doesNotMatch(booking, /<form|<input|<select|<textarea|fetch\(|setTimeout|setSubmitted|process\.env|AS_INTAKE|use client/);
  assert.doesNotMatch(page, /process\.env|readIntakeConfig|available=/);
  assert.match(booking, /Online requests are temporarily unavailable/);
  assert.match(booking, /does not collect or send an assessment request/);
  assert.match(booking, /href="\/contact#contact-options"/);
  for (const path of ['app/api/assessment/route.ts', 'app/admin', 'app/api/crm', 'lib/crm', 'db']) {
    assert.equal(existsSync(new URL(`../${path}`, import.meta.url)), false, path);
  }
});
test('contact fallback preserves existing published phone and email', () => {
  const contact = read('app/contact/page.tsx');
  const footer = read('components/Footer.tsx');
  for (const href of ['tel:+19033308955', 'mailto:hello@asmobiledetail.com']) {
    assert.ok(contact.includes(`href="${href}"`));
    assert.ok(footer.includes(`href="${href}"`));
  }
  assert.match(contact, /id="contact-options"/);
  assert.match(contact, /ctaHref="#contact-options"/);
  assert.doesNotMatch(contact, /555-0000|19035550000/);
});

test('assessment offers the existing contact destinations without claiming receipt', () => {
  const booking = read('components/Booking.tsx');
  for (const href of ['tel:+19033308955', 'sms:+19033308955', 'mailto:hello@asmobiledetail.com']) {
    assert.ok(booking.includes(`href="${href}"`));
  }
  assert.match(booking, /Text and email links open your messaging app/);
  assert.match(booking, /An appointment is only confirmed after/);
  assert.doesNotMatch(booking, /Request Received|successfully sent/);
  assert.match(read('app/assessment/page.tsx'), /ctaHref="#booking"/);
});
