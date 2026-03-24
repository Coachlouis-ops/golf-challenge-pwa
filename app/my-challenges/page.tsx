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
      <main className="relative min-h-screen bg-black text-white overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-red-500 opacity-10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#ff0000_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* BADGER */}
        <img
          src="/badger-red-guardian.png"
          className="absolute right-0 bottom-0 h-[85%] opacity-60 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col px-4 pt-14 pb-10 gap-6 max-w-2xl mx-auto w-full">

          {/* HEADER */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-white">
              My Challenges
            </h1>
            <p className="text-sm text-gray-400">
              View and manage your challenges
            </p>
          </div>

          {/* HERO LOGO */}
          <div className="w-full flex justify-center">
            <img
              src="/hero-teez.jpg"
              alt="Hero"
              className="w-full h-[180px] object-cover rounded-3xl shadow-[0_0_25px_rgba(255,0,0,0.25)]"
            />
          </div>

          {/* EMPTY STATE */}
          {challenges.length === 0 && (
            <div className="bg-[#111] p-4 rounded-2xl text-center text-gray-400">
              No challenges created yet.
            </div>
          )}

          {/* CHALLENGES LIST */}
          <div className="flex flex-col gap-4">
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => router.push(`/challenges/${challenge.id}`)}
                className="w-full p-4 bg-[#111] rounded-2xl text-left transition-all shadow-[0_0_15px_rgba(255,0,0,0.25)] hover:shadow-[0_0_35px_rgba(255,0,0,0.6)] animate-pulse"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-base font-semibold text-red-400">
                    {challenge.challengeTitle}
                  </div>
                  <div className="text-xs text-gray-400">
                    Tap to view challenge
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* BACK TO DASHBOARD */}
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-4 rounded-2xl bg-[#1f1f1f] text-white font-semibold"
          >
            Back to Dashboard
          </button>

        </div>

      </main>
    </RequireAuth>
  );
}