"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";

export default function PaymentPage() {
  const router = useRouter();
  const { loading } = useAuth();

  const [accepted, setAccepted] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6 py-10">
      {/* HERO */}
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl font-bold text-green-400">WELCOME</h1>

        <h2 className="text-3xl font-semibold">
          Membership Payment
        </h2>

        <p className="text-gray-400 max-w-xl">
          Complete your Teez Golf membership payment through our trusted PayGenius payment partner.
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

          <div className="w-full bg-black rounded-xl p-5 flex items-center justify-center border border-zinc-700">
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

        {/* TERMS */}
        <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-4 space-y-4 text-sm text-gray-300">
          <p className="text-green-400 font-semibold">
            Terms & Conditions
          </p>

          <p>
            Payments are made to{" "}
            <strong>Honey Badger Technologies (PTY) LTD</strong>.
          </p>
          
          <p>
            Payments are processed through PayGenius Smart Payments. Membership
            access will only be activated once payment has been confirmed.
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
              I agree to the Terms & Conditions and understand that payment must
              be confirmed before membership access is activated.
            </span>
          </label>
        </div>

        {/* PAYMENT COMPLETE */}
        <button
          onClick={() => router.push("/dashboard")}
          disabled={!accepted}
          className={`w-full py-4 rounded-xl font-bold transition ${
            accepted
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          PAYMENT COMPLETE
        </button>

        <p className="text-xs text-gray-400">
          Tick the Terms & Conditions box to activate the payment button.
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