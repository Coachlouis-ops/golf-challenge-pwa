"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
<div className="min-h-screen relative text-white flex flex-col items-center justify-center overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/logo.png')",
    }}
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col items-center">

    <h1 className="text-4xl font-bold mb-10 text-cyan-400 drop-shadow-[0_0_15px_#00f0ff]">
      ADMIN DASHBOARD
    </h1>

    <button
      onClick={() => router.push("/admin/redemptions")}
      className="px-10 py-4 text-lg font-bold rounded-xl bg-cyan-400 text-black 
      shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_40px_#00f0ff] 
      animate-pulse transition-all duration-300"
    >
      TOKEN REDEMPTION REQUESTS
    </button>

  </div>
</div>
  );
}