"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db, functions } from "@/src/lib/firebase";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";

// ✅ FIXED TOKEN PACKS WITH MARGIN
const TOKEN_PACKS = [
  {
    tokens: 100,
    price: 109,
    label: "100 Tokens – R109",
  },
  {
    tokens: 500,
    price: 525,
    label: "500 Tokens – R525",
  },
  {
    tokens: 1000,
    price: 1020,
    label: "1000 Tokens – R1020",
  },
];

export default function WalletPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [selected, setSelected] = useState<number | null>(null);
  const [available, setAvailable] = useState(0);
  const [profile, setProfile] = useState<any>(null);

  // -------------------------------
  // LOAD WALLET
  // -------------------------------
  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "wallets", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();

        const purchased = data.purchasedTokens || 0;
        const winning = data.winningTokens || 0;
        const locked = data.lockedTokens || 0;

        setAvailable(purchased + winning - locked);
      }
    });

    return () => unsub();
  }, [user]);

  // -------------------------------
  // LOAD PROFILE
  // -------------------------------
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

  // -------------------------------
  // PAYFAST CHECKOUT
  // -------------------------------
  async function checkout() {
    if (!user || !profile) {
      alert("Profile not loaded");
      return;
    }

    if (selected === null) return;

    const pack = TOKEN_PACKS[selected];
    const tokens = pack.tokens;
    const amount = pack.price;

    const res = await fetch("/api/payfast-initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        item_name: `${tokens} Tokens`,

        name_first: profile.name || "",
        name_last: profile.surname || "",
        email_address: user.email,

        uid: user.uid,
        type: "tokens",
        tokens,
      }),
    });

    const response = await res.json();

    if (!response.url || !response.data) {
      alert("PayFast error");
      return;
    }

    // -----------------------------------
    // CREATE FORM (POST TO PAYFAST)
    // -----------------------------------
    const form = document.createElement("form");
    form.method = "POST";
    form.action = response.url;

    Object.entries(response.data).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  // -------------------------------
  // REDEEM TOKENS
  // -------------------------------
  async function redeem() {
    try {
      const fn = httpsCallable(functions, "createRedemptionRequest");

      await fn({
        amount: 20,
        type: "voucher",
        provider: "temu",
      });

      alert("Redemption request submitted");
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Error");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10">

      <h1 className="text-4xl font-bold tracking-wide">
        Wallet
      </h1>

      <div className="animate-spin-slow text-6xl">
        🪙
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm">Token Balance</p>

        <p className="text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_#00ff88]">
          {available}
        </p>

        <p className="text-gray-400">Tokens</p>
      </div>

      <div className="bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-8 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.15)] flex flex-col gap-5 border border-zinc-600">

        <select
          className="px-4 py-3 rounded bg-zinc-200 text-black font-semibold shadow-inner"
          value={selected ?? ""}
          onChange={(e) => setSelected(e.target.value === "" ? null : Number(e.target.value))}
        >
          <option value="">
            Select Tokens
          </option>

          {TOKEN_PACKS.map((pack, i) => (
            <option key={i} value={i}>
              {pack.label}
            </option>
          ))}
        </select>

        <button
          onClick={checkout}
          disabled={selected === null}
          className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_12px_#00ff88] disabled:bg-gray-600"
        >
          Buy Tokens (PayFast)
        </button>

        <button
          onClick={() => router.push("/wallet/redeem")}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_12px_#ffaa00]"
        >
          Redeem Tokens
        </button>

      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="text-gray-400 hover:text-white text-sm underline mt-4"
      >
        ← Back to Dashboard
      </button>

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