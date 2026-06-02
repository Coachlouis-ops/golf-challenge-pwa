"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import {
  db,
  auth,
} from "@/src/lib/firebase";

type CompetitionHistory = {
  competitionId: string;

  competitionName: string;

  competitionDate: string;

  finalizedAt?: any;
};

export default function HistoryPage() {

  const [loading, setLoading] =
    useState(true);

  const [history, setHistory] =
    useState<CompetitionHistory[]>([]);

  useEffect(() => {

    loadHistory();

  }, []);

  async function loadHistory() {

    try {

      const clubId =
        auth.currentUser?.uid;

      if (!clubId) return;

      const ref = collection(
        db,
        "scoringClubs",
        clubId,
        "competitionHistory"
      );

      const q = query(
        ref,
        orderBy(
          "competitionDate",
          "desc"
        )
      );

      const snap =
        await getDocs(q);

      setHistory(
        snap.docs.map((doc) => ({
          ...(doc.data() as any),
        }))
      );

    } catch (e) {

      console.error(e);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading history...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">

          <h1 className="text-5xl font-black text-green-400 mb-3">
            COMPETITION HISTORY
          </h1>

          <p className="text-gray-400">
            Finalized competitions archive
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {history.map((item) => (

            <Link
              key={item.competitionId}
              href={`/teez-scoring/leaderboard/${item.competitionId}`}
            >

              <div
                className="
                  bg-neutral-900
                  border border-white/10
                  rounded-3xl
                  p-6
                  hover:border-green-400
                  transition-all
                  cursor-pointer
                "
              >

                <div className="text-2xl font-bold mb-4">
                  {item.competitionName}
                </div>

                <div className="text-gray-400">
                  {item.competitionDate}
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}