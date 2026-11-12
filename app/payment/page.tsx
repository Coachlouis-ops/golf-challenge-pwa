"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import Image from "next/image";
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";
import {
  WALLET_DEPOSIT_AMOUNTS,
  formatWalletRand,
} from "@/src/lib/walletMoney";

const depositPolicies = [
  {
    href: "/bookmaker/terms",
    label: "ABC Bookmakers Terms & Conditions",
  },
  {
    href: "/bookmaker/deposits-withdrawals",
    label: "Deposits & Withdrawals Policy",
  },
] as const;


export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { teezAlert } = useTeezNotification();

  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);





 async function activateSubscription() {
  if (!user) {
    router.push("/login");
    return;
  }

 if (!amount || !accepted) {
  await teezAlert({
    title: "TERMS REQUIRED",
    message:
      "Choose a deposit and accept the deposit terms before continuing to payment.",
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
          amount,
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
          ADD MONEY
        </h1>

         <h2 className="text-3xl font-semibold">
          ABC Bookmakers wallet
        </h2>
<p className="text-gray-400 max-w-xl">
  Add rand to your player wallet. TEEZ Golf Challenges is the golf game
  you play from that balance. Peach Payments confirms the deposit before
  it is credited.
</p>
      </div>

      <div className="bg-gradient-to-b from-zinc-900 to-black border border-orange-400/60 p-8 rounded-2xl shadow-[0_0_35px_rgba(255,153,51,0.18)] flex flex-col gap-6 text-center max-w-lg w-full">
                 <div className="flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[3px] text-orange-300">
            Secure Checkout
          </p>

          <h3 className="text-2xl font-bold text-white">
            Wallet deposit
          </h3>

          <p className="text-sm font-semibold text-orange-400">
            Powered by Peach Payments
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {WALLET_DEPOSIT_AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              className={`rounded-xl border-2 py-4 text-lg font-black ${
                amount === value
                  ? "border-green-400 bg-green-400 text-black"
                  : "border-zinc-500 bg-black text-white"
              }`}
            >
              {formatWalletRand(value)}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400">
          {amount
            ? `${formatWalletRand(amount)} will be added to your wallet after Peach Payments confirms it.`
            : "Choose how much to add. The same amounts are used when you place a bet."}
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
            Deposit terms
          </p>

          <p>
            ABC Bookmakers runs the player platform and holds your wallet.
            TEEZ Golf Challenges is the golf game offered on it.
          </p>

          <p>
            The amount you choose is the amount Peach Payments asks you to
            authorise. It is credited to your wallet only after that payment
            is confirmed. Nothing is taken again later.
          </p>

        <div className="border-t border-zinc-700 pt-4">
  <p className="text-green-400 font-semibold mb-4">
    Review the Legal Policies
  </p>

  <div className="flex flex-col items-start gap-3">
    {depositPolicies.map((policy) => (
      <button
        key={policy.href}
        type="button"
        onClick={() => router.push(policy.href)}
        className="text-left text-green-400 underline hover:text-green-300"
      >
        {policy.label}
      </button>
    ))}
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
  I have reviewed and accept the ABC Bookmakers Terms & Conditions
  and the Deposits & Withdrawals Policy.
</span>
          </label>
        </div>

               <button
          type="button"
          onClick={activateSubscription}
          disabled={!accepted || !amount || submitting}
          className={`w-full py-4 rounded-xl font-bold transition shadow-lg ${
            accepted && amount && !submitting
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
          The deposit is added to your wallet only after ABC Bookmakers
          receives verified payment confirmation from Peach Payments.
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
