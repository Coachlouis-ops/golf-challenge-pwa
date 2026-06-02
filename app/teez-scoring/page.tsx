"use client";

import { useRouter } from "next/navigation";

export default function TeezScoringPage() {

  const router = useRouter();

  return (

  <main className="h-screen overflow-y-scroll bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          TEEZ GOLF SCORING
        </h1>

        <p className="text-gray-400 mb-12">
          Club Competition Management System
        </p>

    <div className="grid md:grid-cols-5 gap-6">

          <button
            onClick={() =>
              router.push(
                "/teez-scoring/create-competition"
              )
            }
            className="
              bg-neutral-900
              border border-cyan-400/20
              rounded-3xl
              p-8
              text-left
              hover:border-cyan-400
              transition
            "
          >
            <h2 className="text-2xl font-bold mb-3 text-cyan-400">
              Create Competition
            </h2>

            <p className="text-gray-400 text-sm">
              Create new competitions,
              configure scoring formats,
              divisions and rules.
            </p>
          </button>
          

<button
  onClick={() =>
    router.push(
      "/teez-scoring/competitions"
    )
  }
  className="
    bg-neutral-900
    border border-orange-400/20
    rounded-3xl
    p-8
    text-left
    hover:border-orange-400
    transition
  "
>
  <h2 className="text-2xl font-bold mb-3 text-orange-400">
    Competitions
  </h2>

  <p className="text-gray-400 text-sm">
    Manage active competitions,
    reopen scoring,
    launch leaderboards
    and TV broadcasts.
  </p>
</button>


          <button
            onClick={() =>
              router.push(
                "/teez-scoring/leaderboards"
              )
            }
            className="
              bg-neutral-900
              border border-green-400/20
              rounded-3xl
              p-8
              text-left
              hover:border-green-400
              transition
            "
          >
            <h2 className="text-2xl font-bold mb-3 text-green-400">
              Live Leaderboards
            </h2>

            <p className="text-gray-400 text-sm">
              Monitor and manage live
              competition scoring and rankings.
            </p>
          </button>

          <button
            onClick={() =>
              router.push(
                "/teez-scoring/tv"
              )
            }
            className="
              bg-neutral-900
              border border-yellow-400/20
              rounded-3xl
              p-8
              text-left
              hover:border-yellow-400
              transition
            "
          >
            <h2 className="text-2xl font-bold mb-3 text-yellow-400">
              TV Display
            </h2>

            <p className="text-gray-400 text-sm">
              Launch fullscreen live
              leaderboard broadcasting mode.
            </p>
          </button>

          <button
  onClick={() =>
    router.push(
      "/teez-scoring/history"
    )
  }
  className="
    bg-neutral-900
    border border-purple-400/20
    rounded-3xl
    p-8
    text-left
    hover:border-purple-400
    transition
  "
>
  <h2 className="text-2xl font-bold mb-3 text-purple-400">
    Competition History
  </h2>

  <p className="text-gray-400 text-sm">
    View finalized competition
    archives and results history.
  </p>
</button>


<button
  onClick={() =>
    router.push(
      "/teez-scoring/register-tv"
    )
  }
  className="
    bg-neutral-900
    border border-orange-400/20
    rounded-3xl
    p-8
    text-left
    hover:border-orange-400
    transition
  "
>
  <h2 className="text-2xl font-bold mb-3 text-orange-400">
    Register TV
  </h2>

  <p className="text-gray-400 text-sm">
    Register external TV devices
    for leaderboard broadcasting.
  </p>
</button>

        </div>

      </div>

    </main>

  );
}