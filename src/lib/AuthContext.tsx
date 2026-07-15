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
          // PROFILE CHECK / CREATE
          // -----------------------------------
          const profileRef = doc(
            db,
            "profiles",
            uid
          );

          const profileSnap =
            await getDoc(profileRef);

          if (!profileSnap.exists()) {
            await setDoc(profileRef, {
              uid,
              email: firebaseUser.email ?? "",

              name: "",
              surname: "",
              battleName: "",
              club: "",
              division: "",

              phoneNumber: "",
              phoneVerified: false,

              stats: {
                matchesPlayed: 0,
                wins: 0,
                losses: 0,
                winPercentage: 0,
                currentStreak: 0,
                bestStreak: 0,
              },

              ranking: {
                club: 0,
                division: 0,
                national: 0,
              },

              achievements: [],

              tokensPlayed: 0,
              tokensWon: 0,

              profileComplete: false,

              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }

          // -----------------------------------
          // WALLET CHECK / CREATE
          // -----------------------------------
          const walletRef = doc(
            db,
            "wallets",
            uid
          );

          const walletSnap =
            await getDoc(walletRef);

          if (!walletSnap.exists()) {
            await setDoc(walletRef, {
              balance: 0,
              lifetimeWon: 0,
              lifetimeSpent: 0,

              subscriptionTokensIssued: 0,
              topUpTokensPurchased: 0,

              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
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

          // -----------------------------------
          // PLAYER RANKING CHECK / CREATE
          // -----------------------------------
          const rankingRef = doc(
            db,
            "playerRankings",
            uid
          );

          const rankingSnap =
            await getDoc(rankingRef);

          if (!rankingSnap.exists()) {
            await setDoc(rankingRef, {
              club: 0,
              division: 0,
              national: 0,
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