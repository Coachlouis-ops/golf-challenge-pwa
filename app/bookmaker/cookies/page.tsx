import type { Metadata } from "next";

import {
  ExternalLink,
  PolicyDocument,
  PolicyList,
  PolicySection,
} from "@/app/bookmaker/_components/PolicyDocument";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How ABC Bookmakers uses cookies and similar storage on the player platform. TEEZ Golf Challenges is the golf game offered on that platform.",
};

export default function CookiePolicyPage() {
  return (
    <PolicyDocument
      currentHref="/bookmaker/cookies"
      title="Cookie Policy"
      summary="ABC Bookmakers owns and runs the player platform. This policy explains the cookies and similar storage used on that platform. TEEZ Golf Challenges is the golf game offered on it, and it does not run the platform or hold your account."
    >
      <PolicySection title="1. What this policy covers">
        <p>
          A cookie is a small file a site can store on your device. This
          policy also covers similar storage on your device, including local
          storage, that the platform uses for the same kinds of purpose.
        </p>
        <p>
          It applies when you open the website, register, sign in, or use your
          ABC Bookmakers player account. It is part of the ABC Bookmakers
          Privacy Policy. Where storage identifies you, the Privacy Policy and
          the Protection of Personal Information Act 4 of 2013 also apply.
        </p>
      </PolicySection>

      <PolicySection title="2. Storage the account needs">
        <p>
          Essential storage keeps the player account working. It is used to:
        </p>
        <PolicyList
          items={[
            "Keep you signed in to your ABC Bookmakers player account.",
            "Protect the sign-in against use by someone else on that device.",
            "Remember the screen you are on while you move through the account.",
            "Remember whether you accepted or rejected non-essential storage, where a page asks you to choose.",
          ]}
        />
        <p>
          If you block essential storage, you may be signed out, and you may
          not be able to register or stay signed in. That storage is not used
          to sell your personal information.
        </p>
      </PolicySection>

      <PolicySection title="3. The choice you can make">
        <p>
          Some pages ask you to accept non-essential storage or to reject it.
          Your choice is saved on your device so the question is not repeated
          on every visit. Rejecting non-essential storage does not close your
          player account and does not stop a bet that the Betting Rules
          already accepted.
        </p>
        <p>
          ABC Bookmakers does not sell personal information collected through
          this storage. This policy does not name a separate advertising
          network, because the choice itself is stored on your device.
        </p>
      </PolicySection>

      <PolicySection title="4. Payment pages">
        <p>
          When you start a deposit or another payment in your player account,
          the payment provider that handles that payment may set its own
          cookies or similar storage. That storage is controlled by the
          provider, under its own notice. ABC Bookmakers does not ask you to
          send a card number or a password to support.
        </p>
      </PolicySection>

      <PolicySection title="5. How long it stays">
        <p>
          Sign-in storage lasts for the session, or until you sign out or
          clear the site data in your browser, whichever comes first. A saved
          choice about non-essential storage stays on the device until you
          clear it or you are asked to choose again.
        </p>
      </PolicySection>

      <PolicySection title="6. Your browser">
        <p>You can use your browser settings to:</p>
        <PolicyList
          items={[
            "See the storage a site has saved.",
            "Delete it.",
            "Block it.",
            "Ask the browser to warn you before storage is saved.",
          ]}
        />
        <p>
          Blocking or deleting essential storage can sign you out of your ABC
          Bookmakers player account.
        </p>
      </PolicySection>

      <PolicySection title="7. Questions">
        <p>
          Questions about this policy go to ABC Bookmakers support through
          your player account. You may also complain to the Information
          Regulator. The Regulator’s toll-free line is{" "}
          <ExternalLink href="tel:0800017160">0800 017 160</ExternalLink>, and
          POPIA complaints can be sent to{" "}
          <ExternalLink href="mailto:POPIAComplaints@inforegulator.org.za">
            POPIAComplaints@inforegulator.org.za
          </ExternalLink>
          . Those details are the Regulator’s. They are not an ABC Bookmakers
          support channel.
        </p>
      </PolicySection>
    </PolicyDocument>
  );
}
