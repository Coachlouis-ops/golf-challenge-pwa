export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const rawBody = await req.text();

    // --------------------------------------------------
    // PEACH WEBHOOK CONFIGURATION CHECK
    // --------------------------------------------------
    // Peach sends an initial JSON verification request
    // when the webhook URL is added in the Dashboard.
    // At this stage we only acknowledge that request.
    if (contentType.includes("application/json")) {
      let payload: any = null;

      try {
        payload = JSON.parse(rawBody);
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON payload" },
          { status: 400 }
        );
      }

      if (payload?.verificationCode) {
        console.log("Peach webhook configuration request received.");

        return NextResponse.json(
          {
            received: true,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: "Unsupported Peach webhook JSON payload" },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // PAYMENT EVENTS NOT ENABLED YET
    // --------------------------------------------------
    // Checkout payment webhooks are form-urlencoded.
    // We deliberately refuse them until HMAC signature
    // verification and Firestore fulfilment are installed.
    if (
      contentType.includes(
        "application/x-www-form-urlencoded"
      )
    ) {
      console.error(
        "Peach payment webhook received before verification logic was enabled."
      );

      return NextResponse.json(
        {
          received: false,
          message:
            "Peach payment webhook verification is not configured yet.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Unsupported content type" },
      { status: 415 }
    );
  } catch (error: any) {
    console.error("Peach webhook error:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Peach webhook handler failed",
      },
      { status: 500 }
    );
  }
}