"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";
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
      alert("Accept the subscription terms first.");
      return;
    }

    try {
      setSubmitting(true);

      const activateTestSubscription = httpsCallable(
        functions,
        "activateTestSubscription"
      );

      await activateTestSubscription({});

      alert(
        "Subscription activated. Your wallet has been credited with 100 Teez tokens."
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to activate subscription.");
    } finally {
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
          Subscribe to unlock competitive golf challenges, rankings, player stats,
          and 100 monthly Teez tokens.
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-md w-full">
        <h3 className="text-xl font-bold text-green-400">
          Monthly Game Access
        </h3>

        <p className="text-4xl font-bold">
          R99 <span className="text-sm text-gray-400">/ month</span>
        </p>

        <p className="text-sm text-gray-400">
          Includes 100 Teez tokens every month.
        </p>

        <div className="bg-black/40 border border-zinc-700 rounded-xl p-6 flex flex-col gap-4">
          <p className="text-green-400 font-semibold">
            Temporary Payment Placeholder
          </p>

          <p className="text-sm text-gray-400">
            This placeholder activates the subscription flow while the final
            bank-approved payment portal is being connected.
          </p>

          <p className="text-sm text-gray-400">
            Once the payment portal is live, this button will be replaced with
            the official subscription payment checkout.
          </p>
        </div>

        <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-4 space-y-4 text-sm text-gray-300">
          <p className="text-green-400 font-semibold">
            Subscription Terms
          </p>

          <p>
            Payments are made to{" "}
            <strong>Honey Badger Technologies (PTY) LTD</strong>.
          </p>

          <p>
            Teez tokens are digital play credits used only inside Teez Golf
            Challenges. Tokens have no cash value and cannot be withdrawn,
            redeemed, transferred for cash, or converted into any real-world value.
          </p>

          <p>
            On activation, your subscription becomes active and your wallet
            receives 100 Teez tokens.
          </p>

          <p>
            By proceeding, you agree to the full{" "}
            <span
              onClick={() => router.push("/legal/terms")}
              className="text-green-400 underline cursor-pointer"
            >
              Terms & Conditions
            </span>{" "}
            and the{" "}
            <span
              onClick={() => router.push("/legal/refund-policy")}
              className="text-green-400 underline cursor-pointer"
            >
              Refund Policy
            </span>
            .
          </p>

          <label className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />

            <span>
              I agree that Teez tokens are digital play credits only and that
              this temporary activation is for app-flow testing until the final
              payment portal is connected.
            </span>
          </label>
        </div>

        <button
          onClick={activateSubscription}
          disabled={!accepted || submitting}
          className={`w-full py-4 rounded-xl font-bold transition ${
            accepted && !submitting
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {submitting ? "ACTIVATING..." : "ACTIVATE SUBSCRIPTION"}
        </button>

        <p className="text-xs text-gray-400">
          Your dashboard unlocks after subscription activation.
        </p>
      </div>

      <button
        onClick={() => router.push("/login")}
        className="text-sm text-gray-400 underline"
      >
        Back to Login
      </button>
    </div>
  );
}