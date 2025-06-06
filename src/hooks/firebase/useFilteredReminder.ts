import {collection, getDocs, DocumentData, query, orderBy, where} from "firebase/firestore";
import {db, FirestoreCollection} from "../../services/FirebaseService.ts";
import {useState} from "react";
import {FirestoreDoc} from "./useGetReminders.ts";


export function useFilteredReminders<T = DocumentData>(startDate: Date, endDate: Date) {
  const [data, setData] = useState<FirestoreDoc<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async (uid: string) => {
    setLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, FirestoreCollection.reminders),
        where("userId", "==", uid),
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FirestoreDoc<T>[];

      setData(items);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
