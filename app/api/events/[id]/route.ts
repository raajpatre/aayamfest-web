import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import Event from "@/models/Event";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const payload = await request.json();
    const event = await Event.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return errorResponse("Event not found", 404);
    }

    return successResponse(event);
  } catch {
    return errorResponse("Failed to update event", 400);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return errorResponse("Event not found", 404);
    }

    return successResponse({ deleted: true });
  } catch {
    return errorResponse("Failed to delete event", 400);
  }
}
