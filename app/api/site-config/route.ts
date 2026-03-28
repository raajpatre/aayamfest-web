import { connectToDatabase } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/api";
import SiteConfig from "@/models/SiteConfig";

const defaultConfig = {
  festName: "AAYAM Tech Fest",
  festDate: "",
  totalPrizePool: "",
  contactDetails: {
    email: "",
    phone: "",
    address: "",
    sponsorFormLink: ""
  },
  socialLinks: {
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: ""
  }
};

export async function GET() {
  try {
    await connectToDatabase();
    const config =
      (await SiteConfig.findOne()) || (await SiteConfig.create(defaultConfig));
    return successResponse(config);
  } catch {
    return errorResponse("Failed to fetch site settings");
  }
}

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();
    const payload = await request.json();
    const current = ((await SiteConfig.findOne()) ||
      (await SiteConfig.create(defaultConfig))) as {
      toObject: () => typeof defaultConfig & { [key: string]: unknown };
      set: (value: unknown) => void;
      save: () => Promise<void>;
    };
    const currentObject = current.toObject();
    current.set({
      ...currentObject,
      ...payload,
      contactDetails: {
        ...currentObject.contactDetails,
        ...payload.contactDetails
      },
      socialLinks: {
        ...currentObject.socialLinks,
        ...payload.socialLinks
      }
    });
    await current.save();
    return successResponse(current);
  } catch {
    return errorResponse("Failed to update site settings", 400);
  }
}
