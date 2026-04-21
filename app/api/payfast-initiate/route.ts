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

    // -----------------------------
    // STEP 1: FORCE CORRECT ORDER
    // -----------------------------
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
    // STEP 2: BUILD STRING MANUALLY
    // (CRITICAL FIX)
    // -----------------------------
    const pfString = Object.keys(data)
      .sort()
      .map(key => {
        return `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`;
      })
      .join("&");

    // -----------------------------
    // STEP 3: SIGNATURE (NO PASSPHRASE)
    // -----------------------------
    const signature = crypto
      .createHash("md5")
      .update(pfString)
      .digest("hex");

    // -----------------------------
    // STEP 4: FINAL URL
    // -----------------------------
    const url = `https://sandbox.payfast.co.za/eng/process?${pfString}&signature=${signature}`;

    console.log("PAYFAST STRING:", pfString);
    console.log("SIGNATURE:", signature);

    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("PayFast error:", error);
    return NextResponse.json({ error: error.message });
  }
}