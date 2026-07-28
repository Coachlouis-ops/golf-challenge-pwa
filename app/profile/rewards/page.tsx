"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  httpsCallable,
} from "firebase/functions";

import { useAuth } from "@/src/lib/AuthContext";
import {
  db,
  functions,
} from "@/src/lib/firebase";

type RewardStatus =
  | "locked"
  | "unlocked"
  | "opened"
  | "claimed";

type PlayerReward = {
  rewardId: string;
  title: string;
  description: string;
  icon: string;

  requirementType: string;
  requirementValue: number;
  currentValue: number;

  rewardType: string;
  rewardValue: number | string;
  rewardText: string;

  sortOrder: number;
  status: RewardStatus;
};

type OpenedReward = {
  rewardId: string;
  title: string;
  icon: string;
  rewardType: string;
  rewardValue: number | string;
  rewardText: string;
  status: string;
};

export default function CareerRewardsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [openingRewardId, setOpeningRewardId] =
    useState<string | null>(null);

  const [rewards, setRewards] =
    useState<PlayerReward[]>([]);

  const [openedReward, setOpenedReward] =
    useState<OpenedReward | null>(null);

  const loadRewards = useCallback(async () => {
    if (!user) return;

    const syncCareerRewards = httpsCallable(
      functions,
      "syncCareerRewards"
    );

    await syncCareerRewards();

    const rewardsSnap = await getDocs(
      collection(
        db,
        "userRewards",
        user.uid,
        "rewards"
      )
    );

    const loadedRewards = rewardsSnap.docs.map(
      (rewardDoc) =>
        rewardDoc.data() as PlayerReward
    );

    loadedRewards.sort(
      (a, b) =>
        Number(a.sortOrder ?? 0) -
        Number(b.sortOrder ?? 0)
    );

    setRewards(loadedRewards);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function initialiseRewards() {
      try {
        await loadRewards();
      } catch (error) {
        console.error(
          "Unable to initialise career rewards:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    initialiseRewards();
  }, [user, loadRewards]);

  async function openReward(reward: PlayerReward) {
    if (
      reward.status !== "unlocked" ||
      openingRewardId
    ) {
      return;
    }

    setOpeningRewardId(reward.rewardId);

    try {
      const openCareerReward = httpsCallable<
        { rewardId: string },
        {
          success: boolean;
          reward: OpenedReward;
        }
      >(
        functions,
        "openCareerReward"
      );

      const response = await openCareerReward({
        rewardId: reward.rewardId,
      });

      setOpenedReward(response.data.reward);

      await loadRewards();
    } catch (error: any) {
      console.error(
        "Unable to open career reward:",
        error
      );

      alert(
        error?.message ||
          "Unable to open this reward."
      );
    } finally {
      setOpeningRewardId(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6">
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />

          <p className="mt-4 font-semibold text-gray-700">
            Loading rewards...
          </p>
        </div>
      </main>
    );
  }

  const unlockedCount = rewards.filter(
    (reward) => reward.status === "unlocked"
  ).length;

  const claimedCount = rewards.filter(
    (reward) =>
      reward.status === "claimed" ||
      reward.status === "opened"
  ).length;

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-gray-900">
      <div className="mx-auto max-w-md pb-12">
        {/* HEADER */}

        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-5 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-600 transition hover:bg-gray-100"
              aria-label="Go back"
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
          {/* HERO */}

          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#153d2b] via-[#10271c] to-black p-6 text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-400">
              Reward Board
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Unlock Your Career
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              Career progress unlocks reward tiles.
              Open an available tile to reveal and
              claim its in-game benefit.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <SummaryCard
                title="Ready to Open"
                value={unlockedCount}
              />

              <SummaryCard
                title="Rewards Claimed"
                value={claimedCount}
              />
            </div>
          </section>

          {/* REWARD TILES */}

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Career Reward Tiles
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Complete each milestone to unlock its
                hidden reward.
              </p>
            </div>

            {rewards.length === 0 ? (
              <div className="rounded-[24px] border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="font-bold text-gray-700">
                  No rewards available
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Reward definitions could not be loaded.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {rewards.map((reward) => (
                  <RewardTile
                    key={reward.rewardId}
                    reward={reward}
                    opening={
                      openingRewardId === reward.rewardId
                    }
                    onOpen={() => openReward(reward)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* REWARD REVEAL MODAL */}

      {openedReward && (
        <RewardReveal
          reward={openedReward}
          onClose={() => setOpenedReward(null)}
        />
      )}
    </main>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-xs font-semibold text-gray-300">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

function RewardTile({
  reward,
  opening,
  onOpen,
}: {
  reward: PlayerReward;
  opening: boolean;
  onOpen: () => void;
}) {
  const unlocked = reward.status === "unlocked";

  const claimed =
    reward.status === "claimed" ||
    reward.status === "opened";

  const progress = Math.min(
    100,
    Math.max(
      0,
      reward.requirementValue > 0
        ? (
            reward.currentValue /
            reward.requirementValue
          ) * 100
        : 0
    )
  );

  const statusText = claimed
    ? "Reward claimed"
    : unlocked
      ? "Tap to open"
      : reward.rewardText;

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!unlocked || opening}
      className={`relative min-h-[270px] overflow-hidden rounded-[24px] border p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition ${
        unlocked
          ? "border-green-300 bg-gradient-to-b from-green-50 to-white hover:-translate-y-1 active:scale-[0.98]"
          : claimed
            ? "border-amber-300 bg-gradient-to-b from-amber-50 to-white"
            : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
            unlocked
              ? "bg-green-100"
              : claimed
                ? "bg-amber-100"
                : "bg-gray-100 grayscale"
          }`}
        >
          {claimed
            ? reward.icon
            : unlocked
              ? "🎁"
              : "🔒"}
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

      <p className="mt-2 min-h-[40px] text-xs leading-5 text-gray-500">
        {reward.description}
      </p>

      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
          Progress
        </p>

        <p className="mt-1 text-sm font-black text-gray-800">
          {reward.currentValue} /{" "}
          {reward.requirementValue}
        </p>
      </div>

      <div
        className={`mt-4 rounded-xl px-3 py-2 text-center text-xs font-bold ${
          unlocked
            ? "bg-green-100 text-green-700"
            : claimed
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-gray-400"
        }`}
      >
        {opening ? "Opening..." : statusText}
      </div>
    </button>
  );
}

function RewardReveal({
  reward,
  onClose,
}: {
  reward: OpenedReward;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-[rewardReveal_0.45s_ease-out] rounded-[30px] border border-amber-300 bg-white p-7 text-center shadow-[0_0_60px_rgba(245,158,11,0.35)]">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-600">
          Reward Opened
        </p>

        <div className="mx-auto mt-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-yellow-300 text-5xl shadow-[0_0_30px_rgba(245,158,11,0.35)]">
          {reward.icon}
        </div>

        <h2 className="mt-5 text-2xl font-black text-gray-900">
          {reward.title}
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          You received:
        </p>

        <div className="mt-3 rounded-2xl bg-green-50 px-4 py-4 text-lg font-black text-green-700">
          {reward.rewardText}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-green-600 py-3 font-black text-white transition hover:bg-green-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
}