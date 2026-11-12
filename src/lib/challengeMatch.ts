import {
  BET_AMOUNTS,
  type PlayMode as PlayModeType,
  type ScoringMethod,
  type SinglesFormat,
  type TeamFormat,
  formatRand,
  playersPerSideForMode,
  playingSpotCount,
  scoringMethodForSingles,
  sideCountForMode,
  winnerExplanation,
  withinPlayingSpotCap,
} from "@/src/lib/gameEngine";
import { inviteTargets, playerLabel } from "@/src/lib/invitePlayers";

export { inviteTargets, playerLabel };
export type { InviteTarget } from "@/src/lib/invitePlayers";

export type PlayMode = PlayModeType;

export type Spot = {
  id: string;
  number: number;
  playerName: string;
  playerUid: string;
  opponentSpotId: string;
};

export type Side = {
  id: string;
  name: string;
  spots: Spot[];
};

export type MatchSetup = {
  version: 1;
  title: string;
  mode: PlayMode;
  format: SinglesFormat | TeamFormat;
  scoringMethod: ScoringMethod;
  betAmount: number;
  sideCount: number;
  playersPerSide: number;
  sides: Side[];
  courseName: string;
  courseStateProvince: string;
  courseCountry: string;
  detailsLocked: boolean;
};

export { BET_AMOUNTS, formatRand };

export const MODE_OPTIONS: { value: PlayMode; label: string; detail: string }[] = [
  {
    value: "singles",
    label: "Singles",
    detail: "One player against one player.",
  },
  {
    value: "pairs",
    label: "Pairs",
    detail: "Two players against two players.",
  },
  {
    value: "teams",
    label: "Teams",
    detail: "Name the teams, then fill each playing spot.",
  },
  {
    value: "groups",
    label: "Groups",
    detail: "Name the groups, then fill each playing spot.",
  },
];

export function modeLabel(mode: PlayMode): string {
  return MODE_OPTIONS.find((option) => option.value === mode)?.label || "Singles";
}

export function formatLabel(format: string): string {
  const labels: Record<string, string> = {
    stroke_play: "Stroke play",
    stableford: "Points",
    match_play: "Match play",
    better_ball: "Better ball",
    combined: "Combined",
    multiplication: "Multiplication",
  };

  return labels[format] || format;
}

export function scoringLabel(method: ScoringMethod): string {
  if (method === "points") return "Points";
  if (method === "matchplay") return "Matchplay";
  return "Strokes";
}

export function formatsForMode(
  mode: PlayMode
): { value: MatchSetup["format"]; label: string }[] {
  if (mode === "singles") {
    return [
      { value: "stroke_play", label: "Stroke play" },
      { value: "stableford", label: "Points" },
      { value: "match_play", label: "Match play" },
    ];
  }

  return [
    { value: "better_ball", label: "Better ball" },
    { value: "combined", label: "Combined" },
    { value: "multiplication", label: "Multiplication" },
  ];
}

function sideName(mode: PlayMode, index: number, previous?: string): string {
  if (previous && previous.trim()) return previous;
  if (mode === "singles") return index === 0 ? "Player A" : "Player B";
  if (mode === "pairs") return index === 0 ? "Side A" : "Side B";
  if (mode === "groups") return `Group ${index + 1}`;
  return `Team ${index + 1}`;
}

function spotId(sideId: string, number: number): string {
  return `${sideId}-spot-${number}`;
}

export function defaultOpponentId(
  sides: { id: string; spots: { id: string; number: number }[] }[],
  sideIndex: number,
  spotNumber: number
): string {
  const pairIndex = sideIndex % 2 === 0 ? sideIndex + 1 : sideIndex - 1;
  const partner = sides[pairIndex];
  if (!partner) return "";
  return partner.spots.find((spot) => spot.number === spotNumber)?.id || "";
}

export function buildMatchSetup(input: {
  title: string;
  mode: PlayMode;
  format: string;
  scoringMethod: ScoringMethod;
  betAmount: number;
  sideCount: number;
  playersPerSide: number;
  courseName: string;
  courseStateProvince: string;
  courseCountry: string;
  previous?: MatchSetup | null;
}): MatchSetup {
  const sideCount = sideCountForMode(input.mode, input.sideCount);
  const playersPerSide = playersPerSideForMode(input.mode, input.playersPerSide);
  const scoringMethod =
    input.mode === "singles"
      ? scoringMethodForSingles(input.format as SinglesFormat)
      : input.scoringMethod;

  const sides: Side[] = Array.from({ length: sideCount }, (_, sideIndex) => {
    const previousSide = input.previous?.sides[sideIndex];
    const id = previousSide?.id || `side-${sideIndex + 1}`;

    const spots: Spot[] = Array.from({ length: playersPerSide }, (_, spotIndex) => {
      const number = spotIndex + 1;
      const previousSpot = previousSide?.spots.find((spot) => spot.number === number);

      return {
        id: spotId(id, number),
        number,
        playerName: previousSpot?.playerName || "",
        playerUid: previousSpot?.playerUid || "",
        opponentSpotId: "",
      };
    });

    return {
      id,
      name: sideName(input.mode, sideIndex, previousSide?.name),
      spots,
    };
  });

  for (const [sideIndex, side] of sides.entries()) {
    for (const spot of side.spots) {
      const previousSpot = input.previous?.sides
        .find((item) => item.id === side.id)
        ?.spots.find((item) => item.number === spot.number);
      const stillExists = sides.some((item) =>
        item.spots.some((candidate) => candidate.id === previousSpot?.opponentSpotId)
      );

      spot.opponentSpotId = stillExists
        ? previousSpot?.opponentSpotId || ""
        : defaultOpponentId(sides, sideIndex, spot.number);
    }
  }

  return {
    version: 1,
    title: input.title,
    mode: input.mode,
    format: input.format as MatchSetup["format"],
    scoringMethod,
    betAmount: input.betAmount,
    sideCount,
    playersPerSide,
    sides,
    courseName: input.courseName,
    courseStateProvince: input.courseStateProvince,
    courseCountry: input.courseCountry,
    detailsLocked: false,
  };
}

export function linkMatchup(setup: MatchSetup, spotIdToChange: string, opponentSpotId: string): MatchSetup {
  const spots = setup.sides.flatMap((side) => side.spots);
  const current = spots.find((spot) => spot.id === spotIdToChange);
  if (!current) return setup;

  return {
    ...setup,
    sides: setup.sides.map((side) => ({
      ...side,
      spots: side.spots.map((spot) => {
        if (spot.id === spotIdToChange) {
          return { ...spot, opponentSpotId };
        }

        if (spot.opponentSpotId === spotIdToChange && spot.id !== opponentSpotId) {
          return { ...spot, opponentSpotId: "" };
        }

        if (opponentSpotId && spot.id === opponentSpotId) {
          return { ...spot, opponentSpotId: spotIdToChange };
        }

        return spot;
      }),
    })),
  };
}

export function clearSpot(setup: MatchSetup, targetSpotId: string): MatchSetup {
  return {
    ...setup,
    sides: setup.sides.map((side) => ({
      ...side,
      spots: side.spots.map((spot) =>
        spot.id === targetSpotId
          ? { ...spot, playerName: "", playerUid: "" }
          : spot
      ),
    })),
  };
}

export function assignSpot(
  setup: MatchSetup,
  targetSpotId: string,
  playerName: string,
  playerUid = ""
): MatchSetup {
  return {
    ...setup,
    sides: setup.sides.map((side) => ({
      ...side,
      spots: side.spots.map((spot) =>
        spot.id === targetSpotId
          ? { ...spot, playerName: playerName.trim(), playerUid }
          : spot
      ),
    })),
  };
}

export function spotCountLabel(setup: MatchSetup): string {
  const count = playingSpotCount(setup.sideCount, setup.playersPerSide);
  return `${count} playing spot${count === 1 ? "" : "s"}`;
}

export function setupIsReady(setup: MatchSetup): string | null {
  if (!setup.title.trim()) return "Add a match title.";
  if (!setup.courseName.trim()) return "Select a golf course.";
  if (!BET_AMOUNTS.includes(setup.betAmount as (typeof BET_AMOUNTS)[number])) {
    return "Choose a bet for each player.";
  }
  if (!withinPlayingSpotCap(setup.sideCount, setup.playersPerSide)) {
    return `A match can have at most ${248} playing spots.`;
  }
  if (setup.sides.some((side) => !side.name.trim())) {
    return setup.mode === "groups" ? "Name every group." : "Name every team.";
  }
  return null;
}

export function guideLines(setup: MatchSetup): { label: string; value: string }[] {
  const unit = setup.mode === "groups" ? "Groups" : setup.mode === "teams" ? "Teams" : "Sides";

  return [
    { label: "Title", value: setup.title.trim() },
    { label: "Mode", value: modeLabel(setup.mode) },
    {
      label: unit,
      value: setup.sides.map((side) => side.name).join(", "),
    },
    {
      label: "Players per side",
      value: String(setup.playersPerSide),
    },
    { label: "Format", value: formatLabel(setup.format) },
    { label: "Scoring method", value: scoringLabel(setup.scoringMethod) },
    {
      label: "How the winner is decided",
      value: winnerExplanation({
        mode: setup.mode,
        format: setup.format,
        scoringMethod: setup.scoringMethod,
      }),
    },
    { label: "Bet per player", value: formatRand(setup.betAmount) },
    {
      label: "Invited players",
      value: invitedPlayersLine(setup),
    },
    {
      label: "Course",
      value: [setup.courseName, setup.courseStateProvince, setup.courseCountry]
        .filter(Boolean)
        .join(", "),
    },
  ];
}

function invitedPlayersLine(setup: MatchSetup): string {
  const placed = setup.sides.flatMap((side) =>
    side.spots
      .filter((spot) => spot.playerUid.trim())
      .map((spot) => `${spot.playerName.trim() || "Player"} · ${side.name} spot ${spot.number}`)
  );

  return placed.length > 0 ? placed.join(", ") : "No players placed yet.";
}

export const JOIN_RETURN_KEY = "teezJoinReturn";

export function readJoinReturn(): string | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(JOIN_RETURN_KEY);
  if (!value || !value.startsWith("/challenges/") || value.startsWith("//")) {
    return null;
  }
  sessionStorage.removeItem(JOIN_RETURN_KEY);
  return value;
}

export function toCallablePayload(setup: MatchSetup, groupId: string | null) {
  const teamFormat =
    setup.mode === "singles" ? "SINGLES" : setup.mode === "pairs" ? "PAIR" : "FOURBALL";

  const gameFormat =
    setup.scoringMethod === "matchplay"
      ? "MATCH_PLAY"
      : setup.scoringMethod === "points"
        ? "POINTS_GAME"
        : "STROKE_PLAY";

  const typeOfGame =
    setup.mode === "singles"
      ? "SINGLES"
      : setup.format === "multiplication"
        ? "MULTIPLICATION"
        : setup.format === "combined"
          ? "AGGREGATE"
          : "BETTER_BALL";

  const legacyScoringMethod = setup.scoringMethod === "strokes" ? "STROKES" : "POINTS";

  const legacy = {
    challengeScope: groupId ? "group" : "open",
    ...(groupId ? { groupId } : {}),
    challengeTitle: setup.title.trim(),
    entryTokens: setup.betAmount,
    nassauTokens: null,
    teamFormat,
    gameFormat,
    typeOfGame,
    scoringMethod: legacyScoringMethod,
    courseName: setup.courseName.trim(),
    courseStateProvince: setup.courseStateProvince.trim(),
    courseCountry: setup.courseCountry.trim(),
  };

  return {
    ...legacy,
    betAmount: setup.betAmount,
    betCurrency: "ZAR",
    matchScoring: setup.scoringMethod,
    matchSetup: { ...setup, detailsLocked: true },
    detailsLocked: true,
  };
}

export function legacyOnlyPayload(setup: MatchSetup, groupId: string | null) {
  const full = toCallablePayload(setup, groupId);
  return {
    challengeScope: full.challengeScope,
    ...(groupId ? { groupId } : {}),
    challengeTitle: full.challengeTitle,
    entryTokens: full.entryTokens,
    nassauTokens: full.nassauTokens,
    teamFormat: full.teamFormat,
    gameFormat: full.gameFormat,
    typeOfGame: full.typeOfGame,
    scoringMethod: full.scoringMethod,
    courseName: full.courseName,
    courseStateProvince: full.courseStateProvince,
    courseCountry: full.courseCountry,
  };
}

export function isCallableFieldError(error: { code?: string; message?: string }): boolean {
  const code = String(error.code || "");
  const message = String(error.message || "").toLowerCase();

  return (
    code.includes("invalid-argument") ||
    message.includes("unexpected") ||
    message.includes("not allowed") ||
    message.includes("unknown") ||
    message.includes("prohibited")
  );
}

export function resultsHaveBeenSubmitted(
  data: Record<string, unknown> | null | undefined
): boolean {
  if (!data) return false;

  if (
    data.resultsSubmitted ||
    data.finalized ||
    data.finalised ||
    data.scoreboardUpdated
  ) {
    return true;
  }

  if (Array.isArray(data.scores) && data.scores.length > 0) return true;
  if (Array.isArray(data.results) && data.results.length > 0) return true;

  const status = String(data.status || "").toLowerCase();
  return (
    status === "completed" ||
    status === "finalised" ||
    status === "finalized"
  );
}

export function canEditMatch(status: string, resultsSubmitted: boolean): boolean {
  if (resultsSubmitted) return false;
  const normalised = status.toLowerCase();
  return (
    normalised !== "completed" &&
    normalised !== "finalised" &&
    normalised !== "finalized"
  );
}

export function readMatchSetup(data: Record<string, unknown> | null | undefined): MatchSetup | null {
  const raw = data?.matchSetup;
  if (!raw || typeof raw !== "object") return null;
  const setup = raw as MatchSetup;
  if (!setup.mode || !Array.isArray(setup.sides)) return null;
  return setup;
}
