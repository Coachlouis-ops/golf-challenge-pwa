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
      <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-black">

        {/* BACKGROUND IMAGE */}
        <img
          src="/voucher_badger.png"
          alt="Voucher Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* ARENA LIGHT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[420px] bg-yellow-400 opacity-20 blur-[140px] animate-pulse pointer-events-none" />

        {/* FLOOR GLOW */}
        <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-yellow-500/10 to-transparent blur-[40px]" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#FFD700_1px,transparent_1px)] bg-[size:40px_40px]" />

        <main className="relative z-10 w-full max-w-md px-6">

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
                className="border border-yellow-400/40 rounded-xl p-4 bg-black/70 backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.3)]"
              >
                <p><strong>Amount:</strong> {v.amount}</p>
                <p><strong>Provider:</strong> {v.provider}</p>
                <p><strong>Category:</strong> {v.category}</p>
                <p><strong>Beneficiary:</strong> {v.beneficiary}</p>

                <p className="text-yellow-400 font-semibold">
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