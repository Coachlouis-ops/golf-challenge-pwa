"use client";

import { useAuth } from "@/src/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [sending, setSending] = useState(false);

  async function resendEmail() {
    if (!user) return;

    try {
      setSending(true);

      await fetch("/api/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      alert("Verification email sent");
    } catch (e: any) {
      console.log("RESEND ERROR FULL:", e);
      alert(e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Verify Your Email
      </h1>

      <p className="text-gray-400 mb-6 max-w-md">
        We sent you a verification email. Open your email, click Verify Email,
        and then continue to login from the verification screen.
      </p>

      <button
        onClick={resendEmail}
        disabled={sending}
        className="w-full max-w-md px-6 py-3 rounded-xl bg-[#00ff88] text-black font-semibold mb-4"
      >
        {sending ? "Sending..." : "Resend Email"}
      </button>

     <button
  onClick={() => router.push("/login")}
  className="w-full max-w-md px-6 py-3 rounded-xl bg-[#00ff88] text-black font-semibold"
>
  Go to Login
</button>
    </div>
  );
}