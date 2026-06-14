"use client";

import { useEffect, useState } from "react";

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

  const [club, setClub] =
    useState<Club | null>(null);

  useEffect(() => {

    async function loadClub() {

      const user =
        auth.currentUser;

      if (!user) return;

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
    }

    loadClub();

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="bg-neutral-900 border border-green-400/20 rounded-3xl p-8 mb-10">

          <div className="flex items-center gap-6">

            {club?.logoUrl ? (

              <img
                src={club.logoUrl}
                alt="Club Logo"
                className="w-32 h-32 rounded-3xl object-cover"
              />

            ) : (

              <div className="w-32 h-32 rounded-3xl bg-black border border-white/10" />

            )}

            <div>

              <h1 className="text-5xl font-black text-green-400">
                {club?.clubName || "Loading Club"}
              </h1>

              <p className="text-gray-400 mt-2">
                Club Competition Dashboard
              </p>

              <p className="text-gray-500 text-sm mt-3">
                {club?.contactPerson}
              </p>

              <p className="text-gray-500 text-sm">
                {club?.email}
              </p>

              <p className="text-gray-500 text-sm">
                {club?.phone}
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}