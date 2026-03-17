"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db, functions } from "@/src/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import ParticipantsList from "./ParticipantsList";
import PlayerSummaryList from "./PlayerSummaryList";
import ResultsList from "./ResultsList";
import { useRouter } from "next/navigation";




type Challenge = {
  challengeId: string;
  challengeTitle: string;
  courseName: string;
  gameFormat: string;
  scoringMethod: string;
  teamFormat: string;
  typeOfGame: string;
  entryTokens: number;
  status: string;
  creatorUid: string;
  joinCode?: string;
  createdAt?: any;
};

type Profile = {
  uid: string;
  name: string;
  surname: string;
  battleName: string;
  club: string;
  searchIndex: string;
};

type Player = {
  uid: string;
  displayName: string;
};

export default function ChallengeDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();


  const challengeId = Array.isArray(params?.challengeId)
    ? params.challengeId[0]
    : params?.challengeId;

  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scoreInputs, setScoreInputs] = useState<Record<string, string>>({});
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [invitedUids, setInvitedUids] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [invitingUid, setInvitingUid] = useState<string | null>(null);

  const isCreator =
    user && challenge && challenge.creatorUid === user.uid;


  // ===============================
  // LOAD CHALLENGE
  // ===============================
  useEffect(() => {
    if (!user || !challengeId) return;

    (async () => {
      try {
        const ref = doc(db, "challenges", challengeId);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setError("Challenge not found");
          setLoading(false);
          return;
        }

        const data = snap.data() as any;

        setChallenge({
          challengeId: data.challengeId || snap.id,
          challengeTitle: data.challengeTitle || "—",
          courseName: data.courseName || "—",
          gameFormat: data.gameFormat || "—",
          scoringMethod: data.scoringMethod || "—",
          teamFormat: data.teamFormat || "—",
          typeOfGame: data.typeOfGame || "—",
          entryTokens: data.entryTokens || 0,
          status: data.status || "—",
          creatorUid: data.creatorUid,
          joinCode: data.joinCode,
          createdAt: data.createdAt,
        });

        setLoading(false);
      } catch (e: any) {
        setError(e.message || "Failed to load challenge");
        setLoading(false);
      }
    })();
  }, [user, challengeId]);

// ===============================
// LOAD INVITED + PLAYERS
// ===============================

useEffect(() => {
  if (!challengeId) return;

  (async () => {
    try {

      // LOAD PLAYERS
      const playersSnap = await getDocs(
        collection(db, "challenges", challengeId, "players")
      );

      const playersData = playersSnap.docs.map((d) => ({
        uid: d.id,
        displayName: d.get("displayName") || d.id,
      }));

      setPlayers(playersData);

      // LOAD INVITES
      const invitesSnap = await getDocs(
        collection(db, "challenges", challengeId, "invites")
      );

      const invited = invitesSnap.docs.map((d) => d.id);

      setInvitedUids(invited);

    } catch (e) {
      console.error("Failed to load players/invites", e);
    }

  })();

}, [challengeId]);

  // ===============================
  // LIVE SEARCH
  // ===============================
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const runSearch = async () => {
      const term = searchTerm.toLowerCase();

      const q = query(
        collection(db, "profiles"),
        where("searchIndex", ">=", term),
        where("searchIndex", "<=", term + "\uf8ff")
      );

      const snap = await getDocs(q);

      const results: Profile[] = snap.docs
        .map((d) => d.data() as Profile)
        .filter((p) => p.searchIndex && p.searchIndex.length > 0);

      setSearchResults(results);
    };

    runSearch();
  }, [searchTerm]);

// ===============================
// UPDATE SCOREBOARD
// ===============================
async function handleUpdateScoreboard() {
  if (!challengeId || !challenge) return;

  try {
    setUpdating(true);

    const updateScoreboard = httpsCallable(
      functions,
      "updateScoreboard"
    );

    const scores = Object.entries(scoreInputs).map(
      ([uid, score]) => ({
        uid,
        score,
      })
    );

    await updateScoreboard({
      challengeId,
      scores,
    });

    const snap = await getDoc(
      doc(db, "challenges", challengeId)
    );

    if (snap.exists()) {
      setChallenge((prev) =>
        prev
          ? { ...prev, status: snap.get("status") }
          : prev
      );
    }
  } catch (e: any) {
    alert(e.message || "Failed to update scoreboard");
  } finally {
    setUpdating(false);
  }
}

// ===============================
// REOPEN CHALLENGE
// ===============================
async function handleReopenChallenge() {
  if (!challengeId) {
    console.log("No challengeId");
    return;
  }

  try {
    console.log("Calling reopenChallenge...");

    const reopen = httpsCallable(functions, "reopenChallenge");

    const result = await reopen({ challengeId });

    console.log("Reopen success:", result);

    const snap = await getDoc(doc(db, "challenges", challengeId));

    if (snap.exists()) {
      setChallenge((prev) =>
        prev ? { ...prev, status: snap.get("status") } : prev
      );
    }

  } catch (e: any) {
    console.error("Reopen error:", e);
    alert(e.message || "Failed to reopen challenge");
  }
}

// ===============================
// FINALIZE CHALLENGE
// ===============================
async function handleFinalizeChallenge() {
  if (!challengeId) return;

  try {
    const finalize = httpsCallable(functions, "finalizeChallenge");

    await finalize({ challengeId });

    const snap = await getDoc(doc(db, "challenges", challengeId));

    if (snap.exists()) {
      setChallenge((prev) =>
        prev ? { ...prev, status: snap.get("status") } : prev
      );
    }

  } catch (e: any) {
    alert(e.message || "Failed to finalize challenge");
  }
}

// ===============================
// INVITE
// ===============================
async function handleInvite(targetUid: string) {
  if (!user || !challengeId) return;

  try {
    setInvitingUid(targetUid);

    const sendInvite = httpsCallable(functions, "sendInvite");

    await sendInvite({
      challengeId,
      uid: targetUid,
    });

    setInvitedUids((prev) => [...prev, targetUid]);
  } catch (e: any) {
    alert(e.message || "Invite failed");
  } finally {
    setInvitingUid(null);
  }
}

if (!user) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>No user loaded</p>
    </main>
  );
}

if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>Loading challenge…</p>
    </main>
  );
}

if (error || !challenge) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>{error ?? "Challenge not available"}</p>
    </main>
  );
}

const showResults =
  challenge.status === "active" ||
  challenge.status === "completed";

return (
 <main className="relative min-h-screen flex justify-center px-4 py-12 bg-black text-white overflow-hidden">

  {/* STADIUM LIGHT */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-green-400 opacity-10 blur-[120px] pointer-events-none" />

  {/* PARTICLE GRID */}
  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px]" />

  {/* KNEELING BADGER */}
  <img
    src="/badger-kneeling-yellow.png"
    className="absolute bottom-0 left-10 h-[65%] opacity-30 pointer-events-none"
  />

  <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6">

  <button
    onClick={() => router.push("/dashboard")}
    className="mb-4 text-sm underline"
  >
    Back to Dashboard
  </button>

  <h1 className="text-2xl font-semibold">
    {challenge.challengeTitle}
  </h1>

    <div className="flex items-center gap-3">
      <span className="text-xs px-2 py-1 rounded bg-gray-200">
        {challenge.status}
      </span>
      {challenge.joinCode && (
        <span className="text-xs px-2 py-1 rounded bg-gray-100">
          Join Code: <strong>{challenge.joinCode}</strong>
        </span>
      )}
    </div>

    <div className="border rounded p-4 flex flex-col gap-2">
      <p><strong>Course:</strong> {challenge.courseName}</p>
      <p><strong>Game Format:</strong> {challenge.gameFormat}</p>
      <p><strong>Scoring Method:</strong> {challenge.scoringMethod}</p>
      <p><strong>Team Format:</strong> {challenge.teamFormat}</p>
      <p><strong>Type of Game:</strong> {challenge.typeOfGame}</p>
      <p><strong>Entry Tokens:</strong> {challenge.entryTokens}</p>
    </div>

    {/* ================= INVITE SECTION ================= */}
    <div className="border rounded p-4 flex flex-col gap-3">
      <h2 className="font-semibold">Invite Players</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search name, surname, club, battle name"
        className="border rounded p-2"
      />

     {searchResults.map((p) => {
  const isYou = user.uid === p.uid;
  const alreadyInvited = invitedUids.includes(p.uid);
 const alreadyPlayer = players.some(
  (player) => String(player.uid) === String(p.uid)
);


        return (
          <div
            key={p.uid}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">
                {p.name} {p.surname} ({p.battleName})
              </div>
              <div className="text-xs text-gray-500">
                {p.club}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isYou && (
                <span className="text-xs px-2 py-1 bg-blue-100 rounded">
                  You
                </span>
              )}

              {alreadyPlayer && (
                <span className="text-xs px-2 py-1 bg-green-100 rounded">
                  Player
                </span>
              )}

              {alreadyInvited && !alreadyPlayer && (
                <span className="text-xs px-2 py-1 bg-yellow-100 rounded">
                  Invited
                </span>
              )}

              <button
                disabled={
                  !isCreator ||
                  alreadyInvited ||
                  alreadyPlayer ||
                  invitingUid === p.uid
                }
                onClick={() => handleInvite(p.uid)}
                className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-40"
              >
                Invite
              </button>
            </div>
          </div>
        );
      })}
    </div>

{/* ================= ENTER RESULTS ================= */}
{isCreator && (
  <div className="border rounded p-4 flex flex-col gap-3">
    <h2 className="font-semibold">Enter Results</h2>

    {players.length === 0 && (
      <p className="text-sm text-gray-500">
        No players available for scoring.
      </p>
    )}

    {players.map((player) => (
      <div key={player.uid} className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Score for {player.displayName}
        </label>
        <input
          type="text"
          value={scoreInputs[player.uid] || ""}
          onChange={(e) =>
            setScoreInputs((prev) => ({
              ...prev,
              [player.uid]: e.target.value,
            }))
          }
          disabled={challenge?.status === "completed"}
          className="border rounded p-2 disabled:opacity-50"
        />
      </div>
    ))}

    <button
      onClick={handleUpdateScoreboard}
      disabled={
        updating ||
        challenge?.status === "completed" ||
        players.length === 0
      }
      className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-40"
    >
      {updating ? "Updating..." : "Update Scoreboard"}
    </button>
  </div>
)}


{/* ================= FINALIZE ================= */}
{isCreator && challenge?.status !== "completed" && players.length > 0 && (
  <div className="border rounded p-4 flex flex-col gap-3">
    <button
      onClick={handleFinalizeChallenge}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Finalize Challenge
    </button>
  </div>
)}


{/* ================= REOPEN ================= */}
{isCreator && challenge?.status === "completed" && (
  <div className="border rounded p-4 flex flex-col gap-3">
    <button
      onClick={handleReopenChallenge}
      className="bg-orange-600 text-white px-4 py-2 rounded"
    >
      Reopen Challenge
    </button>
  </div>
)}

<ParticipantsList challengeId={challengeId as string} />
<PlayerSummaryList challengeId={challengeId as string} />

    {/* ================= RESULTS ================= */}
    {showResults && (
      <ResultsList challengeId={challengeId as string} />
    )}
  </div>
</main>
);
}
