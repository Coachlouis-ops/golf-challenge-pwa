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
  category?: string;
  beneficiary?: string;
  status: string;
  createdAt?: any;
  name?: string;
};

export default function AdminRedemptions() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
  const ref = collection(db, "redemptionRequests");

  const unsub = onSnapshot(
    ref,
    (snap) => {
      const data: Request[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
        name: d.data().uid, // temporary fallback
      }));

      data.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });

      setRequests(data);
    },
    (error) => {
      console.error("SNAPSHOT ERROR:", error);
    }
  );

  return () => unsub();
}, []);

  async function process(id: string, action: "approve" | "reject") {
    const fn = httpsCallable(functions, "processRedemptionRequest");

    await fn({
      requestId: id,
      action,
    });
  }

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
          .filter((r) => r.status === "pending")
          .map((r) => (

          <div
            key={r.id}
            className="p-5 border border-cyan-500/30 rounded-xl bg-zinc-900 flex justify-between items-center"
          >
            <div className="space-y-1">

              <p><b>User:</b> {r.name}</p>

              <p className="text-lg">
                <b>Amount:</b> {r.amount} tokens
              </p>

              <p>
                <b>Category:</b> {r.category || "-"}
              </p>

              <p>
                <b>Supplier:</b> {r.provider || "-"}
              </p>

              <p>
                <b>Beneficiary:</b> {r.beneficiary || "-"}
              </p>

              <p className="text-yellow-400">
                <b>Status:</b> {r.status}
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => process(r.id, "approve")}
                className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-400"
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