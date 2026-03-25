"use client";

import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const profileCheckedRef = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    (async () => {
      // 🔥 ALWAYS REFRESH USER FIRST
      await user.reload();

      const freshUser = user;

      // 🔴 EMAIL NOT VERIFIED
      if (!freshUser.emailVerified) {
        if (pathname !== "/verify-email") {
          router.replace("/verify-email");
        }
        return;
      }

      // 🔒 Run once AFTER route stabilizes
      if (profileCheckedRef.current) return;

      const ref = doc(db, "profiles", freshUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        router.replace("/profile");
        profileCheckedRef.current = true;
        return;
      }

      const data = snap.data();

      if (!isProfileComplete(data)) {
        if (pathname !== "/profile") {
          router.replace("/profile");
        }
        profileCheckedRef.current = true;
        return;
      }

      profileCheckedRef.current = true;
    })();
  }, [user, loading, router, pathname]);

  if (loading) return null;

  return <>{children}</>;
}