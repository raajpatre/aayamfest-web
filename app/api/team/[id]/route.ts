import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import TeamMember from "@/models/TeamMember";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const deny = requireAdminAuth(request);
  if (deny) return deny;

  try {
    await connectToDatabase();
    const { id } = await params;
    const payload = await request.json();
    const member = await TeamMember.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!member) {
      return errorResponse("Team member not found", 404);
    }

    return successResponse(member);
  } catch {
    return errorResponse("Failed to update team member", 400);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const deny = requireAdminAuth(request);
  if (deny) return deny;

  try {
    await connectToDatabase();
    const { id } = await params;
    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
      return errorResponse("Team member not found", 404);
    }

    return successResponse({ deleted: true });
  } catch {
    return errorResponse("Failed to delete team member", 400);
  }
}
