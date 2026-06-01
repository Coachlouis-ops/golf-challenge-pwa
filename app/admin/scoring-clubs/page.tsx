"use client";

import { useState } from "react";

import { httpsCallable } from "firebase/functions";

import {
  functions,
} from "@/src/lib/firebase";

export default function ScoringClubsPage() {

  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function createClub() {

    if (!clubName || !email || !password) {
      alert("Complete all fields");
      return;
    }

    try {

      setLoading(true);

      const createScoringClub =
        httpsCallable(
          functions,
          "createScoringClub"
        );

      await createScoringClub({
        clubName,
        email,
        password,
      });

      alert("Scoring club created successfully");

      setClubName("");
      setEmail("");
      setPassword("");

    } catch (err: any) {

      console.error(err);

      alert(err.message);

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold text-green-400 mb-10">
          TEEZ SCORING CLUBS
        </h1>

        <div className="bg-neutral-900 border border-green-400/20 rounded-3xl p-8 space-y-6">

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Club Name
            </label>

            <input
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Club Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Temporary Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={createClub}
            disabled={loading}
            className="
              w-full
              bg-green-400
              text-black
              font-bold
              py-4
              rounded-2xl
              shadow-[0_0_25px_rgba(34,197,94,0.7)]
              hover:scale-[1.01]
              transition-all
            "
          >
            {loading
              ? "CREATING..."
              : "CREATE SCORING CLUB"}
          </button>

        </div>

      </div>

    </main>
  );
}