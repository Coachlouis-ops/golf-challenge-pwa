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
          "Unable to load Race to the Final:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadRace();
  }, [user]);

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
                TEEZ Championship Series
              </p>

              <h1 className="mt-1 text-lg font-black tracking-tight">
                RACE TO THE FINAL
              </h1>
            </div>

            <div className="h-9 w-9" />
          </div>
        </header>

        <div className="space-y-7 px-4 pt-5">

          {/* CHAMPIONSHIP HERO */}

          <section className="overflow-hidden border border-[#1f2937] bg-[#0d1821] shadow-[0_8px_22px_rgba(15,23,42,0.16)]">

            <div className="border-b border-white/10 p-5">
              <div className="flex items-start gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#b89b5e] bg-[#14232d]">
                  <span className="text-sm font-black tracking-[0.08em] text-[#d6bd7a]">
                    RTF
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8eb89f]">
                    Annual Championship
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
                    Race to the Final
                  </h2>

                  <p className="mt-2 text-sm leading-5 text-slate-300">
                    Compete throughout the season, earn Race Points
                    and climb the global standings.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-white/10">
              <div className="px-5 py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Qualification
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  Global Top 8
                </p>
              </div>

              <div className="px-5 py-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Championship
                </p>

                <p className="mt-1 text-lg font-black text-[#d6bd7a]">
                  The Final
                </p>
              </div>
            </div>
          </section>

          {/* YOUR RACE */}

          <section>
            <SectionHeading
              eyebrow="PLAYER STANDING"
              title="Your Race"
              description="Your current position in the championship season"
            />

            <div className="grid grid-cols-2 gap-3">
              <StatTile
                code="PTS"
                title="Race Points"
                value={racePoints.toLocaleString()}
                footer="Season total"
                highlight
              />

              <StatTile
                code="GLB"
                title="Global Position"
                value={
                  globalPosition
                    ? `#${globalPosition}`
                    : "—"
                }
                footer="Current standing"
              />

              <StatTile
                code="CUT"
                title="Qualification"
                value="Top 8"
                footer="Required position"
              />

              <StatTile
                code="STS"
                title="Status"
                value={
                  globalPosition &&
                  globalPosition <= 8
                    ? "QUALIFIED"
                    : "RACING"
                }
                footer="Season status"
              />
            </div>
          </section>

          {/* EARNING POINTS */}

          <section>
            <SectionHeading
              eyebrow="SCORING"
              title="Earn Race Points"
              description="Race Points are earned through competitive performance and selected career rewards"
            />

            <div className="border border-slate-200 bg-white px-5 shadow-sm">
              <InfoRow
                code="COMP"
                title="Challenge Performance"
                text="Earn Race Points through selected challenge results and competitive achievements."
              />

              <InfoRow
                code="VLT"
                title="Player Vault"
                text="Selected mystery coins can reveal Race Points as a career reward."
              />

              <InfoRow
                code="SEAS"
                title="Season Achievements"
                text="Selected season milestones and events can award additional Race Points."
              />
            </div>
          </section>

          {/* LEADERBOARD */}

          <section>
            <SectionHeading
              eyebrow="OFFICIAL STANDINGS"
              title="Global Race Leaderboard"
              description="The leading eight positions form the championship qualification zone"
            />

            <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">

              <div className="grid grid-cols-[44px_1fr_auto] border-b border-slate-200 bg-[#f7f8f9] px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Pos
                </p>

                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Player
                </p>

                <p className="text-right text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Points
                </p>
              </div>

              {leaders.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm font-bold text-slate-700">
                    No official standings yet
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Standings will appear once Race Points are earned.
                  </p>
                </div>
              ) : (
                leaders.map((player, index) => {
                  const isCurrentPlayer =
                    player.uid === user?.uid;

                  return (
                    <div
                      key={player.uid}
                      className={`grid grid-cols-[44px_1fr_auto] items-center border-b border-slate-100 px-4 py-4 last:border-b-0 ${
                        isCurrentPlayer
                          ? "bg-[#f2f7f4]"
                          : "bg-white"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-lg font-black ${
                            index < 3
                              ? "text-[#9a7531]"
                              : "text-slate-700"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>

                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-black text-[#111827]">
                            {player.battleName}
                          </p>

                          {isCurrentPlayer && (
                            <span className="bg-[#0f5132] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">
                              You
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0f5132]">
                          Qualification Position
                        </p>
                      </div>

                      <p className="text-right text-sm font-black tabular-nums text-[#111827]">
                        {player.racePoints.toLocaleString()}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-x border-b border-[#d7c28c] bg-[#faf7ef] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a6b30]">
                Championship Cut · Top 8 Qualify
              </p>
            </div>
          </section>

          {/* FINAL */}

          <section>
            <SectionHeading
              eyebrow="SEASON FINALE"
              title="The Final"
              description="The championship stage of the Race to the Final"
            />

            <div className="border border-[#c9b37a] bg-white shadow-sm">
              <div className="flex items-start gap-4 p-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c9b37a] bg-[#faf7ef]">
                  <span className="text-[10px] font-black tracking-[0.08em] text-[#9a7531]">
                    FINAL
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a7531]">
                    TEEZ Championship
                  </p>

                  <h3 className="mt-1 text-xl font-black text-[#111827]">
                    Top 8 Players
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    At the end of the season, the eight qualifying
                    players advance to the final TEEZ challenge.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-[#0d1821] px-5 py-4">
                <p className="text-sm font-black text-white">
                  Eight qualifiers. One final challenge.
                </p>

                <p className="mt-1 text-sm font-bold text-[#d6bd7a]">
                  One TEEZ Champion of the Year.
                </p>
              </div>
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

function StatTile({
  code,
  title,
  value,
  footer,
  highlight = false,
}: {
  code: string;
  title: string;
  value: string;
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

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
        {title}
      </p>

      <p className="mt-1 break-words text-2xl font-black tracking-tight text-[#111827]">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {footer}
      </p>
    </div>
  );
}

function InfoRow({
  code,
  title,
  text,
}: {
  code: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 border-b border-slate-100 py-4 last:border-b-0">

      <div className="flex h-11 min-w-11 shrink-0 items-center justify-center border border-[#b8c7bd] bg-[#f3f7f4] px-2">
        <span className="text-[8px] font-black tracking-[0.06em] text-[#0f5132]">
          {code}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-black text-[#111827]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}