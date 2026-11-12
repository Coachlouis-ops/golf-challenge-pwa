import type { Metadata } from "next";

import {
  ExternalLink,
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "Responsible Gambling Policy",
  description:
    "Deposit limits, time-outs, self-exclusion, and help for ABC Bookmakers players. 18+ only.",
};

export default function ResponsibleGamblingPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/responsible-gambling"
      title="Responsible Gambling Policy"
      summary="Betting on TEEZ Golf Challenges from your ABC Bookmakers player account is for adults, and it should stay within what you can afford to lose. This policy is how you set limits, take a break, or stop."
    >
      <PolicySection title="1. 18+ only">
        <p>
          You must be 18 or older to open a player account or to place a bet.
          The National Gambling Act 7 of 2004 does not allow a person under 18
          to gamble. ABC Bookmakers closes an account that was opened by
          someone under 18, voids bets on it, and returns any cleared deposit
          to the source it came from once that source has been checked.
        </p>
        <p>
          Do not let a person under 18 use your sign-in, your device while you
          are signed in, or your payment method.
        </p>
      </PolicySection>

      <PolicySection title="2. Keep the bet affordable">
        <p>
          A stake is money you can lose. Decide the amount before you enter a
          challenge, and do not raise it to recover a challenge you did not
          win. The stake is shown in your player account before you confirm
          it.
        </p>
        <p>
          You can use the tools below at any time from your player account.
          You do not need to explain why you want a limit, a time-out, or
          self-exclusion.
        </p>
      </PolicySection>

      <PolicySection title="3. Deposit limits">
        <p>
          You may set a limit on how much you can deposit in a day, a week, or
          a month. You choose the amount in your player account. The limit
          applies to new deposits. It does not cancel a deposit that has
          already cleared, and it does not by itself withdraw money already in
          the balance.
        </p>
        <PolicyList
          items={[
            "A new limit, and any change that lowers a limit, applies as soon as you save it.",
            "A change that raises a limit, or that removes a limit, does not apply on the day you ask for it. It applies from the next day, so a decision made in the moment does not increase what you can deposit immediately.",
            "Once you reach the limit, further deposits are declined until the period resets.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Time-out">
        <p>
          A time-out is a short break. You choose the period in your player
          account. Until that period ends:
        </p>
        <PolicyList
          items={[
            "You cannot place a new bet and you cannot deposit.",
            "ABC Bookmakers does not send you betting marketing.",
            "A stake already held for an open challenge stays held until that challenge is settled or voided under the Betting Rules.",
            "You may still ask, through your player account, for an available balance to be withdrawn to your verified own account under the Deposits & Withdrawals Policy.",
          ]}
        />
        <p>
          A time-out is not ended early because you ask for it to be ended. If
          you want a longer stop, ask for self-exclusion instead.
        </p>
      </PolicySection>

      <PolicySection title="5. Self-exclusion">
        <p>
          Self-exclusion is the way to stop betting with ABC Bookmakers for a
          longer period. You request it through your player account. You can
          also ask ABC Bookmakers support, through your player account, to
          apply it if you cannot reach the control yourself.
        </p>
        <p>While you are self-excluded:</p>
        <PolicyList
          items={[
            "You cannot place a bet, open another account, or deposit.",
            "ABC Bookmakers will not send you betting marketing.",
            "A new account opened in your name, or an attempt to bet through someone else’s account, will be blocked when it is identified.",
            "An open challenge is dealt with under the Betting Rules. You are not required to place any further bet.",
            "An available balance may be withdrawn to your verified own account under the Deposits & Withdrawals Policy.",
          ]}
        />
        <p>
          Do not ask for the exclusion to be lifted early. ABC Bookmakers will
          not lift it on request before the period you set has ended. When
          that period ends, the account stays closed to betting until you ask,
          through your player account, to return, and until any check required
          by the FICA & Anti-Money Laundering Policy is complete.
        </p>
        <p>
          Self-exclusion with ABC Bookmakers stops your ABC Bookmakers player
          account. If you also need to stop gambling with other operators, ask
          the National Responsible Gambling Programme for help with that wider
          step. The helpline is below.
        </p>
      </PolicySection>

      <PolicySection title="6. When ABC Bookmakers steps in">
        <p>
          A limit you set yourself is the main control. ABC Bookmakers may
          also suspend betting or deposits on an account where the activity
          shows that the tools above are needed and have not been used. You
          are told through your player account, and you are pointed to this
          policy and to the helpline below.
        </p>
        <p>
          That step is separate from a suspension under the FICA & Anti-Money
          Laundering Policy. A financial-crime check is not described as a
          responsible-gambling measure, and a responsible-gambling measure is
          not used as a reason to avoid a report the law requires.
        </p>
      </PolicySection>

      <PolicySection title="7. Help">
        <p>
          If gambling is causing harm to you or to someone close to you, free
          and confidential counselling is available from the National
          Responsible Gambling Programme, the flagship programme of the South
          African Responsible Gambling Foundation. The toll-free counselling
          line is{" "}
          <ExternalLink href="tel:0800006008">0800 006 008</ExternalLink>. The
          Foundation states that this line is available 24 hours a day, seven
          days a week, for counselling, assessment, and referral to treatment.
        </p>
        <p>
          The programme’s site is{" "}
          <ExternalLink href="https://responsiblegambling.org.za/">
            responsiblegambling.org.za
          </ExternalLink>
          . That helpline is independent of ABC Bookmakers. For anything about
          your player account, including setting a limit or requesting
          self-exclusion, contact ABC Bookmakers support through your player
          account.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
