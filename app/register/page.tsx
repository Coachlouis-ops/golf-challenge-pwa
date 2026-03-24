"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/src/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password) return;

    try {
      setLoading(true);

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 🔥 SEND VERIFICATION EMAIL
      await sendEmailVerification(cred.user);

      // 🚫 DO NOT GO DASHBOARD
      router.push("/verify-email");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white font-sans px-6">

      <h1 className="text-3xl font-semibold">
        Create Your Account
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl bg-gray-900 border border-gray-700"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl bg-gray-900 border border-gray-700"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full max-w-md py-4 rounded-2xl bg-[#00ff88] text-black font-semibold text-lg shadow-[0_0_15px_#00ff88]"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <button
        onClick={() => router.push("/login")}
        className="text-sm underline text-gray-400"
      >
        Already have an account? Login
      </button>

    </main>
  );
}