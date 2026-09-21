"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

type Team = {
  participantId: string;
  companyName: string;
  competitionTotal: number;
  finalized: boolean;
};

export default function ScoreboardSamplePage() {
  const router =
    useRouter();

  const [
    teams,
    setTeams,
  ] = useState<Team[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const golfdayId =
    "jk6-2026";

  useEffect(() => {
    const participantsRef =
      collection(
        db,
        "golfdays",
        golfdayId,
        "participants"
      );

    const q =
      query(
        participantsRef
      );

    const unsubscribe =
      onSnapshot(
        q,

        (snapshot) => {
          const loadedTeams =
            snapshot.docs.map(
              (docSnap) => {
                const data =
                  docSnap.data();

                return {
                  participantId:
                    data.participantId ||
                    docSnap.id,

                  companyName:
                    data.companyName ||
                    docSnap.id,

                  competitionTotal:
                    Number(
                      data.competitionTotal ||
                        0
                    ),

                  finalized:
                    data.finalized ===
                    true,
                };
              }
            );

          setTeams(
            loadedTeams
          );

          setLoading(
            false
          );
        },

        (error) => {
          console.error(
            error
          );

          setTeams(
            []
          );

          setLoading(
            false
          );
        }
      );

    return () =>
      unsubscribe();
  }, []);

  const rankedTeams =
    useMemo(() => {
      return [
        ...teams,
      ].sort(
        (a, b) => {
          if (
            b.competitionTotal !==
            a.competitionTotal
          ) {
            return (
              b.competitionTotal -
              a.competitionTotal
            );
          }

          return (
            a.companyName.localeCompare(
              b.companyName
            )
          );
        }
      );
    }, [teams]);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="w-full max-w-[520px] mx-auto">

        <section className="relative bg-neutral-950 border border-green-500/40 rounded-3xl overflow-hidden mb-5 shadow-[0_0_35px_rgba(34,197,94,0.35)]">

          <div className="relative h-44 flex items-center justify-center bg-black">
            <img
              src="/jk6_logo.png"
              alt="JK6"
              className="absolute inset-0 w-full h-full object-contain opacity-85"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black" />
          </div>

          <div className="p-4">
            <p className="text-xs tracking-[0.3em] text-green-400 font-black">
              LIVE SCOREBOARD
            </p>

            <h1 className="text-3xl font-black text-red-500 mt-2 animate-pulse drop-shadow-[0_0_14px_rgba(239,68,68,1)]">
              JK6 Annual Fundraiser Golf Day 2026
            </h1>

            <p className="text-cyan-300 font-black mt-2 animate-pulse drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
              4 Ball Alliance · Scramble Drive · Mystery Count
            </p>

            <p className="text-gray-400 text-sm mt-3">
              Competition totals update automatically as scorecards are saved.
            </p>
          </div>

        </section>

        <section className="grid grid-cols-3 gap-3 mb-5">

          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-gray-500 font-black">
              TEAMS
            </p>

            <p className="text-2xl font-black text-green-400">
              {teams.length}
            </p>
          </div>

          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-gray-500 font-black">
              FINALIZED
            </p>

            <p className="text-2xl font-black text-red-400">
              {
                teams.filter(
                  (team) =>
                    team.finalized
                ).length
              }
            </p>
          </div>

          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-gray-500 font-black">
              UPDATED
            </p>

            <p className="text-2xl font-black text-cyan-300">
              {
                teams.filter(
                  (team) =>
                    team.competitionTotal >
                    0
                ).length
              }
            </p>
          </div>

        </section>

        {loading && (
          <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 text-center">
            <p className="text-green-400 font-black">
              Loading live scoreboard...
            </p>
          </div>
        )}

        {!loading &&
          rankedTeams.length ===
            0 && (
            <div className="bg-neutral-950 border border-red-500/30 rounded-3xl p-6 text-center">
              <p className="text-red-400 font-black">
                No teams found.
              </p>
            </div>
          )}

        {!loading &&
          rankedTeams.length >
            0 && (
            <section className="grid gap-3">

              {rankedTeams.map(
                (
                  team,
                  index
                ) => (
                  <div
                    key={
                      team.participantId
                    }
                    className="
                      bg-neutral-950
                      border
                      border-green-400/20
                      rounded-2xl
                      p-4
                      shadow-[0_0_18px_rgba(34,197,94,0.12)]
                    "
                  >
                    <div className="grid grid-cols-[52px_1fr_82px] gap-3 items-center">

                      <div className="text-center">
                        <p className="text-[10px] text-gray-500 font-black">
                          POS
                        </p>

                        <p className="text-3xl font-black text-green-400">
                          {
                            index +
                            1
                          }
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-lg font-black truncate">
                          {
                            team.companyName
                          }
                        </p>

                        <p className="text-xs text-gray-500">
                          {
                            team.finalized
                              ? "Finalized"
                              : team.competitionTotal >
                                  0
                                ? "Score updated"
                                : "Waiting for scores"
                          }
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 font-black">
                          TOTAL
                        </p>

                        <p className="text-3xl font-black text-cyan-300">
                          {
                            team.competitionTotal
                          }
                        </p>
                      </div>

                    </div>
                  </div>
                )
              )}

            </section>
          )}

        <button
          onClick={() =>
            router.push(
              "/teez-scoring/corporate-days/jk6-2026"
            )
          }
          className="
            mt-6
            w-full
            bg-white/10
            border
            border-white/10
            rounded-2xl
            py-4
            font-black
            hover:border-green-400
            hover:text-green-400
            transition
          "
        >
          BACK TO JK6 DASHBOARD
        </button>

      </div>
    </main>
  );
}