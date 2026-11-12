export const MAX_PLAYING_SPOTS = 248;

export const BET_AMOUNTS = [25, 50, 75, 100, 150, 200, 250] as const;

export type PlayMode = "singles" | "pairs" | "teams" | "groups";

export type TeamFormat = "better_ball" | "combined" | "multiplication";

export type SinglesFormat = "stroke_play" | "stableford" | "match_play";

export type ScoringMethod = "strokes" | "points" | "matchplay";

export type PlayerHoleScore = {
  playerId: string;
  strokes: number;
  points: number;
};

export type SideHoleScore = {
  sideId: string;
  players: PlayerHoleScore[];
};

export type HoleWinner = "A" | "B" | "half";

export type MatchplayScore = {
  holesWonA: number;
  holesWonB: number;
  holesHalved: number;
  winner: "A" | "B" | "tie";
};

export function formatRand(amount: number): string {
  return `R${amount}`;
}

export function playersPerSideForMode(
  mode: PlayMode,
  requested: number
): number {
  if (mode === "singles") return 1;
  if (mode === "pairs") return 2;
  return Math.max(1, Math.floor(requested));
}

export function sideCountForMode(mode: PlayMode, requested: number): number {
  if (mode === "singles" || mode === "pairs") return 2;
  return Math.max(2, Math.floor(requested));
}

export function playingSpotCount(sideCount: number, playersPerSide: number): number {
  return sideCount * playersPerSide;
}

export function withinPlayingSpotCap(
  sideCount: number,
  playersPerSide: number
): boolean {
  return (
    sideCount >= 2 &&
    playersPerSide >= 1 &&
    playingSpotCount(sideCount, playersPerSide) <= MAX_PLAYING_SPOTS
  );
}

export function scoringMethodForSingles(format: SinglesFormat): ScoringMethod {
  if (format === "stableford") return "points";
  if (format === "match_play") return "matchplay";
  return "strokes";
}

export function higherScoreWins(method: ScoringMethod): boolean {
  return method === "points";
}

/** Combined: every player's hole score on the side is added together. */
export function combineSideScores(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

/**
 * Locked multiplication rule, one hole: multiply the side's scores together.
 * A pair with 3 and 2 points scores 6 for that hole. A side with no scores
 * contributes 0. One score of 0 makes the hole product 0.
 */
export function multiplySideScores(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((product, value) => product * value, 1);
}

/** Locked multiplication rule, the round: add each hole's product. */
export function totalMultipliedHoles(holeProducts: number[]): number {
  return holeProducts.reduce((total, product) => total + product, 0);
}

/**
 * One side's score for a single hole.
 * Better ball keeps the strongest contribution.
 * Combined adds every player.
 * Multiplication multiplies every player.
 * Singles uses the only player's figure.
 * Matchplay uses the stroke figure for that hole.
 */
export function sideHoleValue(
  format: TeamFormat | "singles",
  method: ScoringMethod,
  players: PlayerHoleScore[]
): number {
  const figures = players.map((player) =>
    method === "points" ? player.points : player.strokes
  );

  if (figures.length === 0) {
    return method === "points" ? 0 : Number.POSITIVE_INFINITY;
  }

  if (format === "singles" || figures.length === 1) {
    return figures[0];
  }

  if (format === "combined") {
    return combineSideScores(figures);
  }

  if (format === "multiplication") {
    return multiplySideScores(figures);
  }

  const bestIsHighest = method === "points";
  return bestIsHighest ? Math.max(...figures) : Math.min(...figures);
}

export function compareHole(
  valueA: number,
  valueB: number,
  method: ScoringMethod
): HoleWinner {
  if (valueA === valueB) return "half";
  const aWins = method === "points" ? valueA > valueB : valueA < valueB;
  return aWins ? "A" : "B";
}

export function scoreMatchplay(
  holes: { valueA: number; valueB: number }[],
  method: ScoringMethod
): MatchplayScore {
  let holesWonA = 0;
  let holesWonB = 0;
  let holesHalved = 0;

  for (const hole of holes) {
    const winner = compareHole(hole.valueA, hole.valueB, method);
    if (winner === "A") holesWonA += 1;
    else if (winner === "B") holesWonB += 1;
    else holesHalved += 1;
  }

  const winner =
    holesWonA === holesWonB ? "tie" : holesWonA > holesWonB ? "A" : "B";

  return { holesWonA, holesWonB, holesHalved, winner };
}

export function totalSideScore(
  holeValues: number[],
  method: ScoringMethod,
  format?: TeamFormat | "singles"
): number {
  if (method === "matchplay") {
    return holeValues.length;
  }

  if (format === "multiplication") {
    return totalMultipliedHoles(holeValues);
  }

  return holeValues.reduce((sum, value) => sum + value, 0);
}

export function rankTotals(
  totals: { id: string; total: number }[],
  method: ScoringMethod
): { id: string; total: number; place: number }[] {
  const direction = method === "points" ? -1 : 1;
  const sorted = [...totals].sort(
    (left, right) => (left.total - right.total) * direction
  );

  let place = 1;

  return sorted.map((entry, index) => {
    if (index > 0 && entry.total !== sorted[index - 1].total) {
      place = index + 1;
    }

    return { ...entry, place };
  });
}

export function winnerExplanation(input: {
  mode: PlayMode;
  format: TeamFormat | SinglesFormat;
  scoringMethod: ScoringMethod;
}): string {
  const { mode, format, scoringMethod } = input;

  if (mode === "singles") {
    if (scoringMethod === "points") {
      return "Each player keeps their own Stableford points. The highest total wins.";
    }

    if (scoringMethod === "matchplay") {
      return "The two players meet hole by hole. The lower score wins the hole, a level hole is halved, and the player who wins the most holes wins the match.";
    }

    return "Each player keeps their own stroke total. The lowest total wins.";
  }

  const unit = mode === "groups" ? "group" : "side";
  const formatSentence =
    format === "better_ball"
      ? `On each hole only the best score from the ${unit} counts.`
      : format === "multiplication"
        ? `On each hole the ${unit}'s scores are multiplied together. A pair scoring 3 and 2 on a hole scores 6 for that hole. Those hole products are then added up.`
        : `On each hole every player's score in the ${unit} is added together.`;

  if (scoringMethod === "points") {
    return format === "multiplication"
      ? `${formatSentence} The highest total wins.`
      : `${formatSentence} Those points are added for the round, and the highest total wins.`;
  }

  if (scoringMethod === "matchplay") {
    return format === "multiplication"
      ? `On each hole the ${unit}'s stroke scores are multiplied together. The lower product wins the hole, a level hole is halved, and the ${unit} that wins the most holes wins the match.`
      : `${formatSentence} The hole is scored in strokes. The lower ${unit} score wins the hole, a level hole is halved, and the ${unit} that wins the most holes wins the match.`;
  }

  return `${formatSentence} Those strokes are added for the round, and the lowest total wins.`;
}
