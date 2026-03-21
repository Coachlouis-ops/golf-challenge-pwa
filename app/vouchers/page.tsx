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
        ...doc.data(),
      })) as Voucher[];

      setVouchers(data);
    });

    return () => unsub();
  }, [user]);

  return (
    <RequireAuth>
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>
          My Vouchers
        </h1>

        {vouchers.length === 0 && (
          <p>No vouchers yet</p>
        )}

        {vouchers.map((v) => (
          <div
            key={v.id}
            style={{
              border: "1px solid #0ff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              background: "#0b0b0b",
            }}
          >
            <p><strong>Amount:</strong> {v.amount}</p>
            <p><strong>Provider:</strong> {v.provider}</p>
            <p><strong>Category:</strong> {v.category}</p>
            <p><strong>Beneficiary:</strong> {v.beneficiary}</p>
            <p style={{ color: "#0ff" }}>
              <strong>Status:</strong> {v.status}
            </p>
          </div>
        ))}
      </div>
    </RequireAuth>
  );
}