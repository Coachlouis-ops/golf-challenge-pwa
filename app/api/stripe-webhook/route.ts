export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {

    // Initialize Firebase Admin ONLY at runtime
    if (!getApps().length) {
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
      );

      initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
    }

    const db = getFirestore();

    // =====================================================
    // CHECKOUT SESSION COMPLETED
    // =====================================================
    if (event.type === "checkout.session.completed") {

      const session = event.data.object as Stripe.Checkout.Session;

      console.log("SESSION MODE:", session.mode);
      console.log("SESSION PRICE:", session.metadata?.priceId);
      console.log("SESSION UID:", session.metadata?.uid);
      console.log("SESSION METADATA:", session.metadata);

      const uid = session.metadata?.uid;

      if (uid) {
        const start = new Date();
        const expires = new Date();
        expires.setFullYear(start.getFullYear() + 1);

        await db.collection("users").doc(uid).set(
          {
            membershipStatus: "active",
            membershipType: "annual",
            membershipStart: start,
            membershipExpires: expires,
          },
          { merge: true }
        );
      }
    }

    // =====================================================
    // PAYMENT FAILED (DEACTIVATE MEMBERSHIP)
    // =====================================================
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;

      const uid = invoice.metadata?.uid;

      if (uid) {
        await db.collection("users").doc(uid).set(
          {
            membershipStatus: "inactive",
          },
          { merge: true }
        );
      }
    }

    // =====================================================
    // SUBSCRIPTION CANCELLED (DEACTIVATE MEMBERSHIP)
    // =====================================================
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      const uid = subscription.metadata?.uid;

      if (uid) {
        await db.collection("users").doc(uid).set(
          {
            membershipStatus: "inactive",
          },
          { merge: true }
        );
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}