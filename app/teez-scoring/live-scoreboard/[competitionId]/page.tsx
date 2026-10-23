"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";
import { LiveBoard } from "@/src/components/pitch/LiveBoard";
import { PitchFrame } from "@/src/components/pitch/PitchFrame";

type LeaderboardRow = {
  position?: number;
  displayName?: string;
  division?: string;
  total?: number;
  teeTime?: string;
  startingHole?: string;
  countOutPosition?: string;
};

type Competition = {
  competitionName?: string;
  competitionDate?: string;
  format?: string;
  scoringType?: string;
  playerConfiguration?: string;
  status?: string;
  leaderboard?: LeaderboardRow[];
};

export default function LiveScoreboardPage() {

  const params =
    useParams();

  const competitionId =
    params.competitionId as string;

  const [competition, setCompetition] =
    useState<Competition | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!competitionId) return;

    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "competitions",
          competitionId
        ),
        (snap) => {

          if (!snap.exists()) {
            setCompetition(null);
            setLoading(false);
            return;
          }

          setCompetition(
            snap.data() as Competition
          );

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, [competitionId]);

  if (loading) {
    return (
      <PitchFrame>
        <p className="pitch-status">
          Loading Live Scoreboard...
        </p>
      </PitchFrame>
    );
  }

  if (!competition) {
    return (
      <PitchFrame>
        <p className="pitch-status pitch-status-alert">
          Competition not found.
        </p>
      </PitchFrame>
    );
  }

  const leaderboard =
    Array.isArray(competition.leaderboard)
      ? competition.leaderboard
      : [];

  const meta = `${competition.competitionDate || ""} ${
    competition.format ? `• ${competition.format}` : ""
  } ${
    competition.playerConfiguration
      ? `• ${competition.playerConfiguration}`
      : ""
  }`;

  return (
    <PitchFrame>
      <LiveBoard
        title={competition.competitionName || "Competition"}
        meta={meta}
        rows={leaderboard}
        emptyMessage="No leaderboard data yet."
        footnote="Scoring systems by Teez Golf Challenges - Driven by Honey Badger Technologies PTY. LTD"
      />
    </PitchFrame>
  );
}
