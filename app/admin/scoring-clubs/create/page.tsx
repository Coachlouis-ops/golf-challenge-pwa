"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { httpsCallable } from "firebase/functions";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  functions,
  storage,
} from "@/src/lib/firebase";

export default function ScoringClubsPage() {

  const router = useRouter();

  const [clubName, setClubName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("South Africa");
const [logoUrl, setLogoUrl] = useState("");
const [logoFile, setLogoFile] = useState<File | null>(null);
const [status, setStatus] = useState("active");
const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function createClub() {

    if (!clubName || !email || !password) {
      alert("Complete all required fields");
      return;
    }

    try {

      setLoading(true);

      let uploadedLogoUrl = logoUrl;

if (logoFile) {

  const storageRef = ref(
    storage,
    `club-logos/${Date.now()}-${logoFile.name}`
  );

  await uploadBytes(
    storageRef,
    logoFile
  );

  uploadedLogoUrl =
    await getDownloadURL(
      storageRef
    );
}

      const createScoringClub =
        httpsCallable(
          functions,
          "createScoringClub"
        );

await createScoringClub({
  clubName,
  contactPerson,
  email,
  phone,
  address,
  province,
  country,
 logoUrl: uploadedLogoUrl,
  status,
  password,
});

await fetch(
  "/api/send-club-credentials",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      clubName,
      email,
      password,
    }),
  }
);

      alert("Scoring club created successfully");

      router.push(
        "/admin/scoring-clubs"
      );

    } catch (err: any) {

      console.error(err);

      alert(err.message);

    } finally {

      setLoading(false);

    }
  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-green-400 mb-10">
          ADD SCORING CLUB
        </h1>

        <div className="bg-neutral-900 border border-green-400/20 rounded-3xl p-8 space-y-6">

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Club Name
            </label>

            <input
              value={clubName}
              onChange={(e) =>
                setClubName(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Contact Person
            </label>

            <input
              value={contactPerson}
              onChange={(e) =>
                setContactPerson(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Address
            </label>

            <input
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Province / State
            </label>

            <input
              value={province}
              onChange={(e) =>
                setProvince(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Country
            </label>

            <input
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

         <div>

  <label className="block text-sm text-gray-400 mb-2">
    Club Logo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setLogoFile(
        e.target.files?.[0] || null
      )
    }
    className="
      w-full
      bg-black
      border border-white/10
      rounded-xl
      px-4
      py-3
    "
  />

</div>

<div>
  <label className="block text-sm text-gray-400 mb-2">
    Status
  </label>

  <select
    value={status}
    onChange={(e) =>
      setStatus(e.target.value)
    }
    className="
      w-full
      bg-black
      border border-white/10
      rounded-xl
      px-4
      py-3
    "
  >
    <option value="active">
      Active
    </option>

    <option value="inactive">
      Inactive
    </option>
  </select>
</div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Temporary Password
            </label>

          <input
  type="text"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
/>
          </div>

          <button
            onClick={createClub}
            disabled={loading}
            className="
              w-full
              bg-green-400
              text-black
              font-bold
              py-4
              rounded-2xl
              shadow-[0_0_25px_rgba(34,197,94,0.7)]
            "
          >
            {loading
              ? "CREATING..."
              : "CREATE SCORING CLUB"}
          </button>

        </div>

      </div>

    </main>

  );
}