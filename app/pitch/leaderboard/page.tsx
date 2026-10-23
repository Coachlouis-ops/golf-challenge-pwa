"use client";

import { LiveBoard } from "@/src/components/pitch/LiveBoard";
import { PitchFrame } from "@/src/components/pitch/PitchFrame";

const SAMPLE_ROWS = [
  {
    position: 1,
    displayName: "Thandi M.",
    division: "Championship",
    total: -2,
    countOutPosition: "H18",
  },
  {
    position: 2,
    displayName: "Johan van W.",
    division: "Championship",
    total: -1,
    countOutPosition: "H17",
  },
  {
    position: 3,
    displayName: "Riaan B.",
    division: "Plate",
    total: 0,
    countOutPosition: "H16",
  },
  {
    position: 4,
    displayName: "Lerato K.",
    division: "Plate",
    total: 1,
    countOutPosition: "H15",
  },
  {
    position: 5,
    displayName: "Sipho D.",
    division: "Championship",
    total: 2,
    countOutPosition: "H14",
  },
];

export default function PitchLeaderboardPage() {
  return (
    <PitchFrame>
      <LiveBoard
        title="Sample competition"
        meta="Sample display · not a live event"
        rows={SAMPLE_ROWS}
        emptyMessage="No leaderboard data yet."
        footnote="Scoring systems by Teez Golf Challenges - Driven by Honey Badger Technologies PTY. LTD"
        sampleBanner="Sample scores so the live board can be reviewed without a competition. Same layout as the live scoreboard. Not live. Not saved. Not connected to Firebase."
      />
    </PitchFrame>
  );
}
