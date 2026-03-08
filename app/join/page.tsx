"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";

export default function JoinPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleJoin() {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!joinCode.trim()) {
      setError("Enter a join code");
      return;
    }

   try {
  setLoading(true);
  setError(null);

  const resolve = httpsCallable(functions, "resolveJoinCode");
  const accept = httpsCallable(functions, "acceptChallenge");

  const result: any = await resolve({
    joinCode: joinCode.trim().toUpperCase(),
  });

  const challengeId = result.data.challengeId;
  const status = result.data.status;

  if (status === "COMPLETED") {
    setError("Challenge already completed");
    return;
  }

  await accept({ challengeId });

  router.push(`/challenges/${challengeId}`);
} catch (e: any) {
  setError(e.message || "Failed to join challenge");
} finally {
  setLoading(false);
}
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col gap-4 border rounded p-6">
        <h1 className="text-xl font-semibold text-center">
          Join Challenge
        </h1>

        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Enter Join Code"
          className="border rounded p-2 text-center uppercase"
        />

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleJoin}
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join"}
        </button>
      </div>
    </main>
  );
}
