"use client";

import { useRouter } from "next/navigation";
import SiteFooter from "@/src/components/SiteFooter";

const steps = [
  {
    number: "01",
    title: "REGISTER",
    text: "Register with your email address and password, confirm you are 18 or older, and accept the Platform Terms & Conditions and Privacy Policy.",
  },
  {
    number: "02",
    title: "FUND YOUR WALLET",
    text: "Fund your TEEZ wallet securely by card or instant EFT via Peach Payments. Funds stay in your wallet until you use them in a match.",
  },
  {
    number: "03",
    title: "CREATE A MATCH",
    text: "Create a match for singles, pairs, groups or corporates, invite your players and play your round.",
  },
  {
    number: "04",
    title: "SELECT AND CONFIRM THE WINNERS",
    text: "After the round, select the winners. Every player confirms the result before it is final.",
  },
  {
    number: "05",
    title: "PAYMENT GETS SETTLED AUTOMATICALLY",
    text: "Once the result is confirmed, winnings are paid into the winners' TEEZ wallets automatically.",
  },
];

function StepNumber({ number }: { number: string }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-blue-300/60 bg-[#061329] shadow-[0_0_28px_rgba(0,170,255,0.28),inset_0_0_20px_rgba(0,170,255,0.08)] sm:h-24 sm:w-24">
      <div className="absolute inset-[6px] rounded-full border border-white/10" />
      <p className="relative text-lg font-black tracking-[0.14em] text-blue-300 sm:text-xl">
        {number}
      </p>
    </div>
  );
}

const actionButtonClass =
  "h-14 w-full rounded-full border border-blue-300/80 bg-blue-500/10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_18px_rgba(0,170,255,0.65),inset_0_0_18px_rgba(0,170,255,0.12)] transition duration-300 hover:scale-[1.03] hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(0,170,255,0.95)] animate-pulse";

export default function HowTeezWorksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020817] text-white">
      <header className="sticky top-0 z-50 border-b border-blue-400/15 bg-[#020817]/95 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => router.push("/main")}
            className="min-w-0 justify-self-start rounded-full border border-white/20 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-200 transition hover:border-blue-300 hover:text-blue-300 sm:text-[10px]"
          >
            RETURN TO MAIN
          </button>

          <p className="hidden text-[9px] font-black uppercase tracking-[0.22em] text-blue-300 sm:block">
            HOW TEEZ WORKS
          </p>

          <span className="hidden sm:block" aria-hidden="true" />
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-10 pt-8 text-center sm:px-6 sm:pb-14 sm:pt-12">
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] max-w-[100vw] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[110px]" />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <img
            src="/transparent.png"
            alt="TEEZ Golf Challenges"
            className="mx-auto h-auto w-full max-w-[180px] object-contain sm:max-w-[230px]"
          />
        </div>
      </section>

      <section className="relative border-y border-blue-400/10 bg-[#030b1b] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <h1 className="text-2xl font-black uppercase tracking-[-0.02em] text-white sm:text-4xl">
              HOW TO PLAY THE GAME
            </h1>

            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Follow these steps
            </p>
          </div>

          <div className="relative mx-auto mt-12 w-full max-w-2xl sm:mt-16">
            <div className="absolute bottom-10 left-10 top-10 w-px bg-gradient-to-b from-blue-300/10 via-blue-300/70 to-blue-300/10 sm:left-12" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex min-w-0 items-center gap-4 pb-9 last:pb-0 sm:gap-7 sm:pb-12"
              >
                <StepNumber number={step.number} />

                <div className="min-w-0 flex-1 rounded-2xl border border-blue-300/15 bg-white/[0.035] px-4 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:px-6 sm:py-6">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-[0.22em] text-blue-300/70">
                        STEP {step.number}
                      </p>

                      <h2 className="mt-1 break-words text-sm font-black uppercase leading-tight tracking-[0.03em] text-white sm:text-xl">
                        {step.title}
                      </h2>
                    </div>

                    {index < steps.length - 1 && (
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

          <div className="mx-auto mt-12 flex w-full max-w-md flex-col gap-4 sm:mt-16">
            <button
              type="button"
              onClick={() => router.push("/register")}
              className={actionButtonClass}
            >
              REGISTER
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className={actionButtonClass}
            >
              LOGIN
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
