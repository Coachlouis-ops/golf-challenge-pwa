import type { Metadata } from "next";

import {
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "Betting Rules",
  description:
    "How ABC Bookmakers accepts, voids, and settles bets on TEEZ Golf Challenges, including player confirmation before settlement.",
};

export default function BettingRulesPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/betting-rules"
      title="Betting Rules"
      summary="These rules cover every bet you place with ABC Bookmakers on a TEEZ Golf Challenge. A challenge is not settled, and winnings are not credited, until every player who has a bet on that challenge has confirmed the result."
    >
      <PolicySection title="1. What you can bet on">
        <p>
          You bet from your ABC Bookmakers player account on a TEEZ Golf
          Challenge that is open in that account. The challenge shows, before
          you commit a stake, who is playing, the format, and the stake.
        </p>
        <p>
          A challenge may be singles, pairs, a group, or a corporate match.
          The format shown in the challenge is the format the confirmed result
          is judged on. ABC Bookmakers does not settle the challenge on a
          different format agreed privately after the bets have been accepted.
        </p>
      </PolicySection>

      <PolicySection title="2. The stake">
        <p>
          The stake is the amount you commit to that challenge. It is shown
          before you confirm. You can place the bet only if your available
          balance covers the stake in full.
        </p>
        <p>
          When the bet is accepted, the stake is held. A held stake is not
          available for another bet and is not available for withdrawal. It
          stays held until the challenge is settled or the bet is void, as
          these rules describe.
        </p>
      </PolicySection>

      <PolicySection title="3. When a bet is accepted">
        <p>
          A bet is accepted only when your player account shows it as
          accepted. It is not accepted if the challenge is no longer open, if
          the available balance does not cover the stake, if the account is
          suspended, or if you are in a time-out or self-exclusion.
        </p>
        <p>
          ABC Bookmakers may refuse a bet before it is accepted. A refusal
          does not need to be a reflection on you. If the bet is not accepted,
          the stake is not held.
        </p>
        <p>
          You cannot cancel an accepted bet on your own. If the challenge is
          cancelled in the player account before it is played, every bet on it
          is void and each stake returns to the available balance of the
          player who placed it.
        </p>
      </PolicySection>

      <PolicySection title="4. Your own decisions">
        <p>
          You bet for yourself, from your own player account. You may not bet
          on behalf of another person, and you may not allow another person to
          bet from your account. A bet placed by someone who is not the
          account holder may be voided once it is identified, and the account
          may be suspended under the Terms & Conditions.
        </p>
      </PolicySection>

      <PolicySection title="5. Playing the round">
        <p>
          The round is played by the players in the challenge. ABC Bookmakers
          does not take the result from a television feed, a club scoreboard,
          or a message sent outside the player account. The result used for
          settlement is the result the players confirm in their player
          accounts.
        </p>
        <p>
          Each player is responsible for confirming only a result that
          reflects the challenge they played. Confirming a result you know is
          wrong is a breach of the Terms & Conditions.
        </p>
      </PolicySection>

      <PolicySection title="6. Confirmation before settlement">
        <p>
          A TEEZ Golf Challenge is not settled until every player who has an
          accepted bet on that challenge has confirmed the result.
        </p>
        <PolicyList
          items={[
            "Confirmation is given in the player account.",
            "A result chosen by one player is not final.",
            "A result confirmed by some, but not all, of the players who have a bet on the challenge is not final.",
            "Until every such player has confirmed the same result, no winnings are credited and each stake stays held.",
          ]}
        />
      </PolicySection>

      <PolicySection title="7. Settlement">
        <p>
          When every player who has an accepted bet on the challenge has
          confirmed the same result, the challenge is settled on that result.
          Winnings are then credited to the betting-account balance of each
          confirmed winner.
        </p>
        <p>
          The stake you committed, and the way the confirmed result is shared
          between the players, are the terms shown in the challenge before you
          placed the bet. Settlement follows those terms and the confirmed
          result. It does not follow a later private agreement.
        </p>
        <p>
          A credited winning becomes part of your available balance, except
          for any amount that must stay held for another open challenge. A
          withdrawal of that balance is still subject to the Deposits &
          Withdrawals Policy, including identity and address verification.
        </p>
      </PolicySection>

      <PolicySection title="8. If the players do not all confirm">
        <p>
          If the players do not all confirm the same result, the challenge
          stays unsettled. It is not paid on a majority, and it is not paid on
          the result selected by the player who created the challenge.
        </p>
        <p>
          Any player in the challenge may contact ABC Bookmakers support
          through their player account and ask for a review. Support will ask
          the players who have not confirmed to confirm the result in their
          player accounts.
        </p>
        <p>
          If the players still have not all confirmed the same result, the
          bets are void. Each stake is returned to the available balance of
          the player who placed it. A void bet is not a win and is not a loss.
        </p>
      </PolicySection>

      <PolicySection title="9. Void bets">
        <p>
          A bet is void, and the stake returns to the available balance of the
          player who placed it, if:
        </p>
        <PolicyList
          items={[
            "The challenge is cancelled before it is played, or it does not take place.",
            "The bet was accepted in error, including where the stake held is not the stake you confirmed.",
            "You were under 18, or you were self-excluded, at the time the bet was accepted.",
            "The account was a duplicate, or the bet was not placed by the account holder.",
            "The players with bets on the challenge do not confirm the same result, after the review in the previous section.",
          ]}
        />
        <p>
          Where only one player’s bet is void and the challenge can still be
          confirmed by every remaining player who has a bet on it, the
          remaining bets stay open and are settled only if those players
          confirm the result. If they cannot, those bets are void as well.
        </p>
      </PolicySection>

      <PolicySection title="10. Mistakes">
        <p>
          If your player account shows a stake, a challenge, or a balance that
          you did not confirm, contact ABC Bookmakers support through your
          player account before you confirm a result. If the bet was accepted
          in error, it is void and the stake is returned.
        </p>
        <p>
          A result that every participating player has already confirmed is
          not reopened because a player later prefers a different outcome.
          It can be reopened if the confirmation was given on the wrong
          account, by a player who was not eligible, or by mistake about which
          challenge was being confirmed. Ask for that review through your
          player account.
        </p>
      </PolicySection>

      <PolicySection title="11. Disputes">
        <p>
          To dispute a challenge, contact ABC Bookmakers support through your
          player account. Name the challenge and say what you believe is
          wrong.
        </p>
        <p>
          ABC Bookmakers will look at the acceptances, the stakes held, and
          the confirmations recorded for every player who has a bet on that
          challenge. Settlement follows section 7 only where those players
          have confirmed the same result. If they have not, section 8 applies.
        </p>
        <p>
          The outcome of the review is sent through your player account. These
          rules cover bets placed with ABC Bookmakers through the player
          account. They do not cover a private side arrangement made outside
          the account, and ABC Bookmakers does not settle that kind of
          arrangement.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
