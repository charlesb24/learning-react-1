import { useState, useEffect } from 'react';

const INTERVAL = 10;

export default function ProgressBar({ TIMER }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);
  
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - INTERVAL);
    }, INTERVAL);

    return () => {
      clearInterval(updateInterval);
    }
  }, []);

  return (
    <progress value={remainingTime} max={TIMER}></progress>
  );
}