"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";







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
  handicap: number | null;
  strokeCategory: "men" | "ladies";
};

const defaultPlayers: Player[] = [
  {
    id: "p1",
    name: "Player 1",
    handicap: 0,
    strokeCategory: "men",
  },
  {
    id: "p2",
    name: "Player 2",
    handicap: 0,
    strokeCategory: "men",
  },
  {
    id: "p3",
    name: "Player 3",
    handicap: 0,
    strokeCategory: "men",
  },
  {
    id: "p4",
    name: "Player 4",
    handicap: 0,
    strokeCategory: "men",
  },
];

function slugifyCompanyName(name: string) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


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

function getPlayingHandicap(
  handicap: number | null
) {
  if (
    handicap === null ||
    !Number.isFinite(Number(handicap))
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.round(Number(handicap))
  );
}

function getPlayerStrokeIndex(
  hole: Hole,
  player: Player
) {
  return player.strokeCategory === "ladies"
    ? hole.ladiesStroke
    : hole.menStroke;
}

function getStrokesReceived(
  handicap: number | null,
  strokeIndex: number
) {
  const playingHandicap =
    getPlayingHandicap(handicap);

  const baseStrokes =
    Math.floor(playingHandicap / 18);

  const remainder =
    playingHandicap % 18;

  return (
    baseStrokes +
    (remainder >= strokeIndex ? 1 : 0)
  );
}

function getStablefordPoints(
  grossScore: number,
  hole: Hole,
  player: Player
) {
  const strokeIndex =
    getPlayerStrokeIndex(
      hole,
      player
    );

  const strokesReceived =
    getStrokesReceived(
      player.handicap,
      strokeIndex
    );

  const nettScore =
    grossScore - strokesReceived;

  const points =
    2 + (hole.par - nettScore);

  return Math.max(0, points);
}

const holeImages = [
  "/hero_main.png",
  "/hero_main2.png",
  "/hero-teez.jpg",
  "/match_create_1.png",
  "/profile_image_1.png",
];


function ScorecardSampleContent() {

 const searchParams = useSearchParams();
const router = useRouter();

const selectedTeam =
  searchParams.get("team") || "JK6";

const participantId =
  slugifyCompanyName(selectedTeam);

const golfdayId =
  "jk6-2026";

const [activeNine, setActiveNine] = useState<"front" | "back">("front");
const [players, setPlayers] = useState<Player[]>(defaultPlayers);
const [playersSaved, setPlayersSaved] = useState(false);
const [loadingPlayers, setLoadingPlayers] = useState(true);
const [scores, setScores] =
  useState<Record<string, string>>({});

const [points, setPoints] =
  useState<Record<string, number>>({});
const [isSaved, setIsSaved] = useState(false);
const [isFinalized, setIsFinalized] = useState(false);
const [updatedHoles, setUpdatedHoles] = useState<number[]>([]);

const visibleHoles =
  activeNine === "front"
    ? holes.filter((hole) => hole.hole <= 9)
    : holes.filter((hole) => hole.hole >= 10);

useEffect(() => {
  async function loadSavedScorecard() {
    try {
      setLoadingPlayers(true);

      const participantRef = doc(
        db,
        "golfdays",
        golfdayId,
        "participants",
        participantId
      );

      const participantSnap =
        await getDoc(participantRef);

      if (!participantSnap.exists()) {
        setPlayers(defaultPlayers);
        setPlayersSaved(false);
        setScores({});
        setPoints({});
        setUpdatedHoles([]);
        setIsFinalized(false);
        return;
      }

      const data =
        participantSnap.data();

      if (
        Array.isArray(data.players) &&
        data.players.length === 4
      ) {
        setPlayers(
          data.players.map(
            (
              player: {
                id?: string;
                name?: string;
                handicap?: number | null;
                strokeCategory?: "men" | "ladies";
              },
              index: number
            ) => ({
              id:
                player.id ||
                `p${index + 1}`,

              name:
                player.name ||
                `Player ${index + 1}`,

              handicap: 0,

              strokeCategory:
                player.strokeCategory ===
                "ladies"
                  ? "ladies"
                  : "men",
            })
          )
        );

        setPlayersSaved(true);
      } else {
        setPlayers(defaultPlayers);
        setPlayersSaved(false);
      }

      const savedScores:
        Record<string, string> = {};

      const savedPoints:
        Record<string, number> = {};

      if (data.scores) {
        Object.entries(
          data.scores
        ).forEach(
          ([holeKey, holeValue]) => {
            const holeNumber =
              Number(
                holeKey.replace(
                  "hole",
                  ""
                )
              );

            if (
              Number.isInteger(
                holeNumber
              ) &&
              Array.isArray(
                holeValue
              )
            ) {
              holeValue.forEach(
                (scoreItem: any) => {
                  const key =
                    `${holeNumber}-${scoreItem.playerId}`;

                  savedScores[key] =
                    String(
                      scoreItem.score ??
                      ""
                    );

                  savedPoints[key] =
                    Number(
                      scoreItem.points ||
                      0
                    );
                }
              );
            }
          }
        );
      }

      setScores(
        savedScores
      );

      setPoints(
        savedPoints
      );

      const savedUpdatedHoles =
        Object.keys(
          data.scores || {}
        )
          .map((key) =>
            Number(
              key.replace(
                "hole",
                ""
              )
            )
          )
          .filter((hole) =>
            Number.isInteger(
              hole
            )
          );

      setUpdatedHoles(
        savedUpdatedHoles
      );

      setIsFinalized(
        data.finalized === true
      );
    } catch (error) {
      console.error(error);

      setPlayers(
        defaultPlayers
      );

      setPlayersSaved(
        false
      );

      setScores({});

      setPoints({});

      setUpdatedHoles([]);

      setIsFinalized(
        false
      );
    } finally {
      setLoadingPlayers(
        false
      );
    }
  }

  loadSavedScorecard();
}, [participantId]);

function updatePlayerName(
  playerId: string,
  value: string
) {
  if (isFinalized) return;

  setPlayers((prev) =>
    prev.map((player) =>
      player.id === playerId
        ? {
            ...player,
            name: value,
          }
        : player
    )
  );

  setPlayersSaved(false);
}


function updatePlayerStrokeCategory(
  playerId: string,
  value: "men" | "ladies"
) {
  if (isFinalized) return;

  setPlayers((prev) =>
    prev.map((player) =>
      player.id === playerId
        ? {
            ...player,
            strokeCategory: value,
          }
        : player
    )
  );

  setPlayersSaved(false);
}



async function savePlayers() {
  const missingName = players.some(
    (player) =>
      player.name.trim() === ""
  );

  if (missingName) {
    alert("Please enter all 4 player names.");
    return;
  }

  

  try {
    const updateGolfDayParticipantPlayers =
      httpsCallable(
        functions,
        "updateGolfDayParticipantPlayers"
      );

    await updateGolfDayParticipantPlayers({
      golfdayId,
      participantId,
      players,
    });

    setPlayersSaved(true);

  alert(
  "Player details saved. All players play from handicap 0."
);


  } catch (error: any) {
    console.error(error);

    alert(
      error.message ||
        "Could not save player names."
    );
  }
}

function getScore(
  holeNumber: number,
  playerId: string
) {
  return scores[
    `${holeNumber}-${playerId}`
  ] || "";
}

function getPoints(
  holeNumber: number,
  playerId: string
) {
  return (
    points[
      `${holeNumber}-${playerId}`
    ] || 0
  );
}

function updateScore(
  holeNumber: number,
  playerId: string,
  value: string
) {
  if (isFinalized) return;

  setScores((prev) => ({
    ...prev,
    [`${holeNumber}-${playerId}`]:
      value,
  }));
}

const playerTotals =
  players.map((player) => {
    const total =
      holes.reduce(
        (sum, hole) =>
          sum +
          Number(
            points[
              `${hole.hole}-${player.id}`
            ] || 0
          ),
        0
      );

    return {
      ...player,
      total,
    };
  });

function getHoleTotal(
  holeNumber: number
) {
  return players.reduce(
    (sum, player) =>
      sum +
      Number(
        points[
          `${holeNumber}-${player.id}`
        ] || 0
      ),
    0
  );
}

const teamTotal =
  playerTotals.reduce(
    (sum, player) =>
      sum + player.total,
    0
  );

const allHolesUpdated =
  updatedHoles.length === 18;

async function saveHoleScore(
  holeNumber: number
) {
  if (!playersSaved) {
   alert(
  "Please save the player names and Men/Ladies selection first."
);
    return;
  }

  const hole =
    holes.find(
      (item) =>
        item.hole === holeNumber
    );

  if (!hole) {
    alert(
      "Hole could not be found."
    );
    return;
  }

  const holeComplete =
    players.every(
      (player) =>
        getScore(
          holeNumber,
          player.id
        ) !== ""
    );

  if (!holeComplete) {
    alert(
      `Please complete all player scores for hole ${holeNumber}.`
    );
    return;
  }

  const holeScores =
    players.map((player) => {
      const grossScore =
        Number(
          getScore(
            holeNumber,
            player.id
          )
        );

      const strokeIndex =
        getPlayerStrokeIndex(
          hole,
          player
        );

      const strokesReceived =
        getStrokesReceived(
          player.handicap,
          strokeIndex
        );

      const nettScore =
        grossScore -
        strokesReceived;

      const stablefordPoints =
        getStablefordPoints(
          grossScore,
          hole,
          player
        );

      return {
        playerId:
          player.id,

        score:
          grossScore,

        points:
          stablefordPoints,

        strokeIndex,

        strokesReceived,

        nettScore,
      };
    });

  const nextScores = {
    ...scores,
  };

  const nextPoints = {
    ...points,
  };

  holeScores.forEach(
    (holeScore) => {
      const key =
        `${holeNumber}-${holeScore.playerId}`;

      nextScores[key] =
        String(
          holeScore.score
        );

      nextPoints[key] =
        holeScore.points;
    }
  );

  const nextUpdatedHoles =
    updatedHoles.includes(
      holeNumber
    )
      ? updatedHoles
      : [
          ...updatedHoles,
          holeNumber,
        ];

  const nextPlayerPointTotals =
    players.map((player) =>
      holes.reduce(
        (sum, currentHole) =>
          sum +
          Number(
            nextPoints[
              `${currentHole.hole}-${player.id}`
            ] || 0
          ),
        0
      )
    );

  const nextTotalScore =
    nextPlayerPointTotals.reduce(
      (sum, total) =>
        sum + total,
      0
    );

  try {
    const updateGolfDayParticipantScore =
      httpsCallable(
        functions,
        "updateGolfDayParticipantScore"
      );

    await updateGolfDayParticipantScore({
      golfdayId,
      participantId,
      holeNumber,
      holeScores,
      totalScore:
        nextTotalScore,
    });

    setScores(
      nextScores
    );

    setPoints(
      nextPoints
    );

    setUpdatedHoles(
      nextUpdatedHoles
    );

    setIsSaved(true);

    alert(
      `Hole ${holeNumber} saved to Firestore.`
    );
  } catch (error: any) {
    console.error(error);

    alert(
      error.message ||
        `Could not save hole ${holeNumber}.`
    );
  }
}

function finalizeRound() {
  if (!allHolesUpdated) {
    alert("Please update all 18 holes before finalizing.");
    return;
  }

  setIsSaved(true);
  setIsFinalized(true);

  alert("Round finalized. Scorecard is now locked.");
}

  function reopenScorecard() {
    setIsFinalized(false);
    alert("Scorecard reopened for editing.");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="w-full max-w-[430px] mx-auto bg-[#04100d] min-h-screen pb-52">

        {/* LOGO HEADER */}

        <section className="relative bg-black overflow-hidden">
          <div className="relative min-h-[260px] flex items-center justify-center px-4 pt-8">
            <img
              src="/jk6_logo.png"
              alt="JK6"
              className="absolute inset-0 w-full h-full object-contain opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black" />
          </div>

          <div className="relative z-10 px-4 pb-6 pt-5 bg-black">
            <h1 className="text-3xl font-black leading-tight text-red-500 animate-pulse drop-shadow-[0_0_14px_rgba(239,68,68,1)]">
              JK6 Annual Fundraiser Golf Day 2026
            </h1>

            <p className="text-lg font-black text-cyan-300 mt-3 animate-pulse drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
              4 Ball Alliance · Scramble Drive · Mystery Count
            </p>
          </div>
        </section>

        {/* EVENT INFO */}

        <section className="px-3 grid gap-3 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-2">📍</div>

              <h2 className="font-black leading-tight text-sm">
                Woodhill Residential Estate & Country Club
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Pretoria East · Par 72
              </p>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-2">👥</div>

             <h2 className="font-black text-base">
  {selectedTeam}
</h2>

              <p className="text-xs text-gray-400 mt-1">
                Team / Company
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-1">⛳</div>

              <h3 className="text-lg font-black">
                18 Holes
              </h3>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
              <div className="text-green-400 text-2xl mb-1">🕚</div>

              <h3 className="text-lg font-black">
                10:00am
              </h3>

              <p className="text-xs text-gray-400">
                Shotgun Start
              </p>
            </div>
          </div>

       <div className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-3">
  <p className="text-[10px] tracking-[0.25em] text-gray-400 font-bold mb-3">
    PLAYERS IN YOUR TEAM
  </p>

<div className="grid gap-3">
  {players.map((player, index) => (
  <div
  key={player.id}
  className="
    grid
    grid-cols-[38px_1fr_66px_78px]
    gap-2
    items-center
  "
>
      <p className="text-xs text-gray-400 font-bold">
        P{index + 1}
      </p>

      <input
        value={player.name}
        onChange={(e) =>
          updatePlayerName(
            player.id,
            e.target.value
          )
        }
        disabled={isFinalized}
        placeholder={`Player ${index + 1}`}
        className="
          min-w-0
          bg-black/40
          border
          border-white/10
          rounded-xl
          px-3
          py-2
          text-sm
          font-bold
          disabled:opacity-40
        "
      />

     <div
  className="
    w-full
    bg-black/60
    border
    border-green-400/30
    rounded-xl
    px-2
    py-2
    text-center
    text-sm
    font-black
    text-green-400
  "
>
  0
</div>

<select
  value={player.strokeCategory}
  onChange={(e) =>
    updatePlayerStrokeCategory(
      player.id,
      e.target.value as "men" | "ladies"
    )
  }
  disabled={isFinalized}
  className="
    w-full
    bg-black/40
    border
    border-cyan-400/30
    rounded-xl
    px-1
    py-2
    text-xs
    font-black
    text-cyan-300
    disabled:opacity-40
  "
>
  <option value="men">
    MEN
  </option>

  <option value="ladies">
    LADIES
  </option>
</select>

    </div>
  ))}
</div>

  <button
    onClick={savePlayers}
    disabled={isFinalized || loadingPlayers}
    className="
      w-full
      mt-3
      bg-cyan-400
      text-black
      rounded-xl
      py-3
      font-black
      text-sm
      disabled:opacity-40
    "
  >
  {loadingPlayers
  ? "LOADING PLAYERS..."
  : playersSaved
    ? "PLAYERS SAVED"
    : "SAVE PLAYERS"}
  </button>
</div>
        </section>

        {/* TABS */}

        <section className="px-3 mt-5">
          <div className="grid grid-cols-2 border border-cyan-400/40 rounded-2xl overflow-hidden">
            <button
              onClick={() => setActiveNine("front")}
              className={`py-4 font-black ${
                activeNine === "front"
                  ? "bg-green-400 text-black"
                  : "bg-black/40 text-gray-300"
              }`}
            >
              Front 9
            </button>

            <button
              onClick={() => setActiveNine("back")}
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
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.78)), url('${
                      holeImages[index % holeImages.length]
                    }')`,
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
                </div>

                <div className="py-4 pr-3 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-green-400 text-lg font-black">
                      Par {hole.par}
                    </p>

                    <span className="text-gray-500">|</span>

                    <p className="text-gray-300 text-sm">
                      Men SI{" "}
                      <span className="text-green-400 font-black">
                        {hole.menStroke}
                      </span>
                    </p>

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

<div className="grid grid-cols-[1fr_54px_48px] gap-2 mb-1 px-1">
  <p className="text-[9px] text-gray-500 font-black">
    PLAYER
  </p>

  <p className="text-[9px] text-gray-500 font-black text-center">
    SCORE
  </p>

  <p className="text-[9px] text-green-400 font-black text-center">
    PTS
  </p>
</div>



                  <div className="grid gap-2">
                    {players.map((player) => (
  <div
    key={player.id}
    className="
      grid
      grid-cols-[1fr_54px_48px]
      gap-2
      items-center
      min-w-0
    "
  >
    <div className="bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-xs truncate min-w-0">
      {player.name}
    </div>

    <input
      value={
        getScore(
          hole.hole,
          player.id
        )
      }
      onChange={(e) =>
        updateScore(
          hole.hole,
          player.id,
          e.target.value
        )
      }
      disabled={isFinalized}
      type="number"
      min="1"
      max="15"
      inputMode="numeric"
      placeholder="–"
      className="
        w-full
        bg-black/40
        border
        border-cyan-400/30
        rounded-xl
        px-1
        py-2
        text-center
        text-lg
        font-black
        disabled:opacity-40
      "
    />

    <div
      className="
        border
        border-green-400/30
        rounded-xl
        py-2
        text-center
        text-lg
        font-black
        text-green-400
      "
    >
      {getPoints(
        hole.hole,
        player.id
      )}
    </div>
  </div>
))}
                  </div>

                  <div className="grid grid-cols-[1fr_54px] gap-2 items-center mt-3 min-w-0">
  <p className="font-bold text-gray-300 text-sm">
  Hole Points
</p>

  <div className="border border-green-400/40 rounded-xl px-1 py-2 text-center text-lg font-black text-green-400">
    {getHoleTotal(hole.hole)}
  </div>
</div>

<button
  onClick={() => saveHoleScore(hole.hole)}
  disabled={isFinalized}
  className="w-full mt-3 bg-cyan-400 text-black rounded-xl py-3 font-black text-sm disabled:opacity-40"
>
{updatedHoles.includes(hole.hole)
  ? `HOLE ${hole.hole} UPDATED`
  : `UPDATE HOLE ${hole.hole} SCORE`}
</button>
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
  TEAM POINTS
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

      {!isFinalized && allHolesUpdated && (
        <button
          onClick={finalizeRound}
          className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-sm animate-pulse shadow-[0_0_22px_rgba(239,68,68,1)]"
        >
          FINALIZE ROUND
        </button>
      )}

      {isFinalized && (
        <button
          onClick={reopenScorecard}
          className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-sm"
        >
          REOPEN SCORECARD
        </button>
      )}

      <button
        onClick={() =>
          router.push("/teez-scoring/corporate-days/jk6-2026/companies")
        }
        className="
          w-full
          mt-3
          bg-white/10
          border
          border-white/10
          text-white
          rounded-2xl
          py-4
          font-black
          hover:border-cyan-400
          hover:text-cyan-300
          transition
        "
      >
        BACK TO COMPANIES
      </button>

      <p className="text-[10px] text-center text-gray-500 mt-2">
        {isFinalized
          ? "Finalized and locked"
          : `${updatedHoles.length}/18 holes updated`}
      </p>
    </div>
  </div>
</section>

      </div>
    </main>
  );
}

export default function ScorecardSamplePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-green-400 font-black">
            Loading scorecard...
          </p>
        </main>
      }
    >
      <ScorecardSampleContent />
    </Suspense>
  );
}