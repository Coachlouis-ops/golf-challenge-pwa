"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const router = useRouter();

  // HERO IMAGES (add more if needed)
  const images = [
    "/hero-teez.jpg",
    "/hero-teez-2.jpg",
    "/hero-teez-3.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

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

        {/* HERO IMAGE (OVERLAP STYLE) */}
        <div className="mt-6 px-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">

            <img
              src={images[current]}
              alt="Hero"
              className="w-full h-[260px] object-cover transition-all duration-700"
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="px-6 mt-8 flex flex-col gap-4">

          <button
            onClick={() => router.push("/register")}
            className="w-full py-4 rounded-2xl bg-[#00ff88] text-black font-semibold text-lg"
          >
            Create Account
          </button>

          <button
            onClick={() => router.push("/how-it-works")}
            className="w-full py-4 rounded-2xl bg-[#1f1f1f] text-white text-lg"
          >
            How It Works
          </button>

        </div>

        {/* LOGIN TEXT */}
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-[#00ff88] underline"
          >
            Sign In
          </button>
        </div>

      </div>

      {/* BOTTOM APP NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-[#1f1f1f] px-4 py-3 flex justify-between z-50">

        <button
          onClick={() => router.push("/")}
          className="flex-1 mx-1 py-3 rounded-xl bg-[#1a1a1a]"
        >
          Home
        </button>

        <button
          onClick={() => router.push("/how-it-works")}
          className="flex-1 mx-1 py-3 rounded-xl bg-[#1a1a1a]"
        >
          How It Works
        </button>

        <button
          onClick={() => router.push("/login")}
          className="flex-1 mx-1 py-3 rounded-xl bg-[#1a1a1a]"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="flex-1 mx-1 py-3 rounded-xl bg-[#00ff88] text-black font-semibold"
        >
          Register
        </button>

      </div>

      {/* SPACING FOR FIXED NAV */}
      <div className="h-20" />

    </div>
  );
}