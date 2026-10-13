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



const [subscriptionExpires, setSubscriptionExpires] =
  useState<Date | null>(null);

const [currentTime, setCurrentTime] =
  useState(() => Date.now());

useEffect(() => {
  const timer = window.setInterval(() => {
    setCurrentTime(Date.now());
  }, 60_000);

  return () => window.clearInterval(timer);
}, []);

const millisecondsRemaining = subscriptionExpires
  ? Math.max(0, subscriptionExpires.getTime() - currentTime)
  : 0;

const daysRemaining = Math.ceil(
  millisecondsRemaining / (1000 * 60 * 60 * 24)
);

const participationActive =
  subscriptionExpires !== null &&
  millisecondsRemaining > 0;





  const [teezDollars, setTeezDollars] = useState(0);
  const [eventsTokens, setEventsTokens] = useState(0);
  const [lifetimeSpent, setLifetimeSpent] = useState(0);
  const [subscriptionTokensIssued, setSubscriptionTokensIssued] = useState(0);


  useEffect(() => {
    if (!user) return;


const userRef = doc(db, "users", user.uid);

const unsubUser = onSnapshot(userRef, (snap) => {
  if (!snap.exists()) {
    setSubscriptionExpires(null);
    return;
  }

  const expiry = snap.data().subscriptionExpires;

  if (expiry && typeof expiry.toDate === "function") {
    setSubscriptionExpires(expiry.toDate());
  } else {
    setSubscriptionExpires(null);
  }
});



    const ref = doc(db, "wallets", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      setBalance(data.balance || 0);
      setLifetimeSpent(data.lifetimeSpent || 0);
      setSubscriptionTokensIssued(data.subscriptionTokensIssued || 0);
     
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
  unsubUser();
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
            My TEEZ Wallet
          </h1>

          <p className="text-gray-400 text-sm">
            Track your Play Tokens, TEEZ Dollars
            and Events Tokens in one place.
          </p>
        </div>

        <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(0,255,136,0.15)]">
                <p className="text-sm text-gray-400 uppercase tracking-widest">
            Play Tokens Balance
          </p>

         <p className="text-6xl font-bold text-green-400 mt-3 drop-shadow-[0_0_12px_#00ff88]">
  {participationActive ? balance : 0}
</p>

        <p className="text-gray-400 mt-2">
  {participationActive
    ? "Available Play Tokens for entering challenges"
    : "Play Tokens unavailable — participation expired"}
</p>
        </div>


{/* PARTICIPATION EXPIRY COUNTDOWN */}
<div className="bg-neutral-900 border border-cyan-400 rounded-2xl p-6 text-center space-y-3">
  <p className="text-sm font-bold text-cyan-300 uppercase tracking-widest">
    Participation Status
  </p>

  {participationActive ? (
    <>
      <p className="text-green-400 text-xl font-bold">
        ACTIVE
      </p>

      <p className="text-4xl font-extrabold text-white">
        {daysRemaining}
        <span className="text-lg text-gray-400 ml-2">
          {daysRemaining === 1 ? "Day" : "Days"} Remaining
        </span>
      </p>

      <p className="text-sm text-gray-400">
        Expires:{" "}
        {subscriptionExpires?.toLocaleDateString("en-ZA", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </>
  ) : (
    <>
      <p className="text-red-400 text-xl font-bold">
        EXPIRED / INACTIVE
      </p>

      <p className="text-sm text-gray-400">
        Renew your R69 participation to receive
        200 Play Tokens for another 30 days.
      </p>
    </>
  )}
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

        <div className="grid grid-cols-2 gap-4">
       
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-400">
              Lifetime Spent
            </p>

           <p className="text-2xl font-bold text-white mt-2">
  {lifetimeSpent.toLocaleString("en-US")}
</p>

<p className="text-xs text-gray-500 mt-2">
  Total Play Tokens used across all participation periods
</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-5 text-center">
                      <p className="text-xs text-gray-400">
              Participation Tokens
            </p>

            <p className="text-2xl font-bold text-white mt-2">
              {subscriptionTokensIssued}
            </p>
          </div>

        
        </div>

               <div className="bg-black/40 border border-neutral-700 rounded-xl p-5 text-sm text-gray-400 space-y-3">
          <p className="text-green-400 font-semibold">
            TEEZ Wallet Rules
          </p>

          <p>
  <strong className="text-green-400">Play Tokens:</strong>{" "}
  Each R69 participation payment provides 200 Play Tokens
  valid for 30 days. Tokens are used to enter TEEZ Golf
  Challenges and have no cash value.
  Unused tokens expire at the end of the 30-day period
  and do not carry over. Renewing participation resets
  the Play Token balance to 200.
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
            They are not Play Tokens or TEEZ Dollars and cannot
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
