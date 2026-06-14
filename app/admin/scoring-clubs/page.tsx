"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
  functions,
} from "@/src/lib/firebase";

import {
  httpsCallable,
} from "firebase/functions";
type Club = {
  uid: string;
  clubName: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  logoUrl?: string;
  active: boolean;
};

export default function ScoringClubsDashboard() {

  const router = useRouter();

  const [clubs, setClubs] = useState<Club[]>([]);

  const toggleScoringClubStatus =
  httpsCallable(
    functions,
    "toggleScoringClubStatus"
  );

async function toggleClub(
  uid: string
) {

  try {

    await toggleScoringClubStatus({
      uid,
    });

  } catch (err) {

    console.error(err);

    alert(
      "Failed to update club"
    );

  }
}

  useEffect(() => {

    const q = collection(
      db,
      "scoringClubs"
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

      <div className="max-w-7xl mx-auto">

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
                border border-green-400/20
                rounded-3xl
                p-6
              "
            >

              <div className="flex gap-5">

                <div>

                  {club.logoUrl ? (

                    <img
                      src={club.logoUrl}
                      alt={club.clubName}
                      className="
                        w-24
                        h-24
                        rounded-2xl
                        object-cover
                        border
                        border-white/10
                      "
                    />

                  ) : (

                    <div
                      className="
                        w-24
                        h-24
                        rounded-2xl
                        bg-black
                        border
                        border-white/10
                      "
                    />

                  )}

                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between mb-3">

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

                  <p className="text-gray-300 text-sm">
                    {club.contactPerson || "-"}
                  </p>

                  <p className="text-gray-400 text-sm break-all">
                    {club.email}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {club.phone || "-"}
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">

                <button
                  className="
                    bg-cyan-400
                    text-black
                    font-bold
                    py-3
                    rounded-xl
                  "
                >
                  VIEW
                </button>

                <button
                  className="
                    bg-yellow-400
                    text-black
                    font-bold
                    py-3
                    rounded-xl
                  "
                >
                  EDIT
                </button>

               <button
  onClick={() =>
    toggleClub(club.uid)
  }
  className={`
    ${
      club.active
        ? "bg-red-500 text-white"
        : "bg-green-400 text-black"
    }
    font-bold
    py-3
    rounded-xl
  `}
>
  {club.active
    ? "DISABLE"
    : "ENABLE"}
</button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );
}