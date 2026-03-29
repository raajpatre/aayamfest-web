import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminAuth, getFirebaseAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

type SubmissionPayload = {
  caCode?: string;
  caName?: string;
  taskType?: string;
  points?: number;
  submissionData?: string;
  storagePath?: string;
};

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

export async function POST(request: NextRequest) {
  try {
    const email = await getVerifiedEmail(request);
    const body = (await request.json()) as SubmissionPayload;
    const { caCode, caName, taskType, points, submissionData, storagePath } = body;

    if (!caCode || !caName || !taskType || !submissionData) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getFirebaseAdminDb();

    const caSnap = await db
      .collection("ca-registrations")
      .where("email", "==", email)
      .where("caCode", "==", caCode)
      .limit(1)
      .get();

    if (caSnap.empty) {
      return NextResponse.json(
        { success: false, error: "Forbidden: CA Profile mismatch" },
        { status: 403 }
      );
    }

    const caDocId = caSnap.docs[0].id;

    const submission = {
      caEmail: email,
      caName,
      caCode,
      caDocId,
      taskType,
      points: Number(points) || 0,
      submissionData,
      storagePath: storagePath || "",
      status: "pending",
      submittedAt: new Date().toISOString()
    };

    const docRef = await db.collection("ca-submissions").add(submission);

    return NextResponse.json({ success: true, submissionId: docRef.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit task";
    const status = message.startsWith("Unauthorized") ? 401 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
