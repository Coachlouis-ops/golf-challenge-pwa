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

        <p className="text-sm text-gray-400 mt-2">
          Teez Golf Challenges platform, subscription, token, and competition
          terms
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-5 max-w-4xl w-full mx-auto pb-10">
        <p className="font-semibold text-white">
          Teez Golf Challenges – Terms and Conditions
        </p>

        <p>
          These Terms and Conditions govern access to and use of the Teez Golf
          Challenges platform (“the Platform”), operated by Honey Badger
          Technologies (PTY) LTD.
        </p>

        <p>
          By registering an account, accepting these Terms, subscribing to the
          Platform, or using any Platform service, you agree to these terms and conditions.
        </p>

        {/* 1 */}
        <h2 className="font-semibold text-white">
          1. Company and Platform Operator
        </h2>

        <p>
          The Platform is operated by Honey Badger Technologies (PTY) LTD.
        </p>

        <p>
          Registration Number: 2026/102722/07
          <br />
          Trading Platform: Teez Golf Challenges
          <br />
          Country: South Africa
          <br />
          Transaction Currency: South African Rand (ZAR)
        </p>

        {/* 2 */}
        <h2 className="font-semibold text-white">
          2. Nature of the Platform
        </h2>

        <p>
          Teez Golf Challenges is a subscription-based, skill-based competitive
          golf platform.
        </p>

        <p>
          The Platform allows registered players to create player profiles,
          enter golf challenges, invite opponents, record scores, view live
          scoreboards, build competition history, earn ranking points, monitor
          statistics, and compete for positions on Platform leaderboards.
        </p>

        <p>
          The Platform is designed to promote golf competition, player
          development, performance tracking, rankings, achievements, and
          competitive recognition.
        </p>

        <p>
          Teez Golf Challenges does not facilitate gambling, betting, wagering,
          casino-style games, games of chance, cash prizes, cash payouts, or
          token redemption.
        </p>

        {/* 3 */}
        <h2 className="font-semibold text-white">
          3. Registration and Account Setup
        </h2>

        <p>
          After registration the user will have full access to:
        </p>

        <ol className="list-decimal pl-6 space-y-1">
          <li>Creating a user account.</li>
          <li>Verifying the registered email address.</li>
          <li>Logging into the Platform.</li>
          <li>Creating a player profile.</li>
          <li>Verifying the registered mobile number.</li>
          <li>Activating a subscription.</li>
          <li>Receiving access to the player dashboard.</li>
        </ol>

        <p>
          Users must provide accurate and current information. Users are
          responsible for protecting their login details and for all activity
          conducted through their accounts.
        </p>

        {/* 4 */}
        <h2 className="font-semibold text-white">
          4. Subscription Structure
        </h2>

        <p>
          Access to the main features of Teez Golf Challenges requires an active
          monthly subscription.
        </p>

        <p>
          The current subscription plan is:
        </p>

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


        {/* 5 */}
        <h2 className="font-semibold text-white">
          5. Subscription Activation and Digital Delivery
        </h2>

        <p>
          No physical goods are delivered. Payments relate to digital Platform
          access and related digital subscription services.
        </p>

        <p>
          Subscription is active immediately after registration. 
        </p>

        {/* 6 */}
        <h2 className="font-semibold text-white">
          6. Cancellation and Unsubscription
        </h2>

        <p>
          A user may cancel their Teez Golf Challenges subscription at any time
          through the Cancel Subscription link provided on the Platform.
        </p>

        <p>
          Once unsubscribed, the user will no longer have access to the playing features, but can 
          re-subscribe at any time.
        </p>

        <p>
          Cancellation will remove the user’s player profile, challenge
          history, finalized results, ranking records, achievements, statistics,
          or remaining digital token records.
        </p>

        <button
          type="button"
          onClick={() => router.push("/cancel-subscription")}
          className="w-full py-3 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-500 transition"
        >
          Cancel Subscription
        </button>

        {/* 7 */}
        <h2 className="font-semibold text-white">
          7. Teez Tokens
        </h2>

        <p>
          Teez tokens are digital play credits used only within the Teez Golf
          Challenges Platform.
        </p>

        <p>
          Tokens may be used to create, enter, and participate in golf
          challenges or access other approved gameplay features.
        </p>

        <p>
          Teez tokens:
        </p>

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
        

        {/* 10 */}
        <h2 className="font-semibold text-white">
          10. Golf Challenges and Results
        </h2>

        <p>
          All golf challenges are based on participant performance, scoring,
          player skill, and the selected competition rules.
        </p>

        <p>
          The challenge creator is responsible for selecting the correct
          challenge format, scoring method, course, participants.
        </p>

        <p>
          Participants are responsible for ensuring that submitted scores and
          results are complete and accurate.
        </p>

        <p>
          Once a challenge has been finalized, the challenge may be locked and
          may not be reopened through the normal user interface.
        </p>

        {/* 11 */}
        <h2 className="font-semibold text-white">
          11. Rankings, Statistics and Achievements
        </h2>

        <p>
          Player rankings, positions, statistics, streaks, achievements, match
          history, and performance records are digital Platform records.
        </p>

        <p>
          These records are intended to measure and recognise player
          performance and competitive progress.
        </p>

        <p>
          Rankings, statistics, achievements, and Platform positions have no
          cash value and do not create an entitlement to money, prizes,
          vouchers, goods, or external rewards.
        </p>

        <p>
          The Platform may update its ranking calculations, scoring models,
          divisions, or leaderboard structures where reasonably necessary to
          improve fairness, accuracy, or Platform operation.
        </p>

        {/* 12 */}
        <h2 className="font-semibold text-white">
          12. Payments
        </h2>

        <p>
          An approved payment gateway is provided, which gives the user save and easy access to the game. 
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD does not store payment card
          numbers, CVV numbers, card PINs, banking passwords, one-time PINs, or
          confidential banking login credentials on the Platform.
        </p>

        <p>
          Users will approve the payment amount, subscription activation
          and payment information in the provided payment portal. 
        </p>

        {/* 13 */}
        <h2 className="font-semibold text-white">
          13. Refunds
        </h2>

        <p>
          A refund will immediately be done in the unlikely situation where: 
        </p>

        <ul className="list-disc pl-6 space-y-1">
          
          <li>
            Payment was done but subscription access was not activated, due to, e.g. technical issue.
          </li>
          <li>
            An administrative error caused an incorrect account or subscription
            allocation.
          </li>
          <li>
            A verified technical failure prevented delivery of the paid digital
            service.
          </li>
        </ul>

        <p>
          Once subscription access has been activated and used, subscription
          payments are generally non-refundable.
        </p>


        <button
          type="button"
          onClick={() => router.push("/legal/refund-policy")}
          className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
        >
          View Refund, Cancellation & Delivery Policy
        </button>

        {/* 15 */}
        <h2 className="font-semibold text-white">
          15. Personal Information and Privacy
        </h2>

        <p>
          Personal information may be collected and processed for account
          registration, identity and contact verification, subscription
          administration, payment confirmation, player profiles, challenge
          participation, rankings, customer support, fraud prevention, security,
          dispute resolution, and legal compliance.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD will take reasonable steps to
          protect personal information and process it in accordance with its
          Privacy Policy and applicable South African data protection law.
        </p>

        <p>
          User profile information, competition participation, rankings, and
          selected performance information may be visible to other authenticated
          Platform users where necessary for Platform functionality.
        </p>

        <button
          type="button"
          onClick={() => router.push("/privacy")}
          className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
        >
          View Privacy Policy
        </button>
     

        {/* 18 */}
        <h2 className="font-semibold text-white">
          18. User Responsibility and Golf Participation
        </h2>

        <p>
          Users are responsible for their participation in real-world golf
          activities and must comply with golf course rules, safety requirements,
          club policies, competition rules, and applicable laws.
        </p>

        <p>
          The Platform records and manages digital competition information but
          does not control the physical golf course, weather, player conduct,
          equipment, travel, or other real-world circumstances.
        </p>

        {/* 19 */}
        <h2 className="font-semibold text-white">
          19. Platform Availability
        </h2>

        <p>
          The Platform is provided on an “as is” and “as available” basis. Honey
          Badger Technologies (PTY) LTD will take reasonable steps to maintain
          availability and correct verified technical errors.
        </p>

        <p>
          Continuous, uninterrupted, or error-free access cannot be guaranteed.
          Maintenance, upgrades, network failures, third-party service failures,
          or circumstances outside the company’s reasonable control may
          temporarily affect access.
        </p>

        {/* 20 */}
        <h2 className="font-semibold text-white">
          20. Limitation of Liability
        </h2>

        <p>
          To the maximum extent permitted by applicable law, Honey Badger
          Technologies (PTY) LTD and Teez Golf Challenges will not be liable for
          indirect, incidental, special, or consequential loss arising from use
          of the Platform.
        </p>

        <p>
          Nothing in these Terms excludes or limits liability or consumer rights
          that cannot lawfully be excluded or limited under South African law.
        </p>

        {/* 21 */}
        <h2 className="font-semibold text-white">
          21. Intellectual Property
        </h2>

        <p>
          The Teez Golf Challenges name, branding, visual designs, software,
          systems, content, ranking models, competition tools, documentation, and
          related intellectual property remain the property of Honey Badger
          Technologies (PTY) LTD or its authorised licensors.
        </p>

        <p>
          Users may not copy, reproduce, reverse engineer, sell, license, or
          commercially exploit Platform content or systems without written
          permission.
        </p>

        {/* 22 */}
        <h2 className="font-semibold text-white">
          22. Complaints and Disputes
        </h2>

        <p>
          Users should first contact Honey Badger Technologies (PTY) LTD
          regarding complaints, payment disputes, subscription issues, account
          issues, technical errors, or refund requests so that the matter can be
          investigated.
        </p>

        <p>
          Nothing in these Terms prevents a user from exercising any right or
          approaching an appropriate consumer protection body, bank, card issuer,
          payment provider, regulator, court, or ombudsman where applicable.
        </p>

        {/* 23 */}
        <h2 className="font-semibold text-white">
          23. Governing Law
        </h2>

        <p>
          These Terms are governed by the laws of the Republic of South Africa.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD chooses the following address as
          its domicilium citandi et executandi for formal notices and legal
          process:
        </p>

        <p>
          71 Duke Close
          <br />
          Silver Stream Estate
          <br />
          Pretoria
          <br />
          Gauteng
          <br />
          0081
          <br />
          South Africa
        </p>

        {/* 24 */}
        <h2 className="font-semibold text-white">
          24. Changes to These Terms
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may update these Terms where
          reasonably necessary to reflect Platform changes, legal requirements,
          payment-provider requirements, security updates, or changes to the
          subscription structure.
        </p>

        <p>
          The updated Terms will be published on the Platform. Where a material
          change requires renewed acceptance, the Platform may require the user
          to accept the updated Terms before continuing.
        </p>

        {/* 25 */}
        <h2 className="font-semibold text-white">
          25. Contact Details
        </h2>

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
      </div>

      {/* ACCEPT SECTION */}
      <div className="px-6 pb-8 pt-4 border-t border-gray-800 bg-black">
        <div className="max-w-4xl mx-auto">
          <label className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="w-5 h-5 mt-0.5"
            />

            <span className="text-sm">
              I have read and accept the Terms & Conditions, including the
              monthly subscription, digital token rules, and cancellation terms.
            </span>
          </label>

          <button
            disabled={!accepted}
            onClick={() => router.push("/register")}
            className={`w-full py-4 rounded-2xl font-semibold text-lg ${
              accepted
                ? "bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88]"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue Subscription
          </button>
        </div>
      </div>
    </div>
  );
}