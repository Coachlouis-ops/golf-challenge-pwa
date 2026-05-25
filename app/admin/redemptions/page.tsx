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
  status: string;
  createdAt?: any;

  name?: string;
  surname?: string;
  battleName?: string;
  email?: string;
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

const pendingRequests =
  requests.filter((r) => r.status === "pending");

const cashRequests =
  pendingRequests.filter(
    (r) => r.category === "CASH"
  );

const voucherRequests =
  pendingRequests.filter(
    (r) => r.category !== "CASH"
  );

const highValueRequests =
  pendingRequests.filter(
    (r) => r.amount >= 100
  );


  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl mb-2">Redemption Requests</h1>

     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
    <div className="text-xs text-cyan-300 tracking-wider">
      PENDING REQUESTS
    </div>

    <div className="text-3xl font-extrabold text-white mt-2">
      {pendingRequests.length}
    </div>
  </div>

  <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4">
    <div className="text-xs text-green-300 tracking-wider">
      PENDING TOKENS
    </div>

    <div className="text-3xl font-extrabold text-white mt-2">
      {pendingTotal}
    </div>
  </div>

  <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4">
    <div className="text-xs text-yellow-300 tracking-wider">
      VOUCHER REQUESTS
    </div>

    <div className="text-3xl font-extrabold text-white mt-2">
      {voucherRequests.length}
    </div>
  </div>

  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
    <div className="text-xs text-red-300 tracking-wider">
      HIGH VALUE
    </div>

    <div className="text-3xl font-extrabold text-white mt-2">
      {highValueRequests.length}
    </div>
  </div>

</div>

<div className="mb-6 border border-cyan-400/20 bg-cyan-500/5 rounded-2xl p-4">

  <div className="text-cyan-300 font-bold tracking-[0.25em] text-sm mb-3">
    ADMIN OPERATIONS GUIDE
  </div>

  <div className="text-sm text-gray-300 leading-relaxed flex flex-col gap-2">

    <p>
      • Review pending redemption requests in live time.
    </p>

    <p>
      • High value requests should be manually verified before approval.
    </p>

    <p>
      • CASH category requests may impact amateur status depending on governing body rules.
    </p>

    <p>
      • Voucher and retail rewards are generally safer for amateur divisions.
    </p>

    <p>
      • QR approvals should contain valid redeemable links before processing.
    </p>

  </div>

</div>

      <div className="flex flex-col gap-4">
        {requests
          .filter((r) => r.status === "pending")
          .map((r) => (
            <div
              key={r.id}
              className="
  p-6 rounded-3xl
  border border-cyan-400/20
  bg-gradient-to-br from-zinc-900 to-black
  shadow-[0_0_35px_rgba(34,211,238,0.12)]
  flex flex-col xl:flex-row
  justify-between gap-6
"
            >
              <div className="space-y-2">


              <div className="flex items-center gap-2 flex-wrap mb-2">

  <div className="
    px-3 py-1 rounded-full
    bg-cyan-500/20 border border-cyan-400/20
    text-cyan-300 text-xs font-bold
  ">
    {r.category || "UNCATEGORIZED"}
  </div>

  <div className="
    px-3 py-1 rounded-full
    bg-purple-500/20 border border-purple-400/20
    text-purple-300 text-xs font-bold
  ">
    {r.provider || "NO PROVIDER"}
  </div>

</div>

                <p>
                  <b>User:</b> {r.uid}
                </p>

                <p>
                  <b>Name:</b> {r.name || "-"}
                </p>

                <p>
                  <b>Surname:</b> {r.surname || "-"}
                </p>

                <p>
                  <b>BattleName:</b> {r.battleName || "-"}
                </p>

                <p>
                  <b>Email:</b> {r.email || "-"}
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

                <div className="flex flex-wrap gap-2 pt-2">

  <span className="
    px-3 py-1 rounded-full text-xs font-bold
    bg-yellow-500/20 text-yellow-300 border border-yellow-400/20
  ">
    STATUS: {r.status.toUpperCase()}
  </span>

  {r.category === "CASH" && (
    <span className="
      px-3 py-1 rounded-full text-xs font-bold
      bg-red-500/20 text-red-300 border border-red-400/20
    ">
      CASH REWARD
    </span>
  )}

  {r.amount >= 100 && (
    <span className="
      px-3 py-1 rounded-full text-xs font-bold
      bg-orange-500/20 text-orange-300 border border-orange-400/20
    ">
      HIGH VALUE
    </span>
  )}

  {r.category !== "CASH" && (
    <span className="
      px-3 py-1 rounded-full text-xs font-bold
      bg-green-500/20 text-green-300 border border-green-400/20
    ">
      VOUCHER SAFE
    </span>
  )}

</div>

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

        <div className="flex flex-col gap-3 mt-4">

  <div className="grid grid-cols-1 gap-2">

    <button
      onClick={() => process(r.id, "approve", "code")}
      className="
        bg-cyan-500 text-black
        px-4 py-3 rounded-2xl
        font-extrabold tracking-wide
        hover:bg-cyan-400
        hover:scale-[1.02]
        shadow-[0_0_25px_rgba(34,211,238,0.45)]
        transition-all
      "
    >
      APPROVE WITH CODE
    </button>

    <button
      onClick={() => process(r.id, "approve", "qr")}
      className="
        bg-purple-500 text-white
        px-4 py-3 rounded-2xl
        font-bold tracking-wide
        hover:bg-purple-400
        hover:scale-[1.02]
        shadow-[0_0_25px_rgba(168,85,247,0.35)]
        transition-all
      "
    >
      APPROVE WITH QR
    </button>

    <button
      onClick={() => process(r.id, "approve", "email")}
      className="
        bg-yellow-400 text-black
        px-4 py-3 rounded-2xl
        font-bold tracking-wide
        hover:bg-yellow-300
        hover:scale-[1.02]
        shadow-[0_0_25px_rgba(250,204,21,0.35)]
        transition-all
      "
    >
      MARK EMAIL SENT
    </button>

  </div>

  <div className="pt-2 border-t border-red-400/10">

    <button
      onClick={() => process(r.id, "reject", "code")}
      className="
        w-full bg-red-500
        text-white px-4 py-3 rounded-2xl
        font-bold tracking-wide
        hover:bg-red-400
        hover:scale-[1.02]
        shadow-[0_0_25px_rgba(239,68,68,0.35)]
        transition-all
      "
    >
      REJECT REQUEST
    </button>

  </div>

</div>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}