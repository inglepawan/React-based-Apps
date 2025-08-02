import React from 'react';
import { Card, List, Avatar, Badge, Button } from 'antd';
import { GiftOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';

const BirthdayList = () => {
  const birthdays = [
    {
      name: 'John Doe',
      date: 'Today',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      department: 'Engineering',
      age: 28
    },
    {
      name: 'Sarah Williams',
      date: 'Tomorrow',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      department: 'Marketing',
      age: 32
    },
    {
      name: 'Robert Johnson',
      date: 'Dec 15',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      department: 'Sales',
      age: 35
    },
    {
      name: 'Emily Davis',
      date: 'Dec 18',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      department: 'HR',
      age: 29
    }
  ];

  const isToday = (date) => date === 'Today';

  return (
    <Card 
      title={
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-pink-500" />
          <span className="text-lg font-semibold">Birthdays</span>
          <Badge count={birthdays.length} size="small" />
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4">
        {birthdays.map((person, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
              isToday(person.date) 
                ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200' 
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar 
                  src={person.avatar} 
                  size={48}
                  className="border-2 border-white shadow-sm"
                />
                {isToday(person.date) && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                    <GiftOutlined className="text-white text-xs" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 truncate">{person.name}</h4>
                  {isToday(person.date) && (
                    <Badge 
                      status="processing" 
                      text="Today!" 
                      className="text-pink-600 font-medium"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-600">{person.department}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <CalendarOutlined className="text-gray-400 text-xs" />
                  <span className="text-xs text-gray-500">
                    {person.date} • {person.age} years
                  </span>
                </div>
              </div>
            </div>
            
            {isToday(person.date) && (
              <div className="mt-3 pt-3 border-t border-pink-200">
                <Button 
                  type="primary" 
                  size="small" 
                  icon={<GiftOutlined />}
                  className="bg-pink-500 hover:bg-pink-600 border-pink-500 w-full"
                >
                  Send Wishes
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-pink-600">
              {birthdays.filter(p => p.date === 'Today').length}
            </div>
            <div className="text-xs text-gray-500">Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {birthdays.filter(p => p.date === 'Tomorrow').length}
            </div>
            <div className="text-xs text-gray-500">Tomorrow</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BirthdayList;
