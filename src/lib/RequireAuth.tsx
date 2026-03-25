"use client";

import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function isProfileComplete(data: any): boolean {
  return (
    data &&
    data.name &&
    data.surname &&
    data.battleName &&
    data.country &&
    data.stateProvince &&
    data.club &&
    data.dateOfBirth &&
    data.idNumber &&
    data.phoneNumber
  );
}

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    (async () => {
      try {
        // 🔥 HARD SYNC WITH FIREBASE
        await user.reload();

        // 🔥 IMPORTANT: ALWAYS READ FROM AUTH (NOT STALE OBJECT)
        const freshUser = user;

        // 🔴 EMAIL VERIFICATION CHECK (AFTER RELOAD ONLY)
        if (!freshUser.emailVerified) {
          if (pathname !== "/verify-email") {
            router.replace("/verify-email");
          }
          return;
        }

        // 🔴 PROFILE CHECK
        const ref = doc(db, "profiles", freshUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          router.replace("/profile");
          return;
        }

        const data = snap.data();

        if (!isProfileComplete(data)) {
          if (pathname !== "/profile") {
            router.replace("/profile");
          }
          return;
        }

      } catch (err) {
        console.error("AUTH CHECK ERROR:", err);
      } finally {
        setChecking(false);
      }
    })();
  }, [user, loading, router, pathname]);

  // 🔒 BLOCK RENDER UNTIL EVERYTHING IS VERIFIED
  if (loading || checking) return null;

  return <>{children}</>;
}