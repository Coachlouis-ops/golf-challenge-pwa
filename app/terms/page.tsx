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

  <p className="font-semibold">3. Competition Entries</p>
  <p>
    The Platform uses entry fee's for participation in challenges. Entry fee's are non-refundable but is subject to the refund policy. 
  </p>

  <p className="font-semibold">3.1 Refund Eligibility</p>

<p>
  A refund may be approved where Honey Badger Technologies (PTY) LTD determines
  that one or more of the following occurred:
</p>

<ul className="list-disc pl-6 space-y-1">
  <li>A technical failure on the Teez Golf Challenges platform prevented the user from accessing paid services.</li>
  <li>A duplicate payment was made.</li>
  <li>The wrong amount was charged.</li>
  <li>An administrative or human error caused incorrect account allocation, incorrect membership activation, or incorrect transaction processing.</li>
  <li>Payment was received but the user’s account was not activated within a reasonable time due to a platform or administrative error.</li>
  <li>Any other issue where Honey Badger Technologies (PTY) LTD reasonably determines that a refund is fair and appropriate.</li>
</ul>

<p className="font-semibold">3.5 Membership Refunds</p>

<p>
  Membership fees may be refunded where payment was made but membership access
  was not activated due to a technical error, administrative error, duplicate
  payment, or incorrect account allocation.
</p>

<p>
  Once membership access has been activated and used, the membership fee is
  generally non-refundable unless Honey Badger Technologies (PTY) LTD determines
  that a platform error or administrative error justifies a refund.
</p>

<p className="font-semibold">3.6 Refund Review Process</p>

<p>
  All refund requests must be reviewed by Honey Badger Technologies (PTY) LTD
  before approval.
</p>

<p>
  The company may request additional information from the user, including proof
  of payment, payment reference, email address, user ID, transaction date, bank
  confirmation, or screenshots showing the issue.
</p>

<p>
  The company may refuse a refund request if the information provided is incomplete,
  false, misleading, or cannot be verified.
</p>

<p className="font-semibold">3.7 Refund Processing Time</p>

<p>
  Approved refunds will be processed within 7 business days where possible.
</p>

<p>
  Actual payment reflection times may depend on the bank, payment provider, card
  issuer, or payment method used.
</p>

<p className="font-semibold">3.8 Fraud, Abuse, and Misuse</p>

<p>
  Honey Badger Technologies (PTY) LTD reserves the right to refuse a refund where
  there is evidence of fraud, abuse, platform manipulation, false claims, chargeback
  misuse, or breach of the Platform Terms and Conditions.
</p>

<p>
  Where necessary, the company may suspend or restrict the user’s account while
  the matter is investigated.
</p>

<p className="font-semibold">3.9 Final Decision</p>

<p>
  Honey Badger Technologies (PTY) LTD will make the final decision on all refund
  requests after reviewing the transaction, user account, payment records, challenge records, 
  and any other relevant information.
</p>

<p>
  Refunds will be granted where the company determines that the refund is valid,
  fair, and supported by the platform records or available evidence.
</p>

  <p className="font-semibold">4. Payments</p>
  <p>
    All payments are processed through secure third-party provider PayGenius.
    Payments are final, but can be subject to refund policy.  
  </p>

  <p className="font-semibold">5. Competitions</p>
  <p>
    All competitions are based on skill. The Platform reserves the right to verify, review, modify, or cancel results
    in cases of suspected fraud, error, or rule violations.
  </p>

  <p className="font-semibold">6. Rewards</p>
  <p>
    Prizes for the competitions are awarded on merit of applicable regulations and are final once issued.
  </p>

  <p className="font-semibold">7. Risk Disclaimer</p>
  <p>
    Participation enter and compete at own risk and Honey Badger Technologies PTY. LTD and/or Teez Golf Challenges are 
    not responsible for any losses that may occur due to entering a competition.  
  </p>

  <p className="font-semibold">8. Fraud & Misuse</p>
  <p>
    Any attempt to manipulate results, exploit the system, or engage in fraudulent activity may result in account suspension,
    and permanent banning.
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