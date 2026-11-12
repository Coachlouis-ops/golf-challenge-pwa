"use client";

import { useEffect, useMemo, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, functions } from "@/src/lib/firebase";
import { getWalletBalance } from "@/src/lib/walletBalance";
import { formatWalletRand } from "@/src/lib/walletMoney";
import RequireAuth from "@/src/lib/RequireAuth";
import GolfCourseSearch from "@/src/components/GolfCourseSearch";
import SiteFooter from "@/src/components/SiteFooter";
import MatchLineup from "@/src/components/MatchLineup";
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";
import {
  BET_AMOUNTS,
  type ScoringMethod,
  formatRand,
  withinPlayingSpotCap,
} from "@/src/lib/gameEngine";
import {
  type MatchSetup,
  type PlayMode,
  MODE_OPTIONS,
  buildMatchSetup,
  canEditMatch,
  resultsHaveBeenSubmitted,
  formatLabel,
  formatsForMode,
  guideLines,
  isCallableFieldError,
  joinPath,
  legacyOnlyPayload,
  modeLabel,
  readMatchSetup,
  scoringLabel,
  setupIsReady,
  toCallablePayload,
  whatsAppInviteUrl,
} from "@/src/lib/challengeMatch";

const fieldClass =
  "w-full bg-black border-2 border-cyan-400 rounded-xl px-4 py-4 text-base font-bold text-white outline-none shadow-[0_0_18px_rgba(34,211,238,0.35)] focus:border-cyan-200";

function freshSetup(): MatchSetup {
  return buildMatchSetup({
    title: "",
    mode: "singles",
    format: "stroke_play",
    scoringMethod: "strokes",
    betAmount: 0,
    sideCount: 2,
    playersPerSide: 1,
    courseName: "",
    courseStateProvince: "",
    courseCountry: "",
  });
}

export default function CreateChallengePage() {
  const router = useRouter();
  const { teezAlert } = useTeezNotification();
  const [setup, setSetup] = useState<MatchSetup>(freshSetup);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [status, setStatus] = useState("created");
  const [resultsSubmitted, setResultsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupChoices, setGroupChoices] = useState<{ id: string; name: string }[]>([]);
  const [askForGroup, setAskForGroup] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [needsMoney, setNeedsMoney] = useState(false);

  const locked = setup.detailsLocked;
  const formats = formatsForMode(setup.mode);
  const guide = useMemo(() => guideLines(setup), [setup]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const suppliedGroupId = params.get("groupId");
    const challengeId = params.get("challengeId");
    if (suppliedGroupId) setGroupId(suppliedGroupId);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      setWalletBalance(await getWalletBalance(user.uid));

      if (!suppliedGroupId) {
        const snapshot = await getDocs(
          query(collection(db, "groups"), where("creatorUid", "==", user.uid))
        );
        setGroupChoices(
          snapshot.docs
            .filter((item) => item.data().status === "active")
            .map((item) => ({
              id: item.id,
              name: String(item.data().groupName || item.data().name || "Unnamed group"),
            }))
        );
      }

      if (!challengeId) return;

      const snap = await getDoc(doc(db, "challenges", challengeId));
      if (!snap.exists()) return;
      const data = snap.data();
      if (data.creatorUid !== user.uid) return;

      const loaded = readMatchSetup(data);
      if (loaded) {
        setSetup({ ...loaded, detailsLocked: true });
      }
      setSavedId(challengeId);
      setStatus(String(data.status || "created"));
      setResultsSubmitted(resultsHaveBeenSubmitted(data));
      if (data.groupId) setGroupId(String(data.groupId));
    });

    return () => unsubscribe();
  }, []);

  function reshape(next: Partial<MatchSetup> & { mode?: PlayMode; format?: string }) {
    const mode = next.mode || setup.mode;
    const format =
      next.format ||
      (next.mode && next.mode !== setup.mode ? formatsForMode(mode)[0].value : setup.format);

    setSetup(
      buildMatchSetup({
        title: next.title ?? setup.title,
        mode,
        format,
        scoringMethod: (next.scoringMethod || setup.scoringMethod) as ScoringMethod,
        betAmount: next.betAmount ?? setup.betAmount,
        sideCount: next.sideCount ?? setup.sideCount,
        playersPerSide: next.playersPerSide ?? setup.playersPerSide,
        courseName: next.courseName ?? setup.courseName,
        courseStateProvince: next.courseStateProvince ?? setup.courseStateProvince,
        courseCountry: next.courseCountry ?? setup.courseCountry,
        previous: setup,
      })
    );
    setShowGuide(false);
  }

  async function openInvite(sideName: string, spotNumber: number, spotId: string, sideId: string) {
    if (!savedId) {
      await teezAlert({
        title: "SAVE THE MATCH FIRST",
        message:
          "Create the game before sending the invite. The link then carries this side and this spot, so the player is placed there when they accept.",
        type: "warning",
        buttonText: "CONTINUE",
      });
      return;
    }

    const joinUrl = `${window.location.origin}${joinPath(savedId, sideId, spotId)}`;
    const url = whatsAppInviteUrl({
      title: setup.title.trim() || "your match",
      sideName,
      spotNumber,
      joinUrl,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function persistSetup(next: MatchSetup, id: string) {
    await updateDoc(doc(db, "challenges", id), toCallablePayload(next, groupId));
  }

  async function handleCreateGame() {
    const problem = setupIsReady(setup);
    if (problem) {
      await teezAlert({
        title: "MATCH NOT READY",
        message: problem,
        type: "warning",
        buttonText: "CONTINUE",
      });
      return;
    }

    if (
      (setup.mode === "teams" || setup.mode === "groups") &&
      !withinPlayingSpotCap(setup.sideCount, setup.playersPerSide)
    ) {
      return;
    }

    const uid = auth.currentUser?.uid;
    const balance = uid ? await getWalletBalance(uid) : 0;
    setWalletBalance(balance);

    if (balance < setup.betAmount) {
      setNeedsMoney(true);
      await teezAlert({
        title: "WALLET DOES NOT COVER THE BET",
        message: `This match needs ${formatWalletRand(setup.betAmount)} per player. Your wallet has ${formatWalletRand(balance)}. Add money, then create the game.`,
        type: "warning",
        buttonText: "CONTINUE",
      });
      return;
    }

    setNeedsMoney(false);

    try {
      setLoading(true);
      const createChallenge = httpsCallable(functions, "createChallenge");
      let challengeId = savedId;

      if (!challengeId) {
        try {
          const result = await createChallenge(toCallablePayload(setup, groupId));
          challengeId = String((result.data as { challengeId?: string }).challengeId || "");
        } catch (error: unknown) {
          const callableError = error as { code?: string; message?: string };
          const message = String(callableError.message || "");
          if (message.toLowerCase().includes("group") && !groupId) {
            setAskForGroup(true);
            throw error;
          }

          if (!isCallableFieldError(callableError)) throw error;

          const retry = await createChallenge(legacyOnlyPayload(setup, groupId));
          challengeId = String((retry.data as { challengeId?: string }).challengeId || "");
        }
      }

      if (!challengeId) {
        throw new Error("The match was not given an id.");
      }

      const lockedSetup = { ...setup, detailsLocked: true };
      try {
        await persistSetup(lockedSetup, challengeId);
      } catch {
        await teezAlert({
          title: "MATCH SAVED WITH A LIMIT",
          message:
            "The match was created, but the lineup could not be written onto the match record from this page. The save function may still be keeping only the original fields.",
          type: "warning",
          buttonText: "CONTINUE",
        });
      }

      setSetup(lockedSetup);
      setSavedId(challengeId);
      setShowGuide(false);
      window.history.replaceState(null, "", `/challenges/create?challengeId=${challengeId}`);
    } catch (error: unknown) {
      const messageText =
        error instanceof Error ? error.message : "The match could not be saved.";
      await teezAlert({
        title: "MATCH NOT CREATED",
        message: messageText,
        type: "error",
        buttonText: "TRY AGAIN",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleEdit() {
    if (!canEditMatch(status, resultsSubmitted)) {
      void teezAlert({
        title: "MATCH IS CLOSED",
        message: "This match can no longer be edited because results have been entered.",
        type: "warning",
        buttonText: "CONTINUE",
      });
      return;
    }

    setSetup((current) => ({ ...current, detailsLocked: false }));
    setShowGuide(false);
  }

  const sideWord = setup.mode === "groups" ? "groups" : "teams";

  return (
    <RequireAuth>
      <main className="relative min-h-screen overflow-hidden bg-black px-4 py-8 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#39FF14_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[900px] -translate-x-1/2 bg-green-400 opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl border border-neutral-700 bg-neutral-900/80 p-4 shadow-[0_0_40px_rgba(0,255,120,0.25)] backdrop-blur-xl sm:p-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="self-start text-xs font-bold text-gray-300 underline"
          >
            Back
          </button>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold tracking-[0.22em] text-cyan-200">
              MATCH TITLE
            </span>
            <input
              type="text"
              name="matchTitle"
              required
              value={setup.title}
              disabled={locked}
              placeholder="Enter the name of your match"
              onChange={(event) =>
                setSetup((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full rounded-xl border-2 border-zinc-300 bg-black px-4 py-4 text-base font-semibold text-white outline-none placeholder:text-zinc-400 shadow-[0_0_16px_rgba(212,212,216,0.28)] focus:border-cyan-300 focus:shadow-[0_0_24px_rgba(34,211,238,0.85)] disabled:opacity-70 sm:text-lg"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-cyan-300">
            Total players
            <select
              disabled={locked}
              value={setup.mode}
              onChange={(event) => reshape({ mode: event.target.value as PlayMode })}
              className={fieldClass}
            >
              {MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-xs font-medium text-gray-400">
              {MODE_OPTIONS.find((option) => option.value === setup.mode)?.detail}
            </span>
          </label>

          {(setup.mode === "teams" || setup.mode === "groups") && (
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-bold text-cyan-300">
                {setup.mode === "groups" ? "Groups" : "Teams"}
                <input
                  type="number"
                  min={2}
                  disabled={locked}
                  value={setup.sideCount}
                  onChange={(event) =>
                    reshape({ sideCount: Number(event.target.value || 2) })
                  }
                  className={`${fieldClass} mt-2`}
                />
              </label>
              <label className="text-sm font-bold text-cyan-300">
                Players
                <input
                  type="number"
                  min={1}
                  disabled={locked}
                  value={setup.playersPerSide}
                  onChange={(event) =>
                    reshape({ playersPerSide: Number(event.target.value || 1) })
                  }
                  className={`${fieldClass} mt-2`}
                />
              </label>
              <p className="col-span-2 text-sm text-gray-300">
                {setup.sideCount} {sideWord} of {setup.playersPerSide} players.
                {withinPlayingSpotCap(setup.sideCount, setup.playersPerSide)
                  ? ""
                  : " That is over the 248 playing-spot limit."}
              </p>
            </div>
          )}

          {(setup.mode === "teams" || setup.mode === "groups") && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {setup.sides.map((side, index) => (
                <label key={side.id} className="text-sm font-bold text-cyan-300">
                  {setup.mode === "groups" ? `Group ${index + 1}` : `Team ${index + 1}`}
                  <input
                    disabled={locked}
                    value={side.name}
                    onChange={(event) =>
                      setSetup((current) => ({
                        ...current,
                        sides: current.sides.map((item) =>
                          item.id === side.id ? { ...item, name: event.target.value } : item
                        ),
                      }))
                    }
                    className={`${fieldClass} mt-2`}
                  />
                </label>
              ))}
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-bold text-cyan-300">Format</p>
            <div className="flex flex-wrap gap-2">
              {formats.map((format) => (
                <button
                  key={format.value}
                  type="button"
                  disabled={locked}
                  onClick={() => reshape({ format: format.value })}
                  className={`rounded-full border px-3 py-2 text-xs font-bold sm:text-sm ${
                    setup.format === format.value
                      ? "border-green-400 bg-green-400 text-black"
                      : "border-neutral-600 bg-neutral-800 text-gray-200"
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>

          {setup.mode !== "singles" && (
            <div>
              <p className="mb-2 text-sm font-bold text-cyan-300">Scoring method</p>
              <div className="flex flex-wrap gap-2">
                {(["strokes", "points", "matchplay"] as ScoringMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    disabled={locked}
                    onClick={() => reshape({ scoringMethod: method })}
                    className={`rounded-full border px-3 py-2 text-xs font-bold sm:text-sm ${
                      setup.scoringMethod === method
                        ? "border-green-400 bg-green-400 text-black"
                        : "border-neutral-600 bg-neutral-800 text-gray-200"
                    }`}
                  >
                    {scoringLabel(method)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 text-sm font-bold text-cyan-300">Add bet</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {BET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  disabled={locked}
                  onClick={() => setSetup((current) => ({ ...current, betAmount: amount }))}
                  className={`rounded-xl border py-3 text-sm font-black ${
                    setup.betAmount === amount
                      ? "border-green-400 bg-green-400 text-black"
                      : "border-cyan-400/40 bg-black text-white"
                  }`}
                >
                  {formatRand(amount)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">Per player.</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-cyan-300">Select golf course</p>
            {locked ? (
              <p className={`${fieldClass} text-white`}>{setup.courseName}</p>
            ) : (
              <GolfCourseSearch
                value={setup.courseName}
                placeholder="Select golf course"
                className={fieldClass}
                onSelect={(course) =>
                  setSetup((current) => ({
                    ...current,
                    courseName: course.name,
                    courseStateProvince: course.stateProvince,
                    courseCountry: course.country,
                  }))
                }
              />
            )}
          </div>

          <MatchLineup
            setup={setup}
            locked={locked}
            onChange={setSetup}
            onInvite={(side, spot) =>
              void openInvite(side.name, spot.number, spot.id, side.id)
            }
          />

          {askForGroup && (
            <label className="flex flex-col gap-2 text-sm font-bold text-yellow-200">
              The current save still needs one of your groups
              <select
                value={groupId || ""}
                onChange={(event) => setGroupId(event.target.value || null)}
                className={fieldClass}
              >
                <option value="">Choose a group</option>
                {groupChoices.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          {showGuide && (
            <section className="rounded-3xl border border-green-400/40 bg-black/60 p-5">
              <p className="text-xs font-bold tracking-[0.25em] text-green-400">
                GAME ENGINE GUIDE
              </p>
              <h2 className="mt-2 text-2xl font-black">{setup.title.trim()}</h2>
              <dl className="mt-4 flex flex-col gap-3">
                {guide.map((line) => (
                  <div key={line.label}>
                    <dt className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                      {line.label}
                    </dt>
                    <dd className="text-sm text-gray-100">{line.value}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => void handleCreateGame()}
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-green-400 py-4 text-lg font-black text-black disabled:opacity-50"
              >
                {loading ? "Saving..." : savedId ? "Save game" : "Create game"}
              </button>
            </section>
          )}

          {needsMoney && (
            <button
              type="button"
              onClick={() => router.push("/payment")}
              className="rounded-xl border border-green-400 py-3 text-sm font-black text-green-300"
            >
              Add money
              {walletBalance !== null ? ` · wallet ${formatWalletRand(walletBalance)}` : ""}
            </button>
          )}

          {!showGuide && (
            <button
              type="button"
              disabled={locked || loading}
              onClick={async () => {
                const problem = setupIsReady(setup);
                if (problem) {
                  await teezAlert({
                    title: "MATCH NOT READY",
                    message: problem,
                    type: "warning",
                    buttonText: "CONTINUE",
                  });
                  return;
                }
                setShowGuide(true);
              }}
              className="rounded-xl bg-green-400 py-4 text-lg font-black text-black disabled:opacity-50"
            >
              Create match
            </button>
          )}

          <button
            type="button"
            onClick={handleEdit}
            disabled={!savedId}
            className="rounded-xl border border-cyan-300 py-3 text-sm font-black text-cyan-200 disabled:opacity-40"
          >
            Edit match
          </button>

          {savedId && (
            <button
              type="button"
              onClick={() => router.push(`/challenges/${savedId}`)}
              className="text-sm font-bold text-green-300 underline"
            >
              Open {modeLabel(setup.mode).toLowerCase()} match
            </button>
          )}

          <p className="text-center text-xs text-gray-500">
            {formatLabel(setup.format)} · {scoringLabel(setup.scoringMethod)}
            {setup.betAmount ? ` · ${formatRand(setup.betAmount)} per player` : ""}
          </p>
        </div>
      </main>
      <SiteFooter />
    </RequireAuth>
  );
}
