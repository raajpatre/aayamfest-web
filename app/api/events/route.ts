import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ createdAt: -1 });
    return successResponse(events);
  } catch {
    return errorResponse("Failed to fetch events");
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();
    const event = await Event.create(payload);
    return successResponse(event, 201);
  } catch {
    return errorResponse("Failed to create event", 400);
  }
}
