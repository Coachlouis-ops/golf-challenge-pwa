"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<any>(null);

  // -----------------------------------
  // LOAD PROFILE (FOR PAYFAST)
  // -----------------------------------
  useEffect(() => {
    if (!user) return;

    (async () => {
      const ref = doc(db, "profiles", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    })();
  }, [user]);

  // -----------------------------------
  // STRIPE (DISABLED UI ONLY)
  // -----------------------------------
  async function startStripe() {
    alert("Stripe (International) coming soon");
  }

  // -----------------------------------
  // PAYFAST (ACTIVE)
  // -----------------------------------
  async function startPayFast() {
    if (!user || !profile) {
      alert("User profile not loaded");
      return;
    }

    const res = await fetch("/api/payfast-initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  amount: 10.99,
  item_name: "Teez Golf Membership",

  name_first: profile.name || "",
  name_last: profile.surname || "",
  email_address: user.email,

  uid: user.uid,
  type: "membership",
  tokens: 0,
}),
    });

    const data = await res.json();

    if (!data.url) {
      alert("PayFast error");
      return;
    }

    window.location.href = data.url;
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
        <h1 className="text-5xl font-bold text-green-400 drop-shadow-lg">
          WELCOME
        </h1>

        <h2 className="text-3xl font-semibold">
          Start Your Journey
        </h2>

        <p className="text-gray-400 max-w-xl">
          Enter the world of competitive golf challenges.
          Compete against players worldwide and climb the rankings.
        </p>
      </div>

      {/* TOKEN ICON */}
      <div className="text-7xl animate-spin">
        🪙
      </div>

      {/* MEMBERSHIP CARD */}
      <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-md">

        <h3 className="text-xl font-bold text-green-400">
          Teez Golf Membership
        </h3>

        <p className="text-4xl font-bold">
          $10.99
          <span className="text-sm text-gray-400"> / year</span>
        </p>

        <div className="text-sm text-gray-300 flex flex-col gap-2">
          <p>• Enter competitive golf challenges</p>
          <p>• Compete against players worldwide</p>
          <p>• Earn tokens and climb the rankings</p>
          <p>• Access global leaderboards</p>
        </div>

        {/* PAYFAST BUTTON */}
        <button
          onClick={startPayFast}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-lg"
        >
          Pay with PayFast (South African Users)
        </button>

        {/* STRIPE (DISABLED) */}
        <button
          onClick={startStripe}
          className="bg-gray-500 text-black font-semibold px-8 py-3 rounded-lg cursor-not-allowed"
        >
          Pay with Stripe (International - Coming Soon)
        </button>

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="text-sm text-gray-400 underline hover:text-white"
      >
        Back to Dashboard
      </button>

    </div>
  );
}