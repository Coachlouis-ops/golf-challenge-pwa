import type { Metadata } from "next";

import {
  ExternalLink,
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "ABC Bookmakers Privacy Policy",
  description:
    "How ABC Bookmakers collects, uses, shares, and protects personal information for player betting accounts.",
};

export default function BookmakerPrivacyPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/privacy"
      title="ABC Bookmakers Privacy Policy"
      summary="This policy explains how ABC Bookmakers handles personal information for your player betting account and for bets on TEEZ Golf Challenges. It is written for the Protection of Personal Information Act 4 of 2013 (POPIA)."
    >
      <PolicySection title="1. Who is responsible">
        <p>
          ABC Bookmakers is the responsible party for the personal information
          processed to open and run your player betting account, to take and
          settle bets on TEEZ Golf Challenges, and to carry out the checks in
          the FICA & Anti-Money Laundering Policy.
        </p>
        <p>
          TEEZ Golf Challenges is the golf game offered on that account. This
          policy covers the personal information used for the betting account.
          It does not ask you to send account information to any address other
          than the player account itself.
        </p>
      </PolicySection>

      <PolicySection title="2. The law that applies">
        <p>
          Personal information is processed in line with POPIA. Where a check
          or a report is required by the Financial Intelligence Centre Act 38
          of 2001, or where an age or exclusion rule is required by the
          National Gambling Act 7 of 2004, that legal duty is a reason for the
          processing. Where the Consumer Protection Act 68 of 2008 applies to
          a disclosure, the information needed to make that disclosure is used
          for that purpose.
        </p>
        <p>
          You are asked to accept this policy before the account is created.
          Some processing does not depend on that tick: a legal duty, or a
          step you ask for such as a withdrawal, can require the same
          information.
        </p>
      </PolicySection>

      <PolicySection title="3. Information you give">
        <p>Depending on what you do in the player account, this can include:</p>
        <PolicyList
          items={[
            "Your email address and the password you use to sign in. The password is stored so that it can be checked at sign-in. Do not send your password to anyone, including support.",
            "Your name, date of birth, and South African identity number or passport number.",
            "A copy of your identity document or passport, and a document that shows your residential address.",
            "The cellphone number or other contact detail you add to your profile.",
            "Bank account or card details you use for a deposit or a withdrawal, which must be in your own name.",
            "Information you provide for a source-of-funds check, such as a payslip or a bank statement.",
            "Messages you send to ABC Bookmakers support through your player account.",
            "The choices you save for a deposit limit, a time-out, or self-exclusion.",
          ]}
        />
      </PolicySection>

      <PolicySection title="4. Information from your use of the account">
        <PolicyList
          items={[
            "The record of deposits, withdrawals, stakes held, bets accepted, challenge results you confirm, and amounts credited or returned.",
            "The date and time you sign in, and the technical details needed to keep the session secure, including a cookie or similar storage that remembers the sign-in.",
            "The device and connection details needed to detect a shared sign-in, a duplicate account, or a payment that does not match the account holder.",
          ]}
        />
        <p>
          ABC Bookmakers does not buy personal information about you from a
          data broker, and does not sell personal information.
        </p>
      </PolicySection>

      <PolicySection title="5. Why the information is used">
        <PolicyList
          items={[
            "To create your player account, sign you in, and show you your balance and your challenges.",
            "To accept, hold, settle, or void a bet under the Betting Rules.",
            "To take a deposit from you and to pay a withdrawal to a verified account in your own name.",
            "To check that you are 18 or older and that you hold only one account.",
            "To carry out identity, address, and source-of-funds checks, and to make a report required by the Financial Intelligence Centre Act 38 of 2001.",
            "To apply a deposit limit, time-out, or self-exclusion you request, or one applied under the Responsible Gambling Policy.",
            "To answer a support request or a dispute you raise through your player account.",
            "To protect the account against unauthorised use and to keep the records the law requires.",
          ]}
        />
      </PolicySection>

      <PolicySection title="6. Who else receives it">
        <p>Personal information is shared only as far as the purpose requires:</p>
        <PolicyList
          items={[
            "A payment provider that processes a deposit or withdrawal you confirm in your player account. The provider receives the details needed for that payment.",
            "The Financial Intelligence Centre, when a report is required under the Financial Intelligence Centre Act 38 of 2001.",
            "The Information Regulator, if a POPIA complaint requires it.",
            "A professional adviser who is bound to keep the information confidential, where that advice is needed for a dispute or a legal duty.",
            "Another person, only where the law requires the disclosure.",
          ]}
        />
        <p>
          Other players in a TEEZ Golf Challenge can see the display name you
          use in that challenge and the result that is confirmed. They cannot
          see your identity number, your address, your password, or your bank
          or card details.
        </p>
      </PolicySection>

      <PolicySection title="7. How long it is kept">
        <p>
          Account information is kept for as long as the player account is
          open, and for as long after closure as the purpose still requires.
          Client and transaction records that the Financial Intelligence
          Centre Act 38 of 2001 requires to be kept are kept for at least five
          years, counted in the way that Act requires.
        </p>
        <p>
          When a record is no longer needed for the account, for a legal duty,
          or for an open dispute, it is deleted or destroyed, or the
          identifying details are removed.
        </p>
      </PolicySection>

      <PolicySection title="8. How it is protected">
        <p>
          ABC Bookmakers uses access controls, encrypted connections, and
          limited staff access so that personal information is used only for
          the purposes in this policy. No method of storage or transmission is
          free of risk. If a compromise of your personal information creates a
          risk that POPIA requires us to notify, you are told through your
          player account.
        </p>
        <p>
          Do not send a card number, a password, or a copy of your identity
          document in an ordinary email. Documents for a check are submitted
          through your player account.
        </p>
      </PolicySection>

      <PolicySection title="9. Your rights under POPIA">
        <p>You may ask ABC Bookmakers, through your player account, to:</p>
        <PolicyList
          items={[
            "Confirm whether we hold personal information about you, and to give you a copy of it.",
            "Correct information that is inaccurate, incomplete, or out of date.",
            "Delete or destroy information that POPIA says should no longer be held. A legal duty to keep a FICA record can mean a record is kept for the required period even after you ask for deletion.",
            "Stop using your information for direct marketing.",
            "Object to processing where POPIA gives you that right. An objection does not stop a check or a report that the law still requires, and it may mean the account cannot stay open.",
          ]}
        />
        <p>
          ABC Bookmakers will respond through your player account. If a
          request cannot be met in full, the reply will say why, including
          where a law requires the record to be kept.
        </p>
      </PolicySection>

      <PolicySection title="10. Direct marketing">
        <p>
          Marketing about ABC Bookmakers or TEEZ Golf Challenges is sent only
          where POPIA allows it. You can refuse marketing when it is offered,
          and you can stop it later from your player account.
        </p>
        <p>
          A player who is under 18, self-excluded, or in a time-out is not
          sent betting marketing. Messages that the account itself needs, such
          as a withdrawal status or a request to complete a FICA check, are
          not marketing and may still be sent through the player account.
        </p>
      </PolicySection>

      <PolicySection title="11. People under 18">
        <p>
          A player account is only for a person who is 18 or older. ABC
          Bookmakers does not knowingly keep an account for a child. If an
          account was opened by someone under 18, it is closed under the Terms
          & Conditions and this information is used only to close it, to meet
          a legal duty, and to return any cleared deposit to its source.
        </p>
      </PolicySection>

      <PolicySection title="12. Complaints">
        <p>
          Contact ABC Bookmakers support through your player account first,
          and say what you want corrected or what you object to. If you are
          not satisfied, you may complain to the Information Regulator. The
          Regulator’s toll-free line is{" "}
          <ExternalLink href="tel:0800017160">0800 017 160</ExternalLink>, and
          POPIA complaints can be sent to{" "}
          <ExternalLink href="mailto:POPIAComplaints@inforegulator.org.za">
            POPIAComplaints@inforegulator.org.za
          </ExternalLink>
          . The Regulator’s site is{" "}
          <ExternalLink href="https://inforegulator.org.za/">
            inforegulator.org.za
          </ExternalLink>
          . Those details are the Regulator’s, published on its contact page.
          They are not an ABC Bookmakers support channel.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
