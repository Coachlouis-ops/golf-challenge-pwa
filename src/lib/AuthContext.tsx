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
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const uid = firebaseUser.uid;

      try {
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

      } catch (err) {
        console.error("Auth bootstrap error:", err);
      }

      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}