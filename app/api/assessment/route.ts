import { handleAssessmentRequest } from "@/lib/assessment-intake";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleAssessmentRequest(request, process.env);
}
