"use client";

import { useRouter } from "next/navigation";

export default function HowCareerWorksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-cyan-400/30 bg-[#030608]/95 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.05] text-2xl font-black text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.15)]"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="flex flex-col items-center">
              <img
                src="/teez-app-icon-v4.png"
                alt="TEEZ Golf Challenges"
                className="h-16 w-16 object-contain drop-shadow-[0_0_14px_rgba(0,174,255,0.75)]"
              />

              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.30em] text-cyan-400">
                TEEZ Career System
              </p>

              <h1 className="text-lg font-black tracking-[0.06em] text-white">
                HOW MY CAREER WORKS
              </h1>
            </div>

            <div className="h-10 w-10" />

          </div>
        </header>


        <div className="space-y-8 px-4 pt-5">

          {/* HERO */}

          <section className="relative overflow-hidden border border-cyan-400/30 bg-[#071017] shadow-[0_0_35px_rgba(34,211,238,0.10)]">

            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative px-5 py-7 text-center">

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-cyan-400">
                Your TEEZ Journey
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                BUILD YOUR
                <br />
                GOLF CAREER.
              </h2>

              <p className="mx-auto mt-3 max-w-[300px] text-sm leading-5 text-slate-400">
                Play challenges. Beat players. Earn points.
                Climb the rankings. Build your career.
              </p>

            </div>

          </section>


          {/* 1 — PLAY */}

          <section>

            <SectionHeading
              number="01"
              eyebrow="START HERE"
              title="Play Challenges"
              description="Every completed TEEZ Challenge contributes to your competitive career."
            />

            <FlowCard>
              <FlowItem
                label="PLAY"
                text="Enter a Challenge"
              />

              <FlowArrow />

              <FlowItem
                label="COMPETE"
                text="Take on the field"
              />

              <FlowArrow />

              <FlowItem
                label="FINISH"
                text="Record your result"
              />
            </FlowCard>

          </section>


          {/* 2 — COMPETITION SCORE */}

          <section>

            <SectionHeading
              number="02"
              eyebrow="CHALLENGE VALUE"
              title="How Your Points Are Built"
              description="Three things determine the competitive value of your result."
            />

            <div className="border border-cyan-400/30 bg-[#071017] p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">

              <FactorCard
                number="1"
                title="FINISH POSITION"
                text="Finish higher"
              />

              <MathSymbol symbol="×" />

              <FactorCard
                number="2"
                title="TOKENS PLAYED"
                text="Play for more"
              />

              <MathSymbol symbol="×" />

              <FactorCard
                number="3"
                title="FIELD SIZE"
                text="Compete against more players"
              />

              <div className="my-4 flex justify-center">
                <div className="h-7 w-px bg-cyan-400/40" />
              </div>

              <div className="border border-cyan-300/50 bg-cyan-400/[0.08] px-4 py-5 text-center shadow-[0_0_24px_rgba(34,211,238,0.10)]">

                <p className="text-[9px] font-black uppercase tracking-[0.20em] text-cyan-400">
                  Result
                </p>

                <p className="mt-1 text-2xl font-black text-white">
                  COMPETITION SCORE
                </p>

              </div>

              <p className="mt-4 text-center text-xs font-bold leading-5 text-slate-400">
                Finish higher. Play for more. Beat bigger fields.
                Earn more.
              </p>

            </div>

          </section>


          {/* 3 — CAREER ENGINE */}

          <section>

            <SectionHeading
              number="03"
              eyebrow="CAREER ENGINE"
              title="One Score Builds Your Career"
              description="Your Competition Score drives your TEEZ career progression."
            />

            <div className="border border-cyan-400/30 bg-[#071017] p-5">

              <div className="border border-cyan-400/40 bg-cyan-400/[0.07] px-4 py-4 text-center">

                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-400">
                  Your Challenge Result
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  COMPETITION SCORE
                </p>

              </div>

              <div className="mx-auto h-7 w-px bg-cyan-400/30" />

              <div className="grid grid-cols-2 gap-2">

                <CareerOutput
                  title="Career Points"
                  text="Build your career total"
                />

                <CareerOutput
                  title="Career XP"
                  text="Develop your player"
                />

                <CareerOutput
                  title="Power Score"
                  text="Grow your rating"
                />

                <CareerOutput
                  title="Rankings"
                  text="Climb the standings"
                />

              </div>

              <div className="mx-auto h-7 w-px bg-amber-400/30" />

              <div className="border border-amber-400/30 bg-amber-400/[0.06] px-4 py-3 text-center">

                <p className="text-sm font-black text-amber-300">
                  RACE TO FINAL POINTS
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  Build your season championship position
                </p>

              </div>

            </div>

          </section>


          {/* 4 — RANKINGS */}

          <section>

            <SectionHeading
              number="04"
              eyebrow="OFFICIAL STANDINGS"
              title="Climb the Rankings"
              description="Build your reputation from your golf club to the global leaderboard."
            />

            <div className="overflow-hidden border border-cyan-400/30 bg-[#071017]">

              <RankingStep
                level="GLOBAL"
                percentage="20%"
                featured
              />

              <RankingArrow />

              <RankingStep
                level="NATIONAL"
                percentage="40%"
              />

              <RankingArrow />

              <RankingStep
                level="PROVINCE"
                percentage="70%"
              />

              <RankingArrow />

              <RankingStep
                level="CLUB"
                percentage="100%"
              />

              <div className="border-t border-white/10 px-5 py-4 text-center">
                <p className="text-xs font-bold text-slate-400">
                  Keep earning points to climb every leaderboard.
                </p>
              </div>

            </div>

          </section>


          {/* 5 — PLAYER PROFILE */}

          <section>

            <SectionHeading
              number="05"
              eyebrow="PLAYER DEVELOPMENT"
              title="Build Your Player"
              description="Every result adds another piece to your competitive profile."
            />

            <div className="grid grid-cols-2 gap-2">

              <StatCard
                title="WINS"
                text="Build your record"
              />

              <StatCard
                title="WIN %"
                text="Track success rate"
              />

              <StatCard
                title="STREAKS"
                text="Build momentum"
              />

              <StatCard
                title="CAREER XP"
                text="Develop your player"
              />

              <StatCard
                title="PLAYER LEVEL"
                text="Level up"
              />

              <StatCard
                title="POWER SCORE"
                text="Grow your rating"
              />

              <StatCard
                title="BEST FINISH"
                text="Track top results"
              />

              <StatCard
                title="BEST FORMAT"
                text="Find your strength"
              />

            </div>

          </section>


          {/* 6 — BOOSTER BOARD */}

          <section>

            <SectionHeading
              number="06"
              eyebrow="GAME BOOSTERS"
              title="Play. Earn. Open."
              description="Your activity on TEEZ builds progress toward mystery Booster Balls."
            />

            <div className="relative overflow-hidden border border-cyan-400/30 bg-[#071017] p-5 shadow-[0_0_34px_rgba(34,211,238,0.08)]">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">

                <div className="flex justify-center">
                  <BoosterBall />
                </div>

                <p className="mt-4 text-center text-[9px] font-black uppercase tracking-[0.22em] text-cyan-400">
                  Game Booster Board
                </p>

                <p className="mt-1 text-center text-2xl font-black text-white">
                  200 MYSTERY BALLS
                </p>

                <p className="mt-1 text-center text-xs font-bold text-slate-400">
                  Career Boosters + Reward Boosters
                </p>


                <div className="my-5 border-t border-white/10" />


                <MiniFlow label="PLAY" />

                <FlowDown />

                <MiniFlow label="EARN BOOSTER POINTS" />

                <FlowDown />

                <MiniFlow label="EARN A BOOSTER BALL" />

                <FlowDown />

                <MiniFlow label="CHOOSE A BALL" />

                <FlowDown />

                <MiniFlow label="REVEAL YOUR BOOSTER" />


                <div className="mt-5 grid grid-cols-2 gap-2">

                  <BoosterWeight
                    value="35%"
                    title="Tokens Played"
                  />

                  <BoosterWeight
                    value="30%"
                    title="Tokens Won"
                  />

                  <BoosterWeight
                    value="25%"
                    title="Participation"
                  />

                  <BoosterWeight
                    value="10%"
                    title="Achievements"
                  />

                </div>

              </div>

            </div>

          </section>


          {/* 7 — RACE TO FINAL */}

          <section>

            <SectionHeading
              number="07"
              eyebrow="SEASON CHAMPIONSHIP"
              title="Race to the Final"
              description="Every season has a destination."
              amber
            />

            <div className="relative overflow-hidden border border-amber-400/50 bg-[#100c04] p-5 shadow-[0_0_30px_rgba(251,191,36,0.10)]">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative">

                <RaceStep text="PLAY CHALLENGES" />

                <RaceArrow />

                <RaceStep text="EARN RACE POINTS" />

                <RaceArrow />

                <RaceStep text="CLIMB THE STANDINGS" />

                <RaceArrow />

                <div className="border border-amber-400/50 bg-amber-400/[0.08] px-4 py-4 text-center">

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
                    Qualification
                  </p>

                  <p className="mt-1 text-2xl font-black text-white">
                    TOP 8 + TIES
                  </p>

                </div>

                <RaceArrow />

                <div className="border border-amber-300/60 bg-amber-300 px-4 py-5 text-center shadow-[0_0_25px_rgba(251,191,36,0.20)]">

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-950/70">
                    Destination
                  </p>

                  <p className="mt-1 text-xl font-black text-[#160f02]">
                    TEEZ CHAMPIONSHIP FINAL
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* FINAL MESSAGE */}

          <section className="relative overflow-hidden border border-cyan-400/30 bg-[#071017] px-5 py-8 text-center shadow-[0_0_35px_rgba(34,211,238,0.08)]">

            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">

              <img
                src="/teez-app-icon-v4.png"
                alt="TEEZ Golf Challenges"
                className="mx-auto h-20 w-20 object-contain drop-shadow-[0_0_18px_rgba(0,174,255,0.75)]"
              />

              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.26em] text-cyan-400">
                TEEZ Golf Challenges
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                BUILD YOUR GOLF CAREER.
              </h2>

              <p className="mx-auto mt-3 max-w-[300px] text-sm leading-5 text-slate-400">
                Every challenge. Every result. Every point.
                Every booster.
              </p>

              <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-cyan-300">
                It all counts.
              </p>

            </div>

          </section>

        </div>
      </div>
    </main>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  amber = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  amber?: boolean;
}) {
  return (
    <div className="mb-4">

      <div className="mb-3 flex items-center gap-3">

        <div
          className={`flex h-8 w-8 items-center justify-center border text-[10px] font-black ${
            amber
              ? "border-amber-400/40 bg-amber-400/[0.07] text-amber-300"
              : "border-cyan-400/40 bg-cyan-400/[0.07] text-cyan-300"
          }`}
        >
          {number}
        </div>

        <div>

          <p
            className={`text-[9px] font-black uppercase tracking-[0.24em] ${
              amber
                ? "text-amber-400"
                : "text-cyan-400"
            }`}
          >
            {eyebrow}
          </p>

          <div
            className={`mt-1 h-[2px] w-8 ${
              amber
                ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
            }`}
          />

        </div>

      </div>

      <h2 className="text-xl font-black tracking-tight text-white">
        {title}
      </h2>

      <p className="mt-1.5 text-sm leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   BASIC FLOW
========================================================= */

function FlowCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-stretch border border-cyan-400/30 bg-[#071017] p-3">
      {children}
    </div>
  );
}

function FlowItem({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="min-w-0 flex-1 text-center">

      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/[0.07]">

        <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

      </div>

      <p className="mt-2 text-[10px] font-black text-white">
        {label}
      </p>

      <p className="mt-1 text-[8px] leading-3 text-slate-500">
        {text}
      </p>

    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex w-7 shrink-0 items-center justify-center text-lg font-black text-cyan-400">
      →
    </div>
  );
}


/* =========================================================
   COMPETITION SCORE
========================================================= */

function FactorCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 border border-white/10 bg-black/20 px-4 py-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.06] text-sm font-black text-cyan-300">
        {number}
      </div>

      <div>

        <p className="text-xs font-black text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}

function MathSymbol({
  symbol,
}: {
  symbol: string;
}) {
  return (
    <div className="py-2 text-center text-xl font-black text-cyan-400">
      {symbol}
    </div>
  );
}


/* =========================================================
   CAREER OUTPUTS
========================================================= */

function CareerOutput({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-cyan-400/20 bg-cyan-400/[0.04] px-3 py-4 text-center">

      <p className="text-xs font-black text-cyan-300">
        {title}
      </p>

      <p className="mt-1 text-[9px] leading-4 text-slate-500">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   RANKINGS
========================================================= */

function RankingStep({
  level,
  percentage,
  featured = false,
}: {
  level: string;
  percentage: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 ${
        featured
          ? "bg-cyan-400/[0.08]"
          : ""
      }`}
    >

      <div>

        <p
          className={`text-sm font-black ${
            featured
              ? "text-cyan-300"
              : "text-white"
          }`}
        >
          {level}
        </p>

        <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-slate-500">
          Ranking Points
        </p>

      </div>

      <p
        className={`text-xl font-black ${
          featured
            ? "text-cyan-300"
            : "text-white"
        }`}
      >
        {percentage}
      </p>

    </div>
  );
}

function RankingArrow() {
  return (
    <div className="border-y border-white/[0.05] py-1 text-center text-sm font-black text-cyan-400/50">
      ↑
    </div>
  );
}


/* =========================================================
   PLAYER STATS
========================================================= */

function StatCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-cyan-400/20 bg-[#071017] px-3 py-4">

      <p className="text-[10px] font-black text-cyan-300">
        {title}
      </p>

      <p className="mt-1 text-[9px] leading-4 text-slate-500">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   BOOSTER BOARD
========================================================= */

function BoosterBall() {
  return (
    <div className="relative h-20 w-20 rounded-full border-2 border-cyan-300/70 bg-white shadow-[0_0_24px_rgba(34,211,238,0.25)]">

      <div className="absolute inset-[5px] rounded-full border border-slate-300 bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d7e0e3)]" />

      <div className="absolute left-[26%] top-[25%] h-[7%] w-[7%] rounded-full bg-slate-300/70" />
      <div className="absolute right-[24%] top-[32%] h-[6%] w-[6%] rounded-full bg-slate-300/70" />
      <div className="absolute bottom-[26%] left-[35%] h-[6%] w-[6%] rounded-full bg-slate-300/70" />

      <span className="absolute inset-0 z-10 flex items-center justify-center text-[9px] font-black tracking-[0.08em] text-[#07110d]">
        TEEZ
      </span>

    </div>
  );
}

function MiniFlow({
  label,
}: {
  label: string;
}) {
  return (
    <div className="border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-3 text-center">

      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white">
        {label}
      </p>

    </div>
  );
}

function FlowDown() {
  return (
    <div className="py-1 text-center text-base font-black text-cyan-400">
      ↓
    </div>
  );
}

function BoosterWeight({
  value,
  title,
}: {
  value: string;
  title: string;
}) {
  return (
    <div className="border border-cyan-400/20 bg-cyan-400/[0.05] px-2 py-3 text-center">

      <p className="text-lg font-black text-cyan-300">
        {value}
      </p>

      <p className="mt-1 text-[8px] font-black uppercase tracking-[0.08em] text-slate-500">
        {title}
      </p>

    </div>
  );
}


/* =========================================================
   RACE TO FINAL
========================================================= */

function RaceStep({
  text,
}: {
  text: string;
}) {
  return (
    <div className="border border-amber-400/20 bg-amber-400/[0.04] px-4 py-3 text-center">

      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white">
        {text}
      </p>

    </div>
  );
}

function RaceArrow() {
  return (
    <div className="py-1 text-center text-base font-black text-amber-400">
      ↓
    </div>
  );
}