"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase";

export default function ViewClubPage() {

  const { uid } =
    useParams();

  const [club, setClub] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const snap =
        await getDoc(
          doc(
            db,
            "scoringClubs",
            uid as string
          )
        );

      if (snap.exists()) {
        setClub(snap.data());
      }
    }

    load();

  }, [uid]);

  if (!club) {
    return (
      <main className="p-10 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-green-400 mb-8">
          {club.clubName}
        </h1>

        <div className="space-y-4">

          <p>Email: {club.email}</p>

          <p>
            Contact Person:
            {" "}
            {club.contactPerson}
          </p>

          <p>
            Phone:
            {" "}
            {club.phone}
          </p>

          <p>
            Address:
            {" "}
            {club.address}
          </p>

          <p>
            Province:
            {" "}
            {club.province}
          </p>

          <p>
            Country:
            {" "}
            {club.country}
          </p>

        </div>

      </div>

    </main>
  );
}