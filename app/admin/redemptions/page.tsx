"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/src/lib/firebase";

type Request = {
  id: string;
  uid: string;
  amount: number;
  type: string;
  provider?: string;
  status: string;
  createdAt?: any;
  name?: string;
};

export default function AdminRedemptions() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const ref = collection(db, "redemptionRequests");

    const unsub = onSnapshot(ref, async (snap) => {
      const data: Request[] = [];

      for (const d of snap.docs) {
        const r = d.data() as any;

        let name = r.uid;

        try {
          const profileSnap = await getDoc(doc(db, "profiles", r.uid));
          if (profileSnap.exists()) {
            const p = profileSnap.data();
            name = `${p.name || ""} ${p.surname || ""} (${p.battleName || ""})`;
          }
        } catch {}

        data.push({
          id: d.id,
          ...r,
          name,
        });
      }

      // 🔥 sort newest first
      data.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });

      setRequests(data);
    });

    return () => unsub();
  }, []);

  async function process(id: string, action: "approve" | "reject") {
    const fn = httpsCallable(functions, "processRedemptionRequest");

    await fn({
      requestId: id,
      action,
    });
  }

  // 🔥 totals
  const pendingTotal = requests
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-10 text-white bg-black min-h-screen">

      <h1 className="text-3xl mb-2">Redemption Requests</h1>

      <p className="mb-6 text-cyan-400">
        Pending Total: {pendingTotal} tokens
      </p>

      <div className="flex flex-col gap-4">

        {requests
          .filter((r) => r.status === "pending") // 🔥 only pending
          .map((r) => (

          <div
            key={r.id}
            className="p-4 border border-gray-700 rounded-lg flex justify-between items-center bg-zinc-900"
          >
            <div>
              <p><b>User:</b> {r.name}</p>
              <p><b>Amount:</b> {r.amount}</p>
              <p><b>Type:</b> {r.type}</p>
              <p><b>Provider:</b> {r.provider || "-"}</p>
              <p className="text-yellow-400"><b>Status:</b> {r.status}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => process(r.id, "approve")}
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-400"
              >
                Approve
              </button>

              <button
                onClick={() => process(r.id, "reject")}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"
              >
                Reject
              </button>
            </div>
          </div>

        ))}

      </div>
    </div>
  );
}