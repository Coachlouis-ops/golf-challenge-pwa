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
      </div>

      {/* HERO BANNER */}
      <div className="w-full px-4 mt-6 flex justify-center">
        <img
          src="/app_app_main.png"
          alt="Teez Golf Challenges"
          className="w-full max-w-4xl h-[260px] md:h-[360px] object-contain object-top bg-black"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="relative z-20 px-4 mt-6 flex flex-col gap-4 max-w-md mx-auto">
        <button
          onClick={() => router.push("/terms")}
          className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-bold shadow-[0_0_15px_#00ff88]"
        >
          Register
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-bold shadow-[0_0_15px_#00ff88]"
        >
          Login
        </button>
      </div>
    </div>
  );
}