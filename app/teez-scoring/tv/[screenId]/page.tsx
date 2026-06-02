"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TvBroadcastPage() {

  const params = useParams();

  const screenId = params.screenId as string;

  const scenes = [
    {
      type: "leaderboard",
      title: "LIVE LEADERBOARD",
    },
    {
      type: "sponsor",
      title: "SPONSORED BY HONEY BADGER",
    },
    {
      type: "division",
      title: "A DIVISION LEADERBOARD",
    },
  ];

  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentScene((prev) => {

        if (prev >= scenes.length - 1) {
          return 0;
        }

        return prev + 1;

      });

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <main className="w-screen h-screen bg-black text-white overflow-hidden">

      <div className="w-full h-full flex flex-col items-center justify-center">

        <p className="text-gray-500 text-xl mb-4">
          SCREEN: {screenId}
        </p>

        <h1 className="text-7xl font-black text-green-400 text-center px-10">
          {scenes[currentScene].title}
        </h1>

        <p className="mt-12 text-2xl text-gray-400">
          Scene {currentScene + 1} / {scenes.length}
        </p>

      </div>

    </main>

  );
}