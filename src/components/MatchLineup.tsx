"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import type { MatchSetup, Spot } from "@/src/lib/challengeMatch";
import { linkMatchup, playerLabel } from "@/src/lib/challengeMatch";

export type PlayerPick = {
  uid: string;
  name: string;
  surname: string;
  battleName: string;
  club: string;
};

type Props = {
  setup: MatchSetup;
  locked: boolean;
  onChange: (setup: MatchSetup) => void;
  onPickPlayer?: (spotId: string, player: PlayerPick) => Promise<void> | void;
  onRemovePlayer?: (spotId: string, playerUid: string) => Promise<void> | void;
};

function placedUidKey(setup: MatchSetup): string {
  return setup.sides
    .flatMap((side) => side.spots.map((spot) => spot.playerUid.trim()))
    .filter(Boolean)
    .join("|");
}

export default function MatchLineup({
  setup,
  locked,
  onChange,
  onPickPlayer,
  onRemovePlayer,
}: Props) {
  const [openSpotId, setOpenSpotId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<PlayerPick[]>([]);
  const [searching, setSearching] = useState(false);
  const [sendingUid, setSendingUid] = useState<string | null>(null);
  const placedKey = placedUidKey(setup);

  useEffect(() => {
    if (!openSpotId || searchTerm.trim().length < 2) {
      return;
    }

    let cancelled = false;
    const term = searchTerm.trim().toLowerCase();
    const excluded = new Set(placedKey.split("|").filter(Boolean));

    (async () => {
      setSearching(true);
      try {
        const snap = await getDocs(
          query(
            collection(db, "profiles"),
            where("searchIndex", ">=", term),
            where("searchIndex", "<=", term + "\uf8ff")
          )
        );

        if (cancelled) return;

        setResults(
          snap.docs
            .map((profileDoc) => {
              const profile = profileDoc.data();
              return {
                uid: profileDoc.id,
                name: String(profile.name || ""),
                surname: String(profile.surname || ""),
                battleName: String(profile.battleName || ""),
                club: String(profile.club || ""),
                searchIndex: String(profile.searchIndex || ""),
              };
            })
            .filter(
              (player) => player.searchIndex.length > 0 && !excluded.has(player.uid)
            )
            .map((player) => ({
              uid: player.uid,
              name: player.name,
              surname: player.surname,
              battleName: player.battleName,
              club: player.club,
            }))
        );
      } catch (error) {
        console.error("Player search failed", error);
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [openSpotId, placedKey, searchTerm]);

  useEffect(() => {
    if (!openSpotId || searchTerm.trim().length < 2) {
      setResults([]);
      setSearching(false);
    }
  }, [openSpotId, searchTerm]);

  const allSpots = setup.sides.flatMap((side) =>
    side.spots.map((spot) => ({
      ...spot,
      sideName: side.name,
    }))
  );

  async function choose(spot: Spot, player: PlayerPick) {
    if (!onPickPlayer) return;
    setSendingUid(player.uid);
    try {
      await onPickPlayer(spot.id, player);
      setOpenSpotId(null);
      setSearchTerm("");
      setResults([]);
    } catch {
      // The page shows the invite error and leaves the search open.
    } finally {
      setSendingUid(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {setup.sides.map((side) => (
        <section
          key={side.id}
          className="rounded-2xl border border-cyan-400/40 bg-black/50 p-4"
        >
          <h3 className="text-lg font-black text-cyan-300">{side.name}</h3>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {side.spots.map((spot) => {
              const opponent = allSpots.find((item) => item.id === spot.opponentSpotId);
              const filled = Boolean(spot.playerUid);
              const searchOpen = openSpotId === spot.id;

              return (
                <div
                  key={spot.id}
                  className="rounded-xl border border-white/15 bg-neutral-950 p-3"
                >
                  <p className="text-xs font-bold tracking-[0.16em] text-gray-400">
                    SPOT {spot.number}
                  </p>

                  {filled ? (
                    <div className="mt-2">
                      <p className="text-base font-bold text-white">
                        {spot.playerName || "Player"}
                      </p>
                      <span className="mt-2 inline-flex rounded-full border border-yellow-300/70 bg-yellow-300/10 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-yellow-200">
                        Invited
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400">Open spot</p>
                  )}

                  <label className="mt-3 block text-xs text-gray-300">
                    Matchup
                    <select
                      disabled={locked}
                      value={spot.opponentSpotId}
                      onChange={(event) =>
                        onChange(linkMatchup(setup, spot.id, event.target.value))
                      }
                      className="mt-1 w-full rounded-lg border border-cyan-400/50 bg-black px-3 py-2 text-sm font-semibold text-white outline-none disabled:opacity-70"
                    >
                      <option value="">No opponent</option>
                      {allSpots
                        .filter((item) => item.id !== spot.id)
                        .map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.sideName} spot {item.number}
                          </option>
                        ))}
                    </select>
                  </label>

                  <p className="mt-2 text-xs text-gray-400">
                    {opponent
                      ? `Plays ${opponent.sideName} spot ${opponent.number}`
                      : "Not paired yet"}
                  </p>

                  {!locked && !filled && onPickPlayer && (
                    <button
                      type="button"
                      onClick={() => {
                        setOpenSpotId(searchOpen ? null : spot.id);
                        setSearchTerm("");
                        setResults([]);
                      }}
                      className="mt-3 rounded-lg border border-green-400 px-3 py-2 text-xs font-bold text-green-300"
                    >
                      {searchOpen ? "Close search" : "Add player"}
                    </button>
                  )}

                  {filled && !locked && onRemovePlayer && (
                    <button
                      type="button"
                      onClick={() => void onRemovePlayer(spot.id, spot.playerUid)}
                      className="mt-3 rounded-lg border border-red-400 px-3 py-2 text-xs font-bold text-red-300"
                    >
                      Remove
                    </button>
                  )}

                  {searchOpen && onPickPlayer && (
                    <div className="mt-3 flex flex-col gap-2">
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search player name, surname, club or battle name"
                        className="w-full rounded-xl border border-cyan-400/60 bg-black px-3 py-3 text-sm font-semibold text-white outline-none focus:border-cyan-200"
                      />
                      <p className="text-[11px] text-gray-400">
                        Registered players only. Type at least 2 letters.
                      </p>
                      {searching && (
                        <p className="text-xs font-bold text-cyan-300">Searching...</p>
                      )}
                      {!searching && searchTerm.trim().length >= 2 && results.length === 0 && (
                        <p className="text-xs text-gray-400">No matching players.</p>
                      )}
                      {results.map((player) => (
                        <div
                          key={player.uid}
                          className="flex flex-col gap-2 rounded-xl border border-cyan-400/30 bg-black p-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-white">
                              {playerLabel(player)}
                            </p>
                            {player.club && (
                              <p className="truncate text-xs text-gray-400">{player.club}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            disabled={sendingUid === player.uid}
                            onClick={() => void choose(spot, player)}
                            className="rounded-xl bg-green-400 px-4 py-2 text-xs font-black text-black disabled:opacity-50"
                          >
                            {sendingUid === player.uid ? "Sending..." : "Invite"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
