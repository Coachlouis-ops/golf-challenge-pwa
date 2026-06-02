"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "@/src/lib/firebase";

export default function RegisterTvPage() {

  const router = useRouter();

  const [deviceName, setDeviceName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

 async function registerTv() {

  try {

    setLoading(true);

    const createTvDevice =
      httpsCallable(
        functions,
        "createTvDevice"
      );

    await createTvDevice({

      deviceName,

      email,

      password,

      clubId: "defaultClub",

    });

    alert(
      "TV device registered"
    );

    router.push(
      "/teez-scoring"
    );

  } catch (e: any) {

    console.error(e);

    alert(
      e.message ||
      "Failed to register TV"
    );

  } finally {

    setLoading(false);

  }
}
  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-black text-orange-400 mb-4">
          REGISTER TV DEVICE
        </h1>

        <p className="text-gray-400 mb-12">
          Register external leaderboard
          display units.
        </p>

        <div className="space-y-6">

          <input
            value={deviceName}
            onChange={(e) =>
              setDeviceName(
                e.target.value
              )
            }
            placeholder="Device Name"
            className="
              w-full
              bg-neutral-900
              border border-white/10
              rounded-2xl
              px-6
              py-5
              text-xl
            "
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="TV Login Email"
            className="
              w-full
              bg-neutral-900
              border border-white/10
              rounded-2xl
              px-6
              py-5
              text-xl
            "
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="TV Password"
            className="
              w-full
              bg-neutral-900
              border border-white/10
              rounded-2xl
              px-6
              py-5
              text-xl
            "
          />

          <button
            onClick={registerTv}
            disabled={loading}
            className="
              w-full
              bg-orange-400
              text-black
              py-5
              rounded-2xl
              font-black
              text-2xl
              hover:scale-[1.02]
              transition
            "
          >
            {loading
              ? "REGISTERING..."
              : "REGISTER TV DEVICE"}
          </button>

        </div>

      </div>

    </main>

  );
}