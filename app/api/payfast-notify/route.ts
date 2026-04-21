export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";

// ------------------------------
// TOKEN MAP (MATCH STRIPE)
// ------------------------------
const TOKEN_MAP: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  10: 10,
  15: 15,
  20: 20,
  25: 25,
  40: 40,
  50: 50,
  75: 75,
  100: 100,
  150: 150,
  200: 200,
  250: 250,
  350: 350,
  500: 500,
  750: 750,
  1000: 1000,
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // ------------------------------
    // VERIFY SIGNATURE
    // ------------------------------
    const passphrase = process.env.PAYFAST_PASSPHRASE as string;

    const receivedSignature = data.signature;
    delete data.signature;

    const sortedKeys = Object.keys(data).sort();

    const queryString = sortedKeys
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&");

    const generatedSignature = crypto
      .createHash("md5")
      .update(queryString + `&passphrase=${passphrase}`)
      .digest("hex");

    if (generatedSignature !== receivedSignature) {
      console.error("Invalid PayFast signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ------------------------------
    // INIT FIREBASE
    // ------------------------------
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

    // ------------------------------
    // EXTRACT DATA
    // ------------------------------
    const uid = data.custom_str1;
    const type = data.custom_str2; // membership | tokens
    const tokenAmount = Number(data.custom_str3 || 0);

    const amount = Number(data.amount_gross || 0);
    const paymentReference = data.pf_payment_id;

    const customerEmail = data.email_address || "";
    const customerName = `${data.name_first || ""} ${data.name_last || ""}`;

    if (!uid) {
      return NextResponse.json({ received: true });
    }

    // ------------------------------
    // MEMBERSHIP
    // ------------------------------
    if (type === "membership") {
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

    // ------------------------------
    // TOKENS
    // ------------------------------
    if (type === "tokens" && tokenAmount > 0) {
      const walletRef = db.collection("wallets").doc(uid);
      const walletSnap = await walletRef.get();

      if (!walletSnap.exists) {
        await walletRef.set({
          purchasedTokens: tokenAmount,
          winningTokens: 0,
          lockedTokens: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        await walletRef.update({
          purchasedTokens: FieldValue.increment(tokenAmount),
          updatedAt: new Date(),
        });
      }
    }

    // ------------------------------
    // INVOICE
    // ------------------------------
    const year = new Date().getFullYear().toString();
    const counterRef = db.collection("counters").doc(`invoice_${year}`);

    const invoiceNumber = await db.runTransaction(async (tx) => {
      const counterSnap = await tx.get(counterRef);

      let nextNumber = 1;

      if (counterSnap.exists) {
        nextNumber = (counterSnap.data()?.current || 0) + 1;
      }

      tx.set(counterRef, { current: nextNumber }, { merge: true });

      return `INV-${year}-${nextNumber.toString().padStart(6, "0")}`;
    });

    const invoiceRef = db.collection("invoices").doc();

    await invoiceRef.set({
      uid,
      customerEmail,
      customerName,
      type,
      paymentProvider: "payfast",
      paymentReference,
      status: "paid",

      description:
        type === "membership" ? "Membership" : "Token Purchase",

      quantity: type === "membership" ? 1 : tokenAmount,
      unitPrice:
        type === "membership"
          ? amount
          : tokenAmount > 0
          ? amount / tokenAmount
          : amount,

      amount,
      totalAmount: amount,

      invoiceNumber,
      createdAt: new Date(),
      pdfUrl: null,
    });

    // ------------------------------
    // EMAILS
    // ------------------------------
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: "Honey Badger <invoices@honeybadgertech.com>",
        to: [customerEmail],
        cc: ["finance@honeybadgertech.com"],
        subject: `Invoice ${invoiceNumber}`,
        html: `
          <h2>Invoice ${invoiceNumber}</h2>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <hr/>
          <p><strong>Description:</strong> ${
            type === "membership" ? "Membership" : "Token Purchase"
          }</p>
          <p><strong>Total Paid:</strong> ${amount}</p>
        `,
      });
    } catch (err) {
      console.error("CLIENT EMAIL ERROR:", err);
    }

    try {
      await resend.emails.send({
        from: "Honey Badger <invoices@honeybadgertech.com>",
        to: [
          "admin@teezgolfchallenges.com",
          "finance@honeybadgertech.com",
        ],
        subject: `ADMIN COPY - Invoice ${invoiceNumber}`,
        html: `
          <h2>ADMIN COPY - Invoice ${invoiceNumber}</h2>
          <p><strong>UID:</strong> ${uid}</p>
          <p><strong>Payment Ref:</strong> ${paymentReference}</p>
          <p><strong>Total Paid:</strong> ${amount}</p>
        `,
      });
    } catch (err) {
      console.error("ADMIN EMAIL ERROR:", err);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("PayFast ITN error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}