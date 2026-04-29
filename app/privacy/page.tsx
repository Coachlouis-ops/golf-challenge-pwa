"use client";

export default function PrivacyPage() {
  return (
    <main className="bg-[#0b071d] text-white px-6 py-16 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Privacy Policy – Teez Golf Challenges
      </h1>

      <p className="text-gray-400 mb-6">
        This Privacy Policy explains how Teez Golf Challenges (“the Platform”), 
        developed and operated by Honey Badger Technologies PTY LTD, collects, uses, 
        and protects your information when you use the platform.
      </p>

      <p className="text-gray-400 mb-6">
        Honey Badger Technologies PTY LTD, a company registered in South Africa, 
        is the data controller responsible for the collection and processing of 
        personal information on this platform.
      </p>

      {/* ================= DATA COLLECTION ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="text-gray-300">
          We may collect personal information including your name, email address, 
          account details, gameplay activity, transaction history, and any information 
          submitted during platform use.
        </p>
      </section>

      {/* ================= PLATFORM DATA ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Platform Usage Data</h2>
        <p className="text-gray-300">
          We collect data related to challenge participation, scores, rankings, 
          token usage, and user interactions strictly for operating and improving 
          the platform.
        </p>
      </section>

      {/* ================= PAYMENTS ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Payments</h2>
        <p className="text-gray-300">
          Payments are processed through secure third-party providers including 
          Stripe and PayFast. We do not store full payment card details. 
          Payment providers process your data in accordance with their own policies.
        </p>
      </section>

      {/* ================= TOKENS ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Digital Tokens</h2>
        <p className="text-gray-300">
          The platform operates using digital tokens for entry into challenges. 
          These tokens are not a form of currency or financial instrument.
        </p>
      </section>

      {/* ================= EMAIL ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Email Communication</h2>
        <p className="text-gray-300">
          We use secure third-party providers to send account notifications, 
          verification emails, and platform updates. Your email is not sold or 
          used for unsolicited marketing.
        </p>
      </section>

      {/* ================= STORAGE ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">6. Data Storage & Security</h2>
        <p className="text-gray-300">
          Data is stored using secure cloud infrastructure. We take reasonable 
          measures to protect your data, but no system is completely secure.
        </p>
      </section>

      {/* ================= COOKIES ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
        <p className="text-gray-300">
          Cookies and local storage may be used to maintain sessions and ensure 
          proper platform functionality. No tracking or advertising cookies are 
          used without user consent.
        </p>
      </section>

      {/* ================= USER RIGHTS ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">8. User Rights</h2>

        <p className="text-gray-300 mb-4">
          Users have the right to request access to, correction of, or deletion 
          of their personal data.
        </p>

        <p className="text-gray-300 mb-4">
          To request deletion, send an email to:
        </p>

        <p className="text-purple-400 mb-4">
          info@honeybadgertech.com
        </p>

        <p className="text-gray-300 mb-4">
          Include the following:
        </p>

        <div className="text-gray-300 mb-4">
          <ul className="list-disc pl-6 space-y-1">
            <li>Your full name</li>
            <li>Your registered email address</li>
            <li>Your account details (if applicable)</li>
          </ul>
        </div>

        <p className="text-gray-300 mb-4">
          Requests are processed within a reasonable timeframe (typically 7–30 days).
        </p>

        <p className="text-gray-300">
          Some data may be retained where required for legal or regulatory purposes.
        </p>
      </section>

      {/* ================= THIRD PARTY ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">9. Third-Party Services</h2>
        <p className="text-gray-300">
          The platform integrates with third-party services such as payment 
          providers and authentication systems, which operate under their own policies.
        </p>
      </section>

      {/* ================= PLATFORM ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">10. Platform Nature</h2>
        <p className="text-gray-300">
          Teez Golf Challenges is a skill-based competition platform and does not 
          operate as a gambling service.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
        <p className="text-gray-300">
          For privacy-related queries:
        </p>
        <p className="text-purple-400 mt-2">
          info@honeybadgertech.com
        </p>
      </section>

      {/* ================= UPDATES ================= */}
      <section>
        <h2 className="text-2xl font-bold mb-4">12. Updates</h2>
        <p className="text-gray-300">
          This policy may be updated periodically. Continued use of the platform 
          constitutes acceptance of updates.
        </p>
      </section>

    </main>
  );
}