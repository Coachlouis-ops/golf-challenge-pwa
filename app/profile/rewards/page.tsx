"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import {
  getFunctions,
  httpsCallable,
} from "firebase/functions";

import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";

const TOTAL_BOOSTERS = 200;
const CAREER_BOOSTERS = 150;
const REWARD_BOOSTERS = 50;

export default function GameBoosterBoardPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Temporary until the Booster backend is connected.
  const [boosterBallsEarned, setBoosterBallsEarned] =
  useState(0);

const [boosterBallsOpened, setBoosterBallsOpened] =
  useState(0);

const [openedPositions, setOpenedPositions] =
  useState<number[]>([]);

const [boosterProgress, setBoosterProgress] =
  useState(0);

const [openingBall, setOpeningBall] =
  useState<number | null>(null);

const [revealedBall, setRevealedBall] =
  useState<{
    number: number;
    type: "career" | "reward";
  } | null>(null);

const [openError, setOpenError] =
  useState("");

useEffect(() => {
  if (!user) return;

  const uid = user.uid;

  async function loadBoosterBoard() {
    try {
      const boosterRef = doc(
        db,
        "boosterBoards",
        "2026",
       "players",
uid
      );

      const boosterSnap =
        await getDoc(boosterRef);

      if (!boosterSnap.exists()) {
        return;
      }

      const data = boosterSnap.data();

      const earned = Number(
        data.boosterBallsEarned ?? 0
      );

      const opened = Number(
        data.boosterBallsOpened ?? 0
      );

      const totalPoints = Number(
        data.totalBoosterPoints ?? 0
      );

      setBoosterBallsEarned(
        Math.max(0, earned - opened)
      );

      setBoosterBallsOpened(opened);

const positions = Array.isArray(
  data.openedPositions
)
  ? data.openedPositions.map(
      (position: unknown) =>
        Number(position)
    )
  : [];

setOpenedPositions(
  positions.filter(
    (position: number) =>
      Number.isInteger(position) &&
      position >= 1 &&
      position <= TOTAL_BOOSTERS
  )
);

setBoosterProgress(
        Math.min(
          100,
          (totalPoints % 1000) / 10
        )
      );
    } catch (error) {
      console.error(
        "Unable to load Booster Board:",
        error
      );
    }
  }

  loadBoosterBoard();
}, [user]);

const boardProgress =
  (boosterBallsOpened / TOTAL_BOOSTERS) * 100;

async function handleOpenBoosterBall(
  ballNumber: number
) {
  if (
    !user ||
    boosterBallsEarned <= 0 ||
    openingBall !== null ||
    openedPositions.includes(ballNumber)
  ) {
    return;
  }

  try {
    setOpeningBall(ballNumber);
    setOpenError("");
    setRevealedBall(null);

    const functions =
      getFunctions(undefined, "europe-west1");

    const openBoosterBall =
      httpsCallable<
        { ballNumber: number },
        {
          success: boolean;
          ball: {
            ballNumber: number;
            ballType: "career" | "reward";
            boosterBallsEarned: number;
            boosterBallsOpened: number;
            boosterBallsAvailable: number;
          };
        }
      >(
        functions,
        "openBoosterBall"
      );

    const response =
      await openBoosterBall({
        ballNumber,
      });

    const result = response.data.ball;

    setOpenedPositions((current) =>
      Array.from(
        new Set([
          ...current,
          result.ballNumber,
        ])
      )
    );

    setBoosterBallsOpened(
      result.boosterBallsOpened
    );

    setBoosterBallsEarned(
      result.boosterBallsAvailable
    );

    setRevealedBall({
      number: result.ballNumber,
      type: result.ballType,
    });
  } catch (error) {
    console.error(
      "Unable to open Booster Ball:",
      error
    );

    setOpenError(
      "Unable to open this Booster Ball. Please try again."
    );
  } finally {
    setOpeningBall(null);
  }
}

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
                TEEZ Player Boosters
              </p>

              <h1 className="text-lg font-black tracking-[0.06em] text-white">
                GAME BOOSTER BOARD
              </h1>

            </div>

            <div className="h-10 w-10" />

          </div>
        </header>


    <div className="space-y-8 px-4 pt-5">

          {/* HERO */}

          <section className="relative overflow-hidden border border-cyan-400/30 bg-[#071017] shadow-[0_0_35px_rgba(34,211,238,0.10)]">

           <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-cyan-400/[0.06] blur-3xl" />

            <div className="relative p-5">

              <div className="flex items-center gap-4">

                <BoosterBall size="large" />

                <div className="min-w-0 flex-1">

                 <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-400">
  Mystery Booster System
</p>
                 <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
  200 Booster Balls
</h2>

<p className="mt-2 text-sm leading-5 text-slate-400">
  Earn Booster Balls through tokens played,
  tokens won, participation and achievements.
</p>

                </div>

              </div>

             <div className="mt-5 border-t border-cyan-400/15 pt-4">

               <p className="text-center text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
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
              description="Progress through 200 mystery Booster Balls during your season"
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

                  <p className="text-sm font-black text-cyan-300">
  {boosterBallsOpened} / {TOTAL_BOOSTERS}
</p>

                </div>

                <div className="mt-3 h-3 overflow-hidden bg-slate-800">

                 <div
  className="h-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
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
  description="Tokens Played + Tokens Won + Participation + Achievements build your Booster Progress"
/>

           <div className="relative overflow-hidden border border-cyan-400/30 bg-[#071017] p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">

              <div className="flex items-center justify-between">

                <div>

                 <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">
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

                  <p className="mt-1 text-3xl font-black text-cyan-300">
  {boosterBallsEarned}
</p>

                </div>

              </div>

              <div className="mt-5 h-3 overflow-hidden bg-slate-800">

                <div
                  className="h-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                  style={{
                    width: `${Math.min(
                      100,
                      boosterProgress
                    )}%`,
                  }}
                />

              </div>

            <div className="mt-5 grid grid-cols-2 gap-2">

  <WeightTile
    title="Tokens Played"
    value="35%"
  />

  <WeightTile
    title="Tokens Won"
    value="30%"
  />

  <WeightTile
    title="Participation"
    value="25%"
  />

  <WeightTile
    title="Achievements"
    value="10%"
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

           <div className="border border-cyan-400/30 bg-[#071017] p-3 shadow-[0_0_34px_rgba(34,211,238,0.08)]">

  <div className="mb-3 flex items-center justify-between">
    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-500">
      20 ROWS × 10
    </p>

    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-cyan-300">

      
      200 MYSTERY BOOSTERS
    </p>
  </div>

  {revealedBall && (
  <div
    className={`mb-4 border p-4 text-center ${
      revealedBall.type === "reward"
        ? "border-amber-400/50 bg-amber-400/[0.08]"
        : "border-cyan-400/50 bg-cyan-400/[0.08]"
    }`}
  >
    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
      Booster Ball {revealedBall.number}
    </p>

    <p
      className={`mt-1 text-xl font-black uppercase ${
        revealedBall.type === "reward"
          ? "text-amber-300"
          : "text-cyan-300"
      }`}
    >
      {revealedBall.type === "reward"
        ? "Reward Booster"
        : "Career Booster"}
    </p>
  </div>
)}

{openError && (
  <div className="mb-4 border border-red-400/40 bg-red-500/[0.08] p-3 text-center text-xs font-bold text-red-300">
    {openError}
  </div>
)}

<div className="grid grid-cols-10 gap-1">

                {Array.from(
                  { length: TOTAL_BOOSTERS },
                  (_, index) => (
<BoosterPosition
  key={index}
  number={index + 1}
  available={
    boosterBallsEarned > 0 &&
    openingBall === null &&
    !openedPositions.includes(index + 1)
  }
  opened={
    openedPositions.includes(index + 1)
  }
  opening={
    openingBall === index + 1
  }
  onOpen={() =>
    handleOpenBoosterBall(index + 1)
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
    eyebrow="CHAMPIONSHIP RACE"
    title="Race to the Final"
    description="Your Booster Board runs alongside your Race to the Final season"
  />

  <div className="relative overflow-hidden border border-amber-400/50 bg-[#100c04] p-5 shadow-[0_0_30px_rgba(251,191,36,0.10)]">

    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

    <div className="relative">

      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-300">
        Final Qualification
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        TOP 8 + TIES
      </p>

      <p className="mt-3 text-sm leading-5 text-slate-400">
        Finish inside the Race to the Final Top 8 to qualify
        for the season Final. Players tied for the final
        qualifying position also advance.
      </p>

      <div className="mt-5 border-t border-amber-400/15 pt-4">

        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
          Booster Board
        </p>

        <p className="mt-1 text-sm font-black text-cyan-300">
  {boosterBallsOpened} / {TOTAL_BOOSTERS} CLEARED
</p>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Booster Board progress does not determine Final
          qualification.
        </p>

      </div>

    </div>

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
    className={`relative shrink-0 rounded-full border-2 border-cyan-300/70 bg-white shadow-[0_0_22px_rgba(34,211,238,0.24)] ${
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
  opened,
  opening,
  onOpen,
}: {
  number: number;
  available: boolean;
  opened: boolean;
  opening: boolean;
  onOpen: () => void;
}) {
  return (
   <button
      type="button"
      onClick={onOpen}
      disabled={!available || opening}
     className={`relative aspect-square rounded-full border transition ${
  opened
    ? "cursor-default border-amber-400/60 bg-amber-300 opacity-80 shadow-[0_0_10px_rgba(251,191,36,0.25)]"
    : available
  ? "border-cyan-300/70 bg-white shadow-[0_0_12px_rgba(34,211,238,0.22)] active:scale-95"
      : "cursor-default border-slate-600 bg-slate-300 opacity-55"
}`}
    >

      <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#cfd8dc)]" />

     <span
  className={`absolute inset-0 z-10 flex items-center justify-center font-black ${
    opened
      ? "text-[10px] text-amber-900"
      : "text-[8px] text-slate-700"
  }`}
>
{opening ? "..." : opened ? "✓" : number}
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

       <div className="h-[2px] w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

<p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-400">
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