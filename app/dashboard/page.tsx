"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

function DashboardContent() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState("unpaid");
  const [canCreateProfile, setCanCreateProfile] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    checkUserAccess();
  }, [user, loading]);

  async function checkUserAccess() {
    if (!user) return;

    try {
      setCheckingAccess(true);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      const status = userSnap.exists()
        ? userSnap.get("membershipStatus") || "unpaid"
        : "unpaid";

      const profileAllowed = userSnap.exists()
        ? userSnap.get("canCreateProfile") === true
        : false;

      const profileRef = doc(db, "profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      setMembershipStatus(status);
      setCanCreateProfile(profileAllowed);
      setProfileExists(profileSnap.exists());
    } catch (e) {
      console.log("DASHBOARD ACCESS CHECK ERROR:", e);
    } finally {
      setCheckingAccess(false);
    }
  }

  if (loading || checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // -----------------------------------
  // PAYMENT PENDING SCREEN
  // -----------------------------------
  if (membershipStatus !== "approved") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-zinc-900 border border-yellow-500/40 rounded-2xl p-6 space-y-6 text-center">
          <h1 className="text-3xl font-bold text-yellow-400">
            Payment Pending
          </h1>

          <p className="text-gray-300">
            Your membership is waiting for admin approval.
          </p>

          <div className="bg-black/40 border border-zinc-700 rounded-xl p-4 text-left text-sm space-y-3">
            <p>
              After you make your EFT payment, admin will verify the payment in
              the Honey Badger Technologies bank account.
            </p>

            <p>
              Once approved, your profile creation will be unlocked.
            </p>
          </div>

          <button
            onClick={() => router.push("/payment")}
            className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold"
          >
            View Payment Details
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full text-sm text-gray-400 underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------
  // APPROVED BUT NO PROFILE YET
  // -----------------------------------
  if (canCreateProfile && !profileExists) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-zinc-900 border border-green-500/40 rounded-2xl p-6 space-y-6 text-center">
          <h1 className="text-3xl font-bold text-green-400">
            Membership Approved
          </h1>

          <p className="text-gray-300">
            Your payment has been approved. You can now create your player profile.
          </p>

          <button
            onClick={() => router.push("/create-profile")}
            className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------
  // NORMAL PLAYER DASHBOARD
  // -----------------------------------
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      <Image
        src="/vs_energy1.png"
        alt="Background"
        fill
        priority
        className="object-cover opacity-50 animate-pulse"
      />

      <div className="absolute inset-0 bg-black/60" />

      <main className="relative z-10 w-full max-w-md mx-auto px-6 pb-10">
        <div className="w-full h-[260px] relative mb-6">
          <Image
            src="/vs_energy.png"
            alt="Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-[15px] tracking-[2px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-400 drop-shadow-[0_0_12px_rgba(200,200,200,0.9)]">
            SETTLE THE SCORE. PLAY WITH PURPOSE
          </p>

          <style jsx>{`
            .arena-btn {
              width: 100%;
              height: 52px;
              border-radius: 14px;
              font-weight: 600;
              letter-spacing: 1px;
              background: linear-gradient(145deg, #d9d9d9, #7a7a7a);
              color: black;
              box-shadow:
                0 0 15px rgba(255, 255, 255, 0.6),
                0 0 30px rgba(200, 200, 200, 0.4),
                inset 0 0 6px rgba(255, 255, 255, 0.7);
              transition: all 0.2s ease;
            }

            .arena-btn:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow:
                0 0 25px rgba(255, 255, 255, 0.9),
                0 0 40px rgba(220, 220, 220, 0.6),
                inset 0 0 10px rgba(255, 255, 255, 0.9);
            }

            .arena-btn:active {
              transform: scale(0.97);
            }
          `}</style>

          <button
            onClick={() => router.push("/challenges/create")}
            className="arena-btn"
          >
            CREATE CHALLENGE
          </button>

          <button
            onClick={() => router.push("/my-challenges")}
            className="arena-btn"
          >
            MY CHALLENGES
          </button>

          <button
            onClick={() => router.push("/my-invites")}
            className="arena-btn"
          >
            MY INVITES
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="arena-btn"
          >
            MY PROFILE
          </button>

          <button
            onClick={() => router.push("/wallet")}
            className="arena-btn"
          >
            WALLET
          </button>

          <button
            onClick={() => router.push("/vouchers")}
            className="arena-btn"
          >
            MY VOUCHERS
          </button>

          <button
            onClick={() => router.push("/")}
            className="text-xs tracking-widest text-gray-400 underline mt-2 hover:text-white"
          >
            BACK TO HOME
          </button>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}