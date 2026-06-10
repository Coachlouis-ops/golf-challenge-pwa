"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [accepted, setAccepted] = useState(false);

  // -----------------------------------
  // EFT TEMP PAYMENT FLOW
  // -----------------------------------
  function continueToProfile() {
    if (!accepted) {
      alert("You must accept the Terms & Conditions");
      return;
    }

    if (!user) {
      alert("User not logged in");
      router.push("/login");
      return;
    }

    router.push("/create-profile");
  }

  // -----------------------------------
  // LOADING
  // -----------------------------------
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
        <h2 className="text-3xl font-semibold">Membership Payment</h2>
        <p className="text-gray-400 max-w-xl">
          Complete your Teez Golf membership payment before creating your player profile.
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

        {/* EFT INFO */}
        <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-4 space-y-3 text-sm">
          <p className="text-green-400 font-semibold">EFT Payment</p>

          <div>
            <p className="text-gray-400">Account Name</p>
            <p className="font-semibold">Honey Badger Technologies PTY LTD</p>
          </div>

          <div>
            <p className="text-gray-400">Amount</p>
            <p className="font-semibold">R189.99</p>
          </div>

          <div>
            <p className="text-gray-400">Reference</p>
            <p className="font-semibold break-all">
              TEEZZ-{user?.uid || "USER"}
            </p>
          </div>

          <p className="text-xs text-gray-400">
            Use the reference exactly when making payment. EFT verification will be handled manually.
          </p>
        </div>

        {/* LEGAL BLOCK */}
        <div className="text-xs text-gray-400 space-y-2 text-left">
          <p>
            Payments are made to{" "}
            <strong>Honey Badger Technologies (PTY) LTD</strong>.
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

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>I agree to the Terms & Conditions</span>
          </label>
        </div>

        {/* CONTINUE */}
        <button
          onClick={continueToProfile}
          disabled={!accepted}
          className={`px-8 py-3 rounded-lg font-semibold ${
            accepted
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          Continue to Create Profile
        </button>
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