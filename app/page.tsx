"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative font-sans text-white">

      {/* HERO IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-teez.jpg')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 text-white">
        <div className="font-bold tracking-wide">
          TEEZ GOLF CHALLENGES
        </div>

        <div className="flex gap-6 text-sm">
          <button onClick={() => router.push("/")}>Home</button>
          <button onClick={() => router.push("/how-it-works")}>How It Works</button>
          <button onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/register")}>Register</button>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          The Global Golf Challenge Platform
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mt-6">

          <button
            onClick={() => router.push("/how-it-works")}
            className="px-8 py-3 rounded-xl bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
          >
            How It Works
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-8 py-3 rounded-xl bg-[#00ff88] text-black font-semibold"
          >
            Create Account
          </button>

        </div>

        <div className="mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="underline text-[#00ff88]"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
}