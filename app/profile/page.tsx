
"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { db, functions } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { countries } from "@/src/lib/countries";
import { useRouter } from "next/navigation";

declare const google: any;

type Profile = {
  uid: string;
  name: string;
  surname: string;
  battleName: string;

  // -------------------------------------------------
  // DIVISION SYSTEM
  // -------------------------------------------------
  division:
    | "junior"
    | "open"
    | "senior"
    | "ladies"
    | "professional";

  country: string;
  stateProvince: string;
  club: string;
  phoneNumber: string;
  dateOfBirth: string;
  idNumber: string;
  photoUrl: string;
  searchIndex: string;

  tokensPlayed?: number;
  tokensWon?: number;
  totalGames?: number;
  matchesWon?: number;

 ranking?: {
  // Ranking Points
  club: number;
  province: number;
  national: number;
  international: number;

  // Career
  careerPoints?: number;
  seasonPoints?: number;

  // Progression
  powerScore?: number;
  playerLevel?: number;
  careerXP?: number;

  // Performance
  matchesPlayed?: number;
  wins?: number;
  losses?: number;
  winPercentage?: number;

  // Format
  bestFormat?: string;
  bestFormatWinPercentage?: number;
};

  // -------------------------------------------------
  // LAST CHALLENGE SNAPSHOT (NEW)
  // -------------------------------------------------
  lastChallenge?: {
    ranking?: {
      before?: {
        club: number;
        province: number;
        national: number;
        international: number;
      };
      after?: {
        club: number;
        province: number;
        national: number;
        international: number;
      };
    };
    tokens?: {
      played: number;
      won: number;
    };
    createdAt?: any;
  };
};

type RankingPosition = {
  // GLOBAL
  clubPosition: number;
  provincePosition: number;
  nationalPosition: number;
  internationalPosition: number;

  // DIVISION
  divisionClubPosition: number;
  divisionProvincePosition: number;
  divisionNationalPosition: number;
  divisionInternationalPosition: number;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();

 const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [profileExists, setProfileExists] = useState(false);
const [showClubNotice, setShowClubNotice] = useState(false);
const [clubNoticeRead, setClubNoticeRead] = useState(false);


  const [rankingPosition, setRankingPosition] = useState<RankingPosition>({


    // GLOBAL
    clubPosition: 0,
    provincePosition: 0,
    nationalPosition: 0,
    internationalPosition: 0,

    // DIVISION
    divisionClubPosition: 0,
    divisionProvincePosition: 0,
    divisionNationalPosition: 0,
    divisionInternationalPosition: 0,
  });

  const clubInputRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<Profile>({
    uid: "",
    name: "",
    surname: "",
    battleName: "",

    // -------------------------------------------------
    // DEFAULT DIVISION
    // -------------------------------------------------
    
    division: "open",

    country: "",
    stateProvince: "",
    club: "",
    phoneNumber: "",
    dateOfBirth: "",
    idNumber: "",
    photoUrl: "",
    searchIndex: "",

    tokensPlayed: 0,
    tokensWon: 0,
    totalGames: 0,
    matchesWon: 0,

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
      const rankingRef = doc(db, "playerRankings", user.uid);

      const [profileSnap, rankingSnap] = await Promise.all([
  getDoc(profileRef),
  getDoc(rankingRef),
]);

      // ---------------- PROFILE ----------------
      if (profileSnap.exists()) {
        setProfile(profileSnap.data() as Profile);
        setProfileExists(true);
        setIsEditing(false);
      } else {
        setProfileExists(false);
        setIsEditing(true);
      }

      // ---------------- WALLET ----------------

      // ---------------- RANKING (REAL ONLY — NO OFFSET) ----------------
      if (rankingSnap.exists()) {
        const data = rankingSnap.data();
        setRankingPosition({
          // GLOBAL
          clubPosition: data.clubPosition || 0,
          provincePosition: data.provincePosition || 0,
          nationalPosition: data.nationalPosition || 0,
          internationalPosition: data.internationalPosition || 0,

          // DIVISION
          divisionClubPosition: data.divisionClubPosition || 0,
          divisionProvincePosition: data.divisionProvincePosition || 0,
          divisionNationalPosition: data.divisionNationalPosition || 0,
          divisionInternationalPosition: data.divisionInternationalPosition || 0,
        });
      }

      setLoading(false);
    })();
  }, [user]);

  /* GOOGLE CLUB SEARCH */
  useEffect(() => {
    if (!isEditing) return;

    const initAutocomplete = () => {
      if (
        !(window as any).google ||
        !(window as any).google.maps ||
        !(window as any).google.maps.places ||
        !clubInputRef.current
      ) {
        return false;
      }

      const autocomplete = new (window as any).google.maps.places.Autocomplete(
        clubInputRef.current,
        {
          types: ["establishment"],
          fields: ["name", "address_components"],
        }
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

      return true;
    };

    const tryInit = () => {
      if (!initAutocomplete()) {
        setTimeout(tryInit, 300);
      }
    };

    const scriptId = "google-maps-script";

    if (!(window as any).google) {
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
        script.onload = tryInit;
        document.head.appendChild(script);
      }
    } else {
      tryInit();
    }
  }, [isEditing]);


    /* SAVE PROFILE */
  async function saveProfile() {
    if (!user) return;

    // DOB VALIDATION (YYYY/MM/DD)
    const dobRegex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (!dobRegex.test(profile.dateOfBirth)) {
      alert(
        "Date of Birth must be in format YYYY/MM/DD (e.g. 1977/12/30)"
      );
      return;
    }

    if (!profile.phoneNumber.trim()) {
      alert("Please enter your cellphone number.");
      return;
    }

    setSaving(true);

    try {
      // -------------------------------------------------
      // SEARCH INDEX
      // -------------------------------------------------
      const searchIndex =
        `${profile.name} ${profile.surname} ${profile.battleName} ${profile.club} ${profile.country} ${profile.stateProvince}`.toLowerCase();

      // -------------------------------------------------
      // SECURE SERVER-SIDE PROFILE SAVE
      // -------------------------------------------------
      const savePlayerProfile = httpsCallable(
        functions,
        "savePlayerProfile"
      );

      const result: any = await savePlayerProfile({
        ...profile,
        searchIndex,
      });

      const savedPhone =
        result?.data?.phoneNumber ||
        profile.phoneNumber;

      setProfile((prev) => ({
        ...prev,
        uid: user.uid,
        phoneNumber: savedPhone,
        searchIndex,
      }));

      alert("Profile saved successfully.");

      setProfileExists(true);
      setIsEditing(false);

      // NEXT STEP: PAYMENT
      router.push("/payment");
    } catch (err: any) {
      console.error("PROFILE SAVE ERROR:", err);

      const errorCode =
        String(err?.code || "").toLowerCase();

      const errorMessage =
        String(err?.message || "");

      if (
        errorCode.includes("already-exists") &&
        errorMessage
          .toLowerCase()
          .includes("cellphone")
      ) {
        alert(
          "This cellphone number is already registered to another Teez account. Please use a different cellphone number."
        );
        return;
      }

      if (
        errorCode.includes("already-exists") &&
        errorMessage
          .toLowerCase()
          .includes("email")
      ) {
        alert(
          "This email address is already registered to another Teez account. Please login to the existing account."
        );
        return;
      }

      if (
        errorCode.includes("invalid-argument") &&
        errorMessage
          .toLowerCase()
          .includes("phone")
      ) {
        alert(
          "Please enter a valid South African cellphone number, for example 0631234567."
        );
        return;
      }

      alert(
        errorMessage ||
          "Failed to save profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }


  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        No user loaded
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-2">
          {/* BACK TO DASHBOARD */}
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs text-gray-400 hover:text-green-400 transition"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold tracking-wide text-green-400">
            TEEZ PROFILE
          </h1>

          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* PLAYER CARD */}
        {profileExists && !isEditing && (
          <>
            <div className="bg-neutral-900 border border-cyan-400 rounded-xl p-6 space-y-2 shadow-[0_0_24px_rgba(34,211,238,0.28)]">
              <h2 className="text-2xl font-extrabold text-cyan-300 animate-pulse drop-shadow-[0_0_12px_rgba(34,211,238,0.95)]">
                {profile.battleName}
              </h2>

              <p className="text-sm font-semibold text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.75)]">
                {profile.name} {profile.surname}
              </p>

              <div className="pt-3 border-t border-cyan-500/40 text-sm space-y-1 text-cyan-200 drop-shadow-[0_0_7px_rgba(34,211,238,0.65)]">
                <p><strong className="text-cyan-300">Club:</strong> {profile.club}</p>
                <p><strong className="text-cyan-300">Province:</strong> {profile.stateProvince}</p>
                <p><strong className="text-cyan-300">Country:</strong> {profile.country}</p>
                <p><strong className="text-cyan-300">DOB:</strong> {profile.dateOfBirth}</p>
                <p><strong className="text-cyan-300">ID:</strong> {profile.idNumber}</p>
                <p><strong className="text-cyan-300">Phone:</strong> {profile.phoneNumber}</p>
              </div>
            </div>

            {/* PLAYER OVERVIEW */}
            <div className="grid grid-cols-3 gap-3">
              <TokenCard title="Total Games" value={(profile as any)?.totalGames ?? 0} />
              <TokenCard title="Matches Won" value={(profile as any)?.matchesWon ?? 0} />
              <TokenCard title="Level" value={profile.ranking?.playerLevel ?? 1} />
            </div>

            {/* GLOBAL RANKINGS */}
            <div className="space-y-2">
              <p className="text-xs text-cyan-300 font-extrabold tracking-[0.18em] drop-shadow-[0_0_9px_rgba(34,211,238,0.9)]">
                YOUR RANKINGS
              </p>

              <div className="grid grid-cols-2 gap-3">
                <RankCardAdvanced title="Club Rank" value={rankingPosition.clubPosition} before={profile.lastChallenge?.ranking?.before?.club ?? 0} after={profile.lastChallenge?.ranking?.after?.club ?? 0} />
                <RankCardAdvanced title="Province Rank" value={rankingPosition.provincePosition} before={profile.lastChallenge?.ranking?.before?.province ?? 0} after={profile.lastChallenge?.ranking?.after?.province ?? 0} />
                <RankCardAdvanced title="National Rank" value={rankingPosition.nationalPosition} before={profile.lastChallenge?.ranking?.before?.national ?? 0} after={profile.lastChallenge?.ranking?.after?.national ?? 0} />
                <RankCardAdvanced title="Global Rank" value={rankingPosition.internationalPosition} before={profile.lastChallenge?.ranking?.before?.international ?? 0} after={profile.lastChallenge?.ranking?.after?.international ?? 0} />
              </div>
            </div>

            {/* DIVISION RANKINGS */}
            <div className="space-y-2">
              <p className="text-xs text-cyan-300 font-extrabold tracking-[0.18em] drop-shadow-[0_0_9px_rgba(34,211,238,0.9)]">
                {profile.division?.toUpperCase()} DIVISION RANKINGS
              </p>

              <div className="grid grid-cols-2 gap-3">
                <RankCardAdvanced title="Division Club" value={rankingPosition.divisionClubPosition} before={0} after={0} />
                <RankCardAdvanced title="Division Province" value={rankingPosition.divisionProvincePosition} before={0} after={0} />
                <RankCardAdvanced title="Division National" value={rankingPosition.divisionNationalPosition} before={0} after={0} />
                <RankCardAdvanced title="Division Global" value={rankingPosition.divisionInternationalPosition} before={0} after={0} />
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <button
  onClick={() => setIsEditing(true)}
  className="w-full bg-black border-2 border-green-400 text-green-300 font-extrabold py-3 rounded-xl animate-pulse shadow-[0_0_22px_rgba(74,222,128,0.65)] hover:bg-green-400 hover:text-black hover:shadow-[0_0_34px_rgba(74,222,128,0.95)] transition-all duration-300"
>
  Edit Profile
</button>

<button
  onClick={() => router.push("/profile/my-career")}
  className="w-full bg-black border-2 border-cyan-400 text-cyan-300 font-extrabold py-3 rounded-xl animate-pulse shadow-[0_0_24px_rgba(34,211,238,0.75)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_38px_rgba(34,211,238,1)] transition-all duration-300"
>
  My Career
</button>

              <details className="bg-neutral-900 border border-green-500 rounded-xl p-4">
                <summary className="cursor-pointer text-green-400 font-semibold">
                  How Rankings Work
                </summary>

                <div className="mt-3 text-sm text-gray-300 space-y-3">
                  <p>
                    Rankings are calculated based on your performance in challenges relative to other players.
                  </p>

                  <p>
                    <strong>Core Formula:</strong><br />
                    • Your position vs total players determines your base score<br />
                    • More players = higher total points available<br />
                    • Higher finish = higher percentage of available points
                  </p>

                  <p>
                    <strong>How points are calculated:</strong><br />
                    • Position Score = (Players − Position + 1) ÷ Players<br />
                    • Volume Multiplier = log₁₀(Players) + 1<br />
                    • Final Points = Position Score × Volume Multiplier × 100
                  </p>

                  <p>
                    A minimum floor ensures even lower positions still earn points, while winners receive the highest allocation.
                  </p>

                  <p>
                    <strong>Ranking Distribution:</strong><br />
                    • Club = 100% of points<br />
                    • Province ≈ 70%<br />
                    • National ≈ 40%<br />
                    • Global ≈ 20%
                  </p>

                  <p>
                    <strong>Understanding the tiles above:</strong><br />
                    • Large number = your current rank position (#)<br />
                    • Small number below = movement from your last challenge<br />
                    &nbsp;&nbsp;(+ means improved position, − means dropped)
                  </p>

                </div>
              </details>
            </div>
          </>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div className="space-y-3">
            <Input label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <Input label="Surname" value={profile.surname} onChange={(v) => setProfile({ ...profile, surname: v })} />
            <Input label="Battle Name" value={profile.battleName} onChange={(v) => setProfile({ ...profile, battleName: v })} />

            {/* CLUB */}
      
<div className="space-y-2">
  <p className="text-xs text-gray-400">
    Golf Club
  </p>

  <input
    ref={clubInputRef}
    className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
    placeholder="Select Golf Club"
    value={profile.club}
   onMouseDown={(e) => {
  if (!clubNoticeRead) {
    e.preventDefault();
    setShowClubNotice(true);
  }
}}
onFocus={() => {
  if (!clubNoticeRead) {
    clubInputRef.current?.blur();
    setShowClubNotice(true);
  }
}}
    onChange={(e) => setProfile({ ...profile, club: e.target.value })}
  />
</div>

            <Input label="Province / State" value={profile.stateProvince} onChange={(v) => setProfile({ ...profile, stateProvince: v })} />

                      {/* DIVISION */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400">
                Player Division
              </p>

              <select
                className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
                value={profile.division}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    division: e.target.value as
                      | "junior"
                      | "open"
                      | "senior"
                      | "ladies"
                      | "professional",
                  })
                }
              >
                <option value="junior">
                  Junior Division
                </option>
                <option value="open">
                  Open Division
                </option>
                <option value="senior">
                  Senior Division
                </option>
                <option value="ladies">
                  Ladies Division
                </option>
                <option value="professional">
                  Professional Division
                </option>
              </select>
            </div>

            {/* COUNTRY */}
            <select
              className="w-full bg-neutral-900 border border-gray-500 text-white px-3 py-2 rounded"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <div className="space-y-1">
              <p className="text-xs text-gray-400">Date of Birth</p>
              <input
                type="date"
                className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
                value={profile.dateOfBirth ? profile.dateOfBirth.replace(/\//g, "-") : ""}
                onChange={(e) => {
                  const raw = e.target.value; // YYYY-MM-DD
                  setProfile({
                    ...profile,
                    dateOfBirth: raw.replace(/-/g, "/"), // store as YYYY/MM/DD
                  });
                }}
              />
              <p className="text-[10px] text-gray-500">Select your birthdate</p>
            </div>

            <Input label="ID Number" value={profile.idNumber} onChange={(v) => setProfile({ ...profile, idNumber: v })} />
            <Input label="Phone Number" value={profile.phoneNumber} onChange={(v) => setProfile({ ...profile, phoneNumber: v })} />

            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

{showClubNotice && (
 <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-neutral-900 border-2 border-green-500 rounded-2xl p-6 shadow-[0_0_35px_rgba(34,197,94,0.35)] space-y-5">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-extrabold text-green-400">
          NO CLUB MEMBERSHIP REQUIRED
        </h2>

        <p className="text-white text-base leading-relaxed">
          You do not need to be a member of the golf club you select.
        </p>

        <p className="text-gray-300 text-sm leading-relaxed">
          Choose any golf club of your choice where you want your Teez Golf Challenges club ranking to be recorded.
        </p>
      </div>

     <button
  type="button"
  onClick={() => {
    setClubNoticeRead(true);
    setShowClubNotice(false);

    setTimeout(() => {
      clubInputRef.current?.focus();
    }, 100);
  }}
  className="w-full bg-green-500 hover:bg-green-400 text-black font-extrabold py-3 rounded-xl transition"
>
  READ
</button>
    </div>
  </div>
)}

    </main>
  );
}

/* RANK CARD */


/* NEW ADVANCED RANK CARD */
function RankCardAdvanced({
  title,
  value,
  before,
  after,
}: {
  title: string;
  value: number;
  before: number;
  after: number;
}) {
  const change = before - after;
  const isUp = change > 0;
  const isDown = change < 0;

  return (
    <div className="bg-neutral-900 border border-cyan-500/60 rounded-lg p-4 text-center space-y-1 shadow-[0_0_18px_rgba(34,211,238,0.18)]">
      <p className="text-xs font-bold text-cyan-300 drop-shadow-[0_0_7px_rgba(34,211,238,0.85)]">{title}</p>
      <p className="text-2xl font-extrabold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.95)]">#{value}</p>
      <p
        className={`text-xs ${
          isUp ? "text-green-400" : isDown ? "text-red-400" : "text-cyan-200"
        }`}
      >
        {change > 0 ? `+${change}` : change}
      </p>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-400">{label}</p>
      <input
        className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TokenCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-neutral-900 border border-cyan-500/60 rounded-lg p-4 text-center shadow-[0_0_18px_rgba(34,211,238,0.18)]">
      <p className="text-xs font-bold text-cyan-300 drop-shadow-[0_0_7px_rgba(34,211,238,0.85)]">{title}</p>
      <p className="text-2xl font-extrabold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.95)]">{value}</p>
    </div>
  );
}



