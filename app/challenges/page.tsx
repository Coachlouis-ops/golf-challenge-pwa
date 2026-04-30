"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";


type Challenge = {
  challengeId: string;
  challengeTitle: string;
  courseName: string;
  gameFormat: string;
  entryTokens: number;
  status: string;
  createdAt?: any;
};

export default function ChallengesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
     const q = query(
  collection(db, "challenges"),
  where("participants", "array-contains", user.uid),
  orderBy("createdAt", "desc")
);

      const snap = await getDocs(q);

      const rows: Challenge[] = snap.docs.map((d) => {
        const data = d.data() as any;

        return {
          challengeId: data.challengeId || d.id,
          challengeTitle: data.challengeTitle || "—",
          courseName: data.courseName || "—",
          gameFormat: data.gameFormat || "—",
          entryTokens: data.entryTokens || 0,
          status: data.status || "—",
          createdAt: data.createdAt,
        };
      });

      setChallenges(rows);
      setLoading(false);
    })();
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>No user loaded</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Loading challenges…</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex justify-center px-4 py-12 bg-black text-white overflow-hidden">

      {/* STADIUM LIGHT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-green-400 opacity-10 blur-[120px] pointer-events-none" />

      {/* PARTICLE GRID */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* KNEELING BADGER */}
     <img
  src="/badger-kneeling-yellow.png"
  className="absolute bottom-0 left-0 h-[95%] opacity-80 drop-shadow-[0_0_40px_rgba(255,220,0,0.7)] pointer-events-none"
/>

      {/* MAIN PANEL */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-6">

        <h1 className="text-4xl font-bold text-center text-green-400 tracking-widest drop-shadow-[0_0_10px_#39FF14]">
          CHALLENGES
        </h1>

        {challenges.length === 0 && (
          <p className="text-gray-400 text-center">
            No challenges found.
          </p>
        )}

        <div className="flex flex-col gap-4">

          {challenges.map((c) => (
            <div
              key={c.challengeId}
              className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-xl p-5 shadow-[0_0_20px_rgba(0,255,120,0.15)] hover:shadow-[0_0_35px_rgba(0,255,120,0.35)] transition-all flex flex-col gap-3"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-lg font-semibold text-green-400">
                  {c.challengeTitle}
                </h2>

                <span className="text-xs px-3 py-1 rounded-full bg-neutral-800 border border-neutral-600">
                  {c.status}
                </span>

              </div>

              <p className="text-sm text-gray-400">
                {c.courseName}
              </p>

              <div className="flex gap-6 text-sm">

                <span>
                  <strong>Format:</strong> {c.gameFormat}
                </span>

                <span>
                  <strong>Tokens:</strong> {c.entryTokens}
                </span>

              </div>

            </div>
          ))}

        </div>
      </div>
    </main>
  );
}