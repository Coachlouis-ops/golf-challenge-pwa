"use client";

import { useRouter } from "next/navigation";

export default function TeezGolfSystemsPage() {

  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* LOGO / TITLE */}
      <div className="text-center mb-16">

        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
          TEEZ GOLF SYSTEMS
        </h1>

        <p className="text-gray-400 max-w-2xl text-sm md:text-base">
          Golf Competition Technology, Live Scoring, Rankings,
          Challenges and Club Competition Systems.
        </p>

      </div>

      {/* OPTIONS */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

        {/* CHALLENGES */}
        <button
          onClick={() => router.push("/teez-challenges")}
          className="
            bg-neutral-900
            border border-green-400/30
            rounded-3xl
            p-10
            hover:scale-[1.02]
            hover:border-green-400
            transition-all
            text-left
          "
        >
          <h2 className="text-3xl font-bold mb-4 text-green-400">
            Teez Golf Challenges
          </h2>

          <p className="text-gray-400 leading-7">
            Player-vs-player golf challenges,
            rankings, wallets, rewards,
            live competition and challenge systems.
          </p>
        </button>

        {/* SCORING */}
        <button
          onClick={() => router.push("/teez-scoring")}
          className="
            bg-neutral-900
            border border-cyan-400/30
            rounded-3xl
            p-10
            hover:scale-[1.02]
            hover:border-cyan-400
            transition-all
            text-left
          "
        >
          <h2 className="text-3xl font-bold mb-4 text-cyan-400">
            Teez Golf Scoring
          </h2>

          <p className="text-gray-400 leading-7">
            Club competition scoring,
            live leaderboards, TV broadcasting,
            nearest pin, longest drive and
            tournament management systems.
          </p>
        </button>

      </div>

    </main>
  );
}