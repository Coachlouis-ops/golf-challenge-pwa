import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  dismissedWinNoticeKey,
  formatWinAmount,
  readWinNotice,
  winNoticeHeadline,
} from "./winNotice.ts";

describe("win notice", () => {
  it("shows whole rand without decimals", () => {
    assert.equal(formatWinAmount(90), "R90");
    assert.equal(formatWinAmount(100), "R100");
    assert.equal(winNoticeHeadline(90), "YOU WON R90");
  });

  it("keeps cents when the amount is not a whole rand", () => {
    assert.equal(formatWinAmount(90.5), "R90,50");
  });

  it("builds a stable local dismiss key", () => {
    assert.equal(
      dismissedWinNoticeKey("player-1", "match-1-player-1"),
      "teezDismissedWinNotice:player-1:match-1-player-1"
    );
  });

  it("ignores a notice with no amount", () => {
    assert.equal(readWinNotice({ id: "a", amount: 0, challengeTitle: "Saturday" }), null);
  });
});
