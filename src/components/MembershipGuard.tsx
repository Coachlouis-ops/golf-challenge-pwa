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
      router.push("/login");
      return;
    }

    (async () => {
      console.log("Logged in UID:", user.uid);
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        router.push("/payment");
        return;
      }

      const data = snap.data();
      console.log("MEMBERSHIP DATA:", data);

      if (data.membershipStatus !== "active") {
  router.push("/payment");
  return;
}

if (data.membershipExpires) {

  const expires =
    typeof data.membershipExpires.toDate === "function"
      ? data.membershipExpires.toDate()
      : new Date(data.membershipExpires);

  const now = new Date();

  if (now.getTime() > expires.getTime()) {
    router.push("/payment");
    return;
  }

}

      setAllowed(true);
    })();
  }, [user, loading, router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking membership...
      </div>
    );
  }

  return <>{children}</>;
}