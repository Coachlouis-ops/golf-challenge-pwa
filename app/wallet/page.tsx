"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";

export default function WalletPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [balance, setBalance] = useState(0);
  const [lifetimeWon, setLifetimeWon] = useState(0);
  const [lifetimeSpent, setLifetimeSpent] = useState(0);
  const [subscriptionTokensIssued, setSubscriptionTokensIssued] = useState(0);
  const [topUpTokensPurchased, setTopUpTokensPurchased] = useState(0);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "wallets", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      setBalance(data.balance || 0);
      setLifetimeWon(data.lifetimeWon || 0);
      setLifetimeSpent(data.lifetimeSpent || 0);
      setSubscriptionTokensIssued(data.subscriptionTokensIssued || 0);
      setTopUpTokensPurchased(data.topUpTokensPurchased || 0);
    });

    return () => unsub();
  }, [user]);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-green-400">
            Token Wallet
          </h1>

          <p className="text-gray-400 text-sm">
            Teez tokens are digital play credits used only for challenges.
          </p>
        </div>

        <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(0,255,136,0.15)]">
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            Current Balance
          </p>

          <p className="text-6xl font-bold text-green-400 mt-3 drop-shadow-[0_0_12px_#00ff88]">
            {balance}
          </p>

          <p className="text-gray-400 mt-2">
            Available Teez Tokens
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">
              Lifetime Won
            </p>

            <p className="text-2xl font-bold text-green-400 mt-2">
              {lifetimeWon}
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">
              Lifetime Spent
            </p>

            <p className="text-2xl font-bold text-white mt-2">
              {lifetimeSpent}
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">
              Subscription Tokens
            </p>

            <p className="text-2xl font-bold text-white mt-2">
              {subscriptionTokensIssued}
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">
              Top-Up Tokens
            </p>

            <p className="text-2xl font-bold text-white mt-2">
              {topUpTokensPurchased}
            </p>
          </div>
        </div>

        <div className="bg-black/40 border border-neutral-700 rounded-xl p-5 text-sm text-gray-400 space-y-3">
          <p className="text-green-400 font-semibold">
            Token Rules
          </p>

          <p>
            Tokens are used to enter and compete in Teez Golf Challenges.
          </p>

          <p>
            Tokens have no cash value and cannot be withdrawn, redeemed,
            transferred for cash, or converted into real-world value.
          </p>
        </div>

        <button
          onClick={() => router.push("/challenges/create")}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl"
        >
          PLAY MATCH
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full text-gray-400 hover:text-white text-sm underline"
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
}