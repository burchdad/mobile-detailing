import { safeEqual } from "./auth";
import { readCrmConfig, type Environment } from "./config";
import { readEmailConfig } from "./email-provider";
import { runConfiguredOutbox } from "./worker";

export async function handleWorker(request: Request, env: Environment,
  run: typeof runConfiguredOutbox = runConfiguredOutbox): Promise<Response> {
  const json = (value: unknown, status: number) => Response.json(value, {status,
    headers: {"Cache-Control":"private, no-store", "X-Content-Type-Options":"nosniff", "Vary":"Authorization"}});
  if (request.method !== "POST") return json({error:"Method not allowed."},405);
  const token=env.AS_CRM_WORKER_TOKEN ?? "";
  // Distinct scheduler-only credential: intake and database keys cannot invoke this worker.
  if (env.AS_CRM_WORKER_ENABLED !== "true" || !/^[A-Za-z0-9_-]{32,256}$/.test(token) ||
    [env.AS_CRM_INTAKE_TOKEN, env.AS_INTAKE_WEBHOOK_TOKEN, env.AS_CRM_SERVICE_KEY, env.AS_CRM_EMAIL_API_KEY].includes(token) ||
    !readCrmConfig(env) || !readEmailConfig(env)) return json({error:"Worker unavailable."},503);
  const auth=request.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ") || auth.length > 263 || !safeEqual(auth.slice(7),token)) return json({error:"Unauthorized."},401);
  // No query arguments, job IDs, recipient overrides or bodies are accepted.
  if (new URL(request.url).search || request.body !== null) return json({error:"Empty request required."},400);
  try { return json(await run(env),200); }
  catch { return json({error:"Worker unavailable; inspect durable queue status."},503); }
}
