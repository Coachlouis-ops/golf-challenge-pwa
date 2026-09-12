"use client";

import { useMemo, useState } from "react";

type Hole = {
  hole: number;
  par: number;
  menStroke: number;
  ladiesStroke: number;
  club: number;
  championship: number;
  ladies: number;
};

type Player = {
  id: string;
  name: string;
};

const players: Player[] = [
  { id: "p1", name: "Louis Coetzee" },
  { id: "p2", name: "Jaco Smith" },
  { id: "p3", name: "Pieter van der Merwe" },
  { id: "p4", name: "Mark Jacobs" },
];

const holes: Hole[] = [
  { hole: 1, par: 4, menStroke: 3, ladiesStroke: 7, club: 344, championship: 398, ladies: 290 },
  { hole: 2, par: 3, menStroke: 9, ladiesStroke: 15, club: 196, championship: 212, ladies: 112 },
  { hole: 3, par: 5, menStroke: 7, ladiesStroke: 1, club: 539, championship: 550, ladies: 473 },
  { hole: 4, par: 4, menStroke: 1, ladiesStroke: 3, club: 430, championship: 442, ladies: 377 },
  { hole: 5, par: 5, menStroke: 11, ladiesStroke: 5, club: 512, championship: 522, ladies: 421 },
  { hole: 6, par: 4, menStroke: 13, ladiesStroke: 13, club: 372, championship: 383, ladies: 309 },
  { hole: 7, par: 3, menStroke: 15, ladiesStroke: 11, club: 169, championship: 186, ladies: 147 },
  { hole: 8, par: 4, menStroke: 5, ladiesStroke: 9, club: 428, championship: 451, ladies: 351 },
  { hole: 9, par: 4, menStroke: 17, ladiesStroke: 17, club: 335, championship: 361, ladies: 289 },

  { hole: 10, par: 4, menStroke: 6, ladiesStroke: 8, club: 339, championship: 386, ladies: 290 },
  { hole: 11, par: 5, menStroke: 18, ladiesStroke: 16, club: 476, championship: 492, ladies: 448 },
  { hole: 12, par: 3, menStroke: 12, ladiesStroke: 12, club: 179, championship: 202, ladies: 132 },
  { hole: 13, par: 4, menStroke: 2, ladiesStroke: 6, club: 346, championship: 364, ladies: 305 },
  { hole: 14, par: 4, menStroke: 8, ladiesStroke: 4, club: 394, championship: 408, ladies: 353 },
  { hole: 15, par: 4, menStroke: 16, ladiesStroke: 18, club: 304, championship: 314, ladies: 264 },
  { hole: 16, par: 3, menStroke: 14, ladiesStroke: 14, club: 164, championship: 184, ladies: 130 },
  { hole: 17, par: 5, menStroke: 10, ladiesStroke: 10, club: 487, championship: 499, ladies: 427 },
  { hole: 18, par: 4, menStroke: 4, ladiesStroke: 2, club: 383, championship: 398, ladies: 341 },
];

const holeImages = [
  "/hero_main.png",
  "/hero_main2.png",
  "/hero-teez.jpg",
  "/match_create_1.png",
  "/profile_image_1.png",
];

export default function ScorecardSamplePage() {
  const [activeNine, setActiveNine] =
    useState<"front" | "back">("front");

  const [scores, setScores] =
    useState<Record<string, string>>({});

  const visibleHoles = holes.filter((hole) =>
    activeNine === "front"
      ? hole.hole <= 9
      : hole.hole >= 10
  );

  function updateScore(
    hole: number,
    playerId: string,
    value: string
  ) {
    const cleanValue =
      value === ""
        ? ""
        : String(
            Math.max(
              0,
              Math.min(
                10,
                Number(value) || 0
              )
            )
          );

    setScores((prev) => ({
      ...prev,
      [`${hole}-${playerId}`]: cleanValue,
    }));
  }

  function getScore(
    hole: number,
    playerId: string
  ) {
    return scores[`${hole}-${playerId}`] || "";
  }

  function getHoleTotal(hole: number) {
    return players.reduce(
      (total, player) =>
        total +
        (Number(
          getScore(hole, player.id)
        ) || 0),
      0
    );
  }

  const playerTotals = useMemo(() => {
    return players.map((player) => ({
      ...player,
      total: holes.reduce(
        (total, hole) =>
          total +
          (Number(
            getScore(
              hole.hole,
              player.id
            )
          ) || 0),
        0
      ),
    }));
  }, [scores]);

  const teamTotal =
    playerTotals.reduce(
      (total, player) =>
        total + player.total,
      0
    );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="w-full max-w-[430px] mx-auto bg-[#04100d] min-h-screen pb-44">

        {/* HERO */}

        <section
          className="relative px-4 pt-7 pb-6 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.95)), url('/hero_main.png')",
          }}
        >
          <div className="flex items-start justify-between mb-7">

            <div>
              <div className="text-4xl font-black tracking-tight">
                TEEZ
              </div>

              <div className="text-[10px] tracking-[0.35em] text-gray-300">
                GOLF SCORING
              </div>
            </div>

            <div className="text-right text-[10px] tracking-[0.22em] text-green-400 font-bold">
              MORE THAN A SCORE
              <br />
              A BETTER GAME
            </div>

          </div>

          <h1 className="text-3xl font-black leading-tight">
            Woodhill Corporate Golf Day
          </h1>

          <p className="text-lg font-bold text-gray-300 mt-2">
            4 Ball Alliance
          </p>
        </section>

        {/* EVENT INFO */}

        <section className="px-3 grid gap-3 -mt-2">

          <div className="grid grid-cols-2 gap-3">

            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-2">
                📍
              </div>

              <h2 className="font-black leading-tight text-sm">
                Woodhill Residential Estate & Country Club
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Pretoria East · Par 72
              </p>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-2">
                👥
              </div>

              <h2 className="font-black text-base">
                Vector Carts
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Team / Company
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-1">
                ⛳
              </div>

              <h3 className="text-lg font-black">
                Tee 1
              </h3>

              <p className="text-xs text-gray-400">
                Start Hole
              </p>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-1">
                🕘
              </div>

              <h3 className="text-lg font-black">
                09:20
              </h3>

              <p className="text-xs text-gray-400">
                Tee Time
              </p>
            </div>

          </div>

          <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
            <p className="text-[10px] tracking-[0.25em] text-gray-400 font-bold mb-3">
              PLAYERS IN YOUR TEAM
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="font-bold truncate"
                >
                  ♙ {player.name}
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* TABS */}

        <section className="px-3 mt-5">
          <div className="grid grid-cols-2 border border-cyan-400/40 rounded-2xl overflow-hidden">

            <button
              onClick={() =>
                setActiveNine("front")
              }
              className={`py-4 font-black ${
                activeNine === "front"
                  ? "bg-green-400 text-black"
                  : "bg-black/40 text-gray-300"
              }`}
            >
              Front 9
            </button>

            <button
              onClick={() =>
                setActiveNine("back")
              }
              className={`py-4 font-black ${
                activeNine === "back"
                  ? "bg-green-400 text-black"
                  : "bg-black/40 text-gray-300"
              }`}
            >
              Back 9
            </button>

          </div>
        </section>

        {/* HOLE CARDS */}

        <section className="px-3 mt-5 grid gap-4">

          {visibleHoles.map((hole, index) => (

            <div
              key={hole.hole}
              className="bg-cyan-950/30 border border-cyan-400/30 rounded-3xl overflow-hidden"
            >
              <div className="grid grid-cols-[105px_1fr] gap-3">

                <div
                  className="min-h-[235px] bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      `linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.78)), url('${holeImages[index % holeImages.length]}')`,
                  }}
                >
                  <div className="absolute top-4 left-3">
                    <p className="text-[9px] tracking-[0.35em]">
                      HOLE
                    </p>

                    <p className="text-6xl font-black">
                      {hole.hole}
                    </p>
                  </div>

                  <p className="absolute bottom-4 left-3 text-[9px] tracking-[0.25em] font-bold">
                    TEEZ
                    <br />
                    GOLF
                    <br />
                    SCORING
                  </p>
                </div>

                <div className="py-4 pr-3 min-w-0">

 <div className="flex flex-wrap items-center gap-2 mb-2">
  <p className="text-green-400 text-lg font-black">
    Par {hole.par}
  </p>

  <span className="text-gray-500">
    |
  </span>

  <p className="text-gray-300 text-sm">
    Men SI{" "}
    <span className="text-green-400 font-black">
      {hole.menStroke}
    </span>
  </p>

  <span className="text-gray-500">
    |
  </span>

  <p className="text-gray-300 text-sm">
    Ladies SI{" "}
    <span className="text-pink-300 font-black">
      {hole.ladiesStroke}
    </span>
  </p>
</div>

                  <p className="text-[10px] text-gray-500 mb-3">
                    Club {hole.club}m · Champ {hole.championship}m · Ladies {hole.ladies}m
                  </p>

                  <div className="grid gap-2">

                    {players.map((player) => (

                      <div
                        key={player.id}
                        className="grid grid-cols-[1fr_54px] gap-2 items-center min-w-0"
                      >
                        <div className="bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs truncate min-w-0">
                          {player.name}
                        </div>

                        <input
                          value={getScore(
                            hole.hole,
                            player.id
                          )}
                          onChange={(e) =>
                            updateScore(
                              hole.hole,
                              player.id,
                              e.target.value
                            )
                          }
                          type="number"
                          min="0"
                          max="10"
                          inputMode="numeric"
                          placeholder="–"
                          className="w-full bg-black/40 border border-cyan-400/30 rounded-xl px-1 py-2 text-center text-lg font-black"
                        />
                      </div>

                    ))}

                  </div>

                  <div className="grid grid-cols-[1fr_54px] gap-2 items-center mt-3 min-w-0">
                    <p className="font-bold text-gray-300 text-sm">
                      Hole Total
                    </p>

                    <div className="border border-green-400/40 rounded-xl px-1 py-2 text-center text-lg font-black text-green-400">
                      {getHoleTotal(hole.hole)}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          ))}

        </section>

        {/* STICKY TOTAL */}

        <section className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-green-400/30 p-2">
          <div className="w-full max-w-[430px] mx-auto">

            <div className="bg-cyan-950/50 border border-cyan-400/30 rounded-3xl p-3">

              <div className="grid grid-cols-[96px_1fr] gap-3 items-center mb-3">

                <div>
                  <p className="text-[10px] text-gray-400 font-bold">
                    CURRENT TEAM TOTAL
                  </p>

                  <p className="text-4xl font-black text-green-400">
                    {teamTotal}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-1 text-center text-[10px]">

                  {playerTotals.map((player) => (

                    <div key={player.id}>
                      <p className="text-gray-400 truncate">
                        {player.name.split(" ")[0]}
                      </p>

                      <p className="text-xl font-black">
                        {player.total}
                      </p>
                    </div>

                  ))}

                </div>

              </div>

              <button className="w-full bg-green-400 text-black py-4 rounded-2xl font-black text-lg">
                SUBMIT SCORECARD
              </button>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}