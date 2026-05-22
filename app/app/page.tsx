"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-hidden">

      {/* FULLSCREEN HERO BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img
          src="/app_app_main.png"
          alt="Teez Background"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-6">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white text-sm border border-white/10"
        >
          ← Back
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-center relative z-10 px-6">

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-4 mt-[20vh]">

          <button
            onClick={() => router.push("/terms")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-bold text-lg shadow-[0_0_25px_#00ff88]"
          >
            Create Account
          </button>

          <button
            onClick={() => router.push("/login")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-bold text-lg shadow-[0_0_25px_#00ff88]"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/how-it-works")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-bold text-lg shadow-[0_0_25px_#00ff88]"
          >
            How It Works
          </button>

        </div>

      </div>

    </div>
  );
}