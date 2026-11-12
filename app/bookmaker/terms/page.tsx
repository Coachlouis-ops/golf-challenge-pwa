import type { Metadata } from "next";

import {
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";
import { bookmakerPolicyAcceptanceList } from "@/app/bookmaker/policies";

export const metadata: Metadata = {
  title: "ABC Bookmakers Terms & Conditions",
  description:
    "Terms for opening a player betting account with ABC Bookmakers and betting on TEEZ Golf Challenges.",
};

export default function BookmakerTermsPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/terms"
      title="ABC Bookmakers Terms & Conditions"
      summary="These terms are the contract between you and ABC Bookmakers for your player betting account. Read them with the other ABC Bookmakers policies before you create the account."
    >
      <PolicySection title="1. These terms">
        <p>
          ABC Bookmakers provides the player account you register on this
          page. You hold your betting account with ABC Bookmakers. TEEZ Golf
          Challenges is the golf game offered on that account.
        </p>
        <p>
          By ticking the acceptance box on the registration page, you confirm
          that you have read and accept the {bookmakerPolicyAcceptanceList()}.
        </p>
        <p>
          If you do not accept all of these policies, do not create an account
          and do not place a bet.
        </p>
      </PolicySection>

      <PolicySection title="2. The account you are opening">
        <p>
          Your player account is the betting account ABC Bookmakers keeps for
          you. It holds your available balance, any stake that is reserved for
          an open challenge, your deposits, your withdrawals, and the record
          of your bets.
        </p>
        <p>
          A bet you place is a bet with ABC Bookmakers on a TEEZ Golf
          Challenge. The Betting Rules explain when that bet is accepted, when
          it is settled, and when it is void.
        </p>
        <p>
          The currency and the amount of a deposit, a withdrawal, or a stake
          are shown in your player account before you confirm that step.
        </p>
      </PolicySection>

      <PolicySection title="3. TEEZ Golf Challenges">
        <p>
          TEEZ Golf Challenges is the golf game on which you can bet from your
          ABC Bookmakers player account. A challenge may be played as singles,
          pairs, a group, or a corporate match, as the challenge itself shows
          before you commit a stake.
        </p>
        <p>
          You and the other players in the challenge play the round and then
          confirm the result in your player accounts. ABC Bookmakers does not
          settle a challenge until every player who has a bet on that
          challenge has confirmed the result. That rule is set out in full in
          the Betting Rules.
        </p>
        <p>
          These terms govern your betting account and your bets. They do not
          transfer any right in the TEEZ Golf Challenges game to you, and they
          do not make you the bookmaker.
        </p>
      </PolicySection>

      <PolicySection title="4. The other policies">
        <p>The following policies are part of your agreement with ABC Bookmakers:</p>
        <PolicyList
          items={[
            "ABC Bookmakers Privacy Policy, which explains how your personal information is used.",
            "Responsible Gambling Policy, which explains deposit limits, time-outs, and self-exclusion.",
            "FICA & Anti-Money Laundering Policy, which explains identity, address, and source-of-funds checks.",
            "Betting Rules, which explain acceptance, confirmation, settlement, void bets, and disputes.",
            "Deposits & Withdrawals Policy, which explains how money moves into and out of your betting account.",
            "Cookie Policy, which explains the storage used to keep you signed in and to remember a cookie choice.",
            "Acceptable Use Policy, which explains the conduct required when you use your player account.",
            "Community & Competition Rules, which explain how players take part in a TEEZ Golf Challenge on that account.",
          ]}
        />
        <p>
          If a sentence in one policy deals with the same point as another,
          the policy that deals with that point in more detail applies to that
          point. A bet that has already been accepted keeps the rules that
          were in place when you placed it.
        </p>
      </PolicySection>

      <PolicySection title="5. Who may register">
        <p>You may open a player account only if all of the following are true:</p>
        <PolicyList
          items={[
            "You are 18 years or older. ABC Bookmakers does not accept a player under 18. The National Gambling Act 7 of 2004 does not allow a person under 18 to gamble.",
            "You are opening the account for yourself, in your own name.",
            "You are allowed to bet from the place where you are. If the law that applies to you does not allow the bet, do not register and do not bet.",
            "You have not been self-excluded, and you are not asking for an account so that an excluded person can bet.",
            "The information you give is true, complete, and your own.",
          ]}
        />
        <p>
          ABC Bookmakers may ask you to prove your age at registration, before
          a bet, or before a withdrawal. If you are under 18, or if you cannot
          show that you are 18 or older, the account is closed, open bets are
          void, and any cleared deposit is returned to the source it came
          from once that source has been checked.
        </p>
      </PolicySection>

      <PolicySection title="6. One account for one person">
        <p>
          You may hold one ABC Bookmakers player account. You may not open a
          second account, and you may not use another person’s account.
        </p>
        <p>
          A second account opened by the same person, or an account opened
          with another person’s identity or payment method, is a duplicate.
          ABC Bookmakers may close the duplicate, void bets on it, and move a
          remaining available balance only after the FICA & Anti-Money
          Laundering checks show who the money belongs to. It is then paid
          under the Deposits & Withdrawals Policy to a verified account in
          that person’s own name.
        </p>
      </PolicySection>

      <PolicySection title="7. What you promise">
        <p>You agree that:</p>
        <PolicyList
          items={[
            "You will keep your name, date of birth, identity or passport details, address, and payment details up to date in your player account.",
            "You will not let another person sign in, place a bet, or withdraw money on your account.",
            "You will not hide who you are, where the money comes from, or who owns the bank account or card you use.",
            "You will confirm a golf challenge result honestly, and only for a challenge you took part in.",
            "You will not use the account to move money for another person, or to hide the source of money.",
          ]}
        />
      </PolicySection>

      <PolicySection title="8. Sign-in and security">
        <p>
          You sign in with the email address and password you choose at
          registration. You are responsible for keeping that password private
          and for signing out on a device you share.
        </p>
        <p>
          Tell ABC Bookmakers support through your player account as soon as
          you think someone else has used your sign-in. ABC Bookmakers may
          suspend the account while that is checked. Bets already accepted
          stay under the Betting Rules.
        </p>
      </PolicySection>

      <PolicySection title="9. Suspension and closure">
        <p>ABC Bookmakers may suspend or close your player account if:</p>
        <PolicyList
          items={[
            "You are under 18, or you do not complete an age check.",
            "You hold more than one account, or the account is not in your own name.",
            "You do not complete identity, address, or source-of-funds checks when they are required.",
            "A deposit is reversed or disputed with your bank or card issuer.",
            "The account is used in a way that breaks these policies, or that requires a report under the Financial Intelligence Centre Act 38 of 2001.",
            "You ask for a time-out or self-exclusion, or ABC Bookmakers applies the Responsible Gambling Policy.",
            "The law requires the account to be restricted.",
          ]}
        />
        <p>
          You may ask for your account to be closed through your player
          account. A stake that is already held for an open challenge stays
          held until that challenge is settled or voided under the Betting
          Rules. Any available balance that remains is paid to your verified
          own account under the Deposits & Withdrawals Policy.
        </p>
        <p>
          During a suspension you cannot place a new bet. ABC Bookmakers will
          tell you through your player account when the reason can be shared.
          Where the law forbids that explanation, the account stays restricted
          without it.
        </p>
      </PolicySection>

      <PolicySection title="10. Changes to these terms">
        <p>
          If these terms or any of the other five policies change, the updated
          wording is shown in your player account before it applies to a new
          bet, a new deposit, or a new withdrawal. A bet that was already
          accepted is settled on the Betting Rules that applied when the bet
          was accepted.
        </p>
        <p>
          If you do not accept an update, do not place a new bet. You may ask
          for the account to be closed and for the available balance to be
          withdrawn under the Deposits & Withdrawals Policy.
        </p>
      </PolicySection>

      <PolicySection title="11. Liability">
        <p>
          ABC Bookmakers runs the betting account with reasonable care. A
          challenge result is settled only after every player with a bet on
          that challenge has confirmed it, as the Betting Rules describe.
        </p>
        <p>
          Nothing in these terms takes away a right that the Consumer
          Protection Act 68 of 2008 does not allow to be taken away, and
          nothing in these terms limits liability for fraud.
        </p>
      </PolicySection>

      <PolicySection title="12. Complaints and the law that applies">
        <p>
          If you disagree with a bet, a balance, or a decision on your
          account, contact ABC Bookmakers support through your player account.
          Say which challenge or transaction you mean, and what you believe is
          wrong. The dispute rules for a challenge result are in the Betting
          Rules.
        </p>
        <p>
          These terms are governed by the laws of the Republic of South
          Africa. They are to be read with the National Gambling Act 7 of
          2004, the Financial Intelligence Centre Act 38 of 2001, the
          Protection of Personal Information Act 4 of 2013, and the Consumer
          Protection Act 68 of 2008, in each case where that Act applies to
          the player account.
        </p>
        <p>
          Contact ABC Bookmakers support through your player account. That is
          the route for account, betting, privacy, and payment questions.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
