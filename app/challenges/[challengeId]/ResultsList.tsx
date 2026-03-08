"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

type ResultRow = {
  uid: string;
  displayName?: string;
  position?: number;
  total?: number;
  resultText?: string;
};

export default function ResultsList({
  challengeId,
}: {
  challengeId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<ResultRow[]>([]);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  if (!challengeId) return;

  const ref = collection(db, "challenges", challengeId, "players");
  const q = query(ref, orderBy("position", "asc"));

  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const data: ResultRow[] = snap.docs.map((d) => ({
        uid: d.id,
        displayName: d.get("displayName"),
        position: d.get("position"),
        total: d.get("total"),
        resultText: d.get("resultText"),
      }));

      setRows(data);
      setLoading(false);
    },
    (e) => {
      setError(e.message || "Failed to load results");
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, [challengeId]);
  function getDisplayValue(r: ResultRow) {
    if (r.resultText) {
      const text = r.resultText.toLowerCase();
      if (text === "win") return "Win";
      if (text === "lost") return "Lost";
      if (text === "draw") return "Draw";
      return r.resultText;
    }

    if (r.total != null) return r.total;

    return "—";
  }

  if (loading) return <p>Loading results…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!rows.length) return <p>No results available.</p>;

  return (
    <div className="border rounded p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Leaderboard</h2>

      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Pos</th>
            <th className="p-2 text-left">Player</th>
            <th className="p-2 text-left">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.uid} className="border-t">
              <td className="p-2">{r.position ?? "—"}</td>
              <td className="p-2">{r.displayName ?? r.uid}</td>
              <td className="p-2">{getDisplayValue(r)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
