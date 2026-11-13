import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { playerVerifiedForRevision } from "./resultVerification.ts";

describe("result verification", () => {
  it("counts a verified player when no revision is stored", () => {
    assert.equal(
      playerVerifiedForRevision(
        { resultVerified: true, verifiedRevision: null },
        2
      ),
      true
    );
  });

  it("ignores a verification from an older results revision", () => {
    assert.equal(
      playerVerifiedForRevision(
        { resultVerified: true, verifiedRevision: 1 },
        2
      ),
      false
    );
  });

  it("does not count a player who has not verified", () => {
    assert.equal(
      playerVerifiedForRevision(
        { resultVerified: false, verifiedRevision: 2 },
        2
      ),
      false
    );
  });
});
