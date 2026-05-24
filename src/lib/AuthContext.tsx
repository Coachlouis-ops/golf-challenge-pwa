"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsub = onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        // -------------------------------------------------
        // LOGGED OUT
        // -------------------------------------------------

        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        try {

          // -------------------------------------------------
          // IMPORTANT FIX
          // -------------------------------------------------
          // Ignore temporary phone auth users
          // created during OTP verification
          // -------------------------------------------------

          const isPhoneOnlyUser =
            firebaseUser.providerData.length === 1 &&
            firebaseUser.providerData[0]?.providerId === "phone";

          if (isPhoneOnlyUser) {
            console.log(
              "Skipping bootstrap for temporary phone auth user"
            );

            setLoading(false);
            return;
          }

          const uid = firebaseUser.uid;

          // -------------------------------------------------
          // PROFILE CHECK / CREATE
          // -------------------------------------------------

          const profileRef = doc(db, "profiles", uid);
          const profileSnap = await getDoc(profileRef);

          if (!profileSnap.exists()) {

            await setDoc(profileRef, {
              uid,
              email: firebaseUser.email ?? "",

              name: "",
              surname: "",
              battleName: "",

              ranking: {
                club: 0,
                province: 0,
                national: 0,
                international: 0,
              },

              tokensPlayed: 0,
              tokensWon: 0,

              createdAt: serverTimestamp(),
            });

          }

          // -------------------------------------------------
          // WALLET CHECK / CREATE
          // -------------------------------------------------

          const walletRef = doc(db, "wallets", uid);
          const walletSnap = await getDoc(walletRef);

          if (!walletSnap.exists()) {

            await setDoc(walletRef, {
              purchasedTokens: 0,
              winningTokens: 0,
              lockedTokens: 0,

              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });

          }

          // -------------------------------------------------
          // PLAYER RANKING CHECK / CREATE
          // -------------------------------------------------

          const rankingRef = doc(db, "playerRankings", uid);
          const rankingSnap = await getDoc(rankingRef);

          if (!rankingSnap.exists()) {

            await setDoc(rankingRef, {
              club: 0,
              province: 0,
              national: 0,
              international: 0,

              updatedAt: serverTimestamp(),
            });

          }

          setUser(firebaseUser);

        } catch (err) {

          console.error(
            "Auth bootstrap error:",
            err
          );

        }

        setLoading(false);

      }
    );

    return () => unsub();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}