"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

type PlayerRow = {
  id: string;
  displayName: string;
  division: string;
  score: string;
  total?: number;
  teeTime: string;
  startingHole: string;
  countOutPosition?: string;
};

type LeaderboardRow = {
  id: string;

  position: number;

  displayName: string;

  division: string;

  total: number;

  teeTime: string;

  startingHole: string;

  countOutPosition?: string;
};

export default function LeaderboardPage() {

  const params = useParams();
  const router = useRouter();

  const competitionId =
    Array.isArray(params?.competitionId)
      ? params.competitionId[0]
      : params?.competitionId;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [competitionName, setCompetitionName] =
    useState("");

const [scoringType, setScoringType] =
  useState("gross");

const [playerConfiguration, setPlayerConfiguration] =
  useState("Singles");

  const [rows, setRows] =
    useState<PlayerRow[]>([]);

  const [leaderboard, setLeaderboard] =
    useState<LeaderboardRow[]>([]);

  const [divisionLeaderboards, setDivisionLeaderboards] =
    useState<Record<string, LeaderboardRow[]>>({});

  useEffect(() => {

    if (!competitionId) return;

    loadLeaderboard();

  }, [competitionId]);

  async function loadLeaderboard() {

  try {

    const ref = doc(
      db,
      "competitions",
      competitionId as string
    );

    const snap = await getDoc(ref);

    if (!snap.exists()) {

      alert("Competition not found");

      return;
    }

    const data = snap.data() as any;

    setCompetitionName(
      data.competitionName || ""
    );

    setScoringType(
      data.scoringType || "gross"
    );

    setPlayerConfiguration(
      data.playerConfiguration || "Singles"
    );

    const loadedRows =
      Array.isArray(data.rows)
        ? data.rows
        : [];

    setRows(loadedRows);

    const rebuilt =
      buildLeaderboards(
        loadedRows,
        data.scoringType || "gross",
        data.playerConfiguration || "Singles"
      );

    setLeaderboard(
      rebuilt.overall
    );

    setDivisionLeaderboards(
      rebuilt.divisions
    );

  } catch (e: any) {

    console.error(e);

    alert(
      e.message ||
      "Failed to load leaderboard"
    );

  } finally {

    setLoading(false);

  }
}

function buildLeaderboards(
  sourceRows: PlayerRow[],
  type: string,
  config: string
) {

  const leaderboardRows: LeaderboardRow[] = [];

  if (config === "Singles") {

    sourceRows
      .filter(
        (row) =>
          row.displayName &&
          row.displayName.trim() !== "" &&
          row.score !== ""
      )
      .forEach((row) => {

        leaderboardRows.push({
          id:
            row.id || crypto.randomUUID(),

          position:
            0,

          displayName:
            row.displayName || "",

          division:
            row.division || "Open",

          total:
            Number(row.score) || 0,

          teeTime:
            row.teeTime || "",

          startingHole:
            row.startingHole || "",

          countOutPosition:
            row.countOutPosition || "",
        });

      });
  }

  if (config === "Doubles") {

    for (
      let i = 0;
      i < sourceRows.length;
      i += 2
    ) {

      const p1 =
        sourceRows[i];

      const p2 =
        sourceRows[i + 1];

      if (
        !p1 ||
        !p2 ||
        !p1.displayName ||
        !p2.displayName ||
        p1.score === ""
      ) continue;

      leaderboardRows.push({
        id:
          p1.id || crypto.randomUUID(),

        position:
          0,

        displayName:
          `${p1.displayName} / ${p2.displayName}`,

        division:
          p1.division || "Open",

        total:
          Number(p1.score) || 0,

        teeTime:
          p1.teeTime || "",

        startingHole:
          p1.startingHole || "",

        countOutPosition:
          p1.countOutPosition || "",
      });
    }
  }

  if (config === "Foursomes") {

    for (
      let i = 0;
      i < sourceRows.length;
      i += 4
    ) {

      const group =
        sourceRows.slice(i, i + 4);

      if (
        group.length < 4 ||
        !group[0].displayName ||
        group[0].score === ""
      ) continue;

      leaderboardRows.push({
        id:
          group[0].id || crypto.randomUUID(),

        position:
          0,

        displayName:
          group
            .map((row) => row.displayName)
            .filter(Boolean)
            .join(" / "),

        division:
          group[0].division || "Open",

        total:
          Number(group[0].score) || 0,

        teeTime:
          group[0].teeTime || "",

        startingHole:
          group[0].startingHole || "",

        countOutPosition:
          group[0].countOutPosition || "",
      });
    }
  }

  const sortedOverall =
    sortLeaderboard(
      leaderboardRows,
      type
    );

  const positionedOverall =
    applyPositions(
      sortedOverall
    );

  const divisions:
    Record<string, LeaderboardRow[]> = {};

  positionedOverall.forEach((row) => {

    const division =
      row.division || "Open";

    if (!divisions[division]) {
      divisions[division] = [];
    }

    divisions[division].push(row);

  });

  Object.keys(divisions).forEach((division) => {

    divisions[division] =
      applyPositions(
        sortLeaderboard(
          divisions[division],
          type
        )
      );

  });

  return {
    overall: positionedOverall,
    divisions,
  };
}

function sortLeaderboard(
  sourceRows: LeaderboardRow[],
  type: string
) {

  return [...sourceRows].sort((a, b) => {

    if (a.total !== b.total) {

      if (type === "points") {
        return b.total - a.total;
      }

      return a.total - b.total;
    }

    const aCountOut =
      Number(a.countOutPosition);

    const bCountOut =
      Number(b.countOutPosition);

    const aHasCountOut =
      !Number.isNaN(aCountOut) &&
      a.countOutPosition !== "";

    const bHasCountOut =
      !Number.isNaN(bCountOut) &&
      b.countOutPosition !== "";

    if (
      aHasCountOut &&
      bHasCountOut &&
      aCountOut !== bCountOut
    ) {
      return aCountOut - bCountOut;
    }

    if (aHasCountOut && !bHasCountOut) {
      return -1;
    }

    if (!aHasCountOut && bHasCountOut) {
      return 1;
    }

    return a.displayName.localeCompare(
      b.displayName
    );

  });
}

  function applyPositions(
    sourceRows: LeaderboardRow[]
  ) {

    let lastScore: number | null =
      null;

    let lastCountOut = "";

    let lastPosition = 0;

    return sourceRows.map((row, index) => {

      const hasManualCountOut =
        row.countOutPosition &&
        row.countOutPosition.trim() !== "";

      const sameScore =
        lastScore === row.total;

      const sameCountOut =
        lastCountOut ===
        (row.countOutPosition || "");

      let position =
        index + 1;

      if (
        sameScore &&
        !hasManualCountOut &&
        !lastCountOut
      ) {
        position =
          lastPosition;
      }

      if (
        sameScore &&
        hasManualCountOut &&
        sameCountOut
      ) {
        position =
          lastPosition;
      }

      lastScore =
        row.total;

      lastCountOut =
        row.countOutPosition || "";

      lastPosition =
        position;

      return {
        ...row,
        position,
      };

    });
  }

function updateCountOut(
  rowId: string,
  value: string
) {

  const updatedRows =
    rows.map((row) =>
      row.id === rowId
        ? {
            ...row,
            countOutPosition: value,
          }
        : row
    );

  setRows(updatedRows);

  const rebuilt =
    buildLeaderboards(
      updatedRows,
      scoringType,
      playerConfiguration
    );

  setLeaderboard(
    rebuilt.overall
  );

  setDivisionLeaderboards(
    rebuilt.divisions
  );
}

async function updateLeaderboard() {

  if (!competitionId) return;

  try {

    setSaving(true);

    const rebuilt =
      buildLeaderboards(
        rows,
        scoringType,
        playerConfiguration
      );

     const cleanRows =
  rows.map((row) => ({
    id: row.id || crypto.randomUUID(),
    displayName: row.displayName || "",
    division: row.division || "",
    score: row.score || "",
    total: row.total ?? "",
    teeTime: row.teeTime || "",
    startingHole: row.startingHole || "",
    countOutPosition: row.countOutPosition || "",
  }));

const cleanOverall =
  rebuilt.overall.map((row) => ({
    id: row.id || crypto.randomUUID(),
    position: row.position || 0,
    displayName: row.displayName || "",
    division: row.division || "",
    total: row.total ?? 0,
    teeTime: row.teeTime || "",
    startingHole: row.startingHole || "",
    countOutPosition: row.countOutPosition || "",
  }));

const cleanDivisions =
  Object.fromEntries(
    Object.entries(rebuilt.divisions).map(
      ([division, divisionRows]) => [
        division,
        divisionRows.map((row) => ({
          id: row.id || crypto.randomUUID(),
          position: row.position || 0,
          displayName: row.displayName || "",
          division: row.division || "",
          total: row.total ?? 0,
          teeTime: row.teeTime || "",
          startingHole: row.startingHole || "",
          countOutPosition: row.countOutPosition || "",
        })),
      ]
    )
  );

await updateDoc(
  doc(
    db,
    "competitions",
    competitionId as string
  ),
  {
    rows: cleanRows,
    leaderboard: cleanOverall,
    divisionLeaderboards: cleanDivisions,
    updatedAt:
      serverTimestamp(),
  }
);

      setLeaderboard(
        rebuilt.overall
      );

      setDivisionLeaderboards(
        rebuilt.divisions
      );

      alert(
        "Leaderboard updated"
      );

    } catch (e: any) {

      console.error(e);

      alert(
        e.message ||
        "Failed to update leaderboard"
      );

    } finally {

      setSaving(false);

    }
  }

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading leaderboard...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10 flex items-center justify-between gap-4">

<button
  onClick={() =>
    router.push(
      `/teez-scoring/competition/${competitionId}`
    )
  }
            className="
              bg-neutral-900
              border border-white/10
              px-5
              py-3
              rounded-2xl
              hover:border-white/30
              transition
            "
          >
         ← COMPETITION
          </button>

          <div className="text-center flex-1">

            <h1 className="text-5xl font-black text-green-400 mb-4">
              LIVE LEADERBOARD
            </h1>

            <p className="text-gray-400 text-lg">
              {competitionName}
            </p>

          </div>

          <button
            onClick={updateLeaderboard}
            disabled={saving}
            className="
              bg-green-400
              text-black
              font-black
              px-6
              py-3
              rounded-2xl
              hover:scale-105
              transition
              disabled:opacity-50
            "
          >
            {saving
              ? "UPDATING..."
              : "UPDATE LEADERBOARD"}
          </button>

        </div>

        <div className="mb-12">

          <h2 className="text-3xl font-black mb-6 text-cyan-400">
            OVERALL LEADERBOARD
          </h2>

          <div className="bg-neutral-900 rounded-3xl overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="bg-green-400 text-black">

                <tr>

                  <th className="p-5 text-left">
                    POS
                  </th>

                  <th className="p-5 text-left">
                    PLAYER / TEAM
                  </th>

                  <th className="p-5 text-left">
                    DIV
                  </th>

                  <th className="p-5 text-left">
                    SCORE
                  </th>

                  <th className="p-5 text-left">
                    COUNT OUT
                  </th>

                  <th className="p-5 text-left">
                    TEE
                  </th>

                  <th className="p-5 text-left">
                    TIME
                  </th>

                </tr>

              </thead>

              <tbody>

                {leaderboard.map((row) => (

                  <tr
                    key={row.id}
                    className="border-b border-white/10"
                  >

                    <td className="p-5 font-bold text-2xl">
                      {row.position}
                    </td>

                    <td className="p-5 font-bold">
                      {row.displayName}
                    </td>

                    <td className="p-5">
                      {row.division}
                    </td>

                    <td className="p-5 text-green-400 font-black text-2xl">
                      {row.total}
                    </td>

                    <td className="p-5">

                      <input
                        value={
                          row.countOutPosition || ""
                        }
                        onChange={(e) =>
                          updateCountOut(
                            row.id,
                            e.target.value
                          )
                        }
                        placeholder="CO"
                        className="
                          w-20
                          bg-yellow-500/10
                          border border-yellow-400/30
                          text-yellow-400
                          text-center
                          rounded-xl
                          px-3
                          py-3
                          font-bold
                        "
                      />

                    </td>

                    <td className="p-5">
                      {row.startingHole}
                    </td>

                    <td className="p-5">
                      {row.teeTime}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {Object.entries(
          divisionLeaderboards
        ).map(([division, rows]) => (

          <div
            key={division}
            className="mb-12"
          >

            <h2 className="text-3xl font-black mb-6 text-yellow-400">
              {division.toUpperCase()} DIVISION
            </h2>

            <div className="bg-neutral-900 rounded-3xl overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-yellow-400 text-black">

                  <tr>

                    <th className="p-5 text-left">
                      POS
                    </th>

                    <th className="p-5 text-left">
                      PLAYER / TEAM
                    </th>

                    <th className="p-5 text-left">
                      SCORE
                    </th>

                    <th className="p-5 text-left">
                      COUNT OUT
                    </th>

                    <th className="p-5 text-left">
                      TEE
                    </th>

                    <th className="p-5 text-left">
                      TIME
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {rows.map((row) => (

                    <tr
                      key={`${division}-${row.id}`}
                      className="border-b border-white/10"
                    >

                      <td className="p-5 font-bold text-2xl">
                        {row.position}
                      </td>

                      <td className="p-5 font-bold">
                        {row.displayName}
                      </td>

                      <td className="p-5 text-yellow-400 font-black text-2xl">
                        {row.total}
                      </td>

                      <td className="p-5 text-yellow-400 font-bold">
                        {row.countOutPosition || "-"}
                      </td>

                      <td className="p-5">
                        {row.startingHole}
                      </td>

                      <td className="p-5">
                        {row.teeTime}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        ))}

      </div>

    </main>

  );
}