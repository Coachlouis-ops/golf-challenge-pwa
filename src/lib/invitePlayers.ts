export type InviteTarget = {
  uid: string;
  name: string;
  spotId: string;
};

type InviteSpot = {
  id: string;
  playerUid: string;
  playerName: string;
};

type InviteSetup = {
  sides: { spots: InviteSpot[] }[];
};

export function playerLabel(player: {
  name?: string;
  surname?: string;
  battleName?: string;
}): string {
  const full = `${player.name || ""} ${player.surname || ""}`.trim();
  const battle = (player.battleName || "").trim();
  if (full && battle) return `${full} (${battle})`;
  return full || battle || "Player";
}

export function inviteTargets(
  setup: InviteSetup,
  creatorUid?: string | null
): InviteTarget[] {
  const seen = new Set<string>();
  const targets: InviteTarget[] = [];

  for (const side of setup.sides) {
    for (const spot of side.spots) {
      const uid = spot.playerUid.trim();
      if (!uid || uid === creatorUid || seen.has(uid)) continue;
      seen.add(uid);
      targets.push({
        uid,
        name: spot.playerName.trim() || "Player",
        spotId: spot.id,
      });
    }
  }

  return targets;
}
