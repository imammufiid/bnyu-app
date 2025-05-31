import {useEffect, useState} from 'react';
import {CircleTimer} from '../components/CircleTimer';
import {DURATION_KEY} from "../services/StorageService.ts";
import {ReminderNotification} from "../components/ReminderNotification.tsx";
import {DrinkReminder} from "../models/DrinkReminder.ts";
import {useFirestoreSaveCollection} from "../hooks/firebase/useFirestoreSaveCollection.ts";
import {Timestamp} from "firebase/firestore";

export const TimerPage = () => {

  const [duration, setDuration] = useState(0)
  const [showReminder, setShowReminder] = useState(false)
  const {save} = useFirestoreSaveCollection<DrinkReminder>("reminders")

  useEffect(() => {
    const duration = localStorage.getItem(DURATION_KEY)
    setDuration(duration ? parseInt(duration) : 0)
  }, []);

  const handleOnCompleteReminder = (isDrink: boolean) => {
    const data: DrinkReminder = {
      isDrink: isDrink,
      createdAt: Timestamp.now()
    }
    save(data).then()
    setShowReminder(false)
  }

  const handleOnComplete = () => {
    setShowReminder(true)
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      {showReminder && (
        <div className={'m-12'}>
          <ReminderNotification onComplete={handleOnCompleteReminder}/>
        </div>
      )}
      {!showReminder && (
        <>
          <h1 className="text-3xl font-bold mb-8 text-start w-full">Timer</h1>
          <CircleTimer
            duration={duration}
            onComplete={handleOnComplete}
          /></>
      )}
    </div>
  );
}; 