import React, { useState, useEffect } from 'react';

const Timer = ({ seconds }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);

  useEffect(() => {

    if (remainingSeconds > 0) {
      setTimeout(() => {
        setRemainingSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    }

  }, [remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const secondsLeft = remainingSeconds % 60;

  return (
    <div className="timer card-custom">
      <div className="card-body">
        <h5 className="card-title">Timer</h5>
        <p className="card-text">Time Remaining: {minutes}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</p>
      </div>
    </div>
  );
};

export default Timer;