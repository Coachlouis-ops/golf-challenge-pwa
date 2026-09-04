"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

type RacePlayer = {
  uid: string;
  battleName: string;
  racePoints: number;
};

export default function RaceToParadisePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [racePoints, setRacePoints] = useState(0);
  const [globalPosition, setGlobalPosition] =
    useState<number | null>(null);
  const [leaders, setLeaders] =
    useState<RacePlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;

    async function loadRace() {
      try {
        const playerSnap = await getDoc(
          doc(db, "playerRankings", uid)
        );

        if (playerSnap.exists()) {
          setRacePoints(
            Number(
              playerSnap.data().racePoints || 0
            )
          );
        }

        const leaderboardQuery = query(
          collection(db, "playerRankings"),
          orderBy("racePoints", "desc"),
          limit(100)
        );

        const leaderboardSnap =
          await getDocs(leaderboardQuery);

        const rows: RacePlayer[] = [];

        for (
          const rankingDoc of leaderboardSnap.docs
        ) {
          const data = rankingDoc.data();

          const profileSnap = await getDoc(
            doc(db, "profiles", rankingDoc.id)
          );

          const profileData =
            profileSnap.exists()
              ? profileSnap.data()
              : {};

          rows.push({
            uid: rankingDoc.id,

            battleName:
              profileData.battleName ||
              `${profileData.name || ""} ${
                profileData.surname || ""
              }`.trim() ||
              "TEEZ Player",

            racePoints:
              Number(data.racePoints || 0),
          });
        }

        setLeaders(rows.slice(0, 8));

        const playerIndex =
          rows.findIndex(
            (player) =>
              player.uid === uid
          );

        setGlobalPosition(
          playerIndex >= 0
            ? playerIndex + 1
            : null
        );
      } catch (error) {
        console.error(
          "Unable to load Race to the Final:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadRace();
  }, [user]);

  const qualified =
    globalPosition !== null &&
    globalPosition <= 8;

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
                TEEZ Championship Series
              </p>

              <h1 className="text-lg font-black tracking-[0.06em] text-white">
                RACE TO THE FINAL
              </h1>

            </div>

            <div className="h-10 w-10" />

          </div>

        </header>


        <div className="space-y-8 px-4 pt-5">

          {/* HERO */}

          <section className="relative overflow-hidden border border-amber-400/40 bg-[#100c04] shadow-[0_0_38px_rgba(251,191,36,0.10)]">

            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative px-5 py-7 text-center">

              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-amber-400">
                Annual Championship
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                RACE TO
                <br />
                THE FINAL
              </h2>

              <p className="mx-auto mt-3 max-w-[300px] text-sm leading-5 text-slate-400">
                Play challenges. Earn Race Points.
                Climb the standings. Qualify for
                the Final.
              </p>

              <div className="mt-5 border-t border-amber-400/20 pt-4">

                <p className="text-[9px] font-black uppercase tracking-[0.20em] text-amber-300">
                  Global Top 8 + Ties Qualify
                </p>

              </div>

            </div>

          </section>


          {/* HOW IT WORKS */}

          <section>

            <SectionHeading
              number="01"
              eyebrow="THE RACE"
              title="How It Works"
              description="Every challenge can move you closer to the TEEZ Championship Final."
            />

            <div className="border border-cyan-400/30 bg-[#071017] p-5">

              <RaceFlowStep
                number="1"
                title="PLAY"
                text="Complete TEEZ Challenges"
              />

              <FlowArrow />

              <RaceFlowStep
                number="2"
                title="EARN"
                text="Build Race Points"
              />

              <FlowArrow />

              <RaceFlowStep
                number="3"
                title="CLIMB"
                text="Move up the Global Race"
              />

              <FlowArrow />

              <RaceFlowStep
                number="4"
                title="QUALIFY"
                text="Finish inside the Top 8 + ties"
                amber
              />

              <FlowArrow amber />

              <div className="border border-amber-300/60 bg-amber-300 px-4 py-5 text-center shadow-[0_0_24px_rgba(251,191,36,0.16)]">

                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-950/60">
                  Destination
                </p>

                <p className="mt-1 text-xl font-black text-[#160f02]">
                  TEEZ CHAMPIONSHIP FINAL
                </p>

              </div>

            </div>

          </section>


          {/* YOUR RACE */}

          <section>

            <SectionHeading
              number="02"
              eyebrow="PLAYER STANDING"
              title="Your Race"
              description="See where you currently stand in the championship season."
            />

            <div className="grid grid-cols-2 gap-2">

              <StatTile
                label="Race Points"
                value={
                  loading
                    ? "..."
                    : racePoints.toLocaleString()
                }
                footer="Season total"
              />

              <StatTile
                label="Global Position"
                value={
                  loading
                    ? "..."
                    : globalPosition
                      ? `#${globalPosition}`
                      : "—"
                }
                footer="Current standing"
              />

              <StatTile
                label="Qualification"
                value="TOP 8"
                footer="+ ties at the cut"
                amber
              />

              <StatTile
                label="Status"
                value={
                  loading
                    ? "..."
                    : qualified
                      ? "QUALIFIED"
                      : "RACING"
                }
                footer={
                  qualified
                    ? "Inside the cut"
                    : "Keep climbing"
                }
                amber={qualified}
              />

            </div>

          </section>


          {/* EARNING RACE POINTS */}

          <section>

            <SectionHeading
              number="03"
              eyebrow="SCORING"
              title="Build Race Points"
              description="Your competitive results drive your Race to the Final."
            />

            <div className="border border-cyan-400/30 bg-[#071017] p-5">

              <div className="border border-cyan-400/40 bg-cyan-400/[0.07] px-4 py-4 text-center">

                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-400">
                  Challenge Result
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  COMPETITION SCORE
                </p>

              </div>

              <div className="py-2 text-center text-xl font-black text-cyan-400">
                ↓
              </div>

              <div className="grid grid-cols-3 gap-2">

                <FactorTile
                  title="FINISH"
                  text="Finish higher"
                />

                <FactorTile
                  title="TOKENS"
                  text="Play for more"
                />

                <FactorTile
                  title="FIELD"
                  text="Beat bigger fields"
                />

              </div>

              <div className="py-2 text-center text-xl font-black text-amber-400">
                ↓
              </div>

              <div className="border border-amber-400/40 bg-amber-400/[0.07] px-4 py-4 text-center">

                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
                  Season Progress
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  RACE POINTS
                </p>

              </div>

              <p className="mt-4 text-center text-xs font-bold leading-5 text-slate-400">
                Stronger challenge results build
                stronger Race totals.
              </p>

            </div>

          </section>


          {/* GLOBAL LEADERBOARD */}

          <section>

            <SectionHeading
              number="04"
              eyebrow="OFFICIAL STANDINGS"
              title="Global Race"
              description="The championship qualification zone."
            />

            <div className="overflow-hidden border border-cyan-400/30 bg-[#071017]">

              <div className="grid grid-cols-[42px_1fr_auto] border-b border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-3">

                <p className="text-[8px] font-black uppercase tracking-[0.14em] text-cyan-400">
                  Pos
                </p>

                <p className="text-[8px] font-black uppercase tracking-[0.14em] text-cyan-400">
                  Player
                </p>

                <p className="text-right text-[8px] font-black uppercase tracking-[0.14em] text-cyan-400">
                  Points
                </p>

              </div>


              {loading ? (

                <div className="px-5 py-8 text-center">

                  <p className="text-xs font-black uppercase tracking-[0.12em] text-cyan-300">
                    Loading Race...
                  </p>

                </div>

              ) : leaders.length === 0 ? (

                <div className="px-5 py-8 text-center">

                  <p className="text-sm font-black text-white">
                    No official standings yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    The Race begins when Race Points
                    are earned.
                  </p>

                </div>

              ) : (

                leaders.map(
                  (player, index) => {

                    const isCurrentPlayer =
                      player.uid === user?.uid;

                    return (
                      <div
                        key={player.uid}
                        className={`grid grid-cols-[42px_1fr_auto] items-center border-b border-white/[0.06] px-4 py-4 last:border-b-0 ${
                          isCurrentPlayer
                            ? "bg-cyan-400/[0.08]"
                            : ""
                        }`}
                      >

                        <div>

                          <span
                            className={`text-lg font-black ${
                              index < 3
                                ? "text-amber-300"
                                : "text-white"
                            }`}
                          >
                            {index + 1}
                          </span>

                        </div>


                        <div className="min-w-0 pr-3">

                          <div className="flex items-center gap-2">

                            <p
                              className={`truncate text-sm font-black ${
                                isCurrentPlayer
                                  ? "text-cyan-300"
                                  : "text-white"
                              }`}
                            >
                              {player.battleName}
                            </p>

                            {isCurrentPlayer && (

                              <span className="border border-cyan-400/30 bg-cyan-400/[0.10] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-cyan-300">
                                You
                              </span>

                            )}

                          </div>

                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.10em] text-slate-500">
                            Qualification Zone
                          </p>

                        </div>


                        <p className="text-right text-sm font-black tabular-nums text-white">
                          {player.racePoints.toLocaleString()}
                        </p>

                      </div>
                    );
                  }
                )

              )}

            </div>


            <div className="border-x border-b border-amber-400/40 bg-amber-400/[0.07] px-4 py-3 text-center">

              <p className="text-[9px] font-black uppercase tracking-[0.14em] text-amber-300">
                Championship Cut · Top 8 + Ties Qualify
              </p>

            </div>

          </section>


          {/* FINAL */}

          <section>

            <SectionHeading
              number="05"
              eyebrow="SEASON FINALE"
              title="The Final"
              description="The destination at the end of the Race."
              amber
            />

            <div className="relative overflow-hidden border border-amber-400/50 bg-[#100c04] shadow-[0_0_30px_rgba(251,191,36,0.10)]">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative p-6 text-center">

                <img
                  src="/teez-app-icon-v4.png"
                  alt="TEEZ Golf Challenges"
                  className="mx-auto h-20 w-20 object-contain drop-shadow-[0_0_18px_rgba(251,191,36,0.30)]"
                />

                <p className="mt-4 text-[9px] font-black uppercase tracking-[0.22em] text-amber-400">
                  TEEZ Championship
                </p>

                <h2 className="mt-2 text-2xl font-black text-white">
                  THE FINAL
                </h2>

                <p className="mx-auto mt-3 max-w-[290px] text-sm leading-5 text-slate-400">
                  The season&apos;s qualifying players
                  advance to the final TEEZ battle.
                </p>

                <div className="mt-5 border border-amber-400/30 bg-amber-400/[0.07] px-4 py-4">

                  <p className="text-sm font-black text-white">
                    TOP 8 + TIES
                  </p>

                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-amber-300">
                    Championship Qualifiers
                  </p>

                </div>

              </div>


              <div className="border-t border-amber-400/20 bg-black/20 px-5 py-4 text-center">

                <p className="text-sm font-black text-white">
                  Qualify. Enter the Final.
                </p>

                <p className="mt-1 text-sm font-black text-amber-300">
                  Battle for the Championship.
                </p>

              </div>

            </div>

          </section>


          {/* CLOSING */}

          <section className="border border-cyan-400/30 bg-[#071017] px-5 py-7 text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-400">
              Your Season Starts Here
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              ENTER THE BATTLE.
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Every challenge can move you closer
              to the Final.
            </p>

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
   HOW IT WORKS
========================================================= */

function RaceFlowStep({
  number,
  title,
  text,
  amber = false,
}: {
  number: string;
  title: string;
  text: string;
  amber?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 border px-4 py-3 ${
        amber
          ? "border-amber-400/30 bg-amber-400/[0.06]"
          : "border-cyan-400/20 bg-cyan-400/[0.04]"
      }`}
    >

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center border text-xs font-black ${
          amber
            ? "border-amber-400/40 text-amber-300"
            : "border-cyan-400/30 text-cyan-300"
        }`}
      >
        {number}
      </div>

      <div>

        <p
          className={`text-xs font-black ${
            amber
              ? "text-amber-300"
              : "text-white"
          }`}
        >
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}

function FlowArrow({
  amber = false,
}: {
  amber?: boolean;
}) {
  return (
    <div
      className={`py-1 text-center text-lg font-black ${
        amber
          ? "text-amber-400"
          : "text-cyan-400"
      }`}
    >
      ↓
    </div>
  );
}


/* =========================================================
   PLAYER RACE
========================================================= */

function StatTile({
  label,
  value,
  footer,
  amber = false,
}: {
  label: string;
  value: string;
  footer: string;
  amber?: boolean;
}) {
  return (
    <div
      className={`border p-4 ${
        amber
          ? "border-amber-400/30 bg-amber-400/[0.05]"
          : "border-cyan-400/20 bg-[#071017]"
      }`}
    >

      <p
        className={`text-[8px] font-black uppercase tracking-[0.14em] ${
          amber
            ? "text-amber-400"
            : "text-cyan-400"
        }`}
      >
        {label}
      </p>

      <p
        className={`mt-2 break-words text-2xl font-black ${
          amber
            ? "text-amber-300"
            : "text-white"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-[9px] text-slate-500">
        {footer}
      </p>

    </div>
  );
}


/* =========================================================
   RACE FACTORS
========================================================= */

function FactorTile({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-cyan-400/20 bg-cyan-400/[0.04] px-2 py-3 text-center">

      <p className="text-[9px] font-black text-cyan-300">
        {title}
      </p>

      <p className="mt-1 text-[8px] leading-3 text-slate-500">
        {text}
      </p>

    </div>
  );
}