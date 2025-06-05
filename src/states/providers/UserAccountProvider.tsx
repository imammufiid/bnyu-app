import {ReactNode, useState} from "react";
import {UserAccountContext} from "../context/UserAccountContext.ts";
import {User} from "firebase/auth";

export const UserAccountProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>()
  return (
    <UserAccountContext.Provider value={{user, setUser}}>
      {children}
    </UserAccountContext.Provider>
  )
};