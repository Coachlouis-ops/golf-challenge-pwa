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
          Teez Golf Challenges subscription, refund, cancellation, digital
          delivery, and user protection policy
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-5 max-w-3xl w-full mx-auto pb-10">
        <p className="font-semibold text-white">
          Refund, Cancellation & Delivery Policy
        </p>

        <p>
          This policy applies to subscription payments, digital Platform access,
          subscription cancellation, payment errors, refunds, and related
          digital services provided through Teez Golf Challenges.
        </p>

        <p>
          Teez Golf Challenges is operated by Honey Badger Technologies (PTY)
          LTD.
        </p>

        <p>
          This policy must be read together with the Platform Terms and
          Conditions and Privacy Policy.
        </p>

        {/* 1 */}
        <h2 className="font-semibold text-white">
          1. Subscription Service
        </h2>

        <p>
          Teez Golf Challenges is a subscription-based competitive golf
          Platform.
        </p>

        <p>
          Access to the main features of Teez Golf Challenges requires an active
          monthly subscription.
        </p>

        <p>The current subscription plan is:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Subscription fee: R99 per month.</li>
          <li>Billing frequency: Monthly.</li>
          <li>Included allocation: 100 Teez tokens per active month.</li>
          <li>Service type: Digital Platform access.</li>
        </ul>

        <p>
          The applicable subscription price, billing frequency, token
          allocation, and payment terms will be displayed before payment is
          completed.
        </p>

        {/* 2 */}
        <h2 className="font-semibold text-white">
          2. Digital Delivery
        </h2>

        <p>
          No physical goods are delivered. Payments relate to digital Platform
          access and related digital subscription services.
        </p>

        <p>
          Digital delivery takes place through activation of the user’s
          subscription and access to the applicable Platform features.
        </p>

        {/* 3 */}
        <h2 className="font-semibold text-white">
          3. Subscription Activation
        </h2>

        <p>
          Subscription is activated immediately after registration and
          successful completion of the required subscription process.
        </p>

        <p>
          Users will approve the payment amount, subscription activation, and
          payment information in the provided payment portal.
        </p>

        <p>
          Once the subscription has been successfully activated, the user
          receives access to the applicable Platform playing features and the
          monthly allocation of 100 Teez tokens.
        </p>

        {/* 4 */}
        <h2 className="font-semibold text-white">
          4. Teez Tokens
        </h2>

        <p>
          Teez tokens are digital play credits used only within the Teez Golf
          Challenges Platform.
        </p>

        <p>
          Tokens may be used to create, enter, and participate in golf
          challenges or access other approved gameplay features.
        </p>

        <p>Teez tokens:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Have no cash or monetary value.</li>
          <li>Are not legal tender or electronic money.</li>
          <li>Cannot be withdrawn.</li>
          <li>Cannot be redeemed for cash.</li>
          <li>Cannot be converted into money or cryptocurrency.</li>
          <li>Cannot be exchanged for vouchers, goods, or external services.</li>
          <li>Cannot be sold or transferred between users for payment.</li>
          <li>May only be used for approved Platform gameplay.</li>
        </ul>

        <p>
          A user does not acquire ownership of any financial asset by receiving
          or holding Teez tokens.
        </p>

        <p>
          Tokens that have already been validly used to enter or participate in
          a challenge are not refundable or reversible.
        </p>

        {/* 5 */}
        <h2 className="font-semibold text-white">
          5. Subscription Cancellation
        </h2>

        <p>
          A user may cancel their Teez Golf Challenges subscription at any time
          through the Cancel Subscription link provided on the Platform.
        </p>

        <p>
          The user is responsible for completing the cancellation process
          through the provided cancellation page.
        </p>

        <button
          type="button"
          onClick={() => router.push("/cancel-subscription")}
          className="w-full py-4 rounded-2xl font-bold text-lg bg-[#39ff14] text-black shadow-[0_0_25px_#39ff14] mt-4 border border-[#b6ff00]"
        >
          Cancel Subscription
        </button>

        {/* 6 */}
        <h2 className="font-semibold text-white">
          6. Self-Service Cancellation
        </h2>

        <p>
          Subscription cancellation is completed through the self-service
          cancellation process available on the Platform.
        </p>

        <p>
          A cancellation request is only complete once the Platform confirms
          that the subscription has been cancelled.
        </p>

        <p>
          Users should retain any cancellation confirmation made available by
          the Platform.
        </p>

        {/* 7 */}
        <h2 className="font-semibold text-white">
          7. What Happens After Cancellation
        </h2>

        <p>
          Once unsubscribed, the user will no longer have access to the playing
          features but may re-subscribe at any time.
        </p>

        <p>
          Cancellation will remove the user’s player profile, challenge history,
          finalized results, ranking records, achievements, statistics, and
          remaining digital token records.
        </p>

        <p>
          Cancellation does not convert any unused or remaining Teez tokens into
          cash, money, goods, services, vouchers, credit, or any other form of
          value.
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
          <li>A duplicate subscription payment was processed.</li>

          <li>An incorrect payment amount was charged.</li>

          <li>
            Payment was completed but subscription access was not activated due
            to a verified technical issue.
          </li>

          <li>
            An administrative error caused an incorrect account or subscription
            allocation.
          </li>

          <li>
            A verified technical failure prevented delivery of the paid digital
            service.
          </li>

          <li>
            The user was charged after a valid cancellation had already been
            successfully processed before the applicable renewal date.
          </li>

          <li>
            A refund is required under applicable South African law.
          </li>

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
          Once subscription access has been activated and used, subscription
          payments are generally non-refundable, except where applicable law or
          a verified Platform, payment, technical, or administrative error
          requires otherwise.
        </p>

        <p>A refund will generally not be granted solely because:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>The user changed their mind after using the Platform.</li>

          <li>
            The user did not use all Platform features during the subscription
            period.
          </li>

          <li>
            The user did not use all remaining Teez tokens before cancelling.
          </li>

          <li>
            The user entered a challenge and was dissatisfied with their result,
            ranking, score, or performance.
          </li>

          <li>
            The user failed to cancel before a valid subscription payment was
            processed.
          </li>

          <li>
            The user’s account or access was restricted because of a breach of
            the Platform Terms and Conditions.
          </li>
        </ul>

        <p>
          Nothing in this section removes any rights that cannot lawfully be
          excluded under applicable South African law.
        </p>

        {/* 10 */}
        <h2 className="font-semibold text-white">
          10. Payment Errors
        </h2>

        <p>
          Users must report suspected duplicate charges, incorrect charges,
          unauthorised transactions, failed subscription activations, or failed
          payment allocations as soon as reasonably possible.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD may work with the relevant payment
          gateway, bank, or card issuer to investigate and resolve the reported
          payment issue.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD does not store payment card
          numbers, CVV numbers, card PINs, banking passwords, one-time PINs, or
          confidential banking login credentials on the Platform.
        </p>

        {/* 11 */}
        <h2 className="font-semibold text-white">
          11. Refund Request Timeframe
        </h2>

        <p>
          Refund requests should be submitted within 30 days after the relevant
          transaction date.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD may consider a later request where
          required by applicable law or where reasonable supporting
          circumstances exist.
        </p>

        {/* 12 */}
        <h2 className="font-semibold text-white">
          12. Refund Review Process
        </h2>

        <p>
          Refund requests must be reviewed and verified before approval.
        </p>

        <p>The company may request supporting information including:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Proof of payment.</li>
          <li>Payment reference.</li>
          <li>Registered email address.</li>
          <li>User ID.</li>
          <li>Transaction date.</li>
          <li>Bank or card confirmation.</li>
          <li>Payment gateway confirmation.</li>
          <li>Screenshots showing the reported issue.</li>
          <li>Any available cancellation confirmation.</li>
        </ul>

        <p>
          Honey Badger Technologies (PTY) LTD may reject a refund request where
          the information provided is false, misleading, fraudulent, abusive,
          incomplete, or cannot reasonably be verified.
        </p>

        {/* 13 */}
        <h2 className="font-semibold text-white">
          13. Refund Processing Time
        </h2>

        <p>
          Approved refunds will normally be processed within 7 business days
          where possible.
        </p>

        <p>
          The time required for funds to reflect may depend on the bank, card
          issuer, payment gateway, payment method, or payment processing system
          used.
        </p>

        <p>
          Refunds will normally be returned through the original payment method
          where reasonably possible.
        </p>

        {/* 14 */}
        <h2 className="font-semibold text-white">
          14. Token Balance Corrections
        </h2>

        <p>
          Where a verified technical, duplicate-processing, or administrative
          error caused an incorrect Teez token deduction or allocation, Honey
          Badger Technologies (PTY) LTD may:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Restore incorrectly deducted tokens.</li>
          <li>Reverse a duplicate token deduction.</li>
          <li>Correct the user’s in-app token balance.</li>
          <li>Make another fair in-app account correction.</li>
        </ul>

        <p>
          Token balance corrections are digital Platform corrections only. They
          do not represent a cash refund or payment to the user.
        </p>

        {/* 15 */}
        <h2 className="font-semibold text-white">
          15. Fraud, Abuse and Chargebacks
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may refuse a refund where there is
          evidence of fraud, false claims, Platform manipulation, duplicate
          refund claims, chargeback misuse, payment abuse, or a material breach
          of the Platform Terms and Conditions.
        </p>

        <p>
          The company may temporarily suspend or restrict an account while a
          suspected payment, refund, security, fraud, or chargeback issue is
          investigated.
        </p>

        <p>
          Users should first contact Honey Badger Technologies (PTY) LTD
          regarding a disputed payment so that the company has a reasonable
          opportunity to investigate and resolve the matter.
        </p>

        {/* 16 */}
        <h2 className="font-semibold text-white">
          16. Complaints and Dispute Resolution
        </h2>

        <p>
          Users should first contact Honey Badger Technologies (PTY) LTD so that
          the company can investigate and attempt to resolve the refund,
          cancellation, payment, subscription, or digital delivery dispute
          directly.
        </p>

        <p>
          If the matter cannot be resolved, the user may approach an applicable
          South African consumer protection body, bank, card issuer, payment
          provider, regulator, court, or recognised ombudsman where the matter
          falls within that body’s jurisdiction.
        </p>

        {/* 17 */}
        <h2 className="font-semibold text-white">
          17. South African Consumer Rights
        </h2>

        <p>
          This policy is governed by the laws of the Republic of South Africa.
        </p>

        <p>
          Nothing in this policy is intended to remove, reduce, or limit any
          legal right that a user may have under applicable South African law.
        </p>

        <p>
          Refund and cancellation requests will be handled fairly, reasonably,
          and in accordance with applicable legal obligations.
        </p>

        {/* 18 */}
        <h2 className="font-semibold text-white">
          18. Contact Details
        </h2>

        <p>
          Refund requests, payment-error reports, cancellation disputes, and
          digital delivery complaints may be submitted using the following
          contact details:
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
          Last updated: July 2026
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