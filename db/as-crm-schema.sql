-- REVIEW-ONLY install specification for a NEW, ISOLATED A&S PostgreSQL/Supabase database.
-- Not executed. Do not run against any existing Ghost or other client's database.
-- Convert to a tracked migration with the approved Supabase CLI workflow after review.
BEGIN;
CREATE SCHEMA as_private;
REVOKE ALL ON SCHEMA as_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA as_private TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA as_private REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA as_private REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated;

CREATE TABLE as_private.staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'),
  email text NOT NULL CHECK (email = lower(email) AND length(email) BETWEEN 3 AND 254),
  password_hash text NOT NULL CHECK (password_hash ~ '^scrypt-v1:[a-f0-9]{32}:[a-f0-9]{128}$'),
  role text NOT NULL CHECK (role IN ('owner','staff')), active boolean NOT NULL DEFAULT true,
  UNIQUE (tenant,id), UNIQUE (tenant,email)
);
CREATE TABLE as_private.sessions (
  token_hash text PRIMARY KEY CHECK (token_hash ~ '^[a-f0-9]{64}$'),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'),
  staff_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '8 hours', revoked_at timestamptz,
  FOREIGN KEY (tenant,staff_id) REFERENCES as_private.staff(tenant,id) ON DELETE CASCADE
);
CREATE INDEX sessions_staff ON as_private.sessions(tenant,staff_id);
CREATE FUNCTION as_private.revoke_changed_staff_sessions() RETURNS trigger
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  IF OLD.password_hash IS DISTINCT FROM NEW.password_hash OR OLD.role IS DISTINCT FROM NEW.role OR OLD.active IS DISTINCT FROM NEW.active THEN
    UPDATE as_private.sessions SET revoked_at=now() WHERE tenant=NEW.tenant AND staff_id=NEW.id AND revoked_at IS NULL;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER staff_auth_changed AFTER UPDATE ON as_private.staff FOR EACH ROW EXECUTE FUNCTION as_private.revoke_changed_staff_sessions();
CREATE TABLE as_private.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'),
  full_name text NOT NULL CHECK (length(full_name) BETWEEN 1 AND 100),
  phone text NOT NULL CHECK (phone ~ '^[0-9]{10,15}$'),
  email text NOT NULL DEFAULT '' CHECK (length(email) <= 254),
  created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(tenant,id), UNIQUE(tenant,phone)
);
CREATE TABLE as_private.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'),
  customer_id uuid NOT NULL, description text NOT NULL CHECK (length(description) BETWEEN 1 AND 150),
  normalized_description text NOT NULL, UNIQUE(tenant,id), UNIQUE(tenant,customer_id,id),
  UNIQUE(tenant,customer_id,normalized_description),
  FOREIGN KEY (tenant,customer_id) REFERENCES as_private.customers(tenant,id)
);
CREATE TABLE as_private.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'),
  customer_id uuid NOT NULL, vehicle_id uuid NOT NULL,
  assessment jsonb NOT NULL CHECK (jsonb_typeof(assessment) = 'object' AND octet_length(assessment::text) < 12000),
  source text NOT NULL DEFAULT 'as-website-assessment' CHECK(source = 'as-website-assessment'),
  stage text NOT NULL DEFAULT 'new' CHECK (stage IN ('new','contacted','quoted','booked','completed','lost','cancelled')),
  follow_up_due_at timestamptz DEFAULT now() + interval '1 day',
  calendar_status text NOT NULL DEFAULT 'not_connected' CHECK(calendar_status = 'not_connected'),
  received_at timestamptz NOT NULL DEFAULT now(), version integer NOT NULL DEFAULT 1 CHECK(version > 0),
  UNIQUE(tenant,id),
  FOREIGN KEY (tenant,customer_id) REFERENCES as_private.customers(tenant,id),
  FOREIGN KEY (tenant,customer_id,vehicle_id) REFERENCES as_private.vehicles(tenant,customer_id,id)
);
CREATE INDEX leads_pipeline ON as_private.leads(tenant,stage,received_at DESC,id);
CREATE INDEX leads_follow_up ON as_private.leads(tenant,follow_up_due_at) WHERE follow_up_due_at IS NOT NULL;
CREATE TABLE as_private.history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'), lead_id uuid NOT NULL,
  staff_id uuid, kind text NOT NULL CHECK(kind IN ('received','updated')),
  note text NOT NULL DEFAULT '' CHECK(length(note) <= 2000), stage text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (tenant,lead_id) REFERENCES as_private.leads(tenant,id),
  FOREIGN KEY (tenant,staff_id) REFERENCES as_private.staff(tenant,id)
);
CREATE INDEX history_lead ON as_private.history(tenant,lead_id,created_at);
CREATE TABLE as_private.outbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'), lead_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','sent','failed')),
  attempts integer NOT NULL DEFAULT 0 CHECK(attempts BETWEEN 0 AND 5), available_at timestamptz NOT NULL DEFAULT now(),
  lease_token uuid, lease_until timestamptz, provider_id text, last_error text,
  created_at timestamptz NOT NULL DEFAULT now(), first_attempt_at timestamptz, sent_at timestamptz,
  UNIQUE(tenant,lead_id), FOREIGN KEY (tenant,lead_id) REFERENCES as_private.leads(tenant,id)
);
CREATE INDEX outbox_pending ON as_private.outbox(tenant,status,available_at);
CREATE TABLE as_private.receipts (
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'), request_id uuid NOT NULL,
  payload_hash text NOT NULL CHECK(payload_hash ~ '^[a-f0-9]{64}$'), lead_id uuid NOT NULL,
  receipt jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(tenant,request_id),
  FOREIGN KEY (tenant,lead_id) REFERENCES as_private.leads(tenant,id)
);
CREATE TABLE as_private.rate_limits (
  tenant text NOT NULL DEFAULT 'as-detailing' CHECK (tenant = 'as-detailing'),
  key text NOT NULL, window_at timestamptz NOT NULL DEFAULT now(), hits integer NOT NULL DEFAULT 1,
  PRIMARY KEY(tenant,key)
);

-- Private helper. One row lock handles concurrent requests across all web instances.
CREATE FUNCTION as_private.budget(p_key text, p_limit integer, p_window interval) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE count_now integer;
BEGIN
  INSERT INTO as_private.rate_limits AS r(key) VALUES(p_key)
  ON CONFLICT(tenant,key) DO UPDATE SET
    hits = CASE WHEN r.window_at + p_window <= now() THEN 1 ELSE r.hits + 1 END,
    window_at = CASE WHEN r.window_at + p_window <= now() THEN now() ELSE r.window_at END
  RETURNING hits INTO count_now;
  RETURN count_now <= p_limit;
END $$;
CREATE FUNCTION public.as_login_candidate(p_email text) RETURNS jsonb
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE result jsonb;
BEGIN
  IF NOT as_private.budget('login-global',60,interval '10 minutes') THEN RETURN '{"error":"rate_limited"}'; END IF;
  IF length(p_email) > 254 OR p_email <> lower(p_email) THEN RETURN NULL; END IF;
  IF NOT as_private.budget('login-' || md5(p_email),5,interval '10 minutes') THEN RETURN '{"error":"rate_limited"}'; END IF;
  SELECT jsonb_build_object('id',id,'tenant',tenant,'passwordHash',password_hash) INTO result
    FROM as_private.staff WHERE tenant='as-detailing' AND email=p_email AND active;
  RETURN result;
END $$;
CREATE FUNCTION public.as_create_session(p_staff_id uuid, p_password_hash text, p_session_hash text) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  -- Hold the staff row against disable/password changes until session insertion commits.
  PERFORM id FROM as_private.staff WHERE tenant='as-detailing' AND id=p_staff_id AND active AND password_hash=p_password_hash FOR SHARE;
  IF NOT FOUND THEN RETURN false; END IF;
  INSERT INTO as_private.sessions(token_hash,staff_id) VALUES(p_session_hash,p_staff_id);
  RETURN true;
END $$;
CREATE FUNCTION public.as_session(p_session_hash text) RETURNS jsonb
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT jsonb_build_object('id',u.id,'tenant',u.tenant,'email',u.email,'role',u.role,'active',u.active,'expiresAt',s.expires_at)
  FROM as_private.sessions s JOIN as_private.staff u ON u.tenant=s.tenant AND u.id=s.staff_id
  WHERE s.tenant='as-detailing' AND s.token_hash=p_session_hash AND s.expires_at>now() AND s.revoked_at IS NULL AND u.active;
$$;
CREATE FUNCTION public.as_revoke_session(p_session_hash text) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  UPDATE as_private.sessions SET revoked_at=now() WHERE tenant='as-detailing' AND token_hash=p_session_hash AND revoked_at IS NULL;
  RETURN true;
END $$;

CREATE FUNCTION public.as_accept_inquiry(p_request_id uuid, p_payload_hash text, p_assessment jsonb) RETURNS jsonb
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE old_receipt as_private.receipts; customer uuid; vehicle uuid; lead uuid; result jsonb; field text;
BEGIN
  IF p_payload_hash IS NULL OR p_payload_hash !~ '^[a-f0-9]{64}$' OR p_request_id IS NULL OR
     jsonb_typeof(p_assessment) IS DISTINCT FROM 'object' OR octet_length(p_assessment::text) > 12000 THEN RETURN '{"error":"invalid"}'; END IF;
  IF EXISTS(SELECT 1 FROM jsonb_object_keys(p_assessment) k WHERE k NOT IN ('fullName','phone','email','vehicle','service','condition','preferredDate','location','notes')) THEN RETURN '{"error":"invalid"}'; END IF;
  FOREACH field IN ARRAY ARRAY['fullName','phone','email','vehicle','service','condition','preferredDate','location','notes'] LOOP
    IF jsonb_typeof(p_assessment->field) IS DISTINCT FROM 'string' THEN RETURN '{"error":"invalid"}'; END IF;
  END LOOP;
  IF length(p_assessment->>'fullName') NOT BETWEEN 1 AND 100 OR length(p_assessment->>'vehicle') NOT BETWEEN 1 AND 150 OR
    length(p_assessment->>'location') NOT BETWEEN 1 AND 250 OR length(p_assessment->>'notes')>2000 OR length(p_assessment->>'email')>254 OR
    p_assessment->>'phone' !~ '^[0-9]{10,15}$' OR p_assessment->>'preferredDate' !~ '^\d{4}-\d{2}-\d{2}$' OR
    p_assessment->>'service' NOT IN ('Signature Detail','Paint Enhancement','Ceramic Protection','Interior Preservation','Vehicle Preservation Plan','Fleet Care Program','Not sure yet') OR
    p_assessment->>'condition' NOT IN ('Well maintained','Needs a reset','Heavy interior use','Paint swirls or haze','New vehicle protection','Show / collector vehicle')
    THEN RETURN '{"error":"invalid"}'; END IF;
  -- Serialize identical request keys before writing ANY customer, vehicle or lead rows.
  PERFORM pg_advisory_xact_lock(hashtextextended('as-intake:' || p_request_id::text,0));
  SELECT * INTO old_receipt FROM as_private.receipts WHERE tenant='as-detailing' AND request_id=p_request_id;
  IF FOUND THEN
    IF old_receipt.payload_hash<>p_payload_hash THEN RETURN '{"error":"conflict"}'; END IF;
    RETURN old_receipt.receipt;
  END IF;
  IF NOT as_private.budget('intake-global',60,interval '1 hour') OR
     NOT as_private.budget('intake-' || md5(p_assessment->>'phone'),5,interval '1 hour') THEN RETURN '{"error":"rate_limited"}'; END IF;
  INSERT INTO as_private.customers(full_name,phone,email) VALUES(p_assessment->>'fullName',p_assessment->>'phone',p_assessment->>'email')
    ON CONFLICT(tenant,phone) DO UPDATE SET phone=excluded.phone RETURNING id INTO customer;
  -- Do not overwrite an existing customer's profile with unverified public form input.
  INSERT INTO as_private.vehicles(customer_id,description,normalized_description)
    VALUES(customer,p_assessment->>'vehicle',lower(regexp_replace(trim(p_assessment->>'vehicle'),'\s+',' ','g')))
    ON CONFLICT(tenant,customer_id,normalized_description) DO UPDATE SET normalized_description=excluded.normalized_description RETURNING id INTO vehicle;
  INSERT INTO as_private.leads(customer_id,vehicle_id,assessment) VALUES(customer,vehicle,p_assessment) RETURNING id INTO lead;
  INSERT INTO as_private.history(lead_id,kind,stage) VALUES(lead,'received','new');
  INSERT INTO as_private.outbox(lead_id) VALUES(lead);
  result := jsonb_build_object('stored',true,'notificationQueued',true,'inquiryId',lead);
  INSERT INTO as_private.receipts(request_id,payload_hash,lead_id,receipt) VALUES(p_request_id,p_payload_hash,lead,result);
  -- A PostgreSQL function call is one transaction. An error rolls ALL these rows back.
  RETURN result;
END $$;

CREATE FUNCTION as_private.lead_json(p_lead as_private.leads) RETURNS jsonb
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT (p_lead).assessment || jsonb_build_object('id',(p_lead).id,'tenant',(p_lead).tenant,'customerId',(p_lead).customer_id,'vehicleId',(p_lead).vehicle_id,
    'stage',(p_lead).stage,'followUpDueAt',(p_lead).follow_up_due_at,'receivedAt',(p_lead).received_at,'version',(p_lead).version,
    'calendarStatus',(p_lead).calendar_status,'notification',o.status,
    'history',COALESCE((SELECT jsonb_agg(jsonb_build_object('at',h.created_at,'kind',h.kind,'note',h.note,'stage',h.stage) ORDER BY h.created_at,h.id)
      FROM (SELECT * FROM as_private.history WHERE tenant=(p_lead).tenant AND lead_id=(p_lead).id ORDER BY created_at DESC,id DESC LIMIT 5) h),'[]'::jsonb))
  FROM as_private.outbox o WHERE o.tenant=(p_lead).tenant AND o.lead_id=(p_lead).id;
$$;
CREATE FUNCTION public.as_list_leads(p_session_hash text, p_filter text, p_offset integer) RETURNS jsonb
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE result jsonb;
BEGIN
  IF public.as_session(p_session_hash) IS NULL THEN RETURN '{"error":"unauthorized"}'; END IF;
  IF p_filter NOT IN ('all','due','new','contacted','quoted','booked','completed','lost','cancelled') OR p_offset NOT BETWEEN 0 AND 100000 THEN RETURN '{"error":"invalid"}'; END IF;
  WITH matching AS (
    SELECT l FROM as_private.leads l WHERE l.tenant='as-detailing'
    AND (p_filter='all' OR l.stage=p_filter OR (p_filter='due' AND l.follow_up_due_at<=now()))
    ORDER BY l.received_at DESC,l.id DESC LIMIT 26 OFFSET p_offset
  ), numbered AS (SELECT l, row_number() OVER (ORDER BY (l).received_at DESC,(l).id DESC) AS n FROM matching)
  SELECT jsonb_build_object('leads',COALESCE(jsonb_agg(as_private.lead_json(l) ORDER BY n) FILTER (WHERE n<=25),'[]'::jsonb),
    'hasMore',count(*)>25) INTO result FROM numbered;
  RETURN result;
END $$;
CREATE FUNCTION public.as_update_lead(p_session_hash text, p_lead_id uuid, p_version integer, p_stage text, p_follow_up timestamptz, p_note text, p_booking_confirmed boolean) RETURNS jsonb
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE staff jsonb; existing as_private.leads; allowed boolean;
BEGIN
  staff := public.as_session(p_session_hash);
  IF staff IS NULL THEN RETURN '{"error":"unauthorized"}'; END IF;
  -- Lock the session and staff against concurrent revocation/disable until this mutation finishes.
  -- Always staff THEN session, matching staff_auth_changed's lock order.
  PERFORM u.id FROM as_private.staff u WHERE u.tenant='as-detailing' AND u.id=(staff->>'id')::uuid AND u.active FOR SHARE;
  IF NOT FOUND THEN RETURN '{"error":"unauthorized"}'; END IF;
  PERFORM s.token_hash FROM as_private.sessions s WHERE s.token_hash=p_session_hash AND s.tenant='as-detailing'
    AND s.staff_id=(staff->>'id')::uuid AND s.revoked_at IS NULL AND s.expires_at>now() FOR SHARE;
  IF NOT FOUND THEN RETURN '{"error":"unauthorized"}'; END IF;
  IF p_stage IS NULL OR p_stage NOT IN ('new','contacted','quoted','booked','completed','lost','cancelled') OR p_note IS NULL OR length(p_note)>2000 THEN RETURN '{"error":"invalid"}'; END IF;
  SELECT * INTO existing FROM as_private.leads WHERE tenant='as-detailing' AND id=p_lead_id FOR UPDATE;
  IF NOT FOUND THEN RETURN '{"error":"not_found"}'; END IF;
  IF p_version IS NULL OR existing.version<>p_version THEN RETURN '{"error":"conflict"}'; END IF;
  allowed := p_stage=existing.stage OR
    (existing.stage='new' AND p_stage IN ('contacted','lost','cancelled')) OR
    (existing.stage='contacted' AND p_stage IN ('quoted','lost','cancelled')) OR
    (existing.stage='quoted' AND p_stage IN ('contacted','booked','lost','cancelled')) OR
    (existing.stage='booked' AND p_stage IN ('completed','cancelled')) OR
    (existing.stage IN ('lost','cancelled') AND p_stage='contacted');
  IF NOT allowed OR (p_stage='booked' AND existing.stage<>'booked' AND p_booking_confirmed IS DISTINCT FROM true) THEN RETURN '{"error":"invalid"}'; END IF;
  UPDATE as_private.leads SET stage=p_stage,follow_up_due_at=p_follow_up,version=version+1 WHERE tenant='as-detailing' AND id=p_lead_id;
  INSERT INTO as_private.history(lead_id,staff_id,kind,note,stage) VALUES(p_lead_id,(staff->>'id')::uuid,'updated',p_note,p_stage);
  RETURN '{"updated":true}';
END $$;

CREATE FUNCTION public.as_claim_outbox(p_limit integer) RETURNS jsonb
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE result jsonb;
BEGIN
  IF p_limit NOT BETWEEN 1 AND 10 THEN RETURN '{"error":"invalid"}'; END IF;
  UPDATE as_private.outbox SET status='failed',lease_token=NULL,lease_until=NULL,last_error='retry_limit'
    WHERE tenant='as-detailing' AND status='processing' AND lease_until<=now() AND attempts>=5;
  -- Never retry beyond provider deduplication retention (24h); reserve an hour of margin.
  UPDATE as_private.outbox SET status='failed',lease_token=NULL,lease_until=NULL,last_error='delivery_window_expired'
    WHERE tenant='as-detailing' AND first_attempt_at<=now()-interval '23 hours'
      AND (status='pending' OR (status='processing' AND lease_until<=now()));
  WITH picked AS (
    SELECT id FROM as_private.outbox WHERE tenant='as-detailing' AND attempts<5 AND
      (first_attempt_at IS NULL OR first_attempt_at>now()-interval '23 hours') AND
      ((status='pending' AND available_at<=now()) OR (status='processing' AND lease_until<=now()))
      ORDER BY available_at,id LIMIT p_limit FOR UPDATE SKIP LOCKED
  ), claimed AS (
    UPDATE as_private.outbox o SET status='processing',attempts=attempts+1,first_attempt_at=COALESCE(first_attempt_at,now()),lease_token=gen_random_uuid(),lease_until=now()+interval '2 minutes'
    FROM picked WHERE o.id=picked.id AND o.tenant='as-detailing' RETURNING o.*
  ) SELECT COALESCE(jsonb_agg(jsonb_build_object('id',o.id,'tenant',o.tenant,'inquiryId',o.lead_id,'leaseToken',o.lease_token,'attempts',o.attempts,'firstAttemptAt',o.first_attempt_at,
      'payload',jsonb_build_object('fullName',l.assessment->>'fullName','service',l.assessment->>'service'))),'[]'::jsonb)
    INTO result FROM claimed o JOIN as_private.leads l ON l.tenant=o.tenant AND l.id=o.lead_id;
  RETURN result;
END $$;
CREATE FUNCTION public.as_settle_outbox(p_id uuid, p_lease_token uuid, p_provider_id text) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  IF p_provider_id IS NOT NULL AND p_provider_id !~ '^[A-Za-z0-9_.-]{1,200}$' THEN RETURN false; END IF;
  UPDATE as_private.outbox SET
    status=CASE WHEN p_provider_id IS NOT NULL THEN 'sent' WHEN attempts>=5 THEN 'failed' ELSE 'pending' END,
    provider_id=p_provider_id, sent_at=CASE WHEN p_provider_id IS NOT NULL THEN now() ELSE NULL END,
    last_error=CASE WHEN p_provider_id IS NOT NULL THEN NULL ELSE 'delivery_unconfirmed' END,
    available_at=now()+make_interval(secs => least(3600,(30*power(2,attempts-1))::integer)),lease_token=NULL,lease_until=NULL
  WHERE tenant='as-detailing' AND id=p_id AND lease_token=p_lease_token AND lease_until>now() AND status='processing';
  RETURN FOUND;
END $$;

-- Read-only operational snapshot for authenticated staff. No recipient/customer PII.
CREATE FUNCTION public.as_outbox_health(p_session_hash text) RETURNS jsonb
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE result jsonb;
BEGIN
  IF public.as_session(p_session_hash) IS NULL THEN RETURN '{"error":"unauthorized"}'; END IF;
  SELECT jsonb_build_object(
    'pending',count(*) FILTER (WHERE status='pending'),
    'processing',count(*) FILTER (WHERE status='processing'),
    'accepted',count(*) FILTER (WHERE status='sent'),
    'failed',count(*) FILTER (WHERE status='failed'),
    'expiredLeases',count(*) FILTER (WHERE status='processing' AND lease_until<=now()),
    'oldestUnresolvedAt',min(created_at) FILTER (WHERE status<>'sent'),
    'snapshotAt',now()) INTO result
  FROM as_private.outbox WHERE tenant='as-detailing';
  RETURN result;
END $$;

-- No anonymous/authenticated browser role receives table/function access. Only this
-- isolated application's server credential can invoke RPCs; every staff RPC also checks
-- its opaque DB session. No service key enters client code. No SECURITY DEFINER functions.
DO $$ DECLARE r record; BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname='as_private' LOOP
    EXECUTE format('ALTER TABLE as_private.%I ENABLE ROW LEVEL SECURITY',r.tablename);
    EXECUTE format('ALTER TABLE as_private.%I FORCE ROW LEVEL SECURITY',r.tablename);
    EXECUTE format('REVOKE ALL ON TABLE as_private.%I FROM PUBLIC, anon, authenticated',r.tablename);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE as_private.%I TO service_role',r.tablename);
  END LOOP;
  FOR r IN SELECT p.oid::regprocedure AS signature FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
    WHERE (n.nspname='public' AND p.proname LIKE 'as\_%' ESCAPE '\') OR n.nspname='as_private' LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated',r.signature);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role',r.signature);
  END LOOP;
END $$;
COMMIT;
