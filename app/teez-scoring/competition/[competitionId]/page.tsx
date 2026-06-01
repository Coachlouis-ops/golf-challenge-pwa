"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

type Competition = {
  competitionName: string;
  competitionDate: string;

  format: string;

  playerConfiguration: string;

  divisionStructure: string;

  status: string;
};

type PlayerRow = {
  id: string;

  displayName: string;

  division: string;

  teeTime: string;

  startingHole: string;

  score: string;
};

export default function CompetitionDashboardPage() {

  const params = useParams();

  const competitionId =
    Array.isArray(params?.competitionId)
      ? params.competitionId[0]
      : params?.competitionId;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [competition, setCompetition] =
    useState<Competition | null>(null);

  const [rows, setRows] = useState<
    PlayerRow[]
  >([]);

  // =========================
  // LOAD
  // =========================

  useEffect(() => {

    if (!competitionId) return;

    loadCompetition();

  }, [competitionId]);

  async function loadCompetition() {

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

      setCompetition({
        competitionName:
          data.competitionName || "",

        competitionDate:
          data.competitionDate || "",

        format:
          data.format || "",

        playerConfiguration:
          data.playerConfiguration || "",

        divisionStructure:
          data.divisionStructure || "",

        status:
          data.status || "active",
      });

      setRows(
        data.rows || []
      );

    } catch (e: any) {

      console.error(e);

      alert(
        e.message ||
        "Failed to load competition"
      );

    } finally {

      setLoading(false);

    }
  }

  // =========================
  // SAVE
  // =========================

  async function saveCompetition() {

    if (!competitionId || !competition)
      return;

    try {

      setSaving(true);

      await updateDoc(
        doc(
          db,
          "competitions",
          competitionId
        ),
        {
          ...competition,

          rows,
        }
      );

      alert("Competition saved");

    } catch (e: any) {

      console.error(e);

      alert(
        e.message ||
        "Failed to save"
      );

    } finally {

      setSaving(false);

    }
  }

  // =========================
  // ADD ROW
  // =========================

  function addRow() {

    setRows((prev) => [

      ...prev,

      {
        id: crypto.randomUUID(),

        displayName: "",

        division: "",

        teeTime: "",

        startingHole: "",

        score: "",
      },
    ]);
  }

  // =========================
  // UPDATE ROW
  // =========================

  function updateRow(
    id: string,
    field: keyof PlayerRow,
    value: string
  ) {

    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]: value,
            }
          : r
      )
    );
  }

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading competition...
      </main>
    );
  }

  if (!competition) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Competition not found
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              {competition.competitionName}
            </h1>

            <p className="text-gray-400 mt-2">
              Competition Dashboard
            </p>

          </div>

       <div className="flex items-center gap-4">

  <button
    onClick={() =>
      window.open(
        `/teez-scoring/leaderboard/${competitionId}`,
        "_blank"
      )
    }
    className="
      bg-cyan-400
      text-black
      px-6
      py-4
      rounded-2xl
      font-bold
      shadow-[0_0_25px_rgba(34,211,238,0.7)]
    "
  >
    VIEW LEADERBOARD
  </button>

  <button
    className="
      bg-yellow-400
      text-black
      px-6
      py-4
      rounded-2xl
      font-bold
      shadow-[0_0_25px_rgba(250,204,21,0.7)]
    "
  >
    UPDATE LEADERBOARD
  </button>

  <button
    onClick={saveCompetition}
    disabled={saving}
    className="
      bg-green-400
      text-black
      px-6
      py-4
      rounded-2xl
      font-bold
      shadow-[0_0_25px_rgba(34,197,94,0.7)]
    "
  >
    {saving
      ? "SAVING..."
      : "SAVE COMPETITION"}
  </button>

</div>

        </div>

        {/* SETTINGS */}

        <div className="grid md:grid-cols-4 gap-4 mb-10">

          <div className="bg-neutral-900 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-2">
              FORMAT
            </div>

            <div className="font-bold">
              {competition.format}
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-2">
              PLAYER CONFIG
            </div>

            <div className="font-bold">
              {competition.playerConfiguration}
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-2">
              DIVISIONS
            </div>

            <div className="font-bold">
              {competition.divisionStructure}
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-5">
            <div className="text-xs text-gray-400 mb-2">
              DATE
            </div>

            <div className="font-bold">
              {competition.competitionDate}
            </div>
          </div>

        </div>

        {/* PLAYER ROWS */}

        <div className="bg-neutral-900 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold">
                Competition Rows
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Add players, pairs,
                foursomes and scores
              </p>

            </div>

            <button
              onClick={addRow}
              className="
                bg-cyan-400
                text-black
                px-5
                py-3
                rounded-2xl
                font-bold
              "
            >
              ADD ROW
            </button>

          </div>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="text-left border-b border-white/10">

                  <th className="p-3">
                    Display Name
                  </th>

                  <th className="p-3">
                    Division
                  </th>

                  <th className="p-3">
                    Tee Time
                  </th>

                  <th className="p-3">
                    Starting Hole
                  </th>

                  <th className="p-3">
                    Score
                  </th>

                </tr>

              </thead>

              <tbody>

                {rows.map((row) => (

                  <tr
                    key={row.id}
                    className="border-b border-white/5"
                  >

                    {/* NAME */}

                    <td className="p-3">

                      <input
                        value={row.displayName}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "displayName",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black
                          border border-white/10
                          rounded-xl
                          px-3
                          py-3
                        "
                      />

                    </td>

                    {/* DIVISION */}

                    <td className="p-3">

                      <input
                        value={row.division}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "division",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black
                          border border-white/10
                          rounded-xl
                          px-3
                          py-3
                        "
                      />

                    </td>

                    {/* TEE */}

                    <td className="p-3">

                      <input
                        value={row.teeTime}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "teeTime",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black
                          border border-white/10
                          rounded-xl
                          px-3
                          py-3
                        "
                      />

                    </td>

                    {/* HOLE */}

                    <td className="p-3">

                      <input
                        value={row.startingHole}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "startingHole",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black
                          border border-white/10
                          rounded-xl
                          px-3
                          py-3
                        "
                      />

                    </td>

                    {/* SCORE */}

                    <td className="p-3">

                      <input
                        value={row.score}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "score",
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          bg-black
                          border border-white/10
                          rounded-xl
                          px-3
                          py-3
                        "
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>

  );
}