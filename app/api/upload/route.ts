import { errorResponse, successResponse } from "@/lib/api";
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  if (!isCloudinaryConfigured()) {
    return errorResponse(
      "Cloudinary is not configured. Add credentials to enable uploads.",
      400
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "aayam-tech-fest");

    if (!(file instanceof File)) {
      return errorResponse("No file provided", 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: "image"
    });

    return successResponse({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch {
    return errorResponse("Failed to upload image", 500);
  }
}
