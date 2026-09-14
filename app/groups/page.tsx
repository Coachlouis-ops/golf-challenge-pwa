"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

type Group = {
  groupId: string;

  groupName: string;

  creatorUid: string;
  creatorName: string;
  creatorEmail: string;

  club: string;
  stateProvince: string;
  country: string;

  memberUids?: string[];
  memberCount?: number;

  status?: string;
};

export default function GroupsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [createdGroups, setCreatedGroups] =
    useState<Group[]>([]);

  const [joinedGroups, setJoinedGroups] =
    useState<Group[]>([]);

  // -------------------------------------------------
  // LOAD GROUPS
  // -------------------------------------------------
  useEffect(() => {
  if (!user) return;

  const uid = user.uid;

  async function loadGroups() {
      try {
        // -----------------------------------------
        // GROUPS CREATED BY CURRENT PLAYER
        // -----------------------------------------
        const createdQuery = query(
          collection(db, "groups"),
          where(
            "creatorUid",
            "==",
            uid
          )
        );

        const createdSnap =
          await getDocs(createdQuery);

        const created =
          createdSnap.docs.map(
            (docSnap) => ({
              groupId: docSnap.id,
              ...docSnap.data(),
            })
          ) as Group[];

        setCreatedGroups(created);

        // -----------------------------------------
        // ALL GROUPS WHERE PLAYER IS A MEMBER
        // -----------------------------------------
        const memberQuery = query(
  collection(db, "groups"),
  where(
    "memberUids",
    "array-contains",
    uid
  )
);
        const memberSnap =
          await getDocs(memberQuery);

    const joined: Group[] =
  memberSnap.docs
    .map(
      (docSnap) =>
        ({
          groupId: docSnap.id,
          ...docSnap.data(),
        } as Group)
    )
    .filter(
      (group) =>
        group.creatorUid !== uid
    );
        setJoinedGroups(joined);

      } catch (error) {
        console.error(
          "GROUP LOAD ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, [user]);

  // -------------------------------------------------
  // AUTH
  // -------------------------------------------------
  if (!user) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        No user loaded
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading groups...
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-8 flex flex-col items-center">

      <div className="w-full max-w-md space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">

          <button
            onClick={() =>
              router.push(
                "/dashboard"
              )
            }
            className="text-xs text-gray-400 hover:text-green-400 transition"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold tracking-wide text-green-400">
            GROUP PROFILE
          </h1>

          <p className="text-sm text-gray-400">
            Create and manage your Teez groups.
          </p>

        </div>

        {/* CREATE NEW GROUP */}
        <button
          onClick={() =>
            router.push(
              "/groups/create"
            )
          }
          className="w-full bg-black border-2 border-green-400 text-green-300 font-extrabold py-4 rounded-xl animate-pulse shadow-[0_0_22px_rgba(74,222,128,0.65)] hover:bg-green-400 hover:text-black hover:shadow-[0_0_34px_rgba(74,222,128,0.95)] transition-all duration-300"
        >
          CREATE NEW GROUP
        </button>

        {/* ----------------------------------------- */}
        {/* MY CREATED GROUPS */}
        {/* ----------------------------------------- */}

        <section className="space-y-3">

          <div>
            <p className="text-xs text-cyan-300 font-extrabold tracking-[0.18em]">
              MY CREATED GROUPS
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Groups you created.
            </p>
          </div>

          {createdGroups.length === 0 ? (
            <div className="bg-neutral-900 border border-cyan-500/30 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-400">
                You have not created a group yet.
              </p>
            </div>
          ) : (
            createdGroups.map(
              (group) => (
                <GroupCard
                  key={
                    group.groupId
                  }
                  group={group}
                  label="CREATOR"
                  onClick={() =>
                    router.push(
                      `/groups/${group.groupId}`
                    )
                  }
                />
              )
            )
          )}

        </section>

        {/* ----------------------------------------- */}
        {/* GROUPS I BELONG TO */}
        {/* ----------------------------------------- */}

        <section className="space-y-3">

          <div>
            <p className="text-xs text-cyan-300 font-extrabold tracking-[0.18em]">
              GROUPS I BELONG TO
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Groups where you are a member.
            </p>
          </div>

          {joinedGroups.length === 0 ? (
            <div className="bg-neutral-900 border border-cyan-500/30 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-400">
                You do not belong to any other groups yet.
              </p>
            </div>
          ) : (
            joinedGroups.map(
              (group) => (
                <GroupCard
                  key={
                    group.groupId
                  }
                  group={group}
                  label="MEMBER"
                  onClick={() =>
                    router.push(
                      `/groups/${group.groupId}`
                    )
                  }
                />
              )
            )
          )}

        </section>

      </div>
    </main>
  );
}

// -------------------------------------------------
// GROUP CARD
// -------------------------------------------------
function GroupCard({
  group,
  label,
  onClick,
}: {
  group: Group;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-neutral-900 border border-cyan-500/60 rounded-xl p-5 space-y-3 shadow-[0_0_18px_rgba(34,211,238,0.18)] hover:border-cyan-300 transition"
    >

      <div className="flex items-start justify-between gap-3">

        <div>
          <h2 className="text-xl font-extrabold text-cyan-300">
            {group.groupName}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Created by{" "}
            {group.creatorName ||
              "TEEZ Player"}
          </p>
        </div>

        <span className="text-[10px] font-extrabold tracking-widest text-green-300 border border-green-500/50 rounded-md px-2 py-1">
          {label}
        </span>

      </div>

      <div className="pt-3 border-t border-cyan-500/20 text-sm space-y-1 text-gray-300">

        <p>
          <strong className="text-cyan-300">
            Club:
          </strong>{" "}
          {group.club || "Not set"}
        </p>

        <p>
          <strong className="text-cyan-300">
            Province:
          </strong>{" "}
          {group.stateProvince ||
            "Not set"}
        </p>

        <p>
          <strong className="text-cyan-300">
            Country:
          </strong>{" "}
          {group.country ||
            "Not set"}
        </p>

        <p>
          <strong className="text-cyan-300">
            Members:
          </strong>{" "}
          {group.memberCount ?? 1}
        </p>

      </div>

      <div className="text-right text-xs font-bold text-green-400">
        OPEN GROUP →
      </div>

    </button>
  );
}