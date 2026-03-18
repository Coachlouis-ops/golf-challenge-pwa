"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSecurityPage() {
  const router = useRouter();

  const [q1, setQ1] = useState("");

  function verify() {
    if (q1 === "taBo") {
      router.push("/admin");
    } else {
      alert("Incorrect answer");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Admin Verification</h1>

      <p className="text-lg">
        What is the name of the 1st dog you owned?
      </p>

      <input
        placeholder="Enter answer exactly"
        value={q1}
        onChange={(e) => setQ1(e.target.value)}
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