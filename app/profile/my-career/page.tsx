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

        <h1 className="text-3xl font-bold text-green-400">
          MY CAREER
        </h1>

      </div>

    </main>

  );

}