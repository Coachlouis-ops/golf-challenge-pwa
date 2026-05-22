"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">

      {/* HEADER */}
      <div className="relative z-20 px-4 pt-6">

        {/* TOP ROW */}
        <div className="flex items-center justify-between gap-2">

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm"
          >
            ← Back
          </button>

          <button
            onClick={() => router.push("/terms")}
            className="px-4 py-2 rounded-xl bg-[#00ff88] text-black text-sm font-bold shadow-[0_0_15px_#00ff88]"
          >
            Create Account
          </button>

        </div>

        {/* SECOND ROW */}
        <div className="flex gap-3 mt-3">

          <button
            onClick={() => router.push("/login")}
            className="flex-1 py-3 rounded-2xl bg-[#00ff88] text-black font-bold shadow-[0_0_15px_#00ff88]"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/how-it-works")}
            className="flex-1 py-3 rounded-2xl bg-[#00ff88] text-black font-bold shadow-[0_0_15px_#00ff88]"
          >
            How It Works
          </button>

        </div>

      </div>

      {/* HERO IMAGE */}
      <div className="relative w-full mt-6">

        <img
          src="/app_app_main.png"
          alt="Teez Golf Challenges"
          className="w-full h-[65vh] object-cover object-top"
        />

      </div>

    </div>
  );
}