"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, db } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const userCred = await login(email, password);

      await userCred.user.reload();

      const freshUser = userCred.user;

      if (!freshUser.emailVerified) {
        router.push("/verify-email");
        return;
      }

      await handleRouting(freshUser.uid);
    } catch (err: any) {
      console.log("LOGIN ERROR:", err);
      setError(err.code || err.message);
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // CENTRAL SETUP ROUTING LOGIC
  // -------------------------------

  async function handleRouting(uid: string) {
    // ---------------- ADMIN CHECK ----------------
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    const userData = userSnap.exists() ? userSnap.data() : null;
    const role = userData?.role || "player";

    if (role === "admin") {
      router.push("/admin");
      return;
    }

    // ---------------- PROFILE CHECK ----------------
    const profileRef = doc(db, "profiles", uid);
    const profileSnap = await getDoc(profileRef);

    if (!profileSnap.exists()) {
      router.push("/profile");
      return;
    }

    const profile = profileSnap.data();

    if (
      !profile.name ||
      !profile.surname ||
      !profile.battleName ||
      !profile.club ||
      !profile.division
    ) {
      router.push("/profile");
      return;
    }

    // ---------------- PHONE CHECK ----------------
    if (!profile.phoneVerified) {
      router.push("/verify-phone");
      return;
    }

    // ---------------- SUBSCRIPTION CHECK ----------------
    if (!userSnap.exists()) {
      router.push("/payment");
      return;
    }

    if (userData?.subscriptionStatus !== "active") {
      router.push("/payment");
      return;
    }

    if (userData?.subscriptionExpires) {
      const expires =
        typeof userData.subscriptionExpires.toDate === "function"
          ? userData.subscriptionExpires.toDate()
          : new Date(userData.subscriptionExpires);

      if (new Date().getTime() > expires.getTime()) {
        router.push("/payment");
        return;
      }
    }

    router.push("/dashboard");
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-neutral-600 rounded-xl p-3 text-white"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-neutral-600 rounded-xl p-3 pr-12 text-white"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400"
          >
            {showPassword ? "🙈" : "👁"}
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
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
    </main>
  );
}