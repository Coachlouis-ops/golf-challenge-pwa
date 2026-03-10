"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

const TOKEN_PACKS = [
  { tokens: 1, priceId: "price_1T964DCpIvzmJJByQ7HgCd2o" },
  { tokens: 2, priceId: "price_1T964DCplvzmJJBy51o17VLO" },
  { tokens: 3, priceId: "price_1T9675CplvzmJJByfja065o9" },
  { tokens: 4, priceId: "price_1T967TCplvzmJJByOlpPfhg7" },
  { tokens: 5, priceId: "price_1T964DCplvzmJJBy9OGtL9pT" },
  { tokens: 10, priceId: "price_1T964DCplvzmJJByB9QKG3Ao" },
  { tokens: 15, priceId: "price_1T965yCplvzmJJByXJQ3uXUO" },
  { tokens: 20, priceId: "price_1T966gCplvzmJJBy7Ny1wjso" },
  { tokens: 25, priceId: "price_1T967yCplvzmJJByN1GuKG0j" },
  { tokens: 40, priceId: "price_1T968ZCplvzmJJByDDYam7iR" },
  { tokens: 50, priceId: "price_1T9695CplvzmJJByqDhhamoo" },
  { tokens: 75, priceId: "price_1T969TCplvzmJJByMhQTiajD" },
  { tokens: 100, priceId: "price_1T969uCplvzmJJBy6znELwaV" },
  { tokens: 150, priceId: "price_1T96AaCplvzmJJByqi7gIdHt" },
  { tokens: 200, priceId: "price_1T96AtCplvzmJJByagaEcW0o" },
  { tokens: 250, priceId: "price_1T96BGCplvzmJJByUhCFSPG9" },
  { tokens: 350, priceId: "price_1T96BcCplvzmJJBy7mx9UVBt" },
  { tokens: 500, priceId: "price_1T96CFCpIvzmJJByyUatXDDZ" },
  { tokens: 750, priceId: "price_1T96CdCpIvzmJJBy1kEhBwv" },
  { tokens: 1000, priceId: "price_1T96D8CpIvzmJJBy4c99aP7j" },
];

export default function WalletPage() {
  const { user } = useAuth();

  const [selected, setSelected] = useState("price_1T9JktCplvzmJJByFE9l8n77");
  const [balance, setBalance] = useState(0);

  /* ===============================
     LOAD WALLET BALANCE
  =============================== */

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "wallets", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setBalance(data.balance || 0);
      }
    });

    return () => unsub();
  }, [user]);

  /* ===============================
     STRIPE CHECKOUT
  =============================== */

  async function checkout() {
    if (selected === "price_1T9JktCplvzmJJByFE9l8n77") return;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: user?.uid,
        email: user?.email,
        priceId: selected,
        mode: "payment",
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

return (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10">

    {/* TITLE */}
    <h1 className="text-4xl font-bold tracking-wide">
      Wallet
    </h1>

    {/* SPINNING TOKEN */}
    <div className="animate-spin-slow text-6xl">
      🪙
    </div>

    {/* BALANCE DISPLAY */}
    <div className="text-center">

      <p className="text-gray-400 text-sm">
        Token Balance
      </p>

      <p className="text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_#00ff88]">
        {balance}
      </p>

      <p className="text-gray-400">
        Tokens
      </p>

    </div>

    {/* BUY TOKENS CARD */}
    <div className="bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900
    p-8 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.15)]
    flex flex-col gap-5 border border-zinc-600">

      <select
        className="px-4 py-3 rounded bg-zinc-200 text-black font-semibold shadow-inner"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="price_1T9JktCplvzmJJByFE9l8n77">
          Select Tokens
        </option>

        {TOKEN_PACKS.map((pack) => (
          <option key={pack.priceId} value={pack.priceId}>
            {pack.tokens} Tokens
          </option>
        ))}
      </select>

      <button
        onClick={checkout}
        disabled={selected === "price_1T9JktCplvzmJJByFE9l8n77"}
        className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_12px_#00ff88] disabled:bg-gray-600"
      >
        Buy Tokens
      </button>

    </div>

    {/* CSS ANIMATION */}
    <style jsx>{`
      .animate-spin-slow {
        animation: spin 8s linear infinite;
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