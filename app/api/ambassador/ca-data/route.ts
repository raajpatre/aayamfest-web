import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminAuth, getFirebaseAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

async function getVerifiedEmail(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing Token");
  }

  const token = authHeader.replace("Bearer ", "");
  const decoded = await getFirebaseAdminAuth().verifyIdToken(token);

  if (!decoded.email) {
    throw new Error("Unauthorized: Email missing in token");
  }

  return decoded.email;
}

export async function GET(request: NextRequest) {
  try {
    const email = await getVerifiedEmail(request);
    const db = getFirebaseAdminDb();

    const profileSnap = await db
      .collection("ca-registrations")
      .where("email", "==", email)
      .where("status", "==", "approved")
      .limit(1)
      .get();

    if (profileSnap.empty) {
      return NextResponse.json(
        { success: false, error: "CA Profile not found or not approved." },
        { status: 404 }
      );
    }

    const profileDoc = profileSnap.docs[0];
    const profileData = profileDoc.data() as Record<string, unknown> & { caCode?: string };
    const profile = { id: profileDoc.id, ...profileData };

    if (!profile.caCode) {
      return NextResponse.json(
        { success: false, error: "CA code missing for approved profile." },
        { status: 400 }
      );
    }

    const submissionsSnap = await db
      .collection("ca-submissions")
      .where("caCode", "==", profile.caCode)
      .orderBy("submittedAt", "desc")
      .get();

    const submissions = submissionsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, profile, submissions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch CA data";
    const status = message.startsWith("Unauthorized") ? 401 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
