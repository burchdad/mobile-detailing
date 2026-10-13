import type { CrmConfig } from "./config";
import { CrmError, type Rpc } from "./types";

export async function limitedJson(message: Request | Response, maximum = 12_000): Promise<unknown> {
  if (!message.body || Number(message.headers.get("content-length")) > maximum) throw new CrmError(400, "Request is invalid or too large.");
  const reader = message.body.getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > maximum) { await reader.cancel(); throw new CrmError(400, "Request is too large."); }
      chunks.push(value);
    }
    const body = new Uint8Array(size); let offset = 0;
    for (const value of chunks) { body.set(value, offset); offset += value.byteLength; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
  } catch (error) {
    if (error instanceof CrmError) throw error;
    throw new CrmError(400, "Request is invalid.");
  } finally { reader.releaseLock(); }
}

export class DatabaseRpc implements Rpc {
  private config: CrmConfig;
  private send: typeof fetch;
  constructor(config: CrmConfig, send: typeof fetch = fetch) { this.config = config; this.send = send; }
  async call<T>(name: string, args: Record<string, unknown>): Promise<T> {
    if (!/^as_[a-z_]+$/.test(name)) throw new CrmError(503, "CRM is unavailable.");
    try {
      const response = await this.send(`${this.config.databaseUrl}/rest/v1/rpc/${name}`, {
        method: "POST", headers: { "Content-Type": "application/json", apikey: this.config.serviceKey,
          ...(this.config.serviceKey.startsWith("sb_secret_") ? {} : { Authorization: `Bearer ${this.config.serviceKey}` }) }, body: JSON.stringify(args),
        redirect: "error", cache: "no-store", signal: AbortSignal.timeout(8_000),
      });
      if (!response.ok) throw new CrmError(503, "CRM is unavailable. Please retry.");
      let result: unknown;
      try { result = await limitedJson(response, 2_000_000); }
      catch { throw new CrmError(503, "CRM returned an invalid response. Please retry."); }
      if (result && typeof result === "object" && "error" in result) {
        const code = (result as { error: string }).error;
        const errors: Record<string, [number, string]> = {
          unauthorized: [401, "Please sign in again."], forbidden: [403, "Access denied."],
          conflict: [409, "This request changed. Refresh and try again."], not_found: [404, "Inquiry not found."],
          invalid: [400, "Check the requested change."], rate_limited: [429, "Too many requests. Please try again later."],
        };
        const mapped = errors[code];
        throw new CrmError(...(mapped ?? [503, "CRM is unavailable."] as [number, string]));
      }
      return result as T;
    } catch (error) {
      if (error instanceof CrmError) throw error;
      // Never expose a provider response, URL, credential, password or customer details.
      throw new CrmError(503, "CRM is unavailable. Please retry.");
    }
  }
}
