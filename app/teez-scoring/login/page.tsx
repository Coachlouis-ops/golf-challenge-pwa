"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/src/lib/firebase";

export default function ScoringLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login() {

    if (!email || !password) {
      alert("Complete all fields");
      return;
    }

    try {

      setLoading(true);

      const userCred =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid = userCred.user.uid;

      const ref = doc(
        db,
        "scoringClubs",
        uid
      );

      const snap = await getDoc(ref);

      if (!snap.exists()) {

        alert(
          "Not a scoring club account"
        );

        return;
      }

      const data = snap.data();

      if (!data.active) {

        alert(
          "Club account disabled"
        );

        return;
      }

   console.log("LOGIN SUCCESS");

window.location.href = "/teez-scoring";

    } catch (err: any) {

      console.error(err);

      alert(err.message);

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-neutral-900 border border-green-400/20 rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-green-400 mb-3">
          TEEZ GOLF SCORING
        </h1>

        <p className="text-gray-400 mb-10">
          Club Login Portal
        </p>

        <div className="space-y-6">

          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Club Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                bg-black
                border border-white/10
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

          <div>

            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                bg-black
                border border-white/10
                rounded-xl
                px-4
                py-3
              "
            />

          </div>

          <button
            onClick={login}
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
              ? "LOGGING IN..."
              : "LOGIN"}
          </button>

        </div>

      </div>

    </main>
  );
}