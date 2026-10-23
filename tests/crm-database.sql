-- PostgreSQL integration acceptance tests; NOT executed in the review environment.
-- Run only against a fresh disposable local database after db/as-crm-schema.sql.
-- Everything below rolls back, including synthetic staff, records and test triggers.
\set ON_ERROR_STOP on
BEGIN;
CREATE FUNCTION as_private.test_outbox_failure() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'synthetic outbox failure'; END $$;
DO $$
DECLARE
  a jsonb := '{"fullName":"Synthetic Test","phone":"5550101234","email":"","vehicle":"Test Car","service":"Signature Detail","condition":"Needs a reset","preferredDate":"2026-12-01","location":"Synthetic location","notes":"Test only"}';
  r jsonb; again jsonb; old_count integer; u uuid; other_customer uuid; other_vehicle uuid;
  h text := repeat('a',64); token text := repeat('b',64); k uuid := '00000000-0000-4000-8000-000000000001';
  lead uuid; lease jsonb; claim jsonb; denied boolean;
BEGIN
  -- Dedicated tenant CHECK constraints reject even privileged cross-tenant inserts.
  denied := false;
  BEGIN INSERT INTO as_private.customers(tenant,full_name,phone) VALUES('other-client','Synthetic','5550109999');
  EXCEPTION WHEN check_violation THEN denied := true; END;
  ASSERT denied, 'Cross-tenant insert must fail';
  ASSERT NOT has_schema_privilege('anon','as_private','USAGE'), 'Anon must not have schema access';
  ASSERT NOT has_function_privilege('anon','public.as_list_leads(text,text,integer)','EXECUTE'), 'Anon must not execute CRM RPC';
  ASSERT NOT has_function_privilege('authenticated','public.as_accept_inquiry(uuid,text,jsonb)','EXECUTE'), 'Browser auth must not execute intake RPC';
  ASSERT public.as_session(token) IS NULL, 'Forged token must not authenticate';
  ASSERT public.as_list_leads(token,'all',0)->>'error'='unauthorized', 'No unauthenticated list';

  INSERT INTO as_private.staff(email,password_hash,role) VALUES('synthetic@example.invalid','scrypt-v1:'||repeat('0',32)||':'||repeat('0',128),'owner') RETURNING id INTO u;
  ASSERT public.as_create_session(u,'scrypt-v1:'||repeat('0',32)||':'||repeat('0',128),token), 'Create synthetic session';
  ASSERT public.as_session(token)->>'tenant'='as-detailing', 'Verified session tenant';

  r := public.as_accept_inquiry(k,h,a); lead := (r->>'inquiryId')::uuid;
  ASSERT r->>'stored'='true' AND r->>'notificationQueued'='true', 'Durable receipt contract';
  again := public.as_accept_inquiry(k,h,a);
  ASSERT r=again, 'Identical retry returns identical receipt';
  ASSERT (SELECT count(*) FROM as_private.leads)=1, 'Identical retry has one lead';
  ASSERT (SELECT count(*) FROM as_private.outbox)=1, 'Identical retry has one outbox';
  ASSERT public.as_accept_inquiry(k,repeat('c',64),a)->>'error'='conflict', 'Changed payload key conflicts';
  ASSERT public.as_accept_inquiry(gen_random_uuid(),h,a||'{"tenant":"other-client"}')->>'error'='invalid', 'Tenant input rejected';
  again := public.as_accept_inquiry(gen_random_uuid(),h,a);
  ASSERT (SELECT count(*) FROM as_private.customers)=1, 'Phone-only contact deduplication';
  ASSERT (SELECT count(*) FROM as_private.vehicles)=1, 'Vehicle deduplication';
  ASSERT (SELECT count(*) FROM as_private.leads)=2, 'Different inquiry key remains a distinct inquiry';

  -- Composite vehicle/customer FK refuses unrelated customer relations.
  INSERT INTO as_private.customers(full_name,phone) VALUES('Other synthetic','5550105678') RETURNING id INTO other_customer;
  SELECT vehicle_id INTO other_vehicle FROM as_private.leads WHERE id=lead;
  denied := false;
  BEGIN INSERT INTO as_private.leads(customer_id,vehicle_id,assessment) VALUES(other_customer,other_vehicle,a);
  EXCEPTION WHEN foreign_key_violation THEN denied := true; END;
  ASSERT denied, 'Customer/vehicle mismatch must fail';

  ASSERT public.as_update_lead(token,lead,1,'booked',NULL,'',true)->>'error'='invalid', 'Cannot skip pipeline stages';
  ASSERT public.as_update_lead(token,lead,1,'contacted',NULL,'Called',false)->>'updated'='true';
  ASSERT public.as_update_lead(token,lead,1,'quoted',NULL,'',false)->>'error'='conflict', 'Stale version cannot overwrite';
  ASSERT public.as_update_lead(token,lead,2,'quoted',NULL,'Quoted',false)->>'updated'='true';
  ASSERT public.as_update_lead(token,lead,3,'booked',NULL,'',false)->>'error'='invalid', 'Booking needs explicit confirmation';
  ASSERT public.as_update_lead(token,lead,3,'booked',NULL,'Confirmed separately',true)->>'updated'='true';
  ASSERT (SELECT calendar_status FROM as_private.leads WHERE id=lead)='not_connected', 'Booked never pretends calendar sync';
  ASSERT jsonb_array_length(public.as_list_leads(token,'all',0)->'leads')=2, 'Staff can list scoped leads';

  claim := public.as_claim_outbox(1); lease := claim->0;
  ASSERT jsonb_array_length(claim)=1, 'Claim one job';
  ASSERT NOT public.as_settle_outbox((lease->>'id')::uuid,gen_random_uuid(),'mock-wrong-lease'), 'Wrong lease cannot acknowledge';
  ASSERT public.as_settle_outbox((lease->>'id')::uuid,(lease->>'leaseToken')::uuid,NULL), 'Failure gets retry';
  ASSERT (SELECT status FROM as_private.outbox WHERE id=(lease->>'id')::uuid)='pending', 'Retry persists';
  UPDATE as_private.outbox SET available_at=now()-interval '1 second' WHERE id=(lease->>'id')::uuid;
  claim := public.as_claim_outbox(1); lease := claim->0;
  ASSERT public.as_settle_outbox((lease->>'id')::uuid,(lease->>'leaseToken')::uuid,'mock-delivered'), 'Valid provider receipt recorded';
  ASSERT NOT public.as_settle_outbox((lease->>'id')::uuid,(lease->>'leaseToken')::uuid,'mock-repeat'), 'Cannot settle twice';
  UPDATE as_private.outbox SET status='processing',attempts=5,lease_token=gen_random_uuid(),lease_until=now()-interval '1 second' WHERE status<>'sent';
  PERFORM public.as_claim_outbox(1);
  ASSERT (SELECT count(*) FROM as_private.outbox WHERE status='failed')=1, 'Exhausted expired lease becomes visible failure';

  ASSERT (public.as_outbox_health(token)->>'accepted')::integer=1, 'Health counts provider acceptance';
  ASSERT (public.as_outbox_health(token)->>'failed')::integer=1, 'Health counts failures';
  UPDATE as_private.staff SET active=false WHERE id=u;
  ASSERT public.as_session(token) IS NULL, 'Disable immediately revokes session';
  ASSERT public.as_outbox_health(token)->>'error'='unauthorized', 'Health requires active session';
  ASSERT public.as_update_lead(token,lead,4,'completed',NULL,'',false)->>'error'='unauthorized';
  UPDATE as_private.staff SET active=true WHERE id=u;
  ASSERT public.as_session(token) IS NULL, 'Re-enabling must not revive old sessions';

  -- A failure in the last durable step must not leave a customer/vehicle/lead orphan.
  SELECT count(*) INTO old_count FROM as_private.customers;
  CREATE TRIGGER fail_outbox BEFORE INSERT ON as_private.outbox FOR EACH ROW EXECUTE FUNCTION as_private.test_outbox_failure();
  denied:=false;
  BEGIN PERFORM public.as_accept_inquiry(gen_random_uuid(),h,a||'{"phone":"5550104321"}');
  EXCEPTION WHEN raise_exception THEN denied:=true; END;
  ASSERT denied, 'Synthetic transaction failure must occur';
  ASSERT (SELECT count(*) FROM as_private.customers)=old_count, 'Rollback removes newly inserted customer';
  ASSERT (SELECT count(*) FROM as_private.leads)=2, 'Rollback removes newly inserted lead';
  ASSERT (SELECT count(*) FROM as_private.receipts)=2, 'Rollback leaves no success receipt';
  DROP TRIGGER fail_outbox ON as_private.outbox;
END $$;
-- Retention-window acceptance: synthetic only; every mutation is rolled back.
DO $$
DECLARE oid uuid; claim jsonb; first_at timestamptz;
BEGIN
  UPDATE as_private.outbox SET status='sent';
  SELECT id INTO oid FROM as_private.outbox ORDER BY id LIMIT 1;
  -- A never-attempted old item still gets its first delivery opportunity.
  UPDATE as_private.outbox SET status='pending',attempts=0,first_attempt_at=NULL,
    created_at=now()-interval '3 days',available_at=now()-interval '1 second' WHERE id=oid;
  claim := public.as_claim_outbox(1);
  ASSERT jsonb_array_length(claim)=1, 'Old never-sent job can be claimed';
  SELECT first_attempt_at INTO first_at FROM as_private.outbox WHERE id=oid;
  ASSERT first_at IS NOT NULL AND claim->0->>'firstAttemptAt' IS NOT NULL;
  UPDATE as_private.outbox SET lease_until=now()-interval '1 second' WHERE id=oid;
  claim := public.as_claim_outbox(1);
  ASSERT (SELECT first_attempt_at FROM as_private.outbox WHERE id=oid)=first_at, 'Reclaim preserves first attempt';
  -- Pending retry cannot escape provider retention after a prolonged outage.
  UPDATE as_private.outbox SET status='pending',first_attempt_at=now()-interval '23 hours',available_at=now() WHERE id=oid;
  ASSERT public.as_claim_outbox(1)='[]'::jsonb;
  ASSERT (SELECT status='failed' AND last_error='delivery_window_expired' FROM as_private.outbox WHERE id=oid);
  -- Expired processing leases fail closed, but valid in-flight leases are not stolen.
  UPDATE as_private.outbox SET status='processing',lease_until=now()+interval '1 minute',lease_token=gen_random_uuid() WHERE id=oid;
  ASSERT public.as_claim_outbox(1)='[]'::jsonb;
  ASSERT (SELECT status='processing' FROM as_private.outbox WHERE id=oid);
  UPDATE as_private.outbox SET lease_until=now()-interval '1 second' WHERE id=oid;
  ASSERT public.as_claim_outbox(1)='[]'::jsonb;
  ASSERT (SELECT status='failed' AND last_error='delivery_window_expired' FROM as_private.outbox WHERE id=oid);
END $$;
ROLLBACK;
