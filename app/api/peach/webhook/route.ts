export const runtime = "nodejs";

import crypto from "crypto";
import { NextResponse } from "next/server";

const PEACH_WEBHOOK_URL =
  "https://www.teezgolfchallenges.com/api/peach/webhook";

function safeCompareHex(
  expected: string,
  received: string
) {
  try {
    const expectedBuffer = Buffer.from(
      expected,
      "hex"
    );

    const receivedBuffer = Buffer.from(
      received,
      "hex"
    );

    if (
      expectedBuffer.length === 0 ||
      expectedBuffer.length !==
        receivedBuffer.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(
      expectedBuffer,
      receivedBuffer
    );
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const contentType =
      req.headers.get("content-type") || "";

    const rawBody = await req.text();

    // --------------------------------------------------
    // INITIAL PEACH WEBHOOK CONFIGURATION CHECK
    // --------------------------------------------------
    // Peach sends the initial verification request as JSON.
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
        console.log(
          "Peach webhook configuration request received."
        );

        return NextResponse.json(
          {
            received: true,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Unsupported Peach webhook JSON payload",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // CHECKOUT PAYMENT WEBHOOK
    // --------------------------------------------------
    if (
      !contentType.includes(
        "application/x-www-form-urlencoded"
      )
    ) {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const webhookSecret =
      process.env.PEACH_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error(
        "PEACH_WEBHOOK_SECRET is not configured."
      );

      return NextResponse.json(
        {
          error:
            "Webhook verification unavailable",
        },
        { status: 500 }
      );
    }

    const algorithm =
      req.headers.get(
        "x-webhook-signature-algorithm"
      ) || "";

    const timestamp =
      req.headers.get(
        "x-webhook-timestamp"
      ) || "";

    const webhookId =
      req.headers.get(
        "x-webhook-id"
      ) || "";

    const receivedSignature =
      req.headers.get(
        "x-webhook-signature"
      ) || "";

    if (
      !timestamp ||
      !webhookId ||
      !receivedSignature
    ) {
      console.error(
        "Peach webhook missing required signature headers."
      );

      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    if (
      algorithm &&
      algorithm.toLowerCase() !== "sha256" &&
      algorithm.toLowerCase() !==
        "hmac-sha256"
    ) {
      console.error(
        "Unsupported Peach webhook signature algorithm:",
        algorithm
      );

      return NextResponse.json(
        {
          error:
            "Unsupported webhook signature algorithm",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // VERIFY HMAC SHA256
    // --------------------------------------------------
    // Peach specification:
    //
    // timestamp.webhookId.webhookUrl.rawBody
    //
    // IMPORTANT:
    // rawBody must remain exactly as received.
    const signatureMessage =
      `${timestamp}.${webhookId}.` +
      `${PEACH_WEBHOOK_URL}.${rawBody}`;

    const calculatedSignature =
      crypto
        .createHmac(
          "sha256",
          webhookSecret
        )
        .update(signatureMessage)
        .digest("hex");

    const signatureValid =
      safeCompareHex(
        calculatedSignature,
        receivedSignature
      );

    if (!signatureValid) {
      console.error(
        "Invalid Peach webhook signature.",
        {
          webhookId,
          timestamp,
        }
      );

      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // PARSE VERIFIED PEACH PAYLOAD
    // --------------------------------------------------
    const params =
      new URLSearchParams(rawBody);

    const checkoutId =
      params.get("checkoutId") || "";

    const merchantTransactionId =
      params.get(
        "merchantTransactionId"
      ) || "";

    const amount =
      params.get("amount") || "";

    const currency =
      params.get("currency") || "";

    const paymentType =
      params.get("paymentType") || "";

    const transactionId =
      params.get("id") || "";

    const resultCode =
      params.get("result.code") ||
      params.get("result_code") ||
      "";

    const resultDescription =
      params.get("result.description") ||
      params.get("result_description") ||
      "";

    const peachTimestamp =
      params.get("timestamp") || "";

    if (
      !checkoutId ||
      !merchantTransactionId
    ) {
      console.error(
        "Verified Peach webhook missing payment identifiers.",
        {
          webhookId,
          checkoutId,
          merchantTransactionId,
        }
      );

      return NextResponse.json(
        {
          error:
            "Missing payment identifiers",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // IMPORTANT:
    // NO PAYMENT FULFILMENT YET.
    //
    // At this stage we only authenticate and parse the
    // webhook. Firestore payment records and idempotent
    // membership/token fulfilment will be added next.
    // --------------------------------------------------
    console.log(
      "Verified Peach checkout webhook received.",
      {
        webhookId,
        checkoutId,
        merchantTransactionId,
        amount,
        currency,
        paymentType,
        transactionId,
        resultCode,
        resultDescription,
        peachTimestamp,
      }
    );

    return NextResponse.json(
      {
        received: true,
        verified: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Peach webhook error:",
      error
    );

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