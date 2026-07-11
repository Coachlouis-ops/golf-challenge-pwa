"use client";

import { useRouter } from "next/navigation";

export default function CancelSubscriptionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Cancel Subscription
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          You may cancel your Teez Golf Challenges subscription at any time.
          Cancellation takes effect immediately once your cancellation request
          has been submitted, subject to any technical processing requirements
          of the payment gateway, bank, or subscription system.
        </p>

        <div className="border border-green-400/30 bg-green-950/20 rounded-2xl p-5 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Cancellation Terms
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Cancelling your subscription prevents future subscription renewal
            where the cancellation is successfully processed before the next
            billing cycle.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Teez tokens are digital play credits only. Tokens have no cash
            value, cannot be redeemed, cannot be withdrawn, and cannot be
            converted into money, vouchers, goods, services, or external rewards.
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            Used tokens, completed challenges, finalized results, rankings,
            profile statistics, and match history remain part of the platform
            records.
          </p>
        </div>

        <div className="mt-8 border border-white/10 rounded-2xl p-5 bg-white/5 space-y-4">
          <h2 className="text-xl font-semibold">
            Submit Cancellation Request
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Until the final payment gateway cancellation system is connected,
            please submit your cancellation request through the contact page.
            Include your registered email address and request cancellation of
            your Teez Golf Challenges subscription.
          </p>

          <button
            onClick={() => router.push("/contact")}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-[#39ff14] text-black shadow-[0_0_25px_#39ff14] border border-[#b6ff00] hover:scale-[1.02] transition"
          >
            Continue to Cancellation Request
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/legal/refund-policy")}
            className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
          >
            View Refund & Cancellation Policy
          </button>

          <button
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