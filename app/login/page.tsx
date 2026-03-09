"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/src/lib/firebase";

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
    await login(email, password);
    router.push("/dashboard");
  } catch (err: any) {
    if (err.code === "auth/user-not-found") {
      try {
        await register(email, password);
        router.push("/dashboard");
      } catch (regErr: any) {
        setError(regErr.message || "Registration failed");
      }
    } else {
      setError("Incorrect email or password");
    }
  } finally {
    setLoading(false);
  }
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