"use client";

import { useAuth } from "@/src/lib/AuthContext";

const TOKENS = [
  { tokens: 10, priceId: "price_1T964DCplvzmJJByB9QKG3Ao" },
  { tokens: 25, priceId: "price_1T967yCplvzmJJByN1GuKG0j" },
  { tokens: 50, priceId: "price_1T9695CplvzmJJByqDhhamoo" },
  { tokens: 100, priceId: "price_1T969uCplvzmJJBy6znELwaV" },
];

export default function WalletPage() {
  const { user } = useAuth();

  async function buy(priceId: string) {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user?.uid,
        email: user?.email,
        priceId,
        mode: "payment",
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-2xl font-bold">Buy Entry Credits</h1>

      {TOKENS.map((p) => (
        <button
          key={p.tokens}
          onClick={() => buy(p.priceId)}
          className="px-6 py-3 bg-white text-black rounded-lg"
        >
          Buy {p.tokens} Tokens
        </button>
      ))}
    </div>
  );
}