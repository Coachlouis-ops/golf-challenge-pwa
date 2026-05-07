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

    const return_url = `https://golf-challenge-pwa.vercel.app/dashboard?uid=${uid}`;
    const cancel_url = "https://golf-challenge-pwa.vercel.app/payment";
    const notify_url = "https://golf-challenge-pwa.vercel.app/api/payfast-notify";

    // -----------------------------------
    // UNIQUE PAYMENT ID
    // -----------------------------------
    const m_payment_id = `${uid}_${Date.now()}`;

    // -----------------------------------
    // SERVER SIDE SOURCE OF TRUTH
    // -----------------------------------
    let finalAmount = "0.00";

    if (type === "membership") {
      finalAmount = "189.99";
    }

    if (type === "tokens") {
      const tokenMap: Record<number, number> = {
        100: 109,
        500: 525,
        1000: 1020,
      };

      finalAmount = Number(
        tokenMap[Number(tokens)] || amount || 0
      ).toFixed(2);
    }

    // -----------------------------------
    // BUILD PARAM OBJECT
    // -----------------------------------
    const data: Record<string, string> = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      m_payment_id,

      amount: finalAmount,

      item_name,
      name_first: name_first || "",
      name_last: name_last || "",
      email_address,

      custom_str1: uid,
      custom_str2: type,
      custom_str3: tokens ? tokens.toString() : "0",
    };

    // -----------------------------------
    // REMOVE EMPTY VALUES
    // -----------------------------------
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key];
    });

    // -----------------------------------
    // BUILD STRING
    // -----------------------------------
    let pfString = Object.entries(data)
      .map(
        ([key, value]) =>
          `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`
      )
      .join("&");

    // -----------------------------------
    // DEBUG
    // -----------------------------------
    console.log("PF STRING:", pfString);
    console.log("DATA OBJECT:", data);

    // -----------------------------------
    // SIGNATURE
    // -----------------------------------
    const signature = crypto
      .createHash("md5")
      .update(pfString)
      .digest("hex");

    console.log("SIGNATURE:", signature);

    // -----------------------------------
    // RETURN FOR POST
    // -----------------------------------
    return NextResponse.json({
      url: "https://sandbox.payfast.co.za/eng/process",
      data: {
  ...data,
  signature: signature,
},
    });

  } catch (error: any) {
    console.error("PayFast error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}