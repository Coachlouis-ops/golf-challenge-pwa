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
      console.log("Logged in UID:", user.uid);

      // --------------------------------------------------
      // PROFILE CHECK
      // --------------------------------------------------
      const profileRef = doc(db, "profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        console.log("Profile missing → redirect to profile page");
        router.replace("/profile");
        return;
      }

      const profile = profileSnap.data();

      if (!profile.name || !profile.surname || !profile.battleName) {
        console.log("Profile incomplete → redirect to profile page");
        router.replace("/profile");
        return;
      }

      // --------------------------------------------------
      // MEMBERSHIP CHECK
      // --------------------------------------------------
      const membershipRef = doc(db, "users", user.uid);
      const membershipSnap = await getDoc(membershipRef);

      if (!membershipSnap.exists()) {
        console.log("Membership record missing → redirect to payment");
        router.replace("/payment");
        return;
      }

      const membership = membershipSnap.data();

      if (membership.membershipStatus !== "active") {
        console.log("Membership inactive → redirect to payment");
        router.replace("/payment");
        return;
      }

      if (membership.membershipExpires) {
        const expires =
          typeof membership.membershipExpires.toDate === "function"
            ? membership.membershipExpires.toDate()
            : new Date(membership.membershipExpires);

        const now = new Date();

        if (now.getTime() > expires.getTime()) {
          console.log("Membership expired → redirect to payment");
          router.replace("/payment");
          return;
        }
      }

      setAllowed(true);
    })();
  }, [user, loading, router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking account...
      </div>
    );
  }

  return <>{children}</>;
}