import type { Metadata } from "next";

import {
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Conduct required on the ABC Bookmakers player platform. TEEZ Golf Challenges is the golf game offered on that platform.",
};

export default function AcceptableUsePage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/acceptable-use"
      title="Acceptable Use Policy"
      summary="ABC Bookmakers owns and runs the player platform. You use your player account under the ABC Bookmakers Terms & Conditions. TEEZ Golf Challenges is only the golf game offered on that account. It does not operate the platform, hold your balance, or run your account."
    >
      <PolicySection title="1. Who this policy binds">
        <p>
          This policy is part of your agreement with ABC Bookmakers. It
          applies from the moment you open the website, create a player
          account, or place a bet. The Betting Rules govern the bet itself.
          This policy governs how you may use the account and the game.
        </p>
      </PolicySection>

      <PolicySection title="2. Your own account">
        <p>You agree that:</p>
        <PolicyList
          items={[
            "You are 18 or older.",
            "You hold one account, in your own name.",
            "You will not let another person sign in, bet, or withdraw on your account.",
            "You will not open an account for a person who is under 18, self-excluded, or not allowed to bet.",
            "The identity, address, and payment details you give are yours and are true.",
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Betting and the game">
        <p>
          A bet is placed with ABC Bookmakers through your player account, on
          a TEEZ Golf Challenge, and only under the Betting Rules. You may not
          use the game, a score, or a chat to settle a private stake that was
          never accepted in the player account.
        </p>
        <p>You may not:</p>
        <PolicyList
          items={[
            "Submit a score you know is wrong.",
            "Confirm a challenge result you know is wrong.",
            "Pressure another player to confirm a result they do not accept.",
            "Place a bet on behalf of another person.",
            "Use more than one account to enter the same challenge.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Money in the account">
        <p>
          The balance is held by ABC Bookmakers in your player account. You
          may not use the account to move another person’s money, to hide
          where money came from, or to avoid a check required by the FICA &
          Anti-Money Laundering Policy. A deposit and a withdrawal must follow
          the Deposits & Withdrawals Policy, including payment only to a
          verified account in your own name.
        </p>
      </PolicySection>

      <PolicySection title="5. Conduct towards other people">
        <p>You may not use the platform to:</p>
        <PolicyList
          items={[
            "Threaten, harass, or humiliate another player.",
            "Publish another player’s identity number, address, or bank details.",
            "Send unlawful content through any message the account allows.",
            "Pretend to be ABC Bookmakers support, or pretend to be another player.",
          ]}
        />
      </PolicySection>

      <PolicySection title="6. The service itself">
        <p>You may not:</p>
        <PolicyList
          items={[
            "Probe, scan, or overload the platform.",
            "Bypass a sign-in, a limit, a time-out, or a self-exclusion.",
            "Copy the platform in order to run a competing book on the same players’ accounts.",
            "Share your password, or ask another player for theirs.",
          ]}
        />
      </PolicySection>

      <PolicySection title="7. If this policy is broken">
        <p>
          ABC Bookmakers may suspend or close the player account, refuse a new
          bet, and void a bet that was accepted because of a breach, as the
          Terms & Conditions and the Betting Rules allow. A stake that was
          held is dealt with under those rules. Where the law requires a
          report, including under the Financial Intelligence Centre Act 38 of
          2001, ABC Bookmakers will make that report.
        </p>
        <p>
          Tell ABC Bookmakers support through your player account if you
          believe another player is misusing an account. Do not send identity
          documents or passwords with that message.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
