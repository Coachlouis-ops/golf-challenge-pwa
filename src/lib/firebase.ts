import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCnSwLt32Mnln_UfQKwtEvpSm6TLdqhlYg",
  authDomain: "teez-golf-challenges-v3.firebaseapp.com",
  projectId: "teez-golf-challenges-v3",
  storageBucket: "teez-golf-challenges-v3.firebasestorage.app",
  messagingSenderId: "549147966794",
  appId: "1:549147966794:web:8ddc1cbec036e639bd55b3",
};

const app = initializeApp(firebaseConfig);

/* ===== AUTH ===== */
export const auth = getAuth(app);

/* ===== FIRESTORE ===== */
export const db = getFirestore(app);

/* ===== FUNCTIONS ===== */
export const functions = getFunctions(app, "europe-west1");

/* ===== AUTH HELPERS ===== */

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function register(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await sendEmailVerification(userCred.user, {
  url: "https://www.teezgolfchallenges.com/verify-success",
});

  return userCred;
}

export async function logout() {
  return signOut(auth);
}