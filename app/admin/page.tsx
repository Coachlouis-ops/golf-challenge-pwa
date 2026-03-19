"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00f0ff33,transparent_70%)]" />

      {/* LOGO */}
      <img
        src="/badger.png" // 🔴 put your image in /public as badger.png
        alt="Honey Badger"
        className="w-[400px] mb-10 drop-shadow-[0_0_30px_#00f0ff]"
      />

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10 tracking-wide text-cyan-400 drop-shadow-[0_0_10px_#00f0ff]">
        ADMIN DASHBOARD
      </h1>

      {/* BUTTON */}
      <button
        onClick={() => router.push("/admin/redemptions")}
        className="px-10 py-4 text-lg font-bold rounded-xl bg-cyan-400 text-black 
        shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_40px_#00f0ff] 
        animate-pulse transition-all duration-300"
      >
        TOKEN REDEMPTION REQUESTS
      </button>

    </div>
  );
}