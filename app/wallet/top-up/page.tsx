"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";




export default function TokenTopUpPage() {
  const router = useRouter();
  const { user } = useAuth();

    const [submitting, setSubmitting] =
    useState(false);

  async function topUpTokens() {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setSubmitting(true);

      const idToken =
        await user.getIdToken(true);

      const response = await fetch(
        "/api/peach/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            product:
              "token_topup_100",
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to create Peach token top-up checkout."
        );
      }

      if (!result?.redirectUrl) {
        throw new Error(
          "Peach did not return a checkout URL."
        );
      }

      window.location.href =
        result.redirectUrl;
    } catch (error: any) {
      console.error(
        "Peach token top-up error:",
        error
      );

      alert(
        error?.message ||
          "Unable to start token top-up. Please try again."
      );

      setSubmitting(false);
    }
  }

  return (
    
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-green-400">
            Top Up Teez Play Tokens
          </h1>

          <p className="text-gray-400 text-sm">
            Add more Teez Play Tokens to your wallet whenever you need them.
          </p>
        </div>

                   <div className="bg-gradient-to-b from-zinc-900 to-black border border-orange-400/60 rounded-2xl p-6 text-center space-y-5 shadow-[0_0_35px_rgba(255,153,51,0.18)]">

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

          <p className="text-xs uppercase tracking-[3px] text-orange-300">
            Secure Token Top-Up
          </p>

          <p className="text-green-400 font-semibold">
            100 Teez Play Tokens
          </p>

          <p className="text-4xl font-bold">
            R149
          </p>

          <p className="text-gray-300 text-sm">
            Add 100 Teez Play Tokens directly to your wallet.
          </p>

          <p className="text-gray-500 text-xs">
            Tokens remain in your wallet until used and do not expire monthly.
          </p>

          <button
            type="button"
            onClick={topUpTokens}
            disabled={submitting}
            className={`w-full py-4 rounded-xl font-bold transition ${
              !submitting
                ? "bg-green-500 hover:bg-green-400 text-black"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {submitting
              ? "OPENING SECURE CHECKOUT..."
              : "TOP UP 100 TOKENS WITH PEACH"}
          </button>

          <p className="text-xs text-gray-500">
            Payment is securely processed by Peach Payments.
          </p>
        </div>


        <button
          type="button"
          onClick={() => router.push("/wallet")}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl"
        >
          BACK TO TOKEN WALLET
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full text-gray-400 hover:text-white text-sm underline"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}