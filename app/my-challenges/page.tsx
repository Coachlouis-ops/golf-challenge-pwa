"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

type Challenge = {
  challengeId: string;
  challengeTitle: string;
  courseName: string;
  gameFormat: string;
  entryTokens: number;
  status: string;
  creatorUid: string;
  createdAt?: any;
};

export default function ChallengesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const uid = user.uid;

    async function loadChallenges() {
      try {
        setLoading(true);
        setError(null);

        const challengesQuery = query(
          collection(db, "challenges"),
          where("participants", "array-contains", uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(challengesQuery);

        const rows: Challenge[] = snapshot.docs.map((challengeDocument) => {
          const data = challengeDocument.data() as any;

          return {
            challengeId: data.challengeId || challengeDocument.id,
            challengeTitle: data.challengeTitle || "Untitled Challenge",
            courseName: data.courseName || "—",
            gameFormat: data.gameFormat || "—",
            entryTokens: data.entryTokens || 0,
            status: data.status || "pending",
            creatorUid: data.creatorUid || "",
            createdAt: data.createdAt,
          };
        });

        setChallenges(rows);
      } catch (err: any) {
        console.error("Failed to load challenges:", err);
        setError(err.message || "Failed to load challenges.");
      } finally {
        setLoading(false);
      }
    }

    loadChallenges();
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
        <p>Loading matches…</p>
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
        alt="Badger illustration"
        className="absolute bottom-0 left-0 h-[95%] opacity-80 drop-shadow-[0_0_40px_rgba(255,220,0,0.7)] pointer-events-none"
      />

      {/* MAIN PANEL */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="self-start text-sm underline text-gray-300 hover:text-white"
        >
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-center text-green-400 tracking-widest drop-shadow-[0_0_10px_#39FF14]">
          MY CHALLENGES
        </h1>

        {error && (
          <div className="bg-red-950/50 border border-red-500 rounded-xl p-4 text-center text-red-200">
            {error}
          </div>
        )}

        {!error && challenges.length === 0 && (
          <div className="bg-neutral-900/80 border border-neutral-700 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-green-400 mb-2">
              No Challenges
            </h2>

            <p className="text-gray-300">
              You do not currently have any challenges.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {challenges.map((challenge) => {
            const isCreator = challenge.creatorUid === user.uid;

            return (
              <button
                key={challenge.challengeId}
                type="button"
                onClick={() =>
                  router.push(`/challenges/${challenge.challengeId}`)
                }
                className="w-full text-left bg-neutral-900/80 backdrop-blur-xl border border-neutral-700 rounded-xl p-5 shadow-[0_0_20px_rgba(0,255,120,0.15)] hover:border-green-400 hover:shadow-[0_0_35px_rgba(0,255,120,0.35)] hover:scale-[1.01] transition-all flex flex-col gap-3 cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-green-400">
                      {challenge.challengeTitle}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      {challenge.courseName}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-neutral-800 border border-neutral-600">
                      {challenge.status}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        isCreator
                          ? "bg-red-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {isCreator ? "Creator Controls" : "View Only"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <span>
                    <strong>Format:</strong> {challenge.gameFormat}
                  </span>

                  <span>
                    <strong>Entry Tokens:</strong> {challenge.entryTokens}
                  </span>
                </div>

                <div className="text-xs text-gray-400 pt-2 border-t border-neutral-700">
                  Click to open challenge
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}