"use client";

import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/src/lib/firebase";
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";

export default function SeedJK6Page() {
  const { teezAlert } = useTeezNotification();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function seedJK6() {
    try {
      setLoading(true);
      setResult("");

      const seedJK6GolfDay =
        httpsCallable(functions, "seedJK6GolfDay");

      const response =
        await seedJK6GolfDay();

      setResult(
        JSON.stringify(response.data, null, 2)
      );

   await teezAlert({
  message: "JK6 Golfday seeded successfully.",
  type: "success",
});
    } catch (error: any) {
      console.error(error);
     await teezAlert({
  message: error.message || "Seed failed.",
  type: "error",
});
      alert(error.message || "Seed failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-black text-red-500 mb-4">
          Seed JK6 Golfday
        </h1>

        <p className="text-gray-400 mb-6">
          This creates golfdays / jk6-2026 / participants in Firestore.
        </p>

        <button
          onClick={seedJK6}
          disabled={loading}
          className="w-full bg-red-600 text-white rounded-2xl py-4 font-black disabled:opacity-50"
        >
          {loading ? "SEEDING..." : "SEED JK6 GOLFDAY"}
        </button>

        {result && (
          <pre className="mt-6 bg-neutral-900 border border-white/10 rounded-2xl p-4 text-xs overflow-x-auto">
            {result}
          </pre>
        )}
      </div>
    </main>
  );
}