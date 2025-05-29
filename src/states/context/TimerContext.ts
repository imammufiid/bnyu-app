import {createContext, Dispatch, SetStateAction} from 'react';

export type TimerContextType = {
  timeRemaining: number;
  setTimeRemaining: Dispatch<SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContextType | undefined>(undefined);
