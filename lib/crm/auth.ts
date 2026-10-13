import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { CrmError, TENANT, type Rpc, type Session } from "./types";

const derive = promisify(scrypt);
export const sessionCookieName = "__Host-as_staff";
export const sessionLifetimeSeconds = 8 * 60 * 60;
export const digest = (value: string) => createHash("sha256").update(value).digest("hex");
export function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}
export async function hashPassword(password: string): Promise<string> {
  if (password.length < 14 || password.length > 128) throw new Error("Password must contain 14–128 characters.");
  const salt = randomBytes(16).toString("hex");
  const key = await derive(password, salt, 64) as Buffer;
  return `scrypt-v1:${salt}:${key.toString("hex")}`;
}
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (password.length > 128 || !/^scrypt-v1:[a-f0-9]{32}:[a-f0-9]{128}$/.test(stored)) return false;
  const [, salt, expected] = stored.split(":");
  return timingSafeEqual(await derive(password, salt, 64) as Buffer, Buffer.from(expected, "hex"));
}
export function readSessionToken(request: Request): string | null {
  const matches = (request.headers.get("cookie") ?? "").split(";").map(x => x.trim())
    .filter(x => x.startsWith(`${sessionCookieName}=`));
  if (matches.length !== 1) return null;
  const value = matches[0].slice(sessionCookieName.length + 1);
  return /^[a-f0-9]{64}$/.test(value) ? value : null;
}
export function sessionCookie(token: string, clear = false): string {
  return `${sessionCookieName}=${clear ? "" : token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${clear ? 0 : sessionLifetimeSeconds}`;
}
export async function requireSession(request: Request, db: Rpc): Promise<{ hash: string; staff: Session }> {
  const token = readSessionToken(request);
  if (!token) throw new CrmError(401, "Please sign in.");
  const hash = digest(token);
  const staff = await db.call<Session | null>("as_session", { p_session_hash: hash });
  // No header, hostname, user_metadata, role claim or client organization can supply authorization.
  if (!staff || staff.tenant !== TENANT || staff.active !== true || !["owner", "staff"].includes(staff.role) ||
    !Number.isFinite(Date.parse(staff.expiresAt)) || Date.parse(staff.expiresAt) <= Date.now()) {
    throw new CrmError(401, "Please sign in again.");
  }
  return { hash, staff };
}
export async function login(db: Rpc, email: string, password: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  if (normalized.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || password.length > 128) {
    throw new CrmError(401, "Email or password is incorrect.");
  }
  // One durable database budget covers all server instances, for account and global rates.
  const candidate = await db.call<{ id: string; tenant: string; passwordHash: string } | null>("as_login_candidate", { p_email: normalized });
  const dummy = `scrypt-v1:${"0".repeat(32)}:${"0".repeat(128)}`;
  const valid = await verifyPassword(password, candidate?.passwordHash ?? dummy);
  if (!candidate || candidate.tenant !== TENANT || !valid) throw new CrmError(401, "Email or password is incorrect.");
  const token = randomBytes(32).toString("hex");
  // Recheck active status and password version in the same transaction that issues the session.
  const accepted = await db.call<boolean>("as_create_session", { p_staff_id: candidate.id,
    p_password_hash: candidate.passwordHash, p_session_hash: digest(token) });
  if (accepted !== true) throw new CrmError(401, "Email or password is incorrect.");
  return token;
}
