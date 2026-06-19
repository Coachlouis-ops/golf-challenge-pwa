"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

type LeaderboardRow = {
  position?: number;
  displayName?: string;
  division?: string;
  total?: number;
  teeTime?: string;
  startingHole?: string;
  countOutPosition?: string;
};

type Competition = {
  competitionName?: string;
  competitionDate?: string;
  format?: string;
  scoringType?: string;
  playerConfiguration?: string;
  status?: string;
  leaderboard?: LeaderboardRow[];
};

export default function LiveScoreboardPage() {

  const params =
    useParams();

  const competitionId =
    params.competitionId as string;

  const [competition, setCompetition] =
    useState<Competition | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!competitionId) return;

    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "competitions",
          competitionId
        ),
        (snap) => {

          if (!snap.exists()) {
            setCompetition(null);
            setLoading(false);
            return;
          }

          setCompetition(
            snap.data() as Competition
          );

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, [competitionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-green-400 text-3xl font-black">
          Loading Live Scoreboard...
        </p>
      </main>
    );
  }

  if (!competition) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-red-400 text-3xl font-black">
          Competition not found.
        </p>
      </main>
    );
  }

  const leaderboard =
    Array.isArray(competition.leaderboard)
      ? competition.leaderboard
      : [];

  return (

    <main className="min-h-screen bg-black text-white p-8 overflow-hidden">

      <div className="max-w-[1800px] mx-auto">

        <div className="flex items-start justify-between mb-10 border-b border-green-400/30 pb-8">

          <div>

            <p className="text-green-400 text-2xl font-black uppercase tracking-[0.3em] mb-4">
              LIVE SCOREBOARD
            </p>

            <h1 className="text-6xl font-black text-white leading-tight">
              {competition.competitionName || "Competition"}
            </h1>

            <p className="text-gray-400 text-2xl mt-4">
              {competition.competitionDate || ""}{" "}
              {competition.format ? `• ${competition.format}` : ""}{" "}
              {competition.playerConfiguration ? `• ${competition.playerConfiguration}` : ""}
            </p>

          </div>

          <div className="text-right">

            <div className="inline-block bg-green-400 text-black px-8 py-4 rounded-2xl font-black text-2xl">
              LIVE
            </div>

            <p className="text-gray-500 text-lg mt-4">
              Updates automatically
            </p>

          </div>

        </div>

        {leaderboard.length === 0 ? (

          <div className="min-h-[500px] flex items-center justify-center border border-white/10 rounded-3xl bg-neutral-900">
            <p className="text-gray-400 text-4xl font-black">
              No leaderboard data yet.
            </p>
          </div>

        ) : (

          <div className="bg-neutral-900 border border-green-400/20 rounded-3xl overflow-hidden">

            <div className="grid grid-cols-[100px_1fr_220px_180px_160px] bg-green-400 text-black text-2xl font-black px-8 py-5">

              <div>
                POS
              </div>

              <div>
                PLAYER / TEAM
              </div>

              <div>
                DIVISION
              </div>

              <div>
                SCORE
              </div>

              <div>
                COUNT OUT
              </div>

            </div>

            {leaderboard.map((row, index) => (

              <div
                key={index}
                className="
                  grid
                  grid-cols-[100px_1fr_220px_180px_160px]
                  items-center
                  px-8
                  py-6
                  border-b
                  border-white/10
                  text-3xl
                  even:bg-black/30
                "
              >

                <div className="font-black text-green-400">
                  {row.position || index + 1}
                </div>

                <div className="font-black text-white">
                  {row.displayName || "-"}
                </div>

                <div className="text-gray-300">
                  {row.division || "-"}
                </div>

                <div className="font-black text-yellow-400">
                  {row.total ?? "-"}
                </div>

                <div className="text-gray-300">
                  {row.countOutPosition || "-"}
                </div>

              </div>

            ))}

          </div>

        )}

        <div className="mt-8 text-center text-gray-600 text-lg">
          Scoring systems by Teez Golf Challenges - Driven by Honey Badger Technologies PTY. LTD
        </div>

      </div>

    </main>

  );
}