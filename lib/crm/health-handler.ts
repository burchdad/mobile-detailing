import { requireSession } from "./auth";
import { readCrmConfig, type Environment } from "./config";
import { DatabaseRpc } from "./rpc";
import { CrmError, type Rpc } from "./types";
export async function handleHealth(request: Request, env: Environment, override?: Rpc) {
  const headers={"Cache-Control":"private, no-store", "Vary":"Cookie", "X-Content-Type-Options":"nosniff"};
  try {
    const config=readCrmConfig(env);
    if (!config) throw new CrmError(503,"CRM unavailable.");
    const db=override ?? new DatabaseRpc(config);
    const {hash}=await requireSession(request,db);
    return Response.json(await db.call("as_outbox_health",{p_session_hash:hash}),{headers});
  } catch (error) {
    return Response.json({error:error instanceof CrmError && error.status===401 ? "Please sign in." : "CRM unavailable."},
      {status:error instanceof CrmError && error.status===401 ? 401 : 503,headers});
  }
}
