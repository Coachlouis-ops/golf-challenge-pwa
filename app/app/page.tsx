"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">

      {/* HEADER */}
      <div className="relative z-20 px-4 pt-6">

        {/* BACK BUTTON */}
        <div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm"
          >
            ← Back
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-4">

          <button
            onClick={() => router.push("/terms")}
            className="flex-1 py-3 rounded-2xl bg-[#00ff88] text-black font-bold shadow-[0_0_15px_#00ff88]"
          >
            Create Account
          </button>

          <button
            onClick={() => router.push("/login")}
            className="flex-1 py-3 rounded-2xl bg-[#00ff88] text-black font-bold shadow-[0_0_15px_#00ff88]"
          >
            Login
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