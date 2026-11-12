"use client";

import { useRouter } from "next/navigation";

export default function RyderCupPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">
        <header className="sticky top-0 z-30 border-b border-cyan-400/30 bg-[#030608]/95 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.05] text-2xl font-black text-cyan-300"
            >
              ‹
            </button>
            <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-400">
                TEEZ Golf Challenges
              </p>
              <h1 className="mt-1 text-lg font-black tracking-wide">
                RYDER CUP TEAM STANDINGS
              </h1>
            </div>
            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          <section className="border border-cyan-400/40 bg-[#071017] p-5 text-center shadow-[0_0_32px_rgba(34,211,238,0.12)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
              USA vs Europe
            </p>
            <h2 className="mt-2 text-2xl font-black">TEAM STANDINGS</h2>
            <p className="mt-3 text-sm leading-5 text-slate-400">
              Team USA and Team Europe are seeded from match rankings. This
              page no longer reads or shows a dollar balance.
            </p>
          </section>

          <div className="grid grid-cols-2 gap-3">
            <div className="border border-blue-400/40 bg-blue-400/[0.06] p-4 text-center">
              <p className="text-sm font-black text-blue-300">TEAM USA</p>
              <p className="mt-1 text-[10px] text-slate-400">Captain: Seed #1</p>
            </div>
            <div className="border border-amber-400/40 bg-amber-400/[0.06] p-4 text-center">
              <p className="text-sm font-black text-amber-300">TEAM EUROPE</p>
              <p className="mt-1 text-[10px] text-slate-400">Captain: Seed #2</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}