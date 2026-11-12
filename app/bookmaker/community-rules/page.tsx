import type { Metadata } from "next";

import {
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "Community & Competition Rules",
  description:
    "How players take part in a TEEZ Golf Challenge on the ABC Bookmakers platform. ABC Bookmakers owns and runs the platform.",
};

export default function CommunityRulesPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/community-rules"
      title="Community & Competition Rules"
      summary="ABC Bookmakers owns and runs the player platform and holds every player account. TEEZ Golf Challenges is the golf game offered on that platform. These rules are how players take part in a challenge. They do not make TEEZ Golf Challenges the bookmaker."
    >
      <PolicySection title="1. A challenge is a bet with ABC Bookmakers">
        <p>
          When you create or join a TEEZ Golf Challenge, the stake you confirm
          is a bet with ABC Bookmakers. The other players are your opponents
          in the game. They are not the bookmaker, and the game does not hold
          the stake. The stake is held in your ABC Bookmakers player account
          until the challenge is settled or the bet is void, under the Betting
          Rules.
        </p>
      </PolicySection>

      <PolicySection title="2. Before anyone commits a stake">
        <p>The challenge must show, before a player confirms a stake:</p>
        <PolicyList
          items={[
            "Who has been invited or entered.",
            "The format of the round.",
            "The stake each player is asked to commit.",
            "That the result is not final until every player with a bet on the challenge has confirmed it.",
          ]}
        />
        <p>
          Do not change the format or the stake after a bet has been accepted,
          except where the Betting Rules void the bet.
        </p>
      </PolicySection>

      <PolicySection title="3. Playing the round">
        <p>
          Play the round the challenge describes. Each player is responsible
          for the score they record. A score must reflect the round that was
          played. ABC Bookmakers does not take the result from a television
          feed or from a message sent outside the player account.
        </p>
      </PolicySection>

      <PolicySection title="4. Confirming the result">
        <p>
          After the round, the players select the result in the player
          account. Every player who has a bet on that challenge must confirm
          the same result before ABC Bookmakers settles it. A result confirmed
          by some, but not all, of those players is not final and is not paid.
        </p>
        <p>You must not:</p>
        <PolicyList
          items={[
            "Confirm a result you know is wrong.",
            "Refuse to look at a result and then ask for a payment anyway.",
            "Ask another player to confirm a result they were not part of.",
            "Agree a different result in private and expect ABC Bookmakers to pay that private agreement.",
          ]}
        />
        <p>
          If the players do not all confirm the same result, any player may
          ask ABC Bookmakers support, through the player account, for a
          review. The Betting Rules explain when the bets are then void and
          the stakes returned.
        </p>
      </PolicySection>

      <PolicySection title="5. How players treat each other">
        <p>
          A challenge is still a game between people. You may not threaten,
          insult, or pressure another player to stake more than they confirmed,
          or to confirm a result they dispute. You may not publish another
          player’s identity number, address, password, or bank details.
        </p>
        <p>
          One account each. You may not enter a challenge through someone
          else’s account, and you may not ask a person under 18 to play or to
          confirm a result.
        </p>
      </PolicySection>

      <PolicySection title="6. Disputes">
        <p>
          Contact ABC Bookmakers support through your player account. Name the
          challenge and what you say is wrong. ABC Bookmakers will look at the
          stakes and the confirmations recorded for every player who has a bet
          on that challenge. Settlement follows the Betting Rules, and only
          after every such player has confirmed the same result.
        </p>
        <p>
          These rules do not cover a side arrangement made outside the player
          account. ABC Bookmakers does not settle that arrangement and does
          not hold money for it.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
