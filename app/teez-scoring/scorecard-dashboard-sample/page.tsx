"use client";

import { useMemo, useState } from "react";

type TeamStatus = "running" | "finalized";

type Team = {
  id: string;
  teamName: string;
  company: string;
  startHole: number;
  teeTime: string;
  players: string[];
  status: TeamStatus;
  scores: number[];
};

const starterTeams: Team[] = [
  {
    id: "team-1",
    teamName: "Team 1",
    company: "JK6",
    startHole: 1,
    teeTime: "11:00am",
    players: ["Louis Coetzee", "Jaco Smith", "Pieter van der Merwe", "Mark Jacobs"],
    status: "running",
    scores: [13, 6, 8, 9, 10, 7, 6, 8, 9, 7, 10, 6, 8, 9, 7, 5, 10, 8],
  },
  {
    id: "team-2",
    teamName: "Team 2",
    company: "Vector Carts",
    startHole: 2,
    teeTime: "11:00am",
    players: ["Player 1", "Player 2", "Player 3", "Player 4"],
    status: "running",
    scores: [10, 7, 8, 8, 9, 7, 5, 8, 8, 7, 9, 5, 7, 8, 6, 5, 9, 7],
  },
  {
    id: "team-3",
    teamName: "Team 3",
    company: "Sponsor Team",
    startHole: 3,
    teeTime: "11:00am",
    players: ["Player 1", "Player 2", "Player 3", "Player 4"],
    status: "finalized",
    scores: [9, 8, 9, 7, 10, 8, 6, 9, 8, 8, 10, 6, 9, 8, 7, 6, 10, 8],
  },
  {
    id: "team-4",
    teamName: "Team 4",
    company: "Guest Team",
    startHole: 4,
    teeTime: "11:00am",
    players: ["Player 1", "Player 2", "Player 3", "Player 4"],
    status: "running",
    scores: [8, 7, 7, 8, 8, 7, 5, 7, 8, 6, 8, 5, 7, 7, 6, 5, 8, 7],
  },
];

export default function ScorecardDashboardSamplePage() {
  const [teams, setTeams] = useState<Team[]>(starterTeams);
  const [selectedTeamId, setSelectedTeamId] = useState("team-1");
  const [activeView, setActiveView] = useState<"running" | "final">("running");

  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  function getTeamTotal(team: Team) {
    return team.scores.reduce((total, score) => total + (Number(score) || 0), 0);
  }

  function updateHoleScore(holeIndex: number, value: string) {
    const cleanValue = value === "" ? 0 : Number(value) || 0;

    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== selectedTeamId) return team;

        const updatedScores = [...team.scores];
        updatedScores[holeIndex] = cleanValue;

        return {
          ...team,
          scores: updatedScores,
          status: "running",
        };
      })
    );
  }

  function updateScorecard() {
    alert("Scorecard updated. Leaderboard refreshed.");
  }

  function finalizeRound() {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === selectedTeamId
          ? {
              ...team,
              status: "finalized",
            }
          : team
      )
    );

    alert("Round finalized. Team moved to final results.");
  }

  function reopenScorecard(teamId: string) {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              ...team,
              status: "running",
            }
          : team
      )
    );

    setSelectedTeamId(teamId);
    setActiveView("running");

    alert("Scorecard reopened for corrections.");
  }

  const runningLeaderboard = useMemo(() => {
    return [...teams]
      .filter((team) => team.status === "running")
      .sort((a, b) => getTeamTotal(b) - getTeamTotal(a));
  }, [teams]);

  const finalLeaderboard = useMemo(() => {
    return [...teams]
      .filter((team) => team.status === "finalized")
      .sort((a, b) => getTeamTotal(b) - getTeamTotal(a));
  }, [teams]);

  const allScoresEntered =
    selectedTeam?.scores.length === 18 &&
    selectedTeam.scores.every((score) => Number(score) > 0);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">

        <section className="mb-6">
          <p className="text-xs tracking-[0.3em] text-green-400 font-black">
            JK6 GOLF DAY
          </p>

          <h1 className="text-4xl font-black mt-2">
            Scorecard Control Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            4 Ball Alliance · Mystery Count · Shotgun Start 11:00am
          </p>
        </section>

        <section className="grid lg:grid-cols-[360px_1fr] gap-5">

          {/* TEAM LIST */}

          <div className="bg-neutral-950 border border-white/10 rounded-3xl p-4">
            <h2 className="text-xl font-black mb-4">
              Teams / Scorecards
            </h2>

            <div className="grid gap-3">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeamId(team.id)}
                  className={`text-left rounded-2xl border p-4 transition ${
                    selectedTeamId === team.id
                      ? "border-green-400 bg-green-400/10"
                      : "border-white/10 bg-white/5 hover:border-green-400/40"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-black">
                        {team.teamName}
                      </p>

                      <p className="text-sm text-gray-400">
                        {team.company}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-green-400">
                        {getTeamTotal(team)}
                      </p>

                      <p className="text-[10px] text-gray-500 uppercase">
                        Total
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                    <span>
                      Start Hole {team.startHole}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-full font-bold ${
                        team.status === "finalized"
                          ? "bg-green-400 text-black"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {team.status === "finalized" ? "FINAL" : "RUNNING"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SCORECARD EDITOR */}

          <div className="bg-neutral-950 border border-white/10 rounded-3xl p-4">

            {selectedTeam && (
              <>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs tracking-[0.25em] text-gray-500 font-bold">
                      SELECTED SCORECARD
                    </p>

                    <h2 className="text-3xl font-black mt-1">
                      {selectedTeam.company}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      {selectedTeam.teamName} · Start Hole {selectedTeam.startHole} · {selectedTeam.teeTime}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-500 font-bold">
                      TEAM TOTAL
                    </p>

                    <p className="text-5xl font-black text-green-400">
                      {getTeamTotal(selectedTeam)}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-2 mb-5">
                  {selectedTeam.players.map((player) => (
                    <div
                      key={player}
                      className="bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-bold"
                    >
                      {player}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
                  {selectedTeam.scores.map((score, index) => (
                    <div
                      key={index}
                      className="bg-black/40 border border-white/10 rounded-2xl p-3"
                    >
                      <p className="text-xs text-gray-500 font-bold mb-2">
                        Hole {index + 1}
                      </p>

                      <input
                        type="number"
                        min="0"
                        value={score}
                        onChange={(e) =>
                          updateHoleScore(index, e.target.value)
                        }
                        className="w-full bg-neutral-900 border border-cyan-400/30 rounded-xl px-2 py-3 text-center text-xl font-black"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-6">

                  <button
                    onClick={updateScorecard}
                    className="bg-cyan-400 text-black rounded-2xl py-4 font-black text-lg"
                  >
                    UPDATE SCORECARD
                  </button>

                  <button
                    onClick={finalizeRound}
                    disabled={!allScoresEntered}
                    className={`rounded-2xl py-4 font-black text-lg ${
                      allScoresEntered
                        ? "bg-green-400 text-black"
                        : "bg-neutral-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    FINALIZE ROUND
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        "/teez-scoring/scorecard-sample",
                        "_blank"
                      )
                    }
                    className="bg-white/10 border border-white/10 rounded-2xl py-4 font-black text-lg hover:border-green-400"
                  >
                    OPEN MOBILE CARD
                  </button>

                </div>

                {!allScoresEntered && (
                  <p className="text-sm text-yellow-400 mt-3">
                    Finalize button activates once all 18 hole scores are entered.
                  </p>
                )}
              </>
            )}

          </div>

        </section>

        {/* LEADERBOARDS */}

        <section className="mt-6 bg-neutral-950 border border-white/10 rounded-3xl p-4">

          <div className="grid grid-cols-2 border border-cyan-400/40 rounded-2xl overflow-hidden mb-5">
            <button
              onClick={() => setActiveView("running")}
              className={`py-4 font-black ${
                activeView === "running"
                  ? "bg-yellow-400 text-black"
                  : "bg-black/40 text-gray-300"
              }`}
            >
              Running Leaderboard
            </button>

            <button
              onClick={() => setActiveView("final")}
              className={`py-4 font-black ${
                activeView === "final"
                  ? "bg-green-400 text-black"
                  : "bg-black/40 text-gray-300"
              }`}
            >
              Final Results
            </button>
          </div>

          <div className="grid gap-3">
            {(activeView === "running"
              ? runningLeaderboard
              : finalLeaderboard
            ).map((team, index) => (
              <div
                key={team.id}
                className="grid grid-cols-[60px_1fr_90px] md:grid-cols-[80px_1fr_120px_160px] gap-3 items-center bg-black/40 border border-white/10 rounded-2xl p-4"
              >
                <div className="text-2xl font-black text-green-400">
                  #{index + 1}
                </div>

                <div>
                  <p className="font-black">
                    {team.company}
                  </p>

                  <p className="text-sm text-gray-400">
                    {team.teamName} · Start Hole {team.startHole}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-black">
                    {getTeamTotal(team)}
                  </p>

                  <p className="text-[10px] text-gray-500">
                    TOTAL
                  </p>
                </div>

                <div className="hidden md:block text-right">
                  {team.status === "finalized" && (
                    <button
                      onClick={() => reopenScorecard(team.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl font-black"
                    >
                      REOPEN
                    </button>
                  )}
                </div>
              </div>
            ))}

            {(activeView === "running"
              ? runningLeaderboard
              : finalLeaderboard
            ).length === 0 && (
              <div className="text-center text-gray-500 py-10">
                No teams in this section yet.
              </div>
            )}
          </div>

        </section>

      </div>
    </main>
  );
}