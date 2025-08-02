import React from 'react';
import { Card, List, Button } from 'antd';
import {
  UserAddOutlined,
  FileTextOutlined,
  CalendarOutlined,
  DollarOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const links = [
    {
      title: 'Add Employee',
      icon: <UserAddOutlined className="text-blue-500" />,
      description: 'Register new employee',
      link: '/employees/add',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Leave Request',
      icon: <CalendarOutlined className="text-green-500" />,
      description: 'Apply for leave',
      link: '/leave/apply',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Payroll Report',
      icon: <DollarOutlined className="text-purple-500" />,
      description: 'View payroll details',
      link: '/payroll',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Performance',
      icon: <BarChartOutlined className="text-orange-500" />,
      description: 'Review performance',
      link: '/performance',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'HR Policies',
      icon: <FileTextOutlined className="text-indigo-500" />,
      description: 'Company policies',
      link: '/settings',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Settings',
      icon: <SettingOutlined className="text-gray-500" />,
      description: 'Account settings',
      link: '/settings',
      color: 'bg-gray-50 text-gray-600'
    }
  ];

  return (
    <Card 
      title={
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Quick Actions</span>
        </div>
      }
      className="h-full"
    >
      <div className="grid grid-cols-2 gap-3">
        {links.map((item, index) => (
          <Link key={index} to={item.link}>
            <div className={`p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300 ${item.color} hover:scale-105`}>
              <div className="flex items-center space-x-3">
                <div className="text-xl">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                  <p className="text-xs opacity-75 truncate">{item.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Recent Activity Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {[
            { text: 'New employee John Doe added', time: '2h ago' },
            { text: 'Leave request approved', time: '4h ago' },
            { text: 'Payroll processed', time: '1d ago' }
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 truncate">{activity.text}</span>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuickLinks;
