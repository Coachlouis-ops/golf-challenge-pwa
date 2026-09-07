"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "./firebase";

type SubscriptionStatus =
  | "active"
  | "inactive"
  | "cancelled"
  | "expired"
  | "pending";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  subscriptionStatus: SubscriptionStatus;
  isSubscribed: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  subscriptionStatus: "inactive",
  isSubscribed: false,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>("inactive");

  useEffect(() => {
    let unsubscribeUserDocument: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        setLoading(true);

        if (unsubscribeUserDocument) {
          unsubscribeUserDocument();
          unsubscribeUserDocument = null;
        }

        if (!firebaseUser) {
          setUser(null);
          setSubscriptionStatus("inactive");
          setLoading(false);
          return;
        }

        try {
          const isPhoneOnlyUser =
            firebaseUser.providerData.length === 1 &&
            firebaseUser.providerData[0]?.providerId === "phone";

          if (isPhoneOnlyUser) {
            console.log(
              "Skipping bootstrap for temporary phone auth user"
            );

            setUser(null);
            setSubscriptionStatus("inactive");
            setLoading(false);
            return;
          }

          const uid = firebaseUser.uid;

          // -----------------------------------
          // SCORING CLUB CHECK
          // -----------------------------------
          const scoringClubRef = doc(
            db,
            "scoringClubs",
            uid
          );

          const scoringClubSnap =
            await getDoc(scoringClubRef);

          if (scoringClubSnap.exists()) {
            setUser(firebaseUser);
            setSubscriptionStatus("active");
            setLoading(false);
            return;
          }

          // -----------------------------------
// PROFILE CHECK
// Profile creation is handled securely elsewhere.
// Auth bootstrap must never fail because a profile
// or wallet does not yet exist.
// -----------------------------------
const profileRef = doc(
  db,
  "profiles",
  uid
);

try {
  await getDoc(profileRef);
} catch (error) {
  console.warn(
    "Profile read skipped during auth bootstrap:",
    error
  );
}


// -----------------------------------
// WALLET CHECK
// Wallet creation / updates are server-controlled.
// Do not attempt client-side writes here.
// -----------------------------------
const walletRef = doc(
  db,
  "wallets",
  uid
);

try {
  await getDoc(walletRef);
} catch (error) {
  console.warn(
    "Wallet read skipped during auth bootstrap:",
    error
  );
}
          // -----------------------------------
          // USER SUBSCRIPTION CHECK / CREATE
          // -----------------------------------
          const userRef = doc(
            db,
            "users",
            uid
          );

          const userSnap =
            await getDoc(userRef);

          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid,
              email: firebaseUser.email ?? "",
              role: "player",

              subscriptionStatus: "inactive",
              subscriptionPlan: "",
              subscriptionStartedAt: null,
              subscriptionExpires: null,

              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }

          setUser(firebaseUser);

          // -----------------------------------
          // LIVE SUBSCRIPTION LISTENER
          // -----------------------------------
          unsubscribeUserDocument = onSnapshot(
            userRef,
            (snapshot) => {
              if (!snapshot.exists()) {
                setSubscriptionStatus("inactive");
                setLoading(false);
                return;
              }

              const userData = snapshot.data();

              const liveSubscriptionStatus =
                (userData.subscriptionStatus as SubscriptionStatus) ||
                "inactive";

              setSubscriptionStatus(
                liveSubscriptionStatus
              );

              setLoading(false);
            },
            (error) => {
              console.error(
                "Subscription listener error:",
                error
              );

              setSubscriptionStatus("inactive");
              setLoading(false);
            }
          );
        } catch (err) {
          console.error(
            "Auth bootstrap error:",
            err
          );

          setUser(firebaseUser);
          setSubscriptionStatus("inactive");
          setLoading(false);
        }
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeUserDocument) {
        unsubscribeUserDocument();
      }
    };
  }, []);

  const isSubscribed =
    subscriptionStatus === "active";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        subscriptionStatus,
        isSubscribed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}