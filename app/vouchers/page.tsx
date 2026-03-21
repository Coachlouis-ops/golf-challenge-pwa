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
        className="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none"
      />

      {/* DARK OVERLAY (for readability) */}
      <div className="absolute inset-0 bg-black/70" />

      <main className="relative z-10 w-full max-w-md mx-auto px-6 py-20">

        <h1 className="text-3xl font-bold mb-6 text-center">
          My Vouchers
        </h1>

        {vouchers.length === 0 && (
          <p className="text-center text-gray-400">
            No vouchers yet
          </p>
        )}

        <div className="flex flex-col gap-4">

          {vouchers.map((v) => (
            <div
              key={v.id}
              className="border border-white/20 rounded-xl p-4 bg-black/60 backdrop-blur-md"
            >
              <p><strong>Amount:</strong> {v.amount}</p>
              <p><strong>Provider:</strong> {v.provider}</p>
              <p><strong>Category:</strong> {v.category}</p>
              <p><strong>Beneficiary:</strong> {v.beneficiary}</p>

              <p className="text-green-400 font-semibold">
                Status: {v.status}
              </p>
            </div>
          ))}

        </div>

      </main>
    </div>
  </RequireAuth>
);
}