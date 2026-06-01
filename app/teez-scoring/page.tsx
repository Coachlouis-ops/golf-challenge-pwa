"use client";

import { useRouter } from "next/navigation";

import RequireScoringAuth from "@/src/lib/RequireScoringAuth";

export default function TeezScoringPage() {

  const router = useRouter();

  return (

    <RequireScoringAuth>

      <main className="min-h-screen bg-black text-white p-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-3">
            TEEZ GOLF SCORING
          </h1>

          <p className="text-gray-400 mb-12">
            Club Competition Management System
          </p>

          {/* DASHBOARD GRID */}

          <div className="grid md:grid-cols-3 gap-6">

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

          </div>

        </div>

      </main>

    </RequireScoringAuth>

  );
}