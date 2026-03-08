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
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item) => {
          const isSelected = selected === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`px-3 py-2 rounded-full border text-sm ${
                isSelected
                  ? "bg-green-500 text-black border-green-500 font-semibold"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CreateChallengePage() {
  const router = useRouter();

  const [challengeTitle, setChallengeTitle] = useState("");
  const [entryTokens, setEntryTokens] = useState<number>(0);
  const [teamFormat, setTeamFormat] = useState("");
  const [gameFormat, setGameFormat] = useState("");
  const [typeOfGame, setTypeOfGame] = useState("");
  const [scoringMethod, setScoringMethod] = useState("");
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid =
    challengeTitle.trim().length > 0 &&
    entryTokens > 0 &&
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
        entryTokens,
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
      <main className="min-h-screen max-w-3xl mx-auto p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Create Challenge</h1>

        <input
          placeholder="Challenge Title"
          value={challengeTitle}
          onChange={(e) => setChallengeTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Entry Tokens"
          value={entryTokens}
          onChange={(e) => setEntryTokens(Number(e.target.value))}
          className="border p-2 rounded"
        />

        <input
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border p-2 rounded"
        />

        <CapsuleGroup
          title="Team Format"
          items={TEAM_FORMATS}
          selected={teamFormat}
          onSelect={setTeamFormat}
        />

        <CapsuleGroup
          title="Game Format"
          items={GAME_FORMATS}
          selected={gameFormat}
          onSelect={setGameFormat}
        />

        <CapsuleGroup
          title="Type Of Game"
          items={TYPE_OF_GAME}
          selected={typeOfGame}
          onSelect={setTypeOfGame}
        />

        <CapsuleGroup
          title="Scoring Method"
          items={SCORING_METHODS}
          selected={scoringMethod}
          onSelect={setScoringMethod}
        />

        <button
          onClick={handleCreate}
          disabled={!isValid || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Challenge"}
        </button>
      </main>
    </RequireAuth>
  );
}
