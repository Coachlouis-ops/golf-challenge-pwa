"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/src/lib/firebase";

export default function VerifyPhonePage() {

  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyOTP() {

    try {

      setLoading(true);

      const confirmationResult =
        (window as any).confirmationResult;

      if (!confirmationResult) {
        alert("OTP session expired. Please retry.");
        return;
      }

      // -------------------------------------------------
      // VERIFY CODE
      // -------------------------------------------------
      await confirmationResult.confirm(otp);

   const uid =
  localStorage.getItem("phoneVerificationUid");

if (!uid) {
  alert("Verification session missing.");
  return;
}

// -------------------------------------------------
// UPDATE PROFILE
// -------------------------------------------------


await setDoc(
 doc(db, "profiles", uid),
  {
    phoneVerified: true,
    phoneVerifiedAt: serverTimestamp(),
  },
  { merge: true }
);

      alert("Phone number verified successfully.");

      router.push("/payment");

    } catch (err: any) {

      console.error(err);

      alert(
        err.message || "Invalid OTP code"
      );

    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-neutral-900 border border-green-500 rounded-2xl p-6 space-y-5">

        <div className="text-center space-y-2">

          <h1 className="text-3xl font-bold text-green-400">
            VERIFY PHONE
          </h1>

          <p className="text-sm text-gray-400">
            Enter the OTP sent to your mobile number
          </p>

        </div>

        {/* OTP INPUT */}

        <div className="space-y-2">

          <p className="text-xs text-gray-400">
            One Time PIN
          </p>

          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            placeholder="Enter OTP"
            className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-4 py-3 rounded-xl focus:border-green-400 focus:outline-none"
          />

        </div>

        {/* VERIFY BUTTON */}

        <button
          onClick={verifyOTP}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
        >
          {loading
            ? "Verifying..."
            : "Verify Phone"}
        </button>

      </div>

    </main>
  );
}