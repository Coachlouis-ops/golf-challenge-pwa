"use client";

import { useState, useEffect, useRef } from "react";
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

const GAME_PRESETS = [
  {
    name: "CLASSIC MATCHPLAY",
    teamFormat: "SINGLES",
    gameFormat: "MATCH_PLAY",
    typeOfGame: "SINGLES",
    scoringMethod: "POINTS",
  },

  {
    name: "SOCIAL BETTER BALL",
    teamFormat: "PAIR",
    gameFormat: "POINTS_GAME",
    typeOfGame: "BETTER_BALL",
    scoringMethod: "POINTS",
  },

  {
    name: "TOURNAMENT STROKE PLAY",
    teamFormat: "SINGLES",
    gameFormat: "STROKE_PLAY",
    typeOfGame: "SINGLES",
    scoringMethod: "STROKES",
  },

  {
    name: "HIGH STAKES VEGAS",
    teamFormat: "PAIR",
    gameFormat: "POINTS_GAME",
    typeOfGame: "VEGAS",
    scoringMethod: "POINTS",
  },

  {
    name: "WEEKEND SKINS",
    teamFormat: "SINGLES",
    gameFormat: "POINTS_GAME",
    typeOfGame: "SKINS",
    scoringMethod: "POINTS",
  },
];

const GAME_ENGINE: Record<
  string,
  {
    description: string;
    gameplay: string;
    outcome: string;
    recommendedTeam: string[];
    recommendedScoring: string[];
    players: string;
    atmosphere: string;
    warning?: string;
  }
> = {
  SINGLES: {
    description:
      "Classic individual golf competition where every player competes for the best overall result.",
    gameplay:
      "Each golfer plays their own round independently with no shared scoring.",
    outcome:
      "Lowest strokes or highest points wins depending on scoring setup.",
    recommendedTeam: ["SINGLES"],
    recommendedScoring: ["STROKES", "POINTS"],
    players: "2+ Players",
    atmosphere: "Competitive / Traditional",
  },

  BETTER_BALL: {
    description:
      "Two-player teams where the best score on each hole counts for the team.",
    gameplay:
      "Partners support each other while only the strongest score contributes.",
    outcome:
      "Team with best cumulative hole performance wins.",
    recommendedTeam: ["PAIR", "FOURBALL"],
    recommendedScoring: ["POINTS", "STROKES"],
    players: "4+ Players",
    atmosphere: "Strategic / Team Based",
  },

  WORST_BALL: {
    description:
      "Team pressure format where the worst score on each hole counts.",
    gameplay:
      "Every player matters because mistakes heavily impact the team.",
    outcome:
      "Lowest total worst-ball score wins.",
    recommendedTeam: ["PAIR", "FOURBALL"],
    recommendedScoring: ["STROKES"],
    players: "4+ Players",
    atmosphere: "High Pressure / Punishing",
  },

  AGGREGATE: {
    description:
      "All team scores combine together for a full team total.",
    gameplay:
      "Every score contributes directly to the final outcome.",
    outcome:
      "Lowest combined team score wins.",
    recommendedTeam: ["PAIR", "FOURBALL"],
    recommendedScoring: ["STROKES"],
    players: "4+ Players",
    atmosphere: "Balanced Team Competition",
  },

  MULTIPLICATION: {
    description:
      "Aggressive scoring format multiplying scores for dramatic swings.",
    gameplay:
      "One bad hole can massively affect the standings.",
    outcome:
      "Lowest multiplied total wins.",
    recommendedTeam: ["PAIR"],
    recommendedScoring: ["POINTS"],
    players: "2-4 Players",
    atmosphere: "High Risk / Explosive",
  },

  NASSAU: {
    description:
      "Traditional three-part match separating front 9, back 9 and overall.",
    gameplay:
      "Players compete across multiple mini-matches in one round.",
    outcome:
      "Separate winners for front, back and total match.",
    recommendedTeam: ["SINGLES", "PAIR"],
    recommendedScoring: ["POINTS"],
    players: "2-4 Players",
    atmosphere: "Classic Betting Match",
  },

  SKINS: {
    description:
      "Each hole becomes its own individual prize challenge.",
    gameplay:
      "Winning a hole outright earns the skin. Ties carry over.",
    outcome:
      "Player/team with most skins wins.",
    recommendedTeam: ["SINGLES", "PAIR"],
    recommendedScoring: ["POINTS"],
    players: "2+ Players",
    atmosphere: "Aggressive / Momentum Based",
  },

  SIX_SIX_SIX: {
    description:
      "The format changes every six holes creating strategic variety.",
    gameplay:
      "Different scoring systems rotate throughout the round.",
    outcome:
      "Best adapted overall performance wins.",
    recommendedTeam: ["PAIR", "FOURBALL"],
    recommendedScoring: ["POINTS"],
    players: "4+ Players",
    atmosphere: "Fun / Dynamic",
  },

  QUOTA: {
    description:
      "Players compete against a target quota based on handicap ability.",
    gameplay:
      "Stableford-style points are compared to personal targets.",
    outcome:
      "Player exceeding quota by the largest margin wins.",
    recommendedTeam: ["SINGLES"],
    recommendedScoring: ["POINTS"],
    players: "2+ Players",
    atmosphere: "Fair Handicap Competition",
  },

  WOLF: {
    description:
      "Rotating captain format with strategic partner selection.",
    gameplay:
      "Each hole has a designated Wolf who chooses to play solo or with a partner.",
    outcome:
      "Highest accumulated points wins.",
    recommendedTeam: ["FOURBALL"],
    recommendedScoring: ["POINTS"],
    players: "4 Players",
    atmosphere: "Strategic / Social Pressure",
    warning:
      "WOLF works best with exactly 4 players.",
  },

  LONE_RANGER: {
    description:
      "One rotating player becomes the designated counted score.",
    gameplay:
      "Each hole requires a specific player's score to count.",
    outcome:
      "Best managed rotation strategy wins.",
    recommendedTeam: ["FOURBALL"],
    recommendedScoring: ["POINTS"],
    players: "4 Players",
    atmosphere: "Team Strategy",
  },

  CHICAGO: {
    description:
      "Points-based format where players start with negative values.",
    gameplay:
      "Strong holes progressively erase negative starting points.",
    outcome:
      "Highest final adjusted points wins.",
    recommendedTeam: ["SINGLES"],
    recommendedScoring: ["POINTS"],
    players: "2+ Players",
    atmosphere: "Recovery / Momentum",
  },

  FLAGS: {
    description:
      "Players continue until allocated strokes are exhausted.",
    gameplay:
      "A flag marks the exact finishing position when strokes run out.",
    outcome:
      "Player reaching furthest wins.",
    recommendedTeam: ["SINGLES"],
    recommendedScoring: ["STROKES"],
    players: "2+ Players",
    atmosphere: "Survival Challenge",
  },

  VEGAS: {
    description:
      "Team scores combine into two-digit numbers for each hole.",
    gameplay:
      "Lower scores create significantly stronger combinations.",
    outcome:
      "Lowest combined Vegas total wins.",
    recommendedTeam: ["PAIR"],
    recommendedScoring: ["POINTS"],
    players: "4 Players",
    atmosphere: "High Stakes / Strategic",
    warning:
      "VEGAS scoring can create extremely large score swings.",
  },
};

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
      <h3 className="font-semibold text-green-400 tracking-wider">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isSelected = selected === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`px-3 py-2 rounded-full border text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition-all duration-300
                ${
                  isSelected
                    ? "bg-green-400 text-black border-green-400 shadow-[0_0_20px_#39FF14] scale-105"
                    : "bg-neutral-800 text-gray-300 border-neutral-600 hover:border-green-400 hover:shadow-[0_0_10px_#39FF14]"
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
  const [entryTokens, setEntryTokens] = useState<string>("");
  const [teamFormat, setTeamFormat] = useState("");
  const [gameFormat, setGameFormat] = useState("");
  const [typeOfGame, setTypeOfGame] = useState("");
  const [scoringMethod, setScoringMethod] = useState("");
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(false);

  const courseInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const initAutocomplete = () => {
      if (!(window as any).google || !courseInputRef.current) return false;

      const autocomplete =
        new (window as any).google.maps.places.Autocomplete(
          courseInputRef.current,
          {
            types: ["establishment"],
          }
        );

      autocomplete.setFields(["name"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place || !place.name) return;

        setCourseName(place.name);
      });

      return true;
    };

    const tryInit = () => {
      if (!initAutocomplete()) {
        setTimeout(tryInit, 300);
      }
    };

    const scriptId = "google-maps-script";

    if (!(window as any).google) {
      let script = document.getElementById(
        scriptId
      ) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=" +
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY +
          "&libraries=places";
        script.async = true;
        script.defer = true;
        script.onload = tryInit;
        document.head.appendChild(script);
      }
    } else {
      tryInit();
    }
  }, []);

  const selectedGame =
    GAME_ENGINE[typeOfGame];

const compatibilityWarnings: string[] = [];

if (
  typeOfGame === "VEGAS" &&
  teamFormat &&
  teamFormat !== "PAIR"
) {
  compatibilityWarnings.push(
    "VEGAS is usually played in PAIRS."
  );
}

if (
  typeOfGame === "WOLF" &&
  teamFormat &&
  teamFormat !== "FOURBALL"
) {
  compatibilityWarnings.push(
    "WOLF works best in FOURBALL format."
  );
}

if (
  typeOfGame === "BETTER_BALL" &&
  scoringMethod &&
  scoringMethod !== "POINTS"
) {
  compatibilityWarnings.push(
    "BETTER BALL is most commonly played using POINTS scoring."
  );
}

if (
  typeOfGame === "WORST_BALL" &&
  scoringMethod === "STROKES"
) {
  compatibilityWarnings.push(
    "Excellent setup for WORST BALL pressure scoring."
  );
}

if (
  gameFormat === "MATCH_PLAY" &&
  typeOfGame === "AGGREGATE"
) {
  compatibilityWarnings.push(
    "AGGREGATE is less commonly used in MATCH PLAY."
  );
}


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

      const createChallenge =
        httpsCallable(functions, "createChallenge");

      const result: any = await createChallenge({
        challengeTitle: challengeTitle.trim(),
        entryTokens: Number(entryTokens),
        teamFormat,
        gameFormat,
        typeOfGame,
        scoringMethod,
        courseName: courseName.trim(),
      });

      const challengeId =
        result.data.challengeId;

      router.push(`/challenges/${challengeId}`);
    } catch (err: any) {
      alert(
        err.message || "Failed to create challenge"
      );
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

        <div className="relative z-10 w-full max-w-4xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(0,255,120,0.25)] flex flex-col gap-7">

          <h1 className="text-2xl sm:text-4xl font-bold text-green-400 text-center tracking-widest drop-shadow-[0_0_10px_#39FF14]">
            CREATE CHALLENGE
          </h1>

          <input
            placeholder="Challenge Title"
            value={challengeTitle}
            onChange={(e) =>
              setChallengeTitle(e.target.value)
            }
            className="bg-black border border-neutral-700 focus:border-green-400 rounded p-3 outline-none transition-all focus:shadow-[0_0_10px_#39FF14]"
          />

          <input
            type="number"
            placeholder="Entry Tokens"
            value={entryTokens}
            onChange={(e) =>
              setEntryTokens(e.target.value)
            }
            className="bg-black border border-neutral-700 focus:border-green-400 rounded p-3 outline-none transition-all focus:shadow-[0_0_10px_#39FF14]"
          />

{/* ================= GAME PRESETS ================= */}

<div className="flex flex-col gap-3">

  <div className="text-sm font-bold tracking-[0.25em] text-cyan-300">
    QUICK GAME PRESETS
  </div>

  <div className="flex flex-wrap gap-3">

    {GAME_PRESETS.map((preset) => (

      <button
        key={preset.name}
        type="button"
        onClick={() => {
          setTeamFormat(preset.teamFormat);
          setGameFormat(preset.gameFormat);
          setTypeOfGame(preset.typeOfGame);
          setScoringMethod(preset.scoringMethod);
        }}
        className="
          px-4 py-3 rounded-2xl
          bg-cyan-500/10
          border border-cyan-400/30
          text-cyan-300 text-xs font-bold
          tracking-wide
          hover:bg-cyan-400
          hover:text-black
          hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
          transition-all
        "
      >
        {preset.name}
      </button>

    ))}

  </div>

</div>

          <input
            ref={courseInputRef}
            placeholder="Search Golf Course"
            value={courseName}
            onChange={(e) =>
              setCourseName(e.target.value)
            }
            className="bg-black border border-neutral-700 focus:border-green-400 rounded p-3 outline-none transition-all focus:shadow-[0_0_10px_#39FF14]"
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

          {/* ================= GAME ENGINE GUIDE ================= */}

          {selectedGame && (
            <div className="border border-green-400/30 bg-black/40 rounded-3xl p-6 shadow-[0_0_35px_rgba(57,255,20,0.25)] flex flex-col gap-5">

              <div>

                <div className="text-xs tracking-[0.3em] text-green-400 font-bold animate-pulse">
                  GAME ENGINE GUIDE
                </div>

                <div className="text-3xl font-extrabold text-white mt-2">
                  {typeOfGame}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">

  <span
    className={`px-3 py-1 rounded-full text-xs font-bold
    ${
      selectedGame.recommendedTeam.includes(teamFormat)
        ? "bg-green-400 text-black"
        : "bg-red-500 text-white"
    }`}
  >
    TEAM FORMAT:
    {selectedGame.recommendedTeam.includes(teamFormat)
      ? " COMPATIBLE"
      : " NOT RECOMMENDED"}
  </span>

  <span
    className={`px-3 py-1 rounded-full text-xs font-bold
    ${
      selectedGame.recommendedScoring.includes(scoringMethod)
        ? "bg-green-400 text-black"
        : "bg-red-500 text-white"
    }`}
  >
    SCORING:
    {selectedGame.recommendedScoring.includes(scoringMethod)
      ? " COMPATIBLE"
      : " NOT RECOMMENDED"}
  </span>

</div>

              </div>

              <div className="text-gray-200 leading-relaxed">
                {selectedGame.description}
              </div>

              <div className="border border-cyan-400/20 bg-cyan-500/5 rounded-2xl p-4 flex flex-col gap-2">

  <div className="text-cyan-300 font-bold text-sm tracking-wider">
    LIVE GAME SUMMARY
  </div>

  <div className="text-sm text-gray-300">
    You are creating a
    <span className="text-green-400 font-bold">
      {" "}{typeOfGame}
    </span>
    {" "}challenge using
    <span className="text-green-400 font-bold">
      {" "}{teamFormat || "No Team Format"}
    </span>
    {" "}with
    <span className="text-green-400 font-bold">
      {" "}{scoringMethod || "No Scoring"}
    </span>
    {" "}scoring.
  </div>

  <div className="text-sm text-gray-400">
    Expected atmosphere:
    <span className="text-white">
      {" "}{selectedGame.atmosphere}
    </span>
  </div>

</div>

              <div className="grid md:grid-cols-2 gap-4">

                <div className="border border-green-400/20 rounded-2xl p-4 bg-black/30">
                  <div className="text-green-400 font-bold mb-2">
                    GAMEPLAY
                  </div>

                  <div className="text-sm text-gray-300">
                    {selectedGame.gameplay}
                  </div>
                </div>



                <div className="border border-green-400/20 rounded-2xl p-4 bg-black/30">
                  <div className="text-green-400 font-bold mb-2">
                    OUTCOME
                  </div>

                  <div className="text-sm text-gray-300">
                    {selectedGame.outcome}
                  </div>
                </div>

                <div className="border border-green-400/20 rounded-2xl p-4 bg-black/30">
                  <div className="text-green-400 font-bold mb-2">
                    RECOMMENDED TEAM FORMAT
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedGame.recommendedTeam.map(
                      (team) => (
                        <span
                          key={team}
                          className={`px-3 py-1 rounded-full text-xs font-bold
                            ${
                              teamFormat === team
                                ? "bg-green-400 text-black"
                                : "bg-neutral-800 text-gray-300"
                            }`}
                        >
                          {team}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="border border-green-400/20 rounded-2xl p-4 bg-black/30">
                  <div className="text-green-400 font-bold mb-2">
                    RECOMMENDED SCORING
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedGame.recommendedScoring.map(
                      (score) => (
                        <span
                          key={score}
                          className={`px-3 py-1 rounded-full text-xs font-bold
                            ${
                              scoringMethod === score
                                ? "bg-green-400 text-black"
                                : "bg-neutral-800 text-gray-300"
                            }`}
                        >
                          {score}
                        </span>
                      )
                    )}
                  </div>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div className="border border-purple-400/20 bg-purple-500/5 rounded-2xl p-4 flex flex-col gap-3">

  <div className="text-purple-300 font-bold tracking-wider text-sm">
    GAME ENGINE ANALYSIS
  </div>

  <div className="grid md:grid-cols-3 gap-3">

    <div className="bg-black/40 rounded-xl p-3 border border-purple-400/10">
      <div className="text-xs text-gray-400">
        BEST FOR
      </div>

      <div className="text-sm text-white font-semibold mt-1">
        {selectedGame.players}
      </div>
    </div>

    <div className="bg-black/40 rounded-xl p-3 border border-purple-400/10">
      <div className="text-xs text-gray-400">
        STYLE
      </div>

      <div className="text-sm text-white font-semibold mt-1">
        {selectedGame.atmosphere}
      </div>
    </div>

    <div className="bg-black/40 rounded-xl p-3 border border-purple-400/10">
      <div className="text-xs text-gray-400">
        GAME MODE
      </div>

      <div className="text-sm text-white font-semibold mt-1">
        {gameFormat || "Not Selected"}
      </div>
    </div>

  </div>

</div>

                <div className="border border-green-400/20 rounded-2xl p-4 bg-black/30">
                  <div className="text-green-400 font-bold mb-2">
                    RECOMMENDED PLAYERS
                  </div>

                  <div className="text-sm text-gray-300">
                    {selectedGame.players}
                  </div>
                </div>

                <div className="border border-green-400/20 rounded-2xl p-4 bg-black/30">
                  <div className="text-green-400 font-bold mb-2">
                    ATMOSPHERE
                  </div>

                  <div className="text-sm text-gray-300">
                    {selectedGame.atmosphere}
                  </div>
                </div>

              </div>

              {compatibilityWarnings.length > 0 && (
  <div className="flex flex-col gap-3">

    {compatibilityWarnings.map((warning, index) => (

      <div
        key={index}
        className={`
          rounded-2xl p-4 text-sm border
          ${
            warning.toLowerCase().includes("excellent")
              ? "border-green-400/30 bg-green-500/10 text-green-200"
              : "border-yellow-400/30 bg-yellow-500/10 text-yellow-200"
          }
        `}
      >
        {warning.toLowerCase().includes("excellent")
          ? "✓ "
          : "⚠ "}
        {warning}
      </div>

    ))}

  </div>
)}

              {selectedGame.warning && (
                <div className="border border-yellow-400/30 bg-yellow-500/10 rounded-2xl p-4 text-yellow-200 text-sm">
                  ⚠ {selectedGame.warning}
                </div>
              )}

            </div>
          )}

          <button
            onClick={handleCreate}
            disabled={!isValid || loading}
            className="mt-6 py-4 rounded-xl font-bold text-black text-lg bg-green-400 hover:bg-green-300 transition-all duration-300 shadow-[0_0_25px_#39FF14] hover:shadow-[0_0_50px_#39FF14] disabled:opacity-50"
          >
            {loading
              ? "Creating Challenge..."
              : "CREATE CHALLENGE"}
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