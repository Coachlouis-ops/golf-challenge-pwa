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

  <div className="rounded-3xl border border-green-500/40 bg-gradient-to-br from-neutral-900 via-black to-neutral-900 shadow-[0_0_40px_rgba(34,197,94,0.15)] p-6">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-xs uppercase tracking-[0.25em] text-green-400">
          My Career
        </p>

        <h1 className="text-3xl font-black mt-2">
          {career?.battleName}
        </h1>

        <p className="text-gray-400 mt-1">
          {career?.name} {career?.surname}
        </p>

        <div className="mt-4 flex gap-2 flex-wrap">

          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
            {career?.division}
          </span>

          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
            {career?.club}
          </span>

        </div>

      </div>

      <div className="h-24 w-24 rounded-full border-2 border-green-500 flex items-center justify-center bg-neutral-900">

        <span className="text-4xl">
          ⛳
        </span>

      </div>

    </div>

  </div>

      {/* CAREER OVERVIEW */}
      <div className="mt-8 grid grid-cols-2 gap-4">

      <StatCard
  title="Player Level"
  value={career?.ranking?.playerLevel ?? 1}
  color="green"
/>

<StatCard
  title="Power Score"
  value={career?.ranking?.powerScore ?? 1000}
  color="blue"
/>

<StatCard
  title="Career XP"
  value={career?.ranking?.careerXP ?? 0}
  color="purple"
/>

<StatCard
  title="Career Points"
  value={career?.ranking?.careerPoints ?? 0}
  color="yellow"
/>

       </div>

      {/* CURRENT RANKINGS */}

      <div className="space-y-4 mt-8">

        <h2 className="text-xl font-bold text-green-400">
          Current Rankings
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <StatCard
            title="Club Rank"
            value={`#${ranking.clubPosition}`}
            color="green"
          />

          <StatCard
            title="Province Rank"
            value={`#${ranking.provincePosition}`}
            color="blue"
          />

          <StatCard
            title="National Rank"
            value={`#${ranking.nationalPosition}`}
            color="purple"
          />

          <StatCard
            title="Global Rank"
            value={`#${ranking.internationalPosition}`}
            color="yellow"
          />

        </div>

      </div>
{/* PERFORMANCE */}

<div className="space-y-4 mt-8">

  <h2 className="text-xl font-bold text-green-400">
    Performance
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <StatCard
      title="Matches Played"
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

  </div>

</div>

{/* CAREER RECORD */}

<div className="space-y-4 mt-8">

  <h2 className="text-xl font-bold text-green-400">
    Career Record
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <StatCard
      title="Best Finish"
      value={career?.ranking?.bestFinish ?? "-"}
      color="green"
    />

    <StatCard
      title="Top 3"
      value={career?.ranking?.top3 ?? 0}
      color="blue"
    />

    <StatCard
      title="Top 5"
      value={career?.ranking?.top5 ?? 0}
      color="purple"
    />

    <StatCard
      title="Top 10"
      value={career?.ranking?.top10 ?? 0}
      color="yellow"
    />

  </div>

</div>

{/* STREAKS */}

<div className="space-y-4 mt-8">

  <h2 className="text-xl font-bold text-green-400">
    Streaks
  </h2>

  <div className="grid grid-cols-2 gap-4">

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
      title="Current Losing Streak"
      value={career?.ranking?.currentLosingStreak ?? 0}
      color="purple"
    />

    <StatCard
      title="Worst Losing Streak"
      value={career?.ranking?.bestLosingStreak ?? 0}
      color="yellow"
    />

  </div>

</div>

{/* BEST FORMAT */}

<div className="space-y-4 mt-8">

  <h2 className="text-xl font-bold text-green-400">
    Best Format
  </h2>

  <div className="rounded-2xl border border-green-500/40 bg-neutral-900 p-6">

    <p className="text-xs uppercase tracking-widest text-gray-400">
      Favourite Competition Format
    </p>

    <h3 className="mt-3 text-3xl font-black text-green-400">
      {career?.ranking?.bestFormat || "-"}
    </h3>

    <p className="mt-2 text-lg text-white">
      {career?.ranking?.bestFormatWinPercentage ?? 0}% Win Rate
    </p>

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
