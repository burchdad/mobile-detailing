import { receiptIdPattern, requestIdPattern, validateAssessment } from "./assessment";

const maxBodyBytes = 12_000;
const unavailableMessage = "Online requests are temporarily unavailable. Your request has not been sent. Please use the contact page.";
const unconfirmedMessage = "We couldn't confirm receipt. Your details are still here. You can retry or use the contact page.";

type IntakeConfig = { url: string; token: string };
export type IntakeEnvironment = {
  [key: string]: string | undefined;
  AS_INTAKE_ENABLED?: string;
  AS_INTAKE_WEBHOOK_URL?: string;
  AS_INTAKE_WEBHOOK_TOKEN?: string;
};

// No provider or recipient is assumed. Enable only after the contract in
// docs/assessment-intake.md is implemented and verified for the owner's system.
export function readIntakeConfig(env: IntakeEnvironment): IntakeConfig | null {
  if (env.AS_INTAKE_ENABLED !== "true" || !env.AS_INTAKE_WEBHOOK_URL || !env.AS_INTAKE_WEBHOOK_TOKEN?.trim()) return null;
  try {
    const url = new URL(env.AS_INTAKE_WEBHOOK_URL);
    if (url.protocol !== "https:" || url.username || url.password || url.hash || url.search ||
      !/^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(url.hostname) ||
      /(?:^|\.)(localhost|local|internal|test|example|invalid)$/.test(url.hostname) ||
      /^(?:\d+\.){3}\d+$/.test(url.hostname)) return null;
    return { url: url.href, token: env.AS_INTAKE_WEBHOOK_TOKEN };
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

export async function handleAssessmentRequest(
  request: Request,
  env: IntakeEnvironment,
  send: typeof fetch = fetch,
): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (request.headers.get("origin") !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return json({ error: "Please submit the form from this website." }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return json({ error: "Unsupported request format." }, 415);
  }
  const idempotencyKey = request.headers.get("idempotency-key") ?? "";
  if (!requestIdPattern.test(idempotencyKey)) return json({ error: "Please refresh the form and try again." }, 400);

  let input: unknown;
  try { input = await readLimitedJson(request); }
  catch { return json({ error: "The request is invalid or too large. Please check your details." }, 400); }
  const assessment = validateAssessment(input);
  if (!assessment.ok) return json({ error: assessment.message }, 400);

  const config = readIntakeConfig(env);
  if (!config) return json({ error: unavailableMessage }, 503);

  try {
    const response = await send(config.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({ schemaVersion: 1, source: "as-website-assessment", assessment: assessment.data }),
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return json({ error: unconfirmedMessage }, 502);
    const receipt = await readLimitedJson(response);
    if (!receipt || typeof receipt !== "object") return json({ error: unconfirmedMessage }, 502);
    const result = receipt as Record<string, unknown>;
    // A generic HTTP 200 is not evidence that a lead was stored and queued.
    if (result.stored !== true || result.notificationQueued !== true ||
      typeof result.inquiryId !== "string" || !receiptIdPattern.test(result.inquiryId)) {
      return json({ error: unconfirmedMessage }, 502);
    }
    return json({ status: "received", inquiryId: result.inquiryId }, 201);
  } catch {
    // Never log the payload, upstream body, URL, credential, or personal data.
    return json({ error: unconfirmedMessage }, 502);
  }
}
