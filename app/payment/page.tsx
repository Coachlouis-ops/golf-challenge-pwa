"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";




export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);





 async function activateSubscription() {
  if (!user) {
    router.push("/login");
    return;
  }

  if (!accepted) {
    alert("Accept the subscription and legal terms first.");
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
          product: "membership_monthly",
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

    alert(
      error?.message ||
        "Unable to start payment. Please try again."
    );

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
          Teez Subscription
        </h2>

               <p className="text-gray-400 max-w-xl">
          Activate 30 days of Teez membership access and receive 100 Teez
          Tokens after your payment is securely confirmed by Peach Payments.
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-lg w-full">
        <h3 className="text-xl font-bold text-green-400">
          Monthly Platform Access
        </h3>

        <p className="text-4xl font-bold">
          R99{" "}
          <span className="text-sm text-gray-400">
            / month
          </span>
        </p>

             <p className="text-sm text-gray-400">
          Includes 100 Teez Tokens with each successfully paid 30-day
          membership period.
        </p>

        <div className="bg-black/40 border border-zinc-700 rounded-xl p-6 flex flex-col gap-4">
          <p className="text-green-400 font-semibold">
            Secure Payment via Peach Payments
          </p>

          <p className="text-sm text-gray-400">
            You will be redirected to Peach Payments to securely authorise your
            payment using the available payment methods.
          </p>

          <p className="text-sm text-gray-400">
            This membership does not automatically renew. When your current
            membership period expires, you must authorise a new payment to
            continue access.
          </p>
        </div>

        <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-5 space-y-4 text-sm text-gray-300">
          <p className="text-green-400 font-semibold">
            Subscription and Payment Terms
          </p>

          <p>
            The subscription is provided by{" "}
            <strong>
              Honey Badger Technologies (PTY) LTD
            </strong>
            .
          </p>

          <p>
            The subscription fee is R99 per month and includes 100 Teez Tokens
            per active month.
          </p>

                  <p>
            The membership does not automatically renew. A new customer-authorised
            payment is required when the current 30-day membership period expires.
          </p>

          <p>
            If you do not make another payment, subscription-only access ends
            when the current paid membership period expires.
          </p>

          <p>
            Teez Tokens are digital play credits only. They have no cash value,
            cannot be redeemed, withdrawn, sold, transferred for payment, or
            converted into money, cryptocurrency, vouchers, goods, services, or
            external rewards.
          </p>

          <p>
            No physical goods are delivered. Subscription delivery takes place
            digitally through Platform activation, dashboard access, and Teez
            Token allocation.
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
              Policy. I understand that the R99 payment provides 30 days of
              membership access and 100 Teez Tokens, does not automatically
              renew, and requires a new authorised payment for the next period.
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={activateSubscription}
          disabled={!accepted || submitting}
          className={`w-full py-4 rounded-xl font-bold transition ${
            accepted && !submitting
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
                 {submitting
            ? "OPENING SECURE CHECKOUT..."
            : "PAY R99 WITH PEACH PAYMENTS"}
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