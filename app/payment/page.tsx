"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const loading = false;


  const [selectedProduct, setSelectedProduct] = useState("membership");
  const [competitionAmount, setCompetitionAmount] = useState(50);


  const [accepted, setAccepted] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(true);
// -----------------------------------
// PUBLIC PAYMENT PAGE
// -----------------------------------
useEffect(() => {

  setCheckingVerification(false);

}, []);
  // -----------------------------------
  // STRIPE (DISABLED)
  // -----------------------------------
  async function startStripe() {
    alert("Stripe (International) coming soon");
  }

  // -----------------------------------
  // PAYFAST
  // -----------------------------------
  async function startPayFast() {

    // -----------------------------------
    // TERMS
    // -----------------------------------
    if (!accepted) {
      alert("You must accept the Terms & Conditions");
      return;
    }

    // -----------------------------------
    // USER CHECK
    // -----------------------------------


    // -----------------------------------
    // PHONE VERIFICATION CHECK
    // -----------------------------------
    

const res = await fetch("/api/payfast-initiate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount:
      selectedProduct === "membership"
        ? 189.99
        : competitionAmount,

    item_name:
      selectedProduct === "membership"
        ? "Teez Golf Membership"
        : `Competition Entry Fee R${competitionAmount}`,

    name_first: "Guest",
    name_last: "User",
    email_address: "guest@teezgolf.com",

    uid: `guest_${Date.now()}`,

    type:
      selectedProduct === "membership"
        ? "membership"
        : "competition",

    tokens: 0,
  }),
});

    const response = await res.json();

    if (!response.url || !response.data) {
      alert("PayFast error");
      return;
    }

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

  // -----------------------------------
  // LOADING
  // -----------------------------------
 if (checkingVerification) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}

console.log("CHECKING:", checkingVerification);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6">

      {/* HERO */}
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl font-bold text-green-400">
          WELCOME
        </h1>

        <h2 className="text-3xl font-semibold">
          Start Your Journey
        </h2>

        <p className="text-gray-400 max-w-xl">
          Enter the world of competitive golf challenges.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-md">

       <h3 className="text-xl font-bold text-green-400">
  Payment Checkout
</h3>

<p className="text-lg text-gray-300">
  Select the item you would like to pay for.
</p>



<div className="space-y-4">

  <button
    onClick={() => setSelectedProduct("membership")}
    className={`w-full p-4 rounded-lg border ${
      selectedProduct === "membership"
        ? "border-green-400 bg-green-400 text-black"
        : "border-gray-500"
    }`}
  >
    Membership Registration - R189.99
  </button>

  <button
    onClick={() => setSelectedProduct("competition")}
    className={`w-full p-4 rounded-lg border ${
      selectedProduct === "competition"
        ? "border-green-400 bg-green-400 text-black"
        : "border-gray-500"
    }`}
  >
    Competition Entry Fee
  </button>

  {selectedProduct === "competition" && (
    <select
      value={competitionAmount}
      onChange={(e) =>
        setCompetitionAmount(Number(e.target.value))
      }
      className="w-full bg-black border border-gray-500 p-3 rounded"
    >
      <option value={50}>R50</option>
      <option value={100}>R100</option>
      <option value={250}>R250</option>
      <option value={500}>R500</option>
      <option value={750}>R750</option>
      <option value={1000}>R1000</option>
      <option value={1500}>R1500</option>
      <option value={2000}>R2000</option>
    </select>
  )}

</div>

        {/* LEGAL BLOCK */}
        <div className="text-xs text-gray-400 space-y-2 text-left">

          <p>
            Payments are processed by <strong>Honey Badger Technologies (PTY) LTD</strong> via PayFast.
          </p>

          <p>
            By proceeding, you agree to the{" "}
            <span
              onClick={() => router.push("/legal/terms")}
              className="underline cursor-pointer text-green-400"
            >
              Terms & Conditions
            </span>.
          </p>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>I agree to the Terms & Conditions</span>
          </label>

        </div>

        {/* PAYFAST */}
        <button
          onClick={startPayFast}
          disabled={!accepted}
          className={`px-8 py-3 rounded-lg font-semibold ${
            accepted
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          Pay with PayFast
        </button>

        {/* STRIPE */}
        <button
          onClick={startStripe}
          className="bg-gray-500 text-black font-semibold px-8 py-3 rounded-lg cursor-not-allowed"
        >
          Pay with Stripe (Coming Soon)
        </button>

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/")}
        className="text-sm text-gray-400 underline"
      >
        Back to Dashboard
      </button>

    </div>
  );
}