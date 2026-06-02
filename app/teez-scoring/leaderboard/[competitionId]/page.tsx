"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

type LeaderboardRow = {
  position: number;

  displayName: string;

  division: string;

  total: number;

  teeTime: string;

  startingHole: string;
};

export default function LeaderboardPage() {

  const params = useParams();

  const competitionId =
    Array.isArray(params?.competitionId)
      ? params.competitionId[0]
      : params?.competitionId;

  const [loading, setLoading] =
    useState(true);

  const [competitionName, setCompetitionName] =
    useState("");

  const [leaderboard, setLeaderboard] =
    useState<LeaderboardRow[]>([]);

  useEffect(() => {

    if (!competitionId) return;

    loadLeaderboard();

  }, [competitionId]);

  async function loadLeaderboard() {

    try {

      const ref = doc(
        db,
        "competitions",
        competitionId as string
      );

      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("Competition not found");
        return;
      }

      const data = snap.data() as any;

      setCompetitionName(
        data.competitionName || ""
      );

      setLeaderboard(
        data.leaderboard || []
      );

    } catch (e: any) {

      console.error(e);

      alert(
        e.message ||
        "Failed to load leaderboard"
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading leaderboard...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-black text-green-400 mb-4">
            LIVE LEADERBOARD
          </h1>

          <p className="text-gray-400 text-lg">
            {competitionName}
          </p>

        </div>

        <div className="bg-neutral-900 rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-green-400 text-black">

              <tr>

                <th className="p-5 text-left">
                  POS
                </th>

                <th className="p-5 text-left">
                  PLAYER / TEAM
                </th>

                <th className="p-5 text-left">
                  DIV
                </th>

                <th className="p-5 text-left">
                  SCORE
                </th>

                <th className="p-5 text-left">
                  TEE
                </th>

                <th className="p-5 text-left">
                  TIME
                </th>

              </tr>

            </thead>

            <tbody>

              {leaderboard.map((row) => (

                <tr
                  key={`${row.position}-${row.displayName}`}
                  className="border-b border-white/10"
                >

                  <td className="p-5 font-bold text-2xl">
                    {row.position}
                  </td>

                  <td className="p-5 font-bold">
                    {row.displayName}
                  </td>

                  <td className="p-5">
                    {row.division}
                  </td>

                  <td className="p-5 text-green-400 font-black text-2xl">
                    {row.total}
                  </td>

                  <td className="p-5">
                    {row.startingHole}
                  </td>

                  <td className="p-5">
                    {row.teeTime}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  );
}