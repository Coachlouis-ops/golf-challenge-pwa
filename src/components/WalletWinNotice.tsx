"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import {
  dismissedWinNoticeKey,
  readWinNotice,
  winNoticeHeadline,
  type WinNotice,
} from "@/src/lib/winNotice";

type Props = {
  notice?: WinNotice | null;
};

export default function WalletWinNotice({ notice: noticeProp }: Props) {
  const { user } = useAuth();
  const listens = noticeProp === undefined;
  const [listened, setListened] = useState<WinNotice | null>(null);
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const notice = !user ? null : listens ? listened : noticeProp ?? null;
  const storedDismissed =
    user && notice && typeof window !== "undefined"
      ? window.localStorage.getItem(dismissedWinNoticeKey(user.uid, notice.id)) === "1"
      : false;

  useEffect(() => {
    if (!listens || !user) return;

    const unsubscribe = onSnapshot(doc(db, "wallets", user.uid), (snap) => {
      setListened(snap.exists() ? readWinNotice(snap.data().lastWinNotice) : null);
    });

    return () => unsubscribe();
  }, [listens, user]);

  async function dismiss() {
    if (!user || !notice) return;
    window.localStorage.setItem(dismissedWinNoticeKey(user.uid, notice.id), "1");
    setDismissedId(notice.id);

    try {
      await updateDoc(doc(db, "wallets", user.uid), {
        "lastWinNotice.dismissed": true,
      });
    } catch {
      // The local dismiss already hides the notice when wallet writes are blocked.
    }
  }

  if (!notice || notice.dismissed || storedDismissed || dismissedId === notice.id) return null;

  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl p-[2px] shadow-[0_0_28px_rgba(250,204,21,0.55)]">
      <style>{`
        @keyframes teez-win-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes teez-win-float {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background:
            "linear-gradient(110deg, #fbbf24, #34d399, #fde68a, #10b981, #fbbf24)",
          backgroundSize: "220% 220%",
          animation: "teez-win-shimmer 2.8s linear infinite",
        }}
      />
      <div className="relative overflow-hidden rounded-[14px] bg-black px-4 py-4 text-center">
        <span
          className="pointer-events-none absolute left-4 top-3 h-2 w-2 rounded-full bg-amber-300"
          style={{ animation: "teez-win-float 1.6s ease-in-out infinite" }}
        />
        <span
          className="pointer-events-none absolute right-6 top-5 h-1.5 w-1.5 rounded-full bg-emerald-300"
          style={{ animation: "teez-win-float 1.9s ease-in-out infinite 0.2s" }}
        />
        <span
          className="pointer-events-none absolute bottom-4 left-8 h-1.5 w-1.5 rounded-full bg-yellow-200"
          style={{ animation: "teez-win-float 2.1s ease-in-out infinite 0.4s" }}
        />
        <span className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-300 text-xl text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.8)] animate-bounce">
          ★
        </span>
        <p className="text-2xl font-black tracking-wide text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]">
          {winNoticeHeadline(notice.amount)}
        </p>
        {notice.challengeTitle && (
          <p className="mt-2 text-sm font-bold text-emerald-200">
            From: {notice.challengeTitle}
          </p>
        )}
        <button
          type="button"
          onClick={() => void dismiss()}
          className="mt-4 rounded-full border border-amber-300/70 px-4 py-2 text-xs font-black uppercase tracking-wide text-amber-100"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
