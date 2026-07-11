"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Privacy Policy</h1>

        <p className="text-sm text-gray-400 mb-8">
          How Teez Golf Challenges collects, uses, stores, protects, and shares
          personal information
        </p>

        <div className="space-y-6 text-sm text-gray-300">
          <p>
            This Privacy Policy explains how Honey Badger Technologies (PTY) LTD
            collects, uses, stores, protects, shares, and otherwise processes
            personal information through the Teez Golf Challenges Platform.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD is committed to processing
            personal information lawfully, reasonably, and securely in
            accordance with the Protection of Personal Information Act 4 of 2013
            (“POPIA”) and other applicable South African laws.
          </p>

          <p>
            By registering an Account, creating a player profile, subscribing to
            the Platform, or using Teez Golf Challenges, you acknowledge that
            your personal information will be processed as described in this
            Privacy Policy.
          </p>

          {/* 1 */}
          <h2 className="text-white font-semibold">
            1. Responsible Party
          </h2>

          <p>
            The responsible party for personal information processed through
            Teez Golf Challenges is:
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD
            <br />
            Registration Number: 2026/102722/07
            <br />
            Trading Platform: Teez Golf Challenges
            <br />
            Country: South Africa
          </p>

          {/* 2 */}
          <h2 className="text-white font-semibold">
            2. Scope of this Privacy Policy
          </h2>

          <p>
            This Privacy Policy applies to personal information processed
            through:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>The Teez Golf Challenges website.</li>
            <li>The Teez Golf Challenges web application.</li>
            <li>User registration and authentication.</li>
            <li>Player profiles.</li>
            <li>Subscriptions and payment-status management.</li>
            <li>Teez Token wallet functionality.</li>
            <li>Golf challenges and scoreboards.</li>
            <li>Rankings, statistics, achievements, and match history.</li>
            <li>Customer support and dispute resolution.</li>
            <li>Security, fraud prevention, and legal compliance.</li>
          </ul>

          {/* 3 */}
          <h2 className="text-white font-semibold">
            3. Personal Information We Collect
          </h2>

          <p>
            The information collected depends on how you use the Platform.
          </p>

          <p>We may collect the following categories of information:</p>

          <h3 className="text-white font-semibold">
            3.1 Account and Registration Information
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Name and surname.</li>
            <li>Email address.</li>
            <li>Mobile number.</li>
            <li>Date of birth.</li>
            <li>Account identifier or user ID.</li>
            <li>Authentication and verification status.</li>
            <li>Account creation and login information.</li>
          </ul>

          <h3 className="text-white font-semibold">
            3.2 Player Profile Information
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Player name.</li>
            <li>Battle name or display name.</li>
            <li>Golf club.</li>
            <li>Player division.</li>
            <li>Profile image where provided.</li>
            <li>Other information entered into the player profile.</li>
          </ul>

          <h3 className="text-white font-semibold">
            3.3 Competition and Gameplay Information
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Golf challenge participation.</li>
            <li>Challenge invitations.</li>
            <li>Scores and results.</li>
            <li>Finalised competition records.</li>
            <li>Match history.</li>
            <li>Rankings and leaderboard positions.</li>
            <li>Wins, losses, streaks, statistics, and achievements.</li>
            <li>Live scoreboard information.</li>
            <li>Teez Token allocations, deductions, and balances.</li>
          </ul>

          <h3 className="text-white font-semibold">
            3.4 Subscription and Transaction Information
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Subscription status.</li>
            <li>Subscription activation and cancellation dates.</li>
            <li>Payment status.</li>
            <li>Transaction references.</li>
            <li>Payment amount and transaction date.</li>
            <li>Refund or payment-dispute information.</li>
            <li>Payment gateway confirmation information.</li>
          </ul>

          <p>
            Honey Badger Technologies (PTY) LTD does not store complete payment
            card numbers, CVV numbers, card PINs, banking passwords, one-time
            PINs, or confidential banking login credentials on the Platform.
          </p>

          <h3 className="text-white font-semibold">
            3.5 Technical and Usage Information
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>IP address.</li>
            <li>Browser type.</li>
            <li>Device type.</li>
            <li>Operating system.</li>
            <li>Login timestamps.</li>
            <li>Platform usage activity.</li>
            <li>Error reports and technical logs.</li>
            <li>Security and fraud-prevention information.</li>
            <li>Cookies and similar technologies.</li>
          </ul>

          <h3 className="text-white font-semibold">
            3.6 Communications and Support Information
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Support requests.</li>
            <li>Complaint and dispute correspondence.</li>
            <li>Refund request information.</li>
            <li>Feedback submitted to the Company.</li>
            <li>Cancellation reasons where voluntarily provided.</li>
          </ul>

          {/* 4 */}
          <h2 className="text-white font-semibold">
            4. How We Collect Personal Information
          </h2>

          <p>Personal information may be collected:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Directly from you during registration.</li>
            <li>When you create or update a player profile.</li>
            <li>When you verify your email address or mobile number.</li>
            <li>When you subscribe or cancel a subscription.</li>
            <li>When you participate in golf challenges.</li>
            <li>When you submit scores or results.</li>
            <li>When you contact customer support.</li>
            <li>Automatically when you use the Platform.</li>
            <li>From payment gateways and payment providers.</li>
            <li>From authentication, hosting, and technical service providers.</li>
            <li>From other users where necessary for challenge participation.</li>
          </ul>

          {/* 5 */}
          <h2 className="text-white font-semibold">
            5. Why We Process Personal Information
          </h2>

          <p>We may process personal information to:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Create and maintain user Accounts.</li>
            <li>Verify email addresses and mobile numbers.</li>
            <li>Create and manage player profiles.</li>
            <li>Activate and manage subscriptions.</li>
            <li>Process subscription cancellations automatically.</li>
            <li>Confirm payment and subscription status.</li>
            <li>Allocate and manage Teez Tokens.</li>
            <li>Operate golf challenges and live scoreboards.</li>
            <li>Record scores, results, rankings, and statistics.</li>
            <li>Display player achievements and competition history.</li>
            <li>Provide customer support.</li>
            <li>Investigate payment errors and refund requests.</li>
            <li>Prevent fraud, abuse, cheating, and Account misuse.</li>
            <li>Protect Platform security and competition integrity.</li>
            <li>Maintain and improve Platform performance.</li>
            <li>Comply with legal and regulatory obligations.</li>
            <li>Establish, exercise, or defend legal claims.</li>
          </ul>

          {/* 6 */}
          <h2 className="text-white font-semibold">
            6. Lawful Grounds for Processing
          </h2>

          <p>
            Personal information may be processed where:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>
              Processing is necessary to provide the services requested by the
              user.
            </li>
            <li>
              Processing is necessary to perform the agreement between the user
              and Honey Badger Technologies (PTY) LTD.
            </li>
            <li>
              Processing is necessary to comply with a legal obligation.
            </li>
            <li>
              Processing protects the legitimate interests of the Company,
              users, payment providers, or the Platform.
            </li>
            <li>The user has provided valid consent.</li>
            <li>Processing is otherwise permitted under POPIA.</li>
          </ul>

          {/* 7 */}
          <h2 className="text-white font-semibold">
            7. Player Information Visible to Other Users
          </h2>

          <p>
            Certain player information may be visible to other authenticated
            Platform users where necessary for Platform functionality.
          </p>

          <p>This may include:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Player name or battle name.</li>
            <li>Golf club and division.</li>
            <li>Profile image where provided.</li>
            <li>Challenge participation.</li>
            <li>Scores and finalised results.</li>
            <li>Rankings and leaderboard positions.</li>
            <li>Statistics, streaks, achievements, and match history.</li>
          </ul>

          <p>
            Private contact details, confidential payment information, passwords,
            and authentication credentials are not intended to be displayed to
            other users.
          </p>

          {/* 8 */}
          <h2 className="text-white font-semibold">
            8. Payment Processing
          </h2>

          <p>
            Payments are processed through an approved third-party payment
            gateway.
          </p>

          <p>
            The payment gateway may process information required to authorise,
            complete, verify, or refund a transaction.
          </p>

          <p>
            Customer Account information held by Honey Badger Technologies (PTY)
            LTD is stored separately from complete card information entered
            through the payment gateway.
          </p>

          <p>
            Payment providers process information according to their own legal
            terms, privacy notices, security standards, and regulatory
            obligations.
          </p>

          {/* 9 */}
          <h2 className="text-white font-semibold">
            9. Service Providers and Information Sharing
          </h2>

          <p>
            We may share personal information with service providers where
            reasonably necessary to operate, secure, and support the Platform.
          </p>

          <p>These service providers may include:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Authentication providers.</li>
            <li>Database and cloud-hosting providers.</li>
            <li>Payment gateways and payment processors.</li>
            <li>Email delivery providers.</li>
            <li>SMS or mobile verification providers.</li>
            <li>Analytics and technical-monitoring providers.</li>
            <li>Fraud-prevention and security providers.</li>
            <li>Professional advisers.</li>
          </ul>

          <p>
            Service providers are permitted to process personal information only
            for the services they provide and subject to appropriate legal,
            contractual, and security obligations.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD does not sell users&apos;
            personal information to third parties.
          </p>

          {/* 10 */}
          <h2 className="text-white font-semibold">
            10. Legal and Regulatory Disclosures
          </h2>

          <p>
            Personal information may be disclosed where reasonably necessary
            to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Comply with applicable law.</li>
            <li>Respond to a lawful court order.</li>
            <li>Respond to a valid request from a regulator.</li>
            <li>Cooperate with law-enforcement authorities.</li>
            <li>Investigate fraud or illegal activity.</li>
            <li>Protect the rights, safety, and security of users or the Company.</li>
            <li>Enforce the Platform Terms & Conditions.</li>
          </ul>

          {/* 11 */}
          <h2 className="text-white font-semibold">
            11. International Processing
          </h2>

          <p>
            Some service providers may process or store personal information
            outside South Africa.
          </p>

          <p>
            Where personal information is transferred outside South Africa,
            Honey Badger Technologies (PTY) LTD will take reasonable steps to
            ensure that the information receives an appropriate level of
            protection in accordance with POPIA.
          </p>

          {/* 12 */}
          <h2 className="text-white font-semibold">
            12. Cookies and Similar Technologies
          </h2>

          <p>
            The Platform may use cookies and similar technologies to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Maintain user sessions.</li>
            <li>Support authentication.</li>
            <li>Remember user preferences.</li>
            <li>Protect Platform security.</li>
            <li>Detect technical errors.</li>
            <li>Measure and improve Platform performance.</li>
          </ul>

          <p>
            Essential cookies may be required for the Platform to function
            correctly.
          </p>

          <p>
            Additional information will be provided in the separate Cookie
            Policy.
          </p>

          {/* 13 */}
          <h2 className="text-white font-semibold">
            13. Data Security
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD uses reasonable administrative,
            technical, contractual, and organisational safeguards to protect
            personal information against:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Unauthorised access.</li>
            <li>Loss or destruction.</li>
            <li>Unlawful processing.</li>
            <li>Alteration or corruption.</li>
            <li>Unauthorised disclosure.</li>
            <li>Misuse or fraud.</li>
          </ul>

          <p>
            Users are responsible for protecting their passwords, authentication
            details, devices, email Accounts, and mobile numbers.
          </p>

          <p>
            No electronic system can be guaranteed to be completely secure.
            However, reasonable steps will be taken to identify and respond to
            security incidents.
          </p>

          {/* 14 */}
          <h2 className="text-white font-semibold">
            14. Data Retention
          </h2>

          <p>
            Personal information will be retained only for as long as reasonably
            necessary for the purpose for which it was collected, unless a
            longer retention period is required or permitted by law.
          </p>

          <p>Retention periods may depend on:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Whether the user has an active Account.</li>
            <li>Subscription and transaction record requirements.</li>
            <li>Fraud-prevention and security requirements.</li>
            <li>Customer-support and dispute-resolution requirements.</li>
            <li>Legal, tax, accounting, and regulatory obligations.</li>
            <li>Potential or existing legal claims.</li>
          </ul>

          <p>
            Cancellation of a subscription does not automatically require the
            immediate deletion of all Account, payment, competition, security, or
            legal records.
          </p>

          <p>
            Information that is no longer required will be deleted,
            de-identified, anonymised, or securely retained where legally
            permitted.
          </p>

          {/* 15 */}
          <h2 className="text-white font-semibold">
            15. Account and Subscription Cancellation
          </h2>

          <p>
            Subscription cancellation is completed through the Platform&apos;s
            automated self-service cancellation functionality.
          </p>

          <p>
            No administrator request is required for routine cancellation.
          </p>

          <p>
            Cancellation takes effect immediately once successfully confirmed by
            the Platform and results in the loss of access to subscription-only
            features.
          </p>

          <p>
            Subscription cancellation is separate from a request to access,
            correct, object to, or delete personal information.
          </p>

          {/* 16 */}
          <h2 className="text-white font-semibold">
            16. Your POPIA Rights
          </h2>

          <p>
            Subject to applicable law and verification of identity, users may
            have the right to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Request confirmation that personal information is held.</li>
            <li>Request access to personal information.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion where legally permitted.</li>
            <li>Object to certain processing.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Submit a complaint regarding the processing of information.</li>
          </ul>

          <p>
            A request may be refused or limited where retention or processing is
            required for legal compliance, fraud prevention, security,
            contractual performance, dispute resolution, or the protection of
            another person&apos;s rights.
          </p>

          {/* 17 */}
          <h2 className="text-white font-semibold">
            17. Verification of Privacy Requests
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may request sufficient
            information to verify the identity and authority of a person making
            a privacy request.
          </p>

          <p>
            This helps prevent unauthorised access, correction, or deletion of
            another person&apos;s information.
          </p>

          {/* 18 */}
          <h2 className="text-white font-semibold">
            18. Children and Minors
          </h2>

          <p>
            Users who are not legally able to accept the Platform Terms &
            Conditions independently must use the Platform only with the
            involvement and permission of a parent or legal guardian.
          </p>

          <p>
            A parent or legal guardian who permits a minor to use the Platform
            is responsible for supervising the minor&apos;s Account, subscription,
            transactions, and Platform activity to the extent permitted by law.
          </p>

          <p>
            The Company may require age, identity, or guardian information where
            reasonably necessary for legal compliance, Account protection, or
            Platform safety.
          </p>

          {/* 19 */}
          <h2 className="text-white font-semibold">
            19. Marketing Communications
          </h2>

          <p>
            Marketing communications will only be sent where permitted by law or
            where the user has provided the required consent.
          </p>

          <p>
            Users may withdraw from optional marketing communications using the
            unsubscribe method provided in the communication or by contacting
            the Company.
          </p>

          <p>
            Essential Account, subscription, payment, legal, security, and
            service communications may still be sent where necessary to operate
            the Platform.
          </p>

          {/* 20 */}
          <h2 className="text-white font-semibold">
            20. Changes to this Privacy Policy
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may update this Privacy Policy
            where reasonably necessary to reflect:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Changes to the Platform.</li>
            <li>Changes to the information processed.</li>
            <li>Changes to service providers.</li>
            <li>Security improvements.</li>
            <li>Legal or regulatory requirements.</li>
          </ul>

          <p>
            Updated versions will be published on the Platform. Material changes
            will be communicated or presented for renewed acknowledgement where
            required by applicable law.
          </p>

          {/* 21 */}
          <h2 className="text-white font-semibold">
            21. Complaints
          </h2>

          <p>
            Users should first contact Honey Badger Technologies (PTY) LTD
            regarding a privacy concern so that the matter can be investigated
            and addressed.
          </p>

          <p>
            Nothing in this Privacy Policy prevents a user from approaching the
            Information Regulator or another competent authority where
            applicable.
          </p>

          {/* 22 */}
          <h2 className="text-white font-semibold">
            22. Contact Details
          </h2>

          <p>
            Privacy questions, access requests, correction requests, objections,
            or complaints may be submitted using the following details:
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
              onClick={() => router.push("/terms")}
              className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
            >
              View Platform Terms & Conditions
            </button>

            <button
              type="button"
              onClick={() => router.push("/legal/refund-policy")}
              className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
            >
              View Refund, Cancellation & Delivery Policy
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