import type { EmailProvider } from "./outbox";
import type { Environment } from "./config";

export type EmailConfig = { apiKey: string; from: string; to: string; siteOrigin: string };
const mailbox = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function readEmailConfig(env: Environment): EmailConfig | null {
  // This is a separate kill switch. Presence of credentials never activates delivery.
  if (env.AS_CRM_EMAIL_ENABLED !== "true") return null;
  const apiKey = env.AS_CRM_EMAIL_API_KEY ?? "";
  const from = env.AS_CRM_EMAIL_FROM ?? "";
  const to = env.AS_CRM_EMAIL_TO ?? "";
  try {
    const site = new URL(env.AS_CRM_SITE_ORIGIN ?? "");
    if (!/^re_[A-Za-z0-9_-]{16,}$/.test(apiKey) || !mailbox.test(from) || !mailbox.test(to) ||
      from.length > 254 || to.length > 254 || site.protocol !== "https:" || site.username || site.password ||
      site.pathname !== "/" || site.search || site.hash || site.port) return null;
    return { apiKey, from, to, siteOrigin: site.origin };
  } catch { return null; }
}

// Candidate production adapter, not connected to a route or scheduler.
// Recipient/domain verification and secure configuration remain operational launch gates.
export class ResendEmailProvider implements EmailProvider {
  private config: EmailConfig;
  private transport: typeof fetch;
  private now: () => number;
  constructor(config: EmailConfig, transport: typeof fetch = fetch, now: () => number = Date.now) {
    const validated = readEmailConfig({ AS_CRM_EMAIL_ENABLED: "true", AS_CRM_EMAIL_API_KEY: config.apiKey,
      AS_CRM_EMAIL_FROM: config.from, AS_CRM_EMAIL_TO: config.to, AS_CRM_SITE_ORIGIN: config.siteOrigin });
    if (!validated) throw new Error("Invalid email configuration.");
    this.config = validated; this.transport = transport; this.now = now;
  }
  async send(input: Parameters<EmailProvider["send"]>[0]): Promise<{ messageId: string }> {
    const firstAttempt = Date.parse(input.firstAttemptAt ?? "");
    const age = this.now() - firstAttempt;
    if (input.signal.aborted || !Number.isFinite(age) || age < 0 || age >= 23 * 60 * 60 * 1000 ||
      !uuid.test(input.inquiryId) || !input.idempotencyKey.startsWith("as-outbox-") ||
      !uuid.test(input.idempotencyKey.slice(10))) throw new Error("Unsafe email attempt.");
    // No user-supplied names, addresses or notes are forwarded into mail or headers.
    // Fixed text + immutable inquiry ID keeps retry payloads stable and minimizes PII.
    try {
    const response = await this.transport("https://api.resend.com/emails", {
      method: "POST", redirect: "error", cache: "no-store", signal: input.signal,
      headers: { Authorization: `Bearer ${this.config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": input.idempotencyKey },
      body: JSON.stringify({ from: this.config.from, to: [this.config.to], subject: "New A&S vehicle assessment inquiry",
        text: `A new vehicle assessment inquiry is saved in the A&S staff CRM.\n\nReference: ${input.inquiryId}\nReview securely: ${this.config.siteOrigin}/admin\n\nThis is an inquiry, not a confirmed appointment.\n` }),
    });
    if (!response.ok) throw new Error("Email delivery unconfirmed.");
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !uuid.test(result.id)) {
      throw new Error("Email delivery unconfirmed.");
    }
    // Provider acceptance is NOT proof of inbox delivery. Bounce monitoring remains required.
    return { messageId: result.id };
    } catch { throw new Error("Email delivery unconfirmed."); }
  }
}
