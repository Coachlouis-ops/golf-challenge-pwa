"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

 async function startPayment() {

  console.log("Payment button clicked");

  if (!user) {
    console.error("No user loaded");
    return;
  }

  try {

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

    console.log("Stripe response status:", res.status);

    const data = await res.json();

console.log("Stripe response data:", data);

if (data.error) {
  console.error("Stripe backend error:", data.error);
  return;
}

if (data.url) {
  window.location.href = data.url;
} else {
  console.error("Stripe URL missing");
}

  } catch (err) {
    console.error("Stripe checkout error:", err);
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

        <button
          onClick={startPayment}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-8 py-3 rounded-lg"
        >
          Start Your Journey
        </button>

      </div>

   {/* BACK TO DASHBOARD */}
<button
  onClick={() => router.push("/dashboard")}
  className="text-sm text-gray-400 underline hover:text-white"
>
  Back to Dashboard
</button>

    </div>
  );
}