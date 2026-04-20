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
  apiKey: "AIzaSyA8NcOQDCoC2L-Jdy9nJ6_02rtVrTf7Hao",
  authDomain: "teez-golf-challenges-v2.firebaseapp.com",
  projectId: "teez-golf-challenges-v2",
  storageBucket: "teez-golf-challenges-v2.firebasestorage.app",
  messagingSenderId: "121769323903",
  appId: "1:121769323903:web:108c71d502e2a4d22cbe4a",
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