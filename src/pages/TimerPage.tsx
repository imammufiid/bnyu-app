import {useEffect, useState} from 'react';
import {CircleTimer} from '../components/CircleTimer';
import {DURATION_KEY, REPEAT_KEY} from "../services/StorageService.ts";

export const TimerPage = () => {

  const [duration, setDuration] = useState(0)
  const [isRepeat, setIsRepeat] = useState<boolean>()
  useEffect(() => {
    const duration = localStorage.getItem(DURATION_KEY)
    const repeat = localStorage.getItem(REPEAT_KEY)
    setDuration(duration ? parseInt(duration) : 0)
    setIsRepeat(repeat === 'true')
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="text-3xl font-bold mb-8 text-start w-full">Timer</h1>
      <CircleTimer
        duration={duration}
        repeat={isRepeat ?? false}
        onComplete={() => {
        }}
      />
    </div>
  );
}; 