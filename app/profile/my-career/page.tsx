"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";

type RankingData = {
  
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
          clubPosition: Number(
            rankingData.clubPosition ?? 0
          ),
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
        console.error(
          "Unable to load career data:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadCareer();
  }, [user]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef1f4] px-6">
        <div className="border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#0f5132]" />

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Loading career
          </p>
        </div>
      </main>
    );
  }

  const stats = career?.ranking;

  const playerLevel = Number(
    stats?.playerLevel ?? 1
  );

  const careerXP = Number(
    stats?.careerXP ?? 0
  );

  const careerPoints = Number(
    stats?.careerPoints ?? 0
  );


  const matchesPlayed = Number(
    stats?.matchesPlayed ?? 0
  );

  const wins = Number(
    stats?.wins ?? 0
  );

  const losses = Number(
    stats?.losses ?? 0
  );

  const winPercentage = Number(
    stats?.winPercentage ?? 0
  );

  const xpInCurrentLevel =
    careerXP % 1000;

  const xpProgress = Math.min(
    100,
    xpInCurrentLevel / 10
  );

  const xpRemaining =
    xpInCurrentLevel === 0 && careerXP > 0
      ? 1000
      : 1000 - xpInCurrentLevel;

  const displayName =
    career?.battleName?.trim() ||
    `${career?.name ?? ""} ${
      career?.surname ?? ""
    }`.trim() ||
    "TEEZ Player";


  return (
    <main className="min-h-screen bg-[#eef1f4] text-[#111827]">
      <div className="mx-auto max-w-md pb-14">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white text-xl text-slate-600"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#0f5132]">
                TEEZ Player Career
              </p>

              <h1 className="mt-1 text-lg font-black tracking-tight text-[#111827]">
                MY CAREER
              </h1>
            </div>

            <div className="h-9 w-9" />
          </div>
        </header>

        <div className="space-y-7 px-4 pt-5">

          {/* PLAYER HERO */}

          <section className="overflow-hidden border border-[#1f2937] bg-[#0d1821] shadow-[0_8px_22px_rgba(15,23,42,0.16)]">

            <div className="border-b border-white/10 px-5 py-5">

              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#b89b5e] bg-[#14232d]">
                  <span className="text-lg font-black tracking-tight text-[#d6bd7a]">
                    TEEZ
                  </span>
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9badb7]">
                    Player Profile
                  </p>

                  <h2 className="mt-1 truncate text-2xl font-black tracking-tight text-white">
                    {displayName}
                  </h2>

                  <p className="mt-1 truncate text-sm text-slate-400">
                    {career?.name} {career?.surname}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <ProfilePill
                      text={
                        career?.division ||
                        "Division pending"
                      }
                    />

                    <ProfilePill
                      text={
                        career?.club ||
                        "Club pending"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

           
          </section>

   {/* CAREER GUIDE */}

          <section>
            <SectionHeading
              eyebrow="PLAYER INFORMATION"
              title="How My Career Works"
              description="Understand how each career statistic is calculated"
            />

            <ActionTile
              code="GUIDE"
              title="Career Calculation Guide"
              text="Career Points, rankings, Power Score, XP, levels, streaks, Vault Keys and Race Points."
              onClick={() =>
                router.push(
                  "/profile/how-career-works"
                )
              }
            />
          </section>

 {/* RACE TO FINAL */}

          <section>
            <SectionHeading
              eyebrow="SEASON CHAMPIONSHIP"
              title="Race to the Final"
              description="Compete for a place in the annual TEEZ Championship Final"
            />

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/profile/race-to-paradise"
                )
              }
              className="w-full overflow-hidden border border-[#1c4532] bg-[#10261c] text-left shadow-[0_6px_18px_rgba(15,23,42,0.12)]"
            >

              <div className="flex items-center gap-4 border-b border-white/10 p-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c6a96a] bg-[#172d23]">
                  <span className="text-sm font-black tracking-[0.08em] text-[#d8c18a]">
                    RTF
                  </span>
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8eb89f]">
                    TEEZ Championship Series
                  </p>

                  <h3 className="mt-1 text-xl font-black text-white">
                    Race to the Final
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-slate-300">
                    Earn Race Points throughout the season and compete for a Top 8 position.
                  </p>
                </div>

                <span className="text-xl text-[#d8c18a]">
                  ›
                </span>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/10">

                <div className="px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Season Goal
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    Global Top 8
                  </p>
                </div>

                <div className="px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Competition
                  </p>

                  <p className="mt-1 text-sm font-black text-[#d8c18a]">
                    Championship Final
                  </p>
                </div>
              </div>
            </button>
          </section>


          {/* PLAYER VAULT */}

          <section>
            <SectionHeading
              eyebrow="CAREER REWARDS"
              title="Player Vault"
              description="Career milestones earn access to mystery rewards"
            />

            <ActionTile
              code="VAULT"
              title="Open Player Vault"
              text="View Vault Keys, career milestones and available mystery coins."
              onClick={() =>
                router.push("/profile/rewards")
              }
              premium
            />
          </section>


         {/* LAST CHALLENGE */}

<section>
  <SectionHeading
    eyebrow="LATEST RESULT"
    title="Last Challenge Ranking Movement"
    description="See how your latest completed challenge changed your ranking positions"
  />

  <div className="border border-slate-200 bg-white px-5 shadow-sm">

              <MovementRow
                title="Club"
                before={
                  career?.lastChallenge?.ranking
                    ?.before?.club ?? 0
                }
                after={
                  career?.lastChallenge?.ranking
                    ?.after?.club ?? 0
                }
              />

              <MovementRow
                title="Province"
                before={
                  career?.lastChallenge?.ranking
                    ?.before?.province ?? 0
                }
                after={
                  career?.lastChallenge?.ranking
                    ?.after?.province ?? 0
                }
              />

              <MovementRow
                title="National"
                before={
                  career?.lastChallenge?.ranking
                    ?.before?.national ?? 0
                }
                after={
                  career?.lastChallenge?.ranking
                    ?.after?.national ?? 0
                }
              />

              <MovementRow
                title="Global"
                before={
                  career?.lastChallenge?.ranking
                    ?.before?.international ?? 0
                }
                after={
                  career?.lastChallenge?.ranking
                    ?.after?.international ?? 0
                }
              />
            </div>
          </section>


       {/* CURRENT RANKINGS */}

<section>
  <SectionHeading
    eyebrow="OFFICIAL STANDINGS"
    title="Current Rankings"
    description="Select a ranking level to view the full TEEZ leaderboard"
  />

  <div className="grid grid-cols-2 gap-3">

    <RankingTile
      code="CLB"
      title="Club"
      value={ranking.clubPosition}
      onClick={() =>
        router.push(
          "/profile/my-career/rankings/club"
        )
      }
    />

    <RankingTile
      code="PRV"
      title="Province"
      value={ranking.provincePosition}
      onClick={() =>
        router.push(
          "/profile/my-career/rankings/province"
        )
      }
    />

    <RankingTile
      code="NAT"
      title="National"
      value={ranking.nationalPosition}
      onClick={() =>
        router.push(
          "/profile/my-career/rankings/national"
        )
      }
    />

    <RankingTile
      code="GLB"
      title="Global"
      value={ranking.internationalPosition}
      onClick={() =>
        router.push(
          "/profile/my-career/rankings/global"
        )
      }
      premium
    />

  </div>
</section>


 {/* PERFORMANCE */}

          <section>
            <SectionHeading
              eyebrow="COMPETITIVE RECORD"
              title="Player Performance"
              description="Career results across completed challenges"
            />

            <div className="grid grid-cols-2 gap-3">

              <MetricTile
                code="PLD"
                title="Matches"
                value={matchesPlayed}
                footer="Challenges played"
              />

              <MetricTile
                code="WIN"
                title="Wins"
                value={wins}
                footer="Challenges won"
                highlight
              />

              <MetricTile
                code="LOS"
                title="Losses"
                value={losses}
                footer="Recorded losses"
              />

              <MetricTile
                code="WIN%"
                title="Win Rate"
                value={`${winPercentage}%`}
                footer="Career win percentage"
              />
            </div>
          </section>

   {/* FORM */}

          <section>
            <SectionHeading
              eyebrow="CURRENT FORM"
              title="Form & Streaks"
              description="Current and career-best performance indicators"
            />

            <div className="grid grid-cols-2 gap-3">

              <MetricTile
                code="STRK"
                title="Current Streak"
                value={
                  stats?.currentWinStreak ?? 0
                }
                footer="Consecutive wins"
              />

              <MetricTile
                code="BEST"
                title="Best Streak"
                value={
                  stats?.bestWinStreak ?? 0
                }
                footer="Career-best run"
                highlight
              />

              <MetricTile
                code="FMT"
                title="Best Format"
                value={
                  stats?.bestFormat || "-"
                }
                footer="Strongest format"
              />

              <MetricTile
                code="FMT%"
                title="Format Win Rate"
                value={`${
                  stats?.bestFormatWinPercentage ??
                  0
                }%`}
                footer="Best-format performance"
              />
            </div>
          </section>

  {/* CAREER RECORD */}

          <section>
            <SectionHeading
              eyebrow="CAREER RECORD"
              title="Hall of Fame"
              description="Your strongest career finishes"
            />

            <div className="grid grid-cols-2 gap-3">

              <MetricTile
                code="BEST"
                title="Best Finish"
                value={
                  stats?.bestFinish ?? "-"
                }
                footer="Highest finish"
                highlight
              />

              <MetricTile
                code="TOP3"
                title="Top 3"
                value={stats?.top3 ?? 0}
                footer="Podium finishes"
              />

              <MetricTile
                code="TOP5"
                title="Top 5"
                value={stats?.top5 ?? 0}
                footer="Top-five finishes"
              />

              <MetricTile
                code="TOP10"
                title="Top 10"
                value={stats?.top10 ?? 0}
                footer="Top-ten finishes"
              />
            </div>
          </section>

         {/* CAREER PROGRESS */}

          <section>
            <SectionHeading
              eyebrow="PLAYER DEVELOPMENT"
              title="Career Progress"
              description="Current career level and competitive development"
            />

            <div className="grid grid-cols-2 gap-3">

              <ProgressTile
                code="LVL"
                title="Player Level"
                value={playerLevel}
                progress={xpProgress}
                footer={`${xpRemaining} XP to next level`}
                accent="green"
              />


              <ProgressTile
                code="PTS"
                title="Career Points"
                value={careerPoints}
                progress={Math.min(
                  100,
                  (careerPoints / 1000) * 100
                )}
                footer="Lifetime points"
                accent="gold"
              />

          
            </div>
          </section> 

        
          {/* ACHIEVEMENTS */}

          <section>
            <SectionHeading
              eyebrow="CAREER MILESTONES"
              title="Achievements"
              description="Recognition earned through competitive play"
            />

            <div className="grid grid-cols-2 gap-3">

              <AchievementTile
                code="WIN"
                title="First Victory"
                unlocked={wins >= 1}
              />

              <AchievementTile
                code="STRK"
                title="Five-Win Streak"
                unlocked={
                  Number(
                    stats?.bestWinStreak ?? 0
                  ) >= 5
                }
              />

              <AchievementTile
                code="LV10"
                title="Level 10"
                unlocked={playerLevel >= 10}
              />

              <AchievementTile
                code="100"
                title="100 Career Points"
                unlocked={careerPoints >= 100}
              />

              <AchievementTile
                code="G100"
                title="Global Top 100"
                unlocked={
                  ranking.internationalPosition >
                    0 &&
                  ranking.internationalPosition <=
                    100
                }
              />

              <AchievementTile
                code="75%"
                title="75% Win Rate"
                unlocked={
                  winPercentage >= 75
                }
              />

              <AchievementTile
                code="C10"
                title="Club Top 10"
                unlocked={
                  ranking.clubPosition > 0 &&
                  ranking.clubPosition <= 10
                }
              />

              <AchievementTile
                code="STAR"
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
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3">
      <div className="mb-2 h-[2px] w-8 bg-[#0f5132]" />

      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0f5132]">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-xl font-black tracking-tight text-[#111827]">
        {title}
      </h2>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function ProfilePill({
  text,
}: {
  text: string;
}) {
  return (
    <span className="border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-300">
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
    <div className="px-2 py-4 text-center">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

function ProgressTile({
  code,
  title,
  value,
  progress,
  footer,
  accent,
}: {
  code: string;
  title: string;
  value: number | string;
  progress: number;
  footer: string;
  accent:
    | "green"
    | "navy"
    | "gold"
    | "slate";
}) {
  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  const colours = {
    green: "#0f5132",
    navy: "#17324a",
    gold: "#b08a42",
    slate: "#475569",
  };

  const colour = colours[accent];

  return (
    <div className="border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-start justify-between gap-3">

        <div>
          <span
            className="inline-flex h-8 min-w-8 items-center justify-center border px-2 text-[9px] font-black tracking-[0.08em]"
            style={{
              borderColor: `${colour}55`,
              color: colour,
              backgroundColor: `${colour}0d`,
            }}
          >
            {code}
          </span>

          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
            {title}
          </h3>
        </div>

        <div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${colour} ${safeProgress}%, #e5e7eb ${safeProgress}% 100%)`,
          }}
        >
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white">
            <span className="text-[10px] font-black text-slate-700">
              {Math.round(safeProgress)}%
            </span>
          </div>
        </div>
      </div>

      <p
        className="mt-4 text-3xl font-black tracking-tight"
        style={{
          color: colour,
        }}
      >
        {value}
      </p>

      <p className="mt-1 min-h-9 text-xs leading-4 text-slate-400">
        {footer}
      </p>
    </div>
  );
}

function MetricTile({
  code,
  title,
  value,
  footer,
  highlight = false,
}: {
  code: string;
  title: string;
  value: number | string;
  footer: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border bg-white p-4 shadow-sm ${
        highlight
          ? "border-[#c9b37a]"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">

        <span
          className={`text-[9px] font-black uppercase tracking-[0.12em] ${
            highlight
              ? "text-[#9a7531]"
              : "text-[#0f5132]"
          }`}
        >
          {code}
        </span>

        <div
          className={`h-[3px] w-7 ${
            highlight
              ? "bg-[#b08a42]"
              : "bg-[#0f5132]"
          }`}
        />
      </div>

      <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
        {title}
      </h3>

      <p className="mt-1 break-words text-3xl font-black tracking-tight text-[#111827]">
        {value}
      </p>

      <p className="mt-2 min-h-9 text-xs leading-4 text-slate-400">
        {footer}
      </p>
    </div>
  );
}

function RankingTile({
  code,
  title,
  value,
  onClick,
  premium = false,
}: {
  code: string;
  title: string;
  value: number;
  onClick: () => void;
  premium?: boolean;
}) {
  const hasRanking = value > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border bg-white p-4 text-left shadow-sm transition active:scale-[0.98] ${
        premium
          ? "border-[#c9b37a]"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">

        <span
          className={`text-[9px] font-black uppercase tracking-[0.12em] ${
            premium
              ? "text-[#9a7531]"
              : "text-[#0f5132]"
          }`}
        >
          {code}
        </span>

        <span
          className={`text-lg font-black ${
            premium
              ? "text-[#9a7531]"
              : "text-[#0f5132]"
          }`}
        >
          ›
        </span>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black tracking-tight text-[#111827]">
        {hasRanking ? `#${value}` : "—"}
      </p>

      <div className="mt-3 border-t border-slate-100 pt-3">
        <p
          className={`text-[10px] font-black uppercase tracking-[0.12em] ${
            premium
              ? "text-[#9a7531]"
              : "text-[#0f5132]"
          }`}
        >
          View Full Ranking
        </p>
      </div>
    </button>
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
  const hasData =
    before > 0 || after > 0;

  const movement = before - after;

  const movementStyle =
    movement > 0
      ? "text-[#0f5132]"
      : movement < 0
        ? "text-[#9f3a38]"
        : "text-slate-500";

  const movementLabel =
    !hasData
      ? "NO DATA"
      : movement > 0
        ? `▲ ${Math.abs(movement)}`
        : movement < 0
          ? `▼ ${Math.abs(movement)}`
          : "NO CHANGE";

  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-b-0">

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {hasData
            ? `#${before} → #${after}`
            : "No ranking recorded"}
        </p>
      </div>

      <span
        className={`text-xs font-black tracking-[0.06em] ${movementStyle}`}
      >
        {movementLabel}
      </span>
    </div>
  );
}

function ActionTile({
  code,
  title,
  text,
  onClick,
  premium = false,
}: {
  code: string;
  title: string;
  text: string;
  onClick: () => void;
  premium?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border bg-white p-5 text-left shadow-sm ${
        premium
          ? "border-[#c9b37a]"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">

        <div
          className={`flex h-12 min-w-12 items-center justify-center border px-2 text-[9px] font-black tracking-[0.08em] ${
            premium
              ? "border-[#c9b37a] bg-[#faf7ef] text-[#9a7531]"
              : "border-[#b8c7bd] bg-[#f3f7f4] text-[#0f5132]"
          }`}
        >
          {code}
        </div>

        <div className="min-w-0 flex-1">

          <h3 className="text-base font-black text-[#111827]">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {text}
          </p>
        </div>

        <span
          className={
            premium
              ? "text-xl text-[#9a7531]"
              : "text-xl text-[#0f5132]"
          }
        >
          ›
        </span>
      </div>
    </button>
  );
}

function AchievementTile({
  code,
  title,
  unlocked,
}: {
  code: string;
  title: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`border bg-white p-4 text-center shadow-sm ${
        unlocked
          ? "border-[#c9b37a]"
          : "border-slate-200"
      }`}
    >
      <div
        className={`mx-auto flex h-12 min-w-12 items-center justify-center border px-2 text-[9px] font-black tracking-[0.08em] ${
          unlocked
            ? "border-[#c9b37a] bg-[#faf7ef] text-[#9a7531]"
            : "border-slate-200 bg-slate-50 text-slate-400"
        }`}
      >
        {unlocked ? code : "LOCK"}
      </div>

      <p className="mt-3 text-sm font-black text-[#111827]">
        {title}
      </p>

      <p
        className={`mt-2 text-[10px] font-bold uppercase tracking-[0.12em] ${
          unlocked
            ? "text-[#9a7531]"
            : "text-slate-400"
        }`}
      >
        {unlocked
          ? "Achieved"
          : "Not achieved"}
      </p>
    </div>
  );
}
