import { createHash } from "node:crypto";
import { isProviderMessageId, requestIdPattern, validateAssessment } from "./assessment";

type Environment = Record<string, string | undefined>;
type Config = { apiKey: string; from: string; to: string; origin: string };
const mailbox = /^[A-Za-z0-9.!#$%&'*+/=?^`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
const maxBodyBytes = 12_000;
const unavailableMessage = "Online requests are temporarily unavailable. Please contact A&S directly.";
const unconfirmedMessage = "We couldn't confirm email acceptance. Please keep this page open and retry without changing your details, or contact A&S.";
export function readIntakeConfig(env: Environment): Config | null {
  if (env.AS_ASSESSMENT_ENABLED !== "true") return null;
  const apiKey = env.AS_ASSESSMENT_RESEND_API_KEY ?? "";
  const from = env.AS_ASSESSMENT_FROM ?? "";
  const to = env.AS_ASSESSMENT_TO ?? "";
  try {
    const origin = new URL(env.AS_ASSESSMENT_SITE_ORIGIN ?? "");
    if (!/^re_[A-Za-z0-9_-]{16,}$/.test(apiKey) || !mailbox.test(from) || !mailbox.test(to) ||
        from.length > 254 || to.length > 254 || origin.protocol !== "https:" ||
        origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash || origin.port) return null;
    return { apiKey, from, to, origin: origin.origin };
  } catch { return null; }
}

function json(body: unknown, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function readLimitedJson(request: Request | Response): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > maxBodyBytes || !request.body) throw new Error("body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) { await reader.cancel(); throw new Error("body"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}


// Bounded, non-persistent defense in depth. This is not a distributed edge limiter.
// Production activation additionally requires verified platform rate limits.
export function createAssessmentLimiter(now: () => number = Date.now) {
  let windowStart = now();
  let total = 0;
  const contacts = new Map<string, number>();
  return (phone: string): boolean => {
    if (now() - windowStart >= 60_000) { windowStart = now(); total = 0; contacts.clear(); }
    if (total >= 30) return false;
    const hash = createHash("sha256").update(phone.replace(/\D/g, "")).digest("hex");
    const count = contacts.get(hash) ?? 0;
    if (count >= 3) return false;
    contacts.set(hash, count + 1); total++;
    return true;
  };
}
const allowRequest = createAssessmentLimiter();

export async function handleAssessmentRequest(
  request: Request, env: Environment, send: typeof fetch = fetch,
  allow: (phone: string) => boolean = allowRequest, now: () => number = Date.now,
): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const config = readIntakeConfig(env);
  if (!config) return json({ error: unavailableMessage }, 503);
  if (request.headers.get("origin") !== config.origin || new URL(request.url).origin !== config.origin ||
      request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "Submit from the assessment page." }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json")
    return json({ error: "Unsupported request format." }, 415);
  const key = request.headers.get("idempotency-key") ?? "";
  const started = Number(request.headers.get("x-assessment-started"));
  // Client retry expiry is a duplicate-safety guard, not authentication or bot detection.
  if (!requestIdPattern.test(key) || !Number.isSafeInteger(started) || started <= 0 ||
      now() - started < 0 || now() - started >= 23 * 60 * 60 * 1000)
    return json({ error: "This retry window expired. Contact A&S before starting another request." }, 409);
  let input: unknown;
  try { input = await readLimitedJson(request); }
  catch { return json({ error: "The request is invalid or too large." }, 400); }
  const assessment = validateAssessment(input);
  if (!assessment.ok) return json({ error: assessment.message }, 400);
  if (!allow(assessment.data.phone)) return json({ error: "Too many attempts. Wait a minute before retrying." }, 429);
  const a = assessment.data;
  const text = [
    "A&S vehicle assessment request", "", "This is an inquiry, not a confirmed appointment.",
    "", "Name: " + a.fullName, "Phone: " + a.phone, "Email: " + (a.email || "Not provided"),
    "Vehicle: " + a.vehicle, "Service: " + a.service, "Condition: " + a.condition,
    "Preferred date (not confirmed): " + a.preferredDate, "Service location: " + a.location,
    "", "Notes:", a.notes || "None", "", "Request reference: " + key,
  ].join("\n");
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST", redirect: "error", cache: "no-store", signal: AbortSignal.timeout(8000),
      headers: { Authorization: "Bearer " + config.apiKey, "Content-Type": "application/json",
        "Idempotency-Key": "as-assessment-" + key },
      // Recipient, sender, subject and HTML stay fixed. Reply-To is one validated mailbox.
      body: JSON.stringify({ from: config.from, to: [config.to], subject: "A&S vehicle assessment request", text,
        ...(a.email ? { reply_to: a.email } : {}) }),
    });
    if (!response.ok) return json({ error: unconfirmedMessage }, 502);
    const result = await readLimitedJson(response);
    if (!result || typeof result !== "object" || !("id" in result) ||
        !isProviderMessageId(result.id))
      return json({ error: unconfirmedMessage }, 502);
    return json({ status: "accepted", messageId: result.id }, 202);
  } catch {
    // Never log personal data, credentials, or upstream response bodies.
    return json({ error: unconfirmedMessage }, 502);
  }
}
