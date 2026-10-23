import type { OutboxJob, Rpc } from "./types";
import { TENANT } from "./types";
export interface EmailProvider {
  // A production provider MUST persistently deduplicate this key across retries and timeouts.
  send(input: { idempotencyKey: string; inquiryId: string; fullName: string; service: string; firstAttemptAt?: string; signal: AbortSignal }): Promise<{ messageId: string }>;
}
export async function processOutbox(db: Rpc, provider: EmailProvider, timeoutMs = 10_000) {
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 30_000) throw new Error("Invalid worker timeout.");
  const jobs = await db.call<OutboxJob[]>("as_claim_outbox", { p_limit: 1 });
  // Claim only immediately actionable work: the 2-minute lease must not wait behind a batch.
  if (jobs.length > 1) throw new Error("Unexpected outbox batch size.");
  const result = { sent: 0, retried: 0, uncertain: 0 };
  for (const job of jobs) {
    if (job.tenant !== TENANT) throw new Error("Tenant mismatch; no email sent.");
    let providerId: string | null = null;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const delivered = await Promise.race([
        provider.send({ idempotencyKey: `as-outbox-${job.id}`, inquiryId: job.inquiryId,
          ...job.payload, firstAttemptAt: job.firstAttemptAt, signal: controller.signal }),
        new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error("timeout")); }, timeoutMs); }),
      ]);
      if (typeof delivered.messageId !== "string" || !/^[\w.-]{1,200}$/.test(delivered.messageId)) throw new Error("Invalid provider receipt.");
      providerId = delivered.messageId;
    } catch { /* Generic retry reason only. Do not persist provider errors or customer data. */ }
    finally { if (timer) clearTimeout(timer); }
    try {
      const settled = await db.call<boolean>("as_settle_outbox", { p_id: job.id, p_lease_token: job.leaseToken, p_provider_id: providerId });
      if (!settled) result.uncertain++;
      else if (providerId) result.sent++;
      else result.retried++;
    } catch { result.uncertain++; } // Lease expiry makes the durable job claimable again.
  }
  return result;
}
// Explicit test double; never wired into application routes or a production worker.
export class MockEmailProvider implements EmailProvider {
  readonly deliveries = new Map<string, string>();
  async send(input: { idempotencyKey: string; signal: AbortSignal }) {
    if (input.signal.aborted) throw new Error("Aborted");
    const messageId = this.deliveries.get(input.idempotencyKey) ?? `mock-${this.deliveries.size + 1}`;
    this.deliveries.set(input.idempotencyKey, messageId);
    return { messageId };
  }
}
