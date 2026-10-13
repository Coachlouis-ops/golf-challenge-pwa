"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import Image from "next/image";
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";


export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { teezAlert } = useTeezNotification();

  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);





 async function activateSubscription() {
  if (!user) {
    router.push("/login");
    return;
  }

 if (!accepted) {
  await teezAlert({
    title: "TERMS REQUIRED",
    message:
      "Accept the participation and legal terms before continuing to payment.",
    type: "warning",
    buttonText: "CONTINUE",
  });
  return;
}

  try {
    setSubmitting(true);

    const idToken = await user.getIdToken(true);

    const response = await fetch(
      "/api/peach/create-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
                body: JSON.stringify({
          product: "participation_access",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.error ||
          "Unable to create Peach payment checkout."
      );
    }

    if (!result?.redirectUrl) {
      throw new Error(
        "Peach did not return a checkout URL."
      );
    }

    window.location.href = result.redirectUrl;
  } catch (error: any) {
    console.error(
      "Peach checkout error:",
      error
    );

  await teezAlert({
  title: "PAYMENT NOT STARTED",
  message:
    error?.message ||
    "Unable to start payment. Please try again.",
  type: "error",
  buttonText: "TRY AGAIN",
});

setSubmitting(false);

    setSubmitting(false);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6 py-10">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl font-bold text-green-400">
          ACTIVATE YOUR GAME
        </h1>

         <h2 className="text-3xl font-semibold">
          Teez Participation Access
        </h2>
<p className="text-gray-400 max-w-xl">
  Get 30 days of access to TEEZ Golf Challenges and receive
  200 Play Tokens after your R69 payment is securely
  confirmed by Peach Payments.
</p>
      </div>

      <div className="bg-gradient-to-b from-zinc-900 to-black border border-orange-400/60 p-8 rounded-2xl shadow-[0_0_35px_rgba(255,153,51,0.18)] flex flex-col gap-6 text-center max-w-lg w-full">
                 <div className="flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[3px] text-orange-300">
            Secure Checkout
          </p>

          <h3 className="text-2xl font-bold text-white">
            Participation Access
          </h3>

          <p className="text-sm font-semibold text-orange-400">
            Powered by Peach Payments
          </p>
        </div>
        <div>
          <p className="text-5xl font-bold text-white">
            R69
          </p>

          <p className="text-xs text-gray-500 mt-2">
            One-time authorised payment
          </p>
        </div>

       <p className="text-sm text-gray-400">
  Includes 200 TEEZ Play Tokens and 30 days of participation.
  Unused Play Tokens expire after 30 days and do not carry over.
  No automatic renewal.
</p>

                    <div className="bg-black/50 border border-orange-400/30 rounded-xl p-5 flex flex-col gap-4">

          <div className="w-full overflow-hidden rounded-xl border border-orange-400/30">
            <Image
              src="/peach-payment-tile.png"
              alt="Secure payments powered by Peach Payments"
              width={1024}
              height={1536}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <p className="text-orange-400 font-semibold">
            Secure Payment via Peach Payments
          </p>

          <p className="text-sm text-gray-300">
            You will be redirected to Peach Payments to securely authorise your
            payment.
          </p>

          <div className="flex flex-wrap justify-center gap-3 py-2 text-xs text-gray-300">
            <span className="border border-zinc-700 rounded-lg px-3 py-2">
              VISA
            </span>

            <span className="border border-zinc-700 rounded-lg px-3 py-2">
              MASTERCARD
            </span>

            <span className="border border-zinc-700 rounded-lg px-3 py-2">
              GOOGLE PAY
            </span>

            <span className="border border-zinc-700 rounded-lg px-3 py-2">
              APPLE PAY
            </span>

            <span className="border border-zinc-700 rounded-lg px-3 py-2">
              PAY BY BANK
            </span>

            <span className="border border-zinc-700 rounded-lg px-3 py-2">
              PAYSHAP
            </span>
          </div>

          <p className="text-xs text-gray-500">
            3D Secure authentication is enabled where applicable.
          </p>

          <p className="text-sm text-gray-400">
            One-time authorised payment. No automatic renewal or recurring
            deduction.
          </p>
        </div>

        <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-5 space-y-4 text-sm text-gray-300">
                   <p className="text-green-400 font-semibold">
            Participation and Payment Terms
          </p>

          <p>
            Participation Access is provided by{" "}
            <strong>
              Honey Badger Technologies (PTY) LTD
            </strong>
            .
          </p>

      <p>
  The R69 Participation Access payment provides 30 days of
  participation and includes 200 TEEZ Play Tokens.
</p>

<p>
  Participation Access expires 30 days after payment confirmation.
  All unused wallet tokens expire at the end of this period
  and cannot be carried over.
</p>

<p>
  Participation does not renew automatically. No recurring
  deductions are made. To continue participating after expiry,
  a new R69 payment is required.
</p>

<p>
  Each new participation payment resets the available Play Token
  balance to 200 tokens. Additional token purchases are not available.
</p>

          <p>
            Teez Tokens are digital play credits only. They have no cash value,
            cannot be redeemed, withdrawn, sold, transferred for payment, or
            converted into money, cryptocurrency, vouchers, goods, services, or
            external rewards.
          </p>

                  <p>
            No physical goods are delivered. Participation Access and Teez Play
            Tokens are delivered digitally through the Platform.
          </p>

        <div className="border-t border-zinc-700 pt-4">
  <p className="text-green-400 font-semibold mb-4">
    Review the Legal Policies
  </p>

  <div className="flex flex-col items-start gap-3">

    <button
      type="button"
      onClick={() => router.push("/legal/terms")}
      className="text-left text-green-400 underline hover:text-green-300"
    >
      Website Terms & Conditions
    </button>

    <button
      type="button"
      onClick={() => router.push("/terms")}
      className="text-left text-green-400 underline hover:text-green-300"
    >
      Platform Terms & Conditions
    </button>

    <button
      type="button"
      onClick={() => router.push("/legal/payment-policy")}
      className="text-left text-green-400 underline hover:text-green-300"
    >
      Payment & Subscription Policy
    </button>

    <button
      type="button"
      onClick={() => router.push("/legal/refund-policy")}
      className="text-left text-green-400 underline hover:text-green-300"
    >
      Refund, Cancellation & Delivery Policy
    </button>

    <button
      type="button"
      onClick={() => router.push("/privacy")}
      className="text-left text-green-400 underline hover:text-green-300"
    >
      Privacy Policy
    </button>

  </div>
</div>

          <label className="flex items-start gap-3 pt-4 border-t border-zinc-700">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="mt-1"
            />
<span>
  I confirm that I have reviewed and accept the Website Terms &
  Conditions, Platform Terms & Conditions, Payment & Subscription
  Policy, Refund, Cancellation & Delivery Policy, and Privacy
  Policy. I understand that my R69 payment provides 30 days of
  Participation Access and 200 TEEZ Play Tokens. All unused
  wallet tokens expire after 30 days with no carryover.
  Participation does not renew automatically, and additional
  token purchases are not available. A new R69 payment is
  required to participate after expiry and resets my available
  Play Token balance to 200.
</span>
          </label>
        </div>

               <button
          type="button"
          onClick={activateSubscription}
          disabled={!accepted || submitting}
          className={`w-full py-4 rounded-xl font-bold transition shadow-lg ${
            accepted && !submitting
              ? "bg-orange-400 hover:bg-orange-300 text-black shadow-[0_0_25px_rgba(251,146,60,0.35)]"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {submitting
            ? "OPENING PEACH SECURE CHECKOUT..."
            : "CONTINUE TO PEACH PAYMENTS"}
        </button>

                <p className="text-xs text-gray-400">
          Payment is processed securely by Peach Payments using 3D Secure where
          applicable.
        </p>

        <p className="text-xs text-gray-400">
          Your dashboard unlocks only after Teez receives verified payment
          confirmation from Peach Payments.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/login")}
        className="text-sm text-gray-400 underline"
      >
        Back to Login
      </button>
    </div>
  );
}
