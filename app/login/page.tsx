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

    // 🔥 FORCE REFRESH FROM FIREBASE
    await userCred.user.reload();

    // 🔥 GET FRESH USER (IMPORTANT)
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
  // CENTRAL ROUTING LOGIC
  // -------------------------------
 async function handleRouting(uid: string) {

  const profileRef = doc(db, "profiles", uid);
  const profileSnap = await getDoc(profileRef);


  if (!profileSnap.exists()) {
    router.push("/create-profile");
    return;
  }

  // ✅ READ ROLE FROM USERS COLLECTION (CORRECT)
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  const role = userSnap.exists()
    ? userSnap.get("role") || "player"
    : "player";

  // 🔴 ADMIN
  if (role === "admin") {
    router.push("/admin");
    return;
  }

  // 🔴 PLAYER
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

<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border p-2 pr-10"
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
  >
    {showPassword ? "🙈" : "👁"}
  </button>
</div>

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