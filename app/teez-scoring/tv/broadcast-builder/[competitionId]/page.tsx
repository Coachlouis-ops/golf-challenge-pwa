"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";


import {
  db,
  functions,
} from "@/src/lib/firebase";

import {
  httpsCallable,
} from "firebase/functions";

export default function BroadcastBuilderPage() {

  const params = useParams();

  const competitionId =
    params.competitionId as string;

  const [slides, setSlides] =
    useState<any[]>([]);

  const [competitionName, setCompetitionName] =
    useState("");

  useEffect(() => {

    const ref = doc(
      db,
      "tvBroadcasts",
      competitionId
    );

    const unsubscribe =
      onSnapshot(ref, (snap) => {

        if (!snap.exists()) return;

        const data = snap.data();

        setSlides(
          data.slides || []
        );

      });

    return () => unsubscribe();

  }, [competitionId]);

  useEffect(() => {

    if (!competitionId) return;

    const unsubscribe =
      onSnapshot(

        doc(
          db,
          "competitions",
          competitionId
        ),

        (snap) => {

          if (!snap.exists()) return;

          const data =
            snap.data();

          setCompetitionName(
            data.competitionName || ""
          );

        }

      );

    return () => unsubscribe();

  }, [competitionId]);


  const saveTvBroadcast =
  httpsCallable(
    functions,
    "saveTvBroadcast"
  );

  async function addLeaderboardSlide() {

    const updatedSlides = [

      ...slides,

      {
        type: "leaderboard",
        title: "LIVE LEADERBOARD",
      },

    ];

    setSlides(updatedSlides);

 await saveTvBroadcast({

  competitionId,

  slides: updatedSlides,

});

  }


  async function addTeeSheetSlide() {

  const updatedSlides = [

    ...slides,

    {
      type: "teeSheet",
      title: "TEE SHEET",
    },

  ];

  setSlides(updatedSlides);

 await saveTvBroadcast({

  competitionId,

  slides: updatedSlides,

});

}

async function addPairingsSlide() {

  const updatedSlides = [

    ...slides,

    {
      type: "pairings",
      title: "PLAYER PAIRINGS",
    },

  ];

  setSlides(updatedSlides);

await saveTvBroadcast({

  competitionId,

  slides: updatedSlides,

});

}

async function addSponsorSlide() {

  const image =
    prompt("Sponsor image URL");

  if (!image) return;

  const updatedSlides = [

    ...slides,

    {
      type: "sponsor",
      title: "SPONSOR",
      image,
    },

  ];

  setSlides(updatedSlides);

await saveTvBroadcast({

  competitionId,

  slides: updatedSlides,

});

}


return (

  <main className="min-h-screen bg-black text-white p-10">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-5xl font-black text-cyan-400 mb-4">
          BROADCAST BUILDER
        </h1>

        <div className="text-gray-400 text-xl">

          <p>
            Competition:
            <br />
            {competitionName}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {competitionId}
          </p>

        </div>

        <div className="mt-6 flex gap-4">

          <button
            onClick={() =>
              window.history.back()
            }
            className="
              bg-neutral-800
              px-5
              py-3
              rounded-2xl
              font-bold
            "
          >
            ← BACK
          </button>

          <button
  onClick={() =>
    window.open(
      `/teez-scoring/tv/default?competitionId=${competitionId}`,
      "_blank"
    )
  }
            className="
              bg-green-400
              text-black
              px-5
              py-3
              rounded-2xl
              font-bold
            "
          >
            OPEN BROADCAST
          </button>

        </div>

      </div>

        {/* ACTIONS */}

        <div className="mb-10 flex gap-4">

          <button
            onClick={addLeaderboardSlide}
            className="
              bg-green-400
              text-black
              px-8
              py-5
              rounded-2xl
              font-black
              hover:scale-105
              transition
            "
          >
            ADD LEADERBOARD SLIDE
          </button>

<button
  onClick={addTeeSheetSlide}
  className="
    bg-yellow-400
    text-black
    px-8
    py-5
    rounded-2xl
    font-black
    hover:scale-105
    transition
  "
>
  ADD TEE SHEET SLIDE
</button>


<button
  onClick={addPairingsSlide}
  className="
    bg-yellow-400
    text-black
    px-8
    py-5
    rounded-2xl
    font-black
    hover:scale-105
    transition
  "
>
  ADD PAIRINGS SLIDE
</button>

<button
  onClick={addSponsorSlide}
  className="
    bg-purple-400
    text-black
    px-8
    py-5
    rounded-2xl
    font-black
    hover:scale-105
    transition
  "
>
  ADD SPONSOR SLIDE
</button>

<button
  onClick={() =>
    window.open(
      `/teez-scoring/tv/default?competitionId=${competitionId}`,
      "_blank"
    )
  }
  className="
    bg-green-500
    text-black
    px-8
    py-5
    rounded-2xl
    font-black
    hover:scale-105
    transition
  "
>
  OPEN BROADCAST
</button>


        </div>

        {/* SLIDES */}

        <div className="grid gap-6">

          {slides.map((slide, index) => (

            <div
              key={`${slide.title}-${index}`}
              className="
                bg-neutral-900
                border border-cyan-400/20
                rounded-3xl
                p-8
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 mb-2">
                    SLIDE {index + 1}
                  </p>

                  <h2 className="text-3xl font-black text-white">
                    {slide.title}
                  </h2>

                </div>

                <div
                  className="
                    bg-green-400
                    text-black
                    px-6
                    py-3
                    rounded-2xl
                    font-black
                  "
                >
                  ACTIVE
                </div>

              </div>

            </div>

          ))}

          {slides.length === 0 && (

            <div
              className="
                bg-neutral-900
                border border-dashed border-white/10
                rounded-3xl
                p-20
                text-center
              "
            >

              <h2 className="text-3xl font-black text-gray-500 mb-4">
                NO SLIDES ADDED
              </h2>

              <p className="text-gray-600">
                Add your first broadcast slide
              </p>

            </div>

          )}

        </div>

      </div>

    </main>

  );
}