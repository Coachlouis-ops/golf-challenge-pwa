"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  httpsCallable,
} from "firebase/functions";

import {
  db,
  functions,
} from "@/src/lib/firebase";

import {
  useTeezNotification,
} from "@/src/components/TeezNotificationProvider";

type ScoringClub = {
  uid: string;
  clubName: string;
  active?: boolean;
};

type TeeGroup = {
  teeTime: string;
  startingHole: "1" | "10";
  players: string[];
};

type SeedResponse = {
  success: boolean;
  competitionId: string;
  competitionName: string;
  clubId: string;
  clubName: string;
  teeGroups: number;
  players: number;
  overwritten: boolean;
};

function parseTeeGroups(
  raw: string
): TeeGroup[] {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const groups: TeeGroup[] = [];

  lines.forEach((line, index) => {
    const parts = line
      .split("|")
      .map((part) => part.trim());

    if (parts.length < 2) {
      throw new Error(
        `Line ${index + 1}: use TIME|TEE|PLAYER 1|PLAYER 2|PLAYER 3|PLAYER 4`
      );
    }

    const teeTime = parts[0];
    const startingHole = parts[1];

    if (!/^\d{2}:\d{2}$/.test(teeTime)) {
      throw new Error(
        `Line ${index + 1}: tee time must be HH:MM`
      );
    }

    if (
      startingHole !== "1" &&
      startingHole !== "10"
    ) {
      throw new Error(
        `Line ${index + 1}: starting tee must be 1 or 10`
      );
    }

    const players = parts
      .slice(2, 6)
      .map((name) => name.trim());

    while (players.length < 4) {
      players.push("");
    }

    groups.push({
      teeTime,
      startingHole,
      players,
    });
  });

  return groups;
}

export default function SeedScoringEventPage() {
  const router = useRouter();

  const {
    teezAlert,
    teezConfirm,
  } = useTeezNotification();

  const [clubs, setClubs] =
    useState<ScoringClub[]>([]);

  const [loadingClubs, setLoadingClubs] =
    useState(true);

  const [seeding, setSeeding] =
    useState(false);

  const [result, setResult] =
    useState<SeedResponse | null>(null);

  const [clubId, setClubId] =
    useState("");

  const [
    competitionName,
    setCompetitionName,
  ] = useState("");

  const [
    competitionDate,
    setCompetitionDate,
  ] = useState("");

  const [
    courseName,
    setCourseName,
  ] = useState("");

  const [format, setFormat] =
    useState("Stableford");

  const [
    scoringType,
    setScoringType,
  ] = useState("points");

  const [
    playerConfiguration,
    setPlayerConfiguration,
  ] = useState("Singles");

  const [
    divisionStructure,
    setDivisionStructure,
  ] = useState("No Divisions");

  const [
    startTime,
    setStartTime,
  ] = useState("");

  const [
    endTime,
    setEndTime,
  ] = useState("");

  const [
    teeMode,
    setTeeMode,
  ] = useState("tee1and10");

  const [
    teeIntervals,
    setTeeIntervals,
  ] = useState("8");

  const [
    teeSheetText,
    setTeeSheetText,
  ] = useState("");

  const [
    overwrite,
    setOverwrite,
  ] = useState(false);

  useEffect(() => {
    loadClubs();
  }, []);

  async function loadClubs() {
    try {
      setLoadingClubs(true);

      const q = query(
        collection(
          db,
          "scoringClubs"
        ),
        orderBy(
          "clubName",
          "asc"
        )
      );

      const snap =
        await getDocs(q);

      const rows =
        snap.docs.map((docSnap) => ({
          uid: docSnap.id,
          ...(docSnap.data() as Omit<
            ScoringClub,
            "uid"
          >),
        }));

      setClubs(
        rows.filter(
          (club) =>
            club.active !== false
        )
      );
    } catch (error: any) {
      console.error(
        "LOAD SCORING CLUBS ERROR:",
        error
      );

      await teezAlert({
        message:
          error?.message ||
          "Could not load scoring clubs.",
        type: "error",
      });
    } finally {
      setLoadingClubs(false);
    }
  }

  const parsedPreview =
    useMemo(() => {
      if (!teeSheetText.trim()) {
        return {
          groups: 0,
          players: 0,
          error: "",
        };
      }

      try {
        const groups =
          parseTeeGroups(
            teeSheetText
          );

        return {
          groups:
            groups.length,

          players:
            groups.reduce(
              (total, group) =>
                total +
                group.players.filter(
                  Boolean
                ).length,
              0
            ),

          error: "",
        };
      } catch (error: any) {
        return {
          groups: 0,
          players: 0,
          error:
            error?.message ||
            "Invalid tee sheet.",
        };
      }
    }, [teeSheetText]);

  async function seedCompetition() {
    if (!clubId) {
      await teezAlert({
        message:
          "Select a scoring club.",
        type: "warning",
      });

      return;
    }

    if (
      !competitionName.trim()
    ) {
      await teezAlert({
        message:
          "Enter a competition name.",
        type: "warning",
      });

      return;
    }

    if (!competitionDate) {
      await teezAlert({
        message:
          "Select a competition date.",
        type: "warning",
      });

      return;
    }

    if (!teeSheetText.trim()) {
      await teezAlert({
        message:
          "Paste the tee sheet first.",
        type: "warning",
      });

      return;
    }

    let teeGroups: TeeGroup[];

    try {
      teeGroups =
        parseTeeGroups(
          teeSheetText
        );
    } catch (error: any) {
      await teezAlert({
        message:
          error?.message ||
          "The tee sheet format is invalid.",
        type: "error",
      });

      return;
    }

    const confirmed =
      await teezConfirm({
        message:
          `Seed "${competitionName.trim()}"?\n\n` +
          `${teeGroups.length} tee groups\n` +
          `${teeGroups.reduce(
            (total, group) =>
              total +
              group.players.filter(
                Boolean
              ).length,
            0
          )} players`,
        type: "warning",
        confirmText: "SEED EVENT",
        cancelText: "CANCEL",
      });

    if (!confirmed) {
      return;
    }

    try {
      setSeeding(true);
      setResult(null);

      const seedEvent =
        httpsCallable<
          {
            clubId: string;
            competitionName: string;
            competitionDate: string;
            courseName: string;
            format: string;
            scoringType: string;
            playerConfiguration: string;
            divisionStructure: string;
            startTime: string;
            endTime: string;
            teeMode: string;
            teeIntervals: number;
            teeGroups: TeeGroup[];
            overwrite: boolean;
          },
          SeedResponse
        >(
          functions,
          "seedTeezScoringCompetition"
        );

      const response =
        await seedEvent({
          clubId,

          competitionName:
            competitionName.trim(),

          competitionDate,

          courseName:
            courseName.trim(),

          format,

          scoringType,

          playerConfiguration,

          divisionStructure,

          startTime,

          endTime,

          teeMode,

          teeIntervals:
            Number(
              teeIntervals
            ) || 8,

          teeGroups,

          overwrite,
        });

      setResult(
        response.data
      );

      await teezAlert({
        message:
          `Competition seeded successfully.\n\n` +
          `Players: ${response.data.players}\n` +
          `Tee groups: ${response.data.teeGroups}`,
        type: "success",
      });
    } catch (error: any) {
      console.error(
        "SEED SCORING EVENT ERROR:",
        error
      );

      await teezAlert({
        message:
          error?.message ||
          "Could not seed scoring event.",
        type: "error",
      });
    } finally {
      setSeeding(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="w-full max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-black tracking-[0.3em] text-orange-300">
              TEEZ ADMIN
            </p>

            <h1 className="text-3xl sm:text-4xl font-black text-orange-400 mt-2">
              SEED TEEZ SCORING EVENT
            </h1>

            <p className="text-gray-400 mt-2">
              Create a standard TEEZ Scoring competition and import its tee sheet.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin"
              )
            }
            className="bg-white/10 border border-white/10 rounded-xl px-5 py-3 font-black"
          >
            ← ADMIN
          </button>
        </div>

        <section className="bg-neutral-950 border border-orange-400/30 rounded-3xl p-5 sm:p-6 mb-6">
          <h2 className="text-xl font-black text-orange-300 mb-5">
            EVENT DETAILS
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                SCORING CLUB
              </label>

              <select
                value={clubId}
                onChange={(e) =>
                  setClubId(
                    e.target.value
                  )
                }
                disabled={loadingClubs}
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
              >
                <option value="">
                  {loadingClubs
                    ? "Loading clubs..."
                    : "Select scoring club"}
                </option>

                {clubs.map(
                  (club) => (
                    <option
                      key={club.uid}
                      value={club.uid}
                    >
                      {club.clubName}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                COMPETITION DATE
              </label>

              <input
                type="date"
                value={competitionDate}
                onChange={(e) =>
                  setCompetitionDate(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                COMPETITION NAME
              </label>

              <input
                type="text"
                value={competitionName}
                onChange={(e) =>
                  setCompetitionName(
                    e.target.value
                  )
                }
                placeholder="e.g. Silver Lakes Club Competition"
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                COURSE NAME
              </label>

              <input
                type="text"
                value={courseName}
                onChange={(e) =>
                  setCourseName(
                    e.target.value
                  )
                }
                placeholder="e.g. Silver Lakes Golf & Wildlife Estate"
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                FORMAT
              </label>

              <select
                value={format}
                onChange={(e) =>
                  setFormat(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              >
                <option>
                  Stableford
                </option>

                <option>
                  Stroke Play
                </option>

                <option>
                  IPS
                </option>

                <option>
                  Matchplay
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                SCORING TYPE
              </label>

              <select
                value={scoringType}
                onChange={(e) =>
                  setScoringType(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              >
                <option value="points">
                  Points
                </option>

                <option value="gross">
                  Gross
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                PLAYER CONFIGURATION
              </label>

              <select
                value={
                  playerConfiguration
                }
                onChange={(e) =>
                  setPlayerConfiguration(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              >
                <option>
                  Singles
                </option>

                <option>
                  Doubles
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                DIVISION STRUCTURE
              </label>

              <input
                type="text"
                value={
                  divisionStructure
                }
                onChange={(e) =>
                  setDivisionStructure(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              />
            </div>

          </div>
        </section>

        <section className="bg-neutral-950 border border-cyan-400/30 rounded-3xl p-5 sm:p-6 mb-6">
          <h2 className="text-xl font-black text-cyan-300 mb-5">
            TEE SETTINGS
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                FIRST TEE TIME
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                LAST TEE TIME
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                TEE INTERVAL
              </label>

              <input
                type="number"
                min="1"
                value={teeIntervals}
                onChange={(e) =>
                  setTeeIntervals(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2">
                TEE MODE
              </label>

              <select
                value={teeMode}
                onChange={(e) =>
                  setTeeMode(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"
              >
                <option value="tee1">
                  Tee 1
                </option>

                <option value="tee10">
                  Tee 10
                </option>

                <option value="tee1and10">
                  Tee 1 & 10
                </option>

                <option value="shotgun">
                  Shotgun
                </option>
              </select>
            </div>

          </div>
        </section>

        <section className="bg-neutral-950 border border-green-400/30 rounded-3xl p-5 sm:p-6 mb-6">
          <h2 className="text-xl font-black text-green-300">
            TEE SHEET IMPORT
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Paste one tee group per line.
          </p>

          <div className="mt-4 bg-black border border-white/10 rounded-xl p-4 text-xs text-gray-300 overflow-x-auto">
            <p className="font-black text-white">
              FORMAT
            </p>

            <p className="mt-2">
              TIME|TEE|PLAYER 1|PLAYER 2|PLAYER 3|PLAYER 4
            </p>

            <p className="mt-2 text-cyan-300">
              11:10|1|Player One|Player Two|Player Three|Player Four
            </p>

            <p className="text-cyan-300">
              11:10|10|Player Five|Player Six|Player Seven|Player Eight
            </p>

            <p className="mt-2 text-gray-500">
              Empty player positions may be left blank.
            </p>
          </div>

          <textarea
            value={teeSheetText}
            onChange={(e) =>
              setTeeSheetText(
                e.target.value
              )
            }
            rows={18}
            placeholder={
              "11:10|1|Player One|Player Two|Player Three|Player Four\n" +
              "11:10|10|Player Five|Player Six|Player Seven|Player Eight"
            }
            className="mt-5 w-full bg-black border border-white/20 rounded-2xl px-4 py-4 font-mono text-sm outline-none focus:border-green-400"
          />

          <div className="mt-4 grid sm:grid-cols-3 gap-3">

            <div className="bg-black border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500">
                TEE GROUPS
              </p>

              <p className="text-2xl font-black text-cyan-300">
                {parsedPreview.groups}
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500">
                PLAYERS
              </p>

              <p className="text-2xl font-black text-green-300">
                {parsedPreview.players}
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500">
                STATUS
              </p>

              <p
                className={`text-sm font-black ${
                  parsedPreview.error
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {parsedPreview.error ||
                  "READY"}
              </p>
            </div>

          </div>
        </section>

        <section className="bg-neutral-950 border border-red-400/30 rounded-3xl p-5 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={overwrite}
              onChange={(e) =>
                setOverwrite(
                  e.target.checked
                )
              }
              className="mt-1"
            />

            <span>
              <span className="block font-black text-red-300">
                OVERWRITE EXISTING COMPETITION
              </span>

              <span className="block text-xs text-gray-500 mt-1">
                Only enable this when intentionally replacing an already seeded competition with the same date and name.
              </span>
            </span>
          </label>
        </section>

        <button
          type="button"
          onClick={
            seedCompetition
          }
          disabled={
            seeding ||
            Boolean(
              parsedPreview.error
            )
          }
          className="w-full bg-orange-400 text-black rounded-2xl py-5 text-lg font-black shadow-[0_0_24px_rgba(251,146,60,0.5)] disabled:opacity-50"
        >
          {seeding
            ? "SEEDING EVENT..."
            : "SEED SCORING EVENT"}
        </button>

        {result && (
          <section className="mt-6 bg-neutral-950 border border-green-400/30 rounded-2xl p-5">
            <h2 className="font-black text-green-400">
              EVENT SEEDED
            </h2>

            <div className="mt-4 grid gap-2 text-sm">

              <p>
                <span className="text-gray-500">
                  Competition ID:
                </span>{" "}
                {result.competitionId}
              </p>

              <p>
                <span className="text-gray-500">
                  Club:
                </span>{" "}
                {result.clubName}
              </p>

              <p>
                <span className="text-gray-500">
                  Tee Groups:
                </span>{" "}
                {result.teeGroups}
              </p>

              <p>
                <span className="text-gray-500">
                  Players:
                </span>{" "}
                {result.players}
              </p>

              <p>
                <span className="text-gray-500">
                  Overwritten:
                </span>{" "}
                {result.overwritten
                  ? "Yes"
                  : "No"}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/teez-scoring/competition/${result.competitionId}`
                )
              }
              className="mt-5 w-full bg-green-400 text-black rounded-xl py-3 font-black"
            >
              OPEN COMPETITION
            </button>
          </section>
        )}

      </div>
    </main>
  );
}