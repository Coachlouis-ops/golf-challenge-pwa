"use client";

import { useRouter } from "next/navigation";

const teams = [
  "AUTO MOVERS",
  "BLOU BULLE",
  "CELL C 1",
  "CELL C 2",
  "CMV",
  "CROSSFIT RAZMIG",
  "DIAMOND CELLULAR",
  "FED PROPERTIES",
  "FINANCE AFRICA",
  "FLEXON 1",
  "FLEXON 2",
  "FLEXON 3",
  "FLEXON 4",
  "GOBUSINESS",
  "GOLF CIRCLE",
  "GROOT FM",
  "IBL",
  "ISSC",
  "JO BLACK",
  "KALAHARI HORING",
  "LEPAS & FOTON",
  "LION 2",
  "LIONS",
  "LOCAL CHOICE",
  "MBALE",
  "ORION BULK",
  "PELSER PHOTOGRAPHY",
  "SILVER LAKES FARM HOTEL",
  "SNELLER",
  "SOLAR WAREHOUSE",
  "TOPDOG",
  "WHBO",
];

export default function JK6CompaniesPage() {
  const router = useRouter();

  function openScorecard(teamName: string) {
    router.push(
      `/teez-scoring/scorecard-sample?team=${encodeURIComponent(teamName)}`
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="w-full max-w-[520px] mx-auto">

        <section className="relative bg-neutral-950 border border-red-500/40 rounded-3xl overflow-hidden mb-5 shadow-[0_0_35px_rgba(220,38,38,0.35)]">
          <div className="relative h-44 flex items-center justify-center bg-black">
            <img
              src="/jk6_logo.png"
              alt="JK6"
              className="absolute inset-0 w-full h-full object-contain opacity-85"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black" />
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-black text-red-500 animate-pulse drop-shadow-[0_0_14px_rgba(239,68,68,1)]">
              JK6 Company Scorecards
            </h1>

            <p className="text-cyan-300 font-black mt-2 animate-pulse drop-shadow-[0_0_14px_rgba(34,211,238,1)]">
              Select your company to open your scorecard
            </p>
          </div>
        </section>

        <section className="grid gap-3">
          {teams.map((team, index) => (
            <button
              key={team}
              onClick={() => openScorecard(team)}
              className="
                bg-neutral-950
                border
                border-cyan-400/30
                rounded-2xl
                p-4
                text-left
                hover:border-cyan-300
                hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
                transition
              "
            >
              <div className="grid grid-cols-[44px_1fr] gap-3 items-center">
                <div className="text-xl font-black text-green-400">
                  {index + 1}
                </div>

                <div>
                  <p className="text-lg font-black">
                    {team}
                  </p>

                  <p className="text-xs text-gray-500">
                    Tap to open scorecard
                  </p>
                </div>
              </div>
            </button>
          ))}
        </section>

        <button
          onClick={() =>
            router.push("/teez-scoring/corporate-days/jk6-2026")
          }
          className="
            mt-6
            w-full
            bg-white/10
            border
            border-white/10
            rounded-2xl
            py-4
            font-black
            hover:border-red-400
            transition
          "
        >
          BACK TO JK6 DASHBOARD
        </button>

      </div>
    </main>
  );
}