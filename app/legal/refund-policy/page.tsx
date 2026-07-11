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
          This Policy applies to subscription payments, digital Platform access,
          subscription cancellation, payment errors, refunds, Teez Token
          corrections, and related digital services provided through Teez Golf
          Challenges.
        </p>

        <p>
          Teez Golf Challenges is owned and operated by Honey Badger
          Technologies (PTY) LTD.
        </p>

        <p>
          This Policy must be read together with the Platform Terms &
          Conditions and Privacy Policy.
        </p>

        {/* 1 */}
        <h2 className="font-semibold text-white">
          1. Subscription Service
        </h2>

        <p>
          Teez Golf Challenges is a subscription-based, skill-based competitive
          golf Platform.
        </p>

        <p>
          Access to the Platform&apos;s subscription-only gameplay features
          requires an active monthly subscription.
        </p>

        <p>The current subscription plan includes:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Subscription fee: R99 per month.</li>
          <li>Billing frequency: Monthly.</li>
          <li>Included allocation: 100 Teez Tokens per active month.</li>
          <li>Service type: Digital Platform access.</li>
        </ul>

        <p>
          The applicable subscription amount, billing frequency, included Teez
          Token allocation, and payment terms will be displayed before payment
          is completed.
        </p>

        {/* 2 */}
        <h2 className="font-semibold text-white">
          2. Digital Delivery
        </h2>

        <p>
          No physical goods are delivered. Subscription payments relate entirely
          to digital Platform access and related digital subscription services.
        </p>

        <p>
          Digital delivery takes place through activation of the user&apos;s
          subscription and access to the applicable Platform features.
        </p>

        <p>Digital delivery may be confirmed through:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Subscription activation.</li>
          <li>Player dashboard access.</li>
          <li>Player profile access.</li>
          <li>Access to subscription-only gameplay features.</li>
          <li>Allocation of 100 Teez Tokens to the in-app wallet.</li>
          <li>An account or payment confirmation displayed by the Platform.</li>
        </ul>

        {/* 3 */}
        <h2 className="font-semibold text-white">
          3. Automatic Subscription Activation
        </h2>

        <p>
          Subscription activation is completed automatically through the
          Platform after the required registration, verification, and payment
          steps have been successfully completed.
        </p>

        <p>
          Users approve the applicable subscription amount and payment
          information through the approved payment portal.
        </p>

        <p>
          Once successful payment and subscription activation have been
          confirmed, the Platform automatically grants the applicable access and
          allocates 100 Teez Tokens to the user&apos;s in-app wallet.
        </p>

        <p>
          No email request, telephone request, support ticket, administrator
          request, or manual approval is required for normal subscription
          activation.
        </p>

        <p>
          A user should contact Honey Badger Technologies (PTY) LTD only where a
          genuine technical, payment, or system error prevents automatic
          activation from being completed correctly.
        </p>

        {/* 4 */}
        <h2 className="font-semibold text-white">
          4. Teez Tokens
        </h2>

        <p>
          Teez Tokens are digital play credits used only within the Teez Golf
          Challenges Platform.
        </p>

        <p>
          Teez Tokens may be used to create, enter, and participate in approved
          golf challenges or access other approved gameplay features.
        </p>

        <p>Teez Tokens:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Are digital play credits only.</li>
          <li>Have no cash or monetary value.</li>
          <li>Are not legal tender or electronic money.</li>
          <li>Cannot be withdrawn.</li>
          <li>Cannot be redeemed for cash.</li>
          <li>Cannot be converted into money or cryptocurrency.</li>
          <li>Cannot be exchanged for vouchers, goods, or services.</li>
          <li>Cannot be sold or transferred between users for payment.</li>
          <li>May only be used for approved Platform gameplay.</li>
        </ul>

        <p>
          A user does not acquire ownership of a financial asset by receiving or
          holding Teez Tokens.
        </p>

        <p>
          Teez Tokens that have already been validly used for Platform gameplay
          are not refundable, reversible, or convertible into external value.
        </p>

        {/* 5 */}
        <h2 className="font-semibold text-white">
          5. Subscription Cancellation
        </h2>

        <p>
          A user may cancel their Teez Golf Challenges subscription at any time
          through the self-service Cancel Subscription functionality provided on
          the Platform.
        </p>

        <p>
          No email request, telephone request, support ticket, administrator
          request, written notice, or manual approval is required to cancel a
          subscription during normal Platform operation.
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
          6. Immediate Effect of Cancellation
        </h2>

        <p>
          Cancellation becomes effective immediately once the Platform confirms
          that the self-service cancellation process has been successfully
          completed.
        </p>

        <p>
          From that point, the user immediately loses access to
          subscription-only playing and gameplay features.
        </p>

        <p>
          A cancellation is not completed merely because a user stops using the
          Platform, deletes a shortcut, closes a browser, removes an application,
          or sends an informal message.
        </p>

        <p>
          The user must complete the self-service cancellation process and
          receive confirmation from the Platform.
        </p>

        {/* 7 */}
        <h2 className="font-semibold text-white">
          7. What Happens After Cancellation
        </h2>

        <p>
          Once unsubscribed, the user will no longer have access to
          subscription-only playing features.
        </p>

        <p>
          Access may be removed or deactivated for features including:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Creating or entering challenges.</li>
          <li>Player dashboard functionality.</li>
          <li>Subscription-only player profile functionality.</li>
          <li>Rankings and statistics functionality.</li>
          <li>Achievements and competition history functionality.</li>
          <li>Live gameplay and scoring functionality.</li>
          <li>Remaining Teez Token access.</li>
          <li>Other subscription-only Platform features.</li>
        </ul>

        <p>
          Cancellation does not convert unused or remaining Teez Tokens into
          cash, money, credit, goods, services, vouchers, or any other form of
          external value.
        </p>

        <p>
          Account and Platform records may be retained where reasonably required
          for security, fraud prevention, legal compliance, dispute resolution,
          record keeping, or as described in the Privacy Policy.
        </p>

        <p>
          A user may subscribe again at any time by completing the normal
          self-service subscription process through the Platform.
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

          <li>An incorrect subscription amount was charged.</li>

          <li>
            Payment was successfully completed but subscription access was not
            activated because of a verified technical or system error.
          </li>

          <li>
            A verified administrative error caused an incorrect account,
            payment, or subscription allocation.
          </li>

          <li>
            A verified technical failure prevented delivery of the paid digital
            subscription service.
          </li>

          <li>
            The user was charged after a valid cancellation had already been
            successfully completed before the applicable renewal transaction.
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
          Once subscription access has been successfully activated and used,
          subscription payments are generally non-refundable, except where
          applicable law or a verified payment, technical, Platform, or
          administrative error requires otherwise.
        </p>

        <p>A refund will generally not be granted solely because:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>The user changed their mind after using the Platform.</li>

          <li>
            The user did not use all Platform features during the subscription
            period.
          </li>

          <li>
            The user did not use all available or remaining Teez Tokens before
            cancelling.
          </li>

          <li>
            The user was dissatisfied with a challenge result, ranking, score,
            statistic, achievement, or personal performance.
          </li>

          <li>
            The user stopped using the Platform without completing the
            self-service cancellation process.
          </li>

          <li>
            The user failed to cancel before a valid recurring subscription
            payment was processed.
          </li>

          <li>
            The user&apos;s Account or access was restricted because of fraud,
            cheating, payment abuse, misuse, or a material breach of the
            Platform Terms & Conditions.
          </li>
        </ul>

        <p>
          Nothing in this section removes or limits any right that cannot
          lawfully be excluded under applicable South African law.
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
          Honey Badger Technologies (PTY) LTD may work with the applicable
          payment gateway, acquiring bank, payment provider, bank, or card issuer
          to investigate and resolve the reported payment issue.
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

        <p>
          This refund request process applies to genuine payment, delivery, or
          technical issues. It is not required for routine subscription
          cancellation, which must be completed through the Platform&apos;s
          self-service cancellation functionality.
        </p>

        {/* 12 */}
        <h2 className="font-semibold text-white">
          12. Refund Review Process
        </h2>

        <p>
          Refund requests must be reviewed and verified before approval.
        </p>

        <p>The Company may request supporting information including:</p>

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
          Approved refunds will normally be submitted for processing within
          7 business days where reasonably possible.
        </p>

        <p>
          The time required for the funds to reflect may depend on the bank,
          card issuer, payment gateway, payment provider, payment method, or
          payment processing system used.
        </p>

        <p>
          Refunds will normally be returned through the original payment method
          where reasonably possible.
        </p>

        {/* 14 */}
        <h2 className="font-semibold text-white">
          14. Teez Token Balance Corrections
        </h2>

        <p>
          Where a verified technical, duplicate-processing, payment, or
          administrative error caused an incorrect Teez Token deduction or
          allocation, Honey Badger Technologies (PTY) LTD may:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Restore incorrectly deducted Teez Tokens.</li>
          <li>Reverse a duplicate Teez Token deduction.</li>
          <li>Correct the user&apos;s in-app Teez Token balance.</li>
          <li>Make another fair in-app account correction.</li>
        </ul>

        <p>
          Teez Token balance corrections are digital Platform corrections only.
          They do not represent a cash refund, payment, voucher, or transfer of
          financial value to the user.
        </p>

        {/* 15 */}
        <h2 className="font-semibold text-white">
          15. Fraud, Abuse and Chargebacks
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may refuse a refund where there is
          evidence of fraud, false claims, Platform manipulation, duplicate
          refund claims, chargeback misuse, payment abuse, or a material breach
          of the Platform Terms & Conditions.
        </p>

        <p>
          The Company may temporarily suspend or restrict an Account while a
          suspected payment, refund, security, fraud, or chargeback issue is
          investigated.
        </p>

        <p>
          Users should first report a disputed payment to Honey Badger
          Technologies (PTY) LTD so that the Company has a reasonable
          opportunity to investigate and attempt to resolve the matter.
        </p>

        <p>
          Nothing in this section prevents a user from exercising any right that
          cannot lawfully be excluded under applicable South African law.
        </p>

        {/* 16 */}
        <h2 className="font-semibold text-white">
          16. Complaints and Dispute Resolution
        </h2>

        <p>
          Users may contact Honey Badger Technologies (PTY) LTD regarding
          genuine refund, payment, subscription activation, cancellation
          confirmation, or digital delivery disputes.
        </p>

        <p>
          Routine registration, subscription activation, subscription
          cancellation, and re-subscription must be completed through the
          Platform&apos;s automated self-service functionality and do not
          require administrator intervention.
        </p>

        <p>
          If a genuine dispute cannot be resolved directly, the user may
          approach an applicable South African consumer protection body, bank,
          card issuer, payment provider, regulator, court, or recognised
          ombudsman where the matter falls within that body&apos;s jurisdiction.
        </p>

        {/* 17 */}
        <h2 className="font-semibold text-white">
          17. South African Consumer Rights
        </h2>

        <p>
          This Policy is governed by the laws of the Republic of South Africa.
        </p>

        <p>
          Nothing in this Policy is intended to remove, reduce, or limit any
          legal right that a user may have under applicable South African law.
        </p>

        <p>
          Refund, payment-error, and digital delivery disputes will be handled
          fairly, reasonably, and in accordance with applicable legal
          obligations.
        </p>

        {/* 18 */}
        <h2 className="font-semibold text-white">
          18. Contact Details
        </h2>

        <p>
          Contact details for genuine refund requests, payment-error reports,
          cancellation confirmation disputes, and digital delivery complaints:
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