"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import { formatWalletRand } from "@/src/lib/walletMoney";
import WalletWinNotice from "@/src/components/WalletWinNotice";
import { readWinNotice, type WinNotice } from "@/src/lib/winNotice";

export default function WalletPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [lifetimeSpent, setLifetimeSpent] = useState(0);
  const [winNotice, setWinNotice] = useState<WinNotice | null>(null);


  useEffect(() => {
    if (!user) return;


    const ref = doc(db, "wallets", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      setBalance(Number(data.balance || 0));
      setLifetimeSpent(Number(data.lifetimeSpent || 0));
      setWinNotice(readWinNotice(data.lastWinNotice));
     
    });

    return () => {
      unsub();
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
            Rand in your ABC Bookmakers wallet is used for the bet on a TEEZ Golf
            Challenge.
          </p>
        </div>

        <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(0,255,136,0.15)]">
                <p className="text-sm text-gray-400 uppercase tracking-widest">
            Wallet balance
          </p>

         <p className="text-5xl font-bold text-green-400 mt-3 drop-shadow-[0_0_12px_#00ff88]">
  {formatWalletRand(balance)}
</p>
        <WalletWinNotice notice={winNotice} />

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
  player. When a challenge is finalised, 90% of the players&apos; stakes
  is paid in rand to the winner&apos;s wallet. ABC Bookmakers keeps 10%
  as the platform fee. The balance does not expire.
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
