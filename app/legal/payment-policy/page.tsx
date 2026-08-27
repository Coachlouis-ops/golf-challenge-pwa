"use client";

import { useRouter } from "next/navigation";

export default function RefundPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold text-green-400">
          Refund & Delivery Policy
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Teez Golf Challenges payment, refund, digital delivery, token
          correction, and user protection policy
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-5 max-w-3xl w-full mx-auto pb-10">
        <p className="font-semibold text-white">
          Refund & Delivery Policy
        </p>

        <p>
          This Policy applies to Participation Access payments, Teez Play Token
          purchases, digital delivery, payment errors, refunds, token
          corrections, and related digital services provided through Teez Golf
          Challenges.
        </p>

        <p>
          Teez Golf Challenges is owned and operated by Honey Badger
          Technologies (PTY) LTD.
        </p>

        <p>
          This Policy must be read together with the Platform Terms &
          Conditions, Payment & Participation Policy, and Privacy Policy.
        </p>

        {/* 1 */}
        <h2 className="font-semibold text-white">
          1. Participation Access
        </h2>

        <p>
          Teez Golf Challenges operates on a pay-as-you-play model and does not
          require a recurring monthly subscription.
        </p>

        <p>
          The current Participation Access purchase includes:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Participation Access payment: R149.</li>
          <li>Included allocation: 100 Teez Play Tokens.</li>
          <li>Payment type: One-time authorised payment.</li>
          <li>No automatic renewal.</li>
          <li>No recurring monthly deduction.</li>
        </ul>

        <p>
          Participation Access does not expire merely because the player does
          not purchase additional Teez Play Tokens.
        </p>

        {/* 2 */}
        <h2 className="font-semibold text-white">
          2. Teez Play Token Top-Ups
        </h2>

        <p>
          Players with Participation Access may purchase additional Teez Play
          Tokens when required.
        </p>

        <p>
          The current standard top-up includes:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Top-up payment: R149.</li>
          <li>Allocation: 100 Teez Play Tokens.</li>
          <li>Payment type: One-time authorised payment.</li>
          <li>No automatic top-up.</li>
          <li>No recurring billing.</li>
        </ul>

        <p>
          A player chooses when to purchase additional Teez Play Tokens.
        </p>

        {/* 3 */}
        <h2 className="font-semibold text-white">
          3. Digital Delivery
        </h2>

        <p>
          Participation Access and Teez Play Tokens are delivered digitally
          through the user&apos;s Teez Golf Challenges Account.
        </p>

        <p>
          A successful Participation Access purchase is intended to:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Activate Participation Access.</li>
          <li>Allocate 100 Teez Play Tokens.</li>
          <li>Update the player&apos;s digital wallet.</li>
          <li>Provide access to applicable Platform participation features.</li>
        </ul>

        <p>
          A successful standard Teez Play Token top-up is intended to allocate
          an additional 100 Teez Play Tokens to the player&apos;s wallet.
        </p>

        <p>
          No physical goods, courier service, postal delivery, collection
          process, or physical delivery charge applies to these purchases.
        </p>

        {/* 4 */}
        <h2 className="font-semibold text-white">
          4. Delivery Timing
        </h2>

        <p>
          Digital delivery is intended to occur promptly after successful
          payment confirmation.
        </p>

        <p>
          Temporary delays may occur because of payment processing, security
          verification, network issues, payment-provider outages, maintenance,
          or technical errors.
        </p>

        <p>
          Where a verified technical or payment issue prevents delivery, the
          user should allow Honey Badger Technologies (PTY) LTD a reasonable
          opportunity to investigate and correct the issue.
        </p>

        {/* 5 */}
        <h2 className="font-semibold text-white">
          5. Successful Payment Requirement
        </h2>

        <p>
          Participation Access or Teez Play Tokens are delivered only after the
          Platform receives valid confirmation that the relevant payment was
          successful.
        </p>

        <p>
          A pending, declined, cancelled, reversed, incomplete, or failed
          transaction does not qualify for Participation Access activation or
          Teez Play Token allocation.
        </p>

        <p>
          A screenshot, bank notification, attempted payment, or other
          unverified payment evidence does not by itself establish that a
          successful payment was received.
        </p>

        {/* 6 */}
        <h2 className="font-semibold text-white">
          6. Nature of Teez Play Tokens
        </h2>

        <p>
          Teez Play Tokens are digital participation and play credits used only
          within the Teez Golf Challenges Platform.
        </p>

        <p>Teez Play Tokens:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Are digital play and participation credits only.</li>
          <li>Have no cash or monetary value.</li>
          <li>Are not legal tender.</li>
          <li>Are not electronic money.</li>
          <li>Are not cryptocurrency.</li>
          <li>Are not financial instruments.</li>
          <li>Cannot be withdrawn as cash.</li>
          <li>Cannot be converted into cash.</li>
          <li>Cannot be sold or transferred for payment.</li>
          <li>May only be used for approved Platform activities.</li>
        </ul>

        <p>
          Teez Play Tokens remain available in the player&apos;s wallet until
          used, subject to legitimate Platform corrections, account
          enforcement, these Terms, and applicable law.
        </p>

        {/* 7 */}
        <h2 className="font-semibold text-white">
          7. No Subscription Cancellation
        </h2>

        <p>
          Participation Access and standard Teez Play Token top-ups are
          one-time purchases and are not recurring subscriptions.
        </p>

        <p>
          There is therefore no monthly subscription to cancel and no automatic
          renewal that the player must stop.
        </p>

        <p>
          A player who does not wish to purchase additional Teez Play Tokens
          simply does not initiate another top-up payment.
        </p>

        {/* 8 */}
        <h2 className="font-semibold text-white">
          8. Refund Eligibility
        </h2>

        <p>
          A refund may be considered where Honey Badger Technologies (PTY) LTD
          verifies that one or more of the following occurred:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>A duplicate payment was processed.</li>
          <li>An incorrect payment amount was charged.</li>
          <li>
            Payment was successfully completed but the purchased digital
            service was not delivered because of a verified technical or
            system error.
          </li>
          <li>
            Payment succeeded but the correct Teez Play Token allocation was
            not delivered because of a verified Platform error.
          </li>
          <li>
            A verified administrative or processing error caused an incorrect
            payment, entitlement, or token allocation.
          </li>
          <li>A refund is required under applicable law.</li>
          <li>
            Honey Badger Technologies (PTY) LTD reasonably determines that a
            refund is fair and appropriate.
          </li>
        </ul>

        {/* 9 */}
        <h2 className="font-semibold text-white">
          9. Non-Refundable Situations
        </h2>

        <p>
          Completed digital transactions are generally non-refundable once the
          purchased digital service or Teez Play Tokens have been successfully
          delivered or used, except where applicable law or a verified payment,
          technical, Platform, or administrative error requires otherwise.
        </p>

        <p>
          A refund will generally not be granted solely because:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>The user changed their mind after using the Platform.</li>
          <li>
            The user did not use all available Platform features.
          </li>
          <li>
            The user has not yet used all remaining Teez Play Tokens.
          </li>
          <li>
            The user was dissatisfied with a challenge result, ranking, score,
            statistic, achievement, or personal performance.
          </li>
          <li>
            The user voluntarily stopped using the Platform.
          </li>
          <li>
            The user&apos;s Account or access was legitimately restricted
            because of fraud, cheating, payment abuse, misuse, or material
            breach of the Platform Terms & Conditions.
          </li>
        </ul>

        <p>
          Nothing in this section removes or limits any right that cannot
          lawfully be excluded.
        </p>

        {/* 10 */}
        <h2 className="font-semibold text-white">
          10. Unused Teez Play Tokens
        </h2>

        <p>
          The existence of unused Teez Play Tokens in a player&apos;s wallet
          does not create a right to withdraw, redeem, exchange, or convert
          those tokens into cash or other external monetary value.
        </p>

        <p>
          Unused Teez Play Tokens remain available for future approved Platform
          participation unless legitimately corrected or removed in accordance
          with the Platform Terms & Conditions or applicable law.
        </p>

        {/* 11 */}
        <h2 className="font-semibold text-white">
          11. Payment Errors
        </h2>

        <p>
          Users should report suspected duplicate charges, incorrect charges,
          unauthorised transactions, failed Participation Access activation, or
          failed Teez Play Token allocations as soon as reasonably possible.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD may work with Peach Payments, an
          applicable acquiring bank, payment provider, bank, or card issuer to
          investigate and resolve the reported issue.
        </p>

        {/* 12 */}
        <h2 className="font-semibold text-white">
          12. Refund Request Timeframe
        </h2>

        <p>
          Refund requests should be submitted as soon as reasonably possible
          after the relevant transaction.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD may require sufficient
          information to identify and investigate the transaction.
        </p>

        {/* 13 */}
        <h2 className="font-semibold text-white">
          13. Refund Review Process
        </h2>

        <p>
          Refund requests must be reviewed and verified before approval.
        </p>

        <p>The Company may request supporting information including:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Proof of payment.</li>
          <li>Payment or transaction reference.</li>
          <li>Registered email address.</li>
          <li>User ID.</li>
          <li>Transaction date.</li>
          <li>Bank or card confirmation.</li>
          <li>Payment-provider confirmation.</li>
          <li>Screenshots showing the reported issue.</li>
        </ul>

        <p>
          Honey Badger Technologies (PTY) LTD may reject a refund request where
          the information supplied is false, misleading, fraudulent, abusive,
          incomplete, or cannot reasonably be verified.
        </p>

        {/* 14 */}
        <h2 className="font-semibold text-white">
          14. Refund Processing
        </h2>

        <p>
          Approved refunds will be submitted for processing within a reasonable
          period.
        </p>

        <p>
          The time required for funds to reflect may depend on the bank, card
          issuer, payment gateway, payment provider, payment method, or
          payment-processing system used.
        </p>

        <p>
          Refunds will normally be returned through the original payment method
          where reasonably possible.
        </p>

        {/* 15 */}
        <h2 className="font-semibold text-white">
          15. Teez Play Token Balance Corrections
        </h2>

        <p>
          Where a verified technical, duplicate-processing, payment, or
          administrative error causes an incorrect Teez Play Token deduction or
          allocation, Honey Badger Technologies (PTY) LTD may:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Restore incorrectly deducted Teez Play Tokens.</li>
          <li>Remove duplicate or incorrectly allocated Teez Play Tokens.</li>
          <li>Correct the user&apos;s in-app Teez Play Token balance.</li>
          <li>Correct associated transaction or allocation records.</li>
          <li>Make another fair digital Account correction.</li>
        </ul>

        <p>
          Token balance corrections are digital Platform corrections only and
          do not represent a cash payment, cash refund, voucher, or transfer of
          financial value.
        </p>

        {/* 16 */}
        <h2 className="font-semibold text-white">
          16. Payment Reversals and Chargebacks
        </h2>

        <p>
          Where a payment is refunded, reversed, charged back, or otherwise
          removed after Participation Access or Teez Play Tokens have been
          allocated, Honey Badger Technologies (PTY) LTD may reverse the
          associated digital entitlement or incorrectly retained token
          allocation where lawful and appropriate.
        </p>

        <p>
          Users should report genuine payment disputes to Honey Badger
          Technologies (PTY) LTD where reasonably appropriate so that the
          Company has an opportunity to investigate.
        </p>

        <p>
          Nothing in this section prevents a user from exercising any right
          that cannot lawfully be excluded.
        </p>

        {/* 17 */}
        <h2 className="font-semibold text-white">
          17. Fraud and Abuse
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may refuse or investigate claims
          where there is evidence of fraud, false claims, Platform
          manipulation, duplicate refund claims, chargeback misuse, payment
          abuse, or material breach of the Platform Terms & Conditions.
        </p>

        <p>
          The Company may temporarily restrict an Account while a suspected
          payment, refund, security, fraud, or chargeback issue is investigated.
        </p>

        {/* 18 */}
        <h2 className="font-semibold text-white">
          18. Complaints and Dispute Resolution
        </h2>

        <p>
          Users may contact Honey Badger Technologies (PTY) LTD regarding
          genuine refund, payment, Participation Access activation, token
          allocation, or digital delivery disputes.
        </p>

        <p>
          If a dispute cannot be resolved directly, the user may exercise
          applicable rights through their bank, payment provider, regulator,
          consumer protection body, recognised ombudsman, or court with
          jurisdiction.
        </p>

        {/* 19 */}
        <h2 className="font-semibold text-white">
          19. Consumer Rights and Governing Law
        </h2>

        <p>
          This Policy is governed by the laws of the Republic of South Africa,
          subject to any mandatory consumer rights or laws applicable to a user
          in another jurisdiction that cannot lawfully be excluded.
        </p>

        <p>
          Nothing in this Policy is intended to remove, reduce, or limit any
          legal right that cannot lawfully be excluded or limited.
        </p>

        {/* 20 */}
        <h2 className="font-semibold text-white">
          20. Contact Details
        </h2>

        <p>
          Contact details for genuine refund requests, payment-error reports,
          token-allocation issues, and digital delivery complaints:
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD
          <br />
          Registration Number: 2026/102722/07
          <br />
          Email: info@honeybadgertech.com
          <br />
          Telephone: +27 82 837 0266
          <br />
          Physical Address: 71 Duke Close, Silver Stream Estate, Pretoria,
          Gauteng, 0081, South Africa
        </p>

        <p className="text-xs text-gray-500 pt-4">
          Last updated: August 2026
        </p>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88] mt-8"
        >
          Back
        </button>
      </div>
    </div>
  );
}