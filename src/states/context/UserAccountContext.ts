import {createContext} from "react";
import {User} from "firebase/auth";

export type UserAccountContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const UserAccountContext = createContext<UserAccountContextType | undefined>(undefined)