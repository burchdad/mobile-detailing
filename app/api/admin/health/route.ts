import { handleHealth } from "@/lib/crm/health-handler";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) { return handleHealth(request, process.env); }
