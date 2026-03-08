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
  setLoading(false);
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

  // Decline disabled until moved to Cloud Function
  async function handleDecline() {
    alert("Decline not available yet.");
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Please log in to view invites</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading invites…</p>
      </main>
    );
  }

 return (
  <main className="min-h-screen max-w-3xl mx-auto p-6 flex flex-col gap-6">

      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="bg-gray-800 text-white px-4 py-2 rounded w-fit"
      >
        ← Back to Main Menu
      </button>

      <h1 className="text-2xl font-semibold mt-2">My Invites</h1>


      {invites.length === 0 && (
        <p className="text-gray-500">No invites yet</p>
      )}

      {invites.map((invite) => (
        <div
          key={invite.challengeId}
          className="border rounded p-4 flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              {invite.challengeTitle}
            </h2>
            <span className="text-sm uppercase text-gray-500">
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
      className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {processingId === invite.challengeId
        ? "Processing..."
        : "Accept"}
    </button>

              <button
                onClick={handleDecline}
                className="bg-gray-500 text-white px-4 py-2 rounded"
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
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Open Challenge
            </button>
          )}
        </div>
      ))}
    </main>
  );
}
