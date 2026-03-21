"use client";

import { useEffect, useState } from "react";
import { db } from "@/src/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "@/src/lib/AuthContext";
import RequireAuth from "@/src/lib/RequireAuth";

type Voucher = {
  id: string;
  amount: number;
  provider: string;
  category: string;
  beneficiary: string;
  status: string;
};

export default function VouchersPage() {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "userVouchers", user.uid, "vouchers"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data: Voucher[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Voucher, "id">),
      }));

      setVouchers(data);
    });

    return () => unsub();
  }, [user]);

 return (
  <RequireAuth>
    <div className="relative min-h-screen text-white bg-black overflow-hidden">

      {/* BACKGROUND IMAGE (FULL FIT) */}
    <img
  src="/voucher_badger.png"
  alt="Voucher Background"
  className="absolute inset-0 w-full h-full object-contain opacity-80 brightness-110 contrast-110 pointer-events-none"
/>

<div className="absolute inset-0 bg-black/40" />

      <main className="relative z-10 w-full max-w-md mx-auto px-6 py-20">

        <style jsx>{`
  @keyframes neonPulse {
    0%, 100% {
      text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
      opacity: 1;
    }
    50% {
      text-shadow: 0 0 20px #FFD700, 0 0 40px #FFD700;
      opacity: 0.85;
    }
  }

  .neon-text {
    color: #FFD700;
    animation: neonPulse 2s infinite;
  }
`}</style>

<h1 className="text-3xl font-bold mb-6 text-center neon-text">
  My Vouchers
</h1>

{vouchers.length === 0 && (
  <p className="text-center neon-text">
    No vouchers yet
  </p>
)}
        <div className="flex flex-col gap-4">

          {vouchers
  .filter((v) => v.status === "active")
  .map((v) => (
            <div
              key={v.id}
              className="border border-white/20 rounded-xl p-4 bg-black/60 backdrop-blur-md"
            >
              <p><strong>Amount:</strong> {v.amount}</p>
              <p><strong>Provider:</strong> {v.provider}</p>
              <p><strong>Category:</strong> {v.category}</p>
              <p><strong>Beneficiary:</strong> {v.beneficiary}</p>

             <div className="flex items-center justify-between mt-2">
  <p className="text-green-400 font-semibold">
    Status: {v.status}
  </p>

  {v.status === "active" && (
    <button
      onClick={async () => {
        const { httpsCallable } = await import("firebase/functions");
        const { functions } = await import("@/src/lib/firebase");

        const useVoucher = httpsCallable(functions, "useVoucher");

        await useVoucher({ voucherId: v.id });
      }}
      className="px-3 py-1 rounded bg-yellow-400 text-black font-semibold hover:scale-105 transition"
    >
      USE
    </button>
  )}
</div>
            </div>
          ))}

        </div>

      </main>
    </div>
  </RequireAuth>
);
}