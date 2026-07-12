"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/lib/AuthContext";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [sending, setSending] = useState(false);

  async function resendEmail() {
    if (!user) return;

    try {
      setSending(true);

      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Verification email could not be sent.");
      }

      alert("Verification email sent.");
    } catch (error: any) {
      console.error("Verification resend failed:", error);

      alert(
        error?.message ||
          "Verification email could not be sent. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Verify Your Email
      </h1>

      <p className="text-gray-400 mb-6 max-w-md">
        We sent a verification email to your registered email address. Open the
        email and select Verify Email. Then return to the Platform and log in to
        continue creating your player profile.
      </p>

      <button
        type="button"
        onClick={resendEmail}
        disabled={!user || sending}
        className="w-full max-w-md px-6 py-3 rounded-xl bg-[#00ff88] text-black font-semibold mb-4 disabled:opacity-40"
      >
        {sending ? "Sending..." : "Resend Verification Email"}
      </button>

      <button
        type="button"
        onClick={() => router.push("/login")}
        className="w-full max-w-md px-6 py-3 rounded-xl bg-[#00ff88] text-black font-semibold"
      >
        Continue to Login
      </button>
    </main>
  );
}