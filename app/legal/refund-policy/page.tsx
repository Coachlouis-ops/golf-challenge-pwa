"use client";

import { useRouter } from "next/navigation";

export default function RefundPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-green-400">
          Refund Policy
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Teez Golf Challenges refund terms and user protection policy
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-4 max-w-3xl mx-auto pb-10">
        <p className="font-semibold">
          Refund Policy - Honey Badger Technologies (PTY) LTD
        </p>

        <p>
          This Refund Policy applies to payments, membership fees, platform access,
          competition entries, and other digital services provided through the Teez
          Golf Challenges platform.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD will consider and process refunds
          where a valid refund reason exists in terms of this Refund Policy, the
          Platform Terms and Conditions, applicable South African law, consumer
          protection principles, and fair business practice.
        </p>

        <p className="font-semibold">1. Refund Eligibility</p>

        <p>
          A refund may be approved where Honey Badger Technologies (PTY) LTD
          determines that one or more of the following occurred:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            A technical failure on the Teez Golf Challenges platform prevented the
            user from accessing paid services.
          </li>
          <li>
            A technical failure prevented the user from participating in a paid
            challenge or competition.
          </li>
          <li>A duplicate payment was made.</li>
          <li>The wrong amount was charged.</li>
          <li>
            An administrative or human error caused incorrect account allocation,
            incorrect membership activation, or incorrect transaction processing.
          </li>
          <li>
            Payment was received but the user account was not activated within a
            reasonable time due to a platform or administrative error.
          </li>
          <li>
            A challenge, competition, or result was affected by a verified platform
            error, scoring error, setup error, or system failure.
          </li>
          <li>
            Any other issue where Honey Badger Technologies (PTY) LTD reasonably
            determines that a refund is fair and appropriate.
          </li>
          <li>
            The refund request cannot be made more than 30 days after the transaction
            date, unless approved at the company discretion.
          </li>
        </ul>

        <p className="font-semibold">2. Challenge and Competition Refunds</p>

        <p>
          Where a challenge or competition cannot proceed because of a technical
          failure, system error, incorrect setup, or platform-related issue, Honey
          Badger Technologies (PTY) LTD may refund, reverse the transaction, restore
          the user balance, or make another fair account correction.
        </p>

        <p>
          If a challenge or competition has already been completed and results have
          been finalized, refunds will only be considered where there is clear
          evidence of a technical error, scoring error, duplicate transaction,
          incorrect deduction, or administrative mistake.
        </p>

        <p className="font-semibold">3. Membership Refunds</p>

        <p>
          Membership fees may be refunded where payment was made but membership
          access was not activated due to a technical error, administrative error,
          duplicate payment, incorrect account allocation, or verified system failure.
        </p>

        <p>
          Once membership access has been activated and used, the membership fee is
          generally non-refundable unless Honey Badger Technologies (PTY) LTD
          determines that a platform error or administrative error justifies a refund.
        </p>

        <p className="font-semibold">4. Refund Review Process</p>

        <p>
          All refund requests must be reviewed by Honey Badger Technologies (PTY) LTD
          before approval.
        </p>

        <p>
          The company may request additional information from the user, including
          proof of payment, payment reference, email address, user ID, transaction
          date, bank confirmation, card confirmation, PayGenius confirmation, or
          screenshots showing the issue.
        </p>

        <p>
          The company may refuse a refund request if the information provided is
          incomplete, false, misleading, fraudulent, abusive, or cannot be verified.
        </p>

        <p className="font-semibold">5. Refund Processing Time</p>

        <p>
          Approved refunds will be processed within 7 business days where possible.
        </p>

        <p>
          Actual payment reflection times may depend on the bank, payment provider,
          card issuer, payment method, or payment processing system used.
        </p>

        <p className="font-semibold">6. South African Law and User Rights</p>

        <p>
          This Refund Policy must be read together with the Platform Terms and
          Conditions and applicable South African law, including consumer protection
          principles under the Consumer Protection Act where applicable.
        </p>

        <p>
          Nothing in this Refund Policy is intended to remove, reduce, or limit any
          legal rights that a user may have under applicable South African law. Honey
          Badger Technologies (PTY) LTD will handle refund requests fairly, reasonably,
          and in line with applicable legal obligations.
        </p>

        <p className="font-semibold">7. Complaints and Ombudsman Assistance</p>

        <p>
          Users are encouraged to contact Honey Badger Technologies (PTY) LTD first so
          that the company can investigate and attempt to resolve the refund request or
          payment dispute directly.
        </p>

        <p>
          If a user is not satisfied with the outcome, the user may seek assistance
          from an applicable South African consumer protection body, payment provider,
          bank, card issuer, or recognised ombudsman structure where the matter falls
          within that body jurisdiction.
        </p>

        <p>
          This may include consumer protection assistance through the National Consumer
          Commission or financial dispute assistance through the relevant banking,
          payment, or financial services ombudsman process, depending on the nature of
          the complaint.
        </p>

        <p className="font-semibold">8. Fraud, Abuse, and Misuse</p>

        <p>
          Honey Badger Technologies (PTY) LTD reserves the right to refuse a refund
          where there is evidence of fraud, abuse, platform manipulation, false claims,
          chargeback misuse, or breach of the Platform Terms and Conditions.
        </p>

        <p>
          Where necessary, the company may suspend or restrict the user account while
          the matter is investigated.
        </p>

        <p className="font-semibold">9. Final Decision</p>

        <p>
          Honey Badger Technologies (PTY) LTD will make the final decision on all refund
          requests after reviewing the transaction, user account, payment records,
          challenge records, platform logs, and any other relevant information.
        </p>

        <p>
          Refunds will be granted where the company determines that the refund is valid,
          fair, and supported by the platform records or available evidence.
        </p>

        <button
          onClick={() => router.back()}
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88] mt-8"
        >
          Back
        </button>
      </div>
    </div>
  );
}