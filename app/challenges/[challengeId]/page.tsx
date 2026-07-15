
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

  const [finalizing, setFinalizing] = useState(false);

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

      const scores = Object.entries(scoreInputs).map(([uid, score]) => ({
        uid,
        score,
      }));

      await updateScoreboard({
        challengeId,
        scores,
      });

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
      alert(e.message || "Failed to update scoreboard");
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

    const confirmFinalize = window.confirm(
      "Are you sure you want to finalize this challenge?\n\nThis action cannot be undone."
    );

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
      alert(e.message || "Failed to finalize challenge");
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
    challenge.status === "active" || challenge.status === "completed";

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
        alt="Badger illustration"
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6">
        <div className="flex justify-end">
          <button
            onClick={handleRefresh}
            className="bg-green-500 text-black px-4 py-2 rounded font-semibold shadow-[0_0_20px_rgba(57,255,20,0.6)] hover:scale-[1.02] transition"
          >
            Refresh
          </button>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mb-4 text-sm underline"
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

        <h1 className="text-2xl font-semibold">{challenge.challengeTitle}</h1>

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

        <div className="border rounded p-4 flex flex-col gap-2">
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
<div className="border rounded p-4 flex flex-col gap-3">

          <h2 className="font-semibold">Invite Players</h2>

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

        {/* ENTER RESULTS */}
        {isCreator && (
          <div className="border border-red-500/30 bg-black/30 rounded-2xl p-5 flex flex-col gap-5 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
            <div>
              <div className="text-red-400 text-xs tracking-[0.25em] font-bold">
                LIVE MATCH CONTROL
              </div>
              <div className="text-2xl font-extrabold text-white mt-1">
                ENTER RESULTS
              </div>
            </div>

            <div className="text-sm text-red-100 leading-relaxed">
              After completion of challenge enter the scores/results and update
              scoreboard. Scoreboard can be updated as scores are being added.
            </div>

            <div className="text-xs text-red-300 bg-black/30 border border-red-500/20 rounded-xl p-3">
              Once finalized the challenge cannot be reopened.
            </div>

            {players.length === 0 && (
              <p className="text-sm text-red-300">
                No players available for scoring yet.
              </p>
            )}

            {players.map((player) => (
              <div
                key={player.uid}
                className="border border-red-500/20 rounded-2xl p-4 bg-black/40 flex flex-col gap-3"
              >
                <label className="text-sm font-semibold text-red-100">
                  Score for {player.displayName}
                </label>

                {challenge?.typeOfGame?.toLowerCase().includes("match") ? (
                  <select
                    value={scoreInputs[player.uid] || ""}
                    onChange={(e) =>
                      setScoreInputs((prev) => ({
                        ...prev,
                        [player.uid]: e.target.value,
                      }))
                    }
                    disabled={challenge?.status === "completed"}
                    className="border border-red-500/30 bg-black/50 text-white rounded-xl p-3 disabled:opacity-50 focus:outline-none focus:border-red-400 focus:shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                  >
                    <option value="">Select result</option>
                    <option value="win">Win</option>
                    <option value="lost">Lost</option>
                    <option value="draw">Draw</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={scoreInputs[player.uid] || ""}
                    onChange={(e) =>
                      setScoreInputs((prev) => ({
                        ...prev,
                        [player.uid]: e.target.value,
                      }))
                    }
                    placeholder={
                      challenge?.typeOfGame?.toLowerCase().includes("match")
                        ? "win / lost / draw"
                        : "score / points / win / lost / draw"
                    }
                    disabled={challenge?.status === "completed"}
                    className="border border-red-500/30 bg-black/50 text-white rounded-xl p-3 disabled:opacity-50 focus:outline-none focus:border-red-400 focus:shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleUpdateScoreboard}
              disabled={
                updating || challenge?.status === "completed" || players.length === 0
              }
              className="bg-red-600 text-white px-5 py-3 rounded-2xl font-bold tracking-wide hover:bg-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.7)] hover:scale-[1.02] transition-all disabled:opacity-30"
            >
              {updating ? "UPDATING SCOREBOARD..." : "UPDATE SCOREBOARD"}
            </button>
          </div>
        )}

        {/* FINALIZE */}
        {isCreator && challenge?.status !== "completed" && players.length > 0 && (
          <div className="border border-red-500/30 bg-red-950/20 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_0_30px_rgba(255,0,0,0.25)]">
            <div>
              <div className="text-red-400 text-xs tracking-[0.25em] font-bold">
                FINAL STEP
              </div>
              <div className="text-2xl font-extrabold text-red-200 mt-1">
                FINALIZE CHALLENGE
              </div>
            </div>

            <div className="text-sm text-red-100 leading-relaxed">
              Once finalized the challenge cannot be reopened. Rankings, results
              and winnings will lock permanently.
            </div>

            <div className="text-xs text-red-300 bg-black/30 border border-red-500/20 rounded-xl p-3">
              Make sure all player scores/results have been entered correctly
              before finalizing.
            </div>

            <button
              onClick={handleFinalizeChallenge}
              disabled={finalizing}
              className="bg-red-600 text-white px-5 py-3 rounded-2xl font-bold tracking-wide hover:bg-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.7)] hover:scale-[1.02] transition-all disabled:opacity-40"
            >
              {finalizing ? "FINALIZING..." : "FINALIZE CHALLENGE"}
            </button>
          </div>
        )}

        {/* PARTICIPANTS */}
        <div className="border border-red-500/20 bg-black/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(255,0,0,0.15)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-red-400 text-xs tracking-[0.25em] font-bold">
                CHALLENGE STAGE
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

        {/* PLAYER SUMMARY */}
        <div className="border border-red-500/20 bg-black/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(255,0,0,0.15)]">
          <div className="mb-4">
            <div className="text-red-400 text-xs tracking-[0.25em] font-bold">
              LIVE SCOREBOARD
            </div>
            <div className="text-xl font-bold text-white mt-1">
              PLAYER SUMMARY
            </div>
          </div>

          <PlayerSummaryList challengeId={challengeId as string} />
        </div>

        {/* RESULTS */}
        {showResults && (
          <div className="border border-red-500/20 bg-black/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(255,0,0,0.15)]">
            <div className="mb-4">
              <div className="text-red-400 text-xs tracking-[0.25em] font-bold">
                FINAL RESULTS
              </div>
              <div className="text-xl font-bold text-white mt-1">RESULTS</div>
            </div>

            <ResultsList challengeId={challengeId as string} />
          </div>
        )}
      </div>
    </main>
  );
}
