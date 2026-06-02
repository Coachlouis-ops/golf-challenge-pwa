"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
  auth,
} from "@/src/lib/firebase";

type Competition = {
  competitionName: string;

  competitionDate: string;

  format: string;

  scoringType: string;

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

  countOutPosition?: number;
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

    scoringType:
  data.scoringType || "gross",

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
    competition.teeMode === "tee1and10"
      ? ["1", "10"]
      : competition.teeMode === "shotgun"
      ? ["1", "10"]
      : competition.teeMode === "tee10"
      ? ["10"]
      : ["1"];

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
// UPDATE LEADERBOARD
// =========================

async function updateLeaderboard() {

  if (!competitionId) return;

  try {

   const leaderboard: {
  position?: number;

  displayName: string;

  division: string;

  total: number;

  countOutPosition?: number;

  teeTime: string;

  startingHole: string;
}[] = [];

    const divisionLeaderboards:
      Record<string, any[]> = {};

    // ====================================
// SINGLES
// ====================================

if (
  competition?.playerConfiguration ===
  "Singles"
) {

  const singles: {
    position?: number;

    displayName: string;

    division: string;

    total: number;

    countOutPosition?: number;

    teeTime: string;

    startingHole: string;
  }[] =
    rows
      .filter(
        (r) =>
          r.displayName &&
          r.score !== ""
      )

      .map((r) => ({

        displayName:
          r.displayName,

        division:
          r.division || "Open",

        total:
          Number(r.score) || 0,

        countOutPosition:
          r.countOutPosition || 999,

        teeTime:
          r.teeTime,

        startingHole:
          r.startingHole,
      }));

  if (
    competition?.scoringType ===
    "points"
  ) {

    singles.sort((a: any, b: any) => {

      if (a.total !== b.total) {
        return b.total - a.total;
      }

      const aCount =
        a.countOutPosition || 999;

      const bCount =
        b.countOutPosition || 999;

      return aCount - bCount;
    });

  } else {

    singles.sort((a: any, b: any) => {

      if (a.total !== b.total) {
        return a.total - b.total;
      }

      const aCount =
        a.countOutPosition || 999;

      const bCount =
        b.countOutPosition || 999;

      return aCount - bCount;
    });
  }

  let currentPosition = 1;

  let lastScore:
    number | null = null;

  singles.forEach(
    (r, index) => {

      const isTie =
        lastScore !== null &&
        r.total === lastScore;

      if (!isTie) {
        currentPosition =
          index + 1;
      }

      lastScore = r.total;

      r.position =
        currentPosition;
    }
  );

  leaderboard.push(...singles);
}

// ====================================
// DOUBLES
// ====================================

if (
  competition?.playerConfiguration ===
  "Doubles"
) {

  for (
    let i = 0;
    i < rows.length;
    i += 2
  ) {

    const p1 = rows[i];
    const p2 = rows[i + 1];

    if (
      !p1 ||
      !p2 ||
      !p1.displayName ||
      !p2.displayName ||
      p1.score === ""
    ) continue;

    leaderboard.push({

      displayName:
        `${p1.displayName} / ${p2.displayName}`,

      division:
        p1.division || "Open",

      total:
        Number(p1.score) || 0,

      countOutPosition:
        p1.countOutPosition || 999,

      teeTime:
        p1.teeTime,

      startingHole:
        p1.startingHole,
    });
  }

  if (
    competition?.scoringType ===
    "points"
  ) {

    leaderboard.sort((a: any, b: any) => {

      if (a.total !== b.total) {
        return b.total - a.total;
      }

      const aCount =
        a.countOutPosition || 999;

      const bCount =
        b.countOutPosition || 999;

      return aCount - bCount;
    });

  } else {

    leaderboard.sort((a: any, b: any) => {

      if (a.total !== b.total) {
        return a.total - b.total;
      }

      const aCount =
        a.countOutPosition || 999;

      const bCount =
        b.countOutPosition || 999;

      return aCount - bCount;
    });
  }

  let currentPosition = 1;

  let lastScore:
    number | null = null;

  leaderboard.forEach(
    (r, index) => {

      const isTie =
        lastScore !== null &&
        r.total === lastScore;

      if (!isTie) {
        currentPosition =
          index + 1;
      }

      lastScore = r.total;

      r.position =
        currentPosition;
    }
  );
}

// ====================================
// FOURSOMES
// ====================================

if (
  competition?.playerConfiguration ===
  "Foursomes"
) {

  for (
    let i = 0;
    i < rows.length;
    i += 4
  ) {

    const group =
      rows.slice(i, i + 4);

    if (
      group.length < 4 ||
      !group[0].displayName ||
      group[0].score === ""
    ) continue;

    leaderboard.push({

      displayName:
        group
          .map(
            (g) =>
              g.displayName
          )
          .join(" / "),

      division:
        group[0].division || "Open",

      total:
        Number(
          group[0].score
        ) || 0,

      countOutPosition:
        group[0].countOutPosition || 999,

      teeTime:
        group[0].teeTime,

      startingHole:
        group[0].startingHole,
    });
  }

  if (
    competition?.scoringType ===
    "points"
  ) {

    leaderboard.sort((a: any, b: any) => {

      if (a.total !== b.total) {
        return b.total - a.total;
      }

      const aCount =
        a.countOutPosition || 999;

      const bCount =
        b.countOutPosition || 999;

      return aCount - bCount;
    });

  } else {

    leaderboard.sort((a: any, b: any) => {

      if (a.total !== b.total) {
        return a.total - b.total;
      }

      const aCount =
        a.countOutPosition || 999;

      const bCount =
        b.countOutPosition || 999;

      return aCount - bCount;
    });
  }

  let currentPosition = 1;

  let lastScore:
    number | null = null;

  leaderboard.forEach(
    (r, index) => {

      const isTie =
        lastScore !== null &&
        r.total === lastScore;

      if (!isTie) {
        currentPosition =
          index + 1;
      }

      lastScore = r.total;

      r.position =
        currentPosition;
    }
  );
}


    // ====================================
    // DIVISION LEADERBOARDS
    // ====================================

    const divisions = [
      ...new Set(
        leaderboard.map(
          (r) => r.division
        )
      ),
    ];

    divisions.forEach(
      (division) => {

        const filtered =
          leaderboard
            .filter(
              (r) =>
                r.division === division
            )

            .sort((a, b) => {

              if (
                competition?.scoringType ===
                "points"
              ) {
                return b.total - a.total;
              }

              return a.total - b.total;
            });

        let currentPosition = 1;

        let lastScore:
          number | null = null;

        filtered.forEach(
          (r, index) => {

            const isTie =
              lastScore !== null &&
              r.total === lastScore;

            if (!isTie) {
              currentPosition =
                index + 1;
            }

            lastScore = r.total;

            r.position =
              currentPosition;
          }
        );

        divisionLeaderboards[
          division
        ] = filtered;
      }
    );

    console.log(
  "LEADERBOARD GENERATED:",
  leaderboard
);

await updateDoc(
  doc(
    db,
    "competitions",
    competitionId
  ),
  {
    leaderboard:
      JSON.parse(
        JSON.stringify(leaderboard)
      ),

    divisionLeaderboards:
      JSON.parse(
        JSON.stringify(
          divisionLeaderboards
        )
      ),
  }
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
  }
}

// =========================
// FINALIZE COMPETITION
// =========================

async function finalizeCompetition() {

  if (!competitionId || !competition)
    return;

  const confirmFinalize =
    window.confirm(
      "Are you sure you want to finalize this competition? This cannot be undone."
    );

  if (!confirmFinalize) return;

  try {

    const clubId =
      auth.currentUser?.uid;

    if (!clubId) {

      alert(
        "Club not authenticated"
      );

      return;
    }

    const snap =
      await getDoc(
        doc(
          db,
          "competitions",
          competitionId
        )
      );

    const leaderboard =
      snap.data()?.leaderboard || [];

    const divisionLeaderboards =
      snap.data()?.divisionLeaderboards || {};

    await setDoc(

      doc(
        db,
        "scoringClubs",
        clubId,
        "competitionHistory",
        competitionId
      ),

      {
        competitionId,

        competitionName:
          competition.competitionName,

        competitionDate:
          competition.competitionDate,

        finalized: true,

        finalizedAt:
          serverTimestamp(),

        format:
          competition.format,

        scoringType:
          competition.scoringType,

        playerConfiguration:
          competition.playerConfiguration,

        divisionStructure:
          competition.divisionStructure,

        teeMode:
          competition.teeMode,

        rows,

        leaderboard,

        divisionLeaderboards,
      }
    );

    await updateDoc(
      doc(
        db,
        "competitions",
        competitionId
      ),
      {
        status: "finalized",
        finalized: true,
      }
    );

    alert(
      "Competition finalized"
    );

  } catch (e: any) {

    console.error(e);

    alert(
      e.message ||
      "Failed to finalize competition"
    );
  }
}

// =========================
// UPDATE ROW
// =========================

function updateRow(
  id: string,
  field: keyof PlayerRow,
  value: string | number
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

      <div className="flex items-center justify-between mb-10 gap-6">

        <div className="flex items-center gap-5">

          <button
            onClick={() =>
              window.history.back()
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
            ← BACK
          </button>

          <div>

            <h1 className="text-4xl font-bold">
              {competition.competitionName}
            </h1>

            <p className="text-gray-400 mt-2">
              Competition Dashboard
            </p>

          </div>

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
            onClick={updateLeaderboard}
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

          <button
            onClick={finalizeCompetition}
            className="
              bg-red-500
              text-white
              px-6
              py-4
              rounded-2xl
              font-bold
              shadow-[0_0_25px_rgba(239,68,68,0.7)]
            "
          >
            FINALIZE COMPETITION
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

                 <div className="grid grid-cols-14 gap-3 mb-3 text-sm text-gray-400 font-bold">

                    <div className="col-span-6">
                      Names
                    </div>

                    <div className="col-span-2">
                      Div
                    </div>

                 <div className="col-span-5 pl-3">
  Score
</div>

                  </div>

                  <div className="flex flex-col gap-3">

                    {group.map((row, index) => (

                      <div
  key={row.id}
  className="grid grid-cols-14 gap-3"
>

                        <div className="col-span-7">

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

                        <div className="col-span-2 pl-2">

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

                     <div className="col-span-5 flex gap-2">

  {(competition.playerConfiguration === "Singles" ||
    index % 2 === 0) && (

    <>

      <input
        value={row.score}
        onChange={(e) =>
          updateRow(
            row.id,
            "score",
            e.target.value
          )
        }
        placeholder="Score"
      className="
  w-full
  max-w-[140px]
  bg-black
  border border-white/10
  rounded-xl
  px-3
  py-3
"
      />

      <input
        value={
          row.countOutPosition || ""
        }
        onChange={(e) =>
          updateRow(
            row.id,
            "countOutPosition",
            e.target.value
          )
        }
        placeholder="CO"
        className="
          w-14
          bg-yellow-500/10
          border border-yellow-400/30
          text-center
          rounded-xl
          px-2
          py-3
        "
      />

    </>

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