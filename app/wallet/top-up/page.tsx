"use client";

import { useRouter } from "next/navigation";

export default function TokenTopUpPage() {
  const router = useRouter();

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

        <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center space-y-5">
          <p className="text-green-400 font-semibold">
            Token Top-Ups
          </p>

          <p className="text-gray-300 text-sm">
            Secure Peach Payments token packages will be available here.
          </p>

          <p className="text-gray-500 text-xs">
            Tokens remain in your wallet until used and are not subject to a
            monthly expiry.
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