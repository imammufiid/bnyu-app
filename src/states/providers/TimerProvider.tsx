import {ReactNode, useState} from "react";
import {TimerContext} from "../context/TimerContext.ts";

export const TimerProvider = ({children}: { children: ReactNode }) => {
  const [timeRemaining, setTimeRemaining] = useState(0); // initial time in seconds

  return (
    <TimerContext.Provider value={{timeRemaining, setTimeRemaining}}>
      {children}
    </TimerContext.Provider>
  );
};