// src/hooks/firebase/useRegisterUser.ts
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, FirestoreCollection } from "../../services/FirebaseService";
import { UserWater } from "../../models/UserWater";

export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const register = async (email: string, displayName: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Register with Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Update display name in Firebase Auth
      await updateProfile(user, { displayName });

      // Use Firebase Auth UID as the user UID
      const userData: UserWater = {
        uid: user.uid,
        email,
        displayName,
        createdAt: Timestamp.now(),
        photoURL: user.photoURL ?? ""
      };

      // Save user to Firestore
      await setDoc(doc(db, FirestoreCollection.users, user.uid), userData);

      setSuccess("Registration successful!");
      setLoading(false);
      return userData;
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setLoading(false);
      return null;
    }
  };

  return { register, loading, error, success };
}