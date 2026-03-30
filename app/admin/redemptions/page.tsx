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
  category?: string;
  beneficiary?: string;
  status: string;
  createdAt?: any;
  name?: string;
};

export default function AdminRedemptions() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [qrUrls, setQrUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const ref = collection(db, "redemptionRequests");

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data: Request[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
          name: d.data().uid,
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

async function process(
  id: string,
  action: "approve" | "reject",
  mode: "code" | "qr" | "email"
) {
  const fn = httpsCallable(functions, "processRedemptionRequest");

  await fn({
    requestId: id,
    action,
    voucherCode: mode === "code" ? codes[id] || "" : "",
    qrUrl: mode === "qr" ? qrUrls[id] || "" : "",
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
                <p>
                  <b>User:</b> {r.name}
                </p>

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

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Voucher Code"
                  value={codes[r.id] || ""}
                  onChange={(e) =>
                    setCodes((prev) => ({
                      ...prev,
                      [r.id]: e.target.value,
                    }))
                  }
                  className="px-3 py-2 rounded bg-black border border-cyan-500/30 text-white"
                />

                <input
                  type="text"
                  placeholder="QR URL (optional)"
                  value={qrUrls[r.id] || ""}
                  onChange={(e) =>
                    setQrUrls((prev) => ({
                      ...prev,
                      [r.id]: e.target.value,
                    }))
                  }
                  className="px-3 py-2 rounded bg-black border border-cyan-500/30 text-white"
                />

                <div className="flex flex-col gap-2 mt-2">

  <button
    onClick={() => process(r.id, "approve", "code")}
    className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-400"
  >
    Approve (Code)
  </button>

  <button
    onClick={() => process(r.id, "approve", "qr")}
    className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-400"
  >
    Approve (QR)
  </button>

  <button
    onClick={() => process(r.id, "approve", "email")}
    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
  >
    Mark as Email Sent
  </button>

  <button
    onClick={() => process(r.id, "reject", "code")}
    className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"
  >
    Reject
  </button>

</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}