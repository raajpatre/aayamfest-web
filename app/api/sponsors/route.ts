import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import Sponsor from "@/models/Sponsor";
import { requireAdminAuth } from "@/lib/admin-auth";

export async function GET() {
  try {
    await connectToDatabase();
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    return successResponse(sponsors);
  } catch {
    return errorResponse("Failed to fetch sponsors");
  }
}

export async function POST(request: NextRequest) {
  const deny = requireAdminAuth(request);
  if (deny) return deny;

  try {
    await connectToDatabase();
    const payload = await request.json();
    const sponsor = await Sponsor.create(payload);
    return successResponse(sponsor, 201);
  } catch {
    return errorResponse("Failed to create sponsor", 400);
  }
}
