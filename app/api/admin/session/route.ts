import { handleLogin, handleLogout, handleSession } from "@/lib/crm/handlers";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) { return handleLogin(request, process.env); }
export async function DELETE(request: Request) { return handleLogout(request, process.env); }
export async function GET(request: Request) { return handleSession(request, process.env); }
