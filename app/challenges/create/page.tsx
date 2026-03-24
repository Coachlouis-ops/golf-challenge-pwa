"use client";

import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";
import { functions } from "@/src/lib/firebase";
import RequireAuth from "@/src/lib/RequireAuth";

const TEAM_FORMATS = ["SINGLES", "PAIR", "FOURBALL"];

const GAME_FORMATS = [
  "STROKE_PLAY",
  "NETT_PLAY",
  "POINTS_GAME",
  "MATCH_PLAY",
];

const TYPE_OF_GAME = [
  "SINGLES",
  "BETTER_BALL",
  "WORST_BALL",
  "AGGREGATE",
  "MULTIPLICATION",
  "NASSAU",
  "SKINS",
  "SIX_SIX_SIX",
  "QUOTA",
  "WOLF",
  "LONE_RANGER",
  "CHICAGO",
  "FLAGS",
  "VEGAS",
];

const TYPE_DESCRIPTIONS: Record<string, string> = {
  SINGLES: "Each player competes individually. Best total score wins.",
  BETTER_BALL: "Team of 2. Best score per hole counts.",
  WORST_BALL: "Team of 2. Worst score per hole counts.",
  AGGREGATE: "All team scores are added together.",
  MULTIPLICATION: "Scores multiplied per hole. Big swings.",
  NASSAU: "Front 9, Back 9, Overall.",
  SKINS: "Each hole is a prize. Ties carry over.",
  SIX_SIX_SIX: "Different format every 6 holes.",
  QUOTA: "Players aim to beat a target.",
  WOLF: "Rotating captain selects teams.",
  LONE_RANGER: "One player rotates as solo scorer.",
  CHICAGO: "Points system starting negative.",
  FLAGS: "Flag placed when strokes run out.",
  VEGAS: "Scores combined into a number (e.g. 45).",
};

const SCORING_METHODS = ["STROKES", "POINTS"];

function CapsuleGroup({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: string[];
  selected: string;
  onSelect: (val: string) => void;
}) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-green-400 tracking-wider">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isSelected = selected === item;
          const showTooltip = activeTooltip === item;

          return (
            <div key={item} className="relative">
              <button
                type="button"
                onClick={() => {
                  onSelect(item);
                  setActiveTooltip((prev) => (prev === item ? null : item));
                }}
                onTouchStart={() => {
                  setActiveTooltip((prev) => (prev === item ? null : item));
                }}
                className={`px-3 py-2 rounded-full border text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition-all duration-300
              ${
                isSelected
                  ? "bg-green-400 text-black border-green-400 shadow-[0_0_20px_#39FF14] scale-105"
                  : "bg-neutral-800 text-gray-300 border-neutral-600 hover:border-green-400 hover:shadow-[0_0_10px_#39FF14]"
              }`}
              >
                {item}
              </button>

              {title === "Type Of Game" && showTooltip && (
                <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 p-3 text-xs bg-black border border-green-400 rounded-lg shadow-[0_0_15px_#39FF14] text-gray-200">
                  {TYPE_DESCRIPTIONS[item]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CreateChallengePage() {
  const router = useRouter();

  const [challengeTitle, setChallengeTitle] = useState("");
  const [entryTokens, setEntryTokens] = useState<string>("");
  const [teamFormat, setTeamFormat] = useState("");
  const [gameFormat, setGameFormat] = useState("");
  const [typeOfGame, setTypeOfGame] = useState("");
  const [scoringMethod, setScoringMethod] = useState("");
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    challengeTitle.trim().length > 0 &&
    Number(entryTokens) > 0 &&
    teamFormat &&
    gameFormat &&
    typeOfGame &&
    scoringMethod &&
    courseName.trim().length > 0;

  async function handleCreate() {
    if (!isValid) {
      alert("Please complete all fields correctly.");
      return;
    }

    try {
      setLoading(true);

      const createChallenge = httpsCallable(functions, "createChallenge");

      const result: any = await createChallenge({
        challengeTitle: challengeTitle.trim(),
        entryTokens: Number(entryTokens),
        teamFormat,
        gameFormat,
        typeOfGame,
        scoringMethod,
        courseName: courseName.trim(),
      });

      const challengeId = result.data.challengeId;

      router.push(`/challenges/${challengeId}`);
    } catch (err: any) {
      alert(err.message || "Failed to create challenge");
    } finally {
      setLoading(false);
    }
  }

  return (
    <RequireAuth>
      <main className="min-h-screen flex justify-center items-center px-4 py-16 text-white relative overflow-hidden bg-black">

        <div className="absolute inset-0 opacity-20 animate-pulse pointer-events-none bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-green-400 opacity-10 blur-[120px] animate-pulse"></div>
        </div>

        <img
          src="/badger-left.png"
          className="hidden lg:block absolute left-0 bottom-0 h-[90%] opacity-25 animate-pulse"
        />

        <img
          src="/badger-right.png"
          className="hidden lg:block absolute right-0 bottom-0 h-[90%] opacity-25 animate-pulse"
        />

        <div className="relative z-10 w-full max-w-3xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(0,255,120,0.25)] flex flex-col gap-7">

          <h1 className="text-2xl sm:text-4xl font-bold text-green-400 text-center tracking-widest drop-shadow-[0_0_10px_#39FF14]">
            CREATE CHALLENGE
          </h1>

          <input
            placeholder="Challenge Title"
            value={challengeTitle}
            onChange={(e) => setChallengeTitle(e.target.value)}
            className="bg-black border border-neutral-700 focus:border-green-400 rounded p-3 outline-none transition-all focus:shadow-[0_0_10px_#39FF14]"
          />

          <input
            type="number"
            placeholder="Entry Tokens"
            value={entryTokens}
            onChange={(e) => setEntryTokens(e.target.value)}
            className="bg-black border border-neutral-700 focus:border-green-400 rounded p-3 outline-none transition-all focus:shadow-[0_0_10px_#39FF14]"
          />

          <input
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="bg-black border border-neutral-700 focus:border-green-400 rounded p-3 outline-none transition-all focus:shadow-[0_0_10px_#39FF14]"
          />

          <CapsuleGroup title="Team Format" items={TEAM_FORMATS} selected={teamFormat} onSelect={setTeamFormat} />
          <CapsuleGroup title="Game Format" items={GAME_FORMATS} selected={gameFormat} onSelect={setGameFormat} />
          <CapsuleGroup title="Type Of Game" items={TYPE_OF_GAME} selected={typeOfGame} onSelect={setTypeOfGame} />
          <CapsuleGroup title="Scoring Method" items={SCORING_METHODS} selected={scoringMethod} onSelect={setScoringMethod} />

          <button
            onClick={handleCreate}
            disabled={!isValid || loading}
            className="mt-6 py-4 rounded-xl font-bold text-black text-lg bg-green-400 hover:bg-green-300 transition-all duration-300 shadow-[0_0_25px_#39FF14] hover:shadow-[0_0_50px_#39FF14] disabled:opacity-50"
          >
            {loading ? "Creating Challenge..." : "CREATE CHALLENGE"}
          </button>

          <div className="w-full h-[3px] bg-neutral-800 overflow-hidden rounded-full">
            <div className="h-full w-1/2 bg-green-400 animate-[pulse_2s_infinite]"></div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-center text-xs text-gray-400 hover:text-green-400 transition-all mt-4"
          >
            ← Back to Dashboard
          </button>

        </div>
      </main>
    </RequireAuth>
  );
}