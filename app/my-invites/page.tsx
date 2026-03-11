"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import { collection } from "firebase/firestore";

type InviteItem = {
  challengeId: string;
  challengeTitle: string;
  status: string;
};

export default function MyInvitesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [invites, setInvites] = useState<InviteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

 async function loadInvites(uid: string) {
  try {
    setLoading(true);

    const results: InviteItem[] = [];

    const snap = await getDocs(
      collection(db, "userInvites", uid, "invites")
    );

    snap.forEach((docSnap) => {
      const data = docSnap.data();

      results.push({
        challengeId: data.challengeId,
        challengeTitle: data.challengeTitle,
        status: data.status,
      });
    });

    setInvites(results);
  } catch (e) {
    console.error("Failed to load invites", e);
    setInvites([]);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    if (!user) return;
    loadInvites(user.uid);
  }, [user]);

  async function handleAccept(challengeId: string) {
    if (!user) return;

    try {
      setProcessingId(challengeId);

      const acceptSecure = httpsCallable(
        functions,
        "acceptInviteSecure"
      );

      await acceptSecure({ challengeId });

      await loadInvites(user.uid);
    } catch (e: any) {
      alert(e.message || "Failed to accept invite");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDecline() {
    alert("Decline not available yet.");
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        Please log in to view invites
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading invites…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center">

      {/* subtle particle grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* stadium light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-green-400 opacity-10 blur-[140px] animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full p-6 flex flex-col gap-6">

        <button
          onClick={() => router.push("/")}
          className="bg-green-500 text-black px-4 py-2 rounded font-semibold shadow-[0_0_20px_rgba(57,255,20,0.6)] hover:scale-[1.02] transition"
        >
          ← Back to Main Menu
        </button>

        <h1 className="text-3xl font-semibold tracking-wide">
          My Invites
        </h1>

        {invites.length === 0 && (
          <p className="text-gray-400">No invites yet</p>
        )}

        {invites.map((invite) => (
          <div
            key={invite.challengeId}
            className="bg-black/60 backdrop-blur-md border border-gray-700 rounded-xl p-5 flex flex-col gap-4 shadow-[0_0_18px_rgba(57,255,20,0.15)]"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                {invite.challengeTitle}
              </h2>

              <span className="text-xs uppercase text-gray-400">
                {invite.status}
              </span>
            </div>

            {invite.status === "pending" && (
              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleAccept(invite.challengeId)
                  }
                  disabled={
                    processingId === invite.challengeId ||
                    invite.status !== "pending"
                  }
                  className="bg-green-500 text-black px-4 py-2 rounded font-semibold shadow-[0_0_20px_rgba(57,255,20,0.6)] hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {processingId === invite.challengeId
                    ? "Processing..."
                    : "Accept"}
                </button>

                <button
                  onClick={handleDecline}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                >
                  Decline
                </button>

              </div>
            )}

            {invite.status === "accepted" && (
              <button
                onClick={() =>
                  router.push(
                    `/challenges/${invite.challengeId}`
                  )
                }
                className="bg-green-500 text-black px-4 py-2 rounded font-semibold shadow-[0_0_20px_rgba(57,255,20,0.6)] hover:scale-[1.02] transition"
              >
                Open Challenge
              </button>
            )}

          </div>
        ))}
      </div>
    </main>
  );
}