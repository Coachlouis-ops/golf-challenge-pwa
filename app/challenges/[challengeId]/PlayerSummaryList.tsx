"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

type PlayerSummary = {
  uid: string;
  displayName?: string;
  position?: number;
  total?: number;
  status?: string;
};

export default function PlayerSummaryList({
  challengeId,
}: {
  challengeId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PlayerSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!challengeId) return;

    const ref = collection(db, "challenges", challengeId, "players");

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        const rows: PlayerSummary[] = snap.docs.map((d) => ({
          uid: d.id,
          displayName: d.get("displayName"),
          position: d.get("position"),
          total: d.get("total"),
          status: d.get("resultText") || d.get("status"),
        }));

        rows.sort((a, b) => {
          const pa = a.position ?? 999;
          const pb = b.position ?? 999;
          return pb - pa;
        });

        setItems(rows);
        setLoading(false);
      },
      (e) => {
        setError(e.message || "Failed to load player summary");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [challengeId]);

  if (loading) return <p>Loading player summary…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!items.length) return <p>No player summary data.</p>;

  return (
    <div className="border rounded p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Player Summary</h2>

      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Pos</th>
            <th className="p-2 text-left">Player</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.uid} className="border-t">
              <td className="p-2">{p.position ?? "—"}</td>
              <td className="p-2">{p.displayName ?? p.uid}</td>
              <td className="p-2">{p.total ?? "—"}</td>
              <td className="p-2">{p.status ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}