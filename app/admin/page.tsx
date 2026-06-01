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
 <div className="relative z-10 flex flex-col items-center gap-6">

  <h1 className="text-4xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#00f0ff]">
    ADMIN DASHBOARD
  </h1>

  <button
    onClick={() => router.push("/admin/redemptions")}
    className="w-[320px] px-10 py-4 text-lg font-bold rounded-xl bg-cyan-400 text-black 
    shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_40px_#00f0ff] 
    animate-pulse transition-all duration-300"
  >
    TOKEN REDEMPTION REQUESTS
  </button>

  <button
    onClick={() => router.push("/admin/scoring-clubs")}
    className="w-[320px] px-10 py-4 text-lg font-bold rounded-xl bg-green-400 text-black 
    shadow-[0_0_20px_rgba(34,197,94,0.8)] 
    hover:shadow-[0_0_40px_rgba(34,197,94,1)] 
    animate-pulse transition-all duration-300"
  >
    TEEZ SCORING CLUBS
  </button>

</div>
</div>
  );
}