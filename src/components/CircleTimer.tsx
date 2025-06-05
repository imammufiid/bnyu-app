import {useEffect, useState} from "react";
import {useTimer} from "../hooks/useTimer.ts";
import {useTimerRunning} from "../hooks/useTimerRunning.ts";
import {REPEAT_KEY} from "../services/StorageService.ts";

type CircleTimerProps = {
  duration: number
  onComplete: () => void
}

export const CircleTimer = (props: CircleTimerProps) => {
  // Variables
  const size = 320
  const strokeWidth = 40
  const {duration, onComplete} = props
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  // Hooks
  const [isRepeat, setIsRepeat] = useState(false)
  const {timeRemaining, setTimeRemaining} = useTimer();
  const {isRunning, setIsRunning} = useTimerRunning()

  useEffect(() => {
    const repeat = localStorage.getItem(REPEAT_KEY)
    setIsRepeat(repeat === 'true')
  }, []);

  useEffect(() => {
    setTimeRemaining(duration);
    if (!isRepeat || !isRunning) return;
    setIsRunning(true);
  }, [isRepeat, duration]);

  // MARK: - Handle timer 
  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setTimeRemaining((prevState) => {
        if (prevState <= 1) {
          setIsRunning(false);
          setTimeRemaining(duration)
          onComplete();
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, isRunning, isRepeat, duration, onComplete]);

  const progress = timeRemaining / duration
  const strokeDashOffset = circumference * (1 - progress)

  const formatTime = (second: number) => {
    const mins = Math.floor(second / 60)
    const secs = second % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  return (
    <div style={{width: size, height: size, position: 'relative'}}>
      <svg width={size} height={size}>
        <circle
          stroke={"#ecf0f1"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          stroke={"#3498db"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={`${strokeDashOffset}`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s linear',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        {formatTime(timeRemaining)}
      </div>
      <div className={'flex gap-4 w-full items-center justify-center'}>
        {isRunning && (
          <button className="mt-4 font-semibold py-2 px-4 rounded"
                  style={{
                    backgroundColor: isRunning ? '#ba6e0d' : '#ecf0f1',
                    color: '#FFFFFF',
                    fontWeight: 'bold'
                  }}
                  onClick={handleStop}>
            Pause
          </button>
        )}
        {!isRunning && (
          <button className="mt-4 py-2 px-4 rounded"
                  style={{
                    backgroundColor: '#307c0c',
                    color: '#fff9f9',
                    fontWeight: 'bold'
                  }}
                  onClick={handleStart}>
            Start
          </button>
        )}

      </div>
    </div>
  )
}