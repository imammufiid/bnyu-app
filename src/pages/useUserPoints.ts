import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, FirestoreCollection } from "../services/FirebaseService";

export function useUserPoints() {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPoints = async (userId: string | null) => {
    if (!userId) {
      setPoints(null);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const pointsRef = doc(db, FirestoreCollection.points, userId);
      const pointsSnap = await getDoc(pointsRef);
      if (pointsSnap.exists()) {
        setPoints(pointsSnap.data().points ?? 0);
      } else {
        setPoints(0);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch points");
      setPoints(null);
    } finally {
      setLoading(false);
    }
  };

  return { points, loading, error, fetchPoints };
}