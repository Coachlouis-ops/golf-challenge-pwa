"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/src/lib/firebase";

type Request = {
  id: string;
  uid: string;
  amount: number;
  type: string;
  provider?: string;
  status: string;
};

export default function AdminRedemptions() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const ref = collection(db, "redemptionRequests");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));

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

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl mb-6">Redemption Requests</h1>

      <div className="flex flex-col gap-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="p-4 border border-gray-700 rounded-lg flex justify-between items-center"
          >
            <div>
              <p><b>User:</b> {r.uid}</p>
              <p><b>Amount:</b> {r.amount}</p>
              <p><b>Type:</b> {r.type}</p>
              <p><b>Status:</b> {r.status}</p>
            </div>

            {r.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => process(r.id, "approve")}
                  className="bg-green-500 px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => process(r.id, "reject")}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}