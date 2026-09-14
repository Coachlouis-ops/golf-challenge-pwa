"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { db, functions } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { countries } from "@/src/lib/countries";

import GolfCourseSearch from "@/src/components/GolfCourseSearch";

type PlayerProfile = {
  name?: string;
  surname?: string;
  club?: string;
  stateProvince?: string;
  country?: string;
};

type GroupForm = {
  groupName: string;
  club: string;
  stateProvince: string;
  country: string;
};

export default function CreateGroupPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [creatorName, setCreatorName] = useState("");

  const [group, setGroup] = useState<GroupForm>({
    groupName: "",
    club: "",
    stateProvince: "",
    country: "",
  });

  // -------------------------------------------------
  // LOAD CREATOR PROFILE
  // -------------------------------------------------
  useEffect(() => {
  if (!user) return;

  const uid = user.uid;

  async function loadProfile() {
      try {
       const profileRef = doc(
  db,
  "profiles",
  uid
);

        const profileSnap =
          await getDoc(profileRef);

        if (!profileSnap.exists()) {
          alert(
            "Please complete your Teez Profile before creating a group."
          );

          router.replace("/profile");
          return;
        }

        const profile =
          profileSnap.data() as PlayerProfile;

        const fullName =
          `${profile.name || ""} ${
            profile.surname || ""
          }`.trim();

        setCreatorName(fullName);

        // Default the group location to the
        // creator's existing profile.
        setGroup((prev) => ({
          ...prev,
          club: profile.club || "",
          stateProvince:
            profile.stateProvince || "",
          country:
            profile.country || "",
        }));
      } catch (error) {
        console.error(
          "LOAD CREATOR PROFILE ERROR:",
          error
        );

        alert(
          "Unable to load your player profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, router]);

  // -------------------------------------------------
  // CREATE GROUP
  // -------------------------------------------------
  async function createGroup() {
    if (!user) return;

    if (!group.groupName.trim()) {
      alert("Please enter a Group Name.");
      return;
    }

    if (!group.club.trim()) {
      alert("Please select a Golf Club.");
      return;
    }

    if (!group.stateProvince.trim()) {
      alert(
        "Please enter the Province / State."
      );
      return;
    }

    if (!group.country.trim()) {
      alert("Please select a Country.");
      return;
    }

    setSaving(true);

    try {
      const createGroupFunction =
        httpsCallable(
          functions,
          "createGroup"
        );

      await createGroupFunction({
        groupName:
          group.groupName.trim(),

        club:
          group.club.trim(),

        stateProvince:
          group.stateProvince.trim(),

        country:
          group.country.trim(),
      });

      alert("Group created successfully.");

      // Saved groups live on the Group Profile Dashboard.
      router.replace("/groups");
    } catch (error: any) {
      console.error(
        "CREATE GROUP ERROR:",
        error
      );

      const message =
        String(
          error?.message ||
            "Failed to create group."
        );

      if (
        message
          .toLowerCase()
          .includes(
            "participation access"
          )
      ) {
        alert(
          "Active Participation Access is required to create a group."
        );
        return;
      }

      alert(message);
    } finally {
      setSaving(false);
    }
  }

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
        Loading group profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() =>
              router.push("/groups")
            }
            className="text-xs text-gray-400 hover:text-green-400 transition"
          >
            ← Back to Group Profile
          </button>

          <h1 className="text-3xl font-bold tracking-wide text-green-400">
            CREATE NEW GROUP
          </h1>

          <p className="text-sm text-gray-400">
            Create your Teez Golf Group.
          </p>
        </div>

        {/* GROUP PROFILE CARD */}
        <div className="bg-neutral-900 border border-cyan-500/60 rounded-2xl p-5 space-y-5 shadow-[0_0_24px_rgba(34,211,238,0.18)]">

          <div>
            <p className="text-xs text-cyan-300 font-extrabold tracking-[0.18em]">
              GROUP PROFILE
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Enter the details for your new group.
            </p>
          </div>

          {/* GROUP NAME */}
          <Input
            label="Group Name"
            value={group.groupName}
            onChange={(value) =>
              setGroup({
                ...group,
                groupName: value,
              })
            }
          />

          {/* CREATOR NAME */}
          <LockedField
            label="Creator Name"
            value={creatorName}
          />

          {/* CREATOR EMAIL */}
          <LockedField
            label="Creator Email"
            value={user.email || ""}
          />

          {/* CLUB */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400">
              Golf Club
            </p>

            <GolfCourseSearch
              value={group.club}
              placeholder="Select Golf Club"
              className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
              onSelect={(course) => {
                setGroup((prev) => ({
                  ...prev,

                  club:
                    course.name,

                  stateProvince:
                    course.stateProvince ||
                    prev.stateProvince,

                  country:
                    course.country ||
                    prev.country,
                }));
              }}
            />
          </div>

          {/* PROVINCE */}
          <Input
            label="Province / State"
            value={group.stateProvince}
            onChange={(value) =>
              setGroup({
                ...group,
                stateProvince: value,
              })
            }
          />

          {/* COUNTRY */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">
              Country
            </p>

            <select
              className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
              value={group.country}
              onChange={(e) =>
                setGroup({
                  ...group,
                  country:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Country
              </option>

              {countries.map(
                (country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

        {/* CREATE BUTTON */}
        <button
          type="button"
          onClick={createGroup}
          disabled={saving}
          className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-extrabold py-4 rounded-xl shadow-[0_0_24px_rgba(74,222,128,0.45)] transition"
        >
          {saving
            ? "CREATING GROUP..."
            : "CREATE GROUP"}
        </button>

      </div>
    </main>
  );
}

// -------------------------------------------------
// LOCKED FIELD
// -------------------------------------------------
function LockedField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-cyan-300 font-semibold">
        {label}
      </p>

      <div className="w-full bg-neutral-900 border border-cyan-500/40 text-gray-300 px-3 py-2 rounded-md flex items-center justify-between gap-3">
        <span className="truncate">
          {value || "Not set"}
        </span>

        <span className="text-[10px] text-cyan-400 font-bold tracking-wider">
          LOCKED
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------
// INPUT
// -------------------------------------------------
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <input
        className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}