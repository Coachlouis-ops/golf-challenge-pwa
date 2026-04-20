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

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    let emailSubject = "Teez Notification";
    let emailHtml = "";

    // ================= TYPE SWITCH =================
    switch (type) {
      case "contact":
        // ===== ADMIN EMAIL =====
        const adminResult = await resend.emails.send({
          from: "Teez Golf Challenges <noreply@teezgolfchallenges.com>",
          to: ["admin@teezgolfchallenges.com"],
          subject: "New Contact Form Submission",
          html: `
            <h2>Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });

        console.log("ADMIN EMAIL RESULT:", adminResult);

        // ===== USER CONFIRMATION =====
        const userResult = await resend.emails.send({
          from: "Teez Golf Challenges <noreply@teezgolfchallenges.com>",
          to: [email],
          subject: "We’ve received your message",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
              <h2 style="color:#00ff88;">Teez Golf Challenges</h2>
              
              <p>Hi ${name || "there"},</p>
              
              <p>We’ve received your message and our team will get back to you shortly.</p>
              
              <div style="background:#111; padding:15px; border-radius:8px; margin:20px 0;">
                <p style="margin:0;"><strong>Your Message:</strong></p>
                <p style="margin:5px 0 0;">${message}</p>
              </div>

              <p style="font-size:12px; color:#888;">
                Teez Golf Challenges is operated by Honey Badger Technologies PTY LTD.
              </p>
            </div>
          `,
        });

        console.log("USER EMAIL RESULT:", userResult);

        return NextResponse.json({ success: true });

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

    // ================= DEFAULT EMAIL =================
    const defaultResult = await resend.emails.send({
      from: "Teez Golf Challenges <noreply@teezgolfchallenges.com>",
      to: ["admin@teezgolfchallenges.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("DEFAULT EMAIL RESULT:", defaultResult);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}