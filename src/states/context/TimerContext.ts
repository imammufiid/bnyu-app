import {createContext, Dispatch, SetStateAction} from 'react';

export type TimerContextType = {
  timeRemaining: number;
  setTimeRemaining: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  startTimestamp: number | null;
  setStartTimestamp: Dispatch<SetStateAction<number | null>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType | undefined>(undefined);
