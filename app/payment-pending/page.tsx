"use client";

import { useRouter } from "next/navigation";

export default function PaymentPendingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-400">
          Subscription Pending
        </h1>

        <p className="text-gray-300 text-sm leading-relaxed">
          Your subscription request has been submitted. Your game access will
          activate once payment is confirmed.
        </p>

        <div className="bg-black/40 border border-neutral-700 rounded-xl p-4 text-sm text-gray-400">
          Once approved, your wallet will receive{" "}
          <span className="text-green-400 font-semibold">
            100 Teez tokens
          </span>{" "}
          and your dashboard will unlock.
        </div>

        <button
          onClick={() => router.push("/login")}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
        >
          Back to Login
        </button>
      </div>
    </main>
  );
}