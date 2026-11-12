"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  bookmakerPolicies,
  bookmakerPolicyAcceptanceList,
} from "@/app/bookmaker/policies";
import { auth } from "@/src/lib/firebase";
import { readJoinReturn } from "@/src/lib/challengeMatch";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    if (!email || !password) {
      alert("Enter your email address and password.");
      return;
    }

    if (!accepted) {
      alert("Accept the legal terms before creating your account.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      router.push(readJoinReturn() || "/profile");
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        alert(
          "An account already exists with this email address. Please login instead."
        );
        return;
      }

      alert(error?.message || "Account registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white font-sans px-6 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">ABC Bookmakers</h1>
        <h2 className="mt-2 text-xl font-medium">
          Create your players account
        </h2>
      </div>

      <p className="text-sm text-gray-400 text-center max-w-md">
        Register your account, create your player profile, and activate your
        subscription.
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full max-w-md px-4 py-3 rounded-xl bg-gray-900 border border-gray-700"
      />

      <div className="relative w-full max-w-md">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-900 border border-gray-700"
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div className="w-full max-w-md border border-white/10 bg-white/5 rounded-xl p-4 space-y-4">
        <p className="text-sm font-semibold text-green-400">
          Review the ABC Bookmakers Legal Policies
        </p>

        <div className="flex flex-col gap-2 text-sm">
          {bookmakerPolicies.map((policy) => (
            <Link
              key={policy.href}
              href={policy.href}
              className="text-left text-green-400 underline"
            >
              {policy.label}
            </Link>
          ))}
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-1"
          />

          <span className="text-sm text-gray-300">
            I have reviewed and accept the {bookmakerPolicyAcceptanceList()}.
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={handleRegister}
        disabled={loading || !accepted}
        className={`w-full max-w-md py-4 rounded-2xl font-semibold text-lg transition ${
          accepted && !loading
            ? "bg-[#00ff88] text-black shadow-[0_0_15px_#00ff88]"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Creating..." : "Start Setup"}
      </button>

      <button
        type="button"
        onClick={() => router.push("/login")}
        className="text-sm underline text-gray-400"
      >
        Already have an account? Login
      </button>
    </main>
  );
}