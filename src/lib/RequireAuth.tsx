"use client";

import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

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

    // 🔒 Run once per session
    if (profileCheckedRef.current) return;
    profileCheckedRef.current = true;

    (async () => {
      const ref = doc(db, "profiles", user.uid);
      const snap = await getDoc(ref);

      // 🔹 Create empty profile on first login
      if (!snap.exists()) {
        await setDoc(
          ref,
          {
            uid: user.uid,
            name: "",
            surname: "",
            battleName: "",
            country: "",
            stateProvince: "",
            dateOfBirth: "",
            idNumber: "",
            club: "",
            clubPlaceId: "",
            phoneNumber: "",
            photoUrl: "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            searchIndex: "",
          },
          { merge: true }
        );

        // force profile completion
        if (pathname !== "/profile") {
          router.replace("/profile");
        }
        return;
      }

      // 🔹 Enforce completion
      const data = snap.data();
    if (!isProfileComplete(data)) {
  if (pathname !== "/profile") {
    router.replace("/profile");
  }
  return;
}

// ✅ allow Stripe return + normal flow
if (pathname === "/profile") return;
    })();
  }, [user, loading, router, pathname]);

  if (loading) return null;

  return <>{children}</>;
}
