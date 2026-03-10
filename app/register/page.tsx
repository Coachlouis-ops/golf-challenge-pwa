"use client";

import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();


  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white font-sans">

      <h1 className="text-3xl font-semibold">
        Create Your Account
      </h1>

      <p className="text-gray-400 text-center max-w-md">
        Registration happens automatically when you sign in for the first time.
        Enter your email and password to create your account.
      </p>

      <button
        onClick={() => router.push("/login")}
        className="px-8 py-3 rounded-xl bg-[#00ff88] text-black font-semibold"
      >
        Continue to Sign In
      </button>

<button
  onClick={() => router.push("/payment")}
  className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold"
>
  Pay Membership ($10.99 / year)
</button>

      <button
        onClick={() => router.push("/")}
        className="text-sm underline text-gray-400"
      >
        Back to Home
      </button>

    </main>
  );
}