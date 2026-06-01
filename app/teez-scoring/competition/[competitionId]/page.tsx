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

  startTime: string;

  endTime: string;

  teeMode: string;

  teeIntervals: number;

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

  startTime:
    data.startTime || "07:00",

  endTime:
    data.endTime || "12:00",

  teeMode:
    data.teeMode || "Tee 1",

 teeIntervals:
  data.teeIntervals || 10,

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
// GENERATE TEE SHEET
// =========================

function generateTeeSheet() {

  if (!competition) return;

  const generatedRows: PlayerRow[] = [];

  const start = new Date(
    `2026-01-01T${competition.startTime}`
  );

  const end = new Date(
    `2026-01-01T${competition.endTime}`
  );

  const interval =
    Number(competition.teeIntervals) || 10;

  const teeModes =
    competition.teeMode === "Tee 1 & 10"
      ? ["1", "10"]
      : competition.teeMode === "Shotgun"
      ? ["ALL"]
      : [competition.teeMode.replace("Tee ", "")];

  while (start <= end) {

    const hours =
      start.getHours().toString().padStart(2, "0");

    const minutes =
      start.getMinutes().toString().padStart(2, "0");

    const teeTime = `${hours}:${minutes}`;

    teeModes.forEach((tee) => {

      for (let i = 1; i <= 4; i++) {

        generatedRows.push({

          id: crypto.randomUUID(),

          displayName: "",

          division: "",

          teeTime,

          startingHole: tee,

          score: "",
        });

      }

    });

    start.setMinutes(
      start.getMinutes() + interval
    );
  }

  setRows(generatedRows);
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


{/* TEE SHEET SETTINGS */}

<div className="bg-neutral-900 rounded-3xl p-6 mb-10">

  <div className="mb-6">

    <h2 className="text-2xl font-bold">
      Tee Sheet Settings
    </h2>

    <p className="text-gray-400 text-sm mt-1">
      Configure automatic tee sheet generation
    </p>

  </div>

  <div className="grid md:grid-cols-4 gap-4">

    {/* START TIME */}

    <div>

      <div className="text-xs text-gray-400 mb-2">
        FIRST TEE TIME
      </div>

      <input
        type="time"
        value={competition.startTime}
        onChange={(e) =>
          setCompetition({
            ...competition,
            startTime: e.target.value,
          })
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

    </div>

    {/* END TIME */}

    <div>

      <div className="text-xs text-gray-400 mb-2">
        LAST TEE TIME
      </div>

      <input
        type="time"
        value={competition.endTime}
        onChange={(e) =>
          setCompetition({
            ...competition,
            endTime: e.target.value,
          })
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

    </div>

    {/* INTERVAL */}

    <div>

      <div className="text-xs text-gray-400 mb-2">
        TEE INTERVAL
      </div>

      <input
        type="number"
        value={competition.teeIntervals}
        onChange={(e) =>
          setCompetition({
            ...competition,
            teeIntervals: Number(e.target.value),
          })
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

    </div>

    {/* MODE */}

    <div>

      <div className="text-xs text-gray-400 mb-2">
        TEE MODE
      </div>

      <select
        value={competition.teeMode}
        onChange={(e) =>
          setCompetition({
            ...competition,
            teeMode: e.target.value,
          })
        }
        className="
          w-full
          bg-black
          border border-white/10
          rounded-xl
          px-3
          py-3
        "
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
          Shotgun Start
        </option>

      </select>

    </div>

  </div>

</div>

     {/* TEE SHEET */}

<div className="bg-neutral-900 rounded-3xl p-6">

  <div className="flex items-center justify-between mb-8">

    <div>

      <h2 className="text-2xl font-bold">
        Tee Sheet
      </h2>

      <p className="text-gray-400 text-sm mt-1">
        Auto generated competition groups
      </p>

    </div>

    <button
      onClick={generateTeeSheet}
      className="
        bg-cyan-400
        text-black
        px-5
        py-3
        rounded-2xl
        font-bold
        shadow-[0_0_25px_rgba(34,211,238,0.7)]
      "
    >
      GENERATE TEE SHEET
    </button>

  </div>

  <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

    {["1", "10"].map((tee) => {

      const teeRows =
        rows.filter(
          (r) => r.startingHole === tee
        );

      const groupedTimes = [
        ...new Set(
          teeRows.map((r) => r.teeTime)
        ),
      ];

      return (

        <div key={tee}>

          <div className="text-3xl font-black mb-6 text-center">
            TEE {tee}
          </div>

          <div className="flex flex-col gap-8">

            {groupedTimes.map((time) => {

              const group =
                teeRows.filter(
                  (r) => r.teeTime === time
                );

              return (

                <div
                  key={time}
                  className="
                    bg-black/40
                    border border-white/10
                    rounded-3xl
                    p-5
                  "
                >

                  <div className="text-center text-2xl font-bold mb-5">
                    {time}
                  </div>

                  <div className="grid grid-cols-12 gap-3 mb-3 text-sm text-gray-400 font-bold">

                    <div className="col-span-6">
                      Names
                    </div>

                    <div className="col-span-2">
                      Div
                    </div>

                    <div className="col-span-4">
                      Score
                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

                    {group.map((row, index) => (

                      <div
                        key={row.id}
                        className="grid grid-cols-12 gap-3"
                      >

                        <div className="col-span-6">

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

                        </div>

                        <div className="col-span-2">

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

                        </div>

                        <div className="col-span-4">

                          {(competition.playerConfiguration === "Singles" ||
                            index % 2 === 0) && (

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

                          )}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      );
    })}

  </div>

</div>

      </div>

    </main>

  );
}