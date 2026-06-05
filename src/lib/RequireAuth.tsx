"use client";

import { useEffect, useState } from "react";

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
  const [checking, setChecking] = useState(true);

  useEffect(() => {

    // -----------------------------------
    // FNB DEMO MODE
    // ALL AUTH / PROFILE / EMAIL CHECKS DISABLED
    // -----------------------------------

    setChecking(false);

  }, []);

  // 🔒 BLOCK RENDER UNTIL INITIAL CHECK COMPLETE
  if (checking) return null;

  return <>{children}</>;
}