"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="px-6 pt-10 text-center">
        <h1 className="text-2xl font-bold">Platform Terms & Conditions</h1>

        <p className="text-sm text-gray-400 mt-2">
          Teez Golf Challenges platform, subscription, token, and competition
          terms
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 text-sm leading-relaxed space-y-5 max-w-4xl w-full mx-auto pb-10">

<p className="font-semibold text-white">
  Platform Terms & Conditions
</p>

<p>
  Welcome to Teez Golf Challenges, a subscription-based competitive golf
  platform owned and operated by <strong>Honey Badger Technologies (PTY) LTD</strong>
  ("Honey Badger Technologies", "Company", "we", "our", or "us").
</p>

<p>
  These Platform Terms & Conditions ("Terms") govern your access to and use of
  the Teez Golf Challenges Platform, including our website, applications,
  player dashboard, subscriptions, digital gameplay systems, Teez Tokens,
  rankings, live scoreboards, competitions, and all related digital services.
</p>

<p>
  By creating an account, subscribing to the Platform, accepting these Terms,
  or continuing to use any part of the Platform, you confirm that you have
  read, understood, and agree to be legally bound by these Terms, our Privacy
  Policy, and our Refund, Cancellation & Delivery Policy.
</p>

<p>
  If you do not agree with these Terms, you may not register, subscribe to, or
  use the Platform.
</p>

<p>
  These Terms govern only the use of the Teez Golf Challenges Platform. Payment
  processing, refunds, privacy, cookies, and other legal matters may also be
  governed by separate policies, which together form part of your agreement
  with Honey Badger Technologies (PTY) LTD.
</p>

<h2 className="font-semibold text-white">
  1. Definitions
</h2>

<p>
  Unless the context indicates otherwise, the following terms have the meanings
  set out below:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>
    <strong>Account</strong> means the registered Teez Golf Challenges user
    account created by a user.
  </li>

  <li>
    <strong>Challenge</strong> means any golf competition, match, event,
    leaderboard event, or scoring activity created or participated in through
    the Platform.
  </li>

  <li>
    <strong>Company</strong> means Honey Badger Technologies (PTY) LTD,
    Registration Number 2026/102722/07.
  </li>

  <li>
    <strong>Digital Services</strong> means all online services made available
    through the Platform, including subscriptions, player profiles,
    scoreboards, rankings, statistics, achievements, Teez Tokens, competitions,
    and related functionality.
  </li>

  <li>
    <strong>Platform</strong> means the Teez Golf Challenges website,
    applications, software, systems, services, databases, APIs, dashboards,
    scoreboards, and associated digital infrastructure.
  </li>

  <li>
    <strong>Subscription</strong> means the recurring monthly digital service
    providing access to the Platform and its subscription features.
  </li>

  <li>
    <strong>Teez Tokens</strong> means digital play credits issued by the
    Platform solely for approved gameplay and Platform participation.
  </li>

  <li>
    <strong>User</strong>, <strong>You</strong>, or <strong>Your</strong> means
    any person who registers for, subscribes to, or uses the Platform.
  </li>
</ul>

<h2 className="font-semibold text-white">
  2. Acceptance of these Terms
</h2>

<p>
  By registering an Account, activating a Subscription, or accessing any part
  of the Platform, you acknowledge that you have read and accepted these Terms.
</p>

<p>
  If you are accepting these Terms on behalf of a company, organisation, golf
  club, or other legal entity, you confirm that you have the authority to bind
  that entity to these Terms.
</p>

<p>
  You may not use the Platform if doing so would violate any applicable law,
  regulation, court order, or contractual obligation.
</p>

<p>
  Continued use of the Platform after updated Terms have been published
  constitutes acceptance of those updated Terms unless applicable law requires
  renewed acceptance.
</p>

<h2 className="font-semibold text-white">
  3. Eligibility
</h2>

<p>
  To use the Platform you must:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Provide accurate and current registration information.</li>
  <li>Register using your own identity.</li>
  <li>Maintain the security of your Account credentials.</li>
  <li>Comply with these Terms and all applicable laws.</li>
</ul>

<p>
  You are responsible for all activity that occurs through your Account unless
  you notify us of unauthorised use without unreasonable delay.
</p>

<p>
  We may refuse registration or restrict access where reasonably necessary to
  protect the Platform, other users, or to comply with legal or regulatory
  obligations.
</p>

<h2 className="font-semibold text-white">
  4. Account Registration
</h2>

<p>
  Registration is completed entirely through the Platform's automated
  self-service process.
</p>

<p>
  No manual registration requests, account creation requests, subscription
  requests, or activation requests need to be submitted to Honey Badger
  Technologies (PTY) LTD during normal Platform operation.
</p>

<p>
  Users are responsible for completing the registration process using the
  functionality provided by the Platform.
</p>

<p>
  During registration the Platform may require users to:
</p>

<ol className="list-decimal pl-6 space-y-2">
  <li>Create an Account.</li>
  <li>Verify their email address.</li>
  <li>Verify their mobile number.</li>
  <li>Create a player profile.</li>
  <li>Activate a monthly Subscription.</li>
</ol>

<p>
  Access to subscription features is automatically managed by the Platform once
  the required registration and subscription steps have been successfully
  completed.
</p>

<h2 className="font-semibold text-white">
  5. Email and Mobile Verification
</h2>

<p>
  Certain Platform features require successful verification of your registered
  email address and mobile number.
</p>

<p>
  Verification helps protect user accounts, maintain Platform integrity,
  improve competition security, reduce fraud, and ensure reliable communication
  regarding your Account and Subscription.
</p>

<p>
  The Company may restrict access to certain Platform functionality until the
  required verification steps have been completed.
</p>

<h2 className="font-semibold text-white">
  6. Subscription Service
</h2>

<p>
  Teez Golf Challenges is a subscription-based digital platform. Access to the
  Platform's competitive gameplay features requires an active monthly
  subscription.
</p>

<p>
  The current subscription plan includes:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Subscription fee: R99 per month.</li>
  <li>Billing frequency: Monthly.</li>
  <li>Digital Platform access.</li>
  <li>100 Teez Tokens for each active subscription month.</li>
</ul>

<p>
  Honey Badger Technologies (PTY) LTD may introduce additional subscription
  plans, promotional offers, or revised pricing from time to time. Any
  applicable pricing, billing frequency, and subscription benefits will always
  be displayed before payment is completed.
</p>

<p>
  Subscription payments provide access to digital services only and do not
  constitute the purchase of any physical goods.
</p>

<h2 className="font-semibold text-white">
  7. Subscription Activation
</h2>

<p>
  Subscription activation occurs automatically once:
</p>

<ol className="list-decimal pl-6 space-y-2">
  <li>The required registration process has been completed.</li>
  <li>The required verification steps have been completed.</li>
  <li>The subscription payment has been successfully authorised.</li>
  <li>The Platform confirms successful activation.</li>
</ol>

<p>
  Once activated, the Platform will automatically grant access to subscription
  features and allocate the applicable monthly Teez Tokens to the user's
  digital wallet.
</p>

<p>
  Delivery of the subscription service is completed digitally through account
  activation, Platform access, player dashboard access, wallet allocation,
  profile availability, and other subscription functionality.
</p>

<p>
  No manual activation request, support request, or approval from Honey Badger
  Technologies (PTY) LTD is required during normal Platform operation.
</p>

<h2 className="font-semibold text-white">
  8. Automatic Subscription Management
</h2>

<p>
  Teez Golf Challenges is designed as a self-service Platform.
</p>

<p>
  Users manage their own subscriptions directly through the Platform without
  requiring manual assistance from Honey Badger Technologies (PTY) LTD for
  normal subscription activities.
</p>

<p>
  Normal self-service actions include:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Creating an account.</li>
  <li>Updating account information.</li>
  <li>Creating a player profile.</li>
  <li>Activating a subscription.</li>
  <li>Cancelling a subscription.</li>
  <li>Re-subscribing after cancellation.</li>
</ul>

<p>
  Users should only contact Honey Badger Technologies (PTY) LTD where a genuine
  technical issue, payment issue, verified Platform error, or security concern
  prevents the normal self-service process from functioning correctly.
</p>

<h2 className="font-semibold text-white">
  9. Cancellation and Unsubscription
</h2>

<p>
  A user may cancel their subscription at any time by using the Platform's
  self-service <strong>Cancel Subscription</strong> functionality.
</p>

<p>
  No email, telephone request, support ticket, administrator approval, or
  written notice is required to cancel a subscription during normal Platform
  operation.
</p>

<p>
  Cancellation becomes effective immediately once the Platform confirms that
  the cancellation has been successfully completed.
</p>

<p>
  From that point onward, the user will immediately lose access to
  subscription-only Platform features.
</p>

<p>
  A cancelled subscription may be reactivated at any time by completing the
  normal subscription process again through the Platform.
</p>

<h2 className="font-semibold text-white">
  10. Effect of Cancellation
</h2>

<p>
  Once a subscription has been cancelled, access to subscription-only gameplay
  features will end immediately.
</p>

<p>
  Depending on Platform functionality and operational requirements, cancellation
  may result in the removal or deactivation of:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Player profile access.</li>
  <li>Challenge participation.</li>
  <li>Player dashboard access.</li>
  <li>Rankings.</li>
  <li>Statistics.</li>
  <li>Achievements.</li>
  <li>Competition history.</li>
  <li>Remaining Teez Tokens.</li>
  <li>Other subscription-only Platform features.</li>
</ul>

<p>
  Cancellation does not entitle a user to any cash payment, refund, voucher,
  credit, or compensation unless expressly provided for in the Refund,
  Cancellation & Delivery Policy or required by applicable South African law.
</p>

<p>
  The complete refund, cancellation, payment, and digital delivery rules are
  contained in the Refund, Cancellation & Delivery Policy, which forms part of
  these Terms.
</p>
<h2 className="font-semibold text-white">
  11. Licence to Use the Platform
</h2>

<p>
  Subject to these Terms and an active Subscription where required, Honey
  Badger Technologies (PTY) LTD grants you a limited, personal,
  non-transferable, non-exclusive and revocable licence to access and use Teez
  Golf Challenges solely for its intended purpose.
</p>

<p>
  This licence allows you to use the Platform for personal participation in
  golf challenges and related Platform functionality. It does not transfer any
  ownership rights in the Platform or any part of it.
</p>

<p>
  Your licence automatically ends if your Account is terminated, your
  Subscription is cancelled, or your use of the Platform is suspended in
  accordance with these Terms.
</p>

<h2 className="font-semibold text-white">
  12. Teez Tokens
</h2>

<p>
  Teez Tokens are digital play credits issued exclusively by the Platform for
  approved gameplay functionality.
</p>

<p>
  An active monthly Subscription currently includes an allocation of
  <strong> 100 Teez Tokens </strong>
  per subscription month.
</p>

<p>
  Teez Tokens may be used only for Platform features approved by Honey Badger
  Technologies (PTY) LTD, including the creation of golf challenges,
  participation in challenges and other authorised gameplay functionality.
</p>

<p>
  Teez Tokens:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Are digital play credits only.</li>
  <li>Have no cash or monetary value.</li>
  <li>Are not legal tender.</li>
  <li>Are not electronic money.</li>
  <li>Cannot be redeemed for cash.</li>
  <li>Cannot be withdrawn.</li>
  <li>Cannot be exchanged for vouchers.</li>
  <li>Cannot be exchanged for goods or services.</li>
  <li>Cannot be converted into money or cryptocurrency.</li>
  <li>Cannot be sold or traded for payment.</li>
  <li>Cannot be transferred between users for value.</li>
</ul>

<p>
  Users receive only a limited right to use Teez Tokens within the Platform.
  Ownership of the Platform and its digital systems remains with Honey Badger
  Technologies (PTY) LTD.
</p>

<p>
  Honey Badger Technologies (PTY) LTD may correct token balances where a
  verified technical, payment or administrative error has occurred.
</p>

<h2 className="font-semibold text-white">
  13. Golf Challenges
</h2>

<p>
  Teez Golf Challenges provides users with digital tools to organise and
  participate in skill-based golf competitions.
</p>

<p>
  Challenge creators are responsible for selecting the correct:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Competition format.</li>
  <li>Scoring format.</li>
  <li>Golf course.</li>
  <li>Participants.</li>
  <li>Applicable challenge settings.</li>
</ul>

<p>
  Every participant is responsible for ensuring that scores submitted through
  the Platform are complete, accurate and honestly recorded.
</p>

<p>
  Honey Badger Technologies (PTY) LTD may review, correct or invalidate a
  challenge where a verified technical failure, administrative error,
  fraudulent activity or material breach of these Terms has affected the
  integrity of the competition.
</p>

<p>
  Once a challenge has been finalised it may be locked and may no longer be
  editable through the normal user interface.
</p>

<h2 className="font-semibold text-white">
  14. Rankings, Statistics and Achievements
</h2>

<p>
  Rankings, statistics, achievements, streaks, match history, competition
  history and leaderboard positions are digital Platform records intended to
  recognise player participation and performance.
</p>

<p>
  These records:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Do not represent money.</li>
  <li>Do not represent financial assets.</li>
  <li>Have no cash value.</li>
  <li>Create no ownership rights.</li>
  <li>Cannot be redeemed for prizes, vouchers or external rewards unless
      expressly announced by Honey Badger Technologies (PTY) LTD.</li>
</ul>

<p>
  Honey Badger Technologies (PTY) LTD may modify ranking algorithms, divisions,
  leaderboard structures, statistics calculations or achievement systems where
  reasonably necessary to improve fairness, accuracy, security or Platform
  functionality.
</p>

<h2 className="font-semibold text-white">
  15. Fair Play and Competition Integrity
</h2>

<p>
  Teez Golf Challenges is designed as a skill-based competitive golf Platform.
  Fair competition is fundamental to the integrity of the Platform.
</p>

<p>
  Users must compete honestly and may not manipulate or attempt to manipulate
  any competition, ranking, score, statistic or achievement.
</p>

<p>
  The following conduct is prohibited:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Submitting false scores.</li>
  <li>Submitting another person's score as your own.</li>
  <li>Collusion between players.</li>
  <li>Manipulating rankings or statistics.</li>
  <li>Using multiple accounts to obtain an unfair advantage.</li>
  <li>Knowingly providing false player information.</li>
  <li>Attempting to exploit software bugs or Platform errors.</li>
  <li>Interfering with Platform security.</li>
  <li>Using automated software, bots or scripts.</li>
  <li>Any conduct intended to undermine fair competition.</li>
</ul>

<p>
  Honey Badger Technologies (PTY) LTD reserves the right to investigate any
  suspected breach of competition integrity and may suspend, reverse, remove,
  correct or invalidate any affected challenge, ranking, statistic,
  achievement, Account or digital record where reasonably necessary to protect
  the integrity of the Platform.
</p>
<h2 className="font-semibold text-white">
  16. User Responsibilities
</h2>

<p>
  Users are responsible for using the Platform lawfully, honestly and in
  accordance with these Terms.
</p>

<p>
  You are responsible for:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Maintaining accurate account information.</li>
  <li>Protecting your login credentials.</li>
  <li>Maintaining the confidentiality of your Account.</li>
  <li>Ensuring your registered email address remains valid.</li>
  <li>Ensuring your registered mobile number remains current.</li>
  <li>Complying with applicable golf rules during participation.</li>
  <li>Submitting truthful and accurate scores.</li>
  <li>Using the Platform only for its intended purpose.</li>
</ul>

<p>
  Users remain responsible for all activity performed through their Account
  unless they promptly notify Honey Badger Technologies (PTY) LTD of
  unauthorised access.
</p>

<p>
  Participation in golf activities takes place entirely at the user's own risk.
  Honey Badger Technologies (PTY) LTD does not organise, supervise or control
  real-world golf activities and accepts no responsibility for golf course
  conditions, weather, travel, player conduct, equipment, injuries or other
  real-world circumstances.
</p>

<h2 className="font-semibold text-white">
  17. Prohibited Conduct
</h2>

<p>
  Users may not use the Platform in any unlawful, fraudulent, abusive or
  harmful manner.
</p>

<p>
  Without limitation, users may not:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Violate any applicable law or regulation.</li>

  <li>Impersonate another person.</li>

  <li>Share Accounts.</li>

  <li>Sell or transfer Accounts.</li>

  <li>Provide false identity information.</li>

  <li>Attempt to bypass Platform security.</li>

  <li>Introduce malware, viruses or malicious code.</li>

  <li>Reverse engineer, copy or exploit Platform software.</li>

  <li>Attempt to gain unauthorised access to Platform systems.</li>

  <li>Interfere with Platform availability.</li>

  <li>Manipulate subscriptions, payments or token balances.</li>

  <li>Attempt to obtain unauthorised refunds.</li>

  <li>Abuse payment systems or chargeback procedures.</li>

  <li>Use the Platform to conduct gambling, betting, wagering or games of
      chance.</li>

  <li>Use the Platform to facilitate unlawful transactions.</li>

  <li>Use the Platform in connection with prohibited products or services
      prohibited by South African law, Visa, Mastercard, the acquiring bank,
      payment gateway or any applicable regulator.</li>
</ul>

<p>
  Honey Badger Technologies (PTY) LTD reserves the right to investigate any
  suspected breach of these Terms and to take any reasonable action necessary
  to protect the Platform and its users.
</p>

<h2 className="font-semibold text-white">
  18. Platform Updates and Availability
</h2>

<p>
  Honey Badger Technologies (PTY) LTD continually develops, improves and
  maintains the Platform.
</p>

<p>
  We may introduce new features, modify existing functionality, improve
  security, correct errors, perform maintenance or remove obsolete features at
  any time where reasonably necessary.
</p>

<p>
  While we aim to provide reliable service, uninterrupted access cannot be
  guaranteed.
</p>

<p>
  Platform availability may occasionally be affected by:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Scheduled maintenance.</li>
  <li>Emergency maintenance.</li>
  <li>Software updates.</li>
  <li>Network failures.</li>
  <li>Third-party service interruptions.</li>
  <li>Payment gateway outages.</li>
  <li>Internet connectivity issues.</li>
  <li>Circumstances beyond our reasonable control.</li>
</ul>

<p>
  Honey Badger Technologies (PTY) LTD will use reasonable efforts to restore
  Platform functionality as soon as reasonably possible following any service
  interruption.
</p>

<h2 className="font-semibold text-white">
  19. Suspension and Termination
</h2>

<p>
  Honey Badger Technologies (PTY) LTD may suspend, restrict or terminate an
  Account immediately where reasonably necessary to:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Protect Platform security.</li>

  <li>Protect other users.</li>

  <li>Investigate suspected fraud.</li>

  <li>Investigate payment disputes or chargebacks.</li>

  <li>Investigate suspected cheating or score manipulation.</li>

  <li>Comply with applicable law.</li>

  <li>Comply with acquiring bank, payment gateway or card scheme
      requirements.</li>

  <li>Prevent misuse of the Platform.</li>

  <li>Enforce these Terms.</li>
</ul>

<p>
  Suspension may be temporary while an investigation is conducted or permanent
  where a material breach of these Terms has occurred.
</p>

<p>
  Upon termination, Honey Badger Technologies (PTY) LTD may immediately revoke
  access to the Platform, deactivate the Account, remove access to subscription
  features, terminate the licence granted under these Terms and disable access
  to associated digital services where reasonably necessary.
</p>

<p>
  Suspension or termination does not automatically entitle a user to a refund.
  Refund eligibility is governed exclusively by the Refund, Cancellation &
  Delivery Policy and applicable South African law.
</p>
<h2 className="font-semibold text-white">
  20. Intellectual Property
</h2>

<p>
  The Teez Golf Challenges Platform, including its software, source code,
  databases, APIs, visual designs, logos, trademarks, graphics, player
  interfaces, challenge systems, ranking models, scoreboards, statistics,
  documentation, text, and all related intellectual property are owned by
  Honey Badger Technologies (PTY) LTD or its authorised licensors.
</p>

<p>
  These Terms grant you a limited licence to use the Platform. They do not
  transfer ownership of any intellectual property to you.
</p>

<p>
  Except where expressly permitted by applicable law or by Honey Badger
  Technologies (PTY) LTD in writing, you may not:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Copy Platform content.</li>
  <li>Reproduce Platform software.</li>
  <li>Modify Platform systems.</li>
  <li>Reverse engineer the Platform.</li>
  <li>Create derivative works.</li>
  <li>Sell or commercially exploit Platform content.</li>
  <li>Use Teez Golf Challenges branding without written permission.</li>
</ul>

<h2 className="font-semibold text-white">
  21. Payments
</h2>

<p>
  Subscription payments are processed through an approved third-party payment
  gateway.
</p>

<p>
  Honey Badger Technologies (PTY) LTD does not store payment card numbers,
  CVV numbers, banking PINs, banking passwords, one-time PINs or confidential
  banking credentials on the Platform.
</p>

<p>
  Before completing payment, users will be presented with the applicable
  subscription amount, billing frequency and payment information.
</p>

<p>
  Additional payment terms are contained in the Payment Policy and Refund,
  Cancellation & Delivery Policy.
</p>

<h2 className="font-semibold text-white">
  22. Refunds and Cancellation
</h2>

<p>
  Refunds, subscription cancellations, payment disputes, refund requests,
  digital delivery and subscription management are governed by the Refund,
  Cancellation & Delivery Policy.
</p>

<p>
  By using the Platform you acknowledge that you have read and accepted that
  Policy.
</p>

<h2 className="font-semibold text-white">
  23. Privacy
</h2>

<p>
  Honey Badger Technologies (PTY) LTD processes personal information in
  accordance with the Protection of Personal Information Act, 2013 (POPIA),
  applicable South African law and the Platform Privacy Policy.
</p>

<p>
  By using the Platform you consent to the collection, processing and storage
  of personal information as described in the Privacy Policy.
</p>

<h2 className="font-semibold text-white">
  24. Limitation of Liability
</h2>

<p>
  To the fullest extent permitted by applicable South African law, Honey
  Badger Technologies (PTY) LTD shall not be liable for indirect, incidental,
  consequential, special or punitive damages arising from or relating to the
  use of the Platform.
</p>

<p>
  This includes, without limitation:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Loss of data.</li>
  <li>Loss of rankings.</li>
  <li>Loss of statistics.</li>
  <li>Loss of achievements.</li>
  <li>Loss of challenge history.</li>
  <li>Business interruption.</li>
  <li>Network failures.</li>
  <li>Payment gateway interruptions.</li>
  <li>Third-party service failures.</li>
</ul>

<p>
  Nothing contained in these Terms limits or excludes any liability or
  consumer right that cannot lawfully be excluded under South African law.
</p>

<h2 className="font-semibold text-white">
  25. Indemnity
</h2>

<p>
  You agree to indemnify and hold harmless Honey Badger Technologies (PTY)
  LTD, its directors, employees, contractors and service providers against
  claims, losses, damages, liabilities, costs and expenses arising from:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Your breach of these Terms.</li>
  <li>Your unlawful use of the Platform.</li>
  <li>Your misuse of Teez Tokens.</li>
  <li>Your submission of false scores or fraudulent information.</li>
  <li>Your infringement of another person's rights.</li>
</ul>

<h2 className="font-semibold text-white">
  26. Governing Law
</h2>

<p>
  These Terms are governed by the laws of the Republic of South Africa.
</p>

<p>
  Honey Badger Technologies (PTY) LTD chooses the following address as its
  domicilium citandi et executandi for all legal notices and formal process:
</p>

<p>
  71 Duke Close
  <br />
  Silver Stream Estate
  <br />
  Pretoria
  <br />
  Gauteng
  <br />
  0081
  <br />
  South Africa
</p>

<h2 className="font-semibold text-white">
  27. Changes to these Terms
</h2>

<p>
  Honey Badger Technologies (PTY) LTD may update these Terms from time to
  time to reflect changes in the Platform, legal requirements, payment
  provider requirements, security requirements or operational improvements.
</p>

<p>
  Updated Terms will be published on the Platform. Where required by law or
  where a material change affects your rights, the Platform may require you to
  accept the updated Terms before continuing to use subscription services.
</p>

<h2 className="font-semibold text-white">
  28. Contact Details
</h2>

<p>
  Honey Badger Technologies (PTY) LTD
  <br />
  Registration Number: 2026/102722/07
  <br />
  Email: info@honeybadgertech.com
  <br />
  Telephone: +27 82 837 0266
  <br />
  Physical Address:
  <br />
  71 Duke Close
  <br />
  Silver Stream Estate
  <br />
  Pretoria
  <br />
  Gauteng
  <br />
  0081
  <br />
  South Africa
</p>

<p className="text-xs text-gray-500 pt-4">
  Last updated: July 2026
</p>
      </div>

      {/* ACCEPT SECTION */}
      <div className="px-6 pb-8 pt-4 border-t border-gray-800 bg-black">
        <div className="max-w-4xl mx-auto">
          <label className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="w-5 h-5 mt-0.5"
            />

            <span className="text-sm">
              I have read and accept the Platform Terms & Conditions, including
              the monthly subscription, digital token rules, and cancellation
              terms.
            </span>
          </label>

          <button
            disabled={!accepted}
            onClick={() => router.push("/register")}
            className={`w-full py-4 rounded-2xl font-semibold text-lg ${
              accepted
                ? "bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88]"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue Subscription
          </button>
        </div>
      </div>
    </div>
  );
}