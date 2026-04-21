import { NextResponse } from "next/server";
import crypto from "crypto";
import querystring from "querystring";

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
    // BUILD PARAM OBJECT (ORDER = SOURCE OF TRUTH)
    // -----------------------------------
    const data: Record<string, string> = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      m_payment_id,
      amount: Number(amount).toFixed(2),
      item_name,
      name_first: name_first || "",
      name_last: name_last || "",
      email_address,
      custom_str1: uid,
      custom_str2: type,
      custom_str3: tokens ? tokens.toString() : "0",
    };

    // -----------------------------------
    // REMOVE EMPTY VALUES (WITHOUT CHANGING ORDER)
    // -----------------------------------
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key];
    });

    // -----------------------------------
    // BUILD STRING (DO NOT SORT)
    // MUST MATCH FORM ORDER EXACTLY
    // -----------------------------------
    const pfString = querystring.stringify(data);

    // -----------------------------------
    // SIGNATURE
    // -----------------------------------
    const signature = crypto
      .createHash("md5")
      .update(pfString)
      .digest("hex");

    // -----------------------------------
    // DEBUG
    // -----------------------------------
    console.log("PF STRING:", pfString);
    console.log("SIGNATURE:", signature);

    // -----------------------------------
    // RETURN FOR POST
    // -----------------------------------
    return NextResponse.json({
      url: "https://sandbox.payfast.co.za/eng/process",
      data: {
        ...data,
        signature,
      },
    });

  } catch (error: any) {
    console.error("PayFast error:", error);
    return NextResponse.json({ error: error.message });
  }
}