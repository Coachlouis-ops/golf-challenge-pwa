export const runtime = "nodejs";

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
} from "firebase-admin/firestore";

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
        {
          error:
            "Unauthenticated",
        },
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

    const body =
      await req.json();

    const checkoutId =
      body?.checkoutId;

    if (
      !checkoutId ||
      typeof checkoutId !==
        "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Missing checkoutId",
        },
        { status: 400 }
      );
    }

    const db =
      getFirestore();

    const paymentQuery =
      await db
        .collection("payments")
        .where(
          "peachCheckoutId",
          "==",
          checkoutId
        )
        .limit(1)
        .get();

    if (paymentQuery.empty) {
      return NextResponse.json(
        {
          found: false,
          fulfilled: false,
          status:
            "not_found",
        },
        { status: 404 }
      );
    }

    const paymentDoc =
      paymentQuery.docs[0];

    const payment =
      paymentDoc.data();

    if (
      payment.uid !== uid
    ) {
      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        found: true,
        fulfilled:
          payment.fulfilled === true,
        status:
          payment.status ||
          "unknown",
        fulfilmentStatus:
          payment.fulfilmentStatus ||
          "not_fulfilled",
        paymentId:
          paymentDoc.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Peach payment status error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to retrieve payment status",
      },
      { status: 500 }
    );
  }
}
