import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import TeamMember from "@/models/TeamMember";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function GET() {
  try {
    await connectToDatabase();
    const team = await TeamMember.find().sort({ createdAt: -1 });
    return successResponse(team);
  } catch {
    return errorResponse("Failed to fetch team");
  }
}

export async function POST(request: NextRequest) {
  const deny = requireAdminAuth(request);
  if (deny) return deny;

  try {
    await connectToDatabase();
    const payload = await request.json();
    const member = await TeamMember.create(payload);
    return successResponse(member, 201);
  } catch {
    return errorResponse("Failed to create team member", 400);
  }
}
