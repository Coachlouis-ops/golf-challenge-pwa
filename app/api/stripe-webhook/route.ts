export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/* ================================
TOKEN PRICE → TOKEN AMOUNT MAP
================================ */
const TOKEN_MAP: Record<string, number> = {
  "price_1T9JktCplvzmJJByFE9l8n77": 0,
  "price_1T964DCpIvzmJJByQ7HgCd2o": 1,
  "price_1T964DCplvzmJJBy51o17VLO": 2,
  "price_1T9675CplvzmJJByfja065o9": 3,
  "price_1T967TCplvzmJJByOlpPfhg7": 4,
  "price_1T964DCplvzmJJBy9OGtL9pT": 5,
  "price_1T964DCplvzmJJByB9QKG3Ao": 10,
  "price_1T965yCplvzmJJByXJQ3uXUO": 15,
  "price_1T966gCplvzmJJBy7Ny1wjso": 20,
  "price_1T967yCplvzmJJByN1GuKG0j": 25,
  "price_1T968ZCplvzmJJByDDYam7iR": 40,
  "price_1T9695CplvzmJJByqDhhamoo": 50,
  "price_1T969TCplvzmJJByMhQTiajD": 75,
  "price_1T969uCplvzmJJBy6znELwaV": 100,
  "price_1T96AaCplvzmJJByqi7gIdHt": 150,
  "price_1T96AtCplvzmJJByagaEcW0o": 200,
  "price_1T96BGCplvzmJJByUhCFSPG9": 250,
  "price_1T96BcCplvzmJJBy7mx9UVBt": 350,
  "price_1T96CFCpIvzmJJByyUatXDDZ": 500,
  "price_1T96CdCpIvzmJJBy1kEhBwv": 750,
  "price_1T96D8CpIvzmJJBy4c99aP7j": 1000,
};

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

    // =========================================
    // CHECKOUT COMPLETED
    // =========================================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const uid = session.metadata?.uid;
      const priceId = session.metadata?.priceId;

      if (!uid) {
        return NextResponse.json({ received: true });
      }

      const amount = (session.amount_total || 0) / 100;
      const currency = session.currency || "usd";
      const paymentReference = session.payment_intent as string;

      // CUSTOMER
      const customerEmail =
        session.customer_details?.email || session.customer_email || "";

      const customerName =
        session.customer_details?.name || "";

      let type: "membership" | "token_purchase" = "token_purchase";

      // MEMBERSHIP
      if (session.mode === "subscription") {
        type = "membership";

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

      // TOKENS
      if (session.mode === "payment" && priceId) {
        const tokens = TOKEN_MAP[priceId];

        if (!tokens) {
          return NextResponse.json({ received: true });
        }

        const walletRef = db.collection("wallets").doc(uid);
        const walletSnap = await walletRef.get();

        if (!walletSnap.exists) {
          await walletRef.set({
            purchasedTokens: tokens,
            winningTokens: 0,
            lockedTokens: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          await walletRef.update({
            purchasedTokens: FieldValue.increment(tokens),
            updatedAt: new Date(),
          });
        }
      }

// INVOICE 
const year = new Date().getFullYear().toString();

const counterRef = db.collection("counters").doc(`invoice_${year}`);

const invoiceNumber = await db.runTransaction(async (tx) => {
  const counterSnap = await tx.get(counterRef);

  let nextNumber = 1;

  if (counterSnap.exists) {
    nextNumber = (counterSnap.data()?.current || 0) + 1;
  }

  tx.set(counterRef, { current: nextNumber }, { merge: true });

  return `INV-${year}-${nextNumber
    .toString()
    .padStart(6, "0")}`;
});

const invoiceRef = db.collection("invoices").doc();

const tokens = priceId ? TOKEN_MAP[priceId] || 0 : 0;

await invoiceRef.set({
  uid,

  customerEmail,
  customerName,

  type,

  paymentProvider: "stripe",
  paymentReference,
  status: "paid",

  description:
    type === "membership" ? "Membership" : "Token Purchase",
  quantity: type === "membership" ? 1 : tokens,
  unitPrice:
    type === "membership"
      ? amount
      : tokens > 0
      ? amount / tokens
      : amount,
  amount,

  vatRegistered: false,
  vatAmount: 0,

  totalAmount: amount,

  invoiceNumber,
  createdAt: new Date(),

  pdfUrl: null,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// EMAIL (CORRECT POSITION)

try {
  // SEND TO CLIENT
  await resend.emails.send({
    from: "invoices@teezgolfchallenge.com",
    to: [customerEmail],
    subject: `Invoice ${invoiceNumber}`,
    html: `
      <h2>Invoice ${invoiceNumber}</h2>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <hr/>
      <p><strong>Description:</strong> ${
        type === "membership" ? "Membership" : "Token Purchase"
      }</p>
      <p><strong>Quantity:</strong> ${
        type === "membership" ? 1 : tokens
      }</p>
      <hr/>
      <p><strong>Total Paid:</strong> ${amount} ${currency.toUpperCase()}</p>
      <p>Status: Paid</p>
    `,
  });

  // SEND TO ADMIN
  await resend.emails.send({
    from: "invoices@teezgolfchallenge.com",
    to: ["honeybagderapps5@gmail.com"],
    subject: `ADMIN COPY - Invoice ${invoiceNumber}`,
    html: `
      <h2>ADMIN COPY - Invoice ${invoiceNumber}</h2>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>UID:</strong> ${uid}</p>
      <p><strong>Payment Ref:</strong> ${paymentReference}</p>
      <hr/>
      <p><strong>Total Paid:</strong> ${amount} ${currency.toUpperCase()}</p>
    `,
  });

  console.log("EMAIL SUCCESS");
} catch (err) {
  console.error("EMAIL ERROR:", err);
}

// CLOSE checkout.session.completed
}

// PAYMENT FAILED
if (event.type === "invoice.payment_failed") {
  const invoice = event.data.object as Stripe.Invoice;
  const uid = invoice.metadata?.uid;

  if (uid) {
    await db.collection("users").doc(uid).set(
      { membershipStatus: "inactive" },
      { merge: true }
    );
  }
}

// SUB CANCELLED
if (event.type === "customer.subscription.deleted") {
  const subscription = event.data.object as Stripe.Subscription;
  const uid = subscription.metadata?.uid;

  if (uid) {
    await db.collection("users").doc(uid).set(
      { membershipStatus: "inactive" },
      { merge: true }
    );
  }
}

return NextResponse.json({ received: true });

} catch (error: any) {
  console.error("Webhook processing error:", error);

  return NextResponse.json(
    { error: error?.message || "Webhook handler failed" },
    { status: 500 }
  );
}
}