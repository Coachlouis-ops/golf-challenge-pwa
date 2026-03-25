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

    // 🔒 NOT LOGGED IN
    if (!user) {
      router.replace("/login");
      return;
    }

// 🔴 EMAIL NOT VERIFIED (USE FRESH STATE)
(async () => {
  await user.reload();

  const freshUser = user;

  if (!freshUser.emailVerified) {
    router.replace("/verify-email");
  }
})();

    // ✅ Stripe return bypass
    const isStripeReturn =
      typeof window !== "undefined" &&
      document.referrer.includes("stripe.com");

    if (isStripeReturn) {
      setAllowed(true);
      return;
    }

    (async () => {
      console.log("Logged in UID:", user.uid);

      // ---------------- PROFILE CHECK ----------------
      const profileRef = doc(db, "profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        router.replace("/profile");
        return;
      }

      const profile = profileSnap.data();

      if (!profile.name || !profile.surname || !profile.battleName) {
        router.replace("/profile");
        return;
      }

      // ---------------- MEMBERSHIP CHECK ----------------
      const membershipRef = doc(db, "users", user.uid);
      const membershipSnap = await getDoc(membershipRef);

      if (!membershipSnap.exists()) {
        router.replace("/payment");
        return;
      }

      const membership = membershipSnap.data();

      if (membership.membershipStatus !== "active") {
        router.replace("/payment");
        return;
      }

      if (membership.membershipExpires) {
        const expires =
          typeof membership.membershipExpires.toDate === "function"
            ? membership.membershipExpires.toDate()
            : new Date(membership.membershipExpires);

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
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking account...
      </div>
    );
  }

  return <>{children}</>;
}