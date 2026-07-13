"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type CareerData = {

  battleName: string;
  name: string;
  surname: string;

  club: string;
  division: string;

  ranking?: {

    club: number;
    province: number;
    national: number;
    international: number;

    powerScore: number;
    playerLevel: number;
    careerXP: number;

    careerPoints: number;

    matchesPlayed: number;
    wins: number;
    losses: number;

    winPercentage: number;

    bestFinish: number;

    top3: number;
    top5: number;
    top10: number;

    currentWinStreak: number;
    bestWinStreak: number;

    currentLosingStreak: number;
    bestLosingStreak: number;

    bestFormat: string;
    bestFormatWinPercentage: number;
  };

  lastChallenge?: {
    ranking?: {
      before?: {
        club: number;
        province: number;
        national: number;
        international: number;
      };
      after?: {
        club: number;
        province: number;
        national: number;
        international: number;
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

export default function MyCareerPage() {

  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [career, setCareer] =
    useState<CareerData | null>(null);

  const [ranking, setRanking] =
    useState<RankingPosition>({
      clubPosition: 0,
      provincePosition: 0,
      nationalPosition: 0,
      internationalPosition: 0,
    });

  useEffect(() => {

    if (!user) return;

    (async () => {

      const profileSnap = await getDoc(
        doc(db, "profiles", user.uid)
      );

      const rankingSnap = await getDoc(
        doc(db, "playerRankings", user.uid)
      );

      if (profileSnap.exists()) {
        setCareer(profileSnap.data() as CareerData);
      }

      if (rankingSnap.exists()) {

        const data = rankingSnap.data();

        setRanking({

          clubPosition:
            data.clubPosition || 0,

          provincePosition:
            data.provincePosition || 0,

          nationalPosition:
            data.nationalPosition || 0,

          internationalPosition:
            data.internationalPosition || 0,

        });

      }

      setLoading(false);

    })();

  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading Career...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-8">

    <div className="max-w-md mx-auto space-y-6">

  <button
    onClick={() => router.back()}
    className="text-gray-400 hover:text-green-400"
  >
    ← Back
  </button>

 {/* HERO */}

<div className="rounded-3xl overflow-hidden border border-green-500/40 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 shadow-[0_0_45px_rgba(34,197,94,0.18)]">

  <div className="p-6">

    <div className="flex justify-between items-start">

      <div>

        <p className="text-xs uppercase tracking-[0.30em] text-green-400">
          PLAYER PROFILE
        </p>

        <h1 className="text-4xl font-black mt-3">
          {career?.battleName}
        </h1>

        <p className="text-gray-400 mt-2">
          {career?.name} {career?.surname}
        </p>

      </div>

      <div className="h-28 w-28 rounded-full border-4 border-green-500 bg-neutral-900 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.35)]">

        <span className="text-5xl">
          ⛳
        </span>

      </div>

    </div>

    <div className="mt-8 grid grid-cols-3 gap-3">

      <div className="rounded-xl bg-black/40 p-4 text-center">

        <p className="text-gray-500 text-xs">
          LEVEL
        </p>

        <p className="text-3xl font-black text-green-400">
          {career?.ranking?.playerLevel ?? 1}
        </p>

      </div>

      <div className="rounded-xl bg-black/40 p-4 text-center">

        <p className="text-gray-500 text-xs">
          POWER
        </p>

        <p className="text-3xl font-black text-blue-400">
          {career?.ranking?.powerScore ?? 1000}
        </p>

      </div>

      <div className="rounded-xl bg-black/40 p-4 text-center">

        <p className="text-gray-500 text-xs">
          POINTS
        </p>

        <p className="text-3xl font-black text-yellow-400">
          {career?.ranking?.careerPoints ?? 0}
        </p>

      </div>

    </div>

    <div className="mt-6 flex flex-wrap gap-2">

      <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
        {career?.division}
      </span>

      <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">
        {career?.club}
      </span>

    </div>

  </div>

</div>

{/* PLAYER OVERVIEW */}

<div className="mt-8 rounded-3xl border border-green-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 space-y-6 shadow-[0_0_40px_rgba(34,197,94,0.15)]">

  <div className="text-center">

    <p className="text-xs uppercase tracking-[0.25em] text-green-400">
      Player Level
    </p>

    <h2 className="text-6xl font-black text-green-400 mt-2">
      {career?.ranking?.playerLevel ?? 1}
    </h2>

    <p className="text-gray-400 mt-2">
      {career?.ranking?.careerXP ?? 0} Career XP
    </p>

  </div>

  <div>

    <div className="flex justify-between text-xs text-gray-400 mb-2">
      <span>XP Progress</span>
      <span>{career?.ranking?.careerXP ?? 0} XP</span>
    </div>

    <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden">

      <div
        className="h-full rounded-full bg-green-500"
        style={{
          width: `${Math.min(
            ((career?.ranking?.careerXP ?? 0) % 1000) / 10,
            100
          )}%`,
        }}
      />

    </div>

  </div>

  <div className="grid grid-cols-2 gap-4">

    <StatCard
      title="Power Score"
      value={career?.ranking?.powerScore ?? 1000}
      color="blue"
    />

    <StatCard
      title="Career Points"
      value={career?.ranking?.careerPoints ?? 0}
      color="yellow"
    />

  </div>

</div>

{/* OVERALL RATING */}

<div className="mt-8 rounded-3xl border border-blue-500/40 bg-gradient-to-br from-neutral-900 to-black p-8 shadow-[0_0_45px_rgba(59,130,246,0.18)]">

  <p className="text-center text-sm uppercase tracking-[0.3em] text-blue-400">
    Overall Rating
  </p>

  <div className="mt-5 text-center">

    <p className="text-8xl font-black text-blue-400">
      {Math.min(
        99,
        Math.max(
          1,
          Math.floor((career?.ranking?.powerScore ?? 1000) / 25)
        )
      )}
    </p>

    <div className="mt-3 text-yellow-400 text-3xl">
      ★★★★★
    </div>

    <p className="mt-5 text-gray-400">
      Based on your complete competitive career.
    </p>

  </div>

  <div className="grid grid-cols-3 gap-4 mt-8">

    <div className="text-center">

      <p className="text-gray-500 text-xs">
        LEVEL
      </p>

      <p className="text-2xl font-bold text-green-400">
        {career?.ranking?.playerLevel ?? 1}
      </p>

    </div>

    <div className="text-center">

      <p className="text-gray-500 text-xs">
        POWER
      </p>

      <p className="text-2xl font-bold text-blue-400">
        {career?.ranking?.powerScore ?? 0}
      </p>

    </div>

    <div className="text-center">

      <p className="text-gray-500 text-xs">
        POINTS
      </p>

      <p className="text-2xl font-bold text-yellow-400">
        {career?.ranking?.careerPoints ?? 0}
      </p>

    </div>

  </div>

</div>

{/* LAST CHALLENGE */}

<div className="mt-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_35px_rgba(6,182,212,0.15)]">

  <h2 className="text-xl font-bold text-cyan-400 mb-5">
    Last Challenge
  </h2>

  <MovementRow
  title="Club"
  before={career?.lastChallenge?.ranking?.before?.club ?? 0}
  after={career?.lastChallenge?.ranking?.after?.club ?? 0}
/>

<MovementRow
  title="Province"
  before={career?.lastChallenge?.ranking?.before?.province ?? 0}
  after={career?.lastChallenge?.ranking?.after?.province ?? 0}
/>

<MovementRow
  title="National"
  before={career?.lastChallenge?.ranking?.before?.national ?? 0}
  after={career?.lastChallenge?.ranking?.after?.national ?? 0}
/>

<MovementRow
  title="Global"
  before={career?.lastChallenge?.ranking?.before?.international ?? 0}
  after={career?.lastChallenge?.ranking?.after?.international ?? 0}
/>

  <MovementRow
    title="Club"
    before={career?.lastChallenge?.ranking?.before?.club ?? 0}
    after={career?.lastChallenge?.ranking?.after?.club ?? 0}
  />

  <MovementRow
    title="Province"
    before={career?.lastChallenge?.ranking?.before?.province ?? 0}
    after={career?.lastChallenge?.ranking?.after?.province ?? 0}
  />

  <MovementRow
    title="National"
    before={career?.lastChallenge?.ranking?.before?.national ?? 0}
    after={career?.lastChallenge?.ranking?.after?.national ?? 0}
  />

  <MovementRow
    title="Global"
    before={career?.lastChallenge?.ranking?.before?.international ?? 0}
    after={career?.lastChallenge?.ranking?.after?.international ?? 0}
  />

</div>

{/* PLAYER PROGRESS */}

<div className="mt-8 rounded-3xl border border-green-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_35px_rgba(34,197,94,0.15)]">

  <h2 className="text-xl font-bold text-green-400 mb-6">
    Player Progress
  </h2>

  <div className="text-center">

    <p className="text-6xl font-black text-green-400">
      {career?.ranking?.playerLevel ?? 1}
    </p>

    <p className="text-gray-400 mt-2">
      Current Level
    </p>

  </div>

  <div className="mt-6">

    <div className="flex justify-between text-xs text-gray-400 mb-2">

      <span>XP Progress</span>

      <span>
        {career?.ranking?.careerXP ?? 0} XP
      </span>

    </div>

    <div className="w-full h-4 rounded-full bg-neutral-800 overflow-hidden">

      <div
        className="h-full bg-green-500 rounded-full"
        style={{
          width: `${Math.min(
            ((career?.ranking?.careerXP ?? 0) % 1000) / 10,
            100
          )}%`,
        }}
      />

    </div>

    <p className="text-center text-gray-500 text-xs mt-3">

      {1000 - ((career?.ranking?.careerXP ?? 0) % 1000)} XP until next level

    </p>

  </div>

</div>


{/* HALL OF FAME */}

<div className="mt-8 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">

  <h2 className="text-xl font-bold text-amber-400 mb-6">
    Hall of Fame
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <StatCard
      title="Best Finish"
      value={career?.ranking?.bestFinish ?? "-"}
      color="green"
    />

    <StatCard
      title="Top 3 Finishes"
      value={career?.ranking?.top3 ?? 0}
      color="blue"
    />

    <StatCard
      title="Top 5 Finishes"
      value={career?.ranking?.top5 ?? 0}
      color="purple"
    />

    <StatCard
      title="Top 10 Finishes"
      value={career?.ranking?.top10 ?? 0}
      color="yellow"
    />

  </div>

</div>



 {/* CURRENT RANKINGS */}

<div className="mt-8 rounded-3xl border border-yellow-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_35px_rgba(250,204,21,0.15)]">

  <h2 className="text-xl font-bold text-yellow-400 mb-6">
    Current Rankings
  </h2>

  <RankingBar
    title="Club"
    value={ranking.clubPosition}
    colour="green"
  />

  <RankingBar
    title="Province"
    value={ranking.provincePosition}
    colour="blue"
  />

  <RankingBar
    title="National"
    value={ranking.nationalPosition}
    colour="purple"
  />

  <RankingBar
    title="Global"
    value={ranking.internationalPosition}
    colour="yellow"
  />

</div>

{/* PLAYER PERFORMANCE */}

<div className="mt-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_35px_rgba(99,102,241,0.15)]">

  <h2 className="text-xl font-bold text-indigo-400 mb-6">
    Player Performance
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <StatCard
      title="Matches"
      value={career?.ranking?.matchesPlayed ?? 0}
      color="green"
    />

    <StatCard
      title="Wins"
      value={career?.ranking?.wins ?? 0}
      color="blue"
    />

    <StatCard
      title="Losses"
      value={career?.ranking?.losses ?? 0}
      color="purple"
    />

    <StatCard
      title="Win %"
      value={`${career?.ranking?.winPercentage ?? 0}%`}
      color="yellow"
    />

    <StatCard
      title="Current Win Streak"
      value={career?.ranking?.currentWinStreak ?? 0}
      color="green"
    />

    <StatCard
      title="Best Win Streak"
      value={career?.ranking?.bestWinStreak ?? 0}
      color="blue"
    />

    <StatCard
      title="Best Format"
      value={career?.ranking?.bestFormat || "-"}
      color="purple"
    />

    <StatCard
      title="Format Win %"
      value={`${career?.ranking?.bestFormatWinPercentage ?? 0}%`}
      color="yellow"
    />

  </div>

</div>


{/* CAREER SUMMARY */}

<div className="mt-8 rounded-3xl border border-pink-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_35px_rgba(236,72,153,0.15)]">

  <h2 className="text-xl font-bold text-pink-400 mb-6">
    Career Summary
  </h2>

  <div className="space-y-5">

    <SummaryRow
      label="Career Points"
      value={career?.ranking?.careerPoints ?? 0}
    />

    <SummaryRow
      label="Power Score"
      value={career?.ranking?.powerScore ?? 0}
    />

    <SummaryRow
      label="Player Level"
      value={career?.ranking?.playerLevel ?? 1}
    />

    <SummaryRow
      label="Career XP"
      value={career?.ranking?.careerXP ?? 0}
    />

  </div>

</div>


{/* ACHIEVEMENTS */}

<div className="mt-8 rounded-3xl border border-orange-500/40 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-[0_0_40px_rgba(249,115,22,0.15)]">

  <h2 className="text-xl font-bold text-orange-400 mb-6">
    Achievements
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <AchievementBadge
      icon="🥇"
      title="First Victory"
      unlocked={(career?.ranking?.wins ?? 0) >= 1}
    />

    <AchievementBadge
      icon="🔥"
      title="5 Win Streak"
      unlocked={(career?.ranking?.bestWinStreak ?? 0) >= 5}
    />

    <AchievementBadge
      icon="⚡"
      title="Level 10"
      unlocked={(career?.ranking?.playerLevel ?? 1) >= 10}
    />

    <AchievementBadge
      icon="💯"
      title="100 Career Points"
      unlocked={(career?.ranking?.careerPoints ?? 0) >= 100}
    />

    <AchievementBadge
      icon="🌍"
      title="Top 100"
      unlocked={ranking.internationalPosition <= 100 && ranking.internationalPosition > 0}
    />

    <AchievementBadge
      icon="🎯"
      title="75% Win Rate"
      unlocked={(career?.ranking?.winPercentage ?? 0) >= 75}
    />

    <AchievementBadge
      icon="🏆"
      title="Top 10 Club"
      unlocked={ranking.clubPosition <= 10 && ranking.clubPosition > 0}
    />

    <AchievementBadge
      icon="⭐"
      title="Rising Star"
      unlocked={(career?.ranking?.playerLevel ?? 1) >= 5}
    />

  </div>

</div>

    </div>

  </main>

  );

}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number | string;
  color: "green" | "blue" | "purple" | "yellow";
}) {

  const colours = {
    green: "border-green-500 text-green-400",
    blue: "border-blue-500 text-blue-400",
    purple: "border-purple-500 text-purple-400",
    yellow: "border-yellow-500 text-yellow-400",
  };

  return (
    <div className={`rounded-xl border bg-neutral-900 p-4 ${colours[color]}`}>
      <p className="text-xs text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );

}

function RankingBar({
  title,
  value,
  colour,
}:{
  title:string;
  value:number;
  colour:"green"|"blue"|"purple"|"yellow";
}) {

  const colours = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
  };

  const progress =
    Math.max(
      5,
      Math.min(
        100,
        100 - (value / 1000) * 100
      )
    );

  return (

    <div className="mb-5">

      <div className="flex justify-between mb-2">

        <span className="text-sm text-gray-300">
          {title}
        </span>

        <span className="font-bold text-white">
          #{value}
        </span>

      </div>

      <div className="h-3 rounded-full bg-neutral-800 overflow-hidden">

        <div
          className={`h-full ${colours[colour]}`}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

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

  const movement = before - after;

  const colour =
    movement > 0
      ? "text-green-400"
      : movement < 0
      ? "text-red-400"
      : "text-gray-400";

  const symbol =
    movement > 0
      ? "▲"
      : movement < 0
      ? "▼"
      : "•";

  return (

    <div className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-b-0">

      <div>

        <p className="text-white font-medium">
          {title}
        </p>

        <p className="text-xs text-gray-500">
          {before} → {after}
        </p>

      </div>

      <div className={`font-bold text-lg ${colour}`}>

        {movement === 0
          ? "No Change"
          : `${symbol} ${Math.abs(movement)}`}

      </div>

    </div>

  );

}
function SummaryRow({
  label,
  value,
}:{
  label:string;
  value:number|string;
}){

  return(

    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">

      <span className="text-gray-400">
        {label}
      </span>

      <span className="text-2xl font-bold text-white">
        {value}
      </span>

    </div>

  );

}
function AchievementBadge({
  icon,
  title,
  unlocked,
}:{
  icon:string;
  title:string;
  unlocked:boolean;
}){

  return(

    <div
      className={`rounded-2xl border p-5 text-center transition-all ${
        unlocked
          ? "border-yellow-500 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.25)]"
          : "border-neutral-700 bg-neutral-900 opacity-50"
      }`}
    >

      <div className="text-4xl">
        {icon}
      </div>

      <p className="mt-3 font-semibold">
        {title}
      </p>

    </div>

  );

}
