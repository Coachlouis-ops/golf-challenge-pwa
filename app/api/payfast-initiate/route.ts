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

    // -----------------------------------
    // BUILD STRING IN EXACT PAYFAST ORDER
    // -----------------------------------
    const pfString =
      `merchant_id=${merchant_id}` +
      `&merchant_key=${merchant_key}` +
      `&return_url=${encodeURIComponent(return_url)}` +
      `&cancel_url=${encodeURIComponent(cancel_url)}` +
      `&notify_url=${encodeURIComponent(notify_url)}` +
      `&name_first=${encodeURIComponent(name_first).replace(/%20/g, "+")}` +
      `&name_last=${encodeURIComponent(name_last).replace(/%20/g, "+")}` +
      `&email_address=${encodeURIComponent(email_address)}` +
      `&m_payment_id=${m_payment_id}` +
      `&amount=${Number(amount).toFixed(2)}` +
      `&item_name=${encodeURIComponent(item_name).replace(/%20/g, "+")}` +
      `&custom_str1=${uid}` +
      `&custom_str2=${type}` +
      `&custom_str3=${tokens ? tokens.toString() : "0"}`;

    // -----------------------------------
    // SIGNATURE (NO PASSPHRASE)
    // -----------------------------------
    const signature = crypto
      .createHash("md5")
      .update(pfString)
      .digest("hex");

    // -----------------------------------
    // FINAL URL
    // -----------------------------------
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