"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  db,
  storage,
} from "@/src/lib/firebase";

export default function EditClubPage() {

  const { uid } =
    useParams();

  const router =
    useRouter();

  const [clubName, setClubName] =
    useState("");

  const [contactPerson, setContactPerson] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [province, setProvince] =
    useState("");

  const [country, setCountry] =
    useState("");

const [logoUrl, setLogoUrl] =
  useState("");

const [logoFile, setLogoFile] =
  useState<File | null>(null);


  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function load() {

      const snap =
        await getDoc(
          doc(
            db,
            "scoringClubs",
            uid as string
          )
        );

      if (snap.exists()) {

        const club =
          snap.data();

        setClubName(
          club.clubName || ""
        );

        setContactPerson(
          club.contactPerson || ""
        );

        setEmail(
          club.email || ""
        );

        setPhone(
          club.phone || ""
        );

        setAddress(
          club.address || ""
        );

        setProvince(
          club.province || ""
        );

        setCountry(
          club.country || ""
        );

setLogoUrl(
  club.logoUrl || ""
);

      }
    }

    load();

  }, [uid]);

  async function saveClub() {

    try {

      setLoading(true);

 let uploadedLogoUrl =
  logoUrl;

if (logoFile) {

  const storageRef =
    ref(
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

await updateDoc(
  doc(
    db,
    "scoringClubs",
    uid as string
  ),
  {
    clubName,
    contactPerson,
    email,
    phone,
    address,
    province,
    country,
    logoUrl:
      uploadedLogoUrl,
  }
);

      alert(
        "Club updated"
      );

      router.push(
        "/admin/scoring-clubs"
      );

    } catch (err) {

      console.error(err);

      alert(
        "Failed to save"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-400 mb-10">
          EDIT CLUB
        </h1>

        <div className="space-y-4">

          <input value={clubName} onChange={(e)=>setClubName(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <input value={contactPerson} onChange={(e)=>setContactPerson(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <input value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <input value={province} onChange={(e)=>setProvince(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <input value={country} onChange={(e)=>setCountry(e.target.value)} className="w-full bg-neutral-900 p-4 rounded-xl" />

          <div className="bg-neutral-900 p-4 rounded-xl">

  {logoUrl && (

    <img
      src={logoUrl}
      alt="Club Logo"
      className="
        w-32
        h-32
        object-cover
        rounded-2xl
        mb-4
      "
    />

  )}

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setLogoFile(
        e.target.files?.[0] || null
      )
    }
  />

</div>

          <button
            onClick={saveClub}
            disabled={loading}
            className="
              w-full
              bg-yellow-400
              text-black
              font-bold
              py-4
              rounded-2xl
            "
          >
            {loading
              ? "SAVING..."
              : "SAVE CHANGES"}
          </button>

        </div>

      </div>

    </main>

  );
}