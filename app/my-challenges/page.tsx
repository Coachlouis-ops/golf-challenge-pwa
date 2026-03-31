"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import RequireAuth from "@/src/lib/RequireAuth";

type ChallengeItem = {
  id: string;
  challengeTitle: string;
  createdAt?: any;
  finalizedAt?: any;
  isCompleted?: boolean;
};

export default function MyChallengesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchChallenges() {

     async function fetchChallenges() {
  if (!user) return;

  const uid = user.uid;

  // 🔹 1. CREATOR CHALLENGES
  const creatorQuery = query(
    collection(db, "challenges"),
    where("creatorUid", "==", uid)
  );

      const creatorSnap = await getDocs(creatorQuery);

      const creatorList = creatorSnap.docs.map((docSnap) => {
        const data = docSnap.data();

        return {
          id: docSnap.id,
          challengeTitle: data.challengeTitle,
          createdAt: data.createdAt,
          finalizedAt: data.finalizedAt,
          isCompleted:
            data.status === "completed" || !!data.finalizedAt,
        };
      });

      // 🔹 2. PLAYER CHALLENGES (SCAN)
      const allSnap = await getDocs(collection(db, "challenges"));

      const playerList: ChallengeItem[] = [];

      for (const docSnap of allSnap.docs) {
        const playerRef = doc(
          db,
          "challenges",
          docSnap.id,
          "players",
          user.uid
        );

        const playerDoc = await getDoc(playerRef);

        if (playerDoc.exists()) {
          const data = docSnap.data();

          playerList.push({
            id: docSnap.id,
            challengeTitle: data.challengeTitle,
            createdAt: data.createdAt,
            finalizedAt: data.finalizedAt,
            isCompleted:
              data.status === "completed" || !!data.finalizedAt,
          });
        }
      }

      // 🔹 3. MERGE + REMOVE DUPLICATES
      const map = new Map<string, ChallengeItem>();

      [...creatorList, ...playerList].forEach((c) => {
        map.set(c.id, c);
      });

      const finalList = Array.from(map.values());

      // 🔹 4. SORT
      finalList.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });

      setChallenges(finalList);
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

          {/* EMPTY */}
          {challenges.length === 0 && (
            <div className="bg-[#111] p-4 rounded-2xl text-center text-gray-400">
              No challenges yet.
            </div>
          )}

          {/* LIST */}
          <div className="flex flex-col gap-4">
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => router.push(`/challenges/${challenge.id}`)}
                className="w-full p-4 bg-[#111] rounded-2xl text-left shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]"
              >
                <div className="flex flex-col gap-2">

                  <div className="flex justify-between items-center">

                    <div className="text-base font-semibold text-red-400">
                      {challenge.challengeTitle}
                    </div>

                    <div
                      className={`text-[10px] px-2 py-1 rounded-full ${
                        challenge.isCompleted
                          ? "bg-gray-700 text-gray-300"
                          : "bg-red-500 text-black shadow-[0_0_10px_#ff0000]"
                      }`}
                    >
                      {challenge.isCompleted ? "COMPLETED" : "ACTIVE"}
                    </div>

                  </div>

                  <div className="text-xs text-gray-400">
                    {challenge.createdAt
                      ? new Date(
                          challenge.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : ""}
                  </div>

                  <div className="text-xs text-gray-500">
                    Tap to view challenge
                  </div>

                </div>
              </button>
            ))}
          </div>

          {/* BACK */}
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