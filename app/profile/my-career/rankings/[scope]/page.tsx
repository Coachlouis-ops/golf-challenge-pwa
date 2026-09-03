"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { httpsCallable } from "firebase/functions";

import { functions } from "@/src/lib/firebase";

type LeaderboardPlayer = {
  uid: string;
  battleName: string;
  points: number;
  position: number;
  isCurrentPlayer: boolean;
};

type LeaderboardResponse = {
  success: boolean;
  scope: string;
  scopeLabel: string;
  playerCount: number;
  leaderboard: LeaderboardPlayer[];
};

export default function CareerRankingPage() {
  const router = useRouter();
  const params = useParams();

  const scope = String(
    params?.scope || ""
  ).toLowerCase();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [data, setData] =
    useState<LeaderboardResponse | null>(
      null
    );

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError("");

        const getCareerLeaderboard =
          httpsCallable<
            { scope: string },
            LeaderboardResponse
          >(
            functions,
            "getCareerLeaderboard"
          );

        const result =
          await getCareerLeaderboard({
            scope,
          });

        setData(result.data);
      } catch (err) {
        console.error(
          "Unable to load leaderboard:",
          err
        );

        setError(
          "Unable to load this ranking."
        );
      } finally {
        setLoading(false);
      }
    }

    if (
      [
        "club",
        "province",
        "national",
        "global",
      ].includes(scope)
    ) {
      loadLeaderboard();
    } else {
      setError(
        "Invalid ranking selected."
      );
      setLoading(false);
    }
  }, [scope]);

  const scopeTitle =
    scope === "club"
      ? "Club Ranking"
      : scope === "province"
        ? "Province Ranking"
        : scope === "national"
          ? "National Ranking"
          : "Global Ranking";

  return (
    <main className="min-h-screen bg-[#05080b] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-cyan-400/20 bg-[#05080b]/95 px-5 py-4 backdrop-blur">

        <div className="mx-auto flex max-w-md items-center justify-between">

          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.05] text-2xl text-cyan-300"
            aria-label="Go back"
          >
            ‹
          </button>

          <div className="text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-cyan-400">
              TEEZ Official Rankings
            </p>

            <h1 className="mt-1 text-lg font-black tracking-tight">
              {scopeTitle}
            </h1>

          </div>

          <div className="h-10 w-10" />

        </div>
      </header>


      <div className="mx-auto max-w-md px-4 pb-16 pt-5">

        {/* RANKING HERO */}

        <section className="relative overflow-hidden border border-cyan-400/30 bg-[#081117] shadow-[0_0_35px_rgba(34,211,238,0.10)]">

          <div className="absolute right-[-50px] top-[-50px] h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative p-5">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-cyan-400">
                  Competitive Leaderboard
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {data?.scopeLabel ||
                    scopeTitle}
                </h2>

                <p className="mt-2 text-sm leading-5 text-slate-400">
                  Official accumulated TEEZ ranking points.
                </p>

              </div>

              <div className="flex h-14 min-w-14 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.06] px-2">

                <span className="text-xs font-black tracking-[0.12em] text-cyan-300">
                  TEEZ
                </span>

              </div>

            </div>

            {!loading && data && (
              <div className="mt-5 border-t border-white/10 pt-4">

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Ranked Players
                </p>

                <p className="mt-1 text-2xl font-black text-white">
                  {data.playerCount}
                </p>

              </div>
            )}

          </div>
        </section>


        {/* LOADING */}

        {loading && (
          <div className="mt-5 border border-white/10 bg-[#081117] px-5 py-12 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Loading Rankings
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="mt-5 border border-red-500/30 bg-red-500/[0.06] p-5">

            <p className="text-sm font-bold text-red-300">
              {error}
            </p>

          </div>
        )}


        {/* LEADERBOARD */}

        {!loading &&
          !error &&
          data && (
            <section className="mt-5">

              {/* COLUMN HEADERS */}

              <div className="grid grid-cols-[52px_1fr_82px] border border-white/10 bg-[#0c151c] px-3 py-3">

                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                  Rank
                </p>

                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                  Battle Name
                </p>

                <p className="text-right text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                  Points
                </p>

              </div>


              <div className="mt-2 space-y-2">

                {data.leaderboard.map(
                  (player) => (
                    <LeaderboardRow
                      key={player.uid}
                      player={player}
                    />
                  )
                )}

              </div>


              {data.leaderboard.length ===
                0 && (
                <div className="border border-white/10 bg-[#081117] p-8 text-center">

                  <p className="text-sm font-bold text-slate-400">
                    No ranked players found.
                  </p>

                </div>
              )}

            </section>
          )}

      </div>
    </main>
  );
}


function LeaderboardRow({
  player,
}: {
  player: LeaderboardPlayer;
}) {
  const podium =
    player.position <= 3;

  const positionColour =
    player.position === 1
      ? "text-yellow-300"
      : player.position === 2
        ? "text-slate-200"
        : player.position === 3
          ? "text-amber-600"
          : "text-cyan-300";

  return (
    <div
      className={`relative grid grid-cols-[52px_1fr_82px] items-center border px-3 py-4 ${
        player.isCurrentPlayer
          ? "border-cyan-400/60 bg-cyan-400/[0.08] shadow-[0_0_22px_rgba(34,211,238,0.12)]"
          : podium
            ? "border-yellow-500/20 bg-[#101417]"
            : "border-white/10 bg-[#081117]"
      }`}
    >

      {player.isCurrentPlayer && (
        <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-cyan-400" />
      )}

      <div>

        <p
          className={`text-xl font-black ${positionColour}`}
        >
          #{player.position}
        </p>

      </div>


      <div className="min-w-0 pr-2">

        <p className="truncate text-sm font-black text-white">
          {player.battleName}
        </p>

        {player.isCurrentPlayer && (
          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-cyan-400">
            Your Position
          </p>
        )}

      </div>


      <div className="text-right">

        <p className="text-lg font-black text-white">
          {player.points.toLocaleString()}
        </p>

        <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-500">
          Ranking Pts
        </p>

      </div>

    </div>
  );
}