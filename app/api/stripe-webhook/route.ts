export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

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

/* ================================
PDF GENERATOR
================================ */
function generateInvoicePDF(data: {
  invoiceNumber: string;
  amount: number;
  currency: string;
  type: string;
  paymentReference: string;
}) {
const doc = new PDFDocument({
  bufferPages: true,
});


  const stream = new PassThrough();
  const buffers: any[] = [];

  doc.pipe(stream);
  stream.on("data", (chunk) => buffers.push(chunk));

  doc.fontSize(20).text("HONEY BADGER TECHNOLOGIES (PTY) LTD");
  doc.fontSize(10).text("Reg: 2026 / 102722 / 07");
  doc.moveDown();

  doc.fontSize(16).text("INVOICE (NOT A TAX INVOICE)");
  doc.fontSize(10).text("VAT: Not Applicable – Supplier not VAT registered");

  doc.moveDown();

  doc.text(`Invoice #: ${data.invoiceNumber}`);
  doc.text(`Date: ${new Date().toISOString().split("T")[0]}`);
  doc.text(`Payment Ref: ${data.paymentReference}`);

  doc.moveDown();

  doc.text(
    `Description: ${
      data.type === "membership" ? "Membership" : "Token Purchase"
    }`
  );
  doc.text(`Amount: ${data.amount} ${data.currency.toUpperCase()}`);
  doc.text(`VAT: 0`);
  doc.text(`Total: ${data.amount} ${data.currency.toUpperCase()}`);

  doc.end();

  return new Promise<Buffer>((resolve) => {
    stream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

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
    storageBucket: `${serviceAccount.project_id}.appspot.com`,
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

// ---------------- CUSTOMER ----------------
const customerEmail =
  session.customer_details?.email || session.customer_email || "";

const customerName =
  session.customer_details?.name || "";

      let type: "membership" | "token_purchase" = "token_purchase";

      // ---------------- MEMBERSHIP ----------------
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

      // ---------------- TOKENS ----------------
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

      // ---------------- INVOICE (SEQUENTIAL) ----------------
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

await invoiceRef.set({
  uid,

  // CUSTOMER
  customerEmail,
  customerName,

  // TYPE
  type,

  // PAYMENT
  paymentProvider: "stripe",
  paymentReference,
  status: "paid",

  // ITEM
  description:
    type === "membership" ? "Membership" : "Token Purchase",
  quantity: type === "membership" ? 1 : (TOKEN_MAP[priceId] || 0),
  unitPrice:
    type === "membership"
      ? amount
      : amount / (TOKEN_MAP[priceId] || 1),
  amount,

  // TAX
  vatRegistered: false,
  vatAmount: 0,

  // TOTAL
  totalAmount: amount,

  // INVOICE
  invoiceNumber,
  createdAt: new Date(),

  // OUTPUT
  pdfUrl: null,
});

}

    // =========================================
    // PAYMENT FAILED
    // =========================================
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

    // =========================================
    // SUBSCRIPTION CANCELLED
    // =========================================
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