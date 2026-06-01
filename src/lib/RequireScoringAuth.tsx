"use client";

import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function RequireScoringAuth({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, loading } = useAuth();

  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {

    if (loading) return;

  if (!user) {

  setChecking(false);

  router.replace("/teez-scoring/login");

  return;
}

    async function checkScoringAccess() {

      try {

        const ref = doc(
          db,
          "scoringClubs",
         user!.uid
        );

        const snap = await getDoc(ref);

        if (!snap.exists()) {
          router.replace("/");
          return;
        }

        const data = snap.data();

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

      } finally {

        setChecking(false);

      }
    }

    checkScoringAccess();

  }, [user, loading, router]);

  if (loading || checking) return null;

  return <>{children}</>;
}