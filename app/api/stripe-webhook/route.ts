export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

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
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const uid = session.metadata?.uid;

      if (uid) {
        await db.collection("users").doc(uid).set(
          {
            membershipStatus: "active",
            membershipType: "annual",
            membershipStart: new Date(),
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