"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth, db } from "@/src/lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

type Club = {
  clubName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
};

export default function ClubDashboard() {

  const router = useRouter();

  const [club, setClub] =
    useState<Club | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadClub() {

      const user =
        auth.currentUser;

      if (!user) {
        window.location.href =
          "/teez-scoring/login";
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

      if (snap.exists()) {
        setClub(
          snap.data() as Club
        );
      }

      setLoading(false);
    }

    loadClub();

  }, []);

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
                {loading
                  ? "Loading Club"
                  : club?.clubName || "Club Dashboard"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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

      </div>

    </main>

  );
}