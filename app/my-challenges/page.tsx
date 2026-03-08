"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
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
 where("creatorUid", "==", user!.uid),
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
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <RequireAuth>
      <main className="min-h-screen max-w-2xl mx-auto p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">My Challenges</h1>

        {challenges.length === 0 && (
          <p className="text-gray-500">No challenges created yet.</p>
        )}

        {challenges.map((challenge) => (
          <button
            key={challenge.id}
            onClick={() => router.push(`/challenges/${challenge.id}`)}
            className="w-full p-4 border rounded text-left hover:bg-gray-100"
          >
            {challenge.challengeTitle}
          </button>
        ))}
      </main>
    </RequireAuth>
  );
}
