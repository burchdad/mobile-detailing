import { handleUpdate } from "@/lib/crm/handlers";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function PATCH(request: Request, { params }: { params: { id: string } }) { return handleUpdate(request, params.id, process.env); }
