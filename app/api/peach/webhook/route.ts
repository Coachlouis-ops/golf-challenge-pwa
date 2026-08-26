export const runtime = "nodejs";

import crypto from "crypto";
import { NextResponse } from "next/server";

import {
  initializeApp,
  getApps,
  cert,
} from "firebase-admin/app";

import {
  FieldValue,
  Timestamp,
  getFirestore,
} from "firebase-admin/firestore";

const PEACH_WEBHOOK_URL =
  "https://www.teezgolfchallenges.com/api/peach/webhook";

function initFirebaseAdmin() {
  if (!getApps().length) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );

    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  }
}

function safeCompareHex(
  expected: string,
  received: string
) {
  try {
    const expectedBuffer =
      Buffer.from(expected, "hex");

    const receivedBuffer =
      Buffer.from(received, "hex");

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

function isSuccessfulPeachResult(
  resultCode: string
) {
  // Peach documentation identifies 000.000.000
  // as successful in live processing.
  //
  // 000.100.110 is also documented in Peach's
  // successful Integrator Test Mode examples.
  return (
    resultCode === "000.000.000" ||
    resultCode === "000.100.110"
  );
}

export async function POST(req: Request) {
  try {
    const contentType =
      req.headers.get("content-type") || "";

    const rawBody =
      await req.text();

    // --------------------------------------------------
    // INITIAL PEACH CONFIGURATION WEBHOOK
    // --------------------------------------------------
    if (
      contentType.includes(
        "application/json"
      )
    ) {
      let payload: any = null;

      try {
        payload =
          JSON.parse(rawBody);
      } catch {
        return NextResponse.json(
          {
            error:
              "Invalid JSON payload",
          },
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
    // CHECKOUT WEBHOOK CONTENT TYPE
    // --------------------------------------------------
    if (
      !contentType.includes(
        "application/x-www-form-urlencoded"
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported content type",
        },
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
        {
          error:
            "Invalid webhook signature",
        },
        { status: 401 }
      );
    }

    if (
      algorithm &&
      algorithm.toLowerCase() !==
        "sha256" &&
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
    // VERIFY PEACH HMAC
    // --------------------------------------------------
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

    if (
      !safeCompareHex(
        calculatedSignature,
        receivedSignature
      )
    ) {
      console.error(
        "Invalid Peach webhook signature.",
        {
          webhookId,
          timestamp,
        }
      );

      return NextResponse.json(
        {
          error:
            "Invalid webhook signature",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // PARSE VERIFIED WEBHOOK
    // --------------------------------------------------
    const params =
      new URLSearchParams(
        rawBody
      );

    const checkoutId =
      params.get("checkoutId") || "";

    const merchantTransactionId =
      params.get(
        "merchantTransactionId"
      ) || "";

    const amountString =
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
      params.get(
        "result.description"
      ) ||
      params.get(
        "result_description"
      ) ||
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

    initFirebaseAdmin();

    const db =
      getFirestore();

    // --------------------------------------------------
    // FIND INTERNAL PAYMENT
    // --------------------------------------------------
    const paymentQuery =
      await db
        .collection("payments")
        .where(
          "merchantTransactionId",
          "==",
          merchantTransactionId
        )
        .limit(1)
        .get();

    if (paymentQuery.empty) {
      console.error(
        "No Teez payment record matches Peach transaction.",
        {
          webhookId,
          merchantTransactionId,
          checkoutId,
        }
      );

      return NextResponse.json(
        {
          error:
            "Payment record not found",
        },
        { status: 404 }
      );
    }

    const paymentDoc =
      paymentQuery.docs[0];

    const paymentRef =
      paymentDoc.ref;

    const payment =
      paymentDoc.data();

    // --------------------------------------------------
    // VERIFY PEACH PAYMENT AGAINST OUR OWN RECORD
    // --------------------------------------------------
    const receivedAmount =
      Number(amountString);

    const expectedAmount =
      Number(
        payment.expectedAmount
      );

    if (
      !Number.isFinite(
        receivedAmount
      ) ||
      receivedAmount !==
        expectedAmount ||
      currency !==
        payment.currency ||
      paymentType !== "DB"
    ) {
      console.error(
        "Peach payment details do not match Teez payment record.",
        {
          webhookId,
          merchantTransactionId,
          checkoutId,
          receivedAmount,
          expectedAmount,
          currency,
          expectedCurrency:
            payment.currency,
          paymentType,
        }
      );

      await paymentRef.set(
        {
          peachCheckoutId:
            checkoutId,

          peachTransactionId:
            transactionId || null,

          status:
            "verification_failed",

          lastWebhookId:
            webhookId,

          lastPeachResultCode:
            resultCode,

          lastPeachTimestamp:
            peachTimestamp,

          updatedAt:
            FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return NextResponse.json(
        {
          error:
            "Payment verification failed",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // NON-SUCCESSFUL EVENT
    // --------------------------------------------------
    if (
      !isSuccessfulPeachResult(
        resultCode
      )
    ) {
      if (!payment.fulfilled) {
        await paymentRef.set(
          {
            peachCheckoutId:
              checkoutId,

            peachTransactionId:
              transactionId || null,

            status:
              resultCode ===
                "000.200.000"
                ? "pending"
                : resultCode ===
                    "100.396.101"
                  ? "cancelled"
                  : resultCode ===
                      "100.396.104"
                    ? "uncertain"
                    : "processing",

            lastWebhookId:
              webhookId,

            lastPeachResultCode:
              resultCode,

            lastPeachResultDescription:
              resultDescription,

            lastPeachTimestamp:
              peachTimestamp,

            updatedAt:
              FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }

      return NextResponse.json(
        {
          received: true,
          verified: true,
          fulfilled: false,
        },
        { status: 200 }
      );
    }

    // --------------------------------------------------
    // ONLY THE CURRENT MEMBERSHIP PRODUCT IS SUPPORTED
    // --------------------------------------------------
    if (
      payment.product !==
      "membership_monthly"
    ) {
      console.error(
        "Unsupported Peach payment product.",
        {
          paymentId:
            paymentRef.id,
          product:
            payment.product,
        }
      );

      return NextResponse.json(
        {
          error:
            "Unsupported payment product",
        },
        { status: 400 }
      );
    }

    const uid =
      payment.uid;

    if (!uid) {
      return NextResponse.json(
        {
          error:
            "Payment user missing",
        },
        { status: 400 }
      );
    }

    const userRef =
      db
        .collection("users")
        .doc(uid);

    const walletRef =
      db
        .collection("wallets")
        .doc(uid);

    const webhookEventRef =
      db
        .collection(
          "peachWebhookEvents"
        )
        .doc(webhookId);

    // --------------------------------------------------
    // IDEMPOTENT FULFILMENT TRANSACTION
    // --------------------------------------------------
    await db.runTransaction(
      async (tx) => {
        const [
          freshPaymentSnap,
          userSnap,
          webhookEventSnap,
        ] = await Promise.all([
          tx.get(paymentRef),
          tx.get(userRef),
          tx.get(webhookEventRef),
        ]);

        // Exact webhook already processed.
        if (
          webhookEventSnap.exists
        ) {
          return;
        }

        if (
          !freshPaymentSnap.exists
        ) {
          throw new Error(
            "Payment disappeared during fulfilment."
          );
        }

              const freshPayment =
          freshPaymentSnap.data();

        if (!freshPayment) {
          throw new Error(
            "Payment data missing during fulfilment."
          );
        }

        // Payment was already fulfilled by another
        // Peach retry/webhook.
        if (
          freshPayment.fulfilled ===
          true
        ) {
          tx.set(
            webhookEventRef,
            {
              webhookId,
              paymentId:
                paymentRef.id,
              checkoutId,
              merchantTransactionId,
              resultCode,
              duplicate:
                true,
              createdAt:
                FieldValue.serverTimestamp(),
            }
          );

          return;
        }

               const now =
          Timestamp.now();

        tx.set(
          userRef,
          {
            uid,

            email:
              payment.email || "",

            role:
              userSnap.exists
                ? userSnap.get(
                    "role"
                  ) || "player"
                : "player",

            subscriptionStatus:
              "active",

            subscriptionPlan:
              "participation_access",

            subscriptionStartedAt:
              now,

            subscriptionExpires:
              null,

            participationStatus:
              "active",

            participationActivatedAt:
              now,

            updatedAt:
              now,
          },
          { merge: true }
        );

        tx.set(
          walletRef,
          {
            uid,

            balance:
              FieldValue.increment(
                100
              ),

            subscriptionTokensIssued:
              FieldValue.increment(
                100
              ),

            updatedAt:
              now,

            createdAt:
              now,
          },
          { merge: true }
        );

        tx.set(
          paymentRef,
          {
            peachCheckoutId:
              checkoutId,

            peachTransactionId:
              transactionId || null,

            status:
              "paid",

            fulfilmentStatus:
              "fulfilled",

            fulfilled:
              true,

            fulfilledAt:
              now,

            lastWebhookId:
              webhookId,

            lastPeachResultCode:
              resultCode,

            lastPeachResultDescription:
              resultDescription,

            lastPeachTimestamp:
              peachTimestamp,

            updatedAt:
              now,
          },
          { merge: true }
        );

        tx.set(
          webhookEventRef,
          {
            webhookId,

            paymentId:
              paymentRef.id,

            checkoutId,

            merchantTransactionId,

            peachTransactionId:
              transactionId || null,

            resultCode,

            processed:
              true,

            createdAt:
              now,
          }
        );
      }
    );

    console.log(
      "Peach membership payment processed.",
      {
        webhookId,
        checkoutId,
        merchantTransactionId,
        paymentId:
          paymentRef.id,
        uid,
      }
    );

    return NextResponse.json(
      {
        received: true,
        verified: true,
        fulfilled: true,
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