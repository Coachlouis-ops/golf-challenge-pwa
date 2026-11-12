import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  MAX_PLAYING_SPOTS,
  compareHole,
  playingSpotCount,
  rankTotals,
  scoreMatchplay,
  multiplySideScores,
  sideHoleValue,
  totalMultipliedHoles,
  totalSideScore,
  winnerExplanation,
  withinPlayingSpotCap,
} from "./gameEngine.ts";

describe("side hole value", () => {
  const players = [
    { playerId: "a", strokes: 5, points: 2 },
    { playerId: "b", strokes: 4, points: 3 },
    { playerId: "c", strokes: 6, points: 1 },
  ];

  it("uses the best strokes for better ball", () => {
    assert.equal(sideHoleValue("better_ball", "strokes", players), 4);
  });

  it("uses the best points for better ball", () => {
    assert.equal(sideHoleValue("better_ball", "points", players), 3);
  });

  it("adds every score for combined", () => {
    assert.equal(sideHoleValue("combined", "strokes", players), 15);
    assert.equal(sideHoleValue("combined", "points", players), 6);
  });

  it("multiplies every score for multiplication", () => {
    assert.equal(sideHoleValue("multiplication", "strokes", players), 120);
    assert.equal(sideHoleValue("multiplication", "points", players), 6);
  });
});

describe("matchplay and totals", () => {
  it("awards a hole to the lower stroke score and halves a level hole", () => {
    assert.equal(compareHole(4, 5, "strokes"), "A");
    assert.equal(compareHole(4, 4, "strokes"), "half");
    assert.equal(compareHole(3, 2, "points"), "A");
  });

  it("counts holes won", () => {
    const result = scoreMatchplay(
      [
        { valueA: 4, valueB: 5 },
        { valueA: 5, valueB: 4 },
        { valueA: 4, valueB: 4 },
      ],
      "strokes"
    );

    assert.deepEqual(result, {
      holesWonA: 1,
      holesWonB: 1,
      holesHalved: 1,
      winner: "tie",
    });
  });

  it("ranks stroke totals with the lowest first and shares a place", () => {
    const ranked = rankTotals(
      [
        { id: "a", total: 72 },
        { id: "b", total: 70 },
        { id: "c", total: 70 },
      ],
      "strokes"
    );

    assert.equal(ranked[0].place, 1);
    assert.equal(ranked[1].place, 1);
    assert.equal(ranked[2].place, 3);
  });

  it("ranks points with the highest first", () => {
    const ranked = rankTotals(
      [
        { id: "a", total: 36 },
        { id: "b", total: 40 },
      ],
      "points"
    );

    assert.equal(ranked[0].id, "b");
  });
});

describe("playing spots", () => {
  it("keeps the 248 spot cap", () => {
    assert.equal(MAX_PLAYING_SPOTS, 248);
    assert.equal(withinPlayingSpotCap(8, 31), true);
    assert.equal(playingSpotCount(8, 31), 248);
    assert.equal(withinPlayingSpotCap(8, 32), false);
  });
});

describe("winner explanation", () => {
  it("describes better ball points without leaving the result open", () => {
    const text = winnerExplanation({
      mode: "teams",
      format: "better_ball",
      scoringMethod: "points",
    });

    assert.match(text, /best score/);
    assert.match(text, /highest total wins/);
  });

  it("multiplies one hole and then adds the hole products", () => {
    const firstHole = sideHoleValue("multiplication", "points", [
      { playerId: "a", strokes: 4, points: 3 },
      { playerId: "b", strokes: 5, points: 2 },
    ]);
    const secondHole = sideHoleValue("multiplication", "points", [
      { playerId: "a", strokes: 4, points: 4 },
      { playerId: "b", strokes: 4, points: 1 },
    ]);

    assert.equal(firstHole, 6);
    assert.equal(secondHole, 4);
    assert.equal(totalMultipliedHoles([firstHole, secondHole]), 10);
    assert.equal(
      totalSideScore([firstHole, secondHole], "points", "multiplication"),
      10
    );
    assert.equal(multiplySideScores([]), 0);
  });
});
