"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase";

type Club = {
  uid: string;
  clubName: string;
  email: string;
  active: boolean;
};

export default function ScoringClubsDashboard() {

  const router = useRouter();

  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {

    const q = query(
      collection(db, "scoringClubs"),
      orderBy("clubName")
    );

    const unsub = onSnapshot(q, (snap) => {

      const arr: Club[] = [];

      snap.forEach((doc) => {

       arr.push({
  ...(doc.data() as Club),
  uid: doc.id,
});

      });

      setClubs(arr);

    });

    return () => unsub();

  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-green-400 mb-2">
              TEEZ SCORING CLUBS
            </h1>

            <p className="text-gray-400">
              Manage scoring clubs and competition systems
            </p>

          </div>

          <button
            onClick={() =>
              router.push(
                "/admin/scoring-clubs/create"
              )
            }
            className="
              bg-green-400
              text-black
              font-bold
              px-6
              py-4
              rounded-2xl
              shadow-[0_0_25px_rgba(34,197,94,0.7)]
              hover:scale-[1.02]
              transition-all
            "
          >
            ADD NEW CLUB
          </button>

        </div>

        {/* CLUBS */}

        <div className="grid md:grid-cols-2 gap-6">

          {clubs.map((club) => (

            <div
              key={club.uid}
              className="
                bg-neutral-900
                border
                border-green-400/20
                rounded-3xl
                p-6
              "
            >

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold text-green-400">
                  {club.clubName}
                </h2>

                <div
                  className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    ${
                      club.active
                        ? "bg-green-400 text-black"
                        : "bg-red-500 text-white"
                    }
                  `}
                >
                  {club.active
                    ? "ACTIVE"
                    : "DISABLED"}
                </div>

              </div>

              <p className="text-gray-400 text-sm break-all">
                {club.email}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}