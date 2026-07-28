"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";

type CareerProgress = {
  careerPoints: number;
  playerLevel: number;
  matchesPlayed: number;
  wins: number;
  tokensPlayed: number;
  tokensWon: number;
};

type Reward = {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirementLabel: string;
  currentValue: number;
  requiredValue: number;
  rewardText: string;
};

export default function CareerRewardsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState<CareerProgress>({
    careerPoints: 0,
    playerLevel: 1,
    matchesPlayed: 0,
    wins: 0,
    tokensPlayed: 0,
    tokensWon: 0,
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const uid = user.uid;

    async function loadRewardsData() {
      try {
        const [profileSnap, rankingSnap] = await Promise.all([
          getDoc(doc(db, "profiles", uid)),
          getDoc(doc(db, "playerRankings", uid)),
        ]);

        const profileData = profileSnap.exists()
          ? profileSnap.data()
          : {};

        const rankingData = rankingSnap.exists()
          ? rankingSnap.data()
          : {};

        setProgress({
          careerPoints: Number(
            rankingData.careerPoints ??
              profileData.ranking?.careerPoints ??
              0
          ),

          playerLevel: Number(
            rankingData.playerLevel ??
              profileData.ranking?.playerLevel ??
              1
          ),

          matchesPlayed: Number(
            rankingData.matchesPlayed ??
              profileData.ranking?.matchesPlayed ??
              profileData.totalGames ??
              0
          ),

          wins: Number(
            rankingData.wins ??
              profileData.ranking?.wins ??
              profileData.matchesWon ??
              0
          ),

          tokensPlayed: Number(profileData.tokensPlayed ?? 0),
          tokensWon: Number(profileData.tokensWon ?? 0),
        });
      } catch (error) {
        console.error("Unable to load reward progress:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRewardsData();
  }, [user]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8]">
        <p className="font-semibold text-gray-700">
          Loading rewards...
        </p>
      </main>
    );
  }

  const rewards: Reward[] = [
    {
      id: "first-round",
      title: "First Round",
      description: "Complete your first challenge.",
      icon: "⛳",
      requirementLabel: "Challenges played",
      currentValue: progress.matchesPlayed,
      requiredValue: 1,
      rewardText: "10 bonus tokens",
    },
    {
      id: "first-win",
      title: "First Victory",
      description: "Win your first challenge.",
      icon: "🏆",
      requirementLabel: "Challenges won",
      currentValue: progress.wins,
      requiredValue: 1,
      rewardText: "20 bonus tokens",
    },
    {
      id: "career-100",
      title: "Rising Player",
      description: "Earn 100 career points.",
      icon: "⭐",
      requirementLabel: "Career points",
      currentValue: progress.careerPoints,
      requiredValue: 100,
      rewardText: "Profile achievement badge",
    },
    {
      id: "level-5",
      title: "Level Five",
      description: "Reach player level 5.",
      icon: "⚡",
      requirementLabel: "Player level",
      currentValue: progress.playerLevel,
      requiredValue: 5,
      rewardText: "25 bonus tokens",
    },
    {
      id: "tokens-played-1000",
      title: "Committed Competitor",
      description: "Play a total of 1,000 tokens.",
      icon: "🪙",
      requirementLabel: "Tokens played",
      currentValue: progress.tokensPlayed,
      requiredValue: 1000,
      rewardText: "Free challenge entry",
    },
    {
      id: "tokens-won-500",
      title: "Winning Wallet",
      description: "Win a total of 500 tokens.",
      icon: "💰",
      requirementLabel: "Tokens won",
      currentValue: progress.tokensWon,
      requiredValue: 500,
      rewardText: "50 bonus tokens",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-gray-900">
      <div className="mx-auto max-w-md pb-12">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-5 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-600 hover:bg-gray-100"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-600">
                Career Progress
              </p>

              <h1 className="text-xl font-black">
                Player Rewards
              </h1>
            </div>

            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#153d2b] via-[#10271c] to-black p-6 text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-400">
              Reward Board
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Unlock Your Career
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              Your career progress unlocks reward tiles. Once a tile
              becomes available, you will be able to open it and claim
              its in-game benefit.
            </p>
          </section>

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Reward Tiles
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Complete milestones to unlock each reward.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {rewards.map((reward) => (
                <RewardTile
                  key={reward.id}
                  reward={reward}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function RewardTile({ reward }: { reward: Reward }) {
  const unlocked =
    reward.currentValue >= reward.requiredValue;

  const progress = Math.min(
    100,
    Math.max(
      0,
      (reward.currentValue / reward.requiredValue) * 100
    )
  );

  return (
    <button
      type="button"
      disabled={!unlocked}
      className={`relative min-h-[250px] overflow-hidden rounded-[24px] border p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition ${
        unlocked
          ? "border-green-300 bg-gradient-to-b from-green-50 to-white hover:-translate-y-1"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
            unlocked
              ? "bg-green-100"
              : "bg-gray-100 grayscale"
          }`}
        >
          {unlocked ? reward.icon : "🔒"}
        </div>

        <div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(#16a34a ${progress}%, #e5e7eb ${progress}% 100%)`,
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <span className="text-xs font-black text-green-700">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-base font-black">
        {reward.title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-gray-500">
        {reward.description}
      </p>

      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
          {reward.requirementLabel}
        </p>

        <p className="mt-1 text-sm font-black text-gray-800">
          {reward.currentValue} / {reward.requiredValue}
        </p>
      </div>

      <div
        className={`mt-4 rounded-xl px-3 py-2 text-xs font-bold ${
          unlocked
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {unlocked ? "Ready to open" : reward.rewardText}
      </div>
    </button>
  );
}