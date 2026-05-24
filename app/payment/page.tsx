"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/src/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [accepted, setAccepted] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(true);

  // -----------------------------------
  // LOAD PROFILE
  // -----------------------------------
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const ref = doc(db, "profiles", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("Profile not found");
          router.push("/profile");
          return;
        }

        const data = snap.data();

        setProfile(data);

        // -----------------------------------
        // BLOCK UNVERIFIED USERS
        // -----------------------------------
        if (!data.phoneVerified) {
          router.push("/verify-phone");
          return;
        }

        setCheckingVerification(false);

      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
        router.push("/verify-phone");
      }
    })();
  }, [user, router]);

  // -----------------------------------
  // STRIPE (DISABLED)
  // -----------------------------------
  async function startStripe() {
    alert("Stripe (International) coming soon");
  }

  // -----------------------------------
  // PAYFAST
  // -----------------------------------
  async function startPayFast() {

    // -----------------------------------
    // TERMS
    // -----------------------------------
    if (!accepted) {
      alert("You must accept the Terms & Conditions");
      return;
    }

    // -----------------------------------
    // USER CHECK
    // -----------------------------------
    if (!user || !profile) {
      alert("User profile not loaded");
      return;
    }

    // -----------------------------------
    // PHONE VERIFICATION CHECK
    // -----------------------------------
    if (!profile.phoneVerified) {
      alert("Phone number not verified");
      router.push("/verify-phone");
      return;
    }

    const res = await fetch("/api/payfast-initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 10.99,
        item_name: "Teez Golf Membership",
        name_first: profile.name || "",
        name_last: profile.surname || "",
        email_address: user.email,
        uid: user.uid,
        type: "membership",
        tokens: 0,
      }),
    });

    const response = await res.json();

    if (!response.url || !response.data) {
      alert("PayFast error");
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = response.url;

    Object.entries(response.data).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  // -----------------------------------
  // LOADING
  // -----------------------------------
  if (loading || checkingVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10 px-6">

      {/* HERO */}
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl font-bold text-green-400">
          WELCOME
        </h1>

        <h2 className="text-3xl font-semibold">
          Start Your Journey
        </h2>

        <p className="text-gray-400 max-w-xl">
          Enter the world of competitive golf challenges.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-zinc-800 border border-zinc-600 p-8 rounded-xl shadow-xl flex flex-col gap-6 text-center max-w-md">

        <h3 className="text-xl font-bold text-green-400">
          Teez Golf Membership
        </h3>

        <p className="text-4xl font-bold">
          R189.99
          <span className="text-sm text-gray-400"> / year</span>
        </p>

        {/* LEGAL BLOCK */}
        <div className="text-xs text-gray-400 space-y-2 text-left">

          <p>
            Payments are processed by <strong>Honey Badger Technologies (PTY) LTD</strong> via PayFast.
          </p>

          <p>
            By proceeding, you agree to the{" "}
            <span
              onClick={() => router.push("/legal/terms")}
              className="underline cursor-pointer text-green-400"
            >
              Terms & Conditions
            </span>.
          </p>

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>I agree to the Terms & Conditions</span>
          </label>

        </div>

        {/* PAYFAST */}
        <button
          onClick={startPayFast}
          disabled={!accepted}
          className={`px-8 py-3 rounded-lg font-semibold ${
            accepted
              ? "bg-green-500 hover:bg-green-400 text-black"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          Pay with PayFast
        </button>

        {/* STRIPE */}
        <button
          onClick={startStripe}
          className="bg-gray-500 text-black font-semibold px-8 py-3 rounded-lg cursor-not-allowed"
        >
          Pay with Stripe (Coming Soon)
        </button>

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        className="text-sm text-gray-400 underline"
      >
        Back to Dashboard
      </button>

    </div>
  );
}