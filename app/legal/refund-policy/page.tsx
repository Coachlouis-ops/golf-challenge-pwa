"use client";

import { useRouter } from "next/navigation";

export default function RefundPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-green-400">
          Refund, Cancellation & Delivery Policy
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Teez Golf Challenges refund, cancellation, digital delivery, and user
          protection policy
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-4 max-w-3xl mx-auto pb-10">
        <p className="font-semibold">
          Refund, Cancellation & Delivery Policy - Honey Badger Technologies
          (PTY) LTD
        </p>

        <p>
          This policy applies to subscription payments, digital platform access,
          Teez token allocation, golf challenge participation, and other digital
          services provided through the Teez Golf Challenges platform.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD will consider and process refunds
          where a valid refund reason exists in terms of this policy, the
          Platform Terms and Conditions, applicable South African law, consumer
          protection principles, and fair business practice.
        </p>

        <p className="font-semibold">1. Digital Service Delivery</p>

        <p>
          No physical goods are delivered. 100% of payments relate to digital
          platform access and subscription services.
        </p>

        <p>
          Subject to successful payment confirmation, digital subscription access
          will be made available immediately to 24 hours after payment
          confirmation.
        </p>

        <p>
          Monthly subscription tokens are credited digitally to the user’s
          in-app wallet after successful subscription activation.
        </p>

        <p className="font-semibold">2. Teez Tokens</p>

        <p>
          Teez tokens are digital play credits only. Tokens are used only inside
          the Teez Golf Challenges platform to create, enter, and compete in
          golf challenges.
        </p>

        <p>
          Teez tokens have no cash value, cannot be redeemed, cannot be
          withdrawn, cannot be transferred for cash, and cannot be converted into
          money, vouchers, goods, services, or external rewards.
        </p>

        <p>
          Tokens that have already been used to enter or participate in a
          challenge are not refundable, reversible, or convertible into money or
          external value.
        </p>

        <p className="font-semibold">3. Refund Eligibility</p>

        <p>
          A refund may be approved where Honey Badger Technologies (PTY) LTD
          determines that one or more of the following occurred:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            A technical failure on the Teez Golf Challenges platform prevented
            the user from accessing paid digital services.
          </li>
          <li>
            Payment was received but the user account was not activated within
            the stated delivery period due to a platform or administrative
            error.
          </li>
          <li>A duplicate payment was made.</li>
          <li>The wrong amount was charged.</li>
          <li>
            An administrative or human error caused incorrect account
            allocation, incorrect subscription activation, or incorrect
            transaction processing.
          </li>
          <li>
            A challenge or result was affected by a verified platform error,
            scoring error, setup error, or system failure.
          </li>
          <li>
            Any other issue where Honey Badger Technologies (PTY) LTD reasonably
            determines that a refund is fair and appropriate.
          </li>
        </ul>

        <p>
          Refund requests should be submitted within 30 days after the
          transaction date, unless Honey Badger Technologies (PTY) LTD approves a
          later request at its discretion or where applicable law requires
          otherwise.
        </p>

        <p className="font-semibold">4. Subscription Refunds</p>

        <p>
          Subscription fees may be refunded where payment was made but digital
          subscription access was not activated due to a technical error,
          administrative error, duplicate payment, incorrect account allocation,
          or verified system failure.
        </p>

        <p>
          Once subscription access has been activated and used, the subscription
          fee is generally non-refundable unless Honey Badger Technologies (PTY)
          LTD determines that a platform error or administrative error justifies
          a refund, or where applicable South African law requires otherwise.
        </p>

        <p className="font-semibold">5. Challenge Token Corrections</p>

        <p>
          Where a golf challenge cannot proceed because of a technical failure,
          system error, incorrect setup, or platform-related issue, Honey Badger
          Technologies (PTY) LTD may restore tokens, reverse an incorrect token
          deduction, correct the user balance, or make another fair in-app
          account correction.
        </p>

        <p>
          If a challenge has already been completed and results have been
          finalized, token corrections will only be considered where there is
          clear evidence of a technical error, scoring error, duplicate
          transaction, incorrect deduction, or administrative mistake.
        </p>

        <p className="font-semibold">6. Cancellation of Subscription</p>

        <p>
          Customers may cancel any recurring subscription at any time through the
          Cancel Subscription link available on the website.
        </p>

        <button
          onClick={() => router.push("/cancel-subscription")}
          className="w-full py-4 rounded-2xl font-bold text-lg bg-[#39ff14] text-black shadow-[0_0_25px_#39ff14] mt-4 border border-[#b6ff00]"
        >
          Cancel Subscription
        </button>

        <p>
          Cancellation takes effect immediately once the cancellation request has
          been submitted through the cancellation link, subject to any technical
          processing requirements of the payment gateway, bank, or subscription
          system.
        </p>

        <p>
          Cancellation prevents future subscription renewal where the
          cancellation is successfully processed before the next billing cycle.
        </p>

        <p>
          Cancellation does not convert unused tokens into cash, vouchers, goods,
          services, or external rewards.
        </p>

        <p className="font-semibold">7. Refund Review Process</p>

        <p>
          All refund requests must be reviewed by Honey Badger Technologies (PTY)
          LTD before approval.
        </p>

        <p>
          The company may request additional information from the user, including
          proof of payment, payment reference, email address, user ID,
          transaction date, bank confirmation, card confirmation, payment gateway
          confirmation, or screenshots showing the issue.
        </p>

        <p>
          The company may refuse a refund request if the information provided is
          incomplete, false, misleading, fraudulent, abusive, or cannot be
          verified.
        </p>

        <p className="font-semibold">8. Refund Processing Time</p>

        <p>
          Approved refunds will be processed within 7 business days where
          possible.
        </p>

        <p>
          Actual payment reflection times may depend on the bank, payment
          provider, card issuer, payment method, or payment processing system
          used.
        </p>

        <p className="font-semibold">9. South African Law and User Rights</p>

        <p>
          This policy must be read together with the Platform Terms and
          Conditions and applicable South African law, including consumer
          protection principles under the Consumer Protection Act where
          applicable.
        </p>

        <p>
          Nothing in this policy is intended to remove, reduce, or limit any
          legal rights that a user may have under applicable South African law.
          Honey Badger Technologies (PTY) LTD will handle refund requests fairly,
          reasonably, and in line with applicable legal obligations.
        </p>

        <p className="font-semibold">10. Complaints and Ombudsman Assistance</p>

        <p>
          Users are encouraged to contact Honey Badger Technologies (PTY) LTD
          first so that the company can investigate and attempt to resolve the
          refund request, cancellation issue, or payment dispute directly.
        </p>

        <p>
          If a user is not satisfied with the outcome, the user may seek
          assistance from an applicable South African consumer protection body,
          payment provider, bank, card issuer, or recognised ombudsman structure
          where the matter falls within that body’s jurisdiction.
        </p>

        <p className="font-semibold">11. Fraud, Abuse, and Misuse</p>

        <p>
          Honey Badger Technologies (PTY) LTD reserves the right to refuse a
          refund where there is evidence of fraud, abuse, platform manipulation,
          false claims, chargeback misuse, or breach of the Platform Terms and
          Conditions.
        </p>

        <p>
          Where necessary, the company may suspend or restrict the user account
          while the matter is investigated.
        </p>

        <p className="font-semibold">12. Final Decision</p>

        <p>
          Honey Badger Technologies (PTY) LTD will make the final decision on all
          refund requests after reviewing the transaction, user account, payment
          records, challenge records, platform logs, and any other relevant
          information.
        </p>

        <p>
          Refunds will be granted where the company determines that the refund is
          valid, fair, and supported by the platform records or available
          evidence.
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