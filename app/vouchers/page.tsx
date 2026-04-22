"use client";

import { httpsCallable } from "firebase/functions";
import { functions, db } from "@/src/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  deliveryMethod?: "code" | "qr" | "email";
  emailSentTo?: string;
  emailSentAt?: any;
};

export default function VouchersPage() {
  const { user } = useAuth();
  const router = useRouter();
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
      <div className="min-h-screen text-white bg-black">

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

        {/* HERO BANNER */}
        <div className="w-full bg-black flex items-center justify-center py-4">
  <img
    src="/voucher_badger.png"
    alt="Voucher Banner"
    className="w-full max-w-md h-auto object-contain"
  />
</div>

        <main className="w-full max-w-md mx-auto px-6 py-10">

       {/* HEADER */}
<div className="flex items-center justify-between mb-6">
  <button
    onClick={() => router.push("/app")}
    className="px-3 py-1 rounded border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
  >
    ← Dashboard
  </button>

  <h1 className="text-2xl font-bold neon-yellow">
    My Vouchers
  </h1>

  <div className="w-[90px]" /> {/* spacer to balance layout */}
</div>
          {vouchers.length === 0 && (
            <p className="text-center neon-yellow">
              No vouchers yet
            </p>
          )}

          {/* VOUCHER LIST */}
          <div className="flex flex-col gap-4">

            {vouchers
              .filter((v) => v.status === "active")
              .map((v) => (
                <div
                  key={v.id}
                  className="border border-yellow-400/40 rounded-xl p-4 bg-black/70 backdrop-blur-md"
                >
                  <p className="text-yellow-300"><strong>Amount:</strong> {v.amount}</p>
                  <p className="text-yellow-300"><strong>Provider:</strong> {v.provider}</p>
                  <p className="text-yellow-300"><strong>Category:</strong> {v.category}</p>
                  <p className="text-yellow-300"><strong>Beneficiary:</strong> {v.beneficiary}</p>

                  {v.voucherCode && (
                    <div className="mt-3 p-2 border border-yellow-400 rounded bg-black">
                      <p className="text-yellow-400 text-sm">Voucher Code</p>
                      <p className="text-lg font-bold tracking-wider text-yellow-300">
                        {v.voucherCode}
                      </p>
                    </div>
                  )}
{v.deliveryMethod === "email" && v.emailSentTo && (
  <div className="mt-3 p-2 border border-yellow-400 rounded bg-black">
    <p className="text-yellow-400 text-sm">Voucher Sent via Email</p>
    <p className="text-lg font-bold text-yellow-300">
      {v.emailSentTo}
    </p>

    {v.emailSentAt && (
      <p className="text-xs text-yellow-500 mt-1">
        Sent at: {new Date(v.emailSentAt.seconds * 1000).toLocaleString()}
      </p>
    )}
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