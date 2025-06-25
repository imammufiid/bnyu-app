import {ReactNode, useEffect, useRef, useState} from "react";
import {TimerContext} from "../context/TimerContext.ts";

export const TimerProvider = ({children}: { children: ReactNode }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Ticking logic
  useEffect(() => {
    if (isRunning && startTimestamp !== null) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
        const remaining = Math.max(duration - elapsed, 0);
        setTimeRemaining(remaining);
        if (remaining < 0) {
          setIsRunning(false);
          setStartTimestamp(null);
          clearInterval(intervalRef.current!);
        }
      }, 1000);
      return () => clearInterval(intervalRef.current!);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isRunning, startTimestamp, duration]);

  // When timer stops, reset timeRemaining if needed
  useEffect(() => {
    if (!isRunning && timeRemaining === 0 && duration > 0) {
      setTimeRemaining(duration);
    }
  }, [isRunning, timeRemaining, duration]);

  return (
    <TimerContext.Provider value={{
      timeRemaining,
      setTimeRemaining,
      isRunning,
      setIsRunning,
      startTimestamp,
      setStartTimestamp,
      duration,
      setDuration
    }}>
      {children}
    </TimerContext.Provider>
  );
};