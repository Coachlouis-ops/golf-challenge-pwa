"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sponsorLogos = [
  "automovers1.png",
  "bulls1.png",
  "cellc1.png",
  "cmv1.png",
  "cross1.png",
  "daimond1.png",
  "fed1.png",
  "finance1.png",
  "flexon1.png",
  "gobus1.png",
  "golfc1.png",
  "groot1.png",
  "ibi1.png",
  "issc1.png",
  "jk6_1.png",
  "joblack.png",
  "kalah1.png",
  "lions1.png",
  "foton1.png",
  "lepas1.png",
  "localc1.png",
  "mbale1.png",
  "orion1.png",
  "pelser1.png",
  "sneller1.png",
  "solarwarehouse1.png",
  "dog1.png",
  "whbo1.png",
  "teez1.png",
  "woodhill1.png",
];

export default function JK6MainDashboardPage() {
  const router = useRouter();

  const [
    showScoreboardCode,
    setShowScoreboardCode,
  ] = useState(false);

  const [
    scoreboardCode,
    setScoreboardCode,
  ] = useState("");

  const [
    scoreboardError,
    setScoreboardError,
  ] = useState("");

  function openScoreboard() {
    if (
      scoreboardCode.trim() !== "6"
    ) {
      setScoreboardError(
        "Incorrect access code."
      );

      return;
    }

    setShowScoreboardCode(false);
    setScoreboardCode("");
    setScoreboardError("");

    router.push(
      "/teez-scoring/scoreboard-sample"
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="w-full max-w-[520px] mx-auto">

        <section className="relative bg-neutral-950 border border-red-500/40 rounded-3xl overflow-hidden mb-5 shadow-[0_0_35px_rgba(220,38,38,0.35)]">
          <div className="relative h-56 flex items-center justify-center bg-black">
            <img
              src="/jk6_logo.png"
              alt="JK6"
              className="absolute inset-0 w-full h-full object-contain opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black" />
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-black text-red-500 animate-pulse drop-shadow-[0_0_14px_rgba(239,68,68,1)]">
              JK6 Annual Fundraiser Golf Day 2026
            </h1>

            <p className="text-cyan-300 font-black mt-2 animate-pulse drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
              4 Ball Alliance · Scramble Drive · Mystery Count
            </p>

            <p className="text-gray-400 text-sm mt-3">
              Shotgun start · 10:00am · Woodhill Residential Estate & Country Club
            </p>
          </div>
        </section>

        <section className="grid gap-4">

          <button
            onClick={() =>
              router.push(
                "/teez-scoring/corporate-days/jk6-2026/companies"
              )
            }
            className="
              bg-cyan-400
              text-black
              rounded-3xl
              p-6
              text-left
              font-black
              hover:scale-[1.01]
              transition
              shadow-[0_0_25px_rgba(34,211,238,0.45)]
            "
          >
            <h2 className="text-2xl font-black">
              COMPANY SCORECARDS
            </h2>

            <p className="text-sm mt-2 font-bold">
              Select your company and open your live scoring card.
            </p>
          </button>

          <button
            onClick={() => {
              setScoreboardCode("");
              setScoreboardError("");
              setShowScoreboardCode(true);
            }}
            className="
              bg-green-400
              text-black
              rounded-3xl
              p-6
              text-left
              font-black
              hover:scale-[1.01]
              transition
              shadow-[0_0_25px_rgba(74,222,128,0.45)]
            "
          >
            <h2 className="text-2xl font-black">
              LIVE SCOREBOARD
            </h2>

            <p className="text-sm mt-2 font-bold">
              View the current ranked team totals.
            </p>
          </button>

          <button
            onClick={() =>
              router.push(
                "/teez-scoring/corporate-days"
              )
            }
            className="
              bg-white/10
              border
              border-white/10
              text-white
              rounded-3xl
              p-5
              font-black
            "
          >
            BACK TO CORPORATE DAYS
          </button>

        </section>

        {showScoreboardCode && (
          <div
            className="
              fixed
              inset-0
              z-50
              bg-black/90
              flex
              items-center
              justify-center
              px-4
            "
          >
            <div
              className="
                w-full
                max-w-[420px]
                bg-neutral-950
                border
                border-green-400/40
                rounded-3xl
                p-6
                shadow-[0_0_35px_rgba(74,222,128,0.25)]
              "
            >
              <p className="text-xs tracking-[0.3em] text-green-400 font-black">
                LIVE SCOREBOARD
              </p>

              <h2 className="text-2xl font-black mt-2">
                Enter Access Code
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Enter the code to view the live leaderboard.
              </p>

              <input
                value={scoreboardCode}
                onChange={(e) => {
                  setScoreboardCode(
                    e.target.value
                  );

                  setScoreboardError("");
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    openScoreboard();
                  }
                }}
                type="password"
                inputMode="numeric"
                autoFocus
                placeholder="Code"
                className="
                  w-full
                  mt-5
                  bg-black
                  border
                  border-white/20
                  rounded-2xl
                  px-4
                  py-4
                  text-center
                  text-2xl
                  font-black
                  tracking-[0.35em]
                  outline-none
                  focus:border-green-400
                "
              />

              {scoreboardError && (
                <p className="text-red-400 text-sm font-black text-center mt-3">
                  {scoreboardError}
                </p>
              )}

              <button
                onClick={
                  openScoreboard
                }
                className="
                  w-full
                  mt-4
                  bg-green-400
                  text-black
                  rounded-2xl
                  py-4
                  font-black
                "
              >
                OPEN SCOREBOARD
              </button>

              <button
                onClick={() => {
                  setShowScoreboardCode(
                    false
                  );

                  setScoreboardCode("");
                  setScoreboardError("");
                }}
                className="
                  w-full
                  mt-3
                  bg-white/10
                  border
                  border-white/10
                  rounded-2xl
                  py-4
                  font-black
                "
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* SPONSORS */}

        <section className="mt-8 pb-10">
          <div className="text-center mb-6">
            <p className="text-xs font-black tracking-[0.35em] text-red-500">
              JK6 GOLF DAY 2026
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              SPONSORS & PARTNERS
            </h2>

            <div className="w-16 h-1 bg-red-500 rounded-full mx-auto mt-3 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
          </div>

          <div className="flex flex-col gap-4">
            {sponsorLogos.map(
              (logo) => (
                <div
                  key={logo}
                  className="
                    w-full
                    min-h-[150px]
                    bg-white
                    rounded-3xl
                    px-6
                    py-5
                    flex
                    items-center
                    justify-center
                    border
                    border-white/20
                    shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                  "
                >
                  <img
                    src={`/${logo}`}
                    alt="JK6 Sponsor"
                    className="
                      w-full
                      max-w-[340px]
                      h-[110px]
                      object-contain
                    "
                  />
                </div>
              )
            )}
          </div>
        </section>

      </div>
    </main>
  );
}