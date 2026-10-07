"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/lib/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import {
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { db } from "@/src/lib/firebase";

const TOTAL_BOOSTERS = 200;

export default function PlayerBoosterBoard() {
  const router = useRouter();

  const {
    user,
    loading,
    isSubscribed,
  } = useAuth();

  const [boosterBallsEarned, setBoosterBallsEarned] =
    useState(0);

  const [boosterBallsOpened, setBoosterBallsOpened] =
    useState(0);

  const [boosterPointsBalance, setBoosterPointsBalance] =
    useState(0);

  const [openedPositions, setOpenedPositions] =
    useState<number[]>([]);

  const [openingBall, setOpeningBall] =
    useState<number | null>(null);

  const [revealedBall, setRevealedBall] =
    useState<{
      number: number;
      type: "career" | "improve_player";
      boosterType: string;
      rewardValue: number;
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

        const pointsBalance = Number(
          data.boosterPointsBalance ?? 0
        );

        setBoosterBallsEarned(
          Math.max(0, earned - opened)
        );

        setBoosterBallsOpened(opened);

        setBoosterPointsBalance(
          Math.max(
            0,
            Math.min(1000, pointsBalance)
          )
        );

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
      } catch (error) {
        console.error(
          "Unable to load Booster Board:",
          error
        );
      }
    }

    loadBoosterBoard();
  }, [user]);

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
        getFunctions(
          undefined,
          "europe-west1"
        );

      const openBoosterBall =
        httpsCallable<
          { ballNumber: number },
          {
            success: boolean;
            ball: {
              ballNumber: number;
              ballType:
                | "career"
                | "improve_player";
              boosterType: string;
              rewardValue: number;
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
        boosterType: result.boosterType,
        rewardValue: result.rewardValue,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-sm text-center">
          <p className="text-xl font-black">
            PLAYER BOOSTER BOARD
          </p>

          <p className="mt-3 text-sm text-gray-400">
            Log in to access your Booster Board.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/login")
            }
            className="mt-6 w-full rounded-2xl border-2 border-cyan-400 bg-black px-4 py-4 text-sm font-black text-white"
          >
            LOG IN
          </button>
        </div>
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-sm text-center">
          <p className="text-xl font-black">
            PLAYER BOOSTER BOARD
          </p>

          <p className="mt-3 text-sm text-gray-400">
            Activate Participation Access to
            unlock your Booster Board.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/payment")
            }
            className="mt-6 w-full rounded-2xl border-2 border-lime-300 bg-lime-300 px-4 py-4 text-sm font-black text-black"
          >
            ACTIVATE PARTICIPATION ACCESS
          </button>

          <button
            type="button"
            onClick={() =>
              router.push("/dashboard")
            }
            className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-gray-400 underline"
          >
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  const pointsTarget = 1000;

  const pointsToNextBall =
    boosterPointsBalance === 0
      ? pointsTarget
      : Math.max(
          0,
          pointsTarget -
            boosterPointsBalance
        );

  const winningProgress =
    Math.min(
      100,
      (boosterPointsBalance /
        pointsTarget) *
        100
    );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">

      {/* BACKGROUND */}
      <div className="fixed inset-0">
        <Image
          src="/vs-energy.png"
          alt="Teez Neon Arena"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,170,255,0.17),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(140,255,0,0.14),transparent_35%),radial-gradient(circle_at_50%_75%,rgba(168,85,247,0.13),transparent_40%)]" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-md px-4 pb-12">

        {/* LOGO */}
        <div className="flex justify-center pt-5">
          <div className="relative h-[150px] w-[150px] drop-shadow-[0_0_30px_rgba(0,170,255,0.75)]">
            <Image
              src="/transparent.png"
              alt="Teez Golf Challenges"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-6 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">
            PLAY. MOVE. UNLOCK.
          </p>

          <h1 className="mt-2 text-2xl font-black uppercase text-white">
            PLAYER BOOSTER BOARD
          </h1>

          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
            EVERY ROUND MOVES YOU CLOSER
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push("/dashboard")
          }
          className="mb-5 w-full rounded-xl border border-cyan-400/50 bg-black/70 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-cyan-300"
        >
          ← BACK TO PLAYER DASHBOARD
        </button>

        {/* WINNING ROAD */}
        <section className="mb-6">
          <div className="relative overflow-hidden rounded-3xl border-2 border-lime-300/70 bg-black/90 px-5 py-6 shadow-[0_0_45px_rgba(163,230,53,0.28)]">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(163,230,53,0.14),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_45%)] pointer-events-none" />

            <div className="relative z-10">

              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-lime-300">
                  CONGRATULATIONS
                </p>

                <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-white">
                  YOU HAVE EARNED
                </p>

                <div className="mt-2 text-7xl font-black leading-none text-white drop-shadow-[0_0_24px_rgba(163,230,53,0.9)]">
                  {boosterBallsEarned}
                </div>

                <p className="mt-2 text-xl font-black uppercase tracking-[0.12em] text-lime-300">
                  {boosterBallsEarned === 1
                    ? "BOOSTER BALL"
                    : "BOOSTER BALLS"}
                </p>

                {boosterBallsEarned > 0 ? (
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-300">
                    READY TO OPEN
                  </p>
                ) : (
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                    KEEP PLAYING TO EARN YOUR NEXT BALL
                  </p>
                )}
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-lime-300/60 to-transparent" />

              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                  ROAD TO YOUR NEXT BALL
                </p>

                <div className="mt-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-300 text-xs font-black text-black shadow-[0_0_18px_rgba(34,211,238,0.8)]">
                    YOU
                  </div>

                  <div className="relative h-5 min-w-0 flex-1 overflow-hidden rounded-full border border-white/20 bg-black">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-lime-300 shadow-[0_0_18px_rgba(34,211,238,0.9)] transition-all duration-700"
                      style={{
                        width: `${winningProgress}%`,
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[8px] font-black tracking-[0.12em] text-white">
                        {Math.round(
                          winningProgress
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-700 shadow-[0_0_25px_rgba(251,191,36,0.75)]">
                    <div className="absolute inset-[4px] rounded-full border border-yellow-100/70" />

                    <span className="relative text-xl font-black text-black">
                      T
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-3xl font-black text-white">
                    {boosterPointsBalance.toLocaleString()}
                    <span className="text-base text-gray-400">
                      {" "}
                      /{" "}
                      {pointsTarget.toLocaleString()}
                    </span>
                  </p>

                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                    POINTS
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-lime-300/40 bg-lime-300/[0.08] px-4 py-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-lime-300">
                    YOU NEED
                  </p>

                  <p className="mt-1 text-4xl font-black text-white">
                    {pointsToNextBall.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-lime-300">
                    MORE POINTS TO EARN YOUR NEXT BALL
                  </p>
                </div>

                <p className="mt-4 text-xs font-bold leading-5 text-gray-300">
                  Complete challenges to move
                  forward. Winning and competitive
                  performance can move you faster.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/challenges/create"
                  )
                }
                className="mt-5 w-full rounded-2xl border-2 border-lime-300 bg-lime-300 px-4 py-4 text-sm font-black uppercase tracking-[0.16em] text-black shadow-[0_0_25px_rgba(163,230,53,0.55)] transition active:scale-[0.98]"
              >
                PLAY & MOVE
              </button>
            </div>
          </div>
        </section>

        {/* BOOSTER BALL BOARD */}
        <section className="mb-6">

          <div className="mb-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-400">
              YOUR UNLOCKS
            </p>

            <h2 className="mt-1 text-xl font-black uppercase text-white">
              OPEN YOUR BOOSTER BALL
            </h2>

            {boosterBallsEarned > 0 ? (
              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-lime-300">
                CHOOSE ANY UNOPENED BALL
              </p>
            ) : (
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                YOUR NEXT BALL IS STILL LOCKED
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-cyan-400/40 bg-black/80 p-3 shadow-[0_0_30px_rgba(34,211,238,0.18)]">

            {revealedBall && (
              <div
                className={`mb-4 rounded-xl border p-4 text-center ${
                  revealedBall.type ===
                  "improve_player"
                    ? "border-amber-400/50 bg-amber-400/[0.08]"
                    : "border-cyan-400/50 bg-cyan-400/[0.08]"
                }`}
              >
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
                  Booster Ball{" "}
                  {revealedBall.number}
                </p>

                <p
                  className={`mt-1 text-lg font-black uppercase ${
                    revealedBall.type ===
                    "improve_player"
                      ? "text-amber-300"
                      : "text-cyan-300"
                  }`}
                >
                  {revealedBall.type ===
                  "career"
                    ? formatCareerBoosterType(
                        revealedBall.boosterType
                      )
                    : formatBoosterType(
                        revealedBall.boosterType
                      )}
                </p>

                {revealedBall.type ===
                  "career" &&
                  revealedBall.rewardValue >
                    0 && (
                    <p className="mt-2 text-xl font-black text-white">
                      +
                      {
                        revealedBall.rewardValue
                      }{" "}
                      {formatCareerRewardUnit(
                        revealedBall.boosterType
                      )}
                    </p>
                  )}

                {revealedBall.type ===
                  "improve_player" && (
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/profile/rewards/improve-player/${revealedBall.boosterType}?ball=${revealedBall.number}`
                      )
                    }
                    className="mt-4 w-full rounded-xl border border-amber-400/50 bg-amber-400/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-amber-300"
                  >
                    SELECT YOUR BOOSTER
                  </button>
                )}
              </div>
            )}

            {openError && (
              <div className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-center text-xs font-bold text-red-300">
                {openError}
              </div>
            )}

            <div className="mb-3 flex items-center justify-between">
              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-gray-400">
                20 ROWS × 10
              </p>

              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-cyan-300">
                {boosterBallsOpened} / 200
                OPENED
              </p>
            </div>

            <div className="grid grid-cols-10 gap-1">
              {Array.from(
                {
                  length:
                    TOTAL_BOOSTERS,
                },
                (_, index) => (
                  <BoosterPosition
                    key={index}
                    number={index + 1}
                    available={
                      boosterBallsEarned >
                        0 &&
                      openingBall ===
                        null &&
                      !openedPositions.includes(
                        index + 1
                      )
                    }
                    opened={openedPositions.includes(
                      index + 1
                    )}
                    opening={
                      openingBall ===
                      index + 1
                    }
                    onOpen={() =>
                      handleOpenBoosterBall(
                        index + 1
                      )
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={() =>
            router.push("/dashboard")
          }
          className="w-full rounded-xl border border-cyan-400/50 bg-black/70 px-4 py-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-300"
        >
          BACK TO PLAYER DASHBOARD
        </button>

      </main>
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
      className={`relative aspect-square min-w-0 rounded-full border transition ${
        opened
          ? "cursor-default border-amber-400/60 bg-amber-300 opacity-80 shadow-[0_0_10px_rgba(251,191,36,0.25)]"
          : available
          ? "border-cyan-300/70 bg-white shadow-[0_0_12px_rgba(34,211,238,0.35)] active:scale-95"
          : "cursor-default border-slate-600 bg-slate-300 opacity-55"
      }`}
    >
      <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#cfd8dc)]" />

      <span
        className={`absolute inset-0 z-10 flex items-center justify-center font-black ${
          opened
            ? "text-[10px] text-amber-900"
            : "text-[7px] text-slate-700"
        }`}
      >
        {opening
          ? "..."
          : opened
          ? "✓"
          : number}
      </span>
    </button>
  );
}

function formatBoosterType(
  boosterType: string
) {
  const names: Record<string, string> = {
    player_protecting:
      "Player Protecting Booster",

    player_reload:
      "Player Reload Booster",

    player_tech:
      "Player Technical Booster",

    player_accessory:
      "Player Accessories Booster",

    player_image:
      "Player Image Booster",
  };

  return (
    names[boosterType] ||
    "Improve Player Booster"
  );
}

function formatCareerBoosterType(
  boosterType: string
) {
  const names: Record<string, string> = {
    career_points:
      "Career Points Booster",

    career_xp:
      "Career XP Booster",

    ranking_points:
      "Ranking Points Booster",

    race_points:
      "Race Points Booster",
  };

  return (
    names[boosterType] ||
    "Career Booster"
  );
}

function formatCareerRewardUnit(
  boosterType: string
) {
  const names: Record<string, string> = {
    career_points:
      "CAREER POINTS",

    career_xp:
      "CAREER XP",

    ranking_points:
      "RANKING POINTS",

    race_points:
      "RACE POINTS",
  };

  return names[boosterType] || "POINTS";
}