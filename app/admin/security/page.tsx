"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSecurityPage() {
  const router = useRouter();

  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");

  function verify() {
    if (q1 === "badger" && q2 === "golf") {
      router.push("/admin");
    } else {
      alert("Incorrect answers");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Admin Verification</h1>

      <input
        placeholder="Security Answer 1"
        value={q1}
        onChange={(e) => setQ1(e.target.value)}
        className="px-4 py-2 text-black rounded"
      />

      <input
        placeholder="Security Answer 2"
        value={q2}
        onChange={(e) => setQ2(e.target.value)}
        className="px-4 py-2 text-black rounded"
      />

      <button
        onClick={verify}
        className="bg-green-500 px-6 py-2 rounded text-black font-bold"
      >
        Verify
      </button>
    </div>
  );
}