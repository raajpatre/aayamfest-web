import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import Sponsor from "@/models/Sponsor";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const payload = await request.json();
    const sponsor = await Sponsor.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!sponsor) {
      return errorResponse("Sponsor not found", 404);
    }

    return successResponse(sponsor);
  } catch {
    return errorResponse("Failed to update sponsor", 400);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const sponsor = await Sponsor.findByIdAndDelete(id);

    if (!sponsor) {
      return errorResponse("Sponsor not found", 404);
    }

    return successResponse({ deleted: true });
  } catch {
    return errorResponse("Failed to delete sponsor", 400);
  }
}
