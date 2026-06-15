"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth, db } from "@/src/lib/firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";

type Club = {
  clubName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
  active?: boolean;
};

type CompetitionItem = {
  id: string;
  competitionName: string;
  competitionDate: string;
  format?: string;
  scoringType?: string;
  playerConfiguration?: string;
  status?: string;
  finalized?: boolean;
  createdAt?: any;
};

export default function ClubDashboard() {

  const router = useRouter();

  const [club, setClub] =
    useState<Club | null>(null);

  const [competitions, setCompetitions] =
    useState<CompetitionItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsub =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) {
            router.push(
              "/teez-scoring/login"
            );
            return;
          }

          const snap =
            await getDoc(
              doc(
                db,
                "scoringClubs",
                user.uid
              )
            );

          if (!snap.exists()) {
            router.push(
              "/teez-scoring/login"
            );
            return;
          }

          const clubData =
            snap.data() as Club;

          if (clubData.active === false) {
            alert("This club account is disabled.");
            router.push(
              "/teez-scoring/login"
            );
            return;
          }

          setClub(clubData);

          const competitionsSnap =
            await getDocs(
              query(
                collection(
                  db,
                  "competitions"
                ),
                where(
                  "clubId",
                  "==",
                  user.uid
                )
              )
            );

          const clubCompetitions =
            competitionsSnap.docs
              .map((docSnap) => {
                const data =
                  docSnap.data() as any;

                return {
                  id:
                    docSnap.id,

                  competitionName:
                    data.competitionName || "Unnamed Competition",

                  competitionDate:
                    data.competitionDate || "",

                  format:
                    data.format || "",

                  scoringType:
                    data.scoringType || "",

                  playerConfiguration:
                    data.playerConfiguration || "",

                  status:
                    data.status || "active",

                  finalized:
                    data.finalized === true,

                  createdAt:
                    data.createdAt || null,
                };
              })
              .sort((a, b) =>
                String(
                  b.competitionDate || ""
                ).localeCompare(
                  String(
                    a.competitionDate || ""
                  )
                )
              );

          setCompetitions(
            clubCompetitions
          );

          setLoading(false);

        }
      );

    return () => unsub();

  }, [router]);

  const activeCompetitions =
    competitions.filter(
      (competition) =>
        competition.status !== "finalized" &&
        competition.finalized !== true
    );

  const finalizedCompetitions =
    competitions.filter(
      (competition) =>
        competition.status === "finalized" ||
        competition.finalized === true
    );

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-green-400 font-bold">
          Loading club dashboard...
        </p>
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <div className="bg-neutral-900 border border-green-400/20 rounded-3xl p-6 md:p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {club?.logoUrl ? (

              <img
                src={club.logoUrl}
                alt="Club Logo"
                className="w-32 h-32 rounded-3xl object-cover border border-white/10"
              />

            ) : (

              <div className="w-32 h-32 rounded-3xl bg-black border border-white/10" />

            )}

            <div>

              <p className="text-green-400 text-sm font-bold uppercase tracking-[0.25em] mb-3">
                Club Dashboard
              </p>

              <h1 className="text-4xl md:text-5xl font-black text-white">
                {club?.clubName || "Club Dashboard"}
              </h1>

              <p className="text-gray-400 mt-2">
                Club Competition Dashboard
              </p>

              <div className="mt-5 grid gap-1 text-sm text-gray-500">

                {club?.contactPerson && (
                  <p>
                    Contact: {club.contactPerson}
                  </p>
                )}

                {club?.email && (
                  <p>
                    Email: {club.email}
                  </p>
                )}

                {club?.phone && (
                  <p>
                    Phone: {club.phone}
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <button
            onClick={() =>
              router.push(
                "/teez-scoring/create-competition"
              )
            }
            className="
              text-left
              bg-neutral-900
              border border-green-400/30
              rounded-3xl
              p-6
              hover:border-green-400
              hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]
              transition-all
            "
          >

            <div className="text-4xl mb-5">
              ⛳
            </div>

            <h2 className="text-2xl font-black text-green-400 mb-3">
              Create Competition
            </h2>

            <div className="grid gap-2 text-sm text-gray-400">
              <p>Create Competition</p>
              <p>Tee Sheet</p>
              <p>Scoring</p>
              <p>Leaderboards</p>
              <p>Finalization</p>
            </div>

          </button>

        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 mb-10">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-3xl font-black text-white">
                All Competitions
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Open, edit, finalize, or export club competitions
              </p>

            </div>

            <button
              onClick={() =>
                router.push(
                  "/teez-scoring/create-competition"
                )
              }
              className="
                bg-green-400
                text-black
                px-5
                py-3
                rounded-2xl
                font-black
                hover:scale-105
                transition
              "
            >
              NEW COMPETITION
            </button>

          </div>

          <div className="grid gap-4">

            {competitions.length === 0 && (

              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-gray-400">
                No competitions created yet.
              </div>

            )}

            {activeCompetitions.length > 0 && (

              <div className="mb-4">

                <h3 className="text-xl font-black text-green-400 mb-4">
                  Active Competitions
                </h3>

                <div className="grid gap-4">

                  {activeCompetitions.map((competition) => (

                    <div
                      key={competition.id}
                      className="
                        bg-black/40
                        border border-green-400/20
                        rounded-2xl
                        p-5
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                      "
                    >

                      <div>

                        <h4 className="text-xl font-black">
                          {competition.competitionName}
                        </h4>

                        <p className="text-gray-400 text-sm mt-1">
                          {competition.competitionDate} • {competition.format} • {competition.playerConfiguration}
                        </p>

                        <span className="inline-block mt-3 text-xs font-black bg-green-400 text-black px-3 py-1 rounded-full">
                          ACTIVE
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-3">

                        <button
                          onClick={() =>
                            router.push(
                              `/teez-scoring/competition/${competition.id}`
                            )
                          }
                          className="
                            bg-green-400
                            text-black
                            px-5
                            py-3
                            rounded-2xl
                            font-black
                          "
                        >
                          OPEN / EDIT
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

            {finalizedCompetitions.length > 0 && (

              <div>

                <h3 className="text-xl font-black text-yellow-400 mb-4">
                  Finalized Competitions
                </h3>

                <div className="grid gap-4">

                  {finalizedCompetitions.map((competition) => (

                    <div
                      key={competition.id}
                      className="
                        bg-black/40
                        border border-yellow-400/20
                        rounded-2xl
                        p-5
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                      "
                    >

                      <div>

                        <h4 className="text-xl font-black">
                          {competition.competitionName}
                        </h4>

                        <p className="text-gray-400 text-sm mt-1">
                          {competition.competitionDate} • {competition.format} • {competition.playerConfiguration}
                        </p>

                        <span className="inline-block mt-3 text-xs font-black bg-yellow-400 text-black px-3 py-1 rounded-full">
                          FINALIZED
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-3">

                        <button
                          onClick={() =>
                            router.push(
                              `/teez-scoring/competition/${competition.id}`
                            )
                          }
                          className="
                            bg-yellow-400
                            text-black
                            px-5
                            py-3
                            rounded-2xl
                            font-black
                          "
                        >
                          OPEN / EDIT
                        </button>

                        <button
                          onClick={() =>
                            alert(
                              "PDF export is the next update."
                            )
                          }
                          className="
                            bg-white
                            text-black
                            px-5
                            py-3
                            rounded-2xl
                            font-black
                          "
                        >
                          EXPORT PDF
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </main>

  );
}