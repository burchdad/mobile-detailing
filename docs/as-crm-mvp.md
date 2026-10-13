# A&S CRM local MVP review

Prepared 10 October 2026. **Code for review, not an activated CRM.** No production database, staff credential, email provider, calendar, deployment or live inquiry was created or changed.

## Base and scope

Base: `burchdad/mobile-detailing` at `c80ac0bca070cc2780f51071c2a3a26e05697673`, plus the separate 9 October inquiry/navigation repair. This review preserves that repair's actual durable-receipt contract and disabled form behavior. The combined patch applies to the exact original base; the incremental patch applies after the earlier repair.

The code adds:
- `/admin`: a mobile-oriented staff sign-in and inquiry dashboard, displaying a disabled setup screen without complete enabled server configuration. Customer records are never loaded into the unauthenticated screen.
- Opaque random staff sessions, only SHA-256 token hashes stored in PostgreSQL, eight-hour expiry, server-side active/role checks on every API request, explicit revocation and password/role/disable-triggered revocation. No client claims, organization headers, hostname mapping or user-editable metadata authorize access.
- Customers deduplicated by normalized phone, vehicles linked to their customer, inquiry snapshots, a detailing pipeline, follow-up due date, staff notes and activity history. The latest five activity entries are displayed; full history stays in the database. The due filter intentionally includes any stage with a due date, including completed customers needing a later follow-up. Staff should clear the date when none is needed.
- Intake with a dedicated server-only credential, bounded input, a fixed A&S tenant, canonical payload hash, UUID idempotency key, transaction-scoped concurrent-key lock, unique receipt and an atomic customer/vehicle/inquiry/history/outbox transaction.
- Durable outbox claims, leases, bounded retries/backoff, stale-lease protection and visible pending/processing/sent/failed states. The worker claims one immediately actionable job per invocation. Only a test email provider exists; nothing invokes it from an application route and no real emails are sent.
- Optimistic version checks on edits. Stage transitions are enforced in PostgreSQL, and entering `booked` requires explicit confirmation of a separate customer arrangement. The calendar field remains `not_connected` in every stage.

## Data isolation and authorization

This is intentionally a **single-tenant A&S installation in a dedicated database/project**, not a new customer inside an existing Ghost database. Every owned row carries `tenant = 'as-detailing'` enforced with database CHECK constraints. Customer/vehicle/lead/session relations also carry tenant-scoped composite foreign keys. Caller-supplied tenant/role/customer relation fields are rejected.

Tables live in non-exposed `as_private`; RLS is enabled and forced with no browser policies. `PUBLIC`, `anon` and `authenticated` have no schema/table/function grants. Only this application's server key invokes narrowly named public RPCs; staff RPCs additionally verify opaque database sessions. All functions are `SECURITY INVOKER` with an empty search path and qualified names. The isolated Supabase server key still has broad access to that dedicated project. **Never reuse a Ghost or another client's project/key.** Do not expose `as_private` through the Data API.

No existing donor routes were copied. The reusable concepts are organization-owned contacts/leads and database-backed opaque staff sessions; the donor's tenant override and metadata fallback were not inherited.

Staff passwords use Node scrypt with random per-password salts, fixed-format hashes and constant-time comparison. Passwords are not logged or stored in browser storage. There is no public signup, account invitation, default account, shared password, development-login bypass, password reset or MFA workflow in this MVP. Verified staff account bootstrap and recovery must be securely handled and reviewed before launch. Do not create a real password or paste it into chat, shell arguments, history or a SQL file. Staff password changes/disable operations revoke existing sessions through the database trigger.

Private API responses are `no-store`. The admin page is dynamically rendered, non-indexed and denied framing. The UI clears customer data at session expiry and cross-tab logout, and revalidates access on focus/visibility and once per minute while visible. Revalidation does not refresh or discard the current editor. API authorization remains authoritative. Unsaved edits are preserved on errors and guarded when changing views; expired authentication necessarily removes customer data from the screen.

## Runtime configuration (all still unset/off)

- `AS_CRM_ENABLED=false`: leave off until the database/auth/deployment checks pass.
- `AS_CRM_DATABASE_URL`: approved dedicated A&S hosted Supabase project origin. Only `https://<project>.supabase.co` is accepted; no arbitrary endpoints, credentials in URLs, alternate paths, IPs or local hosts. This app adapter does not target a local Supabase URL; run SQL acceptance directly against an authorized disposable local database.
- `AS_CRM_SERVICE_KEY`: approved server-only secret key from that dedicated project. Modern `sb_secret_...` keys use the `apikey` header only; legacy service-role JWTs also use the bearer header. No `NEXT_PUBLIC_` variable is permitted.
- `AS_CRM_SITE_ORIGIN`: exact approved HTTPS staff origin. Used for mutation/login/logout origin checks rather than an untrusted request host. Preview origins need explicit separate configuration.
- `AS_CRM_INTAKE_TOKEN`: a distinct >=32-character server-to-server intake credential. It cannot log into the dashboard or call staff endpoints.
- Existing repair `AS_INTAKE_WEBHOOK_URL`: the approved origin's `/api/crm/intake` endpoint.
- Existing repair `AS_INTAKE_WEBHOOK_TOKEN`: the same approved intake-only credential.
- Existing repair `AS_INTAKE_ENABLED=false`: leave off until end-to-end acceptance, including a real monitored alert delivery, succeeds.

No values were retrieved, generated or configured. New persistent credentials and activation require the appropriate authorization and secure setup. `.env.example` contains only empty values and false activation flags.

## PostgreSQL install specification

`db/as-crm-schema.sql` is a reviewed installation **specification**, not a generated/applied Supabase migration. The CLI, PostgreSQL server and `psql` are unavailable here. No migration filename/history was invented. In an approved isolated environment, inspect the current CLI help, create a tracked migration with `supabase migration new`, apply/review the specification, run database advisors and the supplied SQL acceptance suite, and verify migration state. No part of that setup has happened.

The SQL deliberately creates a fresh private schema without `IF NOT EXISTS`; accidental reapplication fails instead of silently accepting a mismatched installation. Normal application tables are never created in `public`. Only named RPC wrappers are public, with execute revoked from browser roles in the same transaction as creation.

`tests/crm-database.sql` covers tenant checks, scoped relations, receipt replay/conflict, phone-only dedupe, pipeline/version/booking guards, lease settlement/retries/exhaustion, staff disable and transaction rollback. It is **not yet run**. `tests/crm-postgres-acceptance.md` adds the required multi-connection concurrency and permissions cases. Passing JavaScript mocks cannot replace these database checks.

## Intake and retry contract

Website `POST /api/assessment` still validates the form and forwards `{schemaVersion:1, source:'as-website-assessment', assessment:{...}}` with bearer intake authorization and `Idempotency-Key`. The receiver returns `{stored:true, notificationQueued:true, inquiryId}` only after the RPC transaction commits. Identical retries return the original receipt; changed reuse returns conflict. Different request keys are different inquiries, even for a returning customer. Deduplication is contact/vehicle linkage, not silent suppression of a customer's new request.

The public form reports `received` only from that explicit durable receipt, preserves fields on uncertainty and uses the same key for an unchanged in-page retry. `notificationQueued` means the durable queue entry was committed; it does not promise email delivery. A preferred service date is not a confirmed appointment. No calendar provider is implemented.

The browser-facing repair still maps an upstream conflict/unavailable response to its cautious unconfirmed receipt message. A reload/new request gets a new key. The receiver exposes no customer list, status lookup or contact record to anonymous visitors.

## Email delivery gap and launch gates

`processOutbox` is an internal callable worker, not a public route or scheduled job. There is currently **no production provider adapter, verified notification destination, worker schedule or operational alert monitoring**. Do not enable customer intake while alerts would merely accumulate unnoticed.

A production provider must support persistent idempotency keyed by `as-outbox-<outbox UUID>` for the full retry window, honoring AbortSignal where possible. A send can succeed before its acknowledgement is lost; retries use the same key. This gives application-level retry safety only if the provider actually deduplicates. Never claim exactly-once email delivery from the fake. Wire the approved provider and monitored recipient through secure server configuration, then verify real synthetic delivery, timeout recovery and visible terminal failures. Failure retries stop after five attempts; unresolved terminal failures need an approved operational requeue/support procedure. No automatic requeue endpoint is included.

The database includes durable global and account/contact rate budgets. They are a conservative abuse brake, **not a complete anti-abuse perimeter**. An attacker can exhaust the shared login budget and temporarily block legitimate logins; account-specific lockouts can also be abused. Before launch, establish trusted edge/source throttling and an account recovery/abuse response plan; do not trust caller-supplied forwarding headers or claim origin validation stops scripted clients. Review scrypt cost/capacity, retention/deletion, backup/restore, monitoring and provider costs. No CAPTCHA or external security service was connected.

Staff bootstrap, recovery/MFA decisions, infrastructure cost/retention, alert destination, deployment authorization and calendar business rules remain owner decisions. The build uses existing Next 14 dependencies unchanged; check its current security/support posture and complete approved upgrades separately before production activation.

## Local verification

Run `npm test` on Node 24. It uses the existing no-dependency TypeScript stripping test hook; database and email calls are mocked. No third-party test dependencies were added.

Also run `npm run lint`, `npm run typecheck`, and `npm run build` in an authorized fully installed environment. Here each is blocked with exit 127 because `next`/`tsc` are missing. An earlier dependency-install action was denied; it was not retried or bypassed. No browser render or real database test was possible. Do not describe this as a working deployed dashboard or completed production protection.

Required browser acceptance after a successful build:
1. With config absent, `/admin` is disabled and all staff APIs fail closed. The public form stays unavailable before collecting details.
2. With approved test config, check correct/wrong login, rate limits, expiry, disable/password changes, logout in two tabs, back/forward, focus/visibility and loss of database access. No customer data should appear without verified session access.
3. On mobile and desktop, inspect labels/focus/contrast/scrolling, filter/pagination, tap-to-call, encoded email links, note entry, date timezone, failed saves, double-clicks, stale versions, unsaved-view changes and session expiry mid-edit.
4. Submit only an approved, clearly synthetic inquiry; retry uncertain requests and verify one durable lead/outbox, accurate receipt text and real alert delivery. Confirm no calendar event is fabricated.
5. Independently test anonymous direct Data API attempts and cross-tenant relation/session spoofs. Prove database transaction and concurrent receipt/outbox invariants before enabling intake.

References checked: [Next 14 route handlers](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers), [Supabase API security](https://supabase.com/docs/guides/api/securing-your-api), [Supabase functions](https://supabase.com/docs/guides/database/functions), [current key types](https://supabase.com/docs/guides/getting-started/api-keys), [PostgreSQL locking](https://www.postgresql.org/docs/current/sql-select.html), [Node crypto](https://nodejs.org/api/crypto.html). The lightweight Supabase changelog fetch was attempted but unavailable through the web reader; current relevant official documentation was checked directly.
