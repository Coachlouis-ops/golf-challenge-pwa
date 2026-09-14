"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import { useAuth } from "@/src/lib/AuthContext";
import {
  db,
  functions,
} from "@/src/lib/firebase";

type Group = {
  groupId: string;
  groupName: string;

  creatorUid: string;
  creatorName: string;
  creatorEmail: string;

  club: string;
  stateProvince: string;
  country: string;

  memberUids: string[];
  memberCount: number;

  status: string;
};

type GroupMember = {
  uid: string;

  name: string;
  surname: string;
  battleName: string;
  email: string;

  role: string;
  status: string;
};

type Profile = {
  uid: string;
  name: string;
  surname: string;
  battleName: string;
  club: string;
  searchIndex: string;
};

export default function GroupDetailPage() {
  const { user } = useAuth();

  const params = useParams();
  const router = useRouter();

  const groupId =
    Array.isArray(params?.groupId)
      ? params.groupId[0]
      : params?.groupId;

  const [loading, setLoading] =
    useState(true);

  const [group, setGroup] =
    useState<Group | null>(null);

  const [members, setMembers] =
    useState<GroupMember[]>([]);

  const [invitedUids, setInvitedUids] =
    useState<string[]>([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [searchResults, setSearchResults] =
    useState<Profile[]>([]);

  const [invitingUid, setInvitingUid] =
    useState<string | null>(null);

  const [removingUid, setRemovingUid] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const uid =
    user?.uid || "";

  const isCreator =
    !!group &&
    !!user &&
    group.creatorUid === user.uid;

  // ============================================================
  // LOAD GROUP
  // ============================================================

  async function loadGroup() {
    if (!uid || !groupId) return;

    try {
      setLoading(true);
      setError(null);

      const groupRef =
        doc(
          db,
          "groups",
          String(groupId)
        );

      const groupSnap =
        await getDoc(groupRef);

      if (!groupSnap.exists()) {
        setError(
          "Group not found."
        );

        return;
      }

      const data =
        groupSnap.data();

      const loadedGroup: Group = {
        groupId:
          data.groupId ||
          groupSnap.id,

        groupName:
          data.groupName ||
          "Unnamed Group",

        creatorUid:
          data.creatorUid ||
          "",

        creatorName:
          data.creatorName ||
          "",

        creatorEmail:
          data.creatorEmail ||
          "",

        club:
          data.club ||
          "",

        stateProvince:
          data.stateProvince ||
          "",

        country:
          data.country ||
          "",

        memberUids:
          Array.isArray(
            data.memberUids
          )
            ? data.memberUids
            : [],

        memberCount:
          Number(
            data.memberCount || 0
          ),

        status:
          data.status ||
          "active",
      };

      // ----------------------------------------------------------
      // SECURITY CHECK
      // ONLY GROUP MEMBERS CAN OPEN GROUP
      // ----------------------------------------------------------

      if (
        loadedGroup.creatorUid !== uid &&
        !loadedGroup.memberUids.includes(
          uid
        )
      ) {
        router.replace(
          "/groups"
        );

        return;
      }

      setGroup(
        loadedGroup
      );

      // ----------------------------------------------------------
      // LOAD MEMBERS
      // ----------------------------------------------------------

      const membersSnap =
        await getDocs(
          collection(
            db,
            "groups",
            String(groupId),
            "members"
          )
        );

      const loadedMembers: GroupMember[] =
        membersSnap.docs.map(
          (memberDoc) => {

            const memberData =
              memberDoc.data();

            return {
              uid:
                memberDoc.id,

              name:
                String(
                  memberData.name ||
                  ""
                ),

              surname:
                String(
                  memberData.surname ||
                  ""
                ),

              battleName:
                String(
                  memberData.battleName ||
                  ""
                ),

              email:
                String(
                  memberData.email ||
                  ""
                ),

              role:
                String(
                  memberData.role ||
                  "member"
                ),

              status:
                String(
                  memberData.status ||
                  "active"
                ),
            };
          }
        );

      loadedMembers.sort(
        (a, b) => {

          if (
            a.role === "creator"
          ) {
            return -1;
          }

          if (
            b.role === "creator"
          ) {
            return 1;
          }

          return `${a.name} ${a.surname}`
            .localeCompare(
              `${b.name} ${b.surname}`
            );
        }
      );

      setMembers(
        loadedMembers
      );

      // ----------------------------------------------------------
      // LOAD PENDING GROUP INVITES
      // ----------------------------------------------------------

      const invitesSnap =
        await getDocs(
          collection(
            db,
            "groups",
            String(groupId),
            "invites"
          )
        );

      setInvitedUids(
        invitesSnap.docs.map(
          (inviteDoc) =>
            inviteDoc.id
        )
      );

    } catch (err: any) {

      console.error(
        "Unable to load group:",
        err
      );

      setError(
        err?.message ||
        "Unable to load group."
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    if (
      !uid ||
      !groupId
    ) {
      return;
    }

    loadGroup();

  }, [
    uid,
    groupId,
  ]);


  // ============================================================
  // SEARCH PLAYERS
  // ============================================================

  useEffect(() => {

    if (
      searchTerm
        .trim()
        .length < 2
    ) {
      setSearchResults([]);
      return;
    }

    async function runSearch() {

      try {

        const term =
          searchTerm
            .trim()
            .toLowerCase();

        const playerQuery =
          query(
            collection(
              db,
              "profiles"
            ),

            where(
              "searchIndex",
              ">=",
              term
            ),

            where(
              "searchIndex",
              "<=",
              term + "\uf8ff"
            )
          );

        const snap =
          await getDocs(
            playerQuery
          );

        const results: Profile[] =
          snap.docs.map(
            (profileDoc) => {

              const profile =
                profileDoc.data();

              return {
                uid:
                  profileDoc.id,

                name:
                  String(
                    profile.name ||
                    ""
                  ),

                surname:
                  String(
                    profile.surname ||
                    ""
                  ),

                battleName:
                  String(
                    profile.battleName ||
                    ""
                  ),

                club:
                  String(
                    profile.club ||
                    ""
                  ),

                searchIndex:
                  String(
                    profile.searchIndex ||
                    ""
                  ),
              };
            }
          );

        setSearchResults(
          results
        );

      } catch (err) {

        console.error(
          "Player search failed:",
          err
        );
      }
    }

    runSearch();

  }, [
    searchTerm,
  ]);


  // ============================================================
  // SEND GROUP INVITE
  // ============================================================

  async function handleInvite(
    targetUid: string
  ) {

    if (
      !groupId ||
      !isCreator
    ) {
      return;
    }

    try {

      setInvitingUid(
        targetUid
      );

      const sendGroupInvite =
        httpsCallable(
          functions,
          "sendGroupInvite"
        );

      await sendGroupInvite({
        groupId:
          String(groupId),

        targetUid,
      });

      setInvitedUids(
        (current) =>
          Array.from(
            new Set([
              ...current,
              targetUid,
            ])
          )
      );

      setSearchTerm("");
      setSearchResults([]);

      alert(
        "Group invite sent."
      );

    } catch (err: any) {

      alert(
        err?.message ||
        "Unable to send group invite."
      );

    } finally {

      setInvitingUid(
        null
      );
    }
  }


  // ============================================================
  // REMOVE MEMBER
  // ============================================================

  async function handleRemoveMember(
    member: GroupMember
  ) {

    if (
      !groupId ||
      !isCreator
    ) {
      return;
    }

    if (
      member.uid ===
      group?.creatorUid
    ) {
      return;
    }

    const playerName =
      `${member.name} ${member.surname}`
        .trim() ||
      member.battleName ||
      "this player";

    const confirmed =
      window.confirm(
        `Remove ${playerName} from this group?`
      );

    if (!confirmed) {
      return;
    }

    try {

      setRemovingUid(
        member.uid
      );

      const removeGroupMember =
        httpsCallable(
          functions,
          "removeGroupMember"
        );

      await removeGroupMember({
        groupId:
          String(groupId),

        targetUid:
          member.uid,
      });

      await loadGroup();

    } catch (err: any) {

      alert(
        err?.message ||
        "Unable to remove group member."
      );

    } finally {

      setRemovingUid(
        null
      );
    }
  }


  // ============================================================
  // CREATE GROUP CHALLENGE
  // ============================================================

  function handleCreateChallenge() {

    if (
      !group ||
      !isCreator
    ) {
      return;
    }

    if (
      group.memberCount < 2
    ) {

      alert(
        "Add at least one other participant before creating a group challenge."
      );

      return;
    }

   router.push(
  `/challenges/create?scope=group&groupId=${group.groupId}`
);
  }


  // ============================================================
  // LOADING
  // ============================================================

  if (
    !user ||
    loading
  ) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading group...
      </main>
    );
  }


  // ============================================================
  // ERROR
  // ============================================================

  if (
    error ||
    !group
  ) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-5 px-4">

        <div className="text-red-400 font-bold">
          {error ||
            "Group not available."}
        </div>

        <button
          onClick={() =>
            router.push(
              "/groups"
            )
          }
          className="px-5 py-3 rounded-xl bg-green-400 text-black font-bold"
        >
          BACK TO MY GROUPS
        </button>

      </main>
    );
  }


  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="relative min-h-screen bg-black text-white px-4 py-10 overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-400 opacity-10 blur-[130px] pointer-events-none" />

      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#22d3ee_1px,transparent_1px)] bg-[size:40px_40px]" />


      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6">


        {/* BACK */}

        <button
          onClick={() =>
            router.push(
              "/groups"
            )
          }
          className="self-start text-sm text-gray-400 hover:text-cyan-300"
        >
          ← BACK TO MY GROUPS
        </button>


        {/* ===================================================== */}
        {/* GROUP HEADER */}
        {/* ===================================================== */}

        <section className="border-2 border-cyan-400/70 bg-neutral-950/90 rounded-3xl p-6 shadow-[0_0_35px_rgba(34,211,238,0.25)]">

          <div className="text-xs font-bold tracking-[0.3em] text-cyan-300">
            GROUP PROFILE
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
            {group.groupName}
          </h1>

          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">

            <div>
              <span className="text-gray-500">
                CREATOR
              </span>

              <div className="font-bold text-white">
                {group.creatorName}
              </div>
            </div>


            <div>
              <span className="text-gray-500">
                MEMBERS
              </span>

              <div className="font-bold text-green-400">
                {members.length}
              </div>
            </div>


            <div>
              <span className="text-gray-500">
                GOLF CLUB
              </span>

              <div className="font-bold">
                {group.club}
              </div>
            </div>


            <div>
              <span className="text-gray-500">
                LOCATION
              </span>

              <div className="font-bold">
                {group.stateProvince}
                {group.country
                  ? `, ${group.country}`
                  : ""}
              </div>
            </div>

          </div>

        </section>


        {/* ===================================================== */}
        {/* GROUP PARTICIPANTS */}
        {/* ===================================================== */}

        <section className="border border-green-400/30 bg-neutral-900/90 rounded-3xl p-5 shadow-[0_0_30px_rgba(57,255,20,0.12)]">

          <div className="flex justify-between items-center mb-5">

            <div>
              <div className="text-xs font-bold tracking-[0.25em] text-green-400">
                GROUP MEMBERS
              </div>

              <h2 className="text-2xl font-black mt-1">
                PARTICIPANTS
              </h2>
            </div>

            <div className="text-green-400 font-black">
              {members.length}
            </div>

          </div>


          <div className="flex flex-col gap-3">

            {members.map(
              (member) => {

                const isGroupCreator =
                  member.uid ===
                  group.creatorUid;

                return (
                  <div
                    key={
                      member.uid
                    }
                    className="border border-neutral-700 bg-black/50 rounded-2xl p-4 flex items-center justify-between gap-4"
                  >

                    <div>

                      <div className="font-bold text-white">

                        {member.name}{" "}
                        {member.surname}

                        {member.battleName && (
                          <span className="text-cyan-300">
                            {" "}
                            ({member.battleName})
                          </span>
                        )}

                      </div>


                      <div className="mt-1">

                        {isGroupCreator ? (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-cyan-400 text-black">
                            CREATOR
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-400/10 border border-green-400/30 text-green-400">
                            MEMBER
                          </span>
                        )}

                      </div>

                    </div>


                    {isCreator &&
                      !isGroupCreator && (

                        <button
                          onClick={() =>
                            handleRemoveMember(
                              member
                            )
                          }
                          disabled={
                            removingUid ===
                            member.uid
                          }
                          className="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-500 disabled:opacity-40"
                        >

                          {removingUid ===
                          member.uid
                            ? "REMOVING..."
                            : "REMOVE"}

                        </button>

                      )}

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* ===================================================== */}
        {/* INVITE PARTICIPANTS */}
        {/* ===================================================== */}

        {isCreator && (

          <section className="border-2 border-purple-500/60 bg-purple-950/20 rounded-3xl p-5 shadow-[0_0_35px_rgba(168,85,247,0.18)]">

            <div className="text-xs font-bold tracking-[0.25em] text-purple-400">
              BUILD YOUR GROUP
            </div>

            <h2 className="text-2xl font-black mt-1">
              INVITE PARTICIPANTS
            </h2>

            <p className="text-sm text-gray-400 mt-2 mb-5">
              Search registered Teez players and invite them to join this group.
            </p>


            <input
              type="text"
              value={
                searchTerm
              }
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search name, surname, battle name or club"
              className="w-full bg-black border-2 border-purple-500/60 rounded-xl p-4 text-white placeholder:text-purple-300 outline-none focus:border-purple-400 focus:shadow-[0_0_20px_rgba(168,85,247,0.45)]"
            />


            <div className="flex flex-col gap-3 mt-4">

              {searchResults.map(
                (profile) => {

                  const alreadyMember =
                    members.some(
                      (member) =>
                        member.uid ===
                        profile.uid
                    );

                  const alreadyInvited =
                    invitedUids.includes(
                      profile.uid
                    );

                  const isYou =
                    profile.uid ===
                    uid;

                  return (
                    <div
                      key={
                        profile.uid
                      }
                      className="border border-purple-500/20 bg-black/50 rounded-2xl p-4 flex items-center justify-between gap-3"
                    >

                      <div>

                        <div className="font-bold">

                          {profile.name}{" "}
                          {profile.surname}

                          {profile.battleName && (
                            <span className="text-purple-300">
                              {" "}
                              ({profile.battleName})
                            </span>
                          )}

                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                          {profile.club}
                        </div>

                      </div>


                      <button
                        onClick={() =>
                          handleInvite(
                            profile.uid
                          )
                        }
                        disabled={
                          isYou ||
                          alreadyMember ||
                          alreadyInvited ||
                          invitingUid ===
                            profile.uid
                        }
                        className="px-4 py-2 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-400 disabled:bg-neutral-700 disabled:text-gray-400 disabled:opacity-60"
                      >

                        {isYou
                          ? "YOU"
                          : alreadyMember
                          ? "MEMBER"
                          : alreadyInvited
                          ? "INVITED"
                          : invitingUid ===
                            profile.uid
                          ? "SENDING..."
                          : "INVITE"}

                      </button>

                    </div>
                  );
                }
              )}

            </div>

          </section>

        )}


        {/* ===================================================== */}
        {/* CREATE GROUP CHALLENGE */}
        {/* ===================================================== */}

        {isCreator && (

          <section className="border-2 border-red-500/60 bg-red-950/20 rounded-3xl p-5 shadow-[0_0_35px_rgba(255,0,0,0.20)]">

            <div className="text-xs tracking-[0.25em] text-red-400 font-bold">
              GROUP COMPETITION
            </div>

            <h2 className="text-2xl font-black mt-1">
              CREATE GROUP CHALLENGE
            </h2>


            {members.length < 2 ? (

              <div className="mt-4 border border-yellow-500/40 bg-yellow-500/10 rounded-xl p-4 text-yellow-200 text-sm">
                Add at least one other participant before creating a group challenge.
              </div>

            ) : (

              <div className="mt-4 border border-green-500/30 bg-green-500/10 rounded-xl p-4 text-green-200 text-sm">
                Group ready — {members.length} participants available.
              </div>

            )}


            <button
              onClick={
                handleCreateChallenge
              }
              disabled={
                members.length < 2
              }
              className="w-full mt-5 py-4 rounded-2xl bg-red-600 text-white text-lg font-black tracking-wide hover:bg-red-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.65)] disabled:bg-neutral-700 disabled:text-gray-500 disabled:shadow-none"
            >
              CREATE GROUP CHALLENGE
            </button>

          </section>

        )}


        {/* REFRESH */}

        <button
          onClick={
            loadGroup
          }
          className="w-full py-3 rounded-xl border border-cyan-400/30 text-cyan-300 font-bold hover:bg-cyan-400/10"
        >
          REFRESH GROUP
        </button>

      </div>

    </main>
  );
}