// src/hooks/useGoogleAuth.ts
import { signInWithPopup, signOut, User } from "firebase/auth";
import { useState } from "react";
import {auth, googleProvider} from "../../services/FirebaseService.ts";

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, login, logout };
}
