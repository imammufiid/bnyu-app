import {User} from "firebase/auth";
import {useEffect, useState} from "react";
import {USER_KEY} from "../services/StorageService.ts";

export function useUserSession() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } catch (e) {
        console.error('Invalid user JSON in localStorage:', e);
      }
    }
  }, []);

  return {user};
}