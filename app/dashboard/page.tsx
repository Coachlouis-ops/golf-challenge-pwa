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
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans text-white"
      style={{
        background:
          "radial-gradient(circle at center, #0a0a0a 0%, #000000 70%)",
      }}
    >
      <main className="w-full max-w-md px-6">
        <div className="flex flex-col items-center gap-6">

          <Image
            src="/logo.png"
            alt="Teez Golf"
            width={220}
            height={220}
            priority
          />

          <p className="text-center text-gray-300 text-lg">
            Settle the score. Play with purpose.
          </p>

          <style jsx>{`
            .chrome-btn {
              width: 100%;
              height: 48px;
              border-radius: 12px;
              background: linear-gradient(145deg,#ffffff,#cfcfcf,#9a9a9a);
              color: black;
              font-weight: 600;
              box-shadow:
                0 0 12px rgba(255,255,255,0.35),
                inset 0 0 4px rgba(255,255,255,0.8);
              transition: all 0.2s ease;
            }
            .chrome-btn:hover {
              box-shadow:
                0 0 18px rgba(255,255,255,0.7),
                inset 0 0 6px rgba(255,255,255,1);
              transform: translateY(-1px);
            }
          `}</style>

          <button
            onClick={() => router.push("/how-it-works")}
            className="chrome-btn"
          >
            How It Works
          </button>

          {user && (
            <>
              <button
                onClick={() => router.push("/challenges/create")}
                className="chrome-btn"
              >
                Create Challenge
              </button>

              <button
                onClick={() => router.push("/my-challenges")}
                className="chrome-btn"
              >
                My Challenges
              </button>

              <button
                onClick={() => router.push("/join")}
                className="chrome-btn"
              >
                Join Challenge
              </button>

              <button
                onClick={() => router.push("/my-invites")}
                className="chrome-btn"
              >
                My Invites
              </button>

              

             <button
  onClick={() => router.push("/profile")}
  className="chrome-btn"
>
  My Profile
</button>

<button
  onClick={() => router.push("/wallet")}
  className="chrome-btn"
>
  Wallet
</button>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 underline mt-2"
            >
              Logout
            </button>
          )}

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