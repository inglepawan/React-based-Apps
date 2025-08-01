import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  UserAddOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const items = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
    { key: 'employees', icon: <TeamOutlined />, label: <Link to="/employees">Employees</Link> },
    { key: 'attendance', icon: <ClockCircleOutlined />, label: <Link to="/attendance">Attendance</Link> },
    { key: 'leave', icon: <CalendarOutlined />, label: <Link to="/leave">Leave Management</Link> },
    { key: 'payroll', icon: <DollarOutlined />, label: <Link to="/payroll">Payroll</Link> },
    { key: 'performance', icon: <FileTextOutlined />, label: <Link to="/performance">Performance</Link> },
    { key: 'recruitment', icon: <UserAddOutlined />, label: <Link to="/recruitment">Recruitment</Link> },
    { key: 'settings', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen shadow-lg sticky top-0">
      <div className="p-4 text-xl font-semibold tracking-wide border-b border-gray-700">
        HRMS Menu
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={items}
        className="mt-2"
      />
    </div>
  );
};

export default Sidebar;
