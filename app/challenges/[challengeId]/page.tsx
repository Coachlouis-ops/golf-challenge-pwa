
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";
import ParticipantsList from "./ParticipantsList";
import PlayerSummaryList from "./PlayerSummaryList";
import ResultsList from "./ResultsList";

type Challenge = {
  challengeId: string;
  challengeTitle: string;
  courseName: string;
  gameFormat: string;
  scoringMethod: string;
  teamFormat: string;
  typeOfGame: string;
 entryTokens: number;

nassauTokens?: {
  front9: number;
  back9: number;
  game: number;
  units: number;
};

status: string;
  creatorUid: string;
  participants?: string[];
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

const { teezAlert, teezConfirm } =
  useTeezNotification();



  const challengeId = Array.isArray(params?.challengeId)
    ? params.challengeId[0]
    : params?.challengeId;

  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);
const [scoreInputs, setScoreInputs] = useState<Record<string, string>>({});

const [resultEntryTypes, setResultEntryTypes] = useState<
  Record<string, "win" | "lost" | "tie" | "score" | "">
>({});


const [nassauResults, setNassauResults] = useState<
  Record<
    string,
    {
      front9: string;
      back9: string;
      game: string;
      units: string;
    }
  >
>({});

const [updating, setUpdating] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [invitedUids, setInvitedUids] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [invitingUid, setInvitingUid] = useState<string | null>(null);

const [finalizing, setFinalizing] = useState(false);
const [scoreboardUpdated, setScoreboardUpdated] = useState(false);

  const isCreator = user && challenge && challenge.creatorUid === user.uid;

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

nassauTokens: data.nassauTokens
  ? {
      front9: Number(data.nassauTokens.front9 || 0),
      back9: Number(data.nassauTokens.back9 || 0),
      game: Number(data.nassauTokens.game || 0),
      units: Number(data.nassauTokens.units || 0),
    }
  : undefined,

status: data.status || "â€”",
  creatorUid: data.creatorUid,
  participants: data.participants || [],
  joinCode: data.joinCode,
  createdAt: data.createdAt,
});

const participants = data.participants || [];

if (
  data.creatorUid !== user.uid &&
  !participants.includes(user.uid)
) {
  router.replace("/my-challenges");
  return;
}


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
        const playersSnap = await getDocs(
          collection(db, "challenges", challengeId, "players")
        );

        const playersData = playersSnap.docs.map((d) => ({
          uid: d.id,
          displayName: d.get("displayName") || d.id,
        }));

        setPlayers(playersData);

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
  // MANUAL REFRESH
  // ===============================
  async function handleRefresh() {
    if (!challengeId) return;

    try {
      setLoading(true);

      const ref = doc(db, "challenges", challengeId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
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
      }

      const playersSnap = await getDocs(
        collection(db, "challenges", challengeId, "players")
      );

      const playersData = playersSnap.docs.map((d) => ({
        uid: d.id,
        displayName: d.get("displayName") || d.id,
      }));

      setPlayers(playersData);

      const invitesSnap = await getDocs(
        collection(db, "challenges", challengeId, "invites")
      );

      const invited = invitesSnap.docs.map((d) => d.id);
      setInvitedUids(invited);
    } catch (e) {
      console.error("Refresh failed", e);
    } finally {
      setLoading(false);
    }
  }

  // ===============================
  // UPDATE SCOREBOARD
  // ===============================
  async function handleUpdateScoreboard() {
    if (!challengeId || !challenge) return;

    try {
      setUpdating(true);

      const updateScoreboard = httpsCallable(functions, "updateScoreboard");

    const scores =
  challenge.typeOfGame === "NASSAU"
    ? players.map((player) => ({
        uid: player.uid,
        nassau: {
          front9: nassauResults[player.uid]?.front9 || "",
          back9: nassauResults[player.uid]?.back9 || "",
          game: nassauResults[player.uid]?.game || "",
          units: nassauResults[player.uid]?.units || "",
        },
      }))
    : Object.entries(scoreInputs).map(([uid, score]) => ({
        uid,
        score,
      }));

await updateScoreboard({
  challengeId,
  scores,
});

setScoreboardUpdated(true);

const snap = await getDoc(doc(db, "challenges", challengeId));

      if (snap.exists()) {
        setChallenge((prev) =>
          prev
            ? {
                ...prev,
                status: snap.get("status"),
              }
            : prev
        );
      }
   } catch (e: any) {
  await teezAlert({
    title: "SCOREBOARD NOT UPDATED",
    message:
      e?.message ||
      "Failed to update the scoreboard.",
    type: "error",
    buttonText: "TRY AGAIN",
  });
} finally {
      setUpdating(false);
    }
  }

  // ===============================
  // FINALIZE CHALLENGE
  // ===============================
  async function handleFinalizeChallenge() {
    if (!challengeId) return;
    if (finalizing) return;

    setFinalizing(true);

const confirmFinalize =
  await teezConfirm({
    title: "FINALIZE CHALLENGE",
    message:
      "Are you sure you want to finalize this challenge?\n\nThis action cannot be undone.",
    type: "warning",
    confirmText: "FINALIZE",
    cancelText: "CANCEL",
  });

if (!confirmFinalize) {
  setFinalizing(false);
  return;
}

try {
      const finalize = httpsCallable(functions, "finalizeChallenge");

      await finalize({ challengeId });

      const snap = await getDoc(doc(db, "challenges", challengeId));

      if (snap.exists()) {
        setChallenge((prev) =>
          prev
            ? {
                ...prev,
                status: snap.get("status"),
              }
            : prev
        );
      }
    } catch (e: any) {
  await teezAlert({
    title: "CHALLENGE NOT FINALIZED",
    message:
      e?.message ||
      "Failed to finalize the challenge.",
    type: "error",
    buttonText: "TRY AGAIN",
  });
} finally {
      setFinalizing(false);
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
        targetUid,
      });

      setInvitedUids((prev) => [...prev, targetUid]);

      setSearchTerm("");
      setSearchResults([]);
    } catch (e: any) {
  await teezAlert({
    title: "INVITE NOT SENT",
    message:
      e?.message ||
      "The player invite could not be sent.",
    type: "error",
    buttonText: "TRY AGAIN",
  });
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
  challenge.status === "active" || challenge.status === "completed";

const allScoresEntered =
  players.length > 0 &&
  players.every((player) => {
    if (challenge?.typeOfGame === "NASSAU") {
      const result = nassauResults[player.uid];

      return Boolean(
        result?.front9 &&
        result?.back9 &&
        result?.game &&
        result?.units
      );
    }

    return (scoreInputs[player.uid] || "").trim() !== "";
  });

const canFinalize =
  allScoresEntered &&
  scoreboardUpdated &&
  challenge.status !== "completed";

  return (
    <main className="relative min-h-screen flex justify-center px-4 py-8 sm:py-12 bg-[#05030b] text-white overflow-hidden">
      {/* STADIUM LIGHT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-green-400 opacity-10 blur-[120px] pointer-events-none" />

      {/* PARTICLE GRID */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* KNEELING BADGER */}
      <img
        src="/badger-kneeling-yellow.png"
        className="absolute bottom-0 left-10 h-[65%] opacity-30 pointer-events-none"
        alt="Badger illustration"
      />

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-6">
        <div className="flex justify-end">
          <button
            onClick={handleRefresh}
            className="bg-cyan-300 text-black px-5 py-3 rounded-xl font-black shadow-[0_0_24px_rgba(34,211,238,0.5)] hover:bg-cyan-200 hover:scale-[1.02] transition"
          >
            Refresh
          </button>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-2 self-start rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition"
        >
          Back to Dashboard
        </button>

               {isCreator ? (
          (() => {
            const acceptedPlayers = players.length;
            const pendingInvites = invitedUids.filter(
              (uid) =>
                !players.some(
                  (player) => String(player.uid) === String(uid)
                )
            ).length;

            let title = "INVITE PLAYERS";
            let message =
              "Invite players by searching their names in the Invite Players tab.";
            let notes: string[] = [
              "Players who accepted your challenge will appear in the Participants section below.",
              "The creator of the challenge must also invite and accept themselves to enter the challenge.",
            ];

            if (invitedUids.length > 0 && acceptedPlayers === 0) {
              title = "WAITING FOR ACCEPTANCE";
              message = "Search and invite next player.";
              notes = [
                "Waiting for invited players to accept the challenge.",
              ];
            }

            if (
              acceptedPlayers > 0 &&
              challenge.status !== "completed"
            ) {
              title = "ENTER RESULTS";
              message =
                "After completion of challenge enter the scores/results - update scoreboard, scoreboard can be updated as scores are being added, once finalized the challenge cannot be reopened.";
              notes = [
                "Accepted players are listed in the Participants section below.",
              ];
            }

            if (challenge.status === "completed") {
              title = "CHALLENGE COMPLETED";
              message =
                "See My Challenges for results and My Profile for rankings and prizes.";
              notes = [
                "This challenge has been finalized successfully.",
              ];
            }

            return (
              <div className="border border-red-500/40 bg-red-950/30 backdrop-blur-md rounded-2xl p-5 shadow-[0_0_35px_rgba(255,0,0,0.35)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs tracking-[0.3em] text-red-400 font-bold">
                      CHALLENGE GUIDE
                    </div>

                    <div className="text-2xl font-extrabold text-red-300 mt-1">
                      {title}
                    </div>
                  </div>

                  <div className="text-right text-xs text-red-200 space-y-1">
                    <div>Players Joined: {acceptedPlayers}</div>
                    <div>Pending Invites: {pendingInvites}</div>
                    <div>Status: {challenge.status}</div>
                  </div>
                </div>

                <div className="text-sm text-red-100 leading-relaxed">
                  {message}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {notes.map((note, index) => (
                    <div
                      key={index}
                      className="text-xs text-red-200 bg-black/30 border border-red-500/20 rounded-lg px-3 py-2"
                    >
                      • {note}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        ) : (
          <div className="border border-blue-500/40 bg-blue-950/30 backdrop-blur-md rounded-2xl p-5 shadow-[0_0_35px_rgba(0,120,255,0.25)]">
            <div className="text-xs tracking-[0.3em] text-blue-400 font-bold">
              CHALLENGE DETAILS
            </div>

            <div className="text-2xl font-extrabold text-blue-200 mt-1">
              VIEW-ONLY ACCESS
            </div>

            <p className="text-sm text-blue-100 leading-relaxed mt-4">
              You are participating in this challenge. You can view the
              challenge details, participants, live scoreboard and final
              results.
            </p>

            <p className="text-xs text-blue-300 bg-black/30 border border-blue-500/20 rounded-lg px-3 py-2 mt-4">
              Only the challenge creator can invite players, enter scores,
              update the scoreboard and finalize the challenge.
            </p>
          </div>
        )}

        <div className="rounded-3xl border-2 border-purple-400 bg-gradient-to-r from-purple-950/90 via-fuchsia-950/75 to-black p-5 sm:p-6 shadow-[0_0_38px_rgba(168,85,247,0.35)]">
          <div className="text-xs font-black tracking-[0.3em] text-purple-300">CHALLENGE</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-white">{challenge.challengeTitle}</h1>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide ${
              challenge.status === "completed"
                ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,0,0.7)]"
                : "bg-green-500 text-black shadow-[0_0_15px_rgba(57,255,20,0.5)]"
            }`}
          >
            {challenge.status.toUpperCase()}
          </span>

          {challenge.joinCode && (
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-black">
              Join Code: <strong>{challenge.joinCode}</strong>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-3xl border-2 border-blue-400/80 bg-blue-950/35 p-5 shadow-[0_0_30px_rgba(59,130,246,0.22)]">
          <p>
            <strong>Course:</strong> {challenge.courseName}
          </p>
          <p>
            <strong>Game Format:</strong> {challenge.gameFormat}
          </p>
          <p>
            <strong>Scoring Method:</strong> {challenge.scoringMethod}
          </p>
          <p>
            <strong>Team Format:</strong> {challenge.teamFormat}
          </p>
          <p>
            <strong>Type of Game:</strong> {challenge.typeOfGame}
          </p>
          <p>
            <strong>Entry Tokens:</strong> {challenge.entryTokens}
          </p>
        </div>

      {/* INVITE SECTION */}
{isCreator && (
<div className="border-2 border-blue-400 bg-gradient-to-br from-blue-950/80 via-indigo-950/70 to-black rounded-3xl p-5 sm:p-6 flex flex-col gap-4 shadow-[0_0_38px_rgba(59,130,246,0.32)]">

         <div>
  <div className="text-red-400 text-xs tracking-[0.25em] font-extrabold">
    STEP 1
  </div>

  <h2 className="text-2xl font-extrabold text-white mt-1">
    ADD PLAYERS
  </h2>

  <p className="text-sm text-red-200 mt-2">
    Search for each player and send an invite. Players must accept the
    challenge before their scores/results can be entered.
  </p>
</div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search player name, surname, club or battle name"
              className="border border-red-500/30 bg-black/40 text-white rounded-xl p-3 focus:outline-none focus:border-red-400 focus:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition"
            />

            <div className="text-xs text-red-300">
              Search and invite players one-by-one. Accepted players will
              automatically appear in Participants below.
            </div>
          </div>

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
                  <div className="text-xs text-gray-500">{p.club}</div>
                </div>

                <div className="flex items-center gap-2">
                  {isYou && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-black rounded">
                      You
                    </span>
                  )}

                  {alreadyPlayer && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-black rounded">
                      Player
                    </span>
                  )}

                  {alreadyInvited && !alreadyPlayer && (
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-black rounded">
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
                    className="px-4 py-2 rounded-xl font-semibold transition-all bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-[1.03] disabled:opacity-30 disabled:hover:scale-100"
                  >
                    {invitingUid === p.uid
                      ? "Sending..."
                      : alreadyPlayer
                      ? "Joined"
                      : alreadyInvited
                      ? "Invited"
                      : "Invite"}
                  </button>
                </div>
              </div>
            );
          })}

       </div>
)}

      {/* PARTICIPANTS */}
<div className="border-2 border-violet-400/80 bg-gradient-to-br from-violet-950/70 via-purple-950/60 to-black rounded-3xl p-5 shadow-[0_0_32px_rgba(167,139,250,0.25)]">
  <div className="flex items-center justify-between mb-4">
    <div>
      <div className="text-red-400 text-xs tracking-[0.25em] font-bold">
        PLAYERS READY
      </div>

      <div className="text-xl font-bold text-white mt-1">
        PARTICIPANTS
      </div>
    </div>

    <div className="text-right text-xs text-red-300">
      {players.length} Joined
    </div>
  </div>

  <div className="text-xs text-red-200 mb-4">
    Players who accepted your challenge are listed below.
  </div>

  <ParticipantsList challengeId={challengeId as string} />
</div>

{/* ENTER RESULTS */}
{isCreator && (
  <div className="border-2 border-fuchsia-400 bg-gradient-to-br from-fuchsia-950/95 via-purple-950/95 to-black rounded-3xl p-5 sm:p-6 flex flex-col gap-5 shadow-[0_0_45px_rgba(217,70,239,0.42)]">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <div className="inline-flex items-center rounded-full bg-fuchsia-400 px-3 py-1 text-[11px] tracking-[0.25em] font-black text-black">
          STEP 2 · ACTION REQUIRED
        </div>
        <div className="text-3xl sm:text-4xl font-black text-white mt-3">
          ENTER RESULTS
        </div>
      </div>

      <div
        className={`rounded-2xl border px-4 py-3 text-sm font-black ${
          allScoresEntered
            ? "border-green-300 bg-green-400 text-black shadow-[0_0_22px_rgba(74,222,128,0.45)]"
            : "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_22px_rgba(253,224,71,0.35)]"
        }`}
      >
        {allScoresEntered ? "ALL RESULTS ENTERED" : "COMPLETE EVERY PLAYER"}
      </div>
    </div>

    <div className="rounded-2xl border border-fuchsia-300/60 bg-black/45 p-4 text-sm font-bold text-fuchsia-100">
      Select the result for every player. Choose SCORE only when you need to enter a numeric score or points value.
    </div>

    {players.length === 0 && (
      <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-300 px-4 py-4 text-black font-black">
        LOCKED — ADD PLAYERS AND WAIT FOR THEM TO ACCEPT BEFORE ENTERING RESULTS.
      </div>
    )}

    <div className="flex flex-col gap-4">
      {players.map((player, playerIndex) => (
        <div
          key={player.uid}
          className="rounded-2xl border-2 border-fuchsia-400/80 bg-black/75 p-4 sm:p-5 shadow-[0_0_22px_rgba(217,70,239,0.22)]"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-[10px] tracking-[0.24em] font-black text-fuchsia-300">
                PLAYER {playerIndex + 1}
              </div>
              <div className="text-xl font-black text-white mt-1">
                {player.displayName}
              </div>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-black ${
                challenge?.typeOfGame === "NASSAU"
                  ? nassauResults[player.uid]?.front9 &&
                    nassauResults[player.uid]?.back9 &&
                    nassauResults[player.uid]?.game &&
                    nassauResults[player.uid]?.units
                    ? "bg-green-400 text-black"
                    : "bg-yellow-300 text-black"
                  : (scoreInputs[player.uid] || "").trim() !== ""
                  ? "bg-green-400 text-black"
                  : "bg-yellow-300 text-black"
              }`}
            >
              {challenge?.typeOfGame === "NASSAU"
                ? nassauResults[player.uid]?.front9 &&
                  nassauResults[player.uid]?.back9 &&
                  nassauResults[player.uid]?.game &&
                  nassauResults[player.uid]?.units
                  ? "COMPLETE"
                  : "REQUIRED"
                : (scoreInputs[player.uid] || "").trim() !== ""
                ? "COMPLETE"
                : "REQUIRED"}
            </div>
          </div>

          {challenge?.typeOfGame === "NASSAU" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["front9", "FRONT 9"],
                ["back9", "BACK 9"],
                ["game", "OVERALL GAME"],
                ["units", "UNITS"],
              ].map(([key, label]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-cyan-300/50 bg-cyan-950/30 p-3"
                >
                  <div className="text-xs font-black tracking-[0.18em] text-cyan-200 mb-2">
                    {label}
                  </div>

                  <select
                    value={
                      nassauResults[player.uid]?.[
                        key as "front9" | "back9" | "game" | "units"
                      ] || ""
                    }
                    onChange={(e) => {
                      setNassauResults((prev) => ({
                        ...prev,
                        [player.uid]: {
                          front9: prev[player.uid]?.front9 || "",
                          back9: prev[player.uid]?.back9 || "",
                          game: prev[player.uid]?.game || "",
                          units: prev[player.uid]?.units || "",
                          [key]: e.target.value,
                        },
                      }));
                      setScoreboardUpdated(false);
                    }}
                    disabled={challenge?.status === "completed"}
                    className="w-full border-2 border-cyan-300 bg-white text-black text-base font-black rounded-xl p-4 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-cyan-300/40"
                  >
                    <option value="">SELECT RESULT</option>
                    <option value="win">WIN</option>
                    <option value="lost">LOST</option>
                    <option value="draw">TIE</option>
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-xs font-black tracking-[0.18em] text-fuchsia-200 mb-2">
                  RESULT
                </div>

                <select
                  value={resultEntryTypes[player.uid] || ""}
                  onChange={(e) => {
                    const selected = e.target.value as
                      | "win"
                      | "lost"
                      | "tie"
                      | "score"
                      | "";

                    setResultEntryTypes((prev) => ({
                      ...prev,
                      [player.uid]: selected,
                    }));

                    setScoreInputs((prev) => {
                      const next = { ...prev };

                      if (selected === "win") next[player.uid] = "win";
                      else if (selected === "lost") next[player.uid] = "lost";
                      else if (selected === "tie") next[player.uid] = "draw";
                      else next[player.uid] = "";

                      return next;
                    });

                    setScoreboardUpdated(false);
                  }}
                  disabled={challenge?.status === "completed"}
                  className="w-full border-2 border-fuchsia-300 bg-white text-black text-base font-black rounded-xl p-4 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-fuchsia-300/40"
                >
                  <option value="">SELECT RESULT</option>
                  <option value="win">WIN</option>
                  <option value="lost">LOST</option>
                  <option value="tie">TIE</option>
                  <option value="score">SCORE</option>
                </select>
              </div>

              {resultEntryTypes[player.uid] === "score" && (
                <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-950/35 p-3">
                  <div className="text-xs font-black tracking-[0.18em] text-yellow-200 mb-2">
                    ENTER SCORE / POINTS
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={scoreInputs[player.uid] || ""}
                    onChange={(e) => {
                      setScoreInputs((prev) => ({
                        ...prev,
                        [player.uid]: e.target.value,
                      }));
                      setScoreboardUpdated(false);
                    }}
                    placeholder="ENTER SCORE"
                    disabled={challenge?.status === "completed"}
                    className="w-full border-2 border-yellow-300 bg-white text-black placeholder:text-gray-500 text-lg font-black rounded-xl p-4 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-yellow-300/40"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* STEP 3 - UPDATE SCOREBOARD */}
    <div
      className={`rounded-3xl border-2 p-5 transition-all ${
        allScoresEntered
          ? "border-orange-300 bg-gradient-to-r from-orange-950/80 to-red-950/80 shadow-[0_0_35px_rgba(251,146,60,0.35)]"
          : "border-gray-700 bg-neutral-950/80"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <div
            className={`text-xs tracking-[0.25em] font-black ${
              allScoresEntered ? "text-orange-300" : "text-gray-500"
            }`}
          >
            STEP 3
          </div>
          <div
            className={`text-2xl sm:text-3xl font-black mt-1 ${
              allScoresEntered ? "text-white" : "text-gray-500"
            }`}
          >
            UPDATE SCOREBOARD
          </div>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-black ${
            scoreboardUpdated
              ? "bg-green-400 text-black"
              : allScoresEntered
              ? "bg-orange-400 text-black"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {scoreboardUpdated
            ? "UPDATED"
            : allScoresEntered
            ? "READY"
            : "LOCKED"}
        </div>
      </div>

      <div
        className={`mb-4 rounded-xl border p-3 text-sm font-bold ${
          allScoresEntered
            ? "border-orange-300/50 bg-black/30 text-orange-100"
            : "border-gray-700 bg-black/30 text-gray-500"
        }`}
      >
        {allScoresEntered
          ? "All player results are complete. Update the scoreboard to unlock finalization."
          : "Complete every required player result above to unlock this step."}
      </div>

      <button
        onClick={handleUpdateScoreboard}
        disabled={
          updating ||
          challenge?.status === "completed" ||
          players.length === 0 ||
          !allScoresEntered
        }
        className="w-full rounded-2xl border-2 border-orange-200 bg-orange-400 px-5 py-4 text-lg font-black tracking-wide text-black shadow-[0_0_28px_rgba(251,146,60,0.5)] transition-all hover:bg-orange-300 hover:scale-[1.01] disabled:border-gray-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {updating
          ? "UPDATING SCOREBOARD..."
          : players.length === 0
          ? "ADD PLAYERS TO CONTINUE"
          : !allScoresEntered
          ? "ENTER ALL RESULTS TO CONTINUE"
          : scoreboardUpdated
          ? "SCOREBOARD UPDATED"
          : "UPDATE SCOREBOARD"}
      </button>
    </div>
  </div>
)}

{/* PLAYER SUMMARY */}
<div className="border-2 border-cyan-400/80 bg-gradient-to-br from-cyan-950/70 via-blue-950/70 to-black rounded-3xl p-5 shadow-[0_0_35px_rgba(34,211,238,0.28)]">
  <div className="flex items-center justify-between gap-3 mb-4">
    <div>
      <div className="text-cyan-300 text-xs tracking-[0.25em] font-black">
        LIVE SCOREBOARD
      </div>
      <div className="text-2xl font-black text-white mt-1">
        PLAYER SUMMARY
      </div>
    </div>

    <div className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-black">
      LIVE
    </div>
  </div>

  <PlayerSummaryList challengeId={challengeId as string} />
</div>

{/* STEP 4 - FINALIZE */}
{isCreator && challenge?.status !== "completed" && players.length > 0 && (
  <div
    className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col gap-4 transition-all ${
      canFinalize
        ? "border-green-300 bg-gradient-to-br from-green-950/85 via-emerald-950/80 to-black shadow-[0_0_45px_rgba(74,222,128,0.45)]"
        : "border-gray-700 bg-neutral-950/85"
    }`}
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <div
          className={`text-xs tracking-[0.25em] font-black ${
            canFinalize ? "text-green-300" : "text-gray-500"
          }`}
        >
          STEP 4
        </div>
        <div
          className={`text-3xl font-black mt-1 ${
            canFinalize ? "text-white" : "text-gray-500"
          }`}
        >
          FINALIZE CHALLENGE
        </div>
      </div>

      <div
        className={`rounded-full px-4 py-2 text-xs font-black ${
          canFinalize
            ? "bg-green-400 text-black"
            : "bg-gray-700 text-gray-300"
        }`}
      >
        {canFinalize ? "READY TO FINALIZE" : "LOCKED"}
      </div>
    </div>

    {!allScoresEntered ? (
      <div className="text-sm font-black text-black bg-yellow-300 border-2 border-yellow-100 rounded-2xl p-4">
        ACTION REQUIRED — ENTER A RESULT FOR EVERY PLAYER.
      </div>
    ) : !scoreboardUpdated ? (
      <div className="text-sm font-black text-black bg-orange-400 border-2 border-orange-200 rounded-2xl p-4">
        ACTION REQUIRED — UPDATE THE SCOREBOARD BEFORE FINALIZING.
      </div>
    ) : (
      <div className="text-sm font-black text-black bg-green-400 border-2 border-green-200 rounded-2xl p-4 shadow-[0_0_24px_rgba(74,222,128,0.35)]">
        READY — RESULTS ARE COMPLETE AND THE SCOREBOARD HAS BEEN UPDATED.
      </div>
    )}

    <div className={canFinalize ? "text-sm text-green-100" : "text-sm text-gray-500"}>
      Check the scoreboard carefully. Once finalized, the challenge cannot be reopened.
    </div>

    <button
      onClick={handleFinalizeChallenge}
      disabled={finalizing || !canFinalize}
      className="w-full rounded-2xl border-2 border-green-200 bg-green-400 px-5 py-5 text-xl font-black tracking-wide text-black shadow-[0_0_32px_rgba(74,222,128,0.5)] transition-all hover:bg-green-300 hover:scale-[1.01] disabled:border-gray-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {finalizing
        ? "FINALIZING..."
        : !allScoresEntered
        ? "ENTER ALL RESULTS TO CONTINUE"
        : !scoreboardUpdated
        ? "UPDATE SCOREBOARD TO CONTINUE"
        : "FINALIZE CHALLENGE"}
    </button>
  </div>
)}

{/* RESULTS */}
{showResults && (
  <div className="border-2 border-yellow-300/80 bg-gradient-to-br from-yellow-950/65 via-amber-950/55 to-black rounded-3xl p-5 shadow-[0_0_35px_rgba(253,224,71,0.25)]">
    <div className="flex items-center justify-between gap-3 mb-4">
      <div>
        <div className="text-yellow-300 text-xs tracking-[0.25em] font-black">
          FINAL RESULTS
        </div>
        <div className="text-2xl font-black text-white mt-1">
          RESULTS
        </div>
      </div>

      {challenge.status === "completed" && (
        <div className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">
          FINAL
        </div>
      )}
    </div>

    <ResultsList challengeId={challengeId as string} />
  </div>
)}
      </div>
    </main>
  );
}
