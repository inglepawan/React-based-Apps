import React from 'react';
import { Card, List, Avatar, Badge, Button } from 'antd';
import { CalendarOutlined, TrophyOutlined, StarOutlined } from '@ant-design/icons';

const AnniversaryList = () => {
  const anniversaries = [
    {
      name: 'Jane Smith',
      date: 'Tomorrow',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      department: 'Engineering',
      years: 5
    },
    {
      name: 'Michael Chen',
      date: 'Dec 20',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      department: 'Sales',
      years: 3
    },
    {
      name: 'Emily Davis',
      date: 'Dec 25',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      department: 'Marketing',
      years: 7
    },
    {
      name: 'David Wilson',
      date: 'Dec 28',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      department: 'HR',
      years: 2
    }
  ];

  const isToday = (date) => date === 'Today';
  const isTomorrow = (date) => date === 'Tomorrow';

  const getYearsBadge = (years) => {
    if (years >= 10) return { color: 'gold', text: `${years} Years` };
    if (years >= 5) return { color: 'silver', text: `${years} Years` };
    if (years >= 3) return { color: 'bronze', text: `${years} Years` };
    return { color: 'default', text: `${years} Years` };
  };

  return (
    <Card 
      title={
        <div className="flex items-center space-x-2">
          <TrophyOutlined className="text-yellow-500" />
          <span className="text-lg font-semibold">Work Anniversaries</span>
          <Badge count={anniversaries.length} size="small" />
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4">
        {anniversaries.map((person, index) => {
          const yearsBadge = getYearsBadge(person.years);
          const isSpecial = isToday(person.date) || isTomorrow(person.date);
          
          return (
            <div 
              key={index} 
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                isSpecial 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
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
                  {isSpecial && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <StarOutlined className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 truncate">{person.name}</h4>
                    {isSpecial && (
                      <Badge 
                        status="processing" 
                        text={isToday(person.date) ? "Today!" : "Tomorrow!"} 
                        className="text-yellow-600 font-medium"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{person.department}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <CalendarOutlined className="text-gray-400 text-xs" />
                    <span className="text-xs text-gray-500">
                      {person.date} • {person.years} years
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <Badge 
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    yearsBadge.color === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                    yearsBadge.color === 'silver' ? 'bg-gray-100 text-gray-800' :
                    yearsBadge.color === 'bronze' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}
                  count={yearsBadge.text}
                />
                
                {isSpecial && (
                  <Button 
                    type="primary" 
                    size="small" 
                    icon={<TrophyOutlined />}
                    className="bg-yellow-500 hover:bg-yellow-600 border-yellow-500"
                  >
                    Celebrate
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {anniversaries.filter(p => p.years >= 5).length}
            </div>
            <div className="text-xs text-gray-500">5+ Years</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {anniversaries.filter(p => p.years >= 3 && p.years < 5).length}
            </div>
            <div className="text-xs text-gray-500">3-4 Years</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {anniversaries.filter(p => p.years < 3).length}
            </div>
            <div className="text-xs text-gray-500">1-2 Years</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnniversaryList;
