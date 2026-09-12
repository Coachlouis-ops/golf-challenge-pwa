"use client";

import { useMemo, useState } from "react";

type Team = {
  id: string;
  name: string;
  total: number;
  finalized: boolean;
};

const starterTeams: Team[] = [
  { id: "team-1", name: "JK6", total: 78, finalized: false },
  { id: "team-2", name: "Vector Carts", total: 74, finalized: false },
  { id: "team-3", name: "Sponsor Team", total: 82, finalized: true },
  { id: "team-4", name: "Guest Team", total: 69, finalized: false },
  { id: "team-5", name: "Woodhill Team", total: 76, finalized: false },
];

export default function ScorecardDashboardSamplePage() {
  const [teams, setTeams] = useState<Team[]>(starterTeams);
  const [leaderboardLocked, setLeaderboardLocked] = useState(false);

  const rankedTeams = useMemo(() => {
    return [...teams].sort((a, b) => b.total - a.total);
  }, [teams]);

  function updateTeamTotal(teamId: string, value: string) {
    if (leaderboardLocked) return;

    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? {
              ...team,
              total: Number(value) || 0,
              finalized: false,
            }
          : team
      )
    );
  }

  function updateLeaderboard() {
    alert("Leaderboard updated.");
  }

  
  function finalizeLeaderboard() {
    setLeaderboardLocked(true);
    alert("Leaderboard finalized and locked.");
  }

  function reopenLeaderboard() {
    setLeaderboardLocked(false);
    alert("Leaderboard reopened.");
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="w-full max-w-[520px] mx-auto">

        <section className="relative bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden mb-5">
          <div className="relative h-44 flex items-center justify-center bg-black">
            <img
              src="/jk6_logo.png"
              alt="JK6"
              className="absolute inset-0 w-full h-full object-contain opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-black text-red-500 animate-pulse drop-shadow-[0_0_14px_rgba(239,68,68,1)]">
              JK6 Annual Fundraiser Golf Day 2026
            </h1>

            <p className="text-cyan-300 font-black mt-2 animate-pulse drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
              Scoreboard · 4 Ball Alliance · Mystery Count
            </p>
          </div>
        </section>

        <section className="bg-neutral-950 border border-white/10 rounded-3xl p-4">

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs tracking-[0.25em] text-green-400 font-black">
                LIVE RANKINGS
              </p>

              <h2 className="text-2xl font-black">
                Team Totals
              </h2>
            </div>

            <div
              className={`px-3 py-2 rounded-xl text-xs font-black ${
                leaderboardLocked
                  ? "bg-red-500 text-white"
                  : "bg-yellow-400 text-black"
              }`}
            >
              {leaderboardLocked ? "LOCKED" : "LIVE"}
            </div>
          </div>

          <div className="grid gap-3">
            {rankedTeams.map((team, index) => (
              <div
                key={team.id}
                className="bg-black/50 border border-white/10 rounded-2xl p-4"
              >
                <div className="grid grid-cols-[54px_1fr_82px] gap-3 items-center">
                  <div className="text-3xl font-black text-green-400">
                    #{index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="font-black truncate">
                      {team.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {team.finalized ? "Finalized" : "Running"}
                    </p>
                  </div>

                  <input
                    type="number"
                    value={team.total}
                    disabled={leaderboardLocked || team.finalized}
                    onChange={(e) =>
                      updateTeamTotal(team.id, e.target.value)
                    }
                    className="w-full bg-neutral-900 border border-cyan-400/30 rounded-xl px-2 py-3 text-center text-2xl font-black disabled:opacity-40"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            {!leaderboardLocked ? (
              <button
                onClick={finalizeLeaderboard}
                className="bg-green-400 text-black rounded-2xl py-4 font-black"
              >
                FINALIZE SCOREBOARD
              </button>
            ) : (
              <button
                onClick={reopenLeaderboard}
                className="bg-red-500 text-white rounded-2xl py-4 font-black"
              >
               REOPEN SCOREBOARD
              </button>
            )}

            <button
              onClick={updateLeaderboard}
              disabled={leaderboardLocked}
              className="bg-cyan-400 text-black rounded-2xl py-4 font-black disabled:opacity-40"
            >
              UPDATE SCOREBOARD
            </button>
          </div>

        </section>

      </div>
    </main>
  );
}