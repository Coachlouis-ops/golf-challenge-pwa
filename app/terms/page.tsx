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
        <h1 className="text-2xl font-bold">Platform Terms & Conditions</h1>

        <p className="text-sm text-gray-400 mt-2">
          Teez Golf Challenges platform, participation, token, payment, and
          competition terms
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-5 max-w-4xl w-full mx-auto pb-10">
        <p className="font-semibold text-white">
          Platform Terms & Conditions
        </p>

        <p>
          Welcome to Teez Golf Challenges, a skill-based competitive golf
          platform owned and operated by{" "}
          <strong>Honey Badger Technologies (PTY) LTD</strong>
          {" "}(&quot;Honey Badger Technologies&quot;, &quot;Company&quot;,
          &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
        </p>

        <p>
          These Platform Terms & Conditions (&quot;Terms&quot;) govern your
          access to and use of the Teez Golf Challenges Platform, including our
          website, applications, player dashboard, Participation Access, digital
          gameplay systems, Teez Play Tokens, rankings, live scoreboards,
          competitions, and all related digital services.
        </p>

        <p>
          By creating an Account, activating Participation Access, purchasing
          Teez Play Tokens, accepting these Terms, or continuing to use any part
          of the Platform, you confirm that you have read, understood, and agree
          to be legally bound by these Terms, our Privacy Policy, Payment &
          Participation Policy, and Refund & Delivery Policy.
        </p>

        <p>
          If you do not agree with these Terms, you may not register for or use
          the Platform.
        </p>

        <p>
          These Terms govern use of the Teez Golf Challenges Platform. Payment
          processing, refunds, privacy, cookies, and other legal matters may
          also be governed by separate policies, which together form part of
          your agreement with Honey Badger Technologies (PTY) LTD.
        </p>

        <h2 className="font-semibold text-white">1. Definitions</h2>

        <p>
          Unless the context indicates otherwise, the following terms have the
          meanings set out below:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Account</strong> means the registered Teez Golf Challenges
            user account created by a user.
          </li>
          <li>
            <strong>Challenge</strong> means any golf competition, match, event,
            leaderboard event, or scoring activity created or participated in
            through the Platform.
          </li>
          <li>
            <strong>Company</strong> means Honey Badger Technologies (PTY) LTD,
            Registration Number 2026/102722/07.
          </li>
          <li>
            <strong>Digital Services</strong> means all online services made
            available through the Platform, including player profiles,
            scoreboards, rankings, statistics, achievements, Teez Play Tokens,
            competitions, Participation Access, and related functionality.
          </li>
          <li>
            <strong>Participation Access</strong> means the one-time digital
            access entitlement activated after a successful qualifying payment.
          </li>
          <li>
            <strong>Platform</strong> means the Teez Golf Challenges website,
            applications, software, systems, services, databases, APIs,
            dashboards, scoreboards, and associated digital infrastructure.
          </li>
          <li>
            <strong>Teez Play Tokens</strong> means digital participation and
            play credits issued by the Platform solely for approved gameplay
            and Platform participation.
          </li>
          <li>
            <strong>User</strong>, <strong>You</strong>, or{" "}
            <strong>Your</strong> means any person who registers for or uses the
            Platform.
          </li>
        </ul>

        <h2 className="font-semibold text-white">
          2. Acceptance of these Terms
        </h2>

        <p>
          By registering an Account, activating Participation Access, purchasing
          Teez Play Tokens, or accessing any part of the Platform, you
          acknowledge that you have read and accepted these Terms.
        </p>

        <p>
          If you are accepting these Terms on behalf of a company,
          organisation, golf club, or other legal entity, you confirm that you
          have authority to bind that entity to these Terms.
        </p>

        <p>
          You may not use the Platform if doing so would violate applicable
          law, regulation, court order, or contractual obligation.
        </p>

        <h2 className="font-semibold text-white">3. Eligibility</h2>

        <p>To use the Platform you must:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate and current registration information.</li>
          <li>Register using your own identity.</li>
          <li>Maintain the security of your Account credentials.</li>
          <li>Comply with these Terms and all applicable laws.</li>
        </ul>

        <p>
          You are responsible for activity that occurs through your Account
          unless you notify us of unauthorised use without unreasonable delay.
        </p>

        <h2 className="font-semibold text-white">
          4. Account Registration
        </h2>

        <p>
          Registration is completed through the Platform&apos;s self-service
          process.
        </p>

        <p>During registration the Platform may require users to:</p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Create an Account.</li>
          <li>Verify their email address.</li>
          <li>Verify their mobile number.</li>
          <li>Create a player profile.</li>
          <li>Activate Participation Access.</li>
        </ol>

        <p>
          Access to paid participation features is managed by the Platform once
          the required registration, verification, and payment steps have been
          successfully completed.
        </p>

        <h2 className="font-semibold text-white">
          5. Email and Mobile Verification
        </h2>

        <p>
          Certain Platform features require successful verification of your
          registered email address and mobile number.
        </p>

        <p>
          Verification helps protect user Accounts, maintain Platform integrity,
          improve competition security, reduce fraud, and support reliable
          communication.
        </p>

        <h2 className="font-semibold text-white">
          6. Participation Access
        </h2>

        <p>
          Teez Golf Challenges operates on a pay-as-you-play participation
          model. Competitive participation features require Participation
          Access.
        </p>

        <p>The current Participation Access purchase includes:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Participation Access payment: R149.</li>
          <li>100 Teez Play Tokens.</li>
          <li>Digital Platform participation access.</li>
          <li>One-time authorised payment.</li>
          <li>No automatic renewal.</li>
          <li>No recurring monthly deduction.</li>
        </ul>

        <p>
          Participation Access does not expire merely because you do not
          purchase additional Teez Play Tokens.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD may introduce revised pricing,
          promotional offers, token packages, or additional paid digital
          services. The applicable price, currency, and allocation will be
          displayed before payment is authorised.
        </p>

        <h2 className="font-semibold text-white">
          7. Participation Activation
        </h2>

        <p>Participation Access activates after:</p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>The required registration process has been completed.</li>
          <li>The required verification steps have been completed.</li>
          <li>The Participation Access payment has been successfully authorised.</li>
          <li>The Platform confirms successful payment and fulfilment.</li>
        </ol>

        <p>
          Once activated, the Platform grants the applicable participation
          access and allocates 100 Teez Play Tokens to the user&apos;s digital
          wallet.
        </p>

        <p>
          Digital delivery occurs through Participation Access activation,
          Platform access, wallet allocation, player dashboard access, profile
          availability, and related Platform functionality.
        </p>

        <h2 className="font-semibold text-white">
          8. Teez Play Token Top-Ups
        </h2>

        <p>
          Players with Participation Access may purchase additional Teez Play
          Tokens whenever required.
        </p>

        <p>The current standard top-up includes:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Top-up price: R149.</li>
          <li>Allocation: 100 Teez Play Tokens.</li>
          <li>One-time authorised payment.</li>
          <li>No automatic top-up.</li>
          <li>No recurring billing.</li>
        </ul>

        <p>
          A player chooses when to purchase additional Teez Play Tokens. No
          further payment is taken unless the player initiates and authorises a
          new transaction.
        </p>

        <h2 className="font-semibold text-white">
          9. No Recurring Subscription
        </h2>

        <p>
          Participation Access and standard Teez Play Token top-ups are
          one-time purchases.
        </p>

        <p>
          There is no automatic monthly subscription, no automatic renewal, and
          no recurring monthly participation deduction.
        </p>

        <p>
          A player who does not wish to purchase more Teez Play Tokens simply
          does not initiate another top-up payment.
        </p>

        <h2 className="font-semibold text-white">
          10. Licence to Use the Platform
        </h2>

        <p>
          Subject to these Terms and Participation Access where required, Honey
          Badger Technologies (PTY) LTD grants you a limited, personal,
          non-transferable, non-exclusive, and revocable licence to access and
          use Teez Golf Challenges solely for its intended purpose.
        </p>

        <p>
          This licence does not transfer ownership rights in the Platform or any
          part of it.
        </p>

        <h2 className="font-semibold text-white">
          11. Teez Play Tokens
        </h2>

        <p>
          Teez Play Tokens are digital participation and play credits issued
          exclusively for approved Platform functionality.
        </p>

        <p>Teez Play Tokens:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Are digital play and participation credits only.</li>
          <li>Have no cash or monetary value.</li>
          <li>Are not legal tender.</li>
          <li>Are not electronic money.</li>
          <li>Are not cryptocurrency.</li>
          <li>Are not financial instruments.</li>
          <li>Cannot be redeemed or withdrawn as cash.</li>
          <li>Cannot be converted into cash.</li>
          <li>Cannot be sold or transferred for payment.</li>
          <li>May only be used for approved Platform activities.</li>
        </ul>

        <p>
          Teez Play Tokens remain available in the player&apos;s wallet until
          used, subject to legitimate Platform corrections, Account enforcement,
          these Terms, and applicable law.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD may correct token balances where a
          verified technical, payment-processing, duplicate-processing, or
          administrative error has occurred.
        </p>

        <h2 className="font-semibold text-white">
          12. Golf Challenges
        </h2>

        <p>
          Teez Golf Challenges provides digital tools to organise and
          participate in skill-based golf competitions.
        </p>

        <p>Challenge creators are responsible for selecting the correct:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Competition format.</li>
          <li>Scoring format.</li>
          <li>Golf course.</li>
          <li>Participants.</li>
          <li>Applicable challenge settings.</li>
        </ul>

        <p>
          Every participant is responsible for ensuring that scores submitted
          through the Platform are complete, accurate, and honestly recorded.
        </p>

        <h2 className="font-semibold text-white">
          13. Rankings, Statistics and Achievements
        </h2>

        <p>
          Rankings, statistics, achievements, streaks, match history,
          competition history, and leaderboard positions are digital Platform
          records intended to recognise player participation and performance.
        </p>

        <p>These records:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Do not represent money.</li>
          <li>Do not represent financial assets.</li>
          <li>Have no cash value.</li>
          <li>Create no ownership rights.</li>
        </ul>

        <h2 className="font-semibold text-white">
          14. Fair Play and Competition Integrity
        </h2>

        <p>
          Teez Golf Challenges is designed as a skill-based competitive golf
          Platform. Fair competition is fundamental to the integrity of the
          Platform.
        </p>

        <p>The following conduct is prohibited:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Submitting false scores.</li>
          <li>Submitting another person&apos;s score as your own.</li>
          <li>Collusion between players.</li>
          <li>Manipulating rankings or statistics.</li>
          <li>Using multiple Accounts to obtain an unfair advantage.</li>
          <li>Knowingly providing false player information.</li>
          <li>Attempting to exploit software bugs or Platform errors.</li>
          <li>Interfering with Platform security.</li>
          <li>Using automated software, bots, or scripts.</li>
          <li>Any conduct intended to undermine fair competition.</li>
        </ul>

        <h2 className="font-semibold text-white">
          15. User Responsibilities
        </h2>

        <p>
          Users are responsible for using the Platform lawfully, honestly, and
          in accordance with these Terms.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Maintain accurate Account information.</li>
          <li>Protect login credentials.</li>
          <li>Maintain confidentiality of the Account.</li>
          <li>Keep registered contact details current.</li>
          <li>Comply with applicable golf rules during participation.</li>
          <li>Submit truthful and accurate scores.</li>
          <li>Use the Platform only for its intended purpose.</li>
        </ul>

        <p>
          Participation in real-world golf activities takes place at the
          user&apos;s own risk. Honey Badger Technologies (PTY) LTD does not
          organise, supervise, or control real-world golf activities and is not
          responsible for golf course conditions, weather, travel, player
          conduct, equipment, injuries, or other real-world circumstances.
        </p>

        <h2 className="font-semibold text-white">
          16. Prohibited Conduct
        </h2>

        <p>
          Users may not use the Platform in any unlawful, fraudulent, abusive,
          or harmful manner.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Violate applicable law or regulation.</li>
          <li>Impersonate another person.</li>
          <li>Share, sell, or transfer Accounts.</li>
          <li>Provide false identity information.</li>
          <li>Attempt to bypass Platform security.</li>
          <li>Introduce malware, viruses, or malicious code.</li>
          <li>Reverse engineer, copy, or exploit Platform software.</li>
          <li>Attempt unauthorised access to Platform systems.</li>
          <li>Interfere with Platform availability.</li>
          <li>Manipulate Participation Access, payments, or token balances.</li>
          <li>Attempt to obtain unauthorised refunds.</li>
          <li>Abuse payment systems or chargeback procedures.</li>
          <li>
            Use the Platform to conduct gambling, betting, wagering, or games of
            chance.
          </li>
          <li>Use the Platform to facilitate unlawful transactions.</li>
        </ul>

        <h2 className="font-semibold text-white">
          17. Platform Updates and Availability
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may introduce new features,
          modify existing functionality, improve security, correct errors,
          perform maintenance, or remove obsolete features where reasonably
          necessary.
        </p>

        <p>
          While we aim to provide reliable service, uninterrupted access cannot
          be guaranteed.
        </p>

        <h2 className="font-semibold text-white">
          18. Suspension and Termination
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may suspend, restrict, or
          terminate an Account where reasonably necessary to protect Platform
          security, protect other users, investigate fraud, investigate payment
          disputes, investigate cheating, comply with law, enforce these Terms,
          or prevent misuse.
        </p>

        <p>
          Suspension or termination does not automatically entitle a user to a
          refund. Refund eligibility is governed by the Refund & Delivery Policy
          and applicable law.
        </p>

        <h2 className="font-semibold text-white">
          19. Intellectual Property
        </h2>

        <p>
          The Teez Golf Challenges Platform, including its software, source
          code, databases, APIs, visual designs, logos, trademarks, graphics,
          player interfaces, challenge systems, ranking models, scoreboards,
          statistics, documentation, text, and related intellectual property,
          is owned by Honey Badger Technologies (PTY) LTD or its authorised
          licensors.
        </p>

        <h2 className="font-semibold text-white">20. Payments</h2>

        <p>
          Payments are processed through an approved secure third-party payment
          provider. The Platform currently uses Peach Payments for supported
          payment processing.
        </p>

        <p>
          Honey Badger Technologies (PTY) LTD does not store complete payment
          card numbers, CVV numbers, banking PINs, banking passwords, one-time
          PINs, or confidential banking credentials on the Platform.
        </p>

        <p>
          Before completing payment, users will be presented with the applicable
          product, amount, currency, and payment information.
        </p>

        <p>
          Additional payment terms are contained in the Payment & Participation
          Policy and Refund & Delivery Policy.
        </p>

        <h2 className="font-semibold text-white">
          21. Refunds and Digital Delivery
        </h2>

        <p>
          Refunds, payment disputes, digital delivery, token corrections, and
          related matters are governed by the Refund & Delivery Policy.
        </p>

        <p>
          By using paid Platform services you acknowledge that you have read and
          accepted that Policy.
        </p>

        <h2 className="font-semibold text-white">22. Privacy</h2>

        <p>
          Honey Badger Technologies (PTY) LTD processes personal information in
          accordance with applicable privacy law, including the Protection of
          Personal Information Act, 2013 (POPIA) where applicable, and the
          Platform Privacy Policy.
        </p>

        <h2 className="font-semibold text-white">
          23. Limitation of Liability
        </h2>

        <p>
          To the fullest extent permitted by applicable law, Honey Badger
          Technologies (PTY) LTD shall not be liable for indirect, incidental,
          consequential, special, or punitive damages arising from or relating
          to use of the Platform.
        </p>

        <p>
          Nothing in these Terms limits or excludes any liability or consumer
          right that cannot lawfully be excluded or limited.
        </p>

        <h2 className="font-semibold text-white">24. Indemnity</h2>

        <p>
          You agree to indemnify and hold harmless Honey Badger Technologies
          (PTY) LTD, its directors, employees, contractors, and service
          providers against claims, losses, damages, liabilities, costs, and
          expenses arising from:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Your breach of these Terms.</li>
          <li>Your unlawful use of the Platform.</li>
          <li>Your misuse of Teez Play Tokens.</li>
          <li>Your submission of false scores or fraudulent information.</li>
          <li>Your infringement of another person&apos;s rights.</li>
        </ul>

        <h2 className="font-semibold text-white">
          25. Governing Law
        </h2>

        <p>
          These Terms are governed by the laws of the Republic of South Africa,
          subject to mandatory rights or laws applicable to users in other
          jurisdictions that cannot lawfully be excluded.
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

        <h2 className="font-semibold text-white">
          26. Changes to these Terms
        </h2>

        <p>
          Honey Badger Technologies (PTY) LTD may update these Terms from time
          to time to reflect changes in the Platform, participation model,
          pricing, payment-provider requirements, legal requirements, security,
          or operational improvements.
        </p>

        <p>
          Updated Terms will be published on the Platform. Where required by law
          or where a material change affects your rights, renewed acceptance may
          be required.
        </p>

        <h2 className="font-semibold text-white">
          27. Contact Details
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
          Physical Address:
          <br />
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

        <p className="text-xs text-gray-500 pt-4">
          Last updated: August 2026
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
              I have read and accept the Platform Terms & Conditions, including
              the Participation Access, Teez Play Token, payment, digital
              delivery, and fair-play rules.
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
