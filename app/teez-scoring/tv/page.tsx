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
} from "firebase/firestore";


import {
  useAuth,
} from "@/src/lib/AuthContext";


import {
  db,
} from "@/src/lib/firebase";

type Competition = {
  id: string;
  competitionName: string;
  finalized?: boolean;
};

export default function TvDashboardPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [competitions, setCompetitions] =
    useState<Competition[]>([]);

  useEffect(() => {

    const ref = collection(
      db,
      "competitions"
    );

    const unsubscribe =
      onSnapshot(ref, (snap) => {

        const rows: Competition[] = [];

     snap.forEach((doc) => {

  const data =
    doc.data() as any;

  if (
    data.finalized &&
    data.clubId === user?.uid
  ) {

    rows.push({
      id: doc.id,
      ...data,
    });

  }

});
        setCompetitions(rows);

      });

    return () => unsubscribe();

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="mb-12">

          <h1 className="text-5xl font-black text-yellow-400 mb-4">
            TV BROADCAST CONTROL
          </h1>

          <p className="text-gray-400 text-xl">
            Launch live competition TV broadcasts
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {competitions.map((competition) => (

            <div
              key={competition.id}
              className="
                bg-neutral-900
                border border-yellow-400/20
                rounded-3xl
                p-8
              "
            >

              <h2 className="text-3xl font-black text-white mb-3">
                {competition.competitionName}
              </h2>

              <p className="text-gray-400 mb-8">
                Competition ID:
                <br />
                {competition.id}
              </p>

              <div className="grid gap-4">

                <button
                  onClick={() =>
                    window.open(
                      `/teez-scoring/tv/main-screen?competitionId=${competition.id}`,
                      "_blank"
                    )
                  }
                  className="
                    bg-green-400
                    text-black
                    px-6
                    py-4
                    rounded-2xl
                    font-black
                    hover:scale-105
                    transition
                  "
                >
                  OPEN TV
                </button>

                <button
                  onClick={() => {

                    navigator.clipboard.writeText(
                      `${window.location.origin}/teez-scoring/tv/main-screen?competitionId=${competition.id}`
                    );

                    alert(
                      "TV link copied"
                    );

                  }}
                  className="
                    bg-yellow-400
                    text-black
                    px-6
                    py-4
                    rounded-2xl
                    font-black
                    hover:scale-105
                    transition
                  "
                >
                  COPY LINK
                </button>

<button
  onClick={() =>
    router.push(
      `/teez-scoring/tv/broadcast-builder/${competition.id}`
    )
  }
  className="
    bg-cyan-400
    text-black
    px-6
    py-4
    rounded-2xl
    font-black
    hover:scale-105
    transition
  "
>
  BUILD SLIDES
</button>


              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}