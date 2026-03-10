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
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-semibold">Activate Membership</h1>

        <p>Subscribe to access Teez Golf Challenges.</p>

        <button
          onClick={startPayment}
          className="bg-white text-black px-6 py-3 rounded"
        >
          Start Subscription
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm underline"
        >
          Back
        </button>
      </div>
    </div>
  );
}