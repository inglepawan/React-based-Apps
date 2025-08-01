import React from 'react';
import { List, Avatar, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const AnniversaryList = () => {
  const anniversaries = [
    {
      name: 'Jane Smith',
      date: 'Tomorrow',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Michael Chen',
      date: 'Aug 20',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      name: 'Emily Davis',
      date: 'Sep 5',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Anniversaries</h3>
      <List
        itemLayout="horizontal"
        dataSource={anniversaries}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-50 px-2 py-2 rounded-md transition">
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size="large" />}
              title={<span className="text-gray-900 font-medium">{item.name}</span>}
              description={
                <div className="flex items-center space-x-2 mt-1">
                  <Tag icon={<CalendarOutlined />} color="geekblue" className="px-2 py-0.5 text-sm">
                    Anniversary
                  </Tag>
                  <span className="text-gray-500 text-sm">{item.date}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AnniversaryList;
