import {useContext} from "react";
import {UserAccountContext, UserAccountContextType} from "../states/context/UserAccountContext.ts";

export const useUserAccount = (): UserAccountContextType => {
  const context = useContext(UserAccountContext);
  if (!context) throw new Error('useUserAccount must be used within TimerProvider');
  return context;
}