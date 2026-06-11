"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";

type MembershipPayment = {
  id: string;
  userId: string;
  email: string;
  amount: number;
  reference: string;
  selectedBank: string;
  status: string;
  paymentType: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const [payments, setPayments] = useState<MembershipPayment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    loadMembershipPayments();
  }, []);

  async function loadMembershipPayments() {
    try {
      setLoadingPayments(true);

      const q = query(
        collection(db, "membershipPayments"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const rows = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MembershipPayment, "id">),
      }));

      setPayments(rows);
    } catch (e) {
      console.log("LOAD MEMBERSHIP PAYMENTS ERROR:", e);
    } finally {
      setLoadingPayments(false);
    }
  }

  async function approvePayment(payment: MembershipPayment) {
    if (!confirm(`Approve membership payment for ${payment.email}?`)) return;

    try {
      await updateDoc(doc(db, "membershipPayments", payment.id), {
        status: "approved",
        approvedAt: serverTimestamp(),
        approvedBy: user?.uid || "admin",
        updatedAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "users", payment.userId), {
        membershipStatus: "approved",
        canCreateProfile: true,
        membershipApprovedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await loadMembershipPayments();

      alert("Membership approved");
    } catch (e: any) {
      console.log("APPROVE PAYMENT ERROR:", e);
      alert(e.message || "Could not approve payment");
    }
  }

  async function deletePayment(payment: MembershipPayment) {
    if (!confirm(`Delete payment application for ${payment.email}?`)) return;

    try {
      await deleteDoc(doc(db, "membershipPayments", payment.id));

      await loadMembershipPayments();

      alert("Payment application deleted");
    } catch (e: any) {
      console.log("DELETE PAYMENT ERROR:", e);
      alert(e.message || "Could not delete payment application");
    }
  }

  function contactApplicant(payment: MembershipPayment) {
    window.location.href = `mailto:${payment.email}?subject=Teez Golf Membership Payment&body=Hi,%0D%0A%0D%0AWe are contacting you about your Teez Golf membership payment.%0D%0A%0D%0AReference: ${payment.reference}%0D%0AAmount: R${payment.amount}%0D%0ABank selected: ${payment.selectedBank}%0D%0A%0D%0ARegards,%0D%0ATeez Golf Admin`;
  }

  return (
    <div className="min-h-screen relative text-white flex flex-col items-center overflow-hidden px-4 py-10">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/logo.png')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#00f0ff]">
          ADMIN DASHBOARD
        </h1>

        <button
          onClick={() => router.push("/admin/redemptions")}
          className="w-[320px] px-10 py-4 text-lg font-bold rounded-xl bg-cyan-400 text-black 
          shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_40px_#00f0ff] 
          animate-pulse transition-all duration-300"
        >
          TOKEN REDEMPTION REQUESTS
        </button>

        <button
          onClick={() => router.push("/admin/scoring-clubs")}
          className="w-[320px] px-10 py-4 text-lg font-bold rounded-xl bg-green-400 text-black 
          shadow-[0_0_20px_rgba(34,197,94,0.8)] 
          hover:shadow-[0_0_40px_rgba(34,197,94,1)] 
          animate-pulse transition-all duration-300"
        >
          TEEZ SCORING CLUBS
        </button>

        {/* MEMBERSHIP PAYMENT APPLICATIONS */}
        <div className="w-full mt-8 bg-black/70 border border-cyan-400/40 rounded-2xl p-5">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            MEMBERSHIP PAYMENT APPLICATIONS
          </h2>

          {loadingPayments ? (
            <p className="text-gray-400">Loading payment applications...</p>
          ) : payments.length === 0 ? (
            <p className="text-gray-400">No payment applications found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="font-semibold break-all">{payment.email}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Reference</p>
                      <p className="font-semibold">{payment.reference}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Amount</p>
                      <p className="font-semibold">R{payment.amount}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Bank</p>
                      <p className="font-semibold">{payment.selectedBank}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Status</p>
                      <p
                        className={`font-semibold ${
                          payment.status === "approved"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {payment.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <button
                      onClick={() => approvePayment(payment)}
                      disabled={payment.status === "approved"}
                      className={`px-4 py-2 rounded-lg font-semibold text-black ${
                        payment.status === "approved"
                          ? "bg-gray-600 text-gray-300"
                          : "bg-green-500 hover:bg-green-400"
                      }`}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => contactApplicant(payment)}
                      className="px-4 py-2 rounded-lg font-semibold bg-cyan-400 text-black hover:bg-cyan-300"
                    >
                      Contact
                    </button>

                    <button
                      onClick={() => deletePayment(payment)}
                      className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}