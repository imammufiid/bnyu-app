import {ReactNode, useState} from "react";
import {TimerRunningContext} from "../context/TimerRunningContext.ts";

export const TimerRunningProvider = ({children}: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState(false)
  return (
    <TimerRunningContext.Provider value={{isRunning, setIsRunning}}>
      {children}
    </TimerRunningContext.Provider>
  )
};