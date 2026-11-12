import { doc, getDoc } from "firebase/firestore";

import { db } from "@/src/lib/firebase";

export async function getWalletBalance(uid: string): Promise<number> {
  const snap = await getDoc(doc(db, "wallets", uid));

  if (!snap.exists()) return 0;

  const balance = Number(snap.data().balance ?? 0);

  return Number.isFinite(balance) ? balance : 0;
}
