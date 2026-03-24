"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-4">

        <p className="font-semibold">Teez Golf Challenges – Terms and Conditions</p>

        <p>By creating an account and using this platform, you agree to these Terms.</p>

        <p className="font-semibold">Platform</p>
        <p>Skill-based golf challenges using tokens. No gambling.</p>

        <p className="font-semibold">Eligibility</p>
        <p>18+ or parental consent.</p>

        <p className="font-semibold">Tokens</p>
        <p>Tokens have no cash value, are non-refundable, and cannot be withdrawn.</p>

        <p className="font-semibold">Payments</p>
        <p>Processed via Stripe / PayFast. Final once completed.</p>

        <p className="font-semibold">Competitions</p>
        <p>Skill-based. Teez may verify or cancel results.</p>

        <p className="font-semibold">Rewards</p>
        <p>Vouchers, goods, or cash equivalents (where allowed). Final once issued.</p>

        <p className="font-semibold">Risk</p>
        <p>You may lose tokens. Teez is not liable.</p>

        <p className="font-semibold">Fraud</p>
        <p>Accounts may be suspended for abuse or manipulation.</p>

        <p className="font-semibold">Data</p>
        <p>Data may be processed for platform operation.</p>

        <p className="font-semibold">Liability</p>
        <p>Platform provided “as is”. No guarantees.</p>

        <p className="font-semibold">Governing Law</p>
        <p>South Africa</p>

      </div>

      {/* ACCEPT SECTION */}
      <div className="px-6 pb-8 pt-4 border-t border-gray-800">

        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-5 h-5"
          />
          <span>I accept the Terms & Conditions</span>
        </label>

        <button
          disabled={!accepted}
          onClick={() => router.push("/register")}
          className={`w-full py-4 rounded-2xl font-semibold text-lg ${
            accepted
              ? "bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88]"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          Continue to Register
        </button>

      </div>

    </div>
  );
}