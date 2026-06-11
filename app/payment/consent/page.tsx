"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentConsentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bankName = searchParams.get("bank") || "Selected Bank";
  const bankUrl = searchParams.get("url") || "";

  const [accepted, setAccepted] = useState(false);

  function continueToBank() {
    if (!accepted) {
      alert("You must accept the Terms & Conditions");
      return;
    }

    if (!bankUrl) {
      alert("Bank link missing");
      router.push("/payment");
      return;
    }

    window.open(bankUrl, "_blank");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-400">
            Terms & Consent
          </h1>

          <p className="text-gray-400 text-sm">
            Before opening {bankName}, please confirm the payment terms.
          </p>
        </div>

        <div className="text-sm text-gray-300 space-y-4 bg-black/40 border border-zinc-700 rounded-xl p-4">
          <p>
            Payments are made to{" "}
            <strong>Honey Badger Technologies (PTY) LTD</strong>.
          </p>

          <p>
            EFT payments are verified manually by an administrator. Your membership
            will only be activated once the payment reflects in the business bank account.
          </p>

          <p>
            By proceeding, you agree to the{" "}
            <span
              onClick={() => router.push("/legal/terms")}
              className="underline cursor-pointer text-green-400"
            >
              Terms & Conditions
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
              I agree to the Terms & Conditions and understand that payment approval
              is handled manually.
            </span>
          </label>
        </div>

        <button
          onClick={continueToBank}
          disabled={!accepted}
          className={`w-full py-3 rounded-xl font-semibold ${
            accepted
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          Continue to {bankName}
        </button>

        <button
          onClick={() => router.push("/payment")}
          className="w-full text-sm text-gray-400 underline"
        >
          Back to Payment
        </button>
      </div>
    </main>
  );
}