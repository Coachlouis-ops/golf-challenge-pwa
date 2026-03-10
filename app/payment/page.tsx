"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  async function startPayment() {
    if (!user) return;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        priceId: "price_1T8a8PCplvzmJJBy8krfB9Gq",
        mode: "subscription",
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-12 px-6">

      {/* HERO */}
      <div className="text-center flex flex-col gap-3">

        <h1 className="text-5xl font-bold tracking-wide text-green-400 drop-shadow-[0_0_25px_#00ff88] animate-pulse">
          WELCOME
        </h1>

        <h2 className="text-3xl font-semibold">
          Start Your Journey
        </h2>

        <p className="text-gray-400 max-w-xl">
          Enter the world of competitive golf challenges.
          Compete against players worldwide, climb the rankings,
          and prove your skill on the leaderboard.
        </p>

      </div>

      {/* SPINNING TOKEN */}
      <div className="text-7xl animate-spin-slow drop-shadow-[0_0_25px_#00ff88]">
        🪙
      </div>

      {/* MEMBERSHIP CARD */}
      <div className="bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-800
        border border-zinc-500
        p-8 rounded-xl
        shadow-[0_0_30px_rgba(0,255,136,0.25)]
        flex flex-col gap-6
        text-center
        max-w-md">

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
          <p>• Access the global leaderboard</p>

        </div>

        <button
          onClick={startPayment}
          className="bg-green-500 hover:bg-green-400
          text-black font-semibold
          px-8 py-3 rounded-lg
          shadow-[0_0_15px_rgba(0,255,136,0.7)]
          transition"
        >
          Start Your Journey
        </button>

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="text-sm text-gray-400 underline hover:text-white"
      >
        Back
      </button>

      {/* SPIN ANIMATION */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>

    </div>
  );
}