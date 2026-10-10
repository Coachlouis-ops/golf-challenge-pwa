"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";

type Player = {
  uid: string;
  position: number;
  name: string;
  teezDollars: number;
};

// Balanced snake seeding: total rank sum is 68 for each full team.
const USA_SEEDS = new Set([1, 4, 5, 8, 9, 12, 13, 16]);
const EUROPE_SEEDS = new Set([2, 3, 6, 7, 10, 11, 14, 15]);

function displayName(data: Record<string, unknown>): string {
  const battleName = typeof data.battleName === "string" ? data.battleName.trim() : "";
  const first = typeof data.name === "string" ? data.name.trim() : "";
  const last = typeof data.surname === "string" ? data.surname.trim() : "";
  return battleName || `${first} ${last}`.trim() || "TEEZ Player";
}

function dollars(amount: number): string {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function RyderCupPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadStandings() {
      try {
        setLoading(true);
        setError("");
        // TEEZ Dollars are stored on profiles; these are fictional career totals,
        // not spendable wallet balances or real money.
        const snapshot = await getDocs(
          query(collection(db, "profiles"), orderBy("teezDollars", "desc"), limit(16))
        );
        const ranked = snapshot.docs.map((entry, index) => {
          const data = entry.data();
          return {
            uid: entry.id,
            position: index + 1,
            name: displayName(data),
            teezDollars: Number(data.teezDollars ?? 0) || 0,
          };
        });
        if (!cancelled) setPlayers(ranked);
      } catch (err) {
        console.error("Unable to load Ryder Cup standings:", err);
        if (!cancelled) setError("Unable to load standings. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadStandings();
    return () => { cancelled = true; };
  }, [user]);

  const usa = players.filter((player) => USA_SEEDS.has(player.position));
  const europe = players.filter((player) => EUROPE_SEEDS.has(player.position));
  const currentPlayer = players.find((player) => player.uid === user?.uid);
  const currentTeam = currentPlayer
    ? USA_SEEDS.has(currentPlayer.position) ? "TEAM USA" : "TEAM EUROPE"
    : null;

  return (
    <main className="min-h-screen bg-[#030608] text-white">
      <div className="mx-auto max-w-md pb-16">
        <header className="sticky top-0 z-30 border-b border-cyan-400/30 bg-[#030608]/95 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => router.back()} aria-label="Go back"
              className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/[0.05] text-2xl font-black text-cyan-300">‹</button>
            <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-cyan-400">TEEZ Golf Challenges</p>
              <h1 className="mt-1 text-lg font-black tracking-wide">RYDER CUP TEAM STANDINGS</h1>
            </div>
            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          <section className="border border-cyan-400/40 bg-[#071017] p-5 text-center shadow-[0_0_32px_rgba(34,211,238,0.12)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">USA vs Europe</p>
            <h2 className="mt-2 text-2xl font-black">TOP 16 TEEZ DOLLARS</h2>
            <p className="mt-3 text-sm leading-5 text-slate-400">
              The 16 highest-ranked players on the TEEZ Dollars list are seeded into two balanced teams.
              Rank #1 captains USA and rank #2 captains Europe.
            </p>
            {currentTeam && (
              <p className="mt-4 border border-amber-400/30 bg-amber-400/[0.07] px-3 py-2 text-xs font-black text-amber-300">
                YOUR CURRENT TEAM: {currentTeam} · SEED #{currentPlayer?.position}
              </p>
            )}
          </section>

          {loading ? (
            <p className="py-8 text-center text-sm text-cyan-300">Loading team standings...</p>
          ) : error ? (
            <p role="alert" className="border border-red-400/30 p-4 text-sm text-red-300">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-blue-400/40 bg-blue-400/[0.06] p-4 text-center">
                  <p className="text-sm font-black text-blue-300">TEAM USA</p>
                  <p className="mt-2 text-2xl font-black">{usa.length}/8</p>
                  <p className="mt-1 text-[10px] text-slate-400">Captain: Seed #1</p>
                </div>
                <div className="border border-amber-400/40 bg-amber-400/[0.06] p-4 text-center">
                  <p className="text-sm font-black text-amber-300">TEAM EUROPE</p>
                  <p className="mt-2 text-2xl font-black">{europe.length}/8</p>
                  <p className="mt-1 text-[10px] text-slate-400">Captain: Seed #2</p>
                </div>
              </div>
              <TeamSection title="TEAM USA" players={usa} color="blue" currentUid={user?.uid} />
              <TeamSection title="TEAM EUROPE" players={europe} color="amber" currentUid={user?.uid} />
              {players.length === 0 && (
                <p className="text-center text-sm text-slate-400">No TEEZ Dollars standings are available yet.</p>
              )}
              <p className="text-center text-xs leading-5 text-slate-500">
                Teams update when this page is opened or refreshed. TEEZ Dollars are fictional career earnings and have no cash value.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function TeamSection({ title, players, color, currentUid }: {
  title: string;
  players: Player[];
  color: "blue" | "amber";
  currentUid?: string;
}) {
  const accent = color === "blue" ? "text-blue-300" : "text-amber-300";
  const border = color === "blue" ? "border-blue-400/40" : "border-amber-400/40";
  return (
    <section className={`overflow-hidden border ${border} bg-[#071017]`}>
      <div className={`border-b ${border} px-4 py-4`}>
        <h3 className={`text-lg font-black ${accent}`}>{title}</h3>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">TEEZ Dollars ranking · Snake seeding</p>
      </div>
      {players.length === 0 ? (
        <p className="p-4 text-sm text-slate-500">Awaiting qualifying players</p>
      ) : players.map((player) => (
        <div key={player.uid} className={`flex items-center gap-3 border-b border-white/10 px-4 py-3 last:border-b-0 ${player.uid === currentUid ? "bg-cyan-400/[0.08]" : ""}`}>
          <span className={`w-9 shrink-0 text-lg font-black ${accent}`}>#{player.position}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-white">{player.name}{player.uid === currentUid ? " · YOU" : ""}</p>
            {player.position === 1 || player.position === 2 ? (
              <p className={`mt-1 text-[9px] font-black uppercase ${accent}`}>Team Captain</p>
            ) : null}
          </div>
          <span className="shrink-0 text-right text-xs font-bold tabular-nums text-slate-300">{dollars(player.teezDollars)}</span>
        </div>
      ))}
    </section>
  );
}
