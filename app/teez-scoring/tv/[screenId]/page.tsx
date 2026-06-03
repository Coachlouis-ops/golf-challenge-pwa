"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useSearchParams,
} from "next/navigation";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

const ROWS_PER_SCENE = 12;

type LeaderboardRow = {
  position: number;
  displayName: string;
  division: string;
  total: number;
  teeTime: string;
  startingHole: string;
};


type Slide = {
  type: string;
  title: string;
  image?: string;
};

type Scene = {
  type: string;
  title: string;
  rows?: LeaderboardRow[];
  image?: string;
};

export default function TvBroadcastPage() {

  const params = useParams();

  const searchParams =
    useSearchParams();

  const screenId =
    params.screenId as string;

  const competitionId =
    searchParams.get(
      "competitionId"
    );

  const [currentScene, setCurrentScene] =
    useState(0);

const [leaderboard, setLeaderboard] =
  useState<LeaderboardRow[]>([]);

const [
  divisionLeaderboards,
  setDivisionLeaderboards,
] = useState<
  Record<string, LeaderboardRow[]>
>({});

const [slides, setSlides] =
  useState<Slide[]>([]);

const [teeSheetRows, setTeeSheetRows] =
  useState<any[]>([]);

useEffect(() => {
  console.log("SLIDES", slides);
}, [slides]);

  // -----------------------------------
  // LOAD COMPETITION
  // -----------------------------------

  useEffect(() => {

    if (!competitionId) return;

    const ref = doc(
      db,
      "competitions",
      competitionId
    );

    const unsubscribe =
      onSnapshot(
        ref,
        (snap) => {

          if (!snap.exists()) return;

          const data =
            snap.data();

          setLeaderboard(
  Array.isArray(
    data.leaderboard
  )
    ? data.leaderboard
    : []
);

setDivisionLeaderboards(
  data.divisionLeaderboards ||
    {}
);

setTeeSheetRows(
  Array.isArray(data.rows)
    ? data.rows
    : []
);

        }
      );

    return () => unsubscribe();

  }, [competitionId]);

  // -----------------------------------
  // LOAD BROADCAST SLIDES
  // -----------------------------------

  useEffect(() => {

    if (!competitionId) return;

    const ref = doc(
      db,
      "tvBroadcasts",
      competitionId
    );

    const unsubscribe =
      onSnapshot(
        ref,
        (snap) => {

          if (!snap.exists()) return;

          const data =
            snap.data();

          setSlides(
            Array.isArray(
              data.slides
            )
              ? data.slides
              : []
          );

        }
      );

    return () => unsubscribe();

  }, [competitionId]);

  // -----------------------------------
  // BUILD SCENES
  // -----------------------------------

  const teeGroups = Object.values(

  teeSheetRows.reduce(
    (acc: any, row: any) => {

      const key =
        `${row.teeTime}-${row.startingHole}`;

      if (!acc[key]) {

        acc[key] = {
          teeTime: row.teeTime,
          startingHole: row.startingHole,
          players: [],
        };

      }

      acc[key].players.push(
        row.displayName || "-"
      );

      return acc;

    },
    {}
  )

);

const scenes: Scene[] = [];

  slides.forEach((slide) => {


// -----------------------------------
// TEE SHEET
// -----------------------------------

if (
  slide.type ===
  "teeSheet"
) {

  for (
    let i = 0;
    i < teeGroups.length;
    i += 8
  ) {

    scenes.push({

      type: "teeSheet",

      title:
        slide.title,

      rows:
        teeGroups.slice(
          i,
          i + 8
        ) as any,

    });

  }

}

// -----------------------------------
// SPONSOR
// -----------------------------------

if (
  slide.type ===
  "sponsor"
) {

  scenes.push({

    type: "sponsor",

    title:
      slide.title,

    image:
      slide.image,

  });

}


    // -----------------------------------
    // OVERALL LEADERBOARD
    // -----------------------------------

if (
  slide.type ===
  "leaderboard"
) {

  if (
    leaderboard.length === 0
  ) {

    scenes.push({

      type: "leaderboard",

      title:
        slide.title,

      rows: [],

    });

  } else {

    for (
      let i = 0;
      i < leaderboard.length;
      i += ROWS_PER_SCENE
    ) {

      scenes.push({

        type: "leaderboard",

        title:
          i === 0
            ? slide.title
            : `${slide.title} ${i + 1}-${Math.min(
                i + ROWS_PER_SCENE,
                leaderboard.length
              )}`,

        rows:
          leaderboard.slice(
            i,
            i + ROWS_PER_SCENE
          ),

      });

    }

  }

}
    // -----------------------------------
    // DIVISION LEADERBOARDS
    // -----------------------------------

    if (
      slide.type ===
      "divisions"
    ) {

      Object.entries(
        divisionLeaderboards
      ).forEach(
        ([division, rows]) => {

          scenes.push({

            type: "division",

            title:
              `${division.toUpperCase()} DIVISION`,

            rows:
              rows.slice(
                0,
                ROWS_PER_SCENE
              ),

          });

        }
      );

    }

  });

  // -----------------------------------
  // AUTO ROTATION
  // -----------------------------------

  useEffect(() => {

    if (scenes.length <= 1)
      return;

    const interval =
      setInterval(() => {

        setCurrentScene(
          (prev) => {

            if (
              prev >=
              scenes.length - 1
            ) {
              return 0;
            }

            return prev + 1;

          }
        );

      }, 8000);

    return () =>
      clearInterval(interval);

  }, [scenes.length]);

  const activeScene =
    scenes[currentScene];

  return (

    <main className="w-screen h-screen bg-black text-white overflow-hidden p-10">

      <div className="h-full flex flex-col">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-gray-500 text-xl">
            SCREEN: {screenId}
          </p>

          <p className="text-gray-500 text-xl">
            COMPETITION:
            {" "}
            {competitionId}
          </p>

          <h1 className="text-6xl font-black text-green-400 mt-4">
            {activeScene?.title ||
              "TV BROADCAST"}
          </h1>

        </div>

        {/* TABLE */}

<div className="flex-1">

  {activeScene?.type === "teeSheet" ? (

    <div className="h-full bg-neutral-900 rounded-3xl p-10">

      <div className="grid grid-cols-2 gap-8">

        {(activeScene.rows as any[])?.map(
          (group: any, index: number) => {

            const players = [
              ...(group.players || []),
            ];

            while (
              players.length < 4
            ) {
              players.push("-");
            }

            return (

              <div
                key={index}
                className="
                  bg-black/40
                  border border-white/10
                  rounded-3xl
                  p-6
                "
              >

                <div className="text-3xl font-black text-cyan-400 mb-4">

                  {group.teeTime}
                  {" | "}
                  HOLE {group.startingHole}

                </div>

                <div className="flex flex-col gap-3">

                  {players.map(
                    (
                      player: string,
                      idx: number
                    ) => (

                      <div
                        key={idx}
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        {player || "-"}
                      </div>

                    )
                  )}

                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  ) : (

    <div className="bg-neutral-900 rounded-3xl overflow-hidden">

      <table className="w-full h-full">

        <thead className="bg-green-400 text-black">

          <tr>

            <th className="p-6 text-left text-3xl">
              POS
            </th>

            <th className="p-6 text-left text-3xl">
              PLAYER
            </th>

            <th className="p-6 text-left text-3xl">
              DIV
            </th>

            <th className="p-6 text-left text-3xl">
              SCORE
            </th>

          </tr>

        </thead>

        <tbody>

          {activeScene?.type === "sponsor" && (

            <tr>

              <td
                colSpan={4}
                className="h-[700px]"
              >

                <div className="w-full h-full flex items-center justify-center p-10">

                 <img
  src={activeScene.image}
  alt="Sponsor"
  className="
    w-full
    h-full
    object-cover
  "
/>

                </div>

              </td>

            </tr>

          )}

          {activeScene?.rows?.map(
            (row) => (

              <tr
                key={`${row.position}-${row.displayName}`}
                className="border-b border-white/10"
              >

                <td className="p-6 text-4xl font-black">
                  {row.position}
                </td>

                <td className="p-6 text-4xl font-bold">
                  {row.displayName}
                </td>

                <td className="p-6 text-3xl">
                  {row.division}
                </td>

                <td className="p-6 text-4xl font-black text-green-400">
                  {row.total}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  )}

</div>

        {/* FOOTER */}

        <div className="mt-6 flex justify-between text-2xl text-gray-500">

          <p>
            Scene {currentScene + 1}
            {" / "}
            {scenes.length}
          </p>

          <p>
            Auto Rotating Broadcast
          </p>

        </div>

      </div>

    </main>

  );
}