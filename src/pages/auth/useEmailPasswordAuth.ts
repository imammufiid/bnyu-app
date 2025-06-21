import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, FirestoreCollection } from "../../services/FirebaseService.ts";
import { UserWater } from "../../models/UserWater.ts";

export function useEmailPasswordAuth() {
  const [user, setUser] = useState<UserWater | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const authUser = result.user;
      // Fetch user data from Firestore
      const userRef = doc(db, FirestoreCollection.users, authUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUser(docSnap.data() as UserWater);
        setError(null);
        return docSnap.data() as UserWater;
      } else {
        setUser(null);
        setError("User not found in database.");
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { user, login, error, loading };
}