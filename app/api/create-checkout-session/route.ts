import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
 apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
  try {
    const { uid, email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],

      line_items: [
        {
          price: "price_1T8a8PCplvzmJJBy8krfB9Gq",
          quantity: 1,
        },
      ],

      metadata: {
        uid: uid,
        email: email,
      },

      success_url: "https://teezgolfchallenge.com/dashboard",
      cancel_url: "https://teezgolfchallenge.com/register",
    });

    return NextResponse.json({ url: session.url });

 } catch (error: any) {
  console.error("Stripe error:", error);
  return NextResponse.json({ error: error.message });
}
}