"use client";

import { useRouter } from "next/navigation";

export default function AcceptableUsePolicyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Acceptable Use Policy</h1>

        <p className="text-sm text-gray-400 mb-8">
          Rules for lawful, secure, fair, and responsible use of Teez Golf
          Challenges
        </p>

        <div className="space-y-6 text-sm text-gray-300">
          <p>
            This Acceptable Use Policy explains the conduct permitted and
            prohibited when using the Teez Golf Challenges website, Platform,
            Accounts, subscriptions, Teez Tokens, challenges, rankings,
            scoreboards, and related digital services.
          </p>

          <p>
            Teez Golf Challenges is owned and operated by Honey Badger
            Technologies (PTY) LTD.
          </p>

          <p>
            This Policy forms part of the Platform Terms & Conditions and must be
            read together with the Privacy Policy, Refund, Cancellation &
            Delivery Policy, Cookie Policy, and Community & Competition Rules.
          </p>

          {/* 1 */}
          <h2 className="text-white font-semibold">
            1. Purpose of this Policy
          </h2>

          <p>
            The purpose of this Policy is to protect users, Platform security,
            competition integrity, payment systems, intellectual property, and
            the lawful operation of Teez Golf Challenges.
          </p>

          <p>
            Users must use the Platform only for its intended purpose and in
            accordance with applicable law and the legal policies published by
            Honey Badger Technologies (PTY) LTD.
          </p>

          {/* 2 */}
          <h2 className="text-white font-semibold">
            2. General User Obligations
          </h2>

          <p>Users must:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate and current Account information.</li>
            <li>Use their own identity and Account.</li>
            <li>Protect their login credentials.</li>
            <li>Use the Platform honestly and lawfully.</li>
            <li>Respect other users and competition participants.</li>
            <li>Submit accurate scores and results.</li>
            <li>Use only approved Platform functionality.</li>
            <li>Comply with applicable golf course and competition rules.</li>
            <li>Comply with South African law.</li>
          </ul>

          {/* 3 */}
          <h2 className="text-white font-semibold">
            3. Account Security
          </h2>

          <p>
            Users are responsible for maintaining the confidentiality and
            security of their Account credentials.
          </p>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Share passwords or authentication details.</li>
            <li>Allow another person to use their Account.</li>
            <li>Use another person&apos;s Account.</li>
            <li>Sell, transfer, rent, or trade an Account.</li>
            <li>Create Accounts using false or misleading information.</li>
            <li>Create multiple Accounts to obtain an unfair advantage.</li>
            <li>Attempt to bypass email or mobile verification.</li>
          </ul>

          <p>
            Suspected unauthorised Account access must be reported without
            unreasonable delay.
          </p>

          {/* 4 */}
          <h2 className="text-white font-semibold">
            4. Fair Play and Competition Integrity
          </h2>

          <p>
            Teez Golf Challenges is a skill-based competitive golf Platform.
            Users must participate honestly and may not manipulate any challenge,
            score, result, ranking, statistic, streak, achievement, or
            leaderboard position.
          </p>

          <p>Prohibited competition conduct includes:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Submitting false or fabricated scores.</li>
            <li>Submitting another player&apos;s score as your own.</li>
            <li>Altering or manipulating finalised results.</li>
            <li>Colluding with other users.</li>
            <li>Creating fake challenges.</li>
            <li>Creating fake participants.</li>
            <li>Using duplicate Accounts to influence rankings.</li>
            <li>Manipulating statistics or achievements.</li>
            <li>Intentionally entering incorrect challenge settings.</li>
            <li>Misrepresenting participation or results.</li>
            <li>Exploiting scoring or ranking errors.</li>
            <li>Interfering with another user&apos;s challenge.</li>
          </ul>

          {/* 5 */}
          <h2 className="text-white font-semibold">
            5. Cheating, Automation, and Exploitation
          </h2>

          <p>Users may not use or distribute:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Bots.</li>
            <li>Automated scripts.</li>
            <li>Unauthorised software tools.</li>
            <li>Macros intended to automate Platform activity.</li>
            <li>Cheat tools.</li>
            <li>Data-scraping tools.</li>
            <li>Account-creation automation.</li>
            <li>Software designed to manipulate scores or rankings.</li>
            <li>Tools intended to bypass Platform restrictions.</li>
          </ul>

          <p>
            Users may not knowingly exploit technical faults, bugs, timing
            errors, security weaknesses, payment errors, token errors, or other
            unintended Platform behaviour.
          </p>

          <p>
            A suspected vulnerability or technical exploit should be reported to
            Honey Badger Technologies (PTY) LTD and must not be abused,
            published, sold, or shared for harmful purposes.
          </p>

          {/* 6 */}
          <h2 className="text-white font-semibold">
            6. Platform and System Security
          </h2>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Attempt to gain unauthorised access to the Platform.</li>
            <li>Attempt to access another user&apos;s information.</li>
            <li>Probe, scan, or test Platform security without permission.</li>
            <li>Bypass access controls.</li>
            <li>Interfere with authentication or verification systems.</li>
            <li>Disrupt servers, databases, APIs, or network services.</li>
            <li>Introduce viruses, malware, ransomware, or malicious code.</li>
            <li>Conduct denial-of-service attacks.</li>
            <li>Interfere with logs, audit trails, or security controls.</li>
            <li>Obtain or disclose confidential Platform information.</li>
          </ul>

          {/* 7 */}
          <h2 className="text-white font-semibold">
            7. Payments, Subscriptions, and Refund Abuse
          </h2>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Use an unauthorised payment method.</li>
            <li>Submit false payment confirmations.</li>
            <li>Manipulate subscription status.</li>
            <li>Attempt to obtain access without valid payment.</li>
            <li>Submit duplicate or fraudulent refund claims.</li>
            <li>Misuse chargeback procedures.</li>
            <li>Dispute a valid transaction dishonestly.</li>
            <li>Attempt to reverse used Teez Tokens for cash.</li>
            <li>Manipulate token allocations or wallet balances.</li>
            <li>Use stolen or unlawfully obtained payment information.</li>
          </ul>

          <p>
            Honey Badger Technologies (PTY) LTD may cooperate with payment
            gateways, acquiring banks, card issuers, banks, regulators, and law
            enforcement when investigating suspected payment abuse or fraud.
          </p>

          {/* 8 */}
          <h2 className="text-white font-semibold">
            8. Teez Token Misuse
          </h2>

          <p>
            Teez Tokens are digital play credits only and may only be used for
            approved Platform gameplay.
          </p>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Sell Teez Tokens.</li>
            <li>Purchase Teez Tokens from another user.</li>
            <li>Trade Teez Tokens for value.</li>
            <li>Transfer Teez Tokens for payment.</li>
            <li>Advertise Teez Tokens as having cash value.</li>
            <li>Offer Teez Tokens in exchange for goods or services.</li>
            <li>Use Teez Tokens as a substitute for money.</li>
            <li>Attempt to withdraw or redeem Teez Tokens.</li>
            <li>Convert Teez Tokens into money, cryptocurrency, or vouchers.</li>
            <li>Exploit errors affecting Teez Token balances.</li>
          </ul>

          {/* 9 */}
          <h2 className="text-white font-semibold">
            9. Gambling and Prohibited Financial Activity
          </h2>

          <p>
            The Platform may not be used for gambling, betting, wagering,
            casino-style games, games of chance, cash prizes, cash payouts,
            money transmission, cryptocurrency exchange, or any other prohibited
            financial activity.
          </p>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Place or accept bets through the Platform.</li>
            <li>Arrange side bets through Platform features.</li>
            <li>Use Teez Tokens as stakes.</li>
            <li>Use rankings or scores to settle unlawful wagers.</li>
            <li>Promote unregulated gambling services.</li>
            <li>Use the Platform to launder or transfer funds.</li>
          </ul>

          {/* 10 */}
          <h2 className="text-white font-semibold">
            10. Prohibited Products and Services
          </h2>

          <p>
            The Platform may not be used to advertise, sell, promote, facilitate,
            or process payments for prohibited, restricted, unlawful, or
            undeclared products and services.
          </p>

          <p>This includes:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Illegal drugs or drug paraphernalia.</li>
            <li>Counterfeit goods or currency.</li>
            <li>Unlicensed firearms, ammunition, or weapons.</li>
            <li>Illegal or exploitative sexual content.</li>
            <li>Unregulated gambling services.</li>
            <li>Pyramid or Ponzi schemes.</li>
            <li>Unauthorised cryptocurrency exchange services.</li>
            <li>Malware, hacking tools, or malicious software.</li>
            <li>Unlicensed pharmaceuticals or supplements.</li>
            <li>Unlicensed tobacco, vaping, or alcohol sales.</li>
            <li>Endangered wildlife or protected-species products.</li>
            <li>Hazardous or radioactive materials.</li>
            <li>Stolen goods.</li>
            <li>Any activity prohibited by South African law.</li>
            <li>
              Any activity prohibited by Visa, Mastercard, the acquiring bank,
              or the approved payment gateway.
            </li>
          </ul>

          {/* 11 */}
          <h2 className="text-white font-semibold">
            11. Harassment and Abusive Conduct
          </h2>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Harass or threaten another person.</li>
            <li>Use abusive, hateful, or discriminatory language.</li>
            <li>Intimidate another user.</li>
            <li>Stalk or repeatedly contact another user against their wishes.</li>
            <li>Publish another person&apos;s private information.</li>
            <li>Encourage violence or unlawful conduct.</li>
            <li>Engage in bullying or targeted abuse.</li>
            <li>Impersonate another user, official, or Company representative.</li>
          </ul>

          {/* 12 */}
          <h2 className="text-white font-semibold">
            12. False, Misleading, and Harmful Content
          </h2>

          <p>
            Information submitted through the Platform must not be false,
            misleading, fraudulent, unlawful, harmful, defamatory, or designed
            to deceive other users.
          </p>

          <p>Users may not submit or display:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>False identity information.</li>
            <li>Fraudulent payment information.</li>
            <li>Misleading player details.</li>
            <li>False competition results.</li>
            <li>Defamatory statements.</li>
            <li>Unlawful threats.</li>
            <li>Content infringing intellectual property rights.</li>
            <li>Content violating privacy rights.</li>
            <li>Content intended to damage the Platform or another person.</li>
          </ul>

          {/* 13 */}
          <h2 className="text-white font-semibold">
            13. Intellectual Property Misuse
          </h2>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Copy Platform source code.</li>
            <li>Reverse engineer Platform systems.</li>
            <li>Reproduce Platform designs without permission.</li>
            <li>Use Company trademarks without authorisation.</li>
            <li>Create misleading copies of the Platform.</li>
            <li>Resell Platform access.</li>
            <li>Scrape or reproduce Platform databases.</li>
            <li>Remove copyright or trademark notices.</li>
            <li>Use Platform content for unauthorised commercial purposes.</li>
          </ul>

          {/* 14 */}
          <h2 className="text-white font-semibold">
            14. Unauthorised Commercial Use
          </h2>

          <p>
            Unless Honey Badger Technologies (PTY) LTD provides prior written
            permission, users may not use the Platform to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Advertise unrelated products or services.</li>
            <li>Send spam or unsolicited promotions.</li>
            <li>Collect user information for marketing.</li>
            <li>Operate a competing service.</li>
            <li>Resell subscriptions or access.</li>
            <li>Charge others for access to Platform functionality.</li>
            <li>Conduct transaction laundering.</li>
          </ul>

          {/* 15 */}
          <h2 className="text-white font-semibold">
            15. Privacy and Personal Information
          </h2>

          <p>
            Users may not collect, copy, disclose, publish, or misuse another
            user&apos;s personal information.
          </p>

          <p>
            Private contact information, authentication details, payment
            information, and security information must not be requested or shared
            through inappropriate Platform channels.
          </p>

          <p>
            Personal information must be handled in accordance with applicable
            South African law and the Privacy Policy.
          </p>

          {/* 16 */}
          <h2 className="text-white font-semibold">
            16. Reporting Violations
          </h2>

          <p>
            Users may report suspected fraud, cheating, harassment, Account
            misuse, payment abuse, unlawful conduct, security issues, or other
            violations to Honey Badger Technologies (PTY) LTD.
          </p>

          <p>
            Reports should contain sufficient accurate information to allow the
            matter to be reviewed.
          </p>

          <p>
            Submitting knowingly false or malicious reports is itself a breach of
            this Policy.
          </p>

          {/* 17 */}
          <h2 className="text-white font-semibold">
            17. Investigation and Evidence
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may review relevant Account,
            competition, score, payment, technical, security, and usage records
            when investigating a suspected violation.
          </p>

          <p>
            The Company may cooperate with service providers, payment providers,
            acquiring banks, card issuers, regulators, professional advisers, or
            law-enforcement authorities where reasonably necessary and lawful.
          </p>

          {/* 18 */}
          <h2 className="text-white font-semibold">
            18. Enforcement Actions
          </h2>

          <p>
            Where a breach is suspected or confirmed, Honey Badger Technologies
            (PTY) LTD may take one or more reasonable actions, including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Issue a warning.</li>
            <li>Correct a score, result, ranking, or token balance.</li>
            <li>Invalidate a challenge.</li>
            <li>Remove or restrict Platform content.</li>
            <li>Temporarily suspend an Account.</li>
            <li>Restrict particular Platform features.</li>
            <li>Cancel or terminate an Account.</li>
            <li>Prevent the creation of replacement Accounts.</li>
            <li>Refuse a fraudulent refund request.</li>
            <li>Report unlawful conduct to the relevant authorities.</li>
            <li>Take legal action where appropriate.</li>
          </ul>

          <p>
            Enforcement decisions may consider the seriousness of the conduct,
            harm caused, whether the behaviour was repeated, and the need to
            protect users and the Platform.
          </p>

          {/* 19 */}
          <h2 className="text-white font-semibold">
            19. Effect of Suspension or Termination
          </h2>

          <p>
            Suspension or termination may result in immediate loss of access to
            subscription-only features, challenges, rankings, statistics,
            achievements, Teez Tokens, and other Platform functionality.
          </p>

          <p>
            Suspension or termination does not automatically entitle a user to a
            refund.
          </p>

          <p>
            Refund eligibility remains governed by the Refund, Cancellation &
            Delivery Policy and applicable South African law.
          </p>

          {/* 20 */}
          <h2 className="text-white font-semibold">
            20. Changes to this Policy
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may update this Policy where
            reasonably necessary to reflect Platform changes, security risks,
            legal requirements, payment-provider requirements, or operational
            improvements.
          </p>

          <p>
            Updated versions will be published on the Platform. Material changes
            will be communicated or presented for renewed acceptance where
            required by applicable law.
          </p>

          {/* 21 */}
          <h2 className="text-white font-semibold">
            21. Governing Law
          </h2>

          <p>
            This Policy is governed by the laws of the Republic of South Africa.
          </p>

          <p>
            Nothing in this Policy limits any right that cannot lawfully be
            excluded under applicable South African law.
          </p>

          {/* 22 */}
          <h2 className="text-white font-semibold">
            22. Contact Details
          </h2>

          <p>
            Reports, questions, or complaints concerning acceptable use may be
            submitted using the following details:
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

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/terms")}
              className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
            >
              View Platform Terms & Conditions
            </button>

            <button
              type="button"
              onClick={() => router.push("/legal/refund-policy")}
              className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
            >
              View Refund, Cancellation & Delivery Policy
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full py-4 rounded-2xl font-semibold text-lg bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88] mt-4"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}