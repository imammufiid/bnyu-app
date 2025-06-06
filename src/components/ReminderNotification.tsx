import {useCallback, useEffect, useRef, useState} from 'react';
import {BellIcon} from '@heroicons/react/24/outline';
import bellSound from './../assets/bell.wav'
import {ENABLE_NOTIFICATION_KEY} from "../services/StorageService.ts";

type ReminderNotificationProps = {
  onComplete: (isDrink: boolean) => void
}

export const ReminderNotification = (props: ReminderNotificationProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const isShowingNotification = localStorage.getItem(ENABLE_NOTIFICATION_KEY) === 'true'
    if (!isShowingNotification) return
    const notification = new Notification('Water Reminder', { body: 'LET\'S DRINK MOTHER FUCKER' });
    notification.onclick = () => {
      window.electronAPI?.focusAppWindow?.();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play().catch(err => {
        console.warn('Audio playback failed:', err);
      });
    }
  }, [isPlaying]);

  const stopSound = useCallback((isDrink: boolean) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset to start
      setIsPlaying(false);
      props.onComplete(isDrink)
    }
  }, [props.onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className="p-6 bg-yellow-100 rounded-full shadow-lg animate-bounce"
        title="ReminderNotification"
      >
        <BellIcon className="w-32 h-32 text-yellow-600"/>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => stopSound(true)}
          className="flex items-center px-4 py-2 rounded-lg shadow hover:bg-red-200 transition"
          style={{
            backgroundColor: '#29ac01',
            color: '#FFFFFF',
            fontWeight: 'bold'
          }}
        >
          Yes, I'm Drinking Water
        </button>
        <button
          onClick={() => stopSound(false)}
          className="flex w-full items-center justify-center px-4 py-2 text-white rounded-lg shadow-sm hover:bg-red-50 transition"
          style={{
            backgroundColor: '#ff1111',
            border: '1px solid #ff1111',
            fontWeight: 'bold'
          }}
        >
          Remind Me Later
        </button>
      </div>

      <audio
        ref={audioRef}
        src={bellSound} // Replace with your actual path or use imported asset
        preload="auto"
        loop
      />
    </div>
  );
};
