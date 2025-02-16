import { useState, useEffect } from 'react';

export default function QuestionTimer({ duration, onTimeout, mode }) {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(onTimeout, duration);

    return () => clearTimeout(timer);
  }, [onTimeout, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 50);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id="question-time"
      value={timeRemaining}
      max={duration}
      className={mode} />
  );
}