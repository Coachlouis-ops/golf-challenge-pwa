"use client";

import { useRouter } from "next/navigation";

const journey = [
  {
    number: "01",
    icon: "JOIN",
    title: "JOIN TEEZ",
    text: "Create your account and enter the TEEZ golf world.",
  },
  {
    number: "02",
    icon: "PLAYER",
    title: "BUILD YOUR PLAYER",
    text: "Create your player identity and start your golf career.",
  },
  {
    number: "03",
    icon: "TOKENS",
    title: "GET TOKENS",
    text: "Load your wallet and get ready to compete.",
  },
  {
    number: "04",
    icon: "BATTLE",
    title: "COMPETE & CREATE",
    text: "Challenges • Competitions • Groups",
  },
  {
    number: "05",
    icon: "PLAY",
    title: "PLAY REAL GOLF",
    text: "Your real rounds become part of your TEEZ career.",
  },
  {
    number: "06",
    icon: "RESULT",
    title: "FINALIZE RESULTS",
    text: "Complete the battle and lock in the official result.",
  },
  {
    number: "07",
    icon: "CAREER",
    title: "BUILD YOUR CAREER",
    text: "Every result contributes to your player progression.",
  },
  {
    number: "08",
    icon: "RANK",
    title: "CLIMB THE RANKINGS",
    text: "Compete. Perform. Progress.",
  },
  {
    number: "09",
    icon: "BONUS",
    title: "EARN BONUS BALLS",
    text: "Your golf career unlocks rewards and opportunities.",
  },
  {
    number: "10",
    icon: "TOUR",
    title: "TOURS & EVENTS",
    text: "Progress toward TEEZ tours, events and qualification.",
  },
];

const rewards = [
  {
    number: "01",
    title: "CAREER ENHANCEMENTS",
    text: "Unlock boosts that can enhance your TEEZ golf career.",
    symbol: "+",
  },
  {
    number: "02",
    title: "PLAYER APPAREL",
    text: "Unlock TEEZ player apparel and selected rewards.",
    symbol: "T",
  },
  {
    number: "03",
    title: "TOURS & EVENTS",
    text: "Progress toward qualification opportunities and TEEZ experiences.",
    symbol: "Q",
  },
];

function JourneySymbol({
  label,
  number,
}: {
  label: string;
  number: string;
}) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-blue-300/60 bg-[#061329] shadow-[0_0_28px_rgba(0,170,255,0.28),inset_0_0_20px_rgba(0,170,255,0.08)] sm:h-24 sm:w-24">
      <div className="absolute inset-[6px] rounded-full border border-white/10" />

      <div className="relative text-center">
        <p className="text-[8px] font-black tracking-[0.2em] text-blue-300">
          {number}
        </p>
        <p className="mt-1 text-[9px] font-black tracking-[0.08em] text-white sm:text-[10px]">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function HowTeezWorksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020817] text-white">
      {/* =========================================================
          TOP NAVIGATION
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-blue-400/15 bg-[#020817]/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => router.push("/main")}
            className="min-w-0 rounded-full border border-white/20 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-200 transition hover:border-blue-300 hover:text-blue-300 sm:text-[10px]"
          >
            RETURN TO MAIN
          </button>

          <p className="hidden text-[9px] font-black uppercase tracking-[0.22em] text-blue-300 sm:block">
            HOW TEEZ WORKS
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="min-w-0 rounded-full border border-blue-300/70 bg-blue-500/10 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-[0_0_16px_rgba(0,170,255,0.28)] transition hover:bg-blue-500/20 sm:text-[10px]"
          >
            ENTER TEEZ
          </button>
        </div>
      </header>

      {/* =========================================================
          HERO / BRAND
      ========================================================= */}
      <section className="relative overflow-hidden px-5 pb-14 pt-8 text-center sm:px-6 sm:pb-20 sm:pt-12">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] max-w-[100vw] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[110px]" />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <img
            src="/transparent.png"
            alt="TEEZ Golf Challenges"
            className="mx-auto h-auto w-full max-w-[180px] object-contain sm:max-w-[230px]"
          />

          <img
            src="/teez_text_01.png"
            alt="TEEZ"
            className="mx-auto mt-5 h-auto w-full max-w-[310px] object-contain sm:max-w-[480px]"
          />

          <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.28em] text-blue-300 sm:text-xs">
            HOW TEEZ WORKS
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-black uppercase leading-[1.02] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            PLAY GOLF.
            <span className="block text-blue-300">BUILD YOUR CAREER.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
            Your golf. Your results. Your progression. One connected TEEZ
            career.
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-2">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-400/50" />
            <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_15px_rgba(0,170,255,1)]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-400/50" />
          </div>
        </div>
      </section>

      {/* =========================================================
          THE TEEZ JOURNEY
      ========================================================= */}
      <section className="relative border-y border-blue-400/10 bg-[#030b1b] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-blue-300 sm:text-[10px]">
              THE TEEZ JOURNEY
            </p>

            <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.02em] text-white sm:text-4xl">
              FROM YOUR FIRST GAME
              <span className="block text-slate-400">TO YOUR GOLF CAREER</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-12 w-full max-w-2xl sm:mt-16">
            {/* CENTRAL PATH */}
            <div className="absolute bottom-10 left-10 top-10 w-px bg-gradient-to-b from-blue-300/10 via-blue-300/70 to-blue-300/10 sm:left-12" />

            {journey.map((step, index) => (
              <div
                key={step.number}
                className="relative flex min-w-0 items-center gap-4 pb-9 last:pb-0 sm:gap-7 sm:pb-12"
              >
                <JourneySymbol label={step.icon} number={step.number} />

                <div className="min-w-0 flex-1 rounded-2xl border border-blue-300/15 bg-white/[0.035] px-4 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:px-6 sm:py-6">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-blue-300/70">
                        STEP {step.number}
                      </p>

                      <h3 className="mt-1 break-words text-sm font-black uppercase leading-tight tracking-[0.03em] text-white sm:text-xl">
                        {step.title}
                      </h3>
                    </div>

                    {index < journey.length - 1 && (
                      <span className="shrink-0 text-lg font-light text-blue-300/50">
                        ↓
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY PLAY
      ========================================================= */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300 sm:text-[10px]">
              THE IMPORTANT PART
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-[-0.03em] sm:text-5xl">
              WHY SHOULD
              <span className="block text-blue-300">I PLAY?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Because every time you participate, you are building something.
            </p>
          </div>

          {/* REWARD FLOW */}
          <div className="mx-auto mt-12 flex w-full max-w-md flex-col items-center">
            <div className="w-full rounded-2xl border border-blue-300/30 bg-blue-500/10 px-5 py-5 text-center shadow-[0_0_30px_rgba(0,170,255,0.12)]">
              <p className="text-[9px] font-black tracking-[0.24em] text-blue-300">
                START HERE
              </p>
              <p className="mt-1 text-xl font-black uppercase">PLAY REAL GOLF</p>
            </div>

            <div className="h-9 w-px bg-blue-300/50" />
            <div className="mb-1 text-lg text-blue-300">↓</div>

            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-center">
              <p className="text-sm font-black uppercase">
                EARN CAREER PROGRESS
              </p>
            </div>

            <div className="h-9 w-px bg-blue-300/50" />
            <div className="mb-1 text-lg text-blue-300">↓</div>

            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-center">
              <p className="text-sm font-black uppercase">BUILD YOUR CAREER</p>
            </div>

            <div className="h-9 w-px bg-blue-300/50" />
            <div className="mb-1 text-lg text-blue-300">↓</div>

            <div className="w-full rounded-2xl border border-blue-300/50 bg-[#071b38] px-5 py-6 text-center shadow-[0_0_32px_rgba(0,170,255,0.22)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-300 bg-blue-400/10 shadow-[0_0_25px_rgba(0,170,255,0.55)]">
                <span className="text-xl font-black text-blue-200">B</span>
              </div>

              <p className="mt-3 text-lg font-black uppercase text-blue-200">
                UNLOCK BONUS BALLS
              </p>
            </div>

            <div className="h-10 w-px bg-blue-300/50" />
            <div className="mb-1 text-lg text-blue-300">↓</div>

            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-slate-500">
              UNLOCK MORE
            </p>
          </div>

          {/* REWARD CATEGORIES */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {rewards.map((reward) => (
              <div
                key={reward.number}
                className="min-w-0 rounded-2xl border border-blue-300/20 bg-gradient-to-b from-blue-500/[0.08] to-white/[0.02] p-5 text-center sm:p-7"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-blue-300/50 bg-[#061329] shadow-[0_0_22px_rgba(0,170,255,0.22)]">
                  <span className="text-lg font-black text-blue-200">
                    {reward.symbol}
                  </span>
                </div>

                <p className="mt-5 text-[8px] font-black tracking-[0.22em] text-blue-300/60">
                  REWARD {reward.number}
                </p>

                <h3 className="mt-2 text-base font-black uppercase text-white">
                  {reward.title}
                </h3>

                <p className="mt-3 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                  {reward.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CAREER MESSAGE
      ========================================================= */}
      <section className="border-y border-blue-300/15 bg-gradient-to-b from-[#06152d] to-[#020817] px-5 py-16 text-center sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-blue-300">
            YOUR GOLF HAS PURPOSE
          </p>

          <h2 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            THE MORE YOU PLAY.
            <span className="mt-2 block text-blue-300">
              THE MORE YOU BUILD.
            </span>
            <span className="mt-2 block text-white">
              THE MORE YOU UNLOCK.
            </span>
          </h2>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-2 sm:gap-4">
            {[
              ["PLAY", "01"],
              ["BUILD", "02"],
              ["UNLOCK", "03"],
            ].map(([label, number]) => (
              <div
                key={label}
                className="min-w-0 border border-white/10 bg-white/[0.03] px-2 py-4 sm:px-4 sm:py-5"
              >
                <p className="text-[8px] font-black text-blue-300/60">
                  {number}
                </p>
                <p className="mt-1 break-words text-[10px] font-black tracking-[0.06em] text-white sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-5 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-xl">
          <img
            src="/transparent.png"
            alt="TEEZ Golf Challenges"
            className="mx-auto h-auto w-full max-w-[130px] object-contain"
          />

          <h2 className="mt-6 text-2xl font-black uppercase sm:text-4xl">
            BUILD YOUR GOLF CAREER.
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            Join. Play. Compete. Progress.
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => router.push("/main")}
              className="min-w-0 w-full rounded-full border border-white/20 px-5 py-4 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:border-blue-300 hover:text-blue-300"
            >
              RETURN TO MAIN
            </button>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="min-w-0 w-full rounded-full border border-blue-300 bg-blue-500/15 px-5 py-4 text-xs font-black uppercase tracking-[0.1em] text-white shadow-[0_0_22px_rgba(0,170,255,0.3)] transition hover:bg-blue-500/25"
            >
              JOIN TEEZ
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}