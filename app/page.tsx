"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADLINE */}
        <div className="px-6 pt-16 text-center">
          <h1 className="text-3xl font-bold leading-tight">
            The Global Golf
            <br />
            Challenge Platform
          </h1>
        </div>

        {/* HERO IMAGE */}
        <div className="mt-6 px-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/hero-teez.jpg"
              alt="Hero"
              className="w-full h-[35vh] md:h-[45vh] object-cover brightness-110 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-6 mt-8 flex flex-col gap-4">

          <button
            onClick={() => router.push("/register")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-semibold text-lg animate-pulse shadow-[0_0_15px_#00ff88]"
          >
            Create Account
          </button>

          <button
            onClick={() => router.push("/login")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black text-lg animate-pulse shadow-[0_0_15px_#00ff88]"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/how-it-works")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black text-lg animate-pulse shadow-[0_0_15px_#00ff88]"
          >
            How It Works
          </button>

        </div>

      </div>

    </div>
  );
}