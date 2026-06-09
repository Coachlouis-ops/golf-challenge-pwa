export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
  console.log("PayFast ITN route disabled - EFT payments are now active.");

  return NextResponse.json(
    {
      received: true,
      disabled: true,
      message: "PayFast is disabled. EFT payments are now active.",
    },
    { status: 200 }
  );
}