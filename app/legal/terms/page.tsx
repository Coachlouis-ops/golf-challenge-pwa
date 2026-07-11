"use client";

import { useRouter } from "next/navigation";

export default function LegalTermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Website Terms & Conditions
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Teez Golf Challenges website, merchant, subscription, payment, and
          digital delivery terms
        </p>

        <div className="space-y-6 text-sm text-gray-300">
          <p>
            This website and the Teez Golf Challenges Platform are owned and
            operated by{" "}
            <strong className="text-white">
              Honey Badger Technologies (PTY) LTD
            </strong>
            , Registration Number 2026/102722/07, a private company registered
            in South Africa.
          </p>

          <p>
            These Website Terms & Conditions contain the merchant, payment,
            subscription, digital delivery, and company disclosures applicable
            to transactions completed through this website.
          </p>

          <p>
            Use of the Teez Golf Challenges Platform is also governed by the
            separate Platform Terms & Conditions, Refund, Cancellation &
            Delivery Policy, and Privacy Policy.
          </p>

          {/* 1 */}
          <h2 className="text-white font-semibold">
            1. Detailed Description of Services
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD operates in the digital services
            industry and provides access to online software platforms, including
            Teez Golf Challenges.
          </p>

          <p>
            Teez Golf Challenges is a subscription-based, skill-based competitive
            golf Platform.
          </p>

          <p>
            The Platform allows registered users to create player profiles,
            create and enter golf challenges, invite participants, submit
            scores, view live scoreboards, track match history, monitor
            statistics, earn achievements, and participate in rankings and
            leaderboards.
          </p>

          <p>
            Teez Golf Challenges does not facilitate gambling, betting,
            wagering, casino-style games, games of chance, cash prizes, cash
            payouts, or token redemption.
          </p>

          {/* 2 */}
          <h2 className="text-white font-semibold">
            2. Subscription Model and Pricing
          </h2>

          <p>
            Access to subscription-only Platform features requires an active
            monthly subscription.
          </p>

          <p>
            The current subscription fee is{" "}
            <strong className="text-white">R99 per month</strong>.
          </p>

          <p>
            Each active monthly subscription includes{" "}
            <strong className="text-white">100 Teez Tokens</strong>.
          </p>

          <p>
            The applicable subscription amount, billing frequency, included
            Teez Token allocation, and payment terms will be displayed before
            payment is completed.
          </p>

          <p>
            Subscription pricing or included benefits may be changed for future
            billing periods. Any applicable changes will be displayed or
            communicated as required before they take effect.
          </p>

          {/* 3 */}
          <h2 className="text-white font-semibold">
            3. Teez Tokens
          </h2>

          <p>
            Teez Tokens are digital play credits used only within the Teez Golf
            Challenges Platform.
          </p>

          <p>Teez Tokens:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Have no cash or monetary value.</li>
            <li>Are not legal tender or electronic money.</li>
            <li>Cannot be redeemed for cash.</li>
            <li>Cannot be withdrawn.</li>
            <li>Cannot be converted into money or cryptocurrency.</li>
            <li>Cannot be exchanged for vouchers, goods, or services.</li>
            <li>Cannot be sold or transferred between users for payment.</li>
            <li>May only be used for approved Platform gameplay.</li>
          </ul>

          <p>
            Receiving or holding Teez Tokens does not give a user ownership of
            any financial asset.
          </p>

          {/* 4 */}
          <h2 className="text-white font-semibold">
            4. Digital Delivery Policy
          </h2>

          <p>
            No physical goods are delivered. Payments relate entirely to digital
            Platform access and related digital subscription services.
          </p>

          <p>
            Subject to successful registration, verification, payment
            authorisation, and Platform confirmation, subscription activation is
            completed digitally and automatically.
          </p>

          <p>Digital delivery may be confirmed through:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Subscription activation.</li>
            <li>Player dashboard access.</li>
            <li>Player profile access.</li>
            <li>Access to subscription-only Platform features.</li>
            <li>Allocation of 100 Teez Tokens to the user&apos;s wallet.</li>
            <li>An account, subscription, or payment confirmation.</li>
          </ul>

          <p>
            No manual activation request or administrator approval is required
            during normal Platform operation.
          </p>

          {/* 5 */}
          <h2 className="text-white font-semibold">
            5. Service Availability
          </h2>

          <p>
            The provision of digital services is subject to successful payment,
            technical availability, supported devices, internet access,
            third-party service availability, and compliance with the applicable
            legal policies.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD will take reasonable steps to
            maintain Platform availability but does not guarantee continuous,
            uninterrupted, or error-free access.
          </p>

          {/* 6 */}
          <h2 className="text-white font-semibold">
            6. Geographic Availability
          </h2>

          <p>
            The offering on this website is currently available to South African
            clients only.
          </p>

          {/* 7 */}
          <h2 className="text-white font-semibold">
            7. Subscription Cancellation
          </h2>

          <p>
            Users may cancel their subscriptions at any time through the
            Platform&apos;s self-service Cancel Subscription functionality.
          </p>

          <p>
            No email request, telephone request, support ticket, written notice,
            administrator request, or manual approval is required for routine
            cancellation.
          </p>

          <p>
            Cancellation takes effect immediately once the Platform confirms
            that the cancellation process has been successfully completed.
          </p>

          <p>
            The user immediately loses access to subscription-only playing
            features after successful cancellation.
          </p>

          <p>
            A user may subscribe again at any time by completing the normal
            self-service subscription process.
          </p>

          {/* 8 */}
          <h2 className="text-white font-semibold">
            8. Refund Policy Summary
          </h2>

          <p>
            Once subscription access has been successfully activated and used,
            subscription payments are generally non-refundable, except where
            applicable law or a verified payment, technical, Platform, or
            administrative error requires otherwise.
          </p>

          <p>A refund may be considered where:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>A duplicate subscription payment was processed.</li>
            <li>An incorrect subscription amount was charged.</li>
            <li>
              Payment succeeded but subscription access was not activated
              because of a verified technical error.
            </li>
            <li>
              A verified administrative error caused an incorrect account,
              payment, or subscription allocation.
            </li>
            <li>
              The user was charged after cancellation had already been
              successfully completed before the relevant renewal transaction.
            </li>
            <li>A refund is required under applicable South African law.</li>
          </ul>

          <p>
            The complete rules are contained in the Refund, Cancellation &
            Delivery Policy.
          </p>

          <button
            type="button"
            onClick={() => router.push("/legal/refund-policy")}
            className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
          >
            View Refund, Cancellation & Delivery Policy
          </button>

          {/* 9 */}
          <h2 className="text-white font-semibold">
            9. Payment Options
          </h2>

          <p>
            Payments are processed through an approved third-party payment
            gateway.
          </p>

          <p>
            Available payment methods may include Visa, Mastercard, or other
            payment methods supported and displayed by the approved payment
            gateway.
          </p>

          <p>
            Users must review the subscription amount, billing frequency, and
            payment information before authorising payment.
          </p>

          <p>
            Only a person authorised to use the selected payment method may
            complete the transaction.
          </p>

          {/* 10 */}
          <h2 className="text-white font-semibold">
            10. Payment Processing and Security
          </h2>

          <p>
            Card transactions are entered and processed through the secure
            systems of the approved payment gateway.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD does not store complete card
            numbers, CVV numbers, card PINs, banking passwords, one-time PINs, or
            confidential banking login credentials on the Platform.
          </p>

          <p>
            The website uses HTTPS/SSL to support the secure transmission of
            information.
          </p>

          <p>
            The approved payment gateway is responsible for the payment
            processing security controls applicable to its payment portal,
            including supported card authentication and security measures.
          </p>

          {/* 11 */}
          <h2 className="text-white font-semibold">
            11. Customer Information and Card Information
          </h2>

          <p>
            Customer account information is stored separately from complete card
            information entered through the approved payment gateway.
          </p>

          <p>
            Customer information may be processed for registration, email and
            phone verification, subscription management, payment confirmation,
            account access, customer support, fraud prevention, security,
            dispute resolution, and legal compliance.
          </p>

          <p>
            Users must never provide card PINs, banking passwords, one-time PINs,
            or confidential banking credentials directly to Honey Badger
            Technologies (PTY) LTD.
          </p>

          {/* 12 */}
          <h2 className="text-white font-semibold">
            12. Customer Privacy
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD will take reasonable
            administrative, technical, contractual, and organisational steps to
            protect users&apos; personal information.
          </p>

          <p>
            Personal information is processed in accordance with the Protection
            of Personal Information Act 4 of 2013 and the Platform Privacy
            Policy.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD does not sell users&apos;
            personal information to third parties.
          </p>

          {/* 13 */}
          <h2 className="text-white font-semibold">
            13. Merchant Outlet Country and Transaction Currency
          </h2>

          <p>
            The merchant outlet country when payment options are presented is
            South Africa.
          </p>

          <p>
            The transaction currency is South African Rand (ZAR).
          </p>

          {/* 14 */}
          <h2 className="text-white font-semibold">
            14. Merchant Responsibility
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD takes responsibility for the
            digital services sold through this website, including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Subscription delivery.</li>
            <li>Account and Platform access.</li>
            <li>Customer service and support.</li>
            <li>Refund and payment-error review.</li>
            <li>Complaint and dispute resolution.</li>
            <li>Delivery of the declared digital subscription service.</li>
          </ul>

          <p>
            The approved third-party payment gateway is responsible for payment
            processing services provided through its payment portal, subject to
            its applicable security systems, terms, and supported payment
            methods.
          </p>

          {/* 15 */}
          <h2 className="text-white font-semibold">
            15. Declared Business Activity
          </h2>

          <p>
            Payments accepted through this website relate only to the Teez Golf
            Challenges digital subscription service and other digital services
            expressly declared to the applicable acquiring bank and payment
            provider.
          </p>

          <p>
            The website does not offer or process payments for prohibited,
            unlawful, undeclared, or unrelated products and services.
          </p>

          {/* 16 */}
          <h2 className="text-white font-semibold">
            16. Prohibited Products and Activities
          </h2>

          <p>
            Teez Golf Challenges does not sell, facilitate, advertise, or process
            payments for prohibited or restricted products and services,
            including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Illegal drugs or drug paraphernalia.</li>
            <li>Counterfeit goods or currency.</li>
            <li>Unlicensed firearms, ammunition, or weapons.</li>
            <li>Illegal or exploitative sexual content.</li>
            <li>Unregulated gambling, betting, or wagering.</li>
            <li>Pyramid or Ponzi schemes.</li>
            <li>Unauthorised cryptocurrency exchange services.</li>
            <li>Hacking tools, malware, or malicious software.</li>
            <li>Unlicensed tobacco, vaping, alcohol, or pharmaceutical sales.</li>
            <li>Endangered wildlife or protected-species products.</li>
            <li>Any product or service prohibited by South African law.</li>
            <li>
              Any product or service prohibited by Visa, Mastercard, the
              acquiring bank, or the approved payment gateway.
            </li>
          </ul>

          {/* 17 */}
          <h2 className="text-white font-semibold">
            17. Fraud and Payment Misuse
          </h2>

          <p>
            Fraud, false payment claims, chargeback misuse, unauthorised use of
            payment methods, subscription manipulation, and attempts to obtain
            duplicate refunds are prohibited.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD may investigate and temporarily
            restrict an Account while a suspected payment, fraud, security, or
            chargeback issue is reviewed.
          </p>

          {/* 18 */}
          <h2 className="text-white font-semibold">
            18. Platform Terms
          </h2>

          <p>
            Registration, accounts, subscriptions, Teez Tokens, challenges,
            rankings, fair play, user conduct, suspension, intellectual
            property, and Platform use are governed by the separate Platform
            Terms & Conditions.
          </p>

          <button
            type="button"
            onClick={() => router.push("/terms")}
            className="w-full py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-black transition"
          >
            View Platform Terms & Conditions
          </button>

          {/* 19 */}
          <h2 className="text-white font-semibold">
            19. Consumer Rights
          </h2>

          <p>
            Nothing in these Website Terms is intended to remove, reduce, or
            limit any legal right that cannot lawfully be excluded under
            applicable South African law.
          </p>

          {/* 20 */}
          <h2 className="text-white font-semibold">
            20. Limitation of Liability
          </h2>

          <p>
            To the maximum extent permitted by applicable law, Honey Badger
            Technologies (PTY) LTD will not be liable for indirect, incidental,
            special, or consequential loss arising from the use or inability to
            use the website or Platform.
          </p>

          <p>
            Nothing in these Website Terms excludes liability that cannot
            lawfully be excluded or limited.
          </p>

          {/* 21 */}
          <h2 className="text-white font-semibold">
            21. Intellectual Property
          </h2>

          <p>
            The website, Platform, software, designs, systems, text, graphics,
            branding, logos, competition systems, and related intellectual
            property remain the property of Honey Badger Technologies (PTY) LTD
            or its authorised licensors.
          </p>

          {/* 22 */}
          <h2 className="text-white font-semibold">
            22. Governing Law and Domicilium
          </h2>

          <p>
            These Website Terms are governed by the laws of the Republic of
            South Africa.
          </p>

          <p>
            Honey Badger Technologies (PTY) LTD chooses the following address as
            its domicilium citandi et executandi for formal notices and legal
            process:
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

          {/* 23 */}
          <h2 className="text-white font-semibold">
            23. Changes to these Website Terms
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD may update these Website Terms
            where reasonably necessary to reflect changes in the services,
            subscription model, legal requirements, acquiring-bank
            requirements, payment-provider requirements, or security controls.
          </p>

          <p>
            Updated Website Terms will be published on this website. Material
            changes will be communicated or presented for renewed acceptance
            where required by applicable law.
          </p>

          {/* 24 */}
          <h2 className="text-white font-semibold">
            24. Company Information
          </h2>

          <p>
            Registered Company: Honey Badger Technologies (PTY) LTD
            <br />
            Registration Number: 2026/102722/07
            <br />
            Trading Platform: Teez Golf Challenges
            <br />
            Merchant Country: South Africa
            <br />
            Transaction Currency: South African Rand (ZAR)
          </p>

          {/* 25 */}
          <h2 className="text-white font-semibold">
            25. Contact Details
          </h2>

          <p>
            Honey Badger Technologies (PTY) LTD
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

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full py-4 rounded-2xl font-semibold text-lg bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88] mt-8"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}