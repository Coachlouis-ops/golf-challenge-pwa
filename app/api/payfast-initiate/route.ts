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
    } = await req.json();

    // PAYFAST CONFIG (from your PayFast dashboard)
    const merchant_id = process.env.PAYFAST_MERCHANT_ID as string;
    const merchant_key = process.env.PAYFAST_MERCHANT_KEY as string;
    const passphrase = process.env.PAYFAST_PASSPHRASE as string;

    const return_url = "https://golf-challenge-pwa.vercel.app/dashboard";
    const cancel_url = "https://golf-challenge-pwa.vercel.app/payment";
    const notify_url = "https://golf-challenge-pwa.vercel.app/api/payfast-notify";

    // BUILD PARAMS
    const data: Record<string, string> = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,

      name_first,
      name_last,
      email_address,

      m_payment_id: Date.now().toString(),

      amount: amount.toString(),
      item_name,
    };

    // CREATE QUERY STRING
    const query = new URLSearchParams(data).toString();

    // CREATE SIGNATURE
    const signature = crypto
      .createHash("md5")
      .update(query + `&passphrase=${passphrase}`)
      .digest("hex");

    // FINAL URL
    const url = `https://sandbox.payfast.co.za/eng/process?${query}&signature=${signature}`;

    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("PayFast error:", error);
    return NextResponse.json({ error: error.message });
  }
}