"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [accepted, setAccepted] = useState(false);

  const paymentReference = user
    ? `TEEZZ-${user.uid.slice(0, 6).toUpperCase()}`
    : "TEEZZ-USER";

     const bankLinks = [
    {
      name: "FNB",
      logo: "/fnb-logo.png",
      url: "https://www.fnb.co.za/ways-to-bank/online-banking.html",
      bankName: "FNB",
      accountName: "HONEY BADGER TECHNOLOGIES (PTY) LTD",
      accountNumber: "63208933390",
      accountType: "Gold Business Account",
      branchCode: "250655",
    },
    {
      name: "CAPITEC",
      logo: "/capitec-logo.png",
      url: "https://www.capitecbank.co.za/personal/transact/online-banking/",
      bankName: "Capitec Business",
      accountName: "HONEY BADGER TECHNOLOGIES (PTY)LTD",
      accountNumber: "1055098925",
      accountType: "Capitec Business Account",
      branchCode: "450105",
    },
    {
      name: "ABSA",
      logo: "/absa-logo.png",
      url: "https://www.absa.co.za/personal/",
      bankName: "ABSA",
      accountName: "Coming Soon",
      accountNumber: "Coming Soon",
      accountType: "Business Account",
      branchCode: "Coming Soon",
    },
    {
      name: "STANDARD BANK",
      logo: "/standard-bank-logo.png",
      url: "https://experience.standardbank.co.za/",
      bankName: "Standard Bank",
      accountName: "Coming Soon",
      accountNumber: "Coming Soon",
      accountType: "Business Account",
      branchCode: "Coming Soon",
    },
    {
      name: "NEDBANK",
      logo: "/nedbank-logo.png",
      url: "https://www.nedbank.co.za/",
      bankName: "Nedbank",
      accountName: "Coming Soon",
      accountNumber: "Coming Soon",
      accountType: "Business Account",
      branchCode: "Coming Soon",
    },
  ];

   // -----------------------------------
  // COPY REFERENCE
  // -----------------------------------
  async function copyReference() {
    await navigator.clipboard.writeText(paymentReference);
    alert("Reference copied");
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
    alert("Copied");
  }

  // -----------------------------------
  // EFT TEMP PAYMENT FLOW
  // -----------------------------------
  function continueToProfile() {
    if (!accepted) {
      alert("You must accept the Terms & Conditions");
      return;
    }

    if (!user) {
      alert("User not logged in");
      router.push("/login");
      return;
    }

    router.push("/create-profile");
  }

  // -----------------------------------
// LOADING
// -----------------------------------
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}

return (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6">
    {/* HERO */}
    <div className="text-center flex flex-col gap-3">
      <h1 className="text-5xl font-bold text-green-400">WELCOME</h1>
      <h2 className="text-3xl font-semibold">Membership Payment</h2>
      <p className="text-gray-400 max-w-xl">
        Complete your Teez Golf membership payment before creating your player profile.
      </p>
    </div>

    {/* CARD */}
    <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-md w-full">
      <h3 className="text-xl font-bold text-green-400">
        Teez Golf Membership
      </h3>

      <p className="text-4xl font-bold">
        R189.99 <span className="text-sm text-gray-400">/ year</span>
      </p>

      {/* EFT INFO */}
      <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-4 space-y-3 text-sm">
        <p className="text-green-400 font-semibold">EFT Payment</p>

        <div>
          <p className="text-gray-400">Account Name</p>
          <p className="font-semibold">Honey Badger Technologies PTY LTD</p>
        </div>

        <div>
          <p className="text-gray-400">Amount</p>
          <p className="font-semibold">R189.99</p>
        </div>

        <div>
          <p className="text-gray-400">Reference</p>
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold break-all">
              {paymentReference}
            </p>

            <button
              onClick={copyReference}
              className="shrink-0 px-3 py-1 rounded-lg bg-green-500 text-black text-xs font-semibold"
            >
              Copy
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Use the reference exactly when making payment. EFT verification will be handled manually.
        </p>
      </div>

      {/* BANK LINKS */}
      <div className="text-left bg-black/40 border border-zinc-700 rounded-xl p-4 space-y-4 text-sm">
        <p className="text-green-400 font-semibold">
          Select Your Bank
        </p>

        <div className="grid grid-cols-2 gap-3">
          {bankLinks.map((bank) => (
            <div
              key={bank.name}
              className="rounded-xl bg-black border border-zinc-700 p-3 space-y-3"
            >
              <button
                onClick={() => window.open(bank.url, "_blank")}
                className="w-full rounded-xl bg-black border border-zinc-800 hover:border-green-400 p-4 flex items-center justify-center transition"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="h-14 max-w-full object-contain"
                />
              </button>

              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-gray-400">Bank</p>
                  <p className="font-semibold">{bank.bankName}</p>
                </div>

                <div>
                  <p className="text-gray-400">Account Name</p>
                  <p className="font-semibold">{bank.accountName}</p>
                </div>

                <div>
                  <p className="text-gray-400">Account Number</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold break-all">
                      {bank.accountNumber}
                    </p>

                    {bank.accountNumber !== "Coming Soon" && (
                      <button
                        onClick={() => copyText(bank.accountNumber)}
                        className="px-2 py-1 rounded bg-green-500 text-black text-[10px] font-semibold"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400">Branch Code</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{bank.branchCode}</p>

                    {bank.branchCode !== "Coming Soon" && (
                      <button
                        onClick={() => copyText(bank.branchCode)}
                        className="px-2 py-1 rounded bg-green-500 text-black text-[10px] font-semibold"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-gray-400">Account Type</p>
                  <p className="font-semibold">{bank.accountType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400">
          On mobile, use your own banking app if the website does not open the app automatically.
        </p>
      </div>

      {/* LEGAL BLOCK */}
      <div className="text-xs text-gray-400 space-y-2 text-left">
        <p>
          Payments are made to{" "}
          <strong>Honey Badger Technologies (PTY) LTD</strong>.
        </p>

        <p>
          By proceeding, you agree to the{" "}
          <span
            onClick={() => router.push("/legal/terms")}
            className="underline cursor-pointer text-green-400"
          >
            Terms & Conditions
          </span>
          .
        </p>

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span>I agree to the Terms & Conditions</span>
        </label>
      </div>

      {/* WAITING FOR ADMIN APPROVAL */}
      <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-4 text-left text-sm">
        <p className="text-yellow-400 font-semibold mb-2">
          Payment Verification Required
        </p>

        <p className="text-gray-300">
          After making your EFT payment, your account will be reviewed manually.
          Once the payment reflects in our bank account, an administrator will activate
          your membership and unlock profile creation.
        </p>
      </div>
    </div>

    {/* BACK */}
    <button
      onClick={() => router.push("/login")}
      className="text-sm text-gray-400 underline"
    >
      Back to Login
    </button>
  </div>
);
}