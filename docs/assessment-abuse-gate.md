# Assessment abuse-control activation gate
Proposed 2026-10-28. This is a review plan, not applied security configuration.

## Observed state
Read-only GET of active firewall configuration for project prj_gJZCF2vu6Olcu3W5Yb7CJqavm5WH in team team_8w5FXbJbJEP5ODMBWfvv39hR returned 404 "Config not found". It does not prove a total absence of Vercel system protection, but no endpoint-specific rate rule was verified.
The application process-local limiter resets across instances. Origin checks and a honeypot do not stop scripted callers.

## Proposed existing-platform rule
Within this project only, propose a WAF custom rule named "A&S assessment POST rate limit":
- Match request method POST AND exact request path /api/assessment.
- Fixed window: 60 seconds; 5 requests per trusted platform source IP.
- Enforcement: default HTTP 429. Do not use a challenge response inside JSON POST handling.
- Include all applicable project aliases so an alternate hostname cannot bypass the endpoint limit; preserve existing preview authentication.
- Preserve every unrelated rule and bypass setting. Inspect ordering and any bypass that could skip this path. Do not trust caller-supplied X-Forwarded-For as the counting key.
This is an initial conservative recommendation, subject to owner/operator review and observed shared-IP usage. It does not guarantee a global aggregate cap or stop rotating-source abuse.

Vercel documents fixed-window WAF limits on all plans, with counters per region. Hobby includes one rate-limit rule; Pro usage may be billed. Confirm the actual team plan, unused capacity, pricing dialog and existing allowance before any action. Do not enable paid usage or upgrade a plan automatically. If no approved included capacity exists, leave public intake disabled and return the exact cost/approval question.
Source: https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
Pricing: https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing

## Verification sequence — separate authorization required
1. Export/read the current configuration and retain its version for rollback. Show the exact proposed rule, destination scope and cost before approval. The current production hold does not authorize publishing firewall changes.
2. After approval, apply only the reviewed rule and read back the resulting active configuration. Record rule ID, version and match/action settings.
3. With intake disabled or using a local/mock provider (never an active real sender), authorize a fixed seven-request preview test to /api/assessment. Use an invalid, empty synthetic body, no customer data, and an authorized authenticated preview session. Keep requests in the same window and source. Confirm rate-limited requests stop at the edge, and inspect the matching rule events. A single regional test does not prove all-region behavior.
4. Confirm a post-window request is allowed through to normal application validation; authorize this additional request explicitly. Do not use the separate one-email inquiry allowance for rate testing. Confirm no emails were sent.
5. Verify normal browser form errors retain fields when the edge returns 429 or non-JSON. Mocked UI testing can run before security approval.
6. Only then consider activating the protected preview for the exact separately authorized delivery test. Public activation still needs production publication approval and monitoring.

## Operating limits
The proposed rule is distributed across server instances but region-scoped, not an account-wide global quota. Monitor endpoint traffic, provider usage/errors and bounce events. Confirm who can disable AS_ASSESSMENT_ENABLED promptly if abuse or delivery failure occurs. Do not turn on a paid bot feature, new storage service or broad site challenge as an incidental change. If stronger globally durable throttling or bot verification is required, obtain a separate scoped implementation decision.
