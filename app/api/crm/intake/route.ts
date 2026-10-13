import { handleIntake } from "@/lib/crm/handlers";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) { return handleIntake(request, process.env); }
