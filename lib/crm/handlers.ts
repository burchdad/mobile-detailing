import { requestIdPattern, validateAssessment } from "../assessment";
import { digest, login, readSessionToken, requireSession, safeEqual, sessionCookie } from "./auth";
import { readCrmConfig, type Environment } from "./config";
import { DatabaseRpc, limitedJson } from "./rpc";
import { CrmError, TENANT, stages, type DurableReceipt, type Lead, type Rpc } from "./types";

const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
export const privateHeaders = { "Cache-Control": "private, no-store, max-age=0", "Vary": "Cookie", "X-Content-Type-Options": "nosniff" };
function json(value: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(value, { status, headers: { ...privateHeaders, ...headers } });
}
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new CrmError(400, "Invalid request.");
  return value as Record<string, unknown>;
}
function onlyKeys(value: Record<string, unknown>, allowed: string[]) {
  if (Object.keys(value).some(key => !allowed.includes(key))) throw new CrmError(400, "Unexpected request fields.");
}
function requireJson(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new CrmError(415, "Use JSON for this request.");
  }
}
function requireOrigin(request: Request, siteOrigin: string) {
  if (request.headers.get("origin") !== siteOrigin || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new CrmError(403, "Use the A&S staff website for this action.");
  }
}
async function run(work: () => Promise<Response>): Promise<Response> {
  try { return await work(); }
  catch (error) {
    return error instanceof CrmError ? json({ error: error.message }, error.status) : json({ error: "CRM is unavailable. Please retry." }, 503);
  }
}
function context(env: Environment, override?: Rpc) {
  const config = readCrmConfig(env);
  if (!config) throw new CrmError(503, "Staff CRM is disabled pending setup and verification.");
  return { config, db: override ?? new DatabaseRpc(config) };
}

export function handleLogin(request: Request, env: Environment, override?: Rpc) {
  return run(async () => {
    const { config, db } = context(env, override);
    requireOrigin(request, config.siteOrigin); requireJson(request);
    const body = record(await limitedJson(request, 2000)); onlyKeys(body, ["email", "password"]);
    if (typeof body.email !== "string" || typeof body.password !== "string") throw new CrmError(400, "Enter email and password.");
    const token = await login(db, body.email, body.password);
    return json({ signedIn: true }, 200, { "Set-Cookie": sessionCookie(token) });
  });
}
export function handleSession(request: Request, env: Environment, override?: Rpc) {
  return run(async () => {
    const { db } = context(env, override);
    const { staff } = await requireSession(request, db);
    return json({ signedIn: true, expiresAt: staff.expiresAt });
  });
}
export function handleLogout(request: Request, env: Environment, override?: Rpc) {
  return run(async () => {
    const { config, db } = context(env, override); requireOrigin(request, config.siteOrigin);
    const token = readSessionToken(request);
    if (token) await db.call("as_revoke_session", { p_session_hash: digest(token) });
    return json({ signedOut: true }, 200, { "Set-Cookie": sessionCookie("", true) });
  });
}
export function handleList(request: Request, env: Environment, override?: Rpc) {
  return run(async () => {
    const { db } = context(env, override); const session = await requireSession(request, db);
    const url = new URL(request.url);
    if (Array.from(url.searchParams.keys()).some(key => !["filter", "offset"].includes(key))) throw new CrmError(400, "Unexpected query fields.");
    const filter = url.searchParams.get("filter") ?? "all";
    const offset = Number(url.searchParams.get("offset") ?? "0");
    if (!["all", "due", ...stages].includes(filter) || !Number.isInteger(offset) || offset < 0 || offset > 100_000) {
      throw new CrmError(400, "Invalid filter.");
    }
    const result = await db.call<{ leads: Lead[]; hasMore: boolean }>("as_list_leads", { p_session_hash: session.hash, p_filter: filter, p_offset: offset });
    if (!result || !Array.isArray(result.leads) || result.leads.some(lead => lead.tenant !== TENANT)) throw new CrmError(503, "CRM is unavailable.");
    return json({ ...result, role: session.staff.role, expiresAt: session.staff.expiresAt, calendarStatus: "not_connected", emailStatus: "provider_not_connected" });
  });
}
export function handleUpdate(request: Request, id: string, env: Environment, override?: Rpc) {
  return run(async () => {
    const { config, db } = context(env, override); requireOrigin(request, config.siteOrigin); requireJson(request);
    const session = await requireSession(request, db);
    if (!uuid.test(id)) throw new CrmError(404, "Inquiry not found.");
    const body = record(await limitedJson(request, 6000));
    onlyKeys(body, ["stage", "followUpDueAt", "note", "version", "manualBookingConfirmed"]);
    if (!Number.isInteger(body.version) || Number(body.version) < 1 ||
      typeof body.stage !== "string" || !(stages as readonly string[]).includes(body.stage) ||
      typeof body.note !== "string" || body.note.length > 2000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(body.note) ||
      !(body.followUpDueAt === null || (typeof body.followUpDueAt === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(body.followUpDueAt) && Number.isFinite(Date.parse(body.followUpDueAt)))) ||
      (body.manualBookingConfirmed !== undefined && typeof body.manualBookingConfirmed !== "boolean")) {
      throw new CrmError(400, "Check the stage, follow-up date and note.");
    }
    const result = await db.call<{ updated: boolean }>("as_update_lead", { p_session_hash: session.hash, p_lead_id: id, p_version: body.version,
      p_stage: body.stage, p_follow_up: body.followUpDueAt, p_note: body.note.trim(), p_booking_confirmed: body.manualBookingConfirmed === true });
    if (!result || result.updated !== true) throw new CrmError(503, "Update could not be verified. Refresh before retrying.");
    return json({ updated: true });
  });
}
export function handleIntake(request: Request, env: Environment, override?: Rpc) {
  return run(async () => {
    const { config, db } = context(env, override);
    if (!config.intakeToken || !safeEqual(request.headers.get("authorization") ?? "", `Bearer ${config.intakeToken}`)) {
      throw new CrmError(401, "Access denied.");
    }
    requireJson(request);
    const key = request.headers.get("idempotency-key") ?? "";
    if (!requestIdPattern.test(key)) throw new CrmError(400, "Invalid idempotency key.");
    const body = record(await limitedJson(request)); onlyKeys(body, ["schemaVersion", "source", "assessment"]);
    if (body.schemaVersion !== 1 || body.source !== "as-website-assessment") throw new CrmError(400, "Unsupported intake version.");
    const input = record(body.assessment);
    onlyKeys(input, ["fullName", "phone", "email", "vehicle", "service", "condition", "preferredDate", "location", "notes", "website"]);
    const checked = validateAssessment(input);
    if (!checked.ok) throw new CrmError(400, checked.message);
    const assessment = { ...checked.data, phone: checked.data.phone.replace(/\D/g, ""), email: checked.data.email.toLowerCase() };
    if (assessment.phone.length === 11 && assessment.phone.startsWith("1")) assessment.phone = assessment.phone.slice(1);
    // validateAssessment constructs a stable ordered payload. Tenant is NEVER read from input.
    const result = await db.call<DurableReceipt>("as_accept_inquiry", { p_request_id: key.toLowerCase(),
      p_payload_hash: digest(JSON.stringify(assessment)), p_assessment: assessment });
    if (!result || result.stored !== true || result.notificationQueued !== true || !uuid.test(result.inquiryId)) {
      throw new CrmError(503, "Receipt could not be verified. Retry with the same request key.");
    }
    return json(result, 201);
  });
}
