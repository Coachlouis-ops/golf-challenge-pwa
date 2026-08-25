export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType =
      req.headers.get("content-type") || "";

    const rawBody = await req.text();

    let checkoutId = "";

    if (
      contentType.includes(
        "application/x-www-form-urlencoded"
      )
    ) {
      const params =
        new URLSearchParams(rawBody);

      checkoutId =
        params.get("checkoutId") || "";
    } else if (
      contentType.includes(
        "application/json"
      )
    ) {
      try {
        const body =
          JSON.parse(rawBody);

        checkoutId =
          body?.checkoutId || "";
      } catch {
        return NextResponse.json(
          {
            error:
              "Invalid Peach result payload",
          },
          { status: 400 }
        );
      }
    }

    if (!checkoutId) {
      console.error(
        "Peach result redirect missing checkoutId."
      );

      return NextResponse.redirect(
        new URL(
          "/payment-pending",
          req.url
        ),
        303
      );
    }

    // IMPORTANT:
    // This browser redirect does NOT fulfil
    // membership or credit tokens.
    //
    // The server-side Peach webhook/status
    // verification remains the source of truth.
    const pendingUrl =
      new URL(
        "/payment-pending",
        req.url
      );

    pendingUrl.searchParams.set(
      "checkoutId",
      checkoutId
    );

    return NextResponse.redirect(
      pendingUrl,
      303
    );
  } catch (error: any) {
    console.error(
      "Peach result handler error:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/payment-pending",
        req.url
      ),
      303
    );
  }
}