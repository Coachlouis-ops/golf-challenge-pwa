"use client";

export default function LegalTermsPage() {
  return (
    <main className="bg-black text-white px-6 md:px-16 py-16">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>

      <div className="space-y-6 text-sm text-gray-300 max-w-4xl">

        <p>
          This website is operated by <strong>Honey Badger Technologies (PTY) LTD</strong>
          (Registration Number: 2026/102722/07), a private company registered in South Africa.
        </p>

        {/* 1. DESCRIPTION */}
        <h2 className="text-white font-semibold">1. Description of Services</h2>
        <p>
          Honey Badger Technologies provides digital platforms, including Teez Golf Challenges,
          which offer access to skill-based competitions, memberships, and digital services.
        </p>

        {/* 2. AVAILABILITY */}
        <h2 className="text-white font-semibold">2. Availability</h2>
        <p>
          Services are subject to availability. In cases where services are unavailable,
          customers will be refunded in full within 30 days.
        </p>

        {/* 3. DELIVERY */}
        <h2 className="text-white font-semibold">3. Delivery Policy</h2>
        <p>
          Delivery of digital services (such as memberships or tokens) is processed immediately
          upon successful payment confirmation. Confirmation is provided via system access
          and/or email notification.
        </p>

        {/* 4. EXPORT RESTRICTION */}
        <h2 className="text-white font-semibold">4. Export Restriction</h2>
        <p>
          The offering on this website is available to South African clients only.
        </p>

        {/* 5. REFUNDS */}
        <h2 className="text-white font-semibold">5. Returns & Refunds Policy</h2>
        <p>
          All digital purchases are final. Refunds may only be issued in cases of system error,
          duplicate transactions, or where required by law.
        </p>

        {/* 6. PAYMENT */}
        <h2 className="text-white font-semibold">6. Payment Methods</h2>
        <p>
          Payment may be made via Visa, MasterCard, American Express, or other supported methods
          through PayFast.
        </p>

        <p>
          Card transactions will be acquired for Honey Badger Technologies (PTY) LTD via PayFast,
          the approved payment gateway for South African acquiring banks.
        </p>

        <p>
          PayFast uses Secure Socket Layer (SSL) encryption and no card details are stored on this website.
        </p>

        {/* 7. CUSTOMER DATA */}
        <h2 className="text-white font-semibold">7. Customer Data</h2>
        <p>
          Customer details are stored separately from card details, which are processed securely
          on PayFast systems. Honey Badger Technologies complies with the Protection of Personal
          Information Act (POPIA).
        </p>

        {/* 8. PRIVACY */}
        <h2 className="text-white font-semibold">8. Privacy Policy</h2>
        <p>
          We take all reasonable steps to protect user information. For more information,
          refer to PayFast privacy policy at https://payfast.io/privacy-policy/
        </p>

        {/* 9. RESPONSIBILITY */}
        <h2 className="text-white font-semibold">9. Responsibility</h2>
        <p>
          Honey Badger Technologies takes full responsibility for all aspects relating to
          transactions, including sale of services, customer support, dispute resolution,
          and service delivery.
        </p>

        {/* 10. COUNTRY */}
        <h2 className="text-white font-semibold">10. Country of Domicile</h2>
        <p>
          This website is governed by the laws of South Africa.
        </p>

        {/* 11. CURRENCY */}
        <h2 className="text-white font-semibold">11. Currency</h2>
        <p>
          All transactions are processed in South African Rand (ZAR).
        </p>

        {/* 12. COMPANY INFO */}
        <h2 className="text-white font-semibold">12. Company Information</h2>
        <p>
          Company Name: Honey Badger Technologies (PTY) LTD<br />
          Registration Number: 2026/102722/07<br />
          Address: 71 Duke Close, Silver Stream Estate, Pretoria, Gauteng, 0081<br />
          Email: info@honeybadgertech.co.za<br />
          Phone: +27 082 837 0266
        </p>

        {/* 13. VARIATION */}
        <h2 className="text-white font-semibold">13. Variation</h2>
        <p>
          Honey Badger Technologies may update these Terms at any time without prior notice.
        </p>

      </div>
    </main>
  );
}