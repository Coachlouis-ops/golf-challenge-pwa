
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

  // -------------------------------------------------
  // DIVISION SYSTEM
  // -------------------------------------------------
  division:
    | "junior"
    | "amateur"
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
    division: "amateur",

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

    const uid = user.uid;

    // DOB VALIDATION (YYYY/MM/DD)
    const dobRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dobRegex.test(profile.dateOfBirth)) {
      alert("Date of Birth must be in format YYYY/MM/DD (e.g. 1977/12/30)");
      return;
    }

    setSaving(true);

    try {
      // -------------------------------------------------
      // FORMAT PHONE NUMBER
      // -------------------------------------------------
      let formattedPhone = profile.phoneNumber.replace(/\s/g, "").replace(/-/g, "");

      // -------------------------------------------------
      // SOUTH AFRICA PHONE NORMALIZATION
      // ACCEPTS:
      // 0828370266
      // +27828370266
      // 27828370266
      // -------------------------------------------------
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "+27" + formattedPhone.substring(1);
      } else if (formattedPhone.startsWith("27")) {
        formattedPhone = "+" + formattedPhone;
      } else if (!formattedPhone.startsWith("+27")) {
        alert("Phone number must be South African format");
        setSaving(false);
        return;
      }

      // -------------------------------------------------
      // SEARCH INDEX
      // -------------------------------------------------
      const searchIndex = `${profile.name} ${profile.surname} ${profile.battleName} ${profile.club} ${profile.country} ${profile.stateProvince}`.toLowerCase();

      // -------------------------------------------------
      // SAVE PROFILE
      // -------------------------------------------------
      await setDoc(
        doc(db, "profiles", uid),
        {
          ...profile,
          uid,
          phoneNumber: formattedPhone,

          // -------------------------------------------------
          // RESET VERIFICATION ONLY IF PHONE CHANGED
          // -------------------------------------------------
          phoneVerified:
            profile.phoneNumber === formattedPhone
              ? (profile as any).phoneVerified ?? false
              : false,
          phoneVerifiedAt:
            profile.phoneNumber === formattedPhone
              ? (profile as any).phoneVerifiedAt ?? null
              : null,

          searchIndex,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert(
  "Profile saved successfully. Continue to phone verification to complete your account setup."
);
      setProfileExists(true);
      setIsEditing(false);

      // -------------------------------------------------
      // ONLY VERIFY DURING FIRST SETUP
      // -------------------------------------------------
      if (!(profile as any).phoneVerified) {
        localStorage.setItem("phoneVerificationUid", uid);
        router.push("/verify-phone");
        return;
      }

      // -------------------------------------------------
      // NEXT SETUP STEP: SUBSCRIPTION PAYMENT
      // -------------------------------------------------
// Phone verification complete.
// Next step: activate your monthly subscription.
    router.push("/payment");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to send OTP");
    }

    setSaving(false);
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

            {/* DIVISION RANKINGS */}
            <div className="space-y-2">
              <p className="text-xs text-green-400 font-semibold tracking-wider">
                {profile.division?.toUpperCase()} DIVISION
              </p>

              <div className="grid grid-cols-2 gap-3">
                <RankCardAdvanced title="Division Club" value={rankingPosition.divisionClubPosition} before={0} after={0} />
                <RankCardAdvanced title="Division Province" value={rankingPosition.divisionProvincePosition} before={0} after={0} />
                <RankCardAdvanced title="Division National" value={rankingPosition.divisionNationalPosition} before={0} after={0} />
                <RankCardAdvanced title="Division Global" value={rankingPosition.divisionInternationalPosition} before={0} after={0} />
              </div>
            </div>

            {/* GLOBAL RANKINGS */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-semibold tracking-wider">
                GLOBAL RANKINGS
              </p>

              <div className="grid grid-cols-2 gap-3">
                <RankCardAdvanced
                  title="Club Rank"
                  value={rankingPosition.clubPosition}
                  before={profile.lastChallenge?.ranking?.before?.club ?? 0}
                  after={profile.lastChallenge?.ranking?.after?.club ?? 0}
                />
                <RankCardAdvanced
                  title="Province Rank"
                  value={rankingPosition.provincePosition}
                  before={profile.lastChallenge?.ranking?.before?.province ?? 0}
                  after={profile.lastChallenge?.ranking?.after?.province ?? 0}
                />
                <RankCardAdvanced
                  title="National Rank"
                  value={rankingPosition.nationalPosition}
                  before={profile.lastChallenge?.ranking?.before?.national ?? 0}
                  after={profile.lastChallenge?.ranking?.after?.national ?? 0}
                />
                <RankCardAdvanced
                  title="Global Rank"
                  value={rankingPosition.internationalPosition}
                  before={profile.lastChallenge?.ranking?.before?.international ?? 0}
                  after={profile.lastChallenge?.ranking?.after?.international ?? 0}
                />
              </div>
            </div>
{/* PLAYER OVERVIEW */}
<div className="grid grid-cols-3 gap-3">
  <TokenCard
    title="Total Games"
    value={(profile as any)?.totalGames ?? 0}
  />

  <TokenCard
    title="Matches Won"
    value={(profile as any)?.matchesWon ?? 0}
  />

  <TokenCard
    title="Level"
    value={profile.ranking?.playerLevel ?? 1}
  />
</div>

            <div className="space-y-3 mt-4">
              <button
  onClick={() => setIsEditing(true)}
  className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl"
>
  Edit Profile
</button>

<button
  onClick={() => router.push("/profile/my-career")}
  className="w-full bg-neutral-900 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-semibold py-3 rounded-xl transition"
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
            <input
              ref={clubInputRef}
              className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
              placeholder="Select Club - No Club Membership Required"
              value={profile.club}
              onChange={(e) => setProfile({ ...profile, club: e.target.value })}
            />

            <Input label="Province / State" value={profile.stateProvince} onChange={(v) => setProfile({ ...profile, stateProvince: v })} />

            {/* DIVISION */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400">Player Division</p>

              <select
                className="w-full bg-[#1f1f1f] border border-gray-500 text-white px-3 py-2 rounded-md focus:border-green-400 focus:outline-none"
                value={profile.division}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    division: e.target.value as
                      | "junior"
                      | "amateur"
                      | "open"
                      | "senior"
                      | "ladies"
                      | "professional",
                  })
                }
              >
                <option value="junior">Junior Division</option>
                <option value="amateur">Amateur Division</option>
                <option value="open">Open Division</option>
                <option value="senior">Senior Division</option>
                <option value="ladies">Ladies Division</option>
                <option value="professional">Professional Division</option>
              </select>

              {(profile.division === "open" || profile.division === "professional") && (
                <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
                  <p className="text-xs text-yellow-300 leading-relaxed">
                    By selecting this division, you acknowledge that Teez tokens
                    are digital play credits only and cannot be withdrawn,
                    redeemed, or converted to cash.
                  </p>
                </div>
              )}
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

      {/* RECAPTCHA */}
      <div id="recaptcha-container"></div>
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
    <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-center space-y-1">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-green-400">#{value}</p>
      <p
        className={`text-xs ${
          isUp ? "text-green-400" : isDown ? "text-red-400" : "text-gray-400"
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
    <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-center">
      <p className="text-xs text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-green-400">{value}</p>
    </div>
  );
}


