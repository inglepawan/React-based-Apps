import React from 'react';
import { Menu, Badge } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  UserAddOutlined,
  SettingOutlined,
  BarChartOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const getMenuKey = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/employees')) return 'employees';
    if (path.startsWith('/attendance')) return 'attendance';
    if (path.startsWith('/leave')) return 'leave';
    if (path.startsWith('/payroll')) return 'payroll';
    if (path.startsWith('/performance')) return 'performance';
    if (path.startsWith('/recruitment')) return 'recruitment';
    if (path.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined className="text-lg" />,
      label: <Link to="/" className="font-medium">Dashboard</Link>,
      className: 'menu-item'
    },
    {
      key: 'employees',
      icon: <TeamOutlined className="text-lg" />,
      label: <Link to="/employees" className="font-medium">Employees</Link>,
      className: 'menu-item'
    },
    {
      key: 'attendance',
      icon: <ClockCircleOutlined className="text-lg" />,
      label: (
        <div className="flex items-center justify-between w-full">
          <Link to="/attendance" className="font-medium">Attendance</Link>
          <Badge count={2} size="small" className="ml-2" />
        </div>
      ),
      className: 'menu-item'
    },
    {
      key: 'leave',
      icon: <CalendarOutlined className="text-lg" />,
      label: (
        <div className="flex items-center justify-between w-full">
          <Link to="/leave" className="font-medium">Leave Management</Link>
          <Badge count={5} size="small" className="ml-2" />
        </div>
      ),
      className: 'menu-item'
    },
    {
      key: 'payroll',
      icon: <DollarOutlined className="text-lg" />,
      label: <Link to="/payroll" className="font-medium">Payroll</Link>,
      className: 'menu-item'
    },
    {
      key: 'performance',
      icon: <BarChartOutlined className="text-lg" />,
      label: <Link to="/performance" className="font-medium">Performance</Link>,
      className: 'menu-item'
    },
    {
      key: 'recruitment',
      icon: <UserAddOutlined className="text-lg" />,
      label: (
        <div className="flex items-center justify-between w-full">
          <Link to="/recruitment" className="font-medium">Recruitment</Link>
          <Badge count={3} size="small" className="ml-2" />
        </div>
      ),
      className: 'menu-item'
    },
    {
      key: 'settings',
      icon: <SettingOutlined className="text-lg" />,
      label: <Link to="/settings" className="font-medium">Settings</Link>,
      className: 'menu-item'
    }
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen shadow-sm flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">HRMS</h2>
            <p className="text-xs text-gray-500">Human Resources</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={[getMenuKey()]}
          items={items}
          className="border-0 bg-transparent"
          style={{
            backgroundColor: 'transparent',
            border: 'none'
          }}
        />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
              + Add Employee
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
              📊 View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
