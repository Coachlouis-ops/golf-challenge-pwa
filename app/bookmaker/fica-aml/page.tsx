import type { Metadata } from "next";

import {
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "FICA & Anti-Money Laundering Policy",
  description:
    "Identity, address, and source-of-funds checks ABC Bookmakers applies before withdrawal, and how suspicious transactions are handled.",
};

export default function FicaAmlPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/fica-aml"
      title="FICA & Anti-Money Laundering Policy"
      summary="ABC Bookmakers checks who you are, where you live, and where your money comes from before it pays a withdrawal. This policy is how those checks work, and how suspicious transactions are reported under the Financial Intelligence Centre Act 38 of 2001 (FICA)."
    >
      <PolicySection title="1. Why these checks exist">
        <p>
          The player account is a betting account in your own name. It is not
          an account you may hold for someone else, and it is not a way to
          move another person’s money. FICA requires customer due diligence
          and reports of suspicious and unusual transactions where that Act
          applies. ABC Bookmakers applies the checks in this policy to every
          player account.
        </p>
        <p>
          The National Gambling Act 7 of 2004 also requires that a person
          under 18 does not gamble. Age is checked as part of identity
          verification.
        </p>
      </PolicySection>

      <PolicySection title="2. Identity">
        <p>Before a withdrawal is paid, you must provide:</p>
        <PolicyList
          items={[
            "Your full name and date of birth, matching the document you submit.",
            "Your South African identity number, or your passport number if you do not use a South African identity document.",
            "A clear copy of that identity document or passport.",
            "Confirmation that you are 18 or older.",
          ]}
        />
        <p>
          The document must be current and must be yours. A document that is
          cropped so that the name or the photograph cannot be read, or a
          document in another person’s name, is not accepted.
        </p>
      </PolicySection>

      <PolicySection title="3. Address">
        <p>
          You must also provide proof of the residential address where you
          live. The document must show your name and that address. A bank
          statement, a municipal account, or a similar official document is
          suitable when it does so.
        </p>
        <p>
          A postal box on its own is not a residential address. If you change
          address, update it in your player account and submit a new document
          before the next withdrawal.
        </p>
      </PolicySection>

      <PolicySection title="4. When the check is done">
        <p>
          Identity and address verification are completed before the first
          withdrawal. ABC Bookmakers may also ask for them earlier, including
          before a deposit is made available for betting, if the account, the
          payment method, or the activity needs the check sooner.
        </p>
        <p>
          A check is repeated when your details change, when a document can no
          longer be relied on, when a withdrawal is requested to a newly added
          bank account, or when the activity on the account no longer matches
          what was previously understood.
        </p>
      </PolicySection>

      <PolicySection title="5. Source of funds">
        <p>
          Source of funds means where the particular money in the player
          account came from. ABC Bookmakers may ask you to explain that
          source and to provide documents that support the explanation, such
          as a payslip, a bank statement showing the credit, or a record of
          business income.
        </p>
        <p>
          A source-of-funds check is required where the deposits, the size of
          activity, or the payment method do not match the information already
          on the account, and it may be required in other cases before a
          withdrawal is paid. You are told through your player account what is
          needed.
        </p>
        <p>
          While a source-of-funds check is open, deposits, new bets, and
          withdrawals can be paused. A stake already held for an open
          challenge stays held until that challenge is settled or voided under
          the Betting Rules.
        </p>
      </PolicySection>

      <PolicySection title="6. If you do not complete a check">
        <p>
          If you do not provide the information, or if it cannot be verified,
          ABC Bookmakers will not pay a withdrawal. The account may be
          suspended. An available balance stays in the account until the check
          is completed, or until the money can be returned to a verified
          source in your own name.
        </p>
        <p>
          ABC Bookmakers does not pay an available balance to another person
          because a check was not completed.
        </p>
      </PolicySection>

      <PolicySection title="7. Your own payment accounts">
        <p>
          Deposits must come from a card or account in your own name.
          Withdrawals are paid only to a bank account in your own name that
          has been verified against the identity and address on the player
          account. The Deposits & Withdrawals Policy sets this out in full.
        </p>
        <p>
          A payment from a third party, a cash deposit arranged so that the
          payer cannot be identified, or a request to pay a withdrawal to
          someone else, is refused and may be treated as a suspicious
          transaction.
        </p>
      </PolicySection>

      <PolicySection title="8. Suspicious and unusual transactions">
        <p>
          ABC Bookmakers reports a suspicious or unusual transaction to the
          Financial Intelligence Centre where FICA requires that report. A
          transaction can be suspicious because of who is paying, where the
          money appears to come from, a request to pay someone else, an
          attempt to avoid a check, or activity that has no clear betting
          purpose.
        </p>
        <p>
          A cash transaction that reaches the cash threshold set under FICA is
          reported to the Financial Intelligence Centre where the Act requires
          that report. This policy does not restate that threshold. The
          threshold is the one set under the Act.
        </p>
        <p>
          Where the law prohibits telling you that a report has been made, or
          that a report is being considered, ABC Bookmakers will not tell you.
          The account may stay restricted while the matter is dealt with.
        </p>
      </PolicySection>

      <PolicySection title="9. Records">
        <p>
          The records of your identity, your address, your source-of-funds
          documents, and your transactions are kept for as long as the
          Financial Intelligence Centre Act 38 of 2001 requires. Where that
          Act requires a record to be kept, it is kept for at least five
          years, counted in the way the Act requires. The ABC Bookmakers
          Privacy Policy explains your POPIA rights alongside that duty.
        </p>
      </PolicySection>

      <PolicySection title="10. How to send documents">
        <p>
          Submit documents through your player account when a check is
          requested. Contact ABC Bookmakers support through your player
          account if you cannot complete a step. Do not send identity
          documents or bank statements to a personal inbox.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
