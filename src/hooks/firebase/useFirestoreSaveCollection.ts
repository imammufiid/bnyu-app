import {useState} from "react";
import {
  addDoc,
  setDoc,
  doc,
  collection,
  Timestamp,
} from "firebase/firestore";
import {db} from "../../services/FirebaseService.ts";

interface UseSaveDataResult<T> {
  save: (data: T, id?: string) => Promise<void>;
  loading: boolean;
  error: unknown;
  success: boolean;
}

export function useFirestoreSaveCollection<T>(
  collectionName: string
): UseSaveDataResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState(false);

  const save = async (data: T, id?: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const docData = {
        ...data,
        createdAt: (data as any).createdAt ?? Timestamp.now(),
      };

      if (id) {
        const ref = doc(collection(db, collectionName), id);
        await setDoc(ref, docData);
      } else {
        await addDoc(collection(db, collectionName), docData);
      }

      setSuccess(true);
    } catch (err) {
      console.log('asdfasdfasdf', err);
      
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {save, loading, error, success};
}
