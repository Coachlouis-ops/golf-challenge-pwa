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
    <div className="flex w-full max-w-full flex-col gap-3 overflow-hidden rounded border border-white/15 p-3 sm:p-4">
      <h2 className="text-lg font-semibold">Leaderboard</h2>

      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full border border-white/15 text-sm">
          <thead className="bg-cyan-950/60 text-cyan-200">
            <tr>
              <th className="p-2 text-left font-black">Pos</th>
              <th className="p-2 text-left font-black">Player</th>
              <th className="p-2 text-left font-black">Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.uid} className="border-t border-white/10">
                <td className="p-2">{r.position ?? "—"}</td>
                <td className="break-words p-2">{r.displayName ?? r.uid}</td>
                <td className="p-2">{getDisplayValue(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
