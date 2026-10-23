export const TENANT = "as-detailing" as const;
export const stages = ["new", "contacted", "quoted", "booked", "completed", "lost", "cancelled"] as const;
export type Stage = typeof stages[number];
export type Staff = { id: string; tenant: typeof TENANT; email: string; role: "owner" | "staff"; active: boolean };
export type Session = Staff & { expiresAt: string };
export type Lead = {
  id: string; tenant: typeof TENANT; customerId: string; vehicleId: string;
  fullName: string; phone: string; email: string; vehicle: string;
  service: string; condition: string; preferredDate: string; location: string;
  notes: string; stage: Stage; followUpDueAt: string | null; receivedAt: string;
  version: number; notification: "pending" | "processing" | "sent" | "failed";
  calendarStatus: "not_connected";
  history: { at: string; kind: string; note: string; stage: Stage }[];
};
export type DurableReceipt = { stored: true; notificationQueued: true; inquiryId: string };
export type OutboxJob = { id: string; tenant: typeof TENANT; inquiryId: string; leaseToken: string; attempts: number; firstAttemptAt?: string; payload: { fullName: string; service: string } };
export interface Rpc { call<T>(name: string, args: Record<string, unknown>): Promise<T> }
export class CrmError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
