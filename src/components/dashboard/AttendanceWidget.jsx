import React, { useState, useEffect } from 'react';
import { Button, Progress, Card } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getAttendance } from '../../api/attendance';

const AttendanceWidget = () => {
  const [attendance, setAttendance] = useState({ present: 0, absent: 0 });
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance();
        setAttendance(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
    // Here you would call your API to record the attendance
  };

  const totalDays = attendance.present + attendance.absent;
  const attendancePercentage =
    totalDays > 0 ? Math.round((attendance.present / totalDays) * 100) : 0;

  return (
    <Card
      title={<span className="text-lg font-semibold text-gray-800">Attendance Summary</span>}
      loading={loading}
      className="h-full rounded-xl shadow-md border border-gray-100"
    >
      <div className="flex flex-col items-center space-y-6">
        <Progress
          type="circle"
          percent={attendancePercentage}
          format={(percent) => `${percent}%`}
          width={150}
          strokeColor={
            attendancePercentage > 80
              ? '#52c41a'
              : attendancePercentage > 50
              ? '#faad14'
              : '#f5222d'
          }
        />

        <div className="flex justify-between w-full px-6">
          <div className="text-center">
            <CheckCircleOutlined className="text-green-500 text-2xl mb-1" />
            <div className="text-base font-semibold text-gray-800">{attendance.present}</div>
            <div className="text-sm text-gray-500">Present</div>
          </div>

          <div className="text-center">
            <CloseCircleOutlined className="text-red-500 text-2xl mb-1" />
            <div className="text-base font-semibold text-gray-800">{attendance.absent}</div>
            <div className="text-sm text-gray-500">Absent</div>
          </div>
        </div>

        <Button
          type={isClockedIn ? 'danger' : 'primary'}
          className="w-full !rounded-md !py-2 !text-sm !font-medium"
          onClick={handleClockInOut}
        >
          {isClockedIn ? 'Punch Out' : 'Punch In'}
        </Button>
      </div>
    </Card>
  );
};

export default AttendanceWidget;
