"use client";

import { useAuth } from "./AuthContext";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { db } from "./firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function RequireScoringAuth({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {

    if (loading) return;

    async function check() {

      // NOT LOGGED IN
      if (!user) {

        router.replace(
          "/teez-scoring/login"
        );

        return;
      }

      try {

        const ref = doc(
          db,
          "scoringClubs",
          user.uid
        );

        const snap =
          await getDoc(ref);

        // NOT SCORING CLUB
        if (!snap.exists()) {

          router.replace("/");

          return;
        }

        const data = snap.data();

        // DISABLED
        if (!data.active) {

          router.replace("/");

          return;
        }

      } catch (err) {

        console.error(
          "SCORING AUTH ERROR:",
          err
        );

        router.replace("/");

      }
    }

    check();

  }, [user, loading, router]);

  // IMPORTANT
  // only block while firebase auth loads

  if (loading) {
    return null;
  }

  return <>{children}</>;
}