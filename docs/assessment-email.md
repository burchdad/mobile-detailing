# Assessment email preview — activation blocked
Prepared 2026-10-28. This implementation uses the existing Resend API, not the unactivated CRM/database/outbox branch. It remains disabled without complete explicit server configuration. No messages or credentials were created.

## Required configuration
- AS_ASSESSMENT_ENABLED: literal true only after activation approval; default false.
- AS_ASSESSMENT_RESEND_API_KEY: existing authorized server-only Resend sending credential, entered through the approved secure flow.
- AS_ASSESSMENT_FROM: approved bare sender address on an already verified Resend domain.
- AS_ASSESSMENT_TO: approved single destination mailbox, entered in server configuration; not a browser value.
- AS_ASSESSMENT_SITE_ORIGIN: exact HTTPS origin for this deployment (production or the specific preview). No paths, ports, query strings or credentials.
Never prefix these with NEXT_PUBLIC_. Preview must not silently inherit production delivery activation. Changing sender/recipient during pending retries may cause provider idempotency conflicts; preserve the settings until outstanding retries are resolved.

Read-only provider inspection found no A&S domain among the sending domains. An existing verified Ghost domain may be used only if its precise sender and use for this client are explicitly approved. Other clients' domains must never be borrowed. Account connector access is not an application API credential. There are currently no assessment credentials configured on this Vercel project.

## Receipt and privacy
POST /api/assessment validates bounded JSON and the existing service/condition/date/phone fields. Only the fixed server recipient gets a plain-text message. Visitor input cannot set recipients, sender, subject, HTML, or reply-to. Browser details stay only in page memory; no localStorage/sessionStorage, database, admin UI, payload logging, or customer acknowledgement email is added.
The only success is HTTP 202 with {status:"accepted",messageId} after Resend returns a valid message ID. The page says the email service accepted the request for delivery. This is not inbox receipt, durable CRM storage, booking, or payment confirmation. Provider failures, timeouts, invalid responses, and uncertain acknowledgement preserve form values and never claim receipt.
A disabled form returns the existing honest contact fallback before rendering input fields.

## Retries and abuse controls
Double clicks are blocked synchronously. Unchanged retries keep the same UUID and exact body, sent as as-assessment-<UUID> to Resend. The client and server refuse retries after 23 hours, inside Resend's documented 24-hour key window. The client timestamp is a retry guard, not a trusted bot signal. Reloading the page or changing details creates a new request; no exactly-once guarantee across those actions is claimed. On uncertainty the UI asks customers to keep the page open and retry unchanged, or contact A&S.
A honeypot, strict configured-origin checks, body/field bounds, no redirects, eight-second provider timeout and a bounded process-local limit (3 attempts/contact/minute, 30 total/minute) provide defense in depth. The limiter retains only short-lived phone hashes, not raw phone values. It is NOT distributed and resets across serverless instances. Before public activation, verify approved Vercel edge rate limiting/bot controls on POST /api/assessment; no security settings were changed by this patch. Do not describe the local limiter or Origin header as a full anti-abuse solution.
No automatic retry worker, queue, delivery webhook, durable lead backup, or bounce monitor is added. The approved operator must monitor provider failures/bounces and the destination inbox. If durable lead retention and autonomous retries are required, the separate reviewed CRM/queue path is the appropriate larger scope.

## Verification handoff
The selected executor failed provisioning during native_git. The parent can materialize this branch into its clean authorized test directory using GitHub file contents and existing dependencies. No package changes or installation required.
Run with Node 24:
    npm test
    npm run lint
    npm run typecheck
    npm run build
Mock tests inject the provider transport and clock; no test contacts Resend. They cover disabled/malformed configuration, routing injection, validation/honeypot, origins/types, malformed/oversized input, retry expiry, stable keys and payload, rate bounds/reset, malformed provider acknowledgements, 409/429/500/timeouts, and exact accepted contract.
Browser QA in that workspace must mock /api/assessment and exercise keyboard labels/focus, no fields while disabled, success focus, double-click prevention, error retention, retry keys, no-JavaScript fallback, and mobile layout.
Before a real test: approve exact sender and destination, secure credential configuration, confirm the prior one-test allowance remains unused, agree exact harmless test data and count, and use the approved non-production target. Match the returned provider message ID to delivery status and actual destination receipt. No such test has occurred here.
Production publication remains on hold until explicit approval after these checks.

References checked 2026-10-28:
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys
