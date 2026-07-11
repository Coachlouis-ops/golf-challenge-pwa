"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

import { useAuth } from "@/src/lib/AuthContext";
import { auth, functions } from "@/src/lib/firebase";

export default function CancelSubscriptionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [reason, setReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState("");

  async function handleCancelSubscription() {
    if (!user || cancelling) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel your Teez Golf Challenges subscription?\n\nCancellation takes effect immediately and access to subscription-only features will end."
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      setError("");

      const cancelSubscription = httpsCallable(
        functions,
        "cancelSubscription"
      );

      await cancelSubscription({
        reason: reason.trim(),
      });

      setCancelled(true);

      await signOut(auth);
    } catch (error: any) {
      console.error("Cancellation failed:", error);

      setError(
        error?.message ||
          "Subscription cancellation failed. Please try again."
      );
    } finally {
      setCancelling(false);
    }
  }

  if (cancelled) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-xl text-center border border-green-400/40 bg-green-950/20 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            Subscription Cancelled
          </h1>

          <p className="text-gray-300 leading-relaxed">
            Your Teez Golf Challenges subscription has been cancelled
            successfully.
          </p>

          <p className="text-gray-300 leading-relaxed mt-4">
            Cancellation is effective immediately. Future subscription renewal
            has been stopped and access to subscription-only playing features
            has ended.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Any retained account, payment, competition, or security records will
            be handled in accordance with the Privacy Policy and applicable
            South African law.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            You may subscribe again at any time by completing the normal
            self-service subscription process.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full mt-8 py-4 rounded-2xl font-bold text-lg bg-[#39ff14] text-black shadow-[0_0_25px_#39ff14] border border-[#b6ff00]"
          >
            Return to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Cancel Subscription
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          You may cancel your Teez Golf Challenges subscription at any time
          through this self-service cancellation page.
        </p>

        <div className="border border-green-400/30 bg-green-950/20 rounded-2xl p-5 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Cancellation Terms
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            No email request, telephone request, support ticket, written notice,
            administrator request, or manual approval is required.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Cancellation takes effect immediately once the Platform confirms
            that the cancellation has been successfully completed.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Once cancelled, future subscription renewal will stop and access to
            subscription-only playing features will end immediately.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Teez Tokens are digital play credits only. They have no cash value,
            cannot be redeemed, cannot be withdrawn, and cannot be converted
            into money, cryptocurrency, vouchers, goods, services, or external
            rewards.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Cancellation does not convert unused or remaining Teez Tokens into
            cash, credit, vouchers, goods, services, or any other form of
            external value.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Account and Platform records may be retained where reasonably
            required for security, fraud prevention, legal compliance, dispute
            resolution, record keeping, or as described in the Privacy Policy.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            You may subscribe again at any time through the normal self-service
            subscription process.
          </p>
        </div>

        {!user ? (
          <div className="mt-8 border border-white/10 rounded-2xl p-5 bg-white/5">
            <p className="text-sm text-gray-300 mb-4">
              You must log in before cancelling your subscription.
            </p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-[#39ff14] text-black shadow-[0_0_25px_#39ff14]"
            >
              Login to Continue
            </button>
          </div>
        ) : (
          <div className="mt-8 border border-red-500/30 rounded-2xl p-5 bg-red-950/20 space-y-4">
            <h2 className="text-xl font-semibold">
              Confirm Cancellation
            </h2>

            <p className="text-sm text-gray-300">
              Logged in as: {user.email}
            </p>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Reason for cancellation (optional)
              </label>

              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tell us why you are cancelling"
                className="w-full bg-black border border-white/20 rounded-xl p-3 text-white outline-none focus:border-green-400"
              />

              <p className="text-xs text-gray-500 mt-1">
                {reason.length}/500
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleCancelSubscription}
              disabled={cancelling}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-red-600 text-white hover:bg-red-500 transition disabled:opacity-40"
            >
              {cancelling
                ? "Cancelling Subscription..."
                : "Cancel Subscription Immediately"}
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push("/legal/refund-policy")}
            className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
          >
            View Refund, Cancellation & Delivery Policy
          </button>

          <button
            type="button"
            onClick={() => router.push("/terms")}
            className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
          >
            View Platform Terms & Conditions
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}