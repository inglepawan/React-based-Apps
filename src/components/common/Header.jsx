import React from 'react';
import { Avatar, Dropdown, Menu, Badge, Button } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  SearchOutlined,
  MenuOutlined
} from '@ant-design/icons';

const Header = () => {
  const menu = (
    <Menu className="w-48 rounded-lg shadow-lg border border-gray-200">
      <Menu.Item key="profile" icon={<UserOutlined />} className="hover:bg-gray-50 rounded-md px-4 py-3">
        <span className="font-medium">My Profile</span>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} className="hover:bg-gray-50 rounded-md px-4 py-3">
        <span className="font-medium">Settings</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} className="hover:bg-red-50 rounded-md px-4 py-3 text-red-600">
        <span className="font-medium">Sign Out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">HRMS Portal</h1>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2 w-80">
          <SearchOutlined className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search employees, reports..." 
            className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Badge count={3} size="small" className="cursor-pointer">
          <Button 
            type="text" 
            icon={<BellOutlined className="text-lg" />} 
            className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors"
          />
        </Badge>
        
        {/* User Menu */}
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
            <Avatar 
              size={36}
              icon={<UserOutlined />} 
              className="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </Dropdown>
        
        {/* Mobile Menu Button */}
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-lg transition-colors"
        />
      </div>
    </header>
  );
};

export default Header;
