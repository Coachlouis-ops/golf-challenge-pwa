"use client";

import { useRouter } from "next/navigation";

const TOTAL_BOOSTERS = 100;
const CAREER_BOOSTERS = 75;
const REWARD_BOOSTERS = 25;

export default function GameBoosterBoardPage() {
  const router = useRouter();

  // Temporary until the Booster backend is connected.
  const boosterBallsEarned = 0;
  const boosterBallsOpened = 0;
  const boosterProgress = 0;

  const boardProgress =
    (boosterBallsOpened / TOTAL_BOOSTERS) * 100;

  const boardCleared =
    boosterBallsOpened >= TOTAL_BOOSTERS;

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-emerald-400/30 bg-[#030608]/95 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center border border-emerald-400/30 bg-emerald-400/[0.05] text-2xl font-black text-emerald-300"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="flex flex-col items-center">

              <img
                src="/teez-app-icon-v4.png"
                alt="TEEZ Golf Challenges"
                className="h-14 w-14 object-contain drop-shadow-[0_0_14px_rgba(52,211,153,0.65)]"
              />

              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.30em] text-emerald-400">
                TEEZ Player Boosters
              </p>

              <h1 className="text-lg font-black tracking-[0.06em] text-white">
                GAME BOOSTER BOARD
              </h1>

            </div>

            <div className="h-10 w-10" />

          </div>
        </header>


        <div className="space-y-7 px-4 pt-5">

          {/* HERO */}

          <section className="relative overflow-hidden border border-emerald-400/40 bg-[#06110d] shadow-[0_0_38px_rgba(52,211,153,0.12)]">

            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-cyan-400/[0.06] blur-3xl" />

            <div className="relative p-5">

              <div className="flex items-center gap-4">

                <BoosterBall size="large" />

                <div className="min-w-0 flex-1">

                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-emerald-300">
                    Mystery Booster System
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
                    100 Booster Balls
                  </h2>

                  <p className="mt-2 text-sm leading-5 text-slate-400">
                    Earn Booster Balls through commitment,
                    activity and performance.
                  </p>

                </div>

              </div>

              <div className="mt-5 border-t border-emerald-400/15 pt-4">

                <p className="text-center text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  Give Your Game the Edge via Mystery Boosters
                </p>

              </div>

            </div>

          </section>


          {/* BOARD SUMMARY */}

          <section>

            <SectionHeading
              eyebrow="YOUR BOARD"
              title="Booster Board Progress"
              description="Clear all 100 Booster Balls to complete your Game Booster Board"
            />

            <div className="overflow-hidden border border-cyan-400/30 bg-[#071017] shadow-[0_0_30px_rgba(34,211,238,0.08)]">

              <div className="grid grid-cols-3 divide-x divide-white/10">

                <SummaryTile
                  title="Total"
                  value={TOTAL_BOOSTERS}
                  colour="text-white"
                />

                <SummaryTile
                  title="Career"
                  value={CAREER_BOOSTERS}
                  colour="text-cyan-300"
                />

                <SummaryTile
                  title="Rewards"
                  value={REWARD_BOOSTERS}
                  colour="text-amber-300"
                />

              </div>

              <div className="border-t border-white/10 p-5">

                <div className="flex items-center justify-between">

                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Board Cleared
                  </p>

                  <p className="text-sm font-black text-emerald-300">
                    {boosterBallsOpened} / {TOTAL_BOOSTERS}
                  </p>

                </div>

                <div className="mt-3 h-3 overflow-hidden bg-slate-800">

                  <div
                    className="h-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                    style={{
                      width: `${Math.min(
                        100,
                        boardProgress
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </section>


          {/* BOOSTER PROGRESS */}

          <section>

            <SectionHeading
              eyebrow="EARN YOUR NEXT BALL"
              title="Booster Progress"
              description="Commitment + Activity + Performance build your Booster Progress"
            />

            <div className="relative overflow-hidden border border-violet-400/40 bg-[#0a0711] p-5 shadow-[0_0_30px_rgba(167,139,250,0.10)]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-violet-300">
                    Current Progress
                  </p>

                  <p className="mt-1 text-3xl font-black text-white">
                    {boosterProgress}%
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                    Balls Available
                  </p>

                  <p className="mt-1 text-3xl font-black text-emerald-300">
                    {boosterBallsEarned}
                  </p>

                </div>

              </div>

              <div className="mt-5 h-3 overflow-hidden bg-slate-800">

                <div
                  className="h-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.7)]"
                  style={{
                    width: `${Math.min(
                      100,
                      boosterProgress
                    )}%`,
                  }}
                />

              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">

                <WeightTile
                  title="Commitment"
                  value="30%"
                />

                <WeightTile
                  title="Activity"
                  value="40%"
                />

                <WeightTile
                  title="Performance"
                  value="30%"
                />

              </div>

            </div>

          </section>


          {/* BOOSTER BALL BOARD */}

          <section>

            <SectionHeading
              eyebrow="MYSTERY BOARD"
              title="Choose Your Booster Ball"
              description="Earn a Booster Ball, then choose an available position to reveal your mystery Booster"
            />

            <div className="border border-emerald-400/30 bg-[#050d0a] p-4 shadow-[0_0_34px_rgba(52,211,153,0.08)]">

              <div className="grid grid-cols-5 gap-3">

                {Array.from(
                  { length: TOTAL_BOOSTERS },
                  (_, index) => (
                    <BoosterPosition
                      key={index}
                      number={index + 1}
                      available={
                        boosterBallsEarned > 0
                      }
                    />
                  )
                )}

              </div>

            </div>

          </section>


          {/* RACE TO FINAL */}

          <section>

            <SectionHeading
              eyebrow="CHAMPIONSHIP ELIGIBILITY"
              title="Race to the Final"
              description="The Game Booster Board forms part of your qualification for the Final"
            />

            <div
              className={`border p-5 ${
                boardCleared
                  ? "border-emerald-400/60 bg-emerald-400/[0.07]"
                  : "border-amber-400/50 bg-[#100c04]"
              }`}
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Booster Board Requirement
                  </p>

                  <p
                    className={`mt-1 text-xl font-black ${
                      boardCleared
                        ? "text-emerald-300"
                        : "text-amber-300"
                    }`}
                  >
                    {boardCleared
                      ? "BOARD CLEARED"
                      : `${boosterBallsOpened} / 100 CLEARED`}
                  </p>

                </div>

                <div
                  className={`border px-3 py-2 text-[9px] font-black uppercase tracking-[0.10em] ${
                    boardCleared
                      ? "border-emerald-400/40 text-emerald-300"
                      : "border-amber-400/40 text-amber-300"
                  }`}
                >
                  {boardCleared
                    ? "ELIGIBLE"
                    : "IN PROGRESS"}
                </div>

              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                A player must clear all 100 Booster Balls
                and finish inside the qualifying Race to
                the Final positions to qualify for the Final.
              </p>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}


function BoosterBall({
  size = "small",
}: {
  size?: "small" | "large";
}) {
  return (
    <div
      className={`relative shrink-0 rounded-full border-2 border-emerald-300/70 bg-white shadow-[0_0_22px_rgba(52,211,153,0.24)] ${
        size === "large"
          ? "h-20 w-20"
          : "h-12 w-12"
      }`}
    >

      <div className="absolute inset-[5px] rounded-full border border-slate-300 bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d7e0e3)]" />

      <div className="absolute left-[26%] top-[25%] h-[7%] w-[7%] rounded-full bg-slate-300/70" />
      <div className="absolute right-[24%] top-[32%] h-[6%] w-[6%] rounded-full bg-slate-300/70" />
      <div className="absolute bottom-[26%] left-[35%] h-[6%] w-[6%] rounded-full bg-slate-300/70" />

      {size === "large" && (
        <span className="absolute inset-0 z-10 flex items-center justify-center text-[9px] font-black tracking-[0.08em] text-[#07110d]">
          TEEZ
        </span>
      )}

    </div>
  );
}


function BoosterPosition({
  number,
  available,
}: {
  number: number;
  available: boolean;
}) {
  return (
    <button
      type="button"
      disabled={!available}
      className={`relative aspect-square rounded-full border transition ${
        available
          ? "border-emerald-300/70 bg-white shadow-[0_0_12px_rgba(52,211,153,0.22)] active:scale-95"
          : "cursor-default border-slate-600 bg-slate-300 opacity-55"
      }`}
    >

      <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#cfd8dc)]" />

      <span className="absolute inset-0 z-10 flex items-center justify-center text-[8px] font-black text-slate-700">
        {number}
      </span>

    </button>
  );
}


function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">

      <div className="mb-3 flex items-center gap-3">

        <div className="h-[2px] w-8 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

        <p className="text-[9px] font-black uppercase tracking-[0.24em] text-emerald-400">
          {eyebrow}
        </p>

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


function SummaryTile({
  title,
  value,
  colour,
}: {
  title: string;
  value: number;
  colour: string;
}) {
  return (
    <div className="px-3 py-4 text-center">

      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
        {title}
      </p>

      <p
        className={`mt-1 text-2xl font-black ${colour}`}
      >
        {value}
      </p>

    </div>
  );
}


function WeightTile({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border border-violet-400/20 bg-violet-400/[0.05] px-2 py-3 text-center">

      <p className="text-lg font-black text-violet-300">
        {value}
      </p>

      <p className="mt-1 text-[8px] font-black uppercase tracking-[0.08em] text-slate-500">
        {title}
      </p>

    </div>
  );
}