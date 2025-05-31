import {collection, getDocs, DocumentData, query, orderBy} from "firebase/firestore";
import {db} from "../../services/FirebaseService.ts";
import {useState} from "react";

type FirestoreDoc<T> = T & { id: string };

export function useFirestoreGetCollection<T = DocumentData>(collectionName: string) {
  const [data, setData] = useState<FirestoreDoc<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, collectionName)
      const q = query(
        collectionRef,
        orderBy("createdAt", "desc") // ascending order
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

  return {data, loading, error, fetchData};
}