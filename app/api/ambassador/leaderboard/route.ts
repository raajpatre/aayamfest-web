import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminAuth, getFirebaseAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

async function verifyRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing Token");
  }

  const token = authHeader.replace("Bearer ", "");
  await getFirebaseAdminAuth().verifyIdToken(token);
}

export async function GET(request: NextRequest) {
  try {
    await verifyRequest(request);
    const db = getFirebaseAdminDb();

    const snapshot = await db.collection("ca-registrations").where("status", "==", "approved").get();

    const leaderboard = snapshot.docs.map((doc) => {
      const data = doc.data();
      const totalPoints = Number(data.totalPoints) || 0;

      let tier = "Bronze";
      if (totalPoints >= 500) tier = "Platinum";
      else if (totalPoints >= 250) tier = "Gold";
      else if (totalPoints >= 100) tier = "Silver";

      return {
        name: data.fullname,
        college: data.college,
        caCode: data.caCode,
        totalPoints,
        tier
      };
    });

    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    let currentRank = 1;
    leaderboard.forEach((entry, index) => {
      if (index > 0 && entry.totalPoints < leaderboard[index - 1].totalPoints) {
        currentRank = index + 1;
      }
      Object.assign(entry, { rank: currentRank });
    });

    return NextResponse.json({ success: true, leaderboard });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch leaderboard";
    const status = message.startsWith("Unauthorized") ? 401 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
