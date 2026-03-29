import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getFirebaseAdminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

type RegistrationPayload = {
  fullname?: string;
  email?: string;
  phone?: string;
  gender?: string;
  college?: string;
  course?: string;
  year?: string;
  city?: string;
  linkedin?: string;
  instagram?: string;
  why?: string;
  experience?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS")
    }
  });
}

async function sendConfirmationEmail(data: Required<Pick<RegistrationPayload, "fullname" | "email">> & RegistrationPayload) {
  const transporter = createTransporter();

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #1a1a1a;">
      <div style="background: #0d0d1a; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #a78bfa; margin: 0; font-size: 22px; letter-spacing: 2px;">AAYAM '26</h1>
        <p style="color: #888; margin: 4px 0 0; font-size: 12px;">Campus Ambassador Programme</p>
      </div>
      <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #0d0d1a; font-size: 18px;">Application Received! ✓</h2>
        <p>Hi <strong>${data.fullname}</strong>,</p>
        <p>Thank you for applying to the <strong>AAYAM '26 Campus Ambassador Programme</strong>.</p>
        <p>We've received your application and our team will review it shortly.</p>
        <div style="background: #ede9fe; border-left: 4px solid #7c3aed; padding: 16px 20px; border-radius: 4px; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #555; text-transform: uppercase; letter-spacing: 1px;">Application Summary</p>
          <table style="font-size: 14px; width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; color: #555; width: 100px;">Name</td><td><strong>${data.fullname}</strong></td></tr>
            <tr><td style="padding: 4px 0; color: #555;">College</td><td><strong>${data.college || "-"}</strong></td></tr>
            <tr><td style="padding: 4px 0; color: #555;">Course</td><td><strong>${data.course || "-"}${data.year ? ` (Year ${data.year})` : ""}</strong></td></tr>
            <tr><td style="padding: 4px 0; color: #555;">City</td><td><strong>${data.city || "-"}</strong></td></tr>
          </table>
        </div>
        <p style="font-size: 13px; color: #888;">If you have any questions, reply to this email.</p>
        <p style="margin-bottom: 0;">Regards,<br><strong>Team AAYAM '26</strong> | NST</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Team AAYAM '26" <${getRequiredEnv("SMTP_USER")}>`,
    to: data.email,
    subject: "AAYAM '26 — Campus Ambassador Application Received",
    text: `Hi ${data.fullname}, your ambassador application has been received. We'll review it and get back to you soon.`,
    html: htmlBody,
    replyTo: getRequiredEnv("SMTP_USER")
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const firebaseAdminDb = getFirebaseAdminDb();
    const data = (await request.json()) as RegistrationPayload;

    if (!data.fullname || !data.email || !data.phone || !data.college) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await firebaseAdminDb.collection("ca-registrations").add({
      fullname: data.fullname || "",
      email: data.email || "",
      phone: data.phone || "",
      gender: data.gender || "",
      college: data.college || "",
      course: data.course || "",
      year: data.year || "",
      city: data.city || "",
      linkedin: data.linkedin || "",
      instagram: data.instagram || "",
      why: data.why || "",
      experience: data.experience || "",
      status: "pending",
      totalPoints: 0,
      totalReferrals: 0,
      submittedAt: new Date().toISOString()
    });

    sendConfirmationEmail({
      fullname: data.fullname,
      email: data.email,
      ...data
    }).catch((error) => {
      console.error("Ambassador confirmation email failed:", error);
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Ambassador registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit application"
      },
      { status: 500 }
    );
  }
}
