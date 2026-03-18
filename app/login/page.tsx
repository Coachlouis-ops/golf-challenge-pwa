"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register, db } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCred = await login(email, password);
      await handleRouting(userCred.user.uid);

    } catch (err: any) {

      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential"
      ) {
        try {
          const userCred = await register(email, password);
          await handleRouting(userCred.user.uid);

        } catch (regErr: any) {
          setError(regErr.message || "Registration failed");
        }
      } else {
        setError(err.message || "Login failed");
      }

    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // CENTRAL ROUTING LOGIC
  // -------------------------------
  async function handleRouting(uid: string) {

    const profileRef = doc(db, "profiles", uid);
    const profileSnap = await getDoc(profileRef);

    // 🔴 NEW USER → must create profile
    if (!profileSnap.exists()) {
      router.push("/create-profile");
      return;
    }

    const role = profileSnap.get("role") || "player";

    // 🔴 ADMIN FLOW
    if (role === "admin") {
      router.push("/admin/security");
      return;
    }

    // 🔴 NORMAL USER
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Sign In or Register
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
          required
        />

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2"
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </form>
    </main>
  );
}