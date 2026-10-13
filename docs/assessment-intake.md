# Assessment intake: safe default and activation contract

## Current behavior

Online requests remain **disabled** unless all three server-only settings below are present and valid. The assessment page shows an unavailable notice before collecting details. The API independently returns HTTP 503 without contacting a receiver when unconfigured. This replaces the old 1.2-second timer that displayed success without storing or sending anything.

This patch does not establish a CRM, email provider, calendar, inbox, or booking integration. No production credentials or destinations have been configured. A generic server-side webhook boundary is prepared for the owner's approved system; it is not a claim that such a system already exists. The site's existing public contact details are unchanged and still need owner confirmation. The mobile bar now links to Contact and Assessment rather than dialing placeholder numbers.

## Required server settings

- `AS_INTAKE_ENABLED`: stays `false` until the verification checklist is complete. Only the literal `true` enables.
- `AS_INTAKE_WEBHOOK_URL`: exact approved HTTPS endpoint for the existing intake system. No user-info, query-string credentials, fragments, IP literals, or reserved local/test hostnames. Query strings are unsupported by this contract.
- `AS_INTAKE_WEBHOOK_TOKEN`: credential for that exact endpoint, entered through an approved secure setup flow. Never put it in source, browser code, chat, or a `NEXT_PUBLIC_` variable. The receiver must check this bearer credential.

No values are supplied or inferred. Environment changes require authorized setup, and enabling does not replace end-to-end verification. The website does not send customer data to a guessed mailbox or generic third-party service.

## Receiver contract

The server posts JSON, with `Authorization: Bearer ...`, `Content-Type: application/json`, and a UUID-v4 `Idempotency-Key` header:

```json
{
  "schemaVersion": 1,
  "source": "as-website-assessment",
  "assessment": {
    "fullName": "...", "phone": "...", "email": "",
    "vehicle": "...", "service": "Signature Detail", "condition": "Needs a reset",
    "preferredDate": "2027-02-28", "location": "...", "notes": ""
  }
}
```

A successful receiver must first durably store the lead in the approved CRM and durably enqueue the approved owner's email notification. It then returns a 2xx JSON response:

```json
{ "stored": true, "notificationQueued": true, "inquiryId": "opaque_safe_identifier" }
```

The reference is 1–100 ASCII letters, digits, underscores, or hyphens. No personal information belongs in it. Generic HTTP 200 or `{ "ok": true }` is not accepted as proof. The client shows received only after the website API returns a valid receipt. Email queued is not proof of delivery; the receiver must retry failures, surface failed deliveries, and support owner verification on the mobile device.

The receiver must implement persistent, atomic idempotency by header, return the original receipt for identical retries, and reject a reused key with a different payload. It must also enforce durable rate limits, payload validation, spam handling, and appropriate access/retention controls. The website's honeypot and browser-origin checks are defense-in-depth, not a complete bot or distributed rate-limit solution. Do not enable without the receiver's protections and a suitable platform rate limit.

The website has an 8-second upstream timeout and a 15-second browser timeout. It never follows redirects with credentials or customer data. Failed/uncertain responses preserve browser form values and say receipt could not be confirmed. They do not falsely assert that nothing was stored. An unchanged form retry reuses its key while the page remains open. Navigating away/reloading clears this in-memory state; no customer details are persisted to localStorage.

## Scheduling remains pending

`preferredDate` is a requested calendar date only. It does not reserve availability, select a time zone, allocate staff, create an event, accept payment, or confirm an appointment. Calendar selection, owner access, time zone, actual availability, service durations, business hours, travel buffers/radius, acceptance rules, and deposits/cancellation terms require confirmation before implementing automatic scheduling. Social account routing is also outside this repair.

## Activation checklist

1. Confirm the business owner's intended CRM/account, notification mailbox, and monitored phone/contact details. Confirm authorization to receive the submitted fields.
2. Identify or implement the approved receiver, its existing credential mechanism, durable storage, idempotency, notification queue/retry path, and rate limits. Do not invent an endpoint or create a new account/key without authorization.
3. Install dependencies in an authorized environment. Run `npm test` (Node 24), `npm run typecheck`, `npm run lint`, and `npm run build`.
4. On an authorized non-production preview, check small-screen/desktop navigation, keyboard trapping/Escape, route changes/back navigation, correct anchors, unconfigured notice, validation, repeated clicks, network failure, retries, malformed acknowledgements, and accessible status focus. Preserve disabled state if the receiver is not ready.
5. With explicit permission for a labelled synthetic submission, verify exactly one CRM lead and a real notification arriving on the owner's mobile email. Verify retry deduplication and failed-email recovery. Clean up test records only if authorized.
6. Obtain production publication authorization, deploy the reviewed commit, and verify that exact commit and live receipt path. Until then, describe this as a local review patch, not a live repair.
