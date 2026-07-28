"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";

type RankingData = {
  powerScore?: number;
  playerLevel?: number;
  careerXP?: number;
  careerPoints?: number;

  matchesPlayed?: number;
  wins?: number;
  losses?: number;
  winPercentage?: number;

  bestFinish?: number;
  top3?: number;
  top5?: number;
  top10?: number;

  currentWinStreak?: number;
  bestWinStreak?: number;
  currentLosingStreak?: number;
  bestLosingStreak?: number;

  bestFormat?: string;
  bestFormatWinPercentage?: number;
};

type CareerData = {
  battleName?: string;
  name?: string;
  surname?: string;
  club?: string;
  division?: string;

  ranking?: RankingData;

  lastChallenge?: {
    ranking?: {
      before?: {
        club?: number;
        province?: number;
        national?: number;
        international?: number;
      };
      after?: {
        club?: number;
        province?: number;
        national?: number;
        international?: number;
      };
    };
  };
};

type RankingPosition = {
  clubPosition: number;
  provincePosition: number;
  nationalPosition: number;
  internationalPosition: number;
};

type Accent =
  | "green"
  | "blue"
  | "purple"
  | "yellow"
  | "orange"
  | "pink";

const DEFAULT_RANKINGS: RankingPosition = {
  clubPosition: 0,
  provincePosition: 0,
  nationalPosition: 0,
  internationalPosition: 0,
};

export default function MyCareerPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [career, setCareer] = useState<CareerData | null>(null);
  const [ranking, setRanking] =
    useState<RankingPosition>(DEFAULT_RANKINGS);

 useEffect(() => {
  if (!user) {
    setLoading(false);
    return;
  }

  const uid = user.uid;

  async function loadCareer() {
    try {
      const [profileSnap, rankingSnap] = await Promise.all([
        getDoc(doc(db, "profiles", uid)),
        getDoc(doc(db, "playerRankings", uid)),
      ]);

        const profileData = profileSnap.exists()
          ? (profileSnap.data() as CareerData)
          : {};

        const rankingData = rankingSnap.exists()
          ? rankingSnap.data()
          : {};

        setCareer({
          ...profileData,
          ranking: {
            ...(profileData.ranking ?? {}),
            ...rankingData,
          },
        });

        setRanking({
          clubPosition: Number(rankingData.clubPosition ?? 0),
          provincePosition: Number(
            rankingData.provincePosition ?? 0
          ),
          nationalPosition: Number(
            rankingData.nationalPosition ?? 0
          ),
          internationalPosition: Number(
            rankingData.internationalPosition ?? 0
          ),
        });
      } catch (error) {
        console.error("Unable to load career data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCareer();
  }, [user]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6">
        <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />

          <p className="mt-4 font-semibold text-gray-700">
            Loading career...
          </p>
        </div>
      </main>
    );
  }

  const stats = career?.ranking;

  const playerLevel = Number(stats?.playerLevel ?? 1);
  const careerXP = Number(stats?.careerXP ?? 0);
  const careerPoints = Number(stats?.careerPoints ?? 0);
  const powerScore = Number(stats?.powerScore ?? 1000);

  const matchesPlayed = Number(stats?.matchesPlayed ?? 0);
  const wins = Number(stats?.wins ?? 0);
  const losses = Number(stats?.losses ?? 0);
  const winPercentage = Number(stats?.winPercentage ?? 0);

  const xpInCurrentLevel = careerXP % 1000;
  const xpProgress = Math.min(100, xpInCurrentLevel / 10);
  const xpRemaining =
    xpInCurrentLevel === 0 && careerXP > 0
      ? 1000
      : 1000 - xpInCurrentLevel;

  const displayName =
    career?.battleName?.trim() ||
    `${career?.name ?? ""} ${career?.surname ?? ""}`.trim() ||
    "Teez Player";

  const overallRating = Math.min(
    99,
    Math.max(1, Math.floor(powerScore / 25))
  );

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-[#202124]">
      <div className="mx-auto max-w-md pb-12">
        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-5 pb-4 pt-5 backdrop-blur">
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
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-600">
                Player Dashboard
              </p>

              <h1 className="text-xl font-black">
                My Career
              </h1>
            </div>

            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          {/* PLAYER HERO */}

          <section className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.10)]">
            <div className="bg-gradient-to-br from-[#102b20] via-[#0c1712] to-black px-6 py-6 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-green-400 bg-white/10 text-4xl shadow-[0_0_24px_rgba(74,222,128,0.35)]">
                  ⛳
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                    Career Profile
                  </p>

                  <h2 className="mt-1 truncate text-3xl font-black">
                    {displayName}
                  </h2>

                  <p className="mt-1 truncate text-sm text-gray-300">
                    {career?.name} {career?.surname}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <ProfilePill
                  text={career?.division || "Division pending"}
                />

                <ProfilePill
                  text={career?.club || "Club pending"}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-gray-200 px-2 py-5">
              <HeroStat
                label="Level"
                value={playerLevel}
              />

              <HeroStat
                label="Power"
                value={powerScore}
              />

              <HeroStat
                label="Points"
                value={careerPoints}
              />
            </div>
          </section>

          {/* CAREER PROGRESS */}

          <section>
            <SectionHeading
              title="Career Progress"
              description="Your current career level and progress"
            />

            <div className="grid grid-cols-2 gap-3">
              <ProgressTile
                icon="⭐"
                title="Player Level"
                value={playerLevel}
                progress={xpProgress}
                accent="green"
                footer={`${xpRemaining} XP to next level`}
              />

              <ProgressTile
                icon="⚡"
                title="Power Score"
                value={powerScore}
                progress={Math.min(
                  100,
                  (powerScore / 2500) * 100
                )}
                accent="blue"
                footer="Competitive rating"
              />

              <ProgressTile
                icon="🏆"
                title="Career Points"
                value={careerPoints}
                progress={Math.min(
                  100,
                  (careerPoints / 1000) * 100
                )}
                accent="yellow"
                footer="Lifetime points earned"
              />

              <ProgressTile
                icon="🎯"
                title="Overall Rating"
                value={overallRating}
                progress={overallRating}
                accent="purple"
                footer="Complete career rating"
              />
            </div>
          </section>

          {/* PERFORMANCE */}

          <section>
            <SectionHeading
              title="Player Performance"
              description="Your competitive challenge record"
            />

            <div className="grid grid-cols-2 gap-3">
              <MetricTile
                icon="🏌️"
                title="Matches"
                value={matchesPlayed}
                footer="Challenges played"
                accent="green"
              />

              <MetricTile
                icon="🥇"
                title="Wins"
                value={wins}
                footer="Challenges won"
                accent="yellow"
              />

              <MetricTile
                icon="✕"
                title="Losses"
                value={losses}
                footer="Recorded losses"
                accent="pink"
              />

              <MetricTile
                icon="📈"
                title="Win Rate"
                value={`${winPercentage}%`}
                footer="Career win percentage"
                accent="blue"
              />
            </div>
          </section>

          {/* CURRENT RANKINGS */}

          <section>
            <SectionHeading
              title="Current Rankings"
              description="Your position across every ranking level"
            />

            <div className="grid grid-cols-2 gap-3">
              <RankingTile
                icon="🏠"
                title="Club"
                value={ranking.clubPosition}
                accent="green"
              />

              <RankingTile
                icon="📍"
                title="Province"
                value={ranking.provincePosition}
                accent="blue"
              />

              <RankingTile
                icon="🇿🇦"
                title="National"
                value={ranking.nationalPosition}
                accent="purple"
              />

              <RankingTile
                icon="🌍"
                title="Global"
                value={ranking.internationalPosition}
                accent="yellow"
              />
            </div>
          </section>

          {/* LAST CHALLENGE */}

          <section>
            <SectionHeading
              title="Last Challenge"
              description="Ranking movement from your latest result"
            />

            <div className="overflow-hidden rounded-[26px] border border-gray-200 bg-white px-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <MovementRow
                title="Club"
                before={
                  career?.lastChallenge?.ranking?.before
                    ?.club ?? 0
                }
                after={
                  career?.lastChallenge?.ranking?.after
                    ?.club ?? 0
                }
              />

              <MovementRow
                title="Province"
                before={
                  career?.lastChallenge?.ranking?.before
                    ?.province ?? 0
                }
                after={
                  career?.lastChallenge?.ranking?.after
                    ?.province ?? 0
                }
              />

              <MovementRow
                title="National"
                before={
                  career?.lastChallenge?.ranking?.before
                    ?.national ?? 0
                }
                after={
                  career?.lastChallenge?.ranking?.after
                    ?.national ?? 0
                }
              />

              <MovementRow
                title="Global"
                before={
                  career?.lastChallenge?.ranking?.before
                    ?.international ?? 0
                }
                after={
                  career?.lastChallenge?.ranking?.after
                    ?.international ?? 0
                }
              />
            </div>
          </section>

          {/* HALL OF FAME */}

          <section>
            <SectionHeading
              title="Hall of Fame"
              description="Your strongest career finishes"
            />

            <div className="grid grid-cols-2 gap-3">
              <MetricTile
                icon="🏆"
                title="Best Finish"
                value={stats?.bestFinish ?? "-"}
                footer="Highest final position"
                accent="yellow"
              />

              <MetricTile
                icon="🥉"
                title="Top 3"
                value={stats?.top3 ?? 0}
                footer="Podium finishes"
                accent="orange"
              />

              <MetricTile
                icon="⭐"
                title="Top 5"
                value={stats?.top5 ?? 0}
                footer="Top-five finishes"
                accent="purple"
              />

              <MetricTile
                icon="🎯"
                title="Top 10"
                value={stats?.top10 ?? 0}
                footer="Top-ten finishes"
                accent="blue"
              />
            </div>
          </section>

          {/* FORM AND STREAKS */}

          <section>
            <SectionHeading
              title="Form and Streaks"
              description="Your strongest current performance indicators"
            />

            <div className="grid grid-cols-2 gap-3">
              <MetricTile
                icon="🔥"
                title="Current Streak"
                value={stats?.currentWinStreak ?? 0}
                footer="Consecutive wins"
                accent="orange"
              />

              <MetricTile
                icon="⚡"
                title="Best Streak"
                value={stats?.bestWinStreak ?? 0}
                footer="Career-best run"
                accent="yellow"
              />

              <MetricTile
                icon="⛳"
                title="Best Format"
                value={stats?.bestFormat || "-"}
                footer="Strongest game format"
                accent="green"
              />

              <MetricTile
                icon="📊"
                title="Format Win Rate"
                value={`${stats?.bestFormatWinPercentage ?? 0}%`}
                footer="Best-format performance"
                accent="blue"
              />
            </div>
          </section>


{/* PLAYER REWARDS */}

<section>
  <SectionHeading
    title="Player Rewards"
    description="Unlock rewards through your career progress"
  />

  <button
    type="button"
    onClick={() => router.push("/profile/rewards")}
    className="w-full overflow-hidden rounded-[26px] border border-green-300 bg-gradient-to-br from-green-50 via-white to-amber-50 p-5 text-left shadow-[0_10px_28px_rgba(15,23,42,0.10)] transition hover:-translate-y-1"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-3xl">
        🎁
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-600">
          Reward Board
        </p>

        <h3 className="mt-1 text-xl font-black text-gray-900">
          Open Career Rewards
        </h3>

        <p className="mt-2 text-sm leading-5 text-gray-500">
          View locked rewards and track what you need to unlock next.
        </p>
      </div>

      <span className="text-2xl font-bold text-green-600">
        ›
      </span>
    </div>
  </button>
</section>


          {/* ACHIEVEMENTS */}

          <section>
            <SectionHeading
              title="Achievements"
              description="Career milestones earned through play"
            />

            <div className="grid grid-cols-2 gap-3">
              <AchievementTile
                icon="🥇"
                title="First Victory"
                unlocked={wins >= 1}
              />

              <AchievementTile
                icon="🔥"
                title="Five-Win Streak"
                unlocked={
                  Number(stats?.bestWinStreak ?? 0) >= 5
                }
              />

              <AchievementTile
                icon="⚡"
                title="Level 10"
                unlocked={playerLevel >= 10}
              />

              <AchievementTile
                icon="💯"
                title="100 Career Points"
                unlocked={careerPoints >= 100}
              />

              <AchievementTile
                icon="🌍"
                title="Global Top 100"
                unlocked={
                  ranking.internationalPosition > 0 &&
                  ranking.internationalPosition <= 100
                }
              />

              <AchievementTile
                icon="🎯"
                title="75% Win Rate"
                unlocked={winPercentage >= 75}
              />

              <AchievementTile
                icon="🏆"
                title="Club Top 10"
                unlocked={
                  ranking.clubPosition > 0 &&
                  ranking.clubPosition <= 10
                }
              />

              <AchievementTile
                icon="⭐"
                title="Rising Star"
                unlocked={playerLevel >= 5}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3 px-1">
      <h2 className="text-xl font-black text-gray-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

function ProfilePill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-gray-100">
      {text}
    </span>
  );
}

function HeroStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-gray-900">
        {value}
      </p>
    </div>
  );
}

function ProgressTile({
  icon,
  title,
  value,
  progress,
  footer,
  accent,
}: {
  icon: string;
  title: string;
  value: number | string;
  progress: number;
  footer: string;
  accent: Accent;
}) {
  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  const accentClass = getAccentText(accent);
  const ringColour = getRingColour(accent);

  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-2xl">{icon}</p>

          <h3 className="mt-2 text-sm font-black text-gray-800">
            {title}
          </h3>
        </div>

        <div
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${ringColour} ${safeProgress}%, #e5e7eb ${safeProgress}% 100%)`,
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <span
              className={`text-base font-black ${accentClass}`}
            >
              {Math.round(safeProgress)}%
            </span>
          </div>
        </div>
      </div>

      <p className={`mt-4 text-3xl font-black ${accentClass}`}>
        {value}
      </p>

      <p className="mt-1 min-h-10 text-xs leading-5 text-gray-500">
        {footer}
      </p>
    </div>
  );
}

function MetricTile({
  icon,
  title,
  value,
  footer,
  accent,
}: {
  icon: string;
  title: string;
  value: number | string;
  footer: string;
  accent: Accent;
}) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
          {icon}
        </div>

        <span className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.45)]" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-gray-600">
        {title}
      </h3>

      <p
        className={`mt-1 break-words text-3xl font-black ${getAccentText(
          accent
        )}`}
      >
        {value}
      </p>

      <p className="mt-2 min-h-10 text-xs leading-5 text-gray-500">
        {footer}
      </p>
    </div>
  );
}

function RankingTile({
  icon,
  title,
  value,
  accent,
}: {
  icon: string;
  title: string;
  value: number;
  accent: Accent;
}) {
  const hasRanking = value > 0;

  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-xl">
          {icon}
        </div>

        <div
          className={`h-3 w-3 rounded-full ${
            hasRanking ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      </div>

      <p className="mt-4 text-sm font-bold text-gray-600">
        {title}
      </p>

      <p
        className={`mt-1 text-3xl font-black ${getAccentText(
          accent
        )}`}
      >
        {hasRanking ? `#${value}` : "—"}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {hasRanking
          ? `${title} ranking position`
          : "Not ranked yet"}
      </p>
    </div>
  );
}

function MovementRow({
  title,
  before,
  after,
}: {
  title: string;
  before: number;
  after: number;
}) {
  const hasData = before > 0 || after > 0;
  const movement = before - after;

  const movementStyle =
    movement > 0
      ? "bg-green-100 text-green-700"
      : movement < 0
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-600";

  const movementLabel =
    !hasData
      ? "No data"
      : movement > 0
        ? `▲ ${Math.abs(movement)}`
        : movement < 0
          ? `▼ ${Math.abs(movement)}`
          : "No change";

  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0">
      <div>
        <p className="font-bold text-gray-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {hasData ? `#${before} → #${after}` : "No ranking recorded"}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-2 text-xs font-black ${movementStyle}`}
      >
        {movementLabel}
      </span>
    </div>
  );
}

function AchievementTile({
  icon,
  title,
  unlocked,
}: {
  icon: string;
  title: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`rounded-[24px] border p-4 text-center shadow-[0_8px_24px_rgba(15,23,42,0.07)] ${
        unlocked
          ? "border-amber-300 bg-gradient-to-b from-amber-50 to-white"
          : "border-gray-200 bg-white"
      }`}
    >
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
          unlocked
            ? "bg-amber-100"
            : "bg-gray-100 grayscale"
        }`}
      >
        {unlocked ? icon : "🔒"}
      </div>

      <p className="mt-3 text-sm font-black text-gray-800">
        {title}
      </p>

      <p
        className={`mt-2 text-xs font-bold ${
          unlocked ? "text-amber-600" : "text-gray-400"
        }`}
      >
        {unlocked ? "Unlocked" : "Locked"}
      </p>
    </div>
  );
}

function getAccentText(accent: Accent) {
  const styles: Record<Accent, string> = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    yellow: "text-amber-500",
    orange: "text-orange-500",
    pink: "text-pink-500",
  };

  return styles[accent];
}

function getRingColour(accent: Accent) {
  const colours: Record<Accent, string> = {
    green: "#16a34a",
    blue: "#2563eb",
    purple: "#9333ea",
    yellow: "#f59e0b",
    orange: "#f97316",
    pink: "#ec4899",
  };

  return colours[accent];
}