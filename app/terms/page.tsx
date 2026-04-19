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

  <p>
    These Terms govern your use of the Teez Golf Challenges platform (“the Platform”), operated by Honey Badger Technologies PTY LTD.
    By accessing or using the Platform, you agree to be bound by these Terms.
  </p>

  <p className="font-semibold">1. Nature of the Platform</p>
  <p>
    Teez Golf Challenges is a skill-based competition platform. It does not facilitate gambling, betting, or wagering between users.
  </p>

  <p className="font-semibold">2. Eligibility</p>
  <p>
    You must be at least 18 years old or have verified parental consent to use the Platform.
  </p>

  <p className="font-semibold">3. Digital Tokens</p>
  <p>
    The Platform uses digital tokens for participation in challenges. Tokens are not currency, have no monetary value,
    are non-refundable, non-transferable, and cannot be withdrawn or exchanged for cash.
  </p>

  <p className="font-semibold">4. Payments</p>
  <p>
    All payments are processed through secure third-party providers including Stripe and PayFast.
    Payments are final and non-reversible once completed.
  </p>

  <p className="font-semibold">5. Competitions</p>
  <p>
    All competitions are based on skill. The Platform reserves the right to verify, review, modify, or cancel results
    in cases of suspected fraud, error, or rule violations.
  </p>

  <p className="font-semibold">6. Rewards</p>
  <p>
    Rewards may include vouchers, goods, or other non-cash equivalents depending on user category and applicable regulations.
    Rewards are final once issued.
  </p>

  <p className="font-semibold">7. Risk Disclaimer</p>
  <p>
    Participation involves risk. Users may lose tokens through unsuccessful challenge outcomes.
    The Platform does not guarantee any winnings or returns.
  </p>

  <p className="font-semibold">8. Fraud & Misuse</p>
  <p>
    Any attempt to manipulate results, exploit the system, or engage in fraudulent activity may result in account suspension,
    forfeiture of tokens, and permanent banning.
  </p>

  <p className="font-semibold">9. Data & Privacy</p>
  <p>
    User data is processed in accordance with the Platform’s Privacy Policy and is used to operate, maintain, and improve services.
  </p>

  <p className="font-semibold">10. Platform Availability</p>
  <p>
    The Platform is provided “as is” and “as available.” We do not guarantee uninterrupted access, accuracy, or reliability.
  </p>

  <p className="font-semibold">11. Limitation of Liability</p>
  <p>
    To the maximum extent permitted by law, Honey Badger Technologies and Teez Golf Challenges shall not be liable for any
    direct, indirect, incidental, or consequential damages arising from use of the Platform.
  </p>

  <p className="font-semibold">12. Intellectual Property</p>
  <p>
    All platform content, systems, and branding remain the property of Honey Badger Technologies PTY LTD.
  </p>

  <p className="font-semibold">13. Governing Law</p>
  <p>
    These Terms are governed by the laws of South Africa.
  </p>

  <p className="font-semibold">14. Updates</p>
  <p>
    These Terms may be updated at any time. Continued use of the Platform constitutes acceptance of the updated Terms.
  </p>

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