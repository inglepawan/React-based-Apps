import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'antd';
import { ClockCircleOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

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
    <Card 
      title={
        <div className="flex items-center space-x-2">
          <ClockCircleOutlined className="text-blue-500" />
          <span>Live Clock</span>
        </div>
      }
      className="h-full"
    >
      <div className="text-center space-y-6">
        {/* Time Display */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="text-4xl font-mono font-bold text-blue-600 tracking-wider mb-2">
            {hours}:{minutes}:{seconds}
          </div>
          <div className="text-sm text-gray-600">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge 
            status={isClockedIn ? "success" : "default"} 
            text={
              <span className={`font-medium ${isClockedIn ? 'text-green-600' : 'text-gray-500'}`}>
                {isClockedIn ? 'Currently Clocked In' : 'Not Clocked In'}
              </span>
            } 
          />
        </div>

        {/* Clock In/Out Button */}
        <Button
          type="primary"
          size="large"
          icon={isClockedIn ? <LogoutOutlined /> : <LoginOutlined />}
          onClick={handleClockInOut}
          className={`w-full h-12 text-base font-medium ${
            isClockedIn 
              ? 'bg-red-500 hover:bg-red-600 border-red-500' 
              : 'bg-green-500 hover:bg-green-600 border-green-500'
          }`}
        >
          {isClockedIn ? 'Clock Out' : 'Clock In'}
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">8:30 AM</div>
            <div className="text-xs text-gray-500">Start Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">5:30 PM</div>
            <div className="text-xs text-gray-500">End Time</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveClock;
