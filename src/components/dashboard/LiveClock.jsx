import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const hours = formatTime(currentTime.getHours());
  const minutes = formatTime(currentTime.getMinutes());
  const seconds = formatTime(currentTime.getSeconds());

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
    console.log(isClockedIn ? 'Clocked Out' : 'Clocked In');
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 flex flex-col items-center space-y-4 border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">Live Clock</h3>
      <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider">
        {hours}:{minutes}:{seconds}
      </div>
      <button
        className={`px-6 py-2 rounded-xl font-medium text-white shadow transition-all duration-300 ${
          isClockedIn
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
        onClick={handleClockInOut}
      >
        {isClockedIn ? 'Punch Out' : 'Punch In'}
      </button>
    </div>
  );
};

export default LiveClock;
