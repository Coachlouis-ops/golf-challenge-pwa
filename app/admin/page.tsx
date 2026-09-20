"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/src/lib/firebase";
import {
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { useAuth } from "@/src/lib/AuthContext";
import { useTeezNotification } from "@/src/components/TeezNotificationProvider";

import {
  IMPROVE_PLAYER_BOOSTERS,
} from "@/src/data/improvePlayerBoosters";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

type ImprovePlayerBoosterRequest = {
  id: string;
  requestId: string;
  playerUid: string;
  playerName: string;
  playerEmail: string;
  playerPhone: string;
  ballNumber: number;
  category: string;
  productCode: string;
  productName: string;
  productDescription: string;
  productImage: string;
  status: string;
  requestedAt?: any;
};


type BattleCharacterPlayer = {
  uid: string;
  name?: string;
  surname?: string;
  battleName?: string;
  email?: string;
  battleCharacterName?: string;
  battleCharacterImageUrl?: string;
  battleCharacterStoragePath?: string;
};


type MembershipPayment = {
  id: string;
  userId: string;
  email: string;
  amount: number;
  reference: string;
  selectedBank: string;
  status: string;
  paymentType: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { teezAlert, teezConfirm } = useTeezNotification();
  const [testPlayerUid, setTestPlayerUid] =
  useState("");

const [grantingTestBall, setGrantingTestBall] =
  useState(false);


  const [
  openingTestImproveBall,
  setOpeningTestImproveBall,
] = useState(false);

async function grantTestBoosterBall() {
  const uid = testPlayerUid.trim();

  if (!uid) {
  await teezAlert({
    message: "Enter the player's UID.",
    type: "warning",
  });
  return;
}
  try {
    setGrantingTestBall(true);

    const functions =
      getFunctions(undefined, "europe-west1");

    const grantBall = httpsCallable<
      { uid: string },
      {
        success: boolean;
        uid: string;
        granted: number;
      }
    >(
      functions,
      "grantTestBoosterBall"
    );

    await grantBall({ uid });

  await teezAlert({
  message: "1 test Booster Ball granted.",
  type: "success",
});

    setTestPlayerUid("");
  } catch (e: any) {
    console.error(
      "GRANT TEST BOOSTER BALL ERROR:",
      e
    );

    await teezAlert({
  message:
    e?.message ||
    "Could not grant test Booster Ball.",
  type: "error",
});
  } finally {
    setGrantingTestBall(false);
  }
}

async function openTestImprovePlayerBoosterBall() {
  const uid = testPlayerUid.trim();

if (!uid) {
  await teezAlert({
    message: "Enter the player's UID.",
    type: "warning",
  });
  return;
}

  try {
    setOpeningTestImproveBall(true);

    const functions =
      getFunctions(undefined, "europe-west1");

    const openImproveBall = httpsCallable<
      { uid: string },
      {
        success: boolean;
        ball: {
          uid: string;
          ballNumber: number;
          ballType: "improve_player";
          boosterType: string;
        };
      }
    >(
      functions,
      "grantTestImprovePlayerBoosterBall"
    );

    const response =
      await openImproveBall({ uid });

    const ball = response.data.ball;
await teezAlert({
  message: `Improve Player Booster granted.\n\nBall: ${ball.ballNumber}\nCategory: ${ball.boosterType}`,
  type: "success",
});
  } catch (e: any) {
    console.error(
      "OPEN TEST IMPROVE PLAYER BALL ERROR:",
      e
    );

    await teezAlert({
  message:
    e?.message ||
    "Could not open Improve Player Booster Ball.",
  type: "error",
});
  } finally {
    setOpeningTestImproveBall(false);
  }
}


const [battleCharacterPlayers, setBattleCharacterPlayers] =
  useState<BattleCharacterPlayer[]>([]);

const [battleCharacterSearch, setBattleCharacterSearch] =
  useState("");

const [selectedBattleCharacterPlayer, setSelectedBattleCharacterPlayer] =
  useState<BattleCharacterPlayer | null>(null);

const [battleCharacterName, setBattleCharacterName] =
  useState("");

const [battleCharacterFile, setBattleCharacterFile] =
  useState<File | null>(null);

const [uploadingBattleCharacter, setUploadingBattleCharacter] =
  useState(false);

const [loadingBattleCharacterPlayers, setLoadingBattleCharacterPlayers] =
  useState(false);



const [payments, setPayments] =
  useState<MembershipPayment[]>([]);

const [loadingPayments, setLoadingPayments] =
  useState(true);


const [
  boosterRequests,
  setBoosterRequests,
] = useState<ImprovePlayerBoosterRequest[]>([]);

const [
  loadingBoosterRequests,
  setLoadingBoosterRequests,
] = useState(true);

 useEffect(() => {
  loadMembershipPayments();
  loadBoosterRequests();
  loadBattleCharacterPlayers();
}, []);


async function loadBattleCharacterPlayers() {
  try {
    setLoadingBattleCharacterPlayers(true);

    const snap = await getDocs(
      collection(db, "profiles")
    );

    const players = snap.docs.map((playerDoc) => ({
      uid: playerDoc.id,
      ...(playerDoc.data() as Omit<
        BattleCharacterPlayer,
        "uid"
      >),
    }));

    players.sort((a, b) => {
      const nameA =
        `${a.name || ""} ${a.surname || ""}`.trim();

      const nameB =
        `${b.name || ""} ${b.surname || ""}`.trim();

      return nameA.localeCompare(nameB);
    });

    setBattleCharacterPlayers(players);
  } catch (e: any) {
    console.error(
      "LOAD BATTLE CHARACTER PLAYERS ERROR:",
      e
    );

    await teezAlert({
      message:
        e?.message ||
        "Could not load players.",
      type: "error",
    });
  } finally {
    setLoadingBattleCharacterPlayers(false);
  }
}

async function assignBattleCharacter() {
  if (!selectedBattleCharacterPlayer) {
    await teezAlert({
      message: "Select a player first.",
      type: "warning",
    });
    return;
  }

  if (!battleCharacterName.trim()) {
    await teezAlert({
      message: "Enter the Battle Character name.",
      type: "warning",
    });
    return;
  }

  if (!battleCharacterFile) {
    await teezAlert({
      message: "Select a Battle Character image.",
      type: "warning",
    });
    return;
  }

  try {
    setUploadingBattleCharacter(true);

    const playerUid =
      selectedBattleCharacterPlayer.uid;

    const extension =
      battleCharacterFile.name
        .split(".")
        .pop()
        ?.toLowerCase() || "png";

    const storagePath =
      `battle-characters/${playerUid}/battle-character.${extension}`;

    const imageRef = ref(
      storage,
      storagePath
    );

    await uploadBytes(
      imageRef,
      battleCharacterFile,
      {
        contentType:
          battleCharacterFile.type ||
          "image/png",
      }
    );

    const imageUrl =
      await getDownloadURL(imageRef);

    const functions =
      getFunctions(
        undefined,
        "europe-west1"
      );

    const assignCharacter = httpsCallable<
      {
        playerUid: string;
        battleCharacterName: string;
        battleCharacterImageUrl: string;
        battleCharacterStoragePath: string;
      },
      {
        success: boolean;
      }
    >(
      functions,
      "assignBattleCharacter"
    );

    await assignCharacter({
      playerUid,
      battleCharacterName:
        battleCharacterName.trim(),
      battleCharacterImageUrl:
        imageUrl,
      battleCharacterStoragePath:
        storagePath,
    });

    await teezAlert({
      message:
        "Battle Character assigned successfully.",
      type: "success",
    });

    setBattleCharacterFile(null);
    setBattleCharacterName("");

    await loadBattleCharacterPlayers();

    setSelectedBattleCharacterPlayer(
      (current) =>
        current
          ? {
              ...current,
              battleCharacterName:
                battleCharacterName.trim(),
              battleCharacterImageUrl:
                imageUrl,
              battleCharacterStoragePath:
                storagePath,
            }
          : null
    );
  } catch (e: any) {
    console.error(
      "ASSIGN BATTLE CHARACTER ERROR:",
      e
    );

    await teezAlert({
      message:
        e?.message ||
        "Could not assign Battle Character.",
      type: "error",
    });
  } finally {
    setUploadingBattleCharacter(false);
  }
}


  async function loadMembershipPayments() {
    try {
      setLoadingPayments(true);

      const q = query(
        collection(db, "membershipPayments"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      const rows = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<MembershipPayment, "id">),
      }));

      setPayments(rows);
    } catch (e) {
      console.log("LOAD MEMBERSHIP PAYMENTS ERROR:", e);
    } finally {
      setLoadingPayments(false);
    }
  }


async function loadBoosterRequests() {
  try {
    setLoadingBoosterRequests(true);

    const q = query(
      collection(
        db,
        "improvePlayerBoosterRequests"
      ),
      orderBy("requestedAt", "desc")
    );

    const snap = await getDocs(q);

    const rows = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<
        ImprovePlayerBoosterRequest,
        "id"
      >),
    }));

    setBoosterRequests(rows);
  } catch (e) {
    console.error(
      "LOAD BOOSTER REQUESTS ERROR:",
      e
    );
  } finally {
    setLoadingBoosterRequests(false);
  }
}

async function updateBoosterRequestStatus(
  request: ImprovePlayerBoosterRequest,
  status: "processing" | "contacted" | "fulfilled"
) {
  try {
    await updateDoc(
      doc(
        db,
        "improvePlayerBoosterRequests",
        request.id
      ),
      {
        status,
        updatedAt: serverTimestamp(),
        [`${status}At`]: serverTimestamp(),
        [`${status}By`]:
          user?.uid || "admin",
      }
    );

    await loadBoosterRequests();
  } catch (e: any) {
    console.error(
      "UPDATE BOOSTER REQUEST ERROR:",
      e
    );

    await teezAlert({
  message:
    e?.message ||
    "Could not update Booster request.",
  type: "error",
});
  }
}

function contactBoosterPlayer(
  request: ImprovePlayerBoosterRequest
) {
  const subject =
    encodeURIComponent(
      `TEEZ Improve Player Booster - ${request.productName}`
    );

  const body =
    encodeURIComponent(
      `Hi ${request.playerName || "TEEZ Player"},

We are contacting you regarding your Improve Player Booster.

Booster Ball: ${request.ballNumber}
Category: ${request.category}
Item Code: ${request.productCode}
Product: ${request.productName}
Description: ${request.productDescription}

We will arrange fulfilment and delivery with you directly.

Regards,
TEEZ Golf Challenges`
    );

  window.location.href =
    `mailto:${request.playerEmail}?subject=${subject}&body=${body}`;
}


  async function approvePayment(payment: MembershipPayment) {
  const confirmed = await teezConfirm({
  message: `Approve membership payment for ${payment.email}?`,
  type: "warning",
  confirmText: "APPROVE",
  cancelText: "CANCEL",
});

if (!confirmed) return;

    try {
      await updateDoc(doc(db, "membershipPayments", payment.id), {
        status: "approved",
        approvedAt: serverTimestamp(),
        approvedBy: user?.uid || "admin",
        updatedAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "users", payment.userId), {
        membershipStatus: "approved",
        canCreateProfile: true,
        membershipApprovedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await loadMembershipPayments();

      await teezAlert({
  message: "Membership approved",
  type: "success",
});
    } catch (e: any) {
      console.log("APPROVE PAYMENT ERROR:", e);
     await teezAlert({
  message:
    e?.message ||
    "Could not approve payment",
  type: "error",
});
    }
  }

  async function deletePayment(payment: MembershipPayment) {
    const confirmed = await teezConfirm({
  message: `Delete payment application for ${payment.email}?`,
  type: "warning",
  confirmText: "DELETE",
  cancelText: "CANCEL",
});

if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "membershipPayments", payment.id));

      await loadMembershipPayments();

     await teezAlert({
  message: "Payment application deleted",
  type: "success",
});
    } catch (e: any) {
      console.log("DELETE PAYMENT ERROR:", e);
    await teezAlert({
  message:
    e?.message ||
    "Could not delete payment application",
  type: "error",
});
    }
  }

  function contactApplicant(payment: MembershipPayment) {
    window.location.href = `mailto:${payment.email}?subject=Teez Golf Membership Payment&body=Hi,%0D%0A%0D%0AWe are contacting you about your Teez Golf membership payment.%0D%0A%0D%0AReference: ${payment.reference}%0D%0AAmount: R${payment.amount}%0D%0ABank selected: ${payment.selectedBank}%0D%0A%0D%0ARegards,%0D%0ATeez Golf Admin`;
  }

  return (
    <div className="min-h-screen relative text-white flex flex-col items-center overflow-hidden px-4 py-10">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/logo.png')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#00f0ff]">
          ADMIN DASHBOARD
        </h1>

        <button
          onClick={() => router.push("/admin/redemptions")}
          className="w-[320px] px-10 py-4 text-lg font-bold rounded-xl bg-cyan-400 text-black 
          shadow-[0_0_20px_#00f0ff] hover:shadow-[0_0_40px_#00f0ff] 
          animate-pulse transition-all duration-300"
        >
          TOKEN REDEMPTION REQUESTS
        </button>

        <button
          onClick={() => router.push("/admin/scoring-clubs")}
          className="w-[320px] px-10 py-4 text-lg font-bold rounded-xl bg-green-400 text-black 
          shadow-[0_0_20px_rgba(34,197,94,0.8)] 
          hover:shadow-[0_0_40px_rgba(34,197,94,1)] 
          animate-pulse transition-all duration-300"
        >
          TEEZ SCORING CLUBS
        </button>


 {/* BATTLE CHARACTER MANAGEMENT */}
<div className="w-full max-w-[720px] border border-purple-400/50 bg-black/80 p-5 rounded-2xl">
  <h2 className="text-center text-xl font-black text-purple-300">
    BATTLE CHARACTER MANAGEMENT
  </h2>

  <p className="mt-2 text-center text-xs text-gray-400">
    Search for a player and assign their Battle Character.
  </p>

  <input
    type="text"
    value={battleCharacterSearch}
    onChange={(e) =>
      setBattleCharacterSearch(e.target.value)
    }
    placeholder="Search name, Battle Name, email or UID"
    className="mt-5 w-full border border-purple-400/40 bg-black px-4 py-3 text-sm text-white outline-none focus:border-purple-400"
  />

  {loadingBattleCharacterPlayers ? (
    <p className="mt-4 text-center text-sm text-gray-400">
      Loading players...
    </p>
  ) : battleCharacterSearch.trim() ? (
    <div className="mt-3 max-h-64 overflow-y-auto border border-white/10">
      {battleCharacterPlayers
        .filter((player) => {
          const search =
            battleCharacterSearch
              .trim()
              .toLowerCase();

          const searchable = [
            player.name,
            player.surname,
            player.battleName,
            player.email,
            player.uid,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchable.includes(search);
        })
        .slice(0, 10)
        .map((player) => (
          <button
            key={player.uid}
            type="button"
            onClick={() => {
              setSelectedBattleCharacterPlayer(
                player
              );

              setBattleCharacterName(
                player.battleCharacterName || ""
              );

              setBattleCharacterFile(null);
              setBattleCharacterSearch("");
            }}
            className="w-full border-b border-white/10 px-4 py-3 text-left hover:bg-purple-500/20"
          >
            <p className="font-bold text-white">
              {`${player.name || ""} ${
                player.surname || ""
              }`.trim() || "Unnamed Player"}
            </p>

            <p className="text-xs text-cyan-300">
              {player.battleName
                ? `Battle Name: ${player.battleName}`
                : "No Battle Name"}
            </p>

            <p className="mt-1 break-all text-xs text-gray-500">
              {player.email || player.uid}
            </p>
          </button>
        ))}
    </div>
  ) : null}

  {selectedBattleCharacterPlayer && (
    <div className="mt-6 border border-purple-400/30 bg-zinc-950 p-5 rounded-xl">

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5">

        <div className="flex min-h-[220px] items-center justify-center overflow-hidden border border-white/10 bg-black">
          {selectedBattleCharacterPlayer.battleCharacterImageUrl ? (
            <img
              src={
                selectedBattleCharacterPlayer.battleCharacterImageUrl
              }
              alt="Battle Character"
              className="h-full w-full object-contain"
            />
          ) : (
            <p className="px-4 text-center text-xs font-bold text-gray-500">
              NO BATTLE CHARACTER ASSIGNED
            </p>
          )}
        </div>

        <div>
          <p className="text-lg font-black text-white">
            {`${selectedBattleCharacterPlayer.name || ""} ${
              selectedBattleCharacterPlayer.surname || ""
            }`.trim() || "Unnamed Player"}
          </p>

          <p className="mt-1 text-sm text-cyan-300">
            {selectedBattleCharacterPlayer.battleName ||
              "No Battle Name"}
          </p>

          <p className="mt-2 break-all text-xs text-gray-500">
            UID: {selectedBattleCharacterPlayer.uid}
          </p>

          <label className="mt-5 block text-xs font-black uppercase tracking-wider text-purple-300">
            Character Name
          </label>

          <input
            type="text"
            value={battleCharacterName}
            onChange={(e) =>
              setBattleCharacterName(
                e.target.value
              )
            }
            placeholder="e.g. THE MAGICIAN"
            className="mt-2 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-purple-400"
          />

          <label className="mt-4 block text-xs font-black uppercase tracking-wider text-purple-300">
            Character Image
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) =>
              setBattleCharacterFile(
                e.target.files?.[0] || null
              )
            }
            className="mt-2 block w-full text-sm text-gray-300"
          />

          {battleCharacterFile && (
            <p className="mt-2 text-xs text-green-400">
              Selected: {battleCharacterFile.name}
            </p>
          )}

          <button
            type="button"
            onClick={assignBattleCharacter}
            disabled={uploadingBattleCharacter}
            className="mt-5 w-full bg-purple-500 px-4 py-3 text-sm font-black text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:bg-purple-400 disabled:opacity-50"
          >
            {uploadingBattleCharacter
              ? "UPLOADING..."
              : "UPLOAD & ASSIGN BATTLE CHARACTER"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>       

{/* BOOSTER BOARD TEST CONTROL */}
<div className="w-full max-w-[520px] border border-amber-400/40 bg-black/70 p-5">
  <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-amber-300">
    Booster Board Testing
  </p>

  <p className="mt-2 text-center text-xs text-gray-400">
    Grant one test Booster Ball to a player.
  </p>

  <input
    type="text"
    value={testPlayerUid}
    onChange={(e) =>
      setTestPlayerUid(e.target.value)
    }
    placeholder="Player UID"
    className="mt-4 w-full border border-white/20 bg-black px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
  />

<button
  type="button"
  onClick={openTestImprovePlayerBoosterBall}
  disabled={openingTestImproveBall}
  className="mt-3 w-full bg-cyan-400 px-4 py-3 text-sm font-black text-black disabled:opacity-50"
>
{openingTestImproveBall
  ? "GRANTING..."
  : "GRANT TEST IMPROVE PLAYER BOOSTER"}
</button>



  <button
    type="button"
    onClick={grantTestBoosterBall}
    disabled={grantingTestBall}
    className="mt-3 w-full bg-amber-400 px-4 py-3 text-sm font-black text-black disabled:opacity-50"
  >
    {grantingTestBall
      ? "GRANTING..."
      : "GRANT 1 TEST BOOSTER BALL"}
  </button>
</div>


{/* IMPROVE PLAYER BOOSTER REQUESTS */}
<div className="w-full mt-8 bg-black/70 border border-amber-400/40 rounded-2xl p-5">
  <h2 className="text-2xl font-bold text-amber-300 mb-4">
    IMPROVE PLAYER BOOSTER REQUESTS
  </h2>

  {loadingBoosterRequests ? (
    <p className="text-gray-400">
      Loading Booster requests...
    </p>
  ) : boosterRequests.length === 0 ? (
    <p className="text-gray-400">
      No Booster requests found.
    </p>
  ) : (
    <div className="flex flex-col gap-4">
      {boosterRequests.map((request) => (
        <div
          key={request.id}
          className="bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4">

            <div className="bg-white rounded-lg overflow-hidden">
             <img
  src={
    IMPROVE_PLAYER_BOOSTERS.find(
      (product) =>
        product.code === request.productCode
    )?.image || request.productImage
  }
  alt={request.productName}
  className="w-full h-36 object-contain p-2"
/>
            </div>

            <div className="space-y-2 text-sm">

              <p>
                <span className="text-gray-400">Player:</span>{" "}
                <span className="font-semibold">
                  {request.playerName || "Unknown"}
                </span>
              </p>

              <p>
                <span className="text-gray-400">UID:</span>{" "}
                <span className="font-semibold break-all">
                  {request.playerUid}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Email:</span>{" "}
                <span className="font-semibold break-all">
                  {request.playerEmail}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Phone:</span>{" "}
                <span className="font-semibold">
                  {request.playerPhone || "-"}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Booster Ball:</span>{" "}
                <span className="font-semibold">
                  {request.ballNumber}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Category:</span>{" "}
                <span className="font-semibold">
                  {request.category}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Item Code:</span>{" "}
                <span className="font-bold text-cyan-300">
                  {request.productCode}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Product:</span>{" "}
                <span className="font-semibold">
                  {request.productName}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Description:</span>{" "}
                <span className="font-semibold">
                  {request.productDescription}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Status:</span>{" "}
                <span className="font-bold uppercase text-amber-300">
                  {request.status}
                </span>
              </p>

            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={() =>
                updateBoosterRequestStatus(
                  request,
                  "processing"
                )
              }
              disabled={request.status === "fulfilled"}
              className="px-4 py-2 rounded-lg font-semibold bg-yellow-400 text-black disabled:opacity-40"
            >
              Processing
            </button>

            <button
              type="button"
              onClick={() => {
                contactBoosterPlayer(request);

                updateBoosterRequestStatus(
                  request,
                  "contacted"
                );
              }}
              disabled={request.status === "fulfilled"}
              className="px-4 py-2 rounded-lg font-semibold bg-cyan-400 text-black disabled:opacity-40"
            >
              Contact Player
            </button>

            <button
              type="button"
              onClick={() =>
                updateBoosterRequestStatus(
                  request,
                  "fulfilled"
                )
              }
              disabled={request.status === "fulfilled"}
              className="px-4 py-2 rounded-lg font-semibold bg-green-500 text-black disabled:opacity-40"
            >
              Fulfilled
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>



        {/* MEMBERSHIP PAYMENT APPLICATIONS */}
        <div className="w-full mt-8 bg-black/70 border border-cyan-400/40 rounded-2xl p-5">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            MEMBERSHIP PAYMENT APPLICATIONS
          </h2>

          {loadingPayments ? (
            <p className="text-gray-400">Loading payment applications...</p>
          ) : payments.length === 0 ? (
            <p className="text-gray-400">No payment applications found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="font-semibold break-all">{payment.email}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Reference</p>
                      <p className="font-semibold">{payment.reference}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Amount</p>
                      <p className="font-semibold">R{payment.amount}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Bank</p>
                      <p className="font-semibold">{payment.selectedBank}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Status</p>
                      <p
                        className={`font-semibold ${
                          payment.status === "approved"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {payment.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <button
                      onClick={() => approvePayment(payment)}
                      disabled={payment.status === "approved"}
                      className={`px-4 py-2 rounded-lg font-semibold text-black ${
                        payment.status === "approved"
                          ? "bg-gray-600 text-gray-300"
                          : "bg-green-500 hover:bg-green-400"
                      }`}
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => contactApplicant(payment)}
                      className="px-4 py-2 rounded-lg font-semibold bg-cyan-400 text-black hover:bg-cyan-300"
                    >
                      Contact
                    </button>

                    <button
                      onClick={() => deletePayment(payment)}
                      className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
