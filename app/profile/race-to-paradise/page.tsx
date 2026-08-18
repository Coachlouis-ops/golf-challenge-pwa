"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

type RacePlayer = {
  uid: string;
  battleName: string;
  racePoints: number;
};

export default function RaceToParadisePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [racePoints, setRacePoints] = useState(0);
  const [globalPosition, setGlobalPosition] = useState<number | null>(null);
  const [leaders, setLeaders] = useState<RacePlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const uid = user.uid;

    async function loadRace() {
      try {
        const playerSnap = await getDoc(
          doc(db, "playerRankings", uid)
        );

        if (playerSnap.exists()) {
          setRacePoints(
            Number(playerSnap.data().racePoints || 0)
          );
        }

        const leaderboardQuery = query(
          collection(db, "playerRankings"),
          orderBy("racePoints", "desc"),
          limit(100)
        );

        const leaderboardSnap =
          await getDocs(leaderboardQuery);

        const rows: RacePlayer[] = [];

for (const rankingDoc of leaderboardSnap.docs) {
  const data = rankingDoc.data();

  const profileSnap = await getDoc(
    doc(db, "profiles", rankingDoc.id)
  );

  const profileData = profileSnap.exists()
    ? profileSnap.data()
    : {};

  rows.push({
    uid: rankingDoc.id,
    battleName:
      profileData.battleName ||
      `${profileData.name || ""} ${profileData.surname || ""}`.trim() ||
      "TEEZ Player",
    racePoints:
      Number(data.racePoints || 0),
  });
}

        setLeaders(rows.slice(0, 8));

        const playerIndex = rows.findIndex(
          (player) => player.uid === uid
        );

        setGlobalPosition(
          playerIndex >= 0
            ? playerIndex + 1
            : null
        );
      } catch (error) {
        console.error(
          "Unable to load Race to Paradise:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadRace();
  }, [user]);

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-gray-900">
      <div className="mx-auto max-w-md pb-12">
        {/* HEADER */}

        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-5 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-600 hover:bg-gray-100"
              aria-label="Go back"
            >
              ‹
            </button>

            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">
                Annual Championship
              </p>

              <h1 className="text-xl font-black">
                Race to Paradise
              </h1>
            </div>

            <div className="h-10 w-10" />
          </div>
        </header>

        <div className="space-y-6 px-4 pt-5">
          {/* HERO */}

          <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-cyan-700 via-emerald-700 to-[#0b281d] p-6 text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              TEEZ Championship Journey
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Race to Paradise
            </h2>

            <p className="mt-3 text-sm leading-6 text-cyan-50/90">
              Compete throughout the season, earn Race Points and climb
              the global Race to Paradise leaderboard.
            </p>

            <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-100">
                The Prize
              </p>

              <p className="mt-2 text-lg font-black">
                Top 8 Players Worldwide
              </p>

              <p className="mt-2 text-sm leading-6 text-cyan-50/90">
                The season&apos;s Top 8 players will be taken to Mauritius
                on a TEEZ-sponsored golf trip to compete in the final
                challenge and play for the title of TEEZ Champion of the Year.
              </p>
            </div>
          </section>

          {/* PLAYER STATUS */}

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Your Race
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your current position in the season race.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
             <StatTile
  title="Race Points"
  value={racePoints.toLocaleString()}
  footer="Season total"
/>

<StatTile
  title="Global Position"
  value={globalPosition ? `#${globalPosition}` : "—"}
  footer="Race ranking"
/>

              <StatTile
                title="Qualification"
                value="Top 8"
                footer="Required to qualify"
              />

              <StatTile
                title="Status"
                value="Racing"
                footer="Season active"
              />
            </div>
          </section>

          {/* HOW TO EARN */}

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Earn Race Points
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Race Points will be earned through selected competitive
                achievements and special rewards.
              </p>
            </div>

            <div className="space-y-3">
              <InfoRow
                icon="🏆"
                title="Challenge Performance"
                text="Earn Race Points through selected challenge results and achievements."
              />

              <InfoRow
                icon="🪙"
                title="Mystery Vault Rewards"
                text="Selected mystery coins can reveal Race Points as a career reward."
              />

              <InfoRow
                icon="🔥"
                title="Special Season Achievements"
                text="Season milestones and special events can award additional Race Points."
              />
            </div>
          </section>

          {/* LEADERBOARD */}

          <section>
            <div className="mb-3 px-1">
              <h2 className="text-xl font-black">
                Global Race Leaderboard
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                The Top 8 qualify for Mauritius.
              </p>
            </div>

            <div className="rounded-[26px] border border-gray-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <div className="space-y-3">
               {leaders.length === 0 ? (
  <div className="py-6 text-center">
    <p className="font-bold text-gray-700">
      No Race standings yet
    </p>

    <p className="mt-1 text-sm text-gray-400">
      Rankings will appear once Race Points are earned.
    </p>
  </div>
) : (
  leaders.map((player, index) => (
    <div
      key={player.uid}
      className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-sm font-black text-cyan-700">
          {index + 1}
        </div>

        <div>
          <p className="font-bold text-gray-800">
            {player.battleName}
          </p>

          <p className="text-xs text-gray-400">
            {index < 8
              ? "Mauritius qualification position"
              : "Race leaderboard"}
          </p>
        </div>
      </div>

      <span className="text-sm font-black text-cyan-700">
        {player.racePoints.toLocaleString()} pts
      </span>
    </div>
  ))
)}
              </div>
            </div>
          </section>

          {/* FINAL */}

          <section className="rounded-[28px] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-cyan-50 p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="text-4xl">
              🏝️
            </div>

            <h2 className="mt-3 text-2xl font-black">
              Mauritius Final
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              At the end of the season, the Top 8 qualifying players will
              travel to Mauritius for the final TEEZ challenge.
            </p>

            <p className="mt-3 text-sm font-bold text-gray-900">
              One player will return as TEEZ Champion of the Year.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatTile({
  title,
  value,
  footer,
}: {
  title: string;
  value: string;
  footer: string;
}) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <p className="text-sm font-bold text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black text-cyan-700">
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-400">
        {footer}
      </p>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-2xl">
          {icon}
        </div>

        <div>
          <h3 className="font-black text-gray-800">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-gray-500">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}