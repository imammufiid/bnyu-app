import { useCallback } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db, FirestoreCollection } from "../services/FirebaseService";

export function useAddPoints() {
  const addPoints = useCallback(
    async (amount: number, userId: string) => {
      if (!userId) return;

      const pointsRef = doc(db, FirestoreCollection.points, userId);
      const pointsSnap = await getDoc(pointsRef);

      if (pointsSnap.exists()) {
        await updateDoc(pointsRef, { points: increment(amount) });
      } else {
        await setDoc(pointsRef, { userId, points: amount });
      }
    },
    []
  );

  return { addPoints };
}