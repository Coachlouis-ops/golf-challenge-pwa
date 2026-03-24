"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import MembershipGuard from "@/src/components/MembershipGuard";

function DashboardContent() {
  const router = useRouter();
  const { user, loading } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-black">

      {/* VS ENERGY BACKGROUND */}
      <Image
        src="/vs-energy.png"
        alt="VS Energy"
        fill
        priority
        className="object-cover opacity-40"
      />

      {/* ARENA LIGHT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[420px] bg-green-400 opacity-20 blur-[140px] animate-pulse pointer-events-none" />

      {/* ENERGY FLOOR */}
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-green-500/10 to-transparent blur-[40px]" />

      {/* PARTICLE GRID */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px]" />

      <main className="relative z-10 w-full max-w-md px-6">

        <div className="flex flex-col items-center gap-6">

          <p className="text-center text-gray-300 text-lg tracking-wide">
            Settle the score. Play with purpose.
          </p>

          <style jsx>{`
            .arena-btn {
              width: 100%;
              height: 50px;
              border-radius: 12px;
              font-weight: 600;
              letter-spacing: 0.5px;
              background: linear-gradient(145deg,#39ff14,#1c8f0b);
              color: black;
              box-shadow:
                0 0 20px rgba(57,255,20,0.6),
                inset 0 0 6px rgba(255,255,255,0.4);
              transition: all 0.2s ease;
            }

            .arena-btn:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow:
                0 0 30px rgba(57,255,20,0.9),
                inset 0 0 10px rgba(255,255,255,0.6);
            }

            .arena-btn:active {
              transform: scale(0.98);
            }
          `}</style>


          {user && (
            <>
              <button
                onClick={() => router.push("/challenges/create")}
                className="arena-btn"
              >
                Create Challenge
              </button>

              <button
                onClick={() => router.push("/my-challenges")}
                className="arena-btn"
              >
                My Challenges
              </button>

              <button
                onClick={() => router.push("/my-invites")}
                className="arena-btn"
              >
                My Invites
              </button>

                         <button
                onClick={() => router.push("/profile")}
                className="arena-btn"
              >
                My Profile
              </button>

              <button
                onClick={() => router.push("/wallet")}
                className="arena-btn"
              >
                Wallet
              </button>

              <button
                onClick={() => router.push("/vouchers")}
                className="arena-btn"
              >
                My Vouchers
              </button>
            </>
          )}

        <button
  onClick={() => router.push("/")}
  className="text-sm text-gray-400 underline mt-2 hover:text-white"
>
  Back to Home
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