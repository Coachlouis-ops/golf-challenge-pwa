"use client";

import { useState } from "react";
import { useAuth } from "@/src/lib/AuthContext";

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
  const [selected, setSelected] = useState(TOKEN_PACKS[0].priceId);

  async function checkout() {
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-white">
      <h1 className="text-2xl font-bold">Buy Entry Credits</h1>

      <select
        className="px-4 py-2 text-black rounded"
        onChange={(e) => setSelected(e.target.value)}
      >
        {TOKEN_PACKS.map((pack) => (
          <option key={pack.priceId} value={pack.priceId}>
            {pack.tokens} Tokens
          </option>
        ))}
      </select>

      <button
        onClick={checkout}
        className="px-6 py-3 bg-white text-black rounded-lg"
      >
        Checkout
      </button>
    </div>
  );
}