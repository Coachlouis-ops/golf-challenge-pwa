"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { db } from "@/src/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { countries } from "@/src/lib/countries";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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

  /* LOAD PROFILE */

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

      const rankingRef = doc(db, "playerRankings", user.uid);
      const rankingSnap = await getDoc(rankingRef);

      if (rankingSnap.exists()) {
        setRankingPosition(rankingSnap.data() as RankingPosition);
      }

      setLoading(false);
    })();
  }, [user]);

  /* GOOGLE CLUB SEARCH */

  useEffect(() => {
    if (!isEditing) return;

    function initAutocomplete() {
      if (!clubInputRef.current) return;

      const autocomplete =
        new (window as any).google.maps.places.Autocomplete(
          clubInputRef.current,
          { types: ["establishment"] }
        );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place || !place.name) return;

        let province = "";
        let country = "";

        if (place.address_components) {
          place.address_components.forEach((component: any) => {
            if (component.types.includes("administrative_area_level_1")) {
              province = component.long_name;
            }

            if (component.types.includes("country")) {
              country = component.long_name;
            }
          });
        }

        setProfile((prev) => ({
          ...prev,
          club: place.name || "",
          stateProvince: province || prev.stateProvince,
          country: country || prev.country,
        }));
      });
    }

    const scriptId = "google-maps-script";

    if ((window as any).google && (window as any).google.maps) {
      initAutocomplete();
      return;
    }

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY +
        "&libraries=places";

      script.async = true;
      script.defer = true;

      script.onload = () => initAutocomplete();

      document.head.appendChild(script);
    }
  }, [isEditing]);

  /* SAVE PROFILE */

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

    router.push("/payment");
  }

  if (!user)
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        No user loaded
      </main>
    );

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </main>
    );

  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-8 flex flex-col items-center">
  <div className="w-full max-w-md space-y-6">

      {/* HEADER */}

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-wide text-green-400">
          TEEZ PROFILE
        </h1>
        <p className="text-gray-400 text-sm">{user.email}</p>
      </div>

      {/* PLAYER CARD */}

      {profileExists && !isEditing && (
        <>
          <div className="bg-neutral-900 border border-green-500 rounded-xl p-6 space-y-2 shadow-lg">

            <h2 className="text-xl font-semibold text-green-400">
              {profile.battleName}
            </h2>

            <p className="text-sm text-gray-400">
              {profile.name} {profile.surname}
            </p>

            <div className="pt-3 border-t border-neutral-700 text-sm space-y-1">

              <p><strong>Club:</strong> {profile.club}</p>
              <p><strong>Province:</strong> {profile.stateProvince}</p>
              <p><strong>Country:</strong> {profile.country}</p>

              <p><strong>DOB:</strong> {profile.dateOfBirth}</p>
              <p><strong>ID:</strong> {profile.idNumber}</p>
              <p><strong>Phone:</strong> {profile.phoneNumber}</p>

            </div>
          </div>

          {/* RANKINGS */}

          <div className="grid grid-cols-2 gap-3">

            <RankCard title="Club Rank" value={rankingPosition.club} />
            <RankCard title="Province Rank" value={rankingPosition.province} />
            <RankCard title="National Rank" value={rankingPosition.national} />
            <RankCard title="Global Rank" value={rankingPosition.international} />

          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
          >
            Edit Profile
          </button>
        </>
      )}

      {/* EDIT MODE */}

      {isEditing && (
        <div className="space-y-3">

          <Input label="Name" value={profile.name}
            onChange={(v)=>setProfile({...profile,name:v})} />

          <Input label="Surname" value={profile.surname}
            onChange={(v)=>setProfile({...profile,surname:v})} />

          <Input label="Battle Name" value={profile.battleName}
            onChange={(v)=>setProfile({...profile,battleName:v})} />

          {/* COUNTRY */}

          <select
            className="input"
            value={profile.country}
            onChange={(e)=>setProfile({...profile,country:e.target.value})}
          >
            <option value="">Select Country</option>
            {countries.map((c)=>(
              <option key={c}>{c}</option>
            ))}
          </select>

          <Input
            label="Province"
            value={profile.stateProvince}
            onChange={(v)=>setProfile({...profile,stateProvince:v})}
          />

          {/* CLUB */}

          <input
            ref={clubInputRef}
            className="input"
            placeholder="Home Golf Club"
            defaultValue={profile.club}
          />

          <Input
            label="Date of Birth"
            value={profile.dateOfBirth}
            onChange={(v)=>setProfile({...profile,dateOfBirth:v})}
          />

          <Input
            label="ID Number"
            value={profile.idNumber}
            onChange={(v)=>setProfile({...profile,idNumber:v})}
          />

          <Input
            label="Phone Number"
            value={profile.phoneNumber}
            onChange={(v)=>setProfile({...profile,phoneNumber:v})}
          />

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </div>
      )}

     </div>
</main>
  );
}

/* RANK CARD */

function RankCard({title,value}:{title:string,value:number}) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-center">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-green-400">#{value}</p>
    </div>
  );
}

/* INPUT COMPONENT */

function Input({label,value,onChange}:{label:string,value:string,onChange:(v:string)=>void}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-400">{label}</p>
      <input
        className="input"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  );
}