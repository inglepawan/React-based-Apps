import React from 'react';
import { List, Avatar, Tag } from 'antd';
import { GiftOutlined } from '@ant-design/icons';

const BirthdayList = () => {
  const birthdays = [
    {
      name: 'John Doe',
      date: 'Today',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Sarah Williams',
      date: 'Tomorrow',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'Robert Johnson',
      date: 'Aug 15',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Birthdays</h3>
      <List
        itemLayout="horizontal"
        dataSource={birthdays}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-50 px-2 py-2 rounded-md transition">
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size="large" />}
              title={<span className="text-gray-900 font-medium">{item.name}</span>}
              description={
                <div className="flex items-center space-x-2 mt-1">
                  <Tag icon={<GiftOutlined />} color="pink" className="px-2 py-0.5 text-sm">
                    Birthday
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

export default BirthdayList;
