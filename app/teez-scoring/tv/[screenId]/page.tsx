"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useSearchParams,
} from "next/navigation";

const ROWS_PER_SCENE = 12;

type LeaderboardRow = {
  position: number;
  displayName: string;
  division: string;
  total: number;
  teeTime: string;
  startingHole: string;
};

export default function TvBroadcastPage() {

  const params = useParams();

  const searchParams = useSearchParams();

  const screenId =
    params.screenId as string;

  const competitionId =
    searchParams.get("competitionId");

  const [currentScene, setCurrentScene] =
    useState(0);

  const leaderboard: LeaderboardRow[] = [

    {
      position: 1,
      displayName: "Louis Coetzee",
      division: "A",
      total: 68,
      teeTime: "07:10",
      startingHole: "1",
    },

    {
      position: 2,
      displayName: "Andries Coetzee",
      division: "A",
      total: 69,
      teeTime: "07:10",
      startingHole: "1",
    },

    {
      position: 3,
      displayName: "John Smith",
      division: "B",
      total: 70,
      teeTime: "07:20",
      startingHole: "1",
    },

    {
      position: 4,
      displayName: "Peter Johnson",
      division: "B",
      total: 71,
      teeTime: "07:20",
      startingHole: "1",
    },

  ];

  const pagedScenes = [];

  for (
    let i = 0;
    i < leaderboard.length;
    i += ROWS_PER_SCENE
  ) {

    pagedScenes.push(
      leaderboard.slice(
        i,
        i + ROWS_PER_SCENE
      )
    );

  }

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentScene((prev) => {

        if (
          prev >= pagedScenes.length - 1
        ) {
          return 0;
        }

        return prev + 1;

      });

    }, 8000);

    return () =>
      clearInterval(interval);

  }, [pagedScenes.length]);

  return (

    <main className="w-screen h-screen bg-black text-white overflow-hidden p-10">

      <div className="h-full flex flex-col">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-gray-500 text-xl">
            SCREEN: {screenId}
          </p>

          <p className="text-gray-500 text-xl">
            COMPETITION: {competitionId}
          </p>

          <h1 className="text-6xl font-black text-green-400 mt-4">
            LIVE LEADERBOARD
          </h1>

        </div>

        {/* TABLE */}

        <div className="flex-1 bg-neutral-900 rounded-3xl overflow-hidden">

          <table className="w-full h-full">

            <thead className="bg-green-400 text-black">

              <tr>

                <th className="p-6 text-left text-3xl">
                  POS
                </th>

                <th className="p-6 text-left text-3xl">
                  PLAYER
                </th>

                <th className="p-6 text-left text-3xl">
                  DIV
                </th>

                <th className="p-6 text-left text-3xl">
                  SCORE
                </th>

              </tr>

            </thead>

            <tbody>

              {pagedScenes[currentScene]?.map(
                (row) => (

                  <tr
                    key={`${row.position}-${row.displayName}`}
                    className="border-b border-white/10"
                  >

                    <td className="p-6 text-4xl font-black">
                      {row.position}
                    </td>

                    <td className="p-6 text-4xl font-bold">
                      {row.displayName}
                    </td>

                    <td className="p-6 text-3xl">
                      {row.division}
                    </td>

                    <td className="p-6 text-4xl font-black text-green-400">
                      {row.total}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="mt-6 flex justify-between text-2xl text-gray-500">

          <p>
            Scene {currentScene + 1}
          </p>

          <p>
            Auto Rotating Broadcast
          </p>

        </div>

      </div>

    </main>

  );
}