import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { inviteTargets, playerLabel } from "./invitePlayers.ts";

describe("player invites", () => {
  it("labels a registered player the same way an invite does", () => {
    assert.equal(
      playerLabel({ name: "Louis", surname: "Coach", battleName: "Badger" }),
      "Louis Coach (Badger)"
    );
  });

  it("invites the creator the same way as every other placed player", () => {
    const targets = inviteTargets({
      sides: [
        {
          spots: [
            { id: "a1", playerUid: "creator", playerName: "Creator" },
            { id: "a2", playerUid: "player-1", playerName: "Alex Green" },
          ],
        },
        {
          spots: [
            { id: "b1", playerUid: "player-1", playerName: "Alex Green" },
            { id: "b2", playerUid: "player-2", playerName: "Sam Blue" },
            { id: "b3", playerUid: "", playerName: "" },
          ],
        },
      ],
    });

    assert.deepEqual(
      targets.map((target) => target.uid),
      ["creator", "player-1", "player-2"]
    );
  });
});
