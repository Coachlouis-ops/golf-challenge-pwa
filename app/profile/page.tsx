"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { countries } from "@/src/lib/countries";
import { Loader } from "@googlemaps/js-api-loader";


declare const google: any;

type Profile = {
  uid: string;
  name: string;
  surname: string;
  battleName: string;
  country: string;
  stateProvince: string;
  club: string;
  phoneNumber: string;
  dateOfBirth: string;
  idNumber: string;
  photoUrl: string;
  searchIndex: string;
  ranking?: {
    club: number;
    province: number;
    national: number;
    international: number;
  };
};

type RankingPosition = {
  club: number;
  province: number;
  national: number;
  international: number;
};

export default function ProfilePage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  const [rankingPosition, setRankingPosition] = useState<RankingPosition>({
    club: 0,
    province: 0,
    national: 0,
    international: 0,
  });

  const clubInputRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<Profile>({
    uid: "",
    name: "",
    surname: "",
    battleName: "",
    country: "",
    stateProvince: "",
    club: "",
    phoneNumber: "",
    dateOfBirth: "",
    idNumber: "",
    photoUrl: "",
    searchIndex: "",
    ranking: {
      club: 0,
      province: 0,
      national: 0,
      international: 0,
    },
  });

 useEffect(() => {
  if (!user) return;

  (async () => {
    const profileRef = doc(db, "profiles", user.uid);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      setProfile(profileSnap.data() as Profile);
      setProfileExists(true);
      setIsEditing(false);
    } else {
      setProfileExists(false);
      setIsEditing(true);
    }

    // Load ranking positions
    const rankingRef = doc(db, "playerRankings", user.uid);
    const rankingSnap = await getDoc(rankingRef);

    if (rankingSnap.exists()) {
      setRankingPosition(rankingSnap.data() as RankingPosition);
    }

    setLoading(false);
  })();
}, [user]);

useEffect(() => {
  if (!clubInputRef.current) return;

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: "weekly",
    libraries: ["places"],
  });

  loader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      clubInputRef.current as HTMLInputElement,
      {
        types: ["establishment"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place || !place.name) return;

      setProfile((prev) => ({
        ...prev,
        club: place.name || "",
      }));
    });
  });
}, []);

  async function saveProfile() {
    if (!user) return;

    const uid = user.uid;

    setSaving(true);

    const searchIndex = `${profile.name} ${profile.surname} ${profile.battleName} ${profile.club} ${profile.country} ${profile.stateProvince}`.toLowerCase();

    await setDoc(
      doc(db, "profiles", uid),
      {
        ...profile,
        uid,
        searchIndex,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    setSaving(false);
    setProfileExists(true);
    setIsEditing(false);
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
        <p>Loading profile…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-md mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-center">My Profile</h1>

      <p className="text-sm text-gray-600 text-center">
        Signed in as {user.email}
      </p>

      {/* VIEW MODE */}
      {profileExists && !isEditing && (
        <>
          <div className="border rounded p-6 flex flex-col gap-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Surname:</strong> {profile.surname}</p>
            <p><strong>Battle Name:</strong> {profile.battleName}</p>
            <p><strong>Country:</strong> {profile.country}</p>
            <p><strong>State / Province:</strong> {profile.stateProvince}</p>
            <p><strong>Club:</strong> {profile.club}</p>
            <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
            <p><strong>ID Number:</strong> {profile.idNumber}</p>
            <p><strong>Phone:</strong> {profile.phoneNumber}</p>

            {/* ================= RANKING ================= */}
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">Ranking</h3>
              <p><strong>Club Rank:</strong> #{rankingPosition.club}</p>
              <p><strong>Province Rank:</strong> #{rankingPosition.province}</p>
              <p><strong>National Rank:</strong> #{rankingPosition.national}</p>
              <p><strong>International Rank:</strong> #{rankingPosition.international}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 rounded"
          >
            Edit Profile
          </button>
        </>
      )}

      {/* EDIT MODE */}
      {isEditing && (
        <>
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Surname"
            value={profile.surname}
            onChange={(e) =>
              setProfile({ ...profile, surname: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Battle Name"
            value={profile.battleName}
            onChange={(e) =>
              setProfile({ ...profile, battleName: e.target.value })
            }
          />

    <select
  className="border p-2 rounded"
  value={profile.country}
  onChange={(e) =>
    setProfile({ ...profile, country: e.target.value })
  }
>
  <option value="">Select Country</option>

  {countries.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ))}
</select>
          <input
            className="border p-2 rounded"
            placeholder="State / Province"
            value={profile.stateProvince}
            onChange={(e) =>
              setProfile({ ...profile, stateProvince: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Home Golf Club"
            value={profile.club}
            onChange={(e) =>
              setProfile({ ...profile, club: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Date of Birth (yyyy/mm/dd)"
            value={profile.dateOfBirth}
            onChange={(e) =>
              setProfile({ ...profile, dateOfBirth: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="ID Number"
            value={profile.idNumber}
            onChange={(e) =>
              setProfile({ ...profile, idNumber: e.target.value })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone Number"
            value={profile.phoneNumber}
            onChange={(e) =>
              setProfile({ ...profile, phoneNumber: e.target.value })
            }
          />

          <button
            onClick={saveProfile}
            disabled={saving}
            className="bg-green-600 text-white py-2 rounded mt-2 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Profile"}
          </button>
        </>
      )}
    </main>
  );
}