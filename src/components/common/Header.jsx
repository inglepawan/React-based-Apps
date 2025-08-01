import React from 'react';
import { Avatar, Dropdown, Menu, Badge } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const Header = () => {
  const menu = (
    <Menu className="w-40 rounded-md shadow-md">
      <Menu.Item key="profile" icon={<UserOutlined />} className="hover:bg-gray-100 rounded-md px-4 py-2">
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} className="hover:bg-gray-100 rounded-md px-4 py-2">
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} className="hover:bg-red-100 rounded-md px-4 py-2 text-red-600">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">HRMS Portal</h1>
      </div>
      <div className="flex items-center space-x-6">
        <Badge count={5} className="cursor-pointer">
          <BellOutlined className="text-xl text-gray-600 hover:text-blue-500 transition-colors duration-200" />
        </Badge>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition">
            <Avatar icon={<UserOutlined />} />
            <span className="text-gray-700 font-medium hidden sm:inline-block">Admin User</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
