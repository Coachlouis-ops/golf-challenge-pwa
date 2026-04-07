import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type = "general",
      name = "",
      email = "",
      message = "",
      subject = "",
      payload = {},
    } = body;

    // ✅ Prevent crash if no API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // ✅ Lazy load Resend (prevents build errors)
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    let emailSubject = "Teez Notification";
    let emailHtml = "";

    // ================= TYPE SWITCH =================
    switch (type) {
      case "contact":
        emailSubject = "New Contact Form Submission";
        emailHtml = `
          <h2>Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `;
        break;

      case "register":
        emailSubject = "New User Registration";
        emailHtml = `
          <h2>New Registration</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
        `;
        break;

      case "voucher":
        emailSubject = "Voucher Request";
        emailHtml = `
          <h2>Voucher Request</h2>
          <pre>${JSON.stringify(payload, null, 2)}</pre>
        `;
        break;

      case "payment":
        emailSubject = "Payment Event";
        emailHtml = `
          <h2>Payment Notification</h2>
          <pre>${JSON.stringify(payload, null, 2)}</pre>
        `;
        break;

      default:
        emailSubject = subject || "General Notification";
        emailHtml = `
          <h2>General Message</h2>
          <pre>${JSON.stringify(body, null, 2)}</pre>
        `;
    }

    // ================= SEND EMAIL =================
    await resend.emails.send({
      from: "Teez <noreply@teezgolfchallenges.com>",
      to: ["admin@teezgolfchallenges.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}