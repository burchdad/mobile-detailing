import { readCrmConfig, type Environment } from "./config";
import { readEmailConfig, ResendEmailProvider } from "./email-provider";
import { DatabaseRpc } from "./rpc";
import { processOutbox } from "./outbox";

// Internal entry point called only after the worker handler authenticates its caller.
// No schedule is installed; keep both flags off until activation acceptance passes.
export async function runConfiguredOutbox(env: Environment, transport: typeof fetch = fetch) {
  const crm = readCrmConfig(env);
  const email = readEmailConfig(env);
  if (!crm || !email) return { enabled: false as const };
  const result = await processOutbox(new DatabaseRpc(crm, transport), new ResendEmailProvider(email, transport));
  return { enabled: true as const, ...result };
}
