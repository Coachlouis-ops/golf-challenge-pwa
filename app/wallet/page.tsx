"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db, functions } from "@/src/lib/firebase";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";

const ENTRY_PACKS = [
  {
    tokens: 100,
    price: 109,
    label: "100 Entry Credits – R109",
  },
  {
    tokens: 500,
    price: 525,
    label: "500 Entry Credits – R525",
  },
  {
    tokens: 1000,
    price: 1020,
    label: "1000 Entry Credits – R1020",
  },
];

export default function WalletPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [selected, setSelected] = useState<number | null>(null);
  const [available, setAvailable] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [accepted, setAccepted] = useState(false);

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
  if (!user?.uid) return;

  const uid = user.uid;

  async function loadProfile() {
    try {
      const ref = doc(db, "profiles", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data());
      }
    } catch (err) {
      console.log("LOAD PROFILE ERROR:", err);
    }
  }

  loadProfile();
}, [user]);

  // -------------------------------
  // PAYGENIUS CHECKOUT PLACEHOLDER
  // -------------------------------
  async function checkout() {
    if (!accepted) {
      alert("You must accept the Terms & Conditions and Refund Policy");
      return;
    }

    if (!user) {
      alert("User not loaded");
      router.push("/login");
      return;
    }

    if (!profile) {
      alert("Profile not loaded");
      return;
    }

    if (selected === null) {
      alert("Select an entry fee package");
      return;
    }

    const pack = ENTRY_PACKS[selected];

    console.log("PAYGENIUS PAYMENT START:", {
      uid: user.uid,
      email: user.email,
      name: profile.name || "",
      surname: profile.surname || "",
      amount: pack.price,
      entryCredits: pack.tokens,
    });

    router.push("/dashboard");
  }

  // -------------------------------
  // REDEEM
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6 py-10">
      <h1 className="text-4xl font-bold tracking-wide text-center">
        Your Competition Dashboard
      </h1>

      <div className="animate-spin-slow text-6xl">🪙</div>

      <div className="text-center">
        <p className="text-gray-400 text-sm">Entry Fees Paid</p>

        <p className="text-5xl font-bold text-green-400 drop-shadow-[0_0_10px_#00ff88]">
          {available}
        </p>

        <p className="text-gray-400">Available Entry Credits</p>
      </div>

      <div className="w-full max-w-md bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-8 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.15)] flex flex-col gap-5 border border-zinc-600">
        <select
          className="px-4 py-3 rounded bg-zinc-200 text-black font-semibold shadow-inner"
          value={selected ?? ""}
          onChange={(e) =>
            setSelected(e.target.value === "" ? null : Number(e.target.value))
          }
        >
          <option value="">Select Entry Fee</option>

          {ENTRY_PACKS.map((pack, i) => (
            <option key={i} value={i}>
              {pack.label}
            </option>
          ))}
        </select>

        {/* LEGAL BLOCK */}
        <div className="text-xs text-gray-400 text-left space-y-2">
          <p>
            Payments are processed by{" "}
            <strong>Honey Badger Technologies (PTY) LTD</strong> through{" "}
            <strong>PayGenius Smart Payments</strong>.
          </p>

          <p>
            By proceeding, you agree to the{" "}
            <span
              onClick={() => router.push("/legal/terms")}
              className="underline cursor-pointer text-green-400"
            >
              Terms & Conditions
            </span>{" "}
            and the{" "}
            <span
              onClick={() => router.push("/legal/refund-policy")}
              className="underline cursor-pointer text-green-400"
            >
              Refund Policy
            </span>
            .
          </p>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />

            <span>
              I agree to the Terms & Conditions and Refund Policy.
            </span>
          </label>
        </div>

        {/* PAYMENT METHODS */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">
            Secure Payments via PayGenius
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center bg-black px-4 py-3 rounded-lg border border-zinc-700 w-full">
            <img
              src="/paygenius-logo.png"
              alt="PayGenius"
              className="h-8 object-contain opacity-90"
            />
          </div>
        </div>

        <button
          onClick={checkout}
          disabled={selected === null || !accepted}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selected !== null && accepted
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to PayGenius
        </button>

        <button
          onClick={() => router.push("/wallet/redeem")}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_12px_#ffaa00]"
        >
          Redeem Rewards
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