import {TimerRunningContext, TimerRunningContextType} from "../states/context/TimerRunningContext.ts";
import {useContext} from "react";

export const useTimerRunning = (): TimerRunningContextType => {
  const context = useContext(TimerRunningContext);
  if (!context) throw new Error('useTimerRunning must be used within TimerProvider');
  return context;
}