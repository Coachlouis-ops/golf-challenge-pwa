"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import RequireAuth from "@/src/lib/RequireAuth";

type ChallengeItem = {
  id: string;
  challengeTitle: string;
  createdAt?: any;
};

export default function MyChallengesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchChallenges() {
      const q = query(
        collection(db, "challenges"),
        where("creatorUid", "==", user!.uid)
      );

      const snap = await getDocs(q);

      const list: ChallengeItem[] = snap.docs.map((doc) => ({
        id: doc.id,
        challengeTitle: doc.data().challengeTitle,
        createdAt: doc.data().createdAt,
      }));

      setChallenges(list);
      setLoading(false);
    }

    fetchChallenges();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  return (
    <RequireAuth>
      <main className="relative min-h-screen flex justify-center px-6 py-14 bg-black text-white overflow-hidden">

        {/* STADIUM LIGHT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-red-500 opacity-10 blur-[120px] pointer-events-none" />

        {/* PARTICLE GRID */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#ff0000_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* RED BADGER RIGHT */}
        <img
          src="/badger-red-guardian.png"
          className="absolute right-0 bottom-0 h-[85%] opacity-60 pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6">

          <h1 className="text-4xl font-bold text-red-400 text-center tracking-widest drop-shadow-[0_0_12px_#ff0000]">
            MY CHALLENGES
          </h1>

          {challenges.length === 0 && (
            <p className="text-gray-400 text-center">
              No challenges created yet.
            </p>
          )}

          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => router.push(`/challenges/${challenge.id}`)}
              className="w-full p-5 bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-xl text-left shadow-[0_0_20px_rgba(255,0,0,0.15)] hover:shadow-[0_0_40px_rgba(255,0,0,0.35)] hover:border-red-400 transition-all"
            >
              <div className="text-lg font-semibold text-red-400">
                {challenge.challengeTitle}
              </div>
            </button>
          ))}
        </div>

      </main>
    </RequireAuth>
  );
}