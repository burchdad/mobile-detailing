import { handleWorker } from "@/lib/crm/worker-handler";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) { return handleWorker(request, process.env); }
