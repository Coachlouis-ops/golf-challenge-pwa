"use client";

import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";

const CATEGORIES = ["GOLF", "SHOPPING", "FOOD", "GROCERY"];

const BENEFICIARY = ["ME", "FAMILY", "FRIEND", "CHARITY"];

const SUPPLIERS_BY_CATEGORY: Record<string, string[]> = {
  GOLF: [
    "The Pro Shop",
    "PGA TOUR Superstore",
    "GlobalGolf",
    "American Golf",
    "Decathlon",
    "Drummond Golf",
  ],
  SHOPPING: ["Takealot", "Shein", "Temu", "Amazon", "Walmart"],
  FOOD: [
    "Uber Eats",
    "Mr D Food",
    "DoorDash",
    "Just Eat",
    "Deliveroo",
    "GrabFood",
    "Foodpanda",
    "Talabat",
  ],
  GROCERY: ["Makro", "Woolworths", "Costco", "Tesco", "Carrefour", "Coles"],
};

export default function RedeemPage() {
  const [category, setCategory] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");

  async function submit() {
    try {
      if (!category || !beneficiary || !supplier || !amount) {
        alert("Complete all fields");
        return;
      }

      const fn = httpsCallable(functions, "createRedemptionRequest");

      await fn({
        amount: Number(amount),
        type: "voucher",
        provider: supplier,
        category,
        beneficiary,
      });

      alert("Voucher request submitted");

      // reset
      setCategory("");
      setBeneficiary("");
      setSupplier("");
      setAmount("");

    } catch (err: any) {
      alert(err?.message || "Error");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6">

      <h1 className="text-3xl font-bold">Build Your Voucher</h1>

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSupplier("");
        }}
        className="px-4 py-3 rounded w-72 bg-cyan-200 text-black font-semibold shadow-[0_0_10px_#00f0ff]"
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* BENEFICIARY */}
      <select
        value={beneficiary}
        onChange={(e) => setBeneficiary(e.target.value)}
        className="px-4 py-3 rounded w-72 bg-cyan-200 text-black font-semibold shadow-[0_0_10px_#00f0ff]"
      >
        <option value="">Select Beneficiary</option>
        {BENEFICIARY.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount (tokens)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-3 rounded w-72 bg-cyan-200 text-black font-semibold shadow-[0_0_10px_#00f0ff]"
      />

      {/* SUPPLIER */}
      {category && (
        <select
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="px-4 py-3 rounded w-72 bg-cyan-200 text-black font-semibold shadow-[0_0_10px_#00f0ff]"
        >
          <option value="">Select Supplier</option>
          {SUPPLIERS_BY_CATEGORY[category].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      )}

      {/* SUBMIT */}
      <button
        onClick={submit}
        className="bg-cyan-400 text-black px-6 py-3 rounded font-bold shadow-[0_0_15px_#00f0ff]"
      >
        Submit Redemption
      </button>

    </div>
  );
}