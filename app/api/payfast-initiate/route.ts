import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const {
      amount,
      item_name,
      name_first,
      name_last,
      email_address,
      uid,
      type,
      tokens,
    } = await req.json();

    const merchant_id = process.env.PAYFAST_MERCHANT_ID as string;
    const merchant_key = process.env.PAYFAST_MERCHANT_KEY as string;

    const return_url = "https://golf-challenge-pwa.vercel.app/dashboard";
    const cancel_url = "https://golf-challenge-pwa.vercel.app/payment";
    const notify_url = "https://golf-challenge-pwa.vercel.app/api/payfast-notify";

    const m_payment_id = `${uid}_${Date.now()}`;

    const data: Record<string, string> = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,

      name_first,
      name_last,
      email_address,

      m_payment_id,

      amount: Number(amount).toFixed(2),
      item_name,

      custom_str1: uid,
      custom_str2: type,
      custom_str3: tokens ? tokens.toString() : "0",
    };

    // -----------------------------
    // SIGNATURE (RAW VALUES ONLY)
    // -----------------------------
    const sortedKeys = Object.keys(data).sort();

    let signatureString = "";

    sortedKeys.forEach((key) => {
      if (data[key] !== "") {
        signatureString += `${key}=${data[key].trim()}&`;
      }
    });

    signatureString = signatureString.slice(0, -1);

    const signature = crypto
      .createHash("md5")
      .update(signatureString)
      .digest("hex");

    // -----------------------------
    // FINAL URL (ENCODED)
    // -----------------------------
    let query = "";

    sortedKeys.forEach((key) => {
      if (data[key] !== "") {
        query += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`;
      }
    });

    query = query.slice(0, -1);

    const url = `https://sandbox.payfast.co.za/eng/process?${query}&signature=${signature}`;

    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("PayFast error:", error);
    return NextResponse.json({ error: error.message });
  }
}