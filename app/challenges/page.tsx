"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

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
      <main className="min-h-screen flex items-center justify-center">
        <p>No user loaded</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading challenges…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Challenges</h1>

      {challenges.length === 0 && (
        <p className="text-gray-500">No challenges found.</p>
      )}

      {challenges.map((c) => (
        <div
          key={c.challengeId}
          className="border rounded p-4 flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{c.challengeTitle}</h2>
            <span className="text-xs px-2 py-1 rounded bg-gray-200">
              {c.status}
            </span>
          </div>

          <p className="text-sm text-gray-600">{c.courseName}</p>

          <div className="text-sm flex gap-4">
            <span><strong>Format:</strong> {c.gameFormat}</span>
            <span><strong>Tokens:</strong> {c.entryTokens}</span>
          </div>
        </div>
      ))}
    </main>
  );
}
