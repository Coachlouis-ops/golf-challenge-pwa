"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import MembershipGuard from "@/src/components/MembershipGuard";
import { useEffect } from "react";

function DashboardContent() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // ------------------------------
  // FIX: HANDLE PAYFAST RETURN STATE
  // ------------------------------
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const paymentUid = params.get("uid");

  if (!paymentUid) return;
  if (!user) return;

  console.log("RETURN UID:", paymentUid);
  console.log("AUTH UID:", user.uid);

  // 🚨 CRITICAL: enforce correct user
  if (user.uid !== paymentUid) {
    console.log("UID mismatch → forcing correct session");

    // hard reset to login so correct user is restored
    window.location.href = "/login";
    return;
  }

  // ✅ correct user → clean URL (no reload loop)
  window.history.replaceState({}, "", "/dashboard");
}, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">

      {/* NEW BACKGROUND */}
      <Image
        src="/vs_energy1.png"
        alt="Background"
        fill
        priority
        className="object-cover opacity-50 animate-pulse"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      <main className="relative z-10 w-full max-w-md mx-auto px-6 pb-10">

        {/* FULL TOP HERO */}
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

          {/* HEADLINE */}
          <p className="text-center text-[15px] tracking-[2px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-400 drop-shadow-[0_0_12px_rgba(200,200,200,0.9)]">
            SETTLE THE SCORE. PLAY WITH PURPOSE
          </p>

          {/* BUTTON STYLE */}
          <style jsx>{`
            .arena-btn {
              width: 100%;
              height: 52px;
              border-radius: 14px;
              font-weight: 600;
              letter-spacing: 1px;
              background: linear-gradient(145deg,#d9d9d9,#7a7a7a);
              color: black;
              box-shadow:
                0 0 15px rgba(255,255,255,0.6),
                0 0 30px rgba(200,200,200,0.4),
                inset 0 0 6px rgba(255,255,255,0.7);
              transition: all 0.2s ease;
            }

            .arena-btn:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow:
                0 0 25px rgba(255,255,255,0.9),
                0 0 40px rgba(220,220,220,0.6),
                inset 0 0 10px rgba(255,255,255,0.9);
            }

            .arena-btn:active {
              transform: scale(0.97);
            }
          `}</style>

          {user && (
            <>
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
            </>
          )}

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
  return (
    <MembershipGuard>
      <DashboardContent />
    </MembershipGuard>
  );
}