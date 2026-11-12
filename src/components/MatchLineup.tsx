"use client";

import type { MatchSetup, Side, Spot } from "@/src/lib/challengeMatch";
import { assignSpot, clearSpot, linkMatchup } from "@/src/lib/challengeMatch";

type Props = {
  setup: MatchSetup;
  locked: boolean;
  onChange: (setup: MatchSetup) => void;
  onInvite: (side: Side, spot: Spot) => void;
};

export default function MatchLineup({
  setup,
  locked,
  onChange,
  onInvite,
}: Props) {
  const allSpots = setup.sides.flatMap((side) =>
    side.spots.map((spot) => ({
      ...spot,
      sideName: side.name,
    }))
  );

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
              const filled = Boolean(spot.playerName || spot.playerUid);

              return (
                <div
                  key={spot.id}
                  className="rounded-xl border border-white/15 bg-neutral-950 p-3"
                >
                  <p className="text-xs font-bold tracking-[0.16em] text-gray-400">
                    SPOT {spot.number}
                  </p>

                  {filled ? (
                    <p className="mt-2 text-base font-bold text-white">
                      {spot.playerName || "Player invited"}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400">Open spot</p>
                  )}

                  {!locked && (
                    <label className="mt-3 block text-xs text-gray-300">
                      Player name
                      <input
                        value={spot.playerName}
                        onChange={(event) =>
                          onChange(
                            assignSpot(setup, spot.id, event.target.value, spot.playerUid)
                          )
                        }
                        className="mt-1 w-full rounded-lg border border-cyan-400/50 bg-black px-3 py-2 text-sm font-semibold text-white outline-none"
                      />
                    </label>
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

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onInvite(side, spot)}
                      className="rounded-lg border border-green-400 px-3 py-2 text-xs font-bold text-green-300"
                    >
                      Invite player
                    </button>

                    {filled && !locked && (
                      <button
                        type="button"
                        onClick={() => onChange(clearSpot(setup, spot.id))}
                        className="rounded-lg border border-red-400 px-3 py-2 text-xs font-bold text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
