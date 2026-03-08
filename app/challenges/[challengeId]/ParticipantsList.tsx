"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

type Player = {
  uid: string;
  displayName: string;
  status: string;
  joinedAt?: any;
};

export default function ParticipantsList({
  challengeId,
}: {
  challengeId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!challengeId) return;

    (async () => {
      try {
        const ref = collection(
          db,
          "challenges",
          challengeId,
          "players" // ✅ authoritative participants
        );

        const snap = await getDocs(ref);

        const list: Player[] = snap.docs.map((doc) => {
          const data = doc.data() as any;

          return {
            uid: doc.id,
            displayName: data.displayName || "—",
            status: data.status || "UNKNOWN",
            joinedAt: data.joinedAt,
          };
        });

        setPlayers(list);
      } catch (e: any) {
        setError(e.message || "Failed to load players");
      } finally {
        setLoading(false);
      }
    })();
  }, [challengeId]);

  if (loading) return <p>Loading participants…</p>;

  if (error)
    return <p className="text-red-600">Participants error: {error}</p>;

  if (players.length === 0)
    return <p>No participants found</p>;

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Participants</h2>

      <ul className="flex flex-col gap-2">
        {players.map((p) => (
          <li key={p.uid} className="border rounded px-3 py-2">
            <div className="font-medium">{p.displayName}</div>
            <div className="text-xs text-gray-500">
              {p.status.toUpperCase()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
