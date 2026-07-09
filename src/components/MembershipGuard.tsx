"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/lib/AuthContext";

export default function MembershipGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    (async () => {
      await user.reload();
      const freshUser = user;

      // ---------------- EMAIL CHECK ----------------
      if (!freshUser.emailVerified) {
        router.replace("/verify-email");
        return;
      }

      // ---------------- PROFILE CHECK ----------------
      const profileRef = doc(db, "profiles", freshUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        router.replace("/profile");
        return;
      }

      const profile = profileSnap.data();

      if (
        !profile.name ||
        !profile.surname ||
        !profile.battleName ||
        !profile.club ||
        !profile.division
      ) {
        router.replace("/profile");
        return;
      }

      // ---------------- PHONE CHECK ----------------
      if (!profile.phoneVerified) {
        router.replace("/verify-phone");
        return;
      }

      // ---------------- SUBSCRIPTION CHECK ----------------
      const userRef = doc(db, "users", freshUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        router.replace("/payment");
        return;
      }

      const userData = userSnap.data();

      if (userData.subscriptionStatus !== "active") {
        router.replace("/payment");
        return;
      }

      if (userData.subscriptionExpires) {
        const expires =
          typeof userData.subscriptionExpires.toDate === "function"
            ? userData.subscriptionExpires.toDate()
            : new Date(userData.subscriptionExpires);

        if (new Date().getTime() > expires.getTime()) {
          router.replace("/payment");
          return;
        }
      }

      setAllowed(true);
    })();
  }, [user, loading, router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Checking account...
      </div>
    );
  }

  return <>{children}</>;
}