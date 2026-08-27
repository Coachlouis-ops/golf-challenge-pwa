export const runtime = "nodejs";

import crypto from "crypto";
import { NextResponse } from "next/server";

import {
  initializeApp,
  getApps,
  cert,
} from "firebase-admin/app";

import {
  getAuth,
} from "firebase-admin/auth";

import {
  getFirestore,
  FieldValue,
} from "firebase-admin/firestore";

const PEACH_AUTH_URL =
  "https://dashboard.peachpayments.com/api/oauth/token";

const PEACH_CHECKOUT_URL =
  "https://secure.peachpayments.com/v2/checkout";

const PEACH_ORIGIN =
  "https://www.teezgolfchallenges.com";

const PEACH_WEBHOOK_URL =
  "https://www.teezgolfchallenges.com/api/peach/webhook";

const PEACH_RESULT_URL =
  "https://www.teezgolfchallenges.com/api/peach/result";

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

async function getPeachAccessToken() {
  const clientId =
    process.env.PEACH_CLIENT_ID;

  const clientSecret =
    process.env.PEACH_CLIENT_SECRET;

  const merchantId =
    process.env.PEACH_MERCHANT_ID;

  if (
    !clientId ||
    !clientSecret ||
    !merchantId
  ) {
    throw new Error(
      "Peach V2 credentials are not configured."
    );
  }

  const response = await fetch(
    PEACH_AUTH_URL,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        merchantId,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "Peach authentication failed:",
      response.status,
      errorText
    );

    throw new Error(
      "Unable to authenticate with Peach Payments."
    );
  }

  const body = await response.json();

  if (!body?.access_token) {
    throw new Error(
      "Peach access token was not returned."
    );
  }

  return body.access_token as string;
}

export async function POST(req: Request) {
  try {
    initFirebaseAdmin();

    const authorization =
      req.headers.get("authorization") || "";

    if (
      !authorization.startsWith(
        "Bearer "
      )
    ) {
      return NextResponse.json(
        { error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const idToken =
      authorization.slice(
        "Bearer ".length
      );

    const decodedToken =
      await getAuth().verifyIdToken(
        idToken
      );

    const uid =
      decodedToken.uid;

    const email =
      decodedToken.email || "";

    const requestBody =
      await req.json();

      const product =
      requestBody?.product as
        | "participation_access"
        | "token_topup_100"
        | undefined;

       // -----------------------------------
    // SERVER-SIDE PRODUCT SOURCE OF TRUTH
    // -----------------------------------
    const products = {
      participation_access: {
        amount: 149,
        tokens: 100,
        participationAccess: true,
      },

      token_topup_100: {
        amount: 149,
        tokens: 100,
        participationAccess: false,
      },
    } as const;

    if (
      product !== "participation_access" &&
      product !== "token_topup_100"
    ) {
      return NextResponse.json(
        {
          error: "Unsupported product",
        },
        { status: 400 }
      );
    }

    const selectedProduct =
      products[product];

    const amount =
      selectedProduct.amount;

    const tokens =
      selectedProduct.tokens;

    const currency = "ZAR";
    const paymentType = "DB";

    const entityId =
      process.env.PEACH_ENTITY_ID;

    if (!entityId) {
      throw new Error(
        "PEACH_ENTITY_ID is not configured."
      );
    }

    const db =
      getFirestore();

        // -----------------------------------
    // PARTICIPATION ACCESS / TOP-UP RULES
    // -----------------------------------
    const userRef =
      db.collection("users").doc(uid);

    const userSnap =
      await userRef.get();

    const userData =
      userSnap.exists
        ? userSnap.data()
        : null;

    const participationActive =
      userData?.participationStatus === "active" ||
      userData?.subscriptionStatus === "active";

    if (
      product === "participation_access" &&
      participationActive
    ) {
      return NextResponse.json(
        {
          error:
            "Participation Access is already active. Use Token Top-Up to buy more Teez Play Tokens.",
        },
        { status: 409 }
      );
    }

    // -----------------------------------
    // UNIQUE INTERNAL PAYMENT REFERENCE
    // Peach requires 8-16 characters.
    // -----------------------------------
    const merchantTransactionId =
      `TZ${Date.now()
        .toString()
        .slice(-12)}`;

    const nonce =
      crypto
        .randomBytes(16)
        .toString("hex");

    const paymentRef =
      db.collection("payments").doc();

    await paymentRef.set({
      uid,
      email,
      product,

      expectedAmount:
        amount,

      currency,

             entitlement: {
        tokens,
        participationAccess:
          selectedProduct.participationAccess,
      },

      paymentProvider:
        "peach",

      merchantTransactionId,

      peachCheckoutId: null,
      peachTransactionId: null,

      status:
        "creating",

      fulfilmentStatus:
        "not_fulfilled",

      fulfilled:
        false,

      createdAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    const accessToken =
      await getPeachAccessToken();

    const checkoutBody = {
      authentication: {
        entityId,
      },

      merchantTransactionId,

      amount,

      currency,

      paymentType,

      nonce,

      shopperResultUrl:
        PEACH_RESULT_URL,

      notificationUrl:
        PEACH_WEBHOOK_URL,

      customer: {
        email,
      },

      customParameters: {
        auxData:
          JSON.stringify({
            paymentId:
              paymentRef.id,
            uid,
            product,
          }),
      },

      originator:
        "Teez Golf Challenges",
    };

    const checkoutResponse =
      await fetch(
        PEACH_CHECKOUT_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${accessToken}`,

            Origin:
              PEACH_ORIGIN,

            Referer:
              PEACH_ORIGIN,
          },

          body:
            JSON.stringify(
              checkoutBody
            ),

          cache:
            "no-store",
        }
      );

    const checkoutText =
      await checkoutResponse.text();

    let checkoutData: any = null;

    try {
      checkoutData =
        JSON.parse(checkoutText);
    } catch {
      checkoutData = null;
    }

    if (!checkoutResponse.ok) {
      console.error(
        "Peach checkout creation failed:",
        checkoutResponse.status,
        checkoutText
      );

      await paymentRef.update({
        status:
          "checkout_creation_failed",

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      return NextResponse.json(
        {
          error:
            "Unable to create Peach checkout",
        },
        { status: 502 }
      );
    }

    const checkoutId =
      checkoutData?.checkoutId;

    const redirectUrl =
      checkoutData?.redirectUrl;

    if (
      !checkoutId ||
      !redirectUrl
    ) {
      console.error(
        "Peach checkout response missing required fields:",
        checkoutData
      );

      await paymentRef.update({
        status:
          "invalid_checkout_response",

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      return NextResponse.json(
        {
          error:
            "Invalid Peach checkout response",
        },
        { status: 502 }
      );
    }

    await paymentRef.update({
      peachCheckoutId:
        checkoutId,

      status:
        "pending",

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        paymentId:
          paymentRef.id,

        checkoutId,

        redirectUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Peach create checkout error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Peach checkout creation failed",
      },
      { status: 500 }
    );
  }
}