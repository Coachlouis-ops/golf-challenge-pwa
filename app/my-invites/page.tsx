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
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";





type InviteItem = {
  id: string;
  inviteType: "challenge" | "group";

  challengeId: string;
  challengeTitle: string;

  groupId: string;
  groupName: string;

  status: string;
  gameFormat: string;
  scoringMethod: string;
  entryTokens: number;
  creatorName: string;
};

export default function MyInvitesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { teezAlert, teezConfirm } =
    useTeezNotification();

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

        let challengeTitle = "";
        let gameFormat = "";
        let scoringMethod = "";
        let entryTokens = 0;

        if (data.challengeId) {
          const challengeRef = doc(db, "challenges", data.challengeId);
          const challengeSnap = await getDoc(challengeRef);

          if (challengeSnap.exists()) {
            challengeTitle = challengeSnap.get("challengeTitle") || "";
            gameFormat = challengeSnap.get("gameFormat") || "";
            scoringMethod = challengeSnap.get("scoringMethod") || "";
            entryTokens = challengeSnap.get("entryTokens") || 0;
          }
        }

       results.push({
  id: docSnap.id,

  inviteType:
    data.inviteType === "group"
      ? "group"
      : "challenge",

  challengeId:
    data.challengeId || "",

  challengeTitle:
    challengeTitle ||
    data.challengeTitle ||
    "",

  groupId:
    data.groupId || "",

  groupName:
    data.groupName || "",

  status:
    data.status || "pending",

  gameFormat:
    gameFormat ||
    data.gameFormat ||
    "",

  scoringMethod:
    scoringMethod ||
    data.scoringMethod ||
    "",

  entryTokens:
    entryTokens ||
    data.entryTokens ||
    0,

  creatorName:
    data.creatorName || "",
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

    const uid = user.uid;

    loadInvites(uid);
  }, [user]);


async function handleAcceptGroup(
  groupId: string
) {
  if (!user) return;

  try {
    setProcessingId(
      `group-${groupId}`
    );

    const acceptGroupInvite =
      httpsCallable(
        functions,
        "acceptGroupInvite"
      );

    await acceptGroupInvite({
      groupId,
    });

    await loadInvites(
      user.uid
    );

    router.push(
      `/groups/${groupId}`
    );
 } catch (e: any) {
  await teezAlert({
    title: "GROUP INVITE NOT ACCEPTED",
    message:
      e?.message ||
      "Failed to accept the Group invite.",
    type: "error",
    buttonText: "TRY AGAIN",
  });
} finally {
    setProcessingId(null);
  }
}



  async function handleAccept(challengeId: string) {
    if (!user) return;

    const confirmed =
  await teezConfirm({
    title: "ACCEPT MATCH",
    message:
      "Accepting this match will spend the listed entry tokens from your wallet.",
    type: "warning",
    confirmText: "ACCEPT MATCH",
    cancelText: "CANCEL",
  });

if (!confirmed) return;
    try {
      setProcessingId(challengeId);

      const acceptSecure = httpsCallable(functions, "acceptInviteSecure");

      await acceptSecure({ challengeId });
      await loadInvites(user.uid);
    } catch (e: any) {
  await teezAlert({
    title: "MATCH NOT ACCEPTED",
    message:
      e?.message ||
      "Failed to accept the Match invite.",
    type: "error",
    buttonText: "TRY AGAIN",
  });
} finally {
      setProcessingId(null);
    }
  }

  async function handleDecline(challengeId: string) {
    if (!user) return;

    try {
      setProcessingId(challengeId);

      const declineSecure = httpsCallable(functions, "declineInviteSecure");

      await declineSecure({ challengeId });
      await loadInvites(user.uid);
  } catch (e: any) {
  await teezAlert({
    title: "INVITE NOT DECLINED",
    message:
      e?.message ||
      "Failed to decline the Match invite.",
    type: "error",
    buttonText: "TRY AGAIN",
  });
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
        Loading match invites…
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
          My Match Invites
        </h1>

        {invites.length === 0 && (
          <p className="text-gray-400">
            No match invites yet.
          </p>
        )}

        {invites.map((invite) => {

  const isGroupInvite =
    invite.inviteType === "group";

  const processingKey =
    isGroupInvite
      ? `group-${invite.groupId}`
      : invite.challengeId;

  return (
    <div
      key={invite.id}
      className="bg-black/60 border border-gray-700 rounded-xl p-5 flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">

        <div>
          <div className="text-xs font-bold tracking-[0.2em] text-green-400 mb-1">
            {isGroupInvite
              ? "GROUP INVITATION"
              : "MATCH INVITATION"}
          </div>

          <h2 className="font-semibold text-lg">
            {isGroupInvite
              ? invite.groupName
              : invite.challengeTitle}
          </h2>
        </div>

        <span className="text-xs uppercase text-gray-400">
          {invite.status}
        </span>
      </div>


      {isGroupInvite ? (

        <div className="text-sm text-gray-300 flex flex-col gap-1">

          <p>
            You have been invited to join this Teez Group.
          </p>

          <p>
            <strong>Group:</strong>{" "}
            {invite.groupName}
          </p>

          <p>
            <strong>Created By:</strong>{" "}
            {invite.creatorName}
          </p>

        </div>

      ) : (

        <div className="text-sm text-gray-300 flex flex-col gap-1">

          <p>
            <strong>Format:</strong>{" "}
            {invite.gameFormat}
          </p>

          <p>
            <strong>Scoring:</strong>{" "}
            {invite.scoringMethod}
          </p>

          <p>
            <strong>Entry Tokens:</strong>{" "}
            {invite.entryTokens}
          </p>

          <p>
            <strong>Created By:</strong>{" "}
            {invite.creatorName}
          </p>

        </div>

      )}


      {invite.status === "pending" && (

        <div className="flex gap-3">

          {isGroupInvite ? (

            <button
              onClick={() =>
                handleAcceptGroup(
                  invite.groupId
                )
              }
              disabled={
                processingId ===
                processingKey
              }
              className="bg-green-500 text-black px-4 py-2 rounded"
            >
              {processingId ===
              processingKey
                ? "Joining..."
                : "Join Group"}
            </button>

          ) : (

            <button
              onClick={() =>
                handleAccept(
                  invite.challengeId
                )
              }
              disabled={
                processingId ===
                processingKey
              }
              className="bg-green-500 text-black px-4 py-2 rounded"
            >
              {processingId ===
              processingKey
                ? "Accepting..."
                : "Accept Match"}
            </button>

          )}

          {!isGroupInvite && (
            <button
              onClick={() =>
                handleDecline(
                  invite.challengeId
                )
              }
              disabled={
                processingId ===
                processingKey
              }
              className="bg-gray-700 px-4 py-2 rounded"
            >
              Decline
            </button>
          )}

        </div>

      )}


      {!isGroupInvite &&
        invite.status === "accepted" && (

          <button
            onClick={() =>
              router.push(
                `/challenges/${invite.challengeId}`
              )
            }
            className="bg-green-500 text-black px-4 py-2 rounded"
          >
            Open Match
          </button>

        )}

    </div>
  );
})}
      </div>
    </main>
  );
}
