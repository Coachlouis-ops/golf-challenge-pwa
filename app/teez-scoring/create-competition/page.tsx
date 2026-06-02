"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/src/lib/firebase";

export default function CreateCompetitionPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [competitionName, setCompetitionName] =
    useState("");

  const [competitionDate, setCompetitionDate] =
    useState("");

  const [format, setFormat] =
    useState("Stroke Play");

  const [playerConfig, setPlayerConfig] =
    useState("Singles");

  const [divisionStructure, setDivisionStructure] =
    useState("No Divisions");

  async function createCompetition() {

    if (
      !competitionName ||
      !competitionDate
    ) {
      alert("Complete all fields");
      return;
    }

    try {

      setLoading(true);

      const docRef = await addDoc(
        collection(db, "competitions"),
        {
          competitionName,
          competitionDate,

          format,

          playerConfiguration:
            playerConfig,

          divisionStructure,

          status: "active",

          createdAt:
            serverTimestamp(),
        }
      );

      router.push(
        `/teez-scoring/competition/${docRef.id}`
      );

    } catch (e: any) {

      console.error(e);

      alert(
        e.message ||
        "Failed to create competition"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-4xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-3">
            CREATE COMPETITION
          </h1>

          <p className="text-gray-400">
            Setup new golf competition
          </p>

        </div>

        <div className="grid gap-6">

          {/* NAME */}

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Competition Name
            </label>

            <input
              type="text"
              value={competitionName}
              onChange={(e) =>
                setCompetitionName(
                  e.target.value
                )
              }
              className="
                w-full
                bg-neutral-900
                border border-white/10
                rounded-2xl
                px-4
                py-4
              "
            />

          </div>

          {/* DATE */}

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Competition Date
            </label>

            <input
              type="date"
              value={competitionDate}
              onChange={(e) =>
                setCompetitionDate(
                  e.target.value
                )
              }
              className="
                w-full
                bg-neutral-900
                border border-white/10
                rounded-2xl
                px-4
                py-4
              "
            />

          </div>

          {/* FORMAT */}

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Competition Format
            </label>

            <select
              value={format}
              onChange={(e) =>
                setFormat(
                  e.target.value
                )
              }
              className="
                w-full
                bg-neutral-900
                border border-white/10
                rounded-2xl
                px-4
                py-4
              "
            >

              <option>Stroke Play</option>
              <option>Stableford</option>
              <option>IPS</option>
              <option>Matchplay</option>
              <option>Scramble</option>
              <option>Betterball</option>
              <option>Fourball Alliance</option>

            </select>

          </div>

          {/* PLAYER CONFIG */}

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Player Configuration
            </label>

            <select
              value={playerConfig}
              onChange={(e) =>
                setPlayerConfig(
                  e.target.value
                )
              }
              className="
                w-full
                bg-neutral-900
                border border-white/10
                rounded-2xl
                px-4
                py-4
              "
            >

              <option>Singles</option>
              <option>Doubles</option>
              <option>Foursomes</option>

            </select>

          </div>

          {/* DIVISIONS */}

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Division Structure
            </label>

            <select
              value={divisionStructure}
              onChange={(e) =>
                setDivisionStructure(
                  e.target.value
                )
              }
              className="
                w-full
                bg-neutral-900
                border border-white/10
                rounded-2xl
                px-4
                py-4
              "
            >

              <option>No Divisions</option>
              <option>A Division</option>
              <option>A + B Division</option>
              
              <option>
                A + B + C + Ladies
              </option>
<option>Ladies</option>

            </select>

          </div>

          {/* BUTTON */}

          <button
            onClick={createCompetition}
            disabled={loading}
            className="
              mt-6
              bg-green-400
              text-black
              font-bold
              py-5
              rounded-3xl
              shadow-[0_0_30px_rgba(34,197,94,0.7)]
              hover:scale-[1.01]
              transition-all
            "
          >

            {loading
              ? "CREATING..."
              : "CREATE COMPETITION"}

          </button>

        </div>

      </div>

    </main>

  );
}