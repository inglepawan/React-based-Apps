import React, { useState, useEffect } from 'react';
import { Button, Progress, Card, Statistic, Row, Col, Badge } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const AttendanceWidget = () => {
  const [attendance, setAttendance] = useState({ 
    present: 142, 
    absent: 14, 
    late: 8,
    total: 156 
  });
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn);
    // Here you would call your API to record the attendance
  };

  const totalDays = attendance.present + attendance.absent;
  const attendancePercentage = totalDays > 0 ? Math.round((attendance.present / totalDays) * 100) : 0;

  const todayStats = [
    {
      title: 'Present',
      value: attendance.present,
      icon: <CheckCircleOutlined className="text-green-500" />,
      color: '#52c41a'
    },
    {
      title: 'Absent',
      value: attendance.absent,
      icon: <CloseCircleOutlined className="text-red-500" />,
      color: '#ff4d4f'
    },
    {
      title: 'Late',
      value: attendance.late,
      icon: <ClockCircleOutlined className="text-orange-500" />,
      color: '#fa8c16'
    }
  ];

  return (
    <Card 
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarOutlined className="text-blue-500" />
            <span className="text-lg font-semibold">Today's Attendance</span>
          </div>
          <Badge status="success" text="Live" />
        </div>
      }
      className="h-full"
    >
      <div className="space-y-6">
        {/* Main Progress Circle */}
        <div className="text-center">
          <Progress
            type="circle"
            percent={attendancePercentage}
            format={(percent) => `${percent}%`}
            width={120}
            strokeColor={
              attendancePercentage > 90
                ? '#52c41a'
                : attendancePercentage > 70
                ? '#faad14'
                : '#ff4d4f'
            }
            strokeWidth={8}
          />
          <p className="text-sm text-gray-600 mt-2">Attendance Rate</p>
        </div>

        {/* Statistics Grid */}
        <Row gutter={[16, 16]}>
          {todayStats.map((stat, index) => (
            <Col span={8} key={index}>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.title}</div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <UserOutlined className="text-blue-500" />
              <span className="text-sm font-medium text-blue-700">Total Employees</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 mt-1">{attendance.total}</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircleOutlined className="text-green-500" />
              <span className="text-sm font-medium text-green-700">Present Today</span>
            </div>
            <div className="text-2xl font-bold text-green-900 mt-1">{attendance.present}</div>
          </div>
        </div>

        {/* Clock In/Out Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={handleClockInOut}
          className={`h-12 text-base font-medium ${
            isClockedIn 
              ? 'bg-red-500 hover:bg-red-600 border-red-500' 
              : 'bg-green-500 hover:bg-green-600 border-green-500'
          }`}
        >
          {isClockedIn ? 'Clock Out' : 'Clock In'}
        </Button>

        {/* Recent Activity */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Recent Clock-ins</h4>
          <div className="space-y-2">
            {[
              { name: 'John Doe', time: '8:30 AM', status: 'On Time' },
              { name: 'Jane Smith', time: '8:45 AM', status: 'Late' },
              { name: 'Mike Johnson', time: '8:15 AM', status: 'Early' }
            ].map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">{entry.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-900">{entry.time}</div>
                  <div className="text-xs text-gray-500">{entry.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceWidget;
