"use client";

import { httpsCallable } from "firebase/functions";
import { functions, db } from "@/src/lib/firebase";
import { useEffect, useState } from "react";
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
  voucherCode?: string;
  qrUrl?: string;
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

        {/* BACKGROUND */}
        <img
          src="/voucher_badger.png"
          alt="Voucher Background"
          className="absolute inset-0 w-full h-full object-contain opacity-80 brightness-110 contrast-110 pointer-events-none"
        />

        <div className="absolute inset-0 bg-black/40" />

        <main className="relative z-10 w-full max-w-md mx-auto px-6 py-20 flex flex-col items-center">

          <style jsx>{`
            @keyframes neonPulseYellow {
              0%, 100% {
                text-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00;
                opacity: 1;
              }
              50% {
                text-shadow: 0 0 25px #ffff00, 0 0 50px #ffff00;
                opacity: 0.85;
              }
            }

            .neon-yellow {
              color: #ffff00;
              animation: neonPulseYellow 2s infinite;
            }
          `}</style>

          {/* HEADING */}
          <h1 className="text-3xl font-bold mb-4 text-center neon-yellow">
            My Vouchers
          </h1>

          {/* LOGO BELOW HEADING */}
          <img
            src="/voucher_badger.png"
            alt="Voucher Logo"
            className="w-40 mb-6 opacity-90"
          />

          {vouchers.length === 0 && (
            <p className="text-center neon-yellow">
              No vouchers yet
            </p>
          )}

          {/* VOUCHERS LIST */}
          <div className="flex flex-col gap-4 w-full">

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

                  {v.voucherCode && (
                    <div className="mt-3 p-2 border border-yellow-400/40 rounded bg-black/70">
                      <p className="text-yellow-400 text-sm">Voucher Code</p>
                      <p className="text-lg font-bold tracking-wider text-yellow-300">
                        {v.voucherCode}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-green-400 font-semibold">
                      Status: {v.status}
                    </p>

                    {v.status === "active" && (
                      <button
                        onClick={async () => {
                          try {
                            const useVoucher = httpsCallable(functions, "useVoucher");
                            await useVoucher({ voucherId: v.id });
                          } catch (err) {
                            console.error("USE ERROR:", err);
                          }
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