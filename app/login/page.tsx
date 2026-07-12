"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import { login, db } from "@/src/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const userCredential = await login(email, password);

      await userCredential.user.reload();

      const currentUser = userCredential.user;

      if (!currentUser.emailVerified) {
        router.replace("/verify-email");
        return;
      }

      await handleRouting(currentUser.uid);
    } catch (error: any) {
      console.error("Login failed:", error);

      setError(
        error?.message ||
          "Login failed. Check your email address and password."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRouting(uid: string) {
    // ADMIN CHECK
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    const userData = userSnapshot.exists()
      ? userSnapshot.data()
      : null;

    const role = userData?.role || "player";

    if (role === "admin") {
      router.replace("/admin");
      return;
    }

    // PROFILE CHECK
    const profileRef = doc(db, "profiles", uid);
    const profileSnapshot = await getDoc(profileRef);

    if (!profileSnapshot.exists()) {
      router.replace("/profile");
      return;
    }

    const profileData = profileSnapshot.data();

    if (
      !profileData.name ||
      !profileData.surname ||
      !profileData.battleName ||
      !profileData.club ||
      !profileData.division
    ) {
      router.replace("/profile");
      return;
    }

    // PHONE VERIFICATION CHECK
    if (!profileData.phoneVerified) {
      router.replace("/verify-phone");
      return;
    }

    // SUBSCRIPTION CHECK
    if (
      !userSnapshot.exists() ||
      userData?.subscriptionStatus !== "active"
    ) {
      router.replace("/payment");
      return;
    }

    if (userData?.subscriptionExpires) {
      const subscriptionExpiry =
        typeof userData.subscriptionExpires.toDate === "function"
          ? userData.subscriptionExpires.toDate()
          : new Date(userData.subscriptionExpires);

      if (Date.now() > subscriptionExpiry.getTime()) {
        router.replace("/payment");
        return;
      }
    }

    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-neutral-900 border border-neutral-700 rounded-2xl p-6"
      >
        <h1 className="text-2xl font-semibold text-center">
          Sign In
        </h1>

        <p className="text-sm text-gray-400 text-center">
          Continue your setup or access your Teez Golf Challenges dashboard.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full bg-black border border-neutral-600 rounded-xl p-3 text-white"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-black border border-neutral-600 rounded-xl p-3 pr-16 text-white"
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((previous) => !previous)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl disabled:opacity-40"
        >
          {loading ? "Signing In..." : "Continue"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full text-sm text-gray-400 underline"
        >
          Create a new account
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full text-sm text-gray-500 underline"
        >
          Back to Home
        </button>
      </form>
    </main>
  );
}