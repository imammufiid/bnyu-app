import {useContext} from "react";
import {TimerContext, TimerContextType} from "../states/context/TimerContext.ts";

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimer must be used within TimerProvider');
  return context;
};