"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";

const teams = [
  "AUTO MOVERS",
  "VODACOM BULLS",
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
  "THE GOLF CIRCLE",
  "GROOT FM",
  "IBI",
  "ISSC",
  "JK6",
  "JO BLACK",
  "KALAHARI HORING",
  "LEPAS & FOTON",
  "LIONS COACHES",
  "LIONS PLAYERS",
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

function slugifyCompanyName(name: string) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function JK6CompaniesPage() {
  const router = useRouter();

  const [
    selectedTeam,
    setSelectedTeam,
  ] = useState("");

  const [
    accessCode,
    setAccessCode,
  ] = useState("");

  const [
    accessError,
    setAccessError,
  ] = useState("");

  const [
    checkingAccess,
    setCheckingAccess,
  ] = useState(false);

  function requestScorecardAccess(
    teamName: string
  ) {
    setSelectedTeam(teamName);
    setAccessCode("");
    setAccessError("");
  }

  async function openScorecard() {
    if (!selectedTeam) {
      return;
    }

    if (!accessCode.trim()) {
      setAccessError(
        "Enter your company access code."
      );
      return;
    }

    const participantId =
      slugifyCompanyName(
        selectedTeam
      );

    try {
      setCheckingAccess(true);
      setAccessError("");

      const verifyAccess =
        httpsCallable(
          functions,
          "verifyJK6ScorecardAccess"
        );

      const result =
        await verifyAccess({
          participantId,
          code:
            accessCode.trim(),
        });

      const response =
        result.data as {
          success?: boolean;
          accessToken?: string;
        };

      if (
        response.success !== true ||
        !response.accessToken
      ) {
        setAccessError(
          "Incorrect access code."
        );

        return;
      }

      sessionStorage.setItem(
        `jk6ScorecardAccess:${participantId}`,
        response.accessToken
      );

      setSelectedTeam("");
      setAccessCode("");

      router.push(
        `/teez-scoring/scorecard-sample?team=${encodeURIComponent(selectedTeam)}`
      );
    } catch (error) {
      console.error(error);

      setAccessError(
        "Incorrect access code."
      );
    } finally {
      setCheckingAccess(false);
    }
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
          {teams.map(
            (
              team,
              index
            ) => (
              <button
                key={team}
                onClick={() =>
                  requestScorecardAccess(
                    team
                  )
                }
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
                      Tap to enter company code
                    </p>
                  </div>
                </div>
              </button>
            )
          )}
        </section>

        <button
          onClick={() =>
            router.push(
              "/teez-scoring/corporate-days/jk6-2026"
            )
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

      {selectedTeam && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="w-full max-w-[420px] bg-neutral-950 border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_35px_rgba(34,211,238,0.25)]">
            <p className="text-xs tracking-[0.3em] text-cyan-300 font-black">
              COMPANY SCORECARD
            </p>

            <h2 className="text-2xl font-black mt-2">
              {selectedTeam}
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Enter your company access code.
            </p>

            <input
              value={accessCode}
              onChange={(e) => {
                setAccessCode(
                  e.target.value
                );

                setAccessError("");
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !checkingAccess
                ) {
                  openScorecard();
                }
              }}
              type="password"
              inputMode="numeric"
              autoFocus
              placeholder="Company code"
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
                focus:border-cyan-400
              "
            />

            {accessError && (
              <p className="text-red-400 text-sm font-black text-center mt-3">
                {accessError}
              </p>
            )}

            <button
              onClick={
                openScorecard
              }
              disabled={
                checkingAccess
              }
              className="
                w-full
                mt-4
                bg-cyan-400
                text-black
                rounded-2xl
                py-4
                font-black
                disabled:opacity-50
              "
            >
              {checkingAccess
                ? "CHECKING..."
                : "OPEN SCORECARD"}
            </button>

            <button
              onClick={() => {
                setSelectedTeam("");
                setAccessCode("");
                setAccessError("");
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

    </main>
  );
}
