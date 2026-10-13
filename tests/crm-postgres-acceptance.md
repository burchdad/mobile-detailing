# Database acceptance (not run)

The JavaScript suite mocks database RPC and does not prove PostgreSQL transactions or locks. `crm-database.sql` is a executable PostgreSQL acceptance suite for an approved, fresh, disposable local Supabase database. It wraps synthetic data in a rollback. No live database URL or credentials are included.

After the approved CLI creates a disposable local stack, first inspect its CLI help/version, generate a tracked migration through `supabase migration new`, and use the reviewed `db/as-crm-schema.sql` specification. Run SQL through the locally configured `psql`/CLI query tool, never against another client's project. Apply the schema, then run `tests/crm-database.sql` with error-stop enabled. Supabase's `anon`, `authenticated` and `service_role` roles must exist. Execute the acceptance suite as its local administrative test role.

Additional required concurrency acceptance in that disposable database:
1. In separate connections concurrently call `as_accept_inquiry` with the same UUID, canonical hash and synthetic payload. Hold one transaction open briefly before committing. All callers must receive the same receipt, with exactly one lead, receipt, customer, vehicle and outbox row.
2. Repeat with the same UUID but a changed payload/hash in one connection. Exactly one input is accepted; the other gets `conflict` and creates no extra rows.
3. Concurrent independent request UUIDs for the same synthetic phone must share a customer and normalized vehicle while keeping distinct inquiries/outbox entries.
4. Parallel `as_claim_outbox(1)` calls must not claim the same unexpired job. Expire a lease, claim it again, and prove its previous token can no longer settle it.
5. Simulate a provider accepting a stable idempotency key, then a worker crash before settlement. The same provider key must be used on retry, producing one logical provider delivery. A real provider must guarantee sufficient retention of its idempotency record; the included fake demonstrates only the application contract.
6. In role `anon` and `authenticated`, verify every CRM RPC and private table rejects access. With a valid staff session, try unrelated UUIDs and revoked, expired, disabled or password-changed sessions. Direct browser metadata must never establish membership.
7. Concurrently save a lead while disabling or changing the password of its staff account. The staff-then-session lock order must avoid deadlocks, and no revoked session may mutate after the revocation commits.
8. Review with the database advisors. Re-run the entire JavaScript suite, lint, TypeScript, production build and browser acceptance afterward.

No command in this file has been executed against a local or remote database in this review.
