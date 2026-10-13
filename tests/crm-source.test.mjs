// Static regressions only: these do not replace PostgreSQL or browser execution.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = path => readFile(new URL(`../${path}`,import.meta.url),'utf8');
test('private SQL schema has no public role grants or security-definer shortcut',async()=>{
  const sql=await source('db/as-crm-schema.sql');
  assert.match(sql,/CREATE SCHEMA as_private/);assert.match(sql,/FORCE ROW LEVEL SECURITY/);
  assert.match(sql,/REVOKE ALL ON FUNCTION/);assert.doesNotMatch(sql,/\bSECURITY DEFINER\b(?! functions)/);
  assert.match(sql,/CHECK \(tenant = 'as-detailing'\)/);
  assert.match(sql,/FOREIGN KEY \(tenant,customer_id,vehicle_id\)/);
});
test('SQL encodes atomic receipt locking, lease fencing and scoped mutations',async()=>{
  const sql=await source('db/as-crm-schema.sql');
  assert.match(sql,/pg_advisory_xact_lock/);assert.match(sql,/PRIMARY KEY\(tenant,request_id\)/);
  assert.match(sql,/FOR UPDATE SKIP LOCKED/);assert.match(sql,/lease_token=p_lease_token AND lease_until>now\(\)/);
  assert.match(sql,/UPDATE as_private.leads SET[^;]+WHERE tenant='as-detailing' AND id=p_lead_id/s);
  assert.match(sql,/p_booking_confirmed IS DISTINCT FROM true/);
});
test('client has no service secret or test login, and revalidates without refreshing drafts',async()=>{
  const client=await source('components/StaffDashboard.tsx');
  assert.doesNotMatch(client,/AS_CRM_SERVICE_KEY|AS_CRM_INTAKE_TOKEN|MockEmailProvider|localStorage/);
  assert.match(client,/fetch\("\/api\/admin\/session", \{ cache: "no-store" \}\)/);
  const recheck=client.slice(client.indexOf('const recheck ='),client.indexOf('async function signIn'));
  assert.doesNotMatch(recheck,/\bload\(/);assert.match(client,/expiresAt - Date.now\(\)/);
  assert.match(client,/BroadcastChannel/);assert.match(client,/encodeURIComponent\(lead.email\)/);
});
test('disabled admin page does not render the sign-in dashboard',async()=>{
  const page=await source('app/admin/page.tsx');
  assert.match(page,/if \(!config\) return/);assert.match(page,/CRM setup is pending/);
  assert.ok(page.indexOf('if (!config) return')<page.indexOf('requireSession(new Request'));
});
