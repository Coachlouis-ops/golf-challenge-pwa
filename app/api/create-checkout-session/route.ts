import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
  try {
    const { uid, email, priceId, mode } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        uid,
        email,
        priceId,
      },

      success_url: "https://golf-challenge-pwa.vercel.app/dashboard",
      cancel_url: "https://golf-challenge-pwa.vercel.app/dashboard",
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message });
  }
}