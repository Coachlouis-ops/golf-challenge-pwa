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
    const passphrase = process.env.PAYFAST_PASSPHRASE as string;

    const return_url = "https://golf-challenge-pwa.vercel.app/dashboard";
    const cancel_url = "https://golf-challenge-pwa.vercel.app/payment";
    const notify_url = "https://golf-challenge-pwa.vercel.app/api/payfast-notify";

    const m_payment_id = `${uid}_${Date.now()}`;

    // -----------------------
    // DATA OBJECT
    // -----------------------
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

    // -----------------------
    // STEP 1 — SORT KEYS
    // -----------------------
    const sortedKeys = Object.keys(data).sort();

    // -----------------------
    // STEP 2 — BUILD STRING
    // -----------------------
    let pfString = "";

    sortedKeys.forEach((key) => {
      const value = data[key];

      if (value !== "") {
        pfString += `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}&`;
      }
    });

    // REMOVE LAST &
    pfString = pfString.slice(0, -1);

    // -----------------------
    // STEP 3 — ADD PASSPHRASE
    // -----------------------
    if (passphrase) {
      pfString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
    }

    // -----------------------
    // STEP 4 — SIGNATURE
    // -----------------------
    const signature = crypto
      .createHash("md5")
      .update(pfString)
      .digest("hex");

    // -----------------------
    // FINAL URL
    // -----------------------
    const url = `https://sandbox.payfast.co.za/eng/process?${pfString}&signature=${signature}`;

    console.log("PAYFAST STRING:", pfString);
    console.log("SIGNATURE:", signature);
    console.log("FINAL URL:", url);

    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("PayFast error:", error);
    return NextResponse.json({ error: error.message });
  }
}