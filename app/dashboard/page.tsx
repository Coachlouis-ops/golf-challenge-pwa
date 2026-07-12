"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/src/lib/AuthContext";

type LockedFeature = {
  title: string;
  route: string;
};

function DashboardContent() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [lockedFeature, setLockedFeature] =
    useState<LockedFeature | null>(null);

  const openFeature = (title: string, route: string) => {
    if (!user) {
      setLockedFeature({
        title,
        route,
      });
      return;
    }

    router.push(route);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

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

          {!user && (
            <div className="w-full border border-green-400/60 bg-black/80 rounded-2xl p-5 text-center shadow-[0_0_20px_rgba(34,197,94,0.25)]">
              <p className="text-green-400 font-semibold tracking-wide">
                EXPLORE THE FULL TEEZ DASHBOARD
              </p>

              <p className="text-sm text-gray-300 mt-3 leading-6">
                Log in and activate your subscription to unlock competitive
                features.
              </p>

              <p className="text-xl font-bold mt-4">R99/month</p>

              <p className="text-xs text-gray-400 mt-2">
                Includes 100 Teez Tokens every month
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() => router.push("/login")}
                  className="h-11 rounded-xl border border-white/40 text-sm font-semibold hover:bg-white hover:text-black transition"
                >
                  LOG IN
                </button>

                <button
                  onClick={() => router.push("/register")}
                  className="h-11 rounded-xl bg-green-400 text-black text-sm font-semibold hover:scale-[1.02] transition"
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>
          )}

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

            .locked-btn {
              position: relative;
              opacity: 0.75;
            }

            .locked-btn::after {
              content: "LOCKED";
              position: absolute;
              right: 14px;
              font-size: 9px;
              letter-spacing: 1px;
              color: #111;
              background: #4ade80;
              padding: 3px 6px;
              border-radius: 999px;
            }
          `}</style>

          <button
            onClick={() =>
              openFeature("Create Challenge", "/challenges/create")
            }
            className={`arena-btn ${!user ? "locked-btn" : ""}`}
          >
            CREATE CHALLENGE
          </button>

          <button
            onClick={() =>
              openFeature("My Challenges", "/my-challenges")
            }
            className={`arena-btn ${!user ? "locked-btn" : ""}`}
          >
            MY CHALLENGES
          </button>

          <button
            onClick={() => openFeature("My Invites", "/my-invites")}
            className={`arena-btn ${!user ? "locked-btn" : ""}`}
          >
            MY INVITES
          </button>

          <button
            onClick={() => openFeature("My Profile", "/profile")}
            className={`arena-btn ${!user ? "locked-btn" : ""}`}
          >
            MY PROFILE
          </button>

          <button
            onClick={() => openFeature("Token Wallet", "/wallet")}
            className={`arena-btn ${!user ? "locked-btn" : ""}`}
          >
            TOKEN WALLET
          </button>

          <button
            onClick={() => openFeature("View Rankings", "/rankings")}
            className={`arena-btn ${!user ? "locked-btn" : ""}`}
          >
            VIEW RANKINGS
          </button>

          <div className="w-full border-t border-white/20 pt-6 mt-2 flex flex-col gap-4">
            <p className="text-center text-xs tracking-[2px] text-gray-300">
              SUBSCRIPTION & ACCOUNT
            </p>

            <button
              onClick={() =>
                router.push(user ? "/payment" : "/register")
              }
              className="arena-btn"
            >
              {user ? "MANAGE SUBSCRIPTION" : "ACTIVATE SUBSCRIPTION"}
            </button>

            {user && (
              <button
                onClick={() => router.push("/cancel-subscription")}
                className="arena-btn"
              >
                CANCEL SUBSCRIPTION
              </button>
            )}

            {!user && (
              <button
                onClick={() => router.push("/login")}
                className="arena-btn"
              >
                LOG IN
              </button>
            )}
          </div>

          <div className="w-full border-t border-white/20 pt-6 mt-2 flex flex-col gap-3">
            <p className="text-center text-xs tracking-[2px] text-gray-300">
              LEGAL & POLICIES
            </p>

            <button
              onClick={() => router.push("/terms")}
              className="text-xs tracking-widest text-gray-300 underline hover:text-white"
            >
              PLATFORM TERMS & CONDITIONS
            </button>

            <button
              onClick={() => router.push("/legal/payment-policy")}
              className="text-xs tracking-widest text-gray-300 underline hover:text-white"
            >
              PAYMENT & SUBSCRIPTION POLICY
            </button>

            <button
              onClick={() => router.push("/legal/refund-policy")}
              className="text-xs tracking-widest text-gray-300 underline hover:text-white"
            >
              REFUND, CANCELLATION & DELIVERY POLICY
            </button>

            <button
              onClick={() => router.push("/privacy")}
              className="text-xs tracking-widest text-gray-300 underline hover:text-white"
            >
              PRIVACY POLICY
            </button>
          </div>

          <button
            onClick={() => router.push("/")}
            className="text-xs tracking-widest text-gray-400 underline mt-2 hover:text-white"
          >
            BACK TO HOME
          </button>
        </div>
      </main>

      {lockedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6">
          <div className="w-full max-w-sm rounded-2xl border border-green-400/60 bg-zinc-950 p-6 text-center shadow-[0_0_30px_rgba(34,197,94,0.35)]">
            <p className="text-xs tracking-[2px] text-green-400">
              FEATURE LOCKED
            </p>

            <h2 className="text-xl font-bold mt-3">
              {lockedFeature.title}
            </h2>

            <p className="text-sm text-gray-300 mt-4 leading-6">
              Log in and activate your Teez subscription to use this feature.
            </p>

            <p className="text-2xl font-bold mt-5">R99/month</p>

            <p className="text-xs text-gray-400 mt-2">
              Includes 100 Teez Tokens every month
            </p>

            <button
              onClick={() => router.push("/login")}
              className="w-full h-12 mt-6 rounded-xl border border-white/40 font-semibold hover:bg-white hover:text-black transition"
            >
              LOG IN
            </button>

            <button
              onClick={() => router.push("/register")}
              className="w-full h-12 mt-3 rounded-xl bg-green-400 text-black font-semibold hover:scale-[1.02] transition"
            >
              ACTIVATE SUBSCRIPTION
            </button>

            <button
              onClick={() => setLockedFeature(null)}
              className="mt-5 text-xs tracking-widest text-gray-400 underline hover:text-white"
            >
              CONTINUE VIEWING DASHBOARD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}