import type { Metadata } from "next";
import { cookies } from "next/headers";
import { readCrmConfig } from "@/lib/crm/config";
import { DatabaseRpc } from "@/lib/crm/rpc";
import { requireSession, sessionCookieName } from "@/lib/crm/auth";
import { CrmError } from "@/lib/crm/types";
import StaffDashboard from "@/components/StaffDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staff | A&S Detailing", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const config = readCrmConfig(process.env);
  if (!config) return <main className="mx-auto min-h-screen max-w-3xl px-6 pb-24 pt-40 text-white">
    <p className="text-sm uppercase tracking-widest text-gold">A&S Staff</p>
    <h1 className="mt-4 text-3xl font-semibold">CRM setup is pending</h1>
    <p className="mt-4 text-zinc-300">Staff access is disabled until the isolated database, secure staff accounts, and deployment checks are complete.</p>
    <p className="mt-4 text-zinc-400">Email delivery and calendar connections are not active. No customer records are shown here.</p>
  </main>;
  let signedIn = false;
  try {
    const token = cookies().get(sessionCookieName)?.value ?? "";
    await requireSession(new Request(`${config.siteOrigin}/admin`, { headers: { cookie: `${sessionCookieName}=${token}` } }), new DatabaseRpc(config));
    signedIn = true;
  } catch (error) {
    if (!(error instanceof CrmError) || error.status !== 401) return <main className="mx-auto min-h-screen max-w-3xl px-6 pt-40 text-white">
      <h1 className="text-3xl">Staff CRM is temporarily unavailable</h1><p className="mt-4">Please retry later. No records have been loaded.</p>
    </main>;
  }
  return <StaffDashboard initiallySignedIn={signedIn} />;
}
