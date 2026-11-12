"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import { formatWalletRand } from "@/src/lib/walletMoney";

export default function WalletPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [teezDollars, setTeezDollars] = useState(0);
  const [eventsTokens, setEventsTokens] = useState(0);
  const [lifetimeSpent, setLifetimeSpent] = useState(0);


  useEffect(() => {
    if (!user) return;


    const ref = doc(db, "wallets", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      setBalance(Number(data.balance || 0));
      setLifetimeSpent(Number(data.lifetimeSpent || 0));
     
    });

      const profileRef = doc(db, "profiles", user.uid);

    const unsubProfile = onSnapshot(profileRef, (snap) => {
      if (!snap.exists()) {
        setTeezDollars(0);
        return;
      }

      const data = snap.data();
      setTeezDollars(Number(data.teezDollars ?? 0));
    });

    const rankingRef = doc(db, "playerRankings", user.uid);

    const unsubRanking = onSnapshot(rankingRef, (snap) => {
      if (!snap.exists()) {
        setEventsTokens(0);
        return;
      }

      const data = snap.data();
      setEventsTokens(Number(data.eventsTokens ?? 0));
    });

    return () => {
  unsub();
  unsubProfile();
  unsubRanking();
};
  }, [user]);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
                  <h1 className="text-4xl font-bold text-green-400">
            My wallet
          </h1>

          <p className="text-gray-400 text-sm">
            Rand in your ABC Bookmakers wallet is used to enter a TEEZ Golf
            Challenge. TEEZ Dollars and Events Tokens are separate.
          </p>
        </div>

        <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(0,255,136,0.15)]">
                <p className="text-sm text-gray-400 uppercase tracking-widest">
            Wallet balance
          </p>

         <p className="text-5xl font-bold text-green-400 mt-3 drop-shadow-[0_0_12px_#00ff88]">
  {formatWalletRand(balance)}
</p>

        <p className="text-gray-400 mt-2">
  Available for the bet on a TEEZ Golf Challenge
</p>

        <button
          type="button"
          onClick={() => router.push("/payment")}
          className="mt-6 w-full rounded-xl bg-green-400 py-4 text-lg font-black text-black"
        >
          Add money
        </button>
        </div>


              {/* TEEZ DOLLARS & EVENTS TOKENS */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-neutral-900 border border-cyan-400 rounded-xl p-5 text-center shadow-[0_0_20px_rgba(0,255,255,0.12)]">
            <p className="text-xs text-cyan-300 uppercase tracking-wider">
              TEEZ Dollars
            </p>

            <p className="text-2xl font-bold text-cyan-400 mt-3">
              ${teezDollars.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Fictional career winnings
            </p>
          </div>

          <div className="bg-neutral-900 border border-purple-400 rounded-xl p-5 text-center shadow-[0_0_20px_rgba(168,85,247,0.12)]">
            <p className="text-xs text-purple-300 uppercase tracking-wider">
              Events Tokens
            </p>

            <p className="text-2xl font-bold text-purple-400 mt-3">
              {eventsTokens.toLocaleString("en-US")}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Events allocation balance
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4">
       
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">
              Lifetime Spent
            </p>

           <p className="text-2xl font-bold text-white mt-2">
  {formatWalletRand(lifetimeSpent)}
</p>

<p className="text-xs text-gray-500 mt-2">
  Recorded spend from this wallet
</p>
          </div>

        
        </div>

               <div className="bg-black/40 border border-neutral-700 rounded-xl p-5 text-sm text-gray-400 space-y-3">
          <p className="text-green-400 font-semibold">
            Wallet rules
          </p>

          <p>
  <strong className="text-green-400">Rand balance:</strong>{" "}
  Deposits of R25, R50, R75, R100, R150, R200 or R250 are added
  to this wallet after Peach Payments confirms them. A match can
  be created or joined only when the balance covers the bet per
  player. The balance does not expire.
</p>

          <p>
            <strong className="text-cyan-400">TEEZ Dollars:</strong>{" "}
            Fictional career rewards earned through challenge winnings
            and achievements. They have no monetary value and cannot
            be spent, withdrawn, redeemed, or transferred.
          </p>

          <p>
            <strong className="text-purple-400">Events Tokens:</strong>{" "}
            Separate tokens allocated through the TEEZ Events system.
            They are not wallet rand or TEEZ Dollars and cannot
            be withdrawn or exchanged for cash.
          </p>
        </div>


        <button
          onClick={() => router.push("/challenges/create")}
          className="w-full bg-neutral-800 hover:bg-neutral-700 border border-green-500 text-green-400 font-semibold py-4 rounded-xl"
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
