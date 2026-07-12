"use client";

import { useRouter } from "next/navigation";

export default function CommunityRulesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Community & Competition Rules
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Rules for player conduct, challenges, scoring, rankings, and fair
          competition on Teez Golf Challenges
        </p>

        <div className="space-y-6 text-sm text-gray-300">
          <p>
            These Community & Competition Rules govern player conduct, golf
            challenge participation, score submission, rankings, statistics,
            achievements, and competition integrity on the Teez Golf Challenges
            Platform.
          </p>

          <p>
            Teez Golf Challenges is owned and operated by Honey Badger
            Technologies (PTY) LTD.
          </p>

          <p>
            These Rules form part of the Platform Terms & Conditions and must be
            read together with the Acceptable Use Policy, Privacy Policy,
            Refund, Cancellation & Delivery Policy, and Cookie Policy.
          </p>

          {/* 1 */}
          <h2 className="text-white font-semibold">
            1. Purpose of these Rules
          </h2>

          <p>
            The purpose of these Rules is to protect fair play, player safety,
            reliable scoring, accurate rankings, competition integrity, and a
            respectful Platform community.
          </p>

          <p>
            All users must participate honestly, respectfully, and in accordance
            with the challenge settings and rules selected for each competition.
          </p>

          {/* 2 */}
          <h2 className="text-white font-semibold">
            2. Skill-Based Competition
          </h2>

          <p>
            Teez Golf Challenges is a skill-based competitive golf Platform.
          </p>

          <p>
            Challenge outcomes are based on participant performance, golf
            scoring, selected competition formats, challenge settings, and
            submitted results.
          </p>

          <p>
            The Platform does not facilitate gambling, betting, wagering,
            casino-style games, games of chance, cash prizes, cash payouts, or
            Teez Token redemption.
          </p>

          {/* 3 */}
          <h2 className="text-white font-semibold">
            3. Player Accounts and Identity
          </h2>

          <p>
            Each player must use their own registered Account and player profile.
          </p>

          <p>Players may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Use another player&apos;s Account.</li>
            <li>Share Account credentials.</li>
            <li>Create false player profiles.</li>
            <li>Impersonate another person.</li>
            <li>Create duplicate Accounts to influence results or rankings.</li>
            <li>Submit another player&apos;s score as their own.</li>
          </ul>

          <p>
            Player profile information must remain accurate and must not be
            misleading, abusive, unlawful, or designed to deceive other users.
          </p>

          {/* 4 */}
          <h2 className="text-white font-semibold">
            4. Player Names and Battle Names
          </h2>

          <p>
            Player names, battle names, profile images, club information, and
            other public-facing profile details must be appropriate for the
            Platform.
          </p>

          <p>Public-facing profile information may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Impersonate another person or organisation.</li>
            <li>Contain abusive, hateful, threatening, or discriminatory wording.</li>
            <li>Infringe intellectual property rights.</li>
            <li>Reveal another person&apos;s private information.</li>
            <li>Promote unlawful or prohibited activity.</li>
            <li>Mislead users about official Platform status.</li>
          </ul>

          <p>
            Honey Badger Technologies (PTY) LTD may remove or require the change
            of inappropriate or misleading profile information.
          </p>

          {/* 5 */}
          <h2 className="text-white font-semibold">
            5. Creating a Challenge
          </h2>

          <p>
            The challenge creator is responsible for selecting the correct
            challenge information before participation begins.
          </p>

          <p>This includes:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Challenge name.</li>
            <li>Competition format.</li>
            <li>Team format.</li>
            <li>Scoring method.</li>
            <li>Golf course.</li>
            <li>Entry requirements.</li>
            <li>Participants.</li>
            <li>Applicable challenge settings.</li>
          </ul>

          <p>
            The challenge creator must review all settings before confirming the
            challenge.
          </p>

          <p>
            Incorrect setup caused by user error does not automatically entitle
            participants to a refund, score correction, ranking correction, or
            Teez Token restoration.
          </p>

          {/* 6 */}
          <h2 className="text-white font-semibold">
            6. Challenge Invitations
          </h2>

          <p>
            Challenge invitations may only be sent to genuine intended
            participants.
          </p>

          <p>Users may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Send repeated unwanted invitations.</li>
            <li>Create fake invitations.</li>
            <li>Invite users for harassment or abuse.</li>
            <li>Misrepresent challenge terms.</li>
            <li>Use invitations for spam or unrelated promotion.</li>
          </ul>

          {/* 7 */}
          <h2 className="text-white font-semibold">
            7. Player Participation
          </h2>

          <p>
            Players are responsible for confirming that they understand the
            selected challenge format, scoring method, course, participants, and
            challenge settings before participating.
          </p>

          <p>
            Participants must comply with applicable golf course rules, club
            rules, safety requirements, and the agreed competition format.
          </p>

          <p>
            Real-world participation takes place at the player&apos;s own risk.
            The Platform does not supervise physical golf activities.
          </p>

          {/* 8 */}
          <h2 className="text-white font-semibold">
            8. Accurate Score Submission
          </h2>

          <p>
            All scores entered into the Platform must be truthful, complete, and
            accurately reflect the player&apos;s actual performance.
          </p>

          <p>Players may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Submit false scores.</li>
            <li>Alter another player&apos;s score without authority.</li>
            <li>Submit invented results.</li>
            <li>Intentionally omit relevant scores.</li>
            <li>Enter scores for rounds that did not take place.</li>
            <li>Manipulate scores to influence rankings or statistics.</li>
            <li>Submit a score after agreeing to a different result.</li>
          </ul>

          <p>
            Where players are responsible for confirming one another&apos;s
            scores, confirmation must be completed honestly.
          </p>

          {/* 9 */}
          <h2 className="text-white font-semibold">
            9. Live Scoreboards
          </h2>

          <p>
            Live scoreboards display competition information submitted through
            the Platform.
          </p>

          <p>
            Live scoreboard information may change while scores are being
            entered, corrected, or confirmed.
          </p>

          <p>
            A live scoreboard is not necessarily the final official result until
            the challenge has been finalised.
          </p>

          <p>
            Users may not intentionally delay, manipulate, interrupt, or falsify
            live scoring updates.
          </p>

          {/* 10 */}
          <h2 className="text-white font-semibold">
            10. Challenge Finalisation
          </h2>

          <p>
            Before finalising a challenge, the responsible user must confirm that
            the scores, results, participants, and applicable challenge
            information are complete and accurate.
          </p>

          <p>
            Once finalised, a challenge may be locked and may no longer be
            editable through the normal user interface.
          </p>

          <p>
            Finalised results may be used to update:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Match history.</li>
            <li>Player statistics.</li>
            <li>Wins and losses.</li>
            <li>Streaks.</li>
            <li>Rankings.</li>
            <li>Leaderboard positions.</li>
            <li>Achievements.</li>
          </ul>

          {/* 11 */}
          <h2 className="text-white font-semibold">
            11. Result and Score Disputes
          </h2>

          <p>
            Players should attempt to resolve ordinary score disagreements
            before the challenge is finalised.
          </p>

          <p>
            A dispute submitted after finalisation must include sufficient
            supporting information to allow the matter to be reviewed.
          </p>

          <p>Supporting information may include:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Challenge identification.</li>
            <li>Names of the participants.</li>
            <li>The disputed score or result.</li>
            <li>A description of the issue.</li>
            <li>Relevant screenshots.</li>
            <li>Scorecards or other available evidence.</li>
          </ul>

          <p>
            Honey Badger Technologies (PTY) LTD is not required to change a
            finalised result where the dispute cannot reasonably be verified.
          </p>

          {/* 12 */}
          <h2 className="text-white font-semibold">
            12. Rankings and Leaderboards
          </h2>

          <p>
            Rankings and leaderboard positions are digital Platform records
            calculated using Platform data and the applicable ranking model.
          </p>

          <p>
            Ranking positions may change when:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>New challenges are finalised.</li>
            <li>Results are corrected.</li>
            <li>Fraudulent results are removed.</li>
            <li>Ranking calculations are updated.</li>
            <li>Divisions or leaderboard structures are changed.</li>
            <li>Technical errors are corrected.</li>
          </ul>

          <p>
            Rankings do not create an entitlement to cash, money, vouchers,
            goods, services, prizes, or external rewards.
          </p>

          {/* 13 */}
          <h2 className="text-white font-semibold">
            13. Statistics and Achievements
          </h2>

          <p>
            Statistics, streaks, achievements, match history, and competition
            history are digital records generated from Platform activity.
          </p>

          <p>
            These records are intended to recognise participation, performance,
            and progress.
          </p>

          <p>
            They have no cash value and do not represent financial assets,
            property rights, vouchers, or external rewards.
          </p>

          {/* 14 */}
          <h2 className="text-white font-semibold">
            14. Teez Tokens and Challenges
          </h2>

          <p>
            Teez Tokens are digital play credits used only for approved Platform
            gameplay.
          </p>

          <p>
            Teez Tokens used for a validly created or entered challenge are
            generally not refundable or reversible.
          </p>

          <p>
            A Teez Token correction may be considered only where a verified
            technical, duplicate-processing, payment, or administrative error
            caused an incorrect deduction or allocation.
          </p>

          <p>
            Teez Tokens cannot be redeemed, withdrawn, converted into money,
            exchanged for vouchers, goods, or services, or transferred between
            users for payment.
          </p>

          {/* 15 */}
          <h2 className="text-white font-semibold">
            15. Fair Play
          </h2>

          <p>
            Players must act honestly and must not obtain or attempt to obtain an
            unfair advantage.
          </p>

          <p>Unfair conduct includes:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Score manipulation.</li>
            <li>Ranking manipulation.</li>
            <li>Collusion.</li>
            <li>Fake participants.</li>
            <li>Fake challenges.</li>
            <li>Duplicate Accounts.</li>
            <li>Exploiting technical errors.</li>
            <li>Using unauthorised automation.</li>
            <li>Misrepresenting competition participation.</li>
            <li>Interfering with another player&apos;s Account or results.</li>
          </ul>

          {/* 16 */}
          <h2 className="text-white font-semibold">
            16. Sportsmanship
          </h2>

          <p>
            Players must treat other users, participants, golf course staff, and
            Platform representatives respectfully.
          </p>

          <p>Players may not:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Harass another player.</li>
            <li>Threaten or intimidate another person.</li>
            <li>Use hateful, abusive, or discriminatory language.</li>
            <li>Engage in bullying.</li>
            <li>Disrupt challenges intentionally.</li>
            <li>Submit malicious or knowingly false reports.</li>
            <li>Publish another person&apos;s private information.</li>
          </ul>

          {/* 17 */}
          <h2 className="text-white font-semibold">
            17. Golf Course Rules and Safety
          </h2>

          <p>
            Players are responsible for complying with all applicable:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Golf course rules.</li>
            <li>Golf club policies.</li>
            <li>Safety requirements.</li>
            <li>Local competition rules.</li>
            <li>Dress codes.</li>
            <li>Booking requirements.</li>
            <li>Applicable laws.</li>
          </ul>

          <p>
            The Platform does not control golf course access, weather, travel,
            equipment, physical conditions, player behaviour, or other
            real-world circumstances.
          </p>

          {/* 18 */}
          <h2 className="text-white font-semibold">
            18. Reporting Rule Violations
          </h2>

          <p>
            Users may report suspected cheating, false scores, harassment,
            Account abuse, competition manipulation, or other violations.
          </p>

          <p>
            Reports must be made honestly and should include sufficient
            information to allow a reasonable review.
          </p>

          <p>
            Knowingly false, abusive, retaliatory, or misleading reports are
            prohibited.
          </p>

          {/* 19 */}
          <h2 className="text-white font-semibold">
            19. Review and Investigation
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may review relevant Account,
            challenge, score, ranking, technical, payment, and security records
            when investigating a reported or suspected violation.
          </p>

          <p>
            Users may be requested to provide additional information reasonably
            required to review the matter.
          </p>

          <p>
            Failure to provide sufficient information may prevent the Platform
            from making a correction or taking further action.
          </p>

          {/* 20 */}
          <h2 className="text-white font-semibold">
            20. Competition Corrections
          </h2>

          <p>
            Where reasonably necessary to protect competition integrity, Honey
            Badger Technologies (PTY) LTD may:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Correct a score.</li>
            <li>Correct a result.</li>
            <li>Correct a ranking.</li>
            <li>Correct a statistic or achievement.</li>
            <li>Reverse a duplicate entry.</li>
            <li>Invalidate a challenge.</li>
            <li>Remove fraudulent results.</li>
            <li>Restore or correct an incorrect Teez Token balance.</li>
          </ul>

          <p>
            Corrections will be based on the information reasonably available to
            the Platform.
          </p>

          {/* 21 */}
          <h2 className="text-white font-semibold">
            21. Warnings, Restrictions, and Bans
          </h2>

          <p>
            Where a breach is suspected or confirmed, Honey Badger Technologies
            (PTY) LTD may take one or more actions, including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Issue a warning.</li>
            <li>Remove or correct an affected result.</li>
            <li>Invalidate a challenge.</li>
            <li>Restrict specific Platform features.</li>
            <li>Temporarily suspend an Account.</li>
            <li>Permanently terminate an Account.</li>
            <li>Prevent the creation of replacement Accounts.</li>
            <li>Report unlawful conduct to the relevant authorities.</li>
          </ul>

          <p>
            Enforcement decisions may consider the seriousness of the conduct,
            the effect on other users, whether the conduct was repeated, and the
            need to protect the Platform.
          </p>

          {/* 22 */}
          <h2 className="text-white font-semibold">
            22. Effect of Suspension or Termination
          </h2>

          <p>
            Suspension or termination may result in immediate loss of access to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Subscription-only features.</li>
            <li>Challenges.</li>
            <li>Rankings.</li>
            <li>Statistics.</li>
            <li>Achievements.</li>
            <li>Competition history.</li>
            <li>Teez Tokens.</li>
            <li>Other Platform functionality.</li>
          </ul>

          <p>
            Suspension or termination does not automatically entitle a user to a
            refund.
          </p>

          <p>
            Refund eligibility is governed by the Refund, Cancellation &
            Delivery Policy and applicable South African law.
          </p>

          {/* 23 */}
          <h2 className="text-white font-semibold">
            23. Platform Decisions
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD will make reasonable decisions
            based on the information available when reviewing competition or
            community matters.
          </p>

          <p>
            The Platform is not required to disclose confidential security,
            fraud-detection, system, or investigation methods where disclosure
            could create a security risk or assist further abuse.
          </p>

          {/* 24 */}
          <h2 className="text-white font-semibold">
            24. Changes to these Rules
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may update these Rules where
            reasonably necessary to reflect:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>New Platform features.</li>
            <li>New challenge formats.</li>
            <li>Ranking or scoring changes.</li>
            <li>Security improvements.</li>
            <li>Competition-integrity requirements.</li>
            <li>Legal or regulatory requirements.</li>
          </ul>

          <p>
            Updated versions will be published on the Platform. Material changes
            will be communicated or presented for renewed acceptance where
            required by applicable law.
          </p>

          {/* 25 */}
          <h2 className="text-white font-semibold">
            25. Governing Law
          </h2>

          <p>
            These Rules are governed by the laws of the Republic of South Africa.
          </p>

          <p>
            Nothing in these Rules limits any legal right that cannot lawfully be
            excluded under applicable South African law.
          </p>

          {/* 26 */}
          <h2 className="text-white font-semibold">
            26. Contact Details
          </h2>

          <p>
            Reports, questions, or complaints regarding community or competition
            conduct may be submitted using the following details:
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
              onClick={() => router.push("/legal/acceptable-use")}
              className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
            >
              View Acceptable Use Policy
            </button>

            <button
              type="button"
              onClick={() => router.push("/terms")}
              className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
            >
              View Platform Terms & Conditions
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