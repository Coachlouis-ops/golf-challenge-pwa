"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { db, functions } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";
import { JOIN_RETURN_KEY, readMatchSetup } from "@/src/lib/challengeMatch";
import { getWalletBalance } from "@/src/lib/walletBalance";
import { formatWalletRand } from "@/src/lib/walletMoney";

function JoinChallengeSpotPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Opening your place in the match...");
  const challengeId = Array.isArray(params?.challengeId)
    ? params.challengeId[0]
    : params?.challengeId;
  const sideId = searchParams.get("side") || "";
  const spotId = searchParams.get("spot") || "";

  useEffect(() => {
    if (loading) return;

    const returnPath =
      typeof window === "undefined"
        ? ""
        : `${window.location.pathname}${window.location.search}`;

    if (!user) {
      sessionStorage.setItem(JOIN_RETURN_KEY, returnPath);
      router.replace("/login");
      return;
    }

    if (!challengeId || !sideId || !spotId) return;

    const uid = user.uid;

    (async () => {
      try {
        const challengeSnap = await getDoc(doc(db, "challenges", challengeId));
        if (!challengeSnap.exists()) {
          throw new Error("This match no longer exists.");
        }

        const challengeData = challengeSnap.data();
        const setupPreview = readMatchSetup(challengeData);
        const bet = Number(
          setupPreview?.betAmount ||
            challengeData.betAmount ||
            challengeData.entryTokens ||
            0
        );
        const balance = await getWalletBalance(uid);

        if (bet > 0 && balance < bet) {
          setMessage(
            `This match needs ${formatWalletRand(bet)} per player. Your wallet has ${formatWalletRand(balance)}.`
          );
          return;
        }

        const acceptInvite = httpsCallable(functions, "acceptInviteSecure");
        await acceptInvite({ challengeId });

        const profileSnap = await getDoc(doc(db, "profiles", uid));
        const profile = profileSnap.exists() ? profileSnap.data() : null;
        const playerName = [profile?.name, profile?.surname]
          .filter(Boolean)
          .join(" ")
          .trim() || user.displayName || "Player";

        await runTransaction(db, async (transaction) => {
          const ref = doc(db, "challenges", challengeId);
          const snap = await transaction.get(ref);
          if (!snap.exists()) throw new Error("This match no longer exists.");

          const setup = readMatchSetup(snap.data());
          if (!setup) {
            throw new Error("This match has no lineup to join.");
          }

          let placed = false;
          const sides = setup.sides.map((side) => ({
            ...side,
            spots: side.spots.map((spot) => {
              if (spot.id !== spotId || side.id !== sideId) return spot;
              if (spot.playerUid && spot.playerUid !== uid) {
                throw new Error("That spot has already been taken.");
              }
              placed = true;
              return { ...spot, playerUid: uid, playerName };
            }),
          }));

          if (!placed) throw new Error("That spot is not on this match.");

          transaction.update(ref, {
            matchSetup: { ...setup, sides },
          });
        });

        router.replace(`/challenges/${challengeId}`);
      } catch (error: unknown) {
        const messageText =
          error instanceof Error
            ? error.message
            : "The place could not be accepted.";
        setMessage(messageText);
      }
    })();
  }, [user, loading, challengeId, sideId, spotId, router]);

  const displayMessage =
    !challengeId || !sideId || !spotId
      ? "This invite link is missing the side or the spot."
      : message;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm text-gray-200">{displayMessage}</p>
        {displayMessage.includes("Your wallet has") && (
          <button
            type="button"
            onClick={() => router.push("/payment")}
            className="rounded-xl bg-green-400 px-5 py-3 text-sm font-black text-black"
          >
            Add money
          </button>
        )}
      </div>
    </main>
  );
}

export default function JoinChallengeSpotRoute() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <p>Opening your place in the match...</p>
        </main>
      }
    >
      <JoinChallengeSpotPage />
    </Suspense>
  );
}
