"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";

const CATEGORIES = [
  "CHARITY",
  "SHOPPING",
  "GROCERY",
  "FOOD",
  "GOLF",
  "DIGITAL",
];

const SUPPLIERS_BY_CATEGORY: Record<
  string,
  { name: string; url: string }[]
> = {
  CHARITY: [
    { name: "JK6", url: "https://www.jk6.co.za/" },
    { name: "Golfing for Teddies", url: "https://golfing4teddy.com/" },
  ],
  SHOPPING: [
    { name: "Temu", url: "https://www.temu.com" },
    { name: "Shein", url: "https://www.shein.com" },
    { name: "Takealot", url: "https://www.takealot.com" },
    { name: "Superbalist", url: "https://www.superbalist.com" },
  ],
  GROCERY: [
    { name: "Woolworths", url: "https://www.woolworths.co.za" },
    { name: "Checkers", url: "https://www.checkers.co.za" },
    { name: "Pick n Pay", url: "https://www.pnp.co.za" },
    { name: "Makro", url: "https://www.makro.co.za" },
  ],
  FOOD: [
    { name: "Uber Eats", url: "https://www.ubereats.com" },
    { name: "Mr D Food", url: "https://www.mrdfood.com" },
  ],
  GOLF: [
    { name: "The Pro Shop", url: "https://www.theproshop.co.za" },
    { name: "The Golfers Club", url: "https://www.thegolfersclub.co.za" },
    { name: "Your registered Local Club", url: "" },
    { name: "Honey Badger Apparel", url: "https://www.teezgolfchallenges.com" },
  ],
  DIGITAL: [
    { name: "MTN Airtime / Data", url: "https://www.mtn.co.za" },
    { name: "Vodacom Airtime / Data", url: "https://www.vodacom.co.za" },
    { name: "Cell C Airtime / Data", url: "https://www.cellc.co.za" },
    { name: "Telkom Airtime / Data", url: "https://www.telkom.co.za" },
    { name: "Electricity", url: "" },
  ],
};

export default function RedeemPage() {
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  async function submit() {
    try {
      if (!category || !supplier || !amount) {
        alert("Complete all fields");
        return;
      }

      const amountNum = Number(amount);
      const MIN_REDEEM = 5;

      if (amountNum < MIN_REDEEM) {
        alert(`Minimum redeem is ${MIN_REDEEM} tokens`);
        return;
      }

      const fn = httpsCallable(functions, "createRedemptionRequest");

      await fn({
        amount: amountNum,
        type: "voucher",
        provider: supplier,
        category,
      });

      alert("Voucher request submitted");

      setCategory("");
      setSupplier("");
      setAmount("");

      router.push("/dashboard");
    } catch (err: any) {
      alert(err?.message || "Error");
    }
  }

  const selectedSupplier = SUPPLIERS_BY_CATEGORY[category]?.find(
    (s) => s.name === supplier
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center gap-6 p-6">

      {/* BANNER */}
      <img
        src="/wallet.png"
        alt="wallet"
        className="w-full max-w-md rounded-xl shadow-[0_0_25px_#00f0ff]"
      />

      <h1 className="text-3xl font-bold text-center">
        Collect Your Prize
      </h1>

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSupplier("");
        }}
        className="px-4 py-3 rounded w-72 bg-blue-400 text-black font-bold shadow-[0_0_20px_#00aaff]"
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount (tokens)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-3 rounded w-72 bg-blue-400 text-black font-bold shadow-[0_0_20px_#00aaff]"
      />

      {/* SUPPLIER */}
      {category && (
        <>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="px-4 py-3 rounded w-72 bg-blue-400 text-black font-bold shadow-[0_0_20px_#00aaff]"
          >
            <option value="">Select Supplier</option>
            {SUPPLIERS_BY_CATEGORY[category].map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {supplier && selectedSupplier?.url && (
            <a
              href={selectedSupplier.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline"
            >
              Visit Website
            </a>
          )}
        </>
      )}

      <button
        onClick={submit}
        className="bg-blue-400 text-black px-6 py-3 rounded font-bold shadow-[0_0_25px_#00aaff]"
      >
        Submit Redemption
      </button>
    </div>
  );
}