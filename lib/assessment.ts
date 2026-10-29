export const assessmentServices = [
  "Signature Detail", "Paint Enhancement", "Ceramic Protection",
  "Interior Preservation", "Vehicle Preservation Plan", "Fleet Care Program", "Not sure yet",
] as const;

export const assessmentConditions = [
  "Well maintained", "Needs a reset", "Heavy interior use", "Paint swirls or haze",
  "New vehicle protection", "Show / collector vehicle",
] as const;

export type Assessment = {
  fullName: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  condition: string;
  preferredDate: string;
  location: string;
  notes: string;
};

export type AssessmentReceipt = { status: "accepted"; messageId: string };
// Provider message IDs are opaque UUIDs, not request UUIDv4 keys.
// Accept standard UUID versions 1–8 (including UUIDv7) with the RFC variant.
export function isProviderMessageId(value: unknown): value is string {
  return typeof value === "string" && value.length === 36 &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
export const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isAssessmentReceipt(value: unknown): value is AssessmentReceipt {
  if (!value || typeof value !== "object") return false;
  const receipt = value as Record<string, unknown>;
  return receipt.status === "accepted" && isProviderMessageId(receipt.messageId);
}

// Conservative single ASCII mailbox for use in a Reply-To header.
// Display names, address lists, quoted locals, whitespace, and CR/LF are unsupported.
export function isReplyToEmail(value: string): boolean {
  if (value.length > 254 || /[^\x21-\x7e]/.test(value)) return false;
  const parts = value.split("@");
  if (parts.length !== 2 || parts[0].length > 64) return false;
  return /^[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*$/.test(parts[0]) &&
    /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/.test(parts[1]);
}

export function validateAssessment(value: unknown):
  | { ok: true; data: Assessment }
  | { ok: false; message: string } {
  const invalid = (message: string) => ({ ok: false as const, message });
  if (!value || typeof value !== "object" || Array.isArray(value)) return invalid("Check your assessment details.");
  const input = value as Record<string, unknown>;
  const limits: Record<keyof Assessment, number> = {
    fullName: 100, phone: 30, email: 254, vehicle: 150, service: 80,
    condition: 80, preferredDate: 10, location: 250, notes: 2000,
  };
  const data = {} as Assessment;
  for (const field of Object.keys(limits) as (keyof Assessment)[]) {
    const raw = input[field] ?? "";
    if (typeof raw !== "string" || raw.length > limits[field] || (field === "email" && /[\r\n]/.test(raw)) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(raw)) {
      return invalid("Check your assessment details and shorten any very long entries.");
    }
    data[field] = raw.trim();
  }
  if (input.website !== undefined && input.website !== "") return invalid("Unable to accept this request.");
  if (!data.fullName || !data.vehicle || !data.location) return invalid("Enter your name, vehicle, and service location.");
  if (!/^[+\d\s().-]+$/.test(data.phone) || !/^\d{10,15}$/.test(data.phone.replace(/\D/g, ""))) {
    return invalid("Enter a valid phone number, including the area code.");
  }
  if (data.email && !isReplyToEmail(data.email)) return invalid("Enter a single valid email address or leave email blank.");
  if (!(assessmentServices as readonly string[]).includes(data.service) || !(assessmentConditions as readonly string[]).includes(data.condition)) {
    return invalid("Choose a service and the current vehicle condition.");
  }
  const date = new Date(`${data.preferredDate}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== data.preferredDate) {
    return invalid("Choose a valid preferred date. This is a preference, not a confirmed appointment.");
  }
  return { ok: true, data };
}
