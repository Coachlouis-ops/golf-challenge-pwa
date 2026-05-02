"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";

type InviteItem = {
  challengeId: string;
  challengeTitle: string;
  status: string;
  gameFormat: string;
  scoringMethod: string;
  entryTokens: number;
  creatorName: string;
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

      const invitesRef = collection(db, "userInvites", uid, "invites");
      const snap = await getDocs(invitesRef);

      for (const docSnap of snap.docs) {
        const data = docSnap.data();

        console.log("INVITE DATA", data);

        let challengeTitle = "";
        let gameFormat = "";
        let scoringMethod = "";
        let entryTokens = 0;

        if (data.challengeId) {
          const challengeRef = doc(db, "challenges", data.challengeId);
          const challengeSnap = await getDoc(challengeRef);

          if (challengeSnap.exists()) {
            challengeTitle =
              challengeSnap.get("challengeTitle") || "";
            gameFormat =
              challengeSnap.get("gameFormat") || "";
            scoringMethod =
              challengeSnap.get("scoringMethod") || "";
            entryTokens =
              challengeSnap.get("entryTokens") || 0;
          }
        }

        results.push({
          challengeId: data.challengeId,
          challengeTitle:
            challengeTitle || data.challengeTitle || "",
          status: data.status,

          gameFormat:
            gameFormat || data.gameFormat || "",
          scoringMethod:
            scoringMethod || data.scoringMethod || "",
          entryTokens:
            entryTokens || data.entryTokens || 0,
          creatorName: data.creatorName || "",
        });
      }

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

  async function handleDecline(challengeId: string) {
    if (!user) return;

    try {
      setProcessingId(challengeId);

      const declineSecure = httpsCallable(
        functions,
        "declineInviteSecure"
      );

      await declineSecure({ challengeId });

      await loadInvites(user.uid);
    } catch (e: any) {
      alert(e.message || "Failed to decline invite");
    } finally {
      setProcessingId(null);
    }
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

      <div className="relative z-10 max-w-3xl w-full p-6 flex flex-col gap-6">

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-500 text-black px-4 py-2 rounded font-semibold"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-semibold">
          My Invites
        </h1>

        {invites.length === 0 && (
          <p className="text-gray-400">No invites yet</p>
        )}

        {invites.map((invite) => (
          <div
            key={invite.challengeId}
            className="bg-black/60 border border-gray-700 rounded-xl p-5 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                {invite.challengeTitle}
              </h2>

              <span className="text-xs uppercase text-gray-400">
                {invite.status}
              </span>
            </div>

            <div className="text-sm text-gray-300 flex flex-col gap-1">
              <p><strong>Format:</strong> {invite.gameFormat}</p>
              <p><strong>Scoring:</strong> {invite.scoringMethod}</p>
              <p><strong>Tokens:</strong> {invite.entryTokens}</p>
              <p><strong>Creator:</strong> {invite.creatorName}</p>
            </div>

            {invite.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleAccept(invite.challengeId)
                  }
                  disabled={
                    processingId === invite.challengeId
                  }
                  className="bg-green-500 text-black px-4 py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleDecline(invite.challengeId)
                  }
                  className="bg-gray-700 px-4 py-2 rounded"
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
                className="bg-green-500 text-black px-4 py-2 rounded"
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