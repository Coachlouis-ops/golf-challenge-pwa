import type { Metadata } from "next";

import {
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "Deposits & Withdrawals Policy",
  description:
    "How deposits and withdrawals work on an ABC Bookmakers player account, including payment only to a verified account in your own name.",
};

export default function DepositsWithdrawalsPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/deposits-withdrawals"
      title="Deposits & Withdrawals Policy"
      summary="Money moves into and out of your ABC Bookmakers betting account only in your own name. A withdrawal is paid only after the identity and address checks in the FICA & Anti-Money Laundering Policy, and only to a bank account that those checks have matched to you."
    >
      <PolicySection title="1. Your balance">
        <p>
          Your player account shows an available balance and any amount held
          as a stake on an open TEEZ Golf Challenge. You can withdraw only
          from the available balance. A held stake stays held until that
          challenge is settled or the bet is void under the Betting Rules.
        </p>
        <p>
          The currency and the amount of every deposit and every withdrawal
          are shown in your player account before you confirm them.
        </p>
      </PolicySection>

      <PolicySection title="2. Deposits">
        <p>
          You deposit through the payment methods offered in your player
          account. The deposit is credited when the payment has cleared. A
          payment that is declined is not credited.
        </p>
        <p>
          You may deposit only from a card or account in your own name. A
          deposit from another person is not accepted as your betting balance.
          If it is identified, it is not made available for betting and it is
          returned to the source it came from where that source can be
          verified, or it is held while the FICA & Anti-Money Laundering
          Policy is applied.
        </p>
        <p>
          A deposit limit you have set under the Responsible Gambling Policy
          is applied before the deposit is confirmed. A deposit that would
          pass the limit is declined.
        </p>
      </PolicySection>

      <PolicySection title="3. Your own account only">
        <p>ABC Bookmakers pays a withdrawal only if all of the following are true:</p>
        <PolicyList
          items={[
            "The player account is in your own name.",
            "Your identity and residential address have been verified under the FICA & Anti-Money Laundering Policy.",
            "The bank account you choose is in your own name and has been verified against that identity.",
            "Any source-of-funds check that was requested has been completed.",
            "The amount is available and is not held for an open challenge.",
          ]}
        />
        <p>
          A withdrawal is not paid to another person, to a cash collector, to
          a card that is not yours, or to an account you cannot show is yours.
          A request to do so is refused.
        </p>
      </PolicySection>

      <PolicySection title="4. Verification before the first withdrawal">
        <p>
          The first withdrawal is not paid until identity and address
          verification are complete. Later withdrawals can be paused if a
          fresh check or a source-of-funds check is required. You are told
          through your player account what to submit. The withdrawal stays
          pending until the check is finished.
        </p>
        <p>
          Submitting the documents does not by itself mean the withdrawal has
          been sent. The player account shows when it has been sent.
        </p>
      </PolicySection>

      <PolicySection title="5. Requesting a withdrawal">
        <p>
          You request a withdrawal in your player account for an amount up to
          your available balance. If a minimum or a maximum applies to that
          request, it is shown before you confirm. This policy does not set a
          separate figure.
        </p>
        <p>
          ABC Bookmakers does not deduct a further amount that was not shown
          to you before you confirmed. The amount shown is the amount of that
          deposit or that withdrawal.
        </p>
        <p>
          After the checks are complete, the withdrawal is sent to your
          verified bank account. How long it then takes to appear depends on
          that bank. The player account shows the withdrawal as sent once ABC
          Bookmakers has sent it.
        </p>
      </PolicySection>

      <PolicySection title="6. Details that do not verify">
        <p>
          If the bank account details do not match your verified name, the
          withdrawal is not sent. The amount stays in your available balance,
          and you can submit details of a bank account that is in your own
          name.
        </p>
        <p>
          If you have made an error in the account number, contact ABC
          Bookmakers support through your player account before the withdrawal
          is sent. After it has been sent, the bank controls when the funds
          appear, and support will record what you report.
        </p>
      </PolicySection>

      <PolicySection title="7. A payment that is reversed">
        <p>
          If a deposit is credited and your bank or card issuer later reverses
          it, the amount of that deposit may be debited from your betting
          balance. That debit can be taken from winnings that were credited
          from stakes funded by the reversed deposit.
        </p>
        <p>
          ABC Bookmakers may suspend the account while a reversal or a
          payment dispute is explained. Open challenges remain under the
          Betting Rules. Contact support through your player account if you
          believe a reversal was made in error.
        </p>
      </PolicySection>

      <PolicySection title="8. Time-out, self-exclusion, and open checks">
        <p>
          During a time-out or a self-exclusion you cannot deposit and you
          cannot place a bet. You may still request withdrawal of the
          available balance to your verified own account, once any check
          required by the FICA & Anti-Money Laundering Policy is complete.
        </p>
        <p>
          During a source-of-funds or identity check, a withdrawal stays
          pending. It is not redirected to another person while the check is
          open.
        </p>
      </PolicySection>

      <PolicySection title="9. Closing the account">
        <p>
          If you close your player account, or if ABC Bookmakers closes it
          under the Terms & Conditions, an available balance is paid to your
          verified own bank account after the checks in this policy. A stake
          held for an open challenge is not withdrawn until that challenge is
          settled or voided under the Betting Rules.
        </p>
        <p>
          Questions about a deposit or a withdrawal go to ABC Bookmakers
          support through your player account. Include the amount and the date
          shown in the account so the transaction can be found.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
