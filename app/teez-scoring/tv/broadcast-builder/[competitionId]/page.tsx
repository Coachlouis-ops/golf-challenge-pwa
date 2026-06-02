"use client";

import {
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

export default function BroadcastBuilderPage() {

  const params = useParams();

  const competitionId =
    params.competitionId as string;

  const [slides, setSlides] =
    useState<string[]>([]);

  function addLeaderboardSlide() {

    setSlides((prev) => [
      ...prev,
      "LIVE LEADERBOARD",
    ]);

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <h1 className="text-5xl font-black text-cyan-400 mb-4">
            BROADCAST BUILDER
          </h1>

          <p className="text-gray-400 text-xl">
            Competition:
            <br />
            {competitionId}
          </p>

        </div>

        {/* ACTIONS */}

        <div className="mb-10 flex gap-4">

          <button
            onClick={addLeaderboardSlide}
            className="
              bg-green-400
              text-black
              px-8
              py-5
              rounded-2xl
              font-black
              hover:scale-105
              transition
            "
          >
            ADD LEADERBOARD SLIDE
          </button>

        </div>

        {/* SLIDES */}

        <div className="grid gap-6">

          {slides.map((slide, index) => (

            <div
              key={`${slide}-${index}`}
              className="
                bg-neutral-900
                border border-cyan-400/20
                rounded-3xl
                p-8
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 mb-2">
                    SLIDE {index + 1}
                  </p>

                  <h2 className="text-3xl font-black text-white">
                    {slide}
                  </h2>

                </div>

                <div
                  className="
                    bg-green-400
                    text-black
                    px-6
                    py-3
                    rounded-2xl
                    font-black
                  "
                >
                  ACTIVE
                </div>

              </div>

            </div>

          ))}

          {slides.length === 0 && (

            <div
              className="
                bg-neutral-900
                border border-dashed border-white/10
                rounded-3xl
                p-20
                text-center
              "
            >

              <h2 className="text-3xl font-black text-gray-500 mb-4">
                NO SLIDES ADDED
              </h2>

              <p className="text-gray-600">
                Add your first broadcast slide
              </p>

            </div>

          )}

        </div>

      </div>

    </main>

  );
}