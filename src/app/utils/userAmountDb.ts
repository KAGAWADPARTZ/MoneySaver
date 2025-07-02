import { db } from "@/app/lib/auth";
import { collection, addDoc, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";

export interface UserEarnings {
  amount: number;
  timestamp: Date;
  needs: number;
  wants: number;
  savings: number;
  investment: number;
}

// Insert a new user amount into Firestore
export async function insertUserAmount(data: UserEarnings): Promise<void> {
  await addDoc(collection(db, "userAmounts"), {
    ...data,
    timestamp: new Date(),
  });
}

// Retrieve all user amounts from Firestore
export async function getUserAmounts(): Promise<UserEarnings[]> {
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "userAmounts"));
  return querySnapshot.docs.map((doc) => ({
    amount: doc.data().amount,
    timestamp: doc.data().timestamp.toDate ? doc.data().timestamp.toDate() : new Date(doc.data().timestamp),
    needs: doc.data().needs,
    wants: doc.data().wants,
    savings: doc.data().savings,
    investment: doc.data().investment,
}));
}
