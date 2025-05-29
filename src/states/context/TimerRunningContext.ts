import {createContext} from "react";

export type TimerRunningContextType = {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

export const TimerRunningContext = createContext<TimerRunningContextType | undefined>(undefined)