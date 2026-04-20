export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  try {
    const { uid, email } = await req.json();

    if (!uid || !email) {
      return NextResponse.json(
        { error: "Missing uid or email" },
        { status: 400 }
      );
    }

    // ================================
    // INIT FIREBASE ADMIN
    // ================================
    if (!getApps().length) {
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
      );

      initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
    }

    const auth = getAuth();

    // ================================
    // GENERATE VERIFICATION LINK
    // ================================
   let verificationLink = await auth.generateEmailVerificationLink(email, {
  url: "https://www.teezgolfchallenges.com/verify-success",
  handleCodeInApp: true,
});

// FORCE correct API key
verificationLink = verificationLink.replace(
  /apiKey=[^&]*/,
  "apiKey=AIzaSyBYlVR67x2Y3KTm6NQ7eERtAGB44Fy2DVA"
);

    // ================================
    // SEND EMAIL VIA RESEND
    // ================================
    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "Teez Golf <verify@teezgolfchallenges.com>",
      to: [email],
      subject: "Verify your email - Teez Golf",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verify your email</h2>
          <p>Welcome to Teez Golf Challenges.</p>
          <p>Please click the button below to verify your email:</p>

          <a href="${verificationLink}" 
             style="display:inline-block;padding:12px 20px;
             background:#00ff88;color:black;
             text-decoration:none;border-radius:8px;
             font-weight:bold;">
             Verify Email
          </a>

          <p style="margin-top:20px;font-size:12px;color:gray;">
            If you did not create this account, you can ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, response });

  } catch (error: any) {
    console.error("SEND VERIFICATION ERROR:", error);

    return NextResponse.json(
      { error: error?.message || "Failed to send email" },
      { status: 500 }
    );
  }
}