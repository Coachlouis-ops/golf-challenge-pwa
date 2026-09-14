"use client";

import { useRouter } from "next/navigation";

export default function HomeDashboardPage() {
  const router = useRouter();

  const enterApp = () => {
    router.push("/");
  };

  const actions = [
    "PLAY A MATCH",
    "CREATE A CHALLENGE",
    "CREATE YOUR GROUP",
    "BUILD YOUR GOLFING CAREER",
    "CREATE PERSONALIZED LIVE GOLFDAY SCORING",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/logo.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />

        {/* DARK / BLUE BLEND */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,6,18,0.18)_0%,rgba(2,8,23,0.28)_38%,rgba(2,8,23,0.82)_72%,rgba(2,8,23,0.98)_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,153,255,0.12),transparent_65%)]" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-4 py-6 sm:px-6 md:py-10">
        {/* TOP */}
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          {/* LOGO */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 scale-110 rounded-full bg-blue-500/20 blur-3xl" />

            <img
              src="/teez-app-icon-v4.png"
              alt="Teez Golf Challenges"
              className="relative w-[150px] drop-shadow-[0_0_28px_rgba(0,153,255,0.8)] sm:w-[185px] md:w-[220px]"
            />
          </div>

          {/* HEADING */}
          <div className="mt-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-blue-300 sm:text-xs">
              TEEZ GOLF CHALLENGES
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[0_0_22px_rgba(0,153,255,0.75)] sm:text-4xl md:text-6xl">
              ENTER THE BATTLE
            </h1>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.26em] text-gray-300 sm:text-sm">
              Build Your Golf Career
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:mt-10">
            {actions.map((action) => (
              <button
                key={action}
                onClick={enterApp}
                className="
                  group relative overflow-hidden
                  rounded-xl border border-blue-300/70
                  bg-blue-500/10
                  px-5 py-4
                  text-center text-xs font-black
                  uppercase tracking-[0.16em]
                  text-white
                  shadow-[0_0_18px_rgba(0,153,255,0.45),inset_0_0_18px_rgba(0,153,255,0.08)]
                  backdrop-blur-md
                  transition-all duration-300
                  animate-pulse
                  hover:scale-[1.025]
                  hover:border-cyan-200
                  hover:bg-blue-500/25
                  hover:shadow-[0_0_32px_rgba(0,174,255,0.8),inset_0_0_22px_rgba(0,174,255,0.16)]
                  sm:text-sm
                "
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">{action}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-200/70">
            TEEZ GOLF CHALLENGES
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-gray-500">
            A Honey Badger Technologies Platform
          </p>
        </div>
      </div>
    </main>
  );
}