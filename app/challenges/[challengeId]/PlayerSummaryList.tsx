"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { playerVerifiedForRevision } from "@/src/lib/resultVerification";

type PlayerSummary = {
  uid: string;
  displayName?: string;
  position?: number;
  total?: number;
  status?: string;
  resultVerified: boolean;
  verifiedRevision: number | null;
};

export default function PlayerSummaryList({
  challengeId,
  showVerification = false,
  resultsRevision = 0,
}: {
  challengeId: string;
  showVerification?: boolean;
  resultsRevision?: number;
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
       const rows: PlayerSummary[] = snap.docs.map((d) => {
  const name = d.get("displayName");

  return {
    uid: d.id,
    displayName:
      name && name !== d.id ? name : "Player",
    position: d.get("position"),
    total: d.get("total"),
    status: d.get("resultText") || d.get("status"),
    resultVerified:
      d.get("resultVerified") === true || d.get("resultAccepted") === true,
    verifiedRevision: (() => {
      const raw = d.get("verifiedRevision");
      const revision = Number(raw);
      return raw == null || raw === "" || !Number.isFinite(revision) ? null : revision;
    })(),
  };
});

        rows.sort((a, b) => {
          const pa = a.position ?? 999;
          const pb = b.position ?? 999;
          return pa - pb;
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
    <div className="w-full max-w-full overflow-hidden rounded border border-white/15 p-3 sm:p-4">
      <h2 className="text-lg font-semibold">Player Summary</h2>

      <div className="mt-3 flex flex-col gap-3 sm:hidden">
        {items.map((player) => {
          const verified = playerVerifiedForRevision(player, resultsRevision);
          return (
            <article
              key={player.uid}
              className="w-full max-w-full rounded-xl border border-white/15 bg-black/40 p-3"
            >
              <div className="flex items-start gap-3">
                <p className="shrink-0 text-lg font-black text-cyan-200">
                  #{player.position ?? "—"}
                </p>
                <p className="min-w-0 break-words text-sm font-bold text-white">
                  {player.displayName ?? player.uid}
                </p>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-[10px] font-black uppercase tracking-wide text-cyan-300">
                    Total
                  </dt>
                  <dd className="mt-1 font-bold text-white">{player.total ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-black uppercase tracking-wide text-cyan-300">
                    Status
                  </dt>
                  <dd className="mt-1 break-words font-bold text-white">
                    {player.status ?? "—"}
                  </dd>
                </div>
              </dl>
              {showVerification && (
                <p
                  className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${
                    verified ? "bg-emerald-400 text-black" : "bg-yellow-300 text-black"
                  }`}
                >
                  {verified ? "Verified" : "Pending"}
                </p>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-3 hidden w-full max-w-full overflow-x-auto sm:block">
        <table className="w-full border border-white/15 text-sm">
          <thead className="bg-cyan-950/60 text-cyan-200">
            <tr>
              <th className="p-3 text-left font-black">Pos</th>
              <th className="p-3 text-left font-black">Player</th>
              <th className="p-3 text-left font-black">Total</th>
              <th className="p-3 text-left font-black">Status</th>
              {showVerification && <th className="p-3 text-left font-black">Check</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((player) => {
              const verified = playerVerifiedForRevision(player, resultsRevision);
              return (
                <tr key={player.uid} className="border-t border-white/10">
                  <td className="p-3">{player.position ?? "—"}</td>
                  <td className="min-w-0 break-words p-3">{player.displayName ?? player.uid}</td>
                  <td className="p-3">{player.total ?? "—"}</td>
                  <td className="break-words p-3">{player.status ?? "—"}</td>
                  {showVerification && (
                    <td className="p-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-black uppercase ${
                          verified ? "bg-emerald-400 text-black" : "bg-yellow-300 text-black"
                        }`}
                      >
                        {verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}