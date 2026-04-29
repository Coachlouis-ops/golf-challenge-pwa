"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 pt-6">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm"
        >
          ← Back
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* HEADLINE */}
        <div className="px-6 pt-10 text-center">
          <h1 className="leading-tight">
            <span className="block text-4xl md:text-6xl font-extrabold tracking-tight uppercase
              bg-gradient-to-r from-white via-[#00ff88] to-white
              bg-clip-text text-transparent
              drop-shadow-[0_0_10px_#00ff88]">
              Teez
            </span>

            <span className="block mt-2 text-lg md:text-xl font-semibold text-white/90 tracking-wide">
              Your Golf Challenge Platform
            </span>
          </h1>
        </div>

        {/* HERO IMAGE */}
        <div className="mt-6 px-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black">
            <img
              src="/hero-teez.jpg"
              alt="Hero"
              className="w-full h-[35vh] md:h-[45vh] object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-6 mt-8 flex flex-col gap-4">

          <button
            onClick={() => router.push("/terms")}
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