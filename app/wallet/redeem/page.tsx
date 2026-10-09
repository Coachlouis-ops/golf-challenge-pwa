"use client";

import { useRouter } from "next/navigation";

export default function RedeemPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md border border-cyan-400/30 bg-[#071017] p-8 text-center">
        <h1 className="text-2xl font-black text-cyan-300">
          TEEZ Rewards
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-300">
          TEEZ Dollars are fictional career winnings used to
          track your achievements in TEEZ Golf Challenges.
          They have no cash value and cannot be redeemed
          for money, vouchers, products or services.
        </p>

        <button
          type="button"
          onClick={() => router.push("/wallet")}
          className="mt-8 w-full bg-cyan-400 px-6 py-4 font-black text-black"
        >
          BACK TO MY TEEZ WALLET
        </button>
      </div>
    </main>
  );
}