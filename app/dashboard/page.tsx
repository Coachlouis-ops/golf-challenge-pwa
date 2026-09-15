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


type LockedFeature = {
  title: string;
  reason: "login" | "subscription";
};

function DashboardContent() {
  const router = useRouter();

  const {
    user,
    loading,
    isSubscribed,
  } = useAuth();

  const [lockedFeature, setLockedFeature] =
    useState<LockedFeature | null>(null);


    const [boosterBallsEarned, setBoosterBallsEarned] =
  useState(0);

const [boosterBallsOpened, setBoosterBallsOpened] =
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
      getFunctions(undefined, "europe-west1");

    const openBoosterBall =
      httpsCallable<
        { ballNumber: number },
        {
          success: boolean;
          ball: {
            ballNumber: number;
            ballType: "career" | "improve_player";
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

  const openCompetitiveFeature = (
    title: string,
    route: string
  ) => {
    if (!user) {
      setLockedFeature({
        title,
        reason: "login",
      });
      return;
    }

    if (!isSubscribed) {
      setLockedFeature({
        title,
        reason: "subscription",
      });
      return;
    }

    router.push(route);
  };

  const openProfile = () => {
    if (!user) {
      setLockedFeature({
        title: "My Profile",
        reason: "login",
      });
      return;
    }

    router.push("/profile");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  const competitiveFeaturesLocked =
    !user || !isSubscribed;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* FULL SCREEN NEON SPORTS BACKGROUND */}
      <div className="fixed inset-0">
        <Image
          src="/vs-energy.png"
          alt="Teez Neon Arena"
          fill
          priority
          className="object-cover object-center"
        />

        {/* DARKEN BACKGROUND FOR READABILITY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* TOP / BOTTOM DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

        {/* NEON ATMOSPHERE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,170,255,0.17),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(140,255,0,0.16),transparent_35%),radial-gradient(circle_at_50%_75%,rgba(168,85,247,0.13),transparent_40%)]" />
      </div>

      <main className="relative z-10 w-full max-w-md mx-auto px-5 pb-12">

        {/* LOGO */}
        <div className="flex justify-center pt-6 pb-2">
          <div className="relative w-[230px] h-[230px] drop-shadow-[0_0_35px_rgba(0,170,255,0.75)]">
            <Image
              src="/teez-app-icon-v4.png"
              alt="Teez Golf Challenges"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* TAGLINE */}
        <div className="text-center mb-7">
          <p className="text-[14px] sm:text-[15px] tracking-[3px] font-extrabold text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]">
            SETTLE THE SCORE.
          </p>

          <p className="text-[12px] tracking-[4px] font-bold text-cyan-300 mt-1 drop-shadow-[0_0_12px_rgba(34,211,238,1)]">
            PLAY WITH PURPOSE
          </p>
        </div>

        <div className="flex flex-col gap-4">

          {/* NOT LOGGED IN */}
          {!user && (
            <div className="glass-panel border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.35)]">
              <p className="text-cyan-300 font-extrabold tracking-wide text-center">
                EXPLORE THE FULL TEEZ DASHBOARD
              </p>

              <p className="text-sm text-gray-200 mt-3 leading-6 text-center">
                Log in to create your player profile and activate
                Participation Access.
              </p>

              <p className="text-3xl font-black mt-5 text-center text-white">
                R149
              </p>

              <p className="text-xs text-gray-300 mt-2 text-center">
                Includes Participation Access + 100 Teez Play Tokens
              </p>

              <p className="text-xs text-gray-400 mt-2 text-center">
                No automatic renewal. Top up more tokens whenever you need them.
              </p>

              <button
                onClick={() =>
                  router.push("/legal/payment-policy")
                }
                className="w-full mt-3 text-xs text-cyan-300 underline hover:text-white"
              >
                View Payment & Participation Policy
              </button>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() =>
                    router.push("/login")
                  }
                  className="small-neon-btn neon-blue"
                >
                  LOG IN
                </button>

                <button
                  onClick={() =>
                    router.push("/register")
                  }
                  className="small-neon-btn neon-green"
                >
                  REGISTER
                </button>
              </div>
            </div>
          )}

          {/* LOGGED IN BUT NOT ACTIVATED */}
          {user && !isSubscribed && (
            <div className="glass-panel border-lime-400 shadow-[0_0_35px_rgba(163,230,53,0.32)]">
              <p className="text-lime-300 font-extrabold tracking-wide text-center">
                ACTIVATE PARTICIPATION ACCESS
              </p>

              <p className="text-sm text-gray-200 mt-3 leading-6 text-center">
                Activate Participation Access to unlock challenges,
                rankings, invites, live scoring and your Teez Play Token Wallet.
              </p>

              <p className="text-3xl font-black mt-5 text-center">
                R149
              </p>

              <p className="text-xs text-gray-300 mt-2 text-center">
                Includes 100 Teez Play Tokens
              </p>

              <p className="text-xs text-gray-400 mt-2 text-center">
                One-time authorised payment. No automatic renewal.
              </p>

              <button
                onClick={() =>
                  router.push("/payment")
                }
                className="w-full mt-5 h-12 rounded-xl font-extrabold neon-green"
              >
                ACTIVATE PARTICIPATION ACCESS
              </button>
            </div>
          )}

{/* CHOOSE YOUR BOOSTER BALL */}
{user && isSubscribed && (
  <section className="mt-2 mb-6">
    <div className="mb-4 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-400">
        MYSTERY BOARD
      </p>

      <h2 className="mt-1 text-xl font-black text-white">
        CHOOSE YOUR BOOSTER BALL
      </h2>

      <p className="mt-2 text-xs text-gray-300">
        Balls Available:{" "}
        <span className="font-black text-cyan-300">
          {boosterBallsEarned}
        </span>
      </p>
    </div>

    <div className="rounded-2xl border border-cyan-400/40 bg-black/80 p-3 shadow-[0_0_30px_rgba(34,211,238,0.18)]">

      {revealedBall && (
        <div
          className={`mb-4 rounded-xl border p-4 text-center ${
            revealedBall.type === "improve_player"
              ? "border-amber-400/50 bg-amber-400/[0.08]"
              : "border-cyan-400/50 bg-cyan-400/[0.08]"
          }`}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
            Booster Ball {revealedBall.number}
          </p>

          <p
            className={`mt-1 text-lg font-black uppercase ${
              revealedBall.type === "improve_player"
                ? "text-amber-300"
                : "text-cyan-300"
            }`}
          >
            {revealedBall.type === "career"
              ? formatCareerBoosterType(
                  revealedBall.boosterType
                )
              : formatBoosterType(
                  revealedBall.boosterType
                )}
          </p>

          {revealedBall.type === "career" &&
            revealedBall.rewardValue > 0 && (
              <p className="mt-2 text-xl font-black text-white">
                +{revealedBall.rewardValue}{" "}
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
        <p className="text-[8px] font-black uppercase tracking-[0.14em] text-gray-400">
          20 ROWS × 10
        </p>

        <p className="text-[8px] font-black uppercase tracking-[0.14em] text-cyan-300">
          {boosterBallsOpened} / 200 OPENED
        </p>
      </div>

      <div className="grid grid-cols-10 gap-1">
        {Array.from(
          { length: TOTAL_BOOSTERS },
          (_, index) => (
            <DashboardBoosterPosition
              key={index}
              number={index + 1}
              available={
                boosterBallsEarned > 0 &&
                openingBall === null &&
                !openedPositions.includes(
                  index + 1
                )
              }
              opened={openedPositions.includes(
                index + 1
              )}
              opening={
                openingBall === index + 1
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
)}


          {/* MAIN DASHBOARD BUTTONS */}
          <div className="space-y-4">

            <button
              onClick={() =>
                openCompetitiveFeature(
                  "Create Challenge",
                  "/challenges/create"
                )
              }
              className={`arena-btn neon-pink ${
                competitiveFeaturesLocked
                  ? "locked-btn"
                  : ""
              }`}
            >
              CREATE CHALLENGE
            </button>

            <button
              onClick={() =>
                openCompetitiveFeature(
                  "My Challenges",
                  "/my-challenges"
                )
              }
              className={`arena-btn neon-purple ${
                competitiveFeaturesLocked
                  ? "locked-btn"
                  : ""
              }`}
            >
              MY CHALLENGES
            </button>

            <button
              onClick={() =>
                openCompetitiveFeature(
                  "My Invites",
                  "/my-invites"
                )
              }
              className={`arena-btn neon-blue ${
                competitiveFeaturesLocked
                  ? "locked-btn"
                  : ""
              }`}
            >
              MY INVITES
            </button>

            <button
              onClick={() =>
                openCompetitiveFeature(
                  "My Groups",
                  "/groups"
                )
              }
              className={`arena-btn neon-orange ${
                competitiveFeaturesLocked
                  ? "locked-btn"
                  : ""
              }`}
            >
              MY GROUPS
            </button>

            <button
              onClick={openProfile}
              className={`arena-btn neon-cyan ${
                !user
                  ? "locked-btn"
                  : ""
              }`}
            >
              MY PROFILE
            </button>

<button
  onClick={() =>
    openCompetitiveFeature(
      "My Career",
      "/profile/my-career"
    )
  }
  className={`arena-btn neon-blue ${
    competitiveFeaturesLocked
      ? "locked-btn"
      : ""
  }`}
>
  MY CAREER
</button>


            <button
              onClick={() =>
                openCompetitiveFeature(
                  "Token Wallet",
                  "/wallet"
                )
              }
              className={`arena-btn neon-green ${
                competitiveFeaturesLocked
                  ? "locked-btn"
                  : ""
              }`}
            >
              TOKEN WALLET
            </button>

          </div>

          {/* ACCOUNT */}
          <div className="glass-panel mt-4">
            <p className="text-center text-xs tracking-[3px] text-white font-bold mb-4">
              PARTICIPATION & ACCOUNT
            </p>

            <div className="flex flex-col gap-3">
              {!user && (
                <>
                  <button
                    onClick={() =>
                      router.push("/login")
                    }
                    className="arena-btn neon-blue"
                  >
                    LOG IN
                  </button>

                  <button
                    onClick={() =>
                      router.push("/register")
                    }
                    className="arena-btn neon-green"
                  >
                    REGISTER
                  </button>
                </>
              )}

              {user && !isSubscribed && (
                <button
                  onClick={() =>
                    router.push("/payment")
                  }
                  className="arena-btn neon-green"
                >
                  ACTIVATE PARTICIPATION ACCESS
                </button>
              )}

              {user && isSubscribed && (
                <>
                  <button
                    onClick={() =>
                      router.push("/wallet")
                    }
                    className="arena-btn neon-cyan"
                  >
                    VIEW TOKEN WALLET
                  </button>

                  <button
                    onClick={() =>
                      router.push("/wallet/top-up")
                    }
                    className="arena-btn neon-green"
                  >
                    TOP UP TEEZ PLAY TOKENS
                  </button>
                </>
              )}
            </div>
          </div>

          {/* LEGAL */}
          <div className="glass-panel mt-1">
            <p className="text-center text-xs tracking-[3px] text-white font-bold mb-5">
              LEGAL & POLICIES
            </p>

            <div className="flex flex-col gap-4 text-center">
              <button
                onClick={() =>
                  router.push("/terms")
                }
                className="policy-link"
              >
                PLATFORM TERMS & CONDITIONS
              </button>

              <button
                onClick={() =>
                  router.push(
                    "/legal/payment-policy"
                  )
                }
                className="policy-link"
              >
                PAYMENT & PARTICIPATION POLICY
              </button>

              <button
                onClick={() =>
                  router.push(
                    "/legal/refund-policy"
                  )
                }
                className="policy-link"
              >
                REFUND, CANCELLATION & DELIVERY POLICY
              </button>

              <button
                onClick={() =>
                  router.push("/privacy")
                }
                className="policy-link"
              >
                PRIVACY POLICY
              </button>
            </div>
          </div>

          <button
            onClick={() =>
              router.push("/")
            }
            className="text-xs tracking-[3px] text-gray-300 underline mt-3 mb-3 hover:text-white text-center"
          >
            BACK TO HOME
          </button>
        </div>
      </main>

      {/* LOCKED FEATURE MODAL */}
      {lockedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6">

          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-cyan-400/70 bg-black/95 p-6 text-center shadow-[0_0_55px_rgba(34,211,238,0.45)]">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-lime-500/10 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs tracking-[3px] text-cyan-300 font-bold">
                FEATURE LOCKED
              </p>

              <h2 className="text-2xl font-extrabold mt-3">
                {lockedFeature.title}
              </h2>

              {lockedFeature.reason ===
              "login" ? (
                <>
                  <p className="text-sm text-gray-300 mt-4 leading-6">
                    Log in or register to access this feature.
                  </p>

                  <button
                    onClick={() =>
                      router.push("/login")
                    }
                    className="arena-btn neon-blue mt-6"
                  >
                    LOG IN
                  </button>

                  <button
                    onClick={() =>
                      router.push("/register")
                    }
                    className="arena-btn neon-green mt-3"
                  >
                    REGISTER
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-300 mt-4 leading-6">
                    Activate Participation Access to unlock this competitive feature.
                  </p>

                  <p className="text-3xl font-black mt-5">
                    R149
                  </p>

                  <p className="text-xs text-gray-300 mt-2">
                    Includes 100 Teez Play Tokens
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    One-time authorised payment. No automatic renewal.
                  </p>

                  <button
                    onClick={() =>
                      router.push("/payment")
                    }
                    className="arena-btn neon-green mt-6"
                  >
                    ACTIVATE PARTICIPATION ACCESS
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setLockedFeature(null)
                }
                className="mt-6 text-xs tracking-[2px] text-gray-400 underline hover:text-white"
              >
                CONTINUE VIEWING DASHBOARD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD STYLES */}
      <style jsx>{`
        .glass-panel {
          width: 100%;
          padding: 20px;
          border-radius: 20px;
          border-width: 1px;
          background: rgba(0, 0, 0, 0.74);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            inset 0 0 20px rgba(255, 255, 255, 0.03),
            0 12px 35px rgba(0, 0, 0, 0.55);
        }

        .arena-btn {
          position: relative;
          width: 100%;
          min-height: 56px;
          padding: 0 18px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 1.8px;
          color: white;
          background: rgba(0, 0, 0, 0.82);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
          animation: neonPulse 2.4s ease-in-out infinite;
        }

        .arena-btn:hover {
          transform: translateY(-2px) scale(1.025);
          background: rgba(10, 10, 10, 0.95);
        }

        .arena-btn:active {
          transform: scale(0.97);
        }

        .small-neon-btn {
          min-height: 46px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
          color: white;
          background: rgba(0, 0, 0, 0.8);
          transition: 0.2s ease;
        }

        .neon-pink {
          border: 2px solid #ff2bd6;
          box-shadow:
            0 0 10px rgba(255, 43, 214, 0.8),
            0 0 24px rgba(255, 43, 214, 0.45),
            inset 0 0 12px rgba(255, 43, 214, 0.12);
          text-shadow: 0 0 8px #ff2bd6;
        }

        .neon-purple {
          border: 2px solid #a855f7;
          box-shadow:
            0 0 10px rgba(168, 85, 247, 0.85),
            0 0 24px rgba(168, 85, 247, 0.5),
            inset 0 0 12px rgba(168, 85, 247, 0.12);
          text-shadow: 0 0 8px #a855f7;
        }

        .neon-blue {
          border: 2px solid #0077ff;
          box-shadow:
            0 0 10px rgba(0, 119, 255, 0.95),
            0 0 24px rgba(0, 119, 255, 0.5),
            inset 0 0 12px rgba(0, 119, 255, 0.14);
          text-shadow: 0 0 8px #008cff;
        }

        .neon-cyan {
          border: 2px solid #22d3ee;
          box-shadow:
            0 0 10px rgba(34, 211, 238, 0.9),
            0 0 24px rgba(34, 211, 238, 0.48),
            inset 0 0 12px rgba(34, 211, 238, 0.12);
          text-shadow: 0 0 8px #22d3ee;
        }

        .neon-green {
          border: 2px solid #7cff00;
          box-shadow:
            0 0 10px rgba(124, 255, 0, 0.95),
            0 0 24px rgba(124, 255, 0, 0.48),
            inset 0 0 12px rgba(124, 255, 0, 0.12);
          text-shadow: 0 0 8px #7cff00;
        }

        .neon-orange {
          border: 2px solid #ff9d00;
          box-shadow:
            0 0 10px rgba(255, 157, 0, 0.95),
            0 0 24px rgba(255, 157, 0, 0.5),
            inset 0 0 12px rgba(255, 157, 0, 0.12);
          text-shadow: 0 0 8px #ff9d00;
        }

        .locked-btn {
          opacity: 0.72;
        }

        .locked-btn::after {
          content: "LOCKED";
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 8px;
          letter-spacing: 1px;
          color: #000;
          background: #ffffff;
          padding: 3px 6px;
          border-radius: 999px;
          text-shadow: none;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }

        .policy-link {
          font-size: 11px;
          letter-spacing: 1.6px;
          color: #d4d4d8;
          text-decoration: underline;
          transition: 0.2s ease;
        }

        .policy-link:hover {
          color: white;
          text-shadow: 0 0 8px white;
        }

        @keyframes neonPulse {
          0%,
          100% {
            filter: brightness(0.92);
          }

          50% {
            filter: brightness(1.22);
          }
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

function DashboardBoosterPosition({
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
          ? "border-cyan-300/70 bg-white shadow-[0_0_12px_rgba(34,211,238,0.35)] active:scale-95"
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