"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";

export default function PaymentPage() {
  const router = useRouter();
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6">
      {/* HERO */}
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl font-bold text-green-400">WELCOME</h1>

        <h2 className="text-3xl font-semibold">
          Membership Payment
        </h2>

        <p className="text-gray-400 max-w-xl">
          Complete your Teez Golf membership payment through our payment partner.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-md w-full">
        <h3 className="text-xl font-bold text-green-400">
          Teez Golf Membership
        </h3>

        <p className="text-4xl font-bold">
          R189.99 <span className="text-sm text-gray-400">/ year</span>
        </p>

        {/* PAYGENIUS */}
        <div className="bg-black/40 border border-zinc-700 rounded-xl p-6 flex flex-col items-center gap-5">
          <p className="text-green-400 font-semibold">
            Secure Payment Portal
          </p>

          <div className="w-full bg-white rounded-xl p-5 flex items-center justify-center">
            <img
              src="/paygenius-logo.png"
              alt="PayGenius"
              className="max-h-20 max-w-full object-contain"
            />
          </div>

          <p className="text-sm text-gray-400">
            Payments will be processed through PayGenius Smart Payments.
          </p>
        </div>

        {/* PAYMENT COMPLETE */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold transition"
        >
          PAYMENT COMPLETE
        </button>

        <p className="text-xs text-gray-400">
          After payment, your membership access will be checked and activated according to your payment status.
        </p>
      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/login")}
        className="text-sm text-gray-400 underline"
      >
        Back to Login
      </button>
    </div>
  );
}