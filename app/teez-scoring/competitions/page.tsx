"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

type Competition = {
  id: string;
  competitionName: string;
  competitionDate: string;
  status?: string;
  finalized?: boolean;
};

export default function CompetitionsPage() {

  const router = useRouter();

  const [competitions, setCompetitions] =
    useState<Competition[]>([]);

  useEffect(() => {

    const q = query(
      collection(db, "competitions"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {

        const rows: Competition[] = [];

        snapshot.forEach((doc) => {

          rows.push({
            id: doc.id,
            ...(doc.data() as any),
          });

        });

        setCompetitions(rows);

      });

    return () => unsubscribe();

  }, []);

  return (

    <main className="h-screen overflow-y-scroll bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <div>

            <h1 className="text-5xl font-black text-green-400 mb-3">
              COMPETITIONS
            </h1>

            <p className="text-gray-400 text-xl">
              Open and finalized competitions
            </p>

          </div>

          <button
            onClick={() =>
              router.push("/teez-scoring")
            }
            className="
              bg-neutral-900
              border border-white/10
              px-6
              py-4
              rounded-2xl
              hover:border-white/30
              transition
            "
          >
            ← BACK
          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {competitions.map((competition) => (

            <div
              key={competition.id}
              className="
                bg-neutral-900
                border border-white/10
                rounded-3xl
                p-8
              "
            >

              <div className="mb-6">

                <h2 className="text-3xl font-black mb-3">
                  {competition.competitionName}
                </h2>

                <p className="text-gray-400 mb-2">
                  {competition.competitionDate}
                </p>

                <p
                  className={`
                    text-sm font-bold
                    ${
                      competition.finalized
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  `}
                >
                  {competition.finalized
                    ? "FINALIZED"
                    : "LIVE"}
                </p>

              </div>

              <div className="grid gap-4">

                <button
                  onClick={() =>
                    router.push(
                      `/teez-scoring/competition/${competition.id}`
                    )
                  }
                  className="
                    bg-cyan-400
                    text-black
                    py-4
                    rounded-2xl
                    font-black
                    hover:scale-[1.02]
                    transition
                  "
                >
                  OPEN COMPETITION
                </button>

                <button
                  onClick={() =>
                    router.push(
                      `/teez-scoring/leaderboard/${competition.id}`
                    )
                  }
                  className="
                    bg-green-400
                    text-black
                    py-4
                    rounded-2xl
                    font-black
                    hover:scale-[1.02]
                    transition
                  "
                >
                  VIEW LEADERBOARD
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `/teez-scoring/tv/main-screen/default?competitionId=${competition.id}`,
                      "_blank"
                    )
                  }
                  className="
                    bg-yellow-400
                    text-black
                    py-4
                    rounded-2xl
                    font-black
                    hover:scale-[1.02]
                    transition
                  "
                >
                  OPEN TV BROADCAST
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}