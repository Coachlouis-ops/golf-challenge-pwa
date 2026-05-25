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
"CASH",
];

const SUPPLIERS_BY_CATEGORY: Record<
  string,
  { name: string; url: string }[]
> = {
  CHARITY: [
    { name: "JK6", url: "https://www.jk6.co.za/" },
    { name: "Golfing4Teddy", url: "https://golfing4teddy.com/" },
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
    { name: "Uber Eats", url: "https://www.ubereats.com/za" },
    { name: "Mr D Food", url: "https://www.mrdfood.com" },
  ],
  GOLF: [
    { name: "The Pro Shop", url: "https://www.theproshop.co.za" },
    { name: "The Golfers Club", url: "https://www.golfersclub.co.za" },
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
    CASH: [
    { name: "Cash Redemption", url: "" },
  ],
};

export default function RedeemPage() {
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amount, setAmount] = useState("");
  const [agreedStatusRules, setAgreedStatusRules] = useState(false);

const [agreedResponsibility, setAgreedResponsibility] = useState(false);

const [agreedTruth, setAgreedTruth] = useState(false);
  const router = useRouter();

  async function submit() {
    try {
     if (
  !agreedStatusRules ||
  !agreedResponsibility ||
  !agreedTruth
) {
  alert(
    "You must accept all redemption consent acknowledgements before continuing."
  );
  return;
}

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

{/* ================= CONSENT ================= */}

<div className="w-full max-w-3xl border border-cyan-400/30 bg-[#04111f]/90 rounded-3xl p-6 shadow-[0_0_40px_rgba(0,200,255,0.35)] flex flex-col gap-6 backdrop-blur-md">
  <div>

    <div className="text-cyan-300 text-xs tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.9)] animate-pulse">
      REDEMPTION CONSENT
    </div>

   <div className="text-2xl font-extrabold text-cyan-100 mt-2 drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]">
      REDEMPTION & PRIZE COMPLIANCE
    </div>

  </div>

  <div className="text-sm text-cyan-100 leading-relaxed space-y-4">

    <p>
      Teez Golf Challenges operates competitive golf challenge systems across multiple player divisions including juniors, amateurs, seniors, ladies, open division and professional players.
    </p>

    <p>
      Prize redemptions, including vouchers, merchandise and cash rewards, may be subject to the Rules of Amateur Status governed by organizations including the R&A, GolfRSA, USPGA and other affiliated governing bodies.
    </p>

    <p>
      Players are individually responsible for understanding the rules applicable to their playing division, competition format and amateur status before selecting or accepting any redemption option.
    </p>

    <p>
      Certain cash prizes, high-value prizes or prize redemptions may affect a player’s amateur status depending on the rules applicable within their governing region and competition category.
    </p>

  </div>

  {/* ================= CASH WARNING ================= */}

  <div className="border border-red-500/30 bg-black/30 rounded-2xl p-4">

    <div className="text-lg font-bold text-cyan-300 mb-3">
      CASH REDEMPTION WARNING
    </div>

    <div className="text-sm text-cyan-100 leading-relaxed space-y-3">

      <p>
        Cash prize redemptions may not be permitted within certain amateur divisions, handicap competitions or governing jurisdictions.
      </p>

      <p>
        Accepting cash prizes or prize values exceeding permitted limits may result in the forfeiture of amateur golf status under applicable governing body rules.
      </p>

      <p>
        Before selecting CASH redemption options, players should ensure they fully understand the rules applicable to their division, competition type and governing body regulations.
      </p>

    </div>

  </div>

  {/* ================= VOUCHERS ================= */}

  <div className="border border-red-500/30 bg-black/30 rounded-2xl p-4">

    <div className="text-lg font-bold text-cyan-300 mb-3">
      VOUCHER & NON-CASH REDEMPTIONS
    </div>

    <div className="text-sm text-cyan-100 leading-relaxed space-y-3">

      <p>
        Voucher, merchandise and retail redemption options are intended to align with permitted non-cash prize structures commonly recognized within amateur golf regulations.
      </p>

      <p>
        Voucher redemptions are limited to retail products, services, golf-related goods, approved suppliers or affiliated redemption partners and may not be exchanged for direct cash withdrawals unless explicitly permitted within the selected redemption category and governing rules.
      </p>

      <p>
        Prize limits and redemption eligibility may vary depending on competition type, division and governing jurisdiction.
      </p>

    </div>

  </div>

  {/* ================= FRAUD ================= */}

  <div className="border border-red-500/30 bg-black/30 rounded-2xl p-4">

    <div className="text-lg font-bold text-cyan-300 mb-3">
      IDENTITY VERIFICATION & FRAUD PREVENTION
    </div>

    <div className="text-sm text-red-100 leading-relaxed space-y-3">

      <p>
        Teez Golf Challenges reserves the right to request identity verification, division verification, competition verification or supporting documentation before processing redemption requests.
      </p>

      <p>
        Any attempt to manipulate divisions, create fraudulent accounts, misrepresent amateur status, circumvent prize restrictions or abuse redemption systems may result in suspension, forfeiture of prizes, permanent account restrictions and/or reporting to applicable governing bodies.
      </p>

    </div>

  </div>

  {/* ================= CHECKBOXES ================= */}

  <div className="flex flex-col gap-4">

    <label className="flex gap-3 items-start text-sm text-cyan-100">
      <input
        type="checkbox"
        checked={agreedStatusRules}
        onChange={(e) =>
          setAgreedStatusRules(e.target.checked)
        }
        className="mt-1"
      />

      <span>
        I understand that certain prize redemptions, including cash prizes, may affect my amateur golf status under applicable governing body rules including the R&A, GolfRSA, USPGA and other affiliated organizations.
      </span>
    </label>

    <label className="flex gap-3 items-start text-sm text-cyan-100">
      <input
        type="checkbox"
        checked={agreedResponsibility}
        onChange={(e) =>
          setAgreedResponsibility(e.target.checked)
        }
        className="mt-1"
      />

      <span>
        I accept full responsibility for ensuring that my participation, prize acceptance and redemption selections comply with the rules and regulations applicable to my playing division and amateur status.
      </span>
    </label>

    <label className="flex gap-3 items-start text-sm text-cyan-100">
      <input
        type="checkbox"
        checked={agreedTruth}
        onChange={(e) =>
          setAgreedTruth(e.target.checked)
        }
        className="mt-1"
      />

      <span>
        I confirm that all redemption requests submitted through Teez Golf Challenges are made voluntarily and that all information provided by me is accurate and truthful.
      </span>
    </label>

  </div>

  {/* ================= FINAL ================= */}

  <div className="text-xs text-cyan-300 border border-red-500/20 rounded-2xl bg-black/30 p-4">

    By proceeding with a redemption request through Teez Golf Challenges, I acknowledge that I have read, understood and accepted the redemption rules, prize conditions and amateur status responsibilities applicable to my participation within the platform.

  </div>

</div>

     {/* ================= REDEMPTION FORM ================= */}

{(() => {

  const consentAccepted =
    agreedStatusRules &&
    agreedResponsibility &&
    agreedTruth;

  return (

    <div
      className={`
        flex flex-col items-center gap-6 w-full transition-all duration-300
        ${
          consentAccepted
            ? "opacity-100"
            : "opacity-40 pointer-events-none"
        }
      `}
    >

      {!consentAccepted && (
       <div className="text-sm text-cyan-200 border border-cyan-400/30 bg-[#04111f]/90 rounded-2xl px-5 py-3 text-center max-w-xl shadow-[0_0_20px_rgba(0,255,255,0.25)]">
          Accept all redemption consent acknowledgements above to unlock redemption options.
        </div>
      )}

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSupplier("");
        }}
        className="
  px-4 py-3 rounded-2xl w-72
  bg-cyan-500 text-black font-extrabold
  shadow-[0_0_30px_rgba(0,255,255,0.6)]
  border border-cyan-300/40
  focus:outline-none
  focus:shadow-[0_0_40px_rgba(0,255,255,0.9)]
  transition-all
"
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
       className="
  px-4 py-3 rounded-2xl w-72
  bg-cyan-500 text-black font-extrabold
  shadow-[0_0_30px_rgba(0,255,255,0.6)]
  border border-cyan-300/40
  placeholder:text-black/60
  focus:outline-none
  focus:shadow-[0_0_40px_rgba(0,255,255,0.9)]
  transition-all
"
      />

      {/* SUPPLIER */}
      {category && (
        <>

          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="
  px-4 py-3 rounded-2xl w-72
  bg-cyan-500 text-black font-extrabold
  shadow-[0_0_30px_rgba(0,255,255,0.6)]
  border border-cyan-300/40
  focus:outline-none
  focus:shadow-[0_0_40px_rgba(0,255,255,0.9)]
  transition-all
"
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
             className="text-cyan-300 underline drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] hover:text-cyan-200 transition-all"
            >
              Visit Website
            </a>
          )}

        </>
      )}

      <button
        onClick={submit}
       className="
  bg-cyan-400 text-black px-8 py-4 rounded-2xl
  font-extrabold tracking-[0.15em]
  shadow-[0_0_35px_rgba(0,255,255,0.7)]
  border border-cyan-200/50
  hover:bg-cyan-300
  hover:scale-[1.05]
  hover:shadow-[0_0_50px_rgba(0,255,255,1)]
  transition-all
  animate-pulse
"
           >
        SUBMIT REDEMPTION
      </button>

    </div>

  );

})()}

    </div>
  );
}