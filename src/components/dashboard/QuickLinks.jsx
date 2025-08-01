import React from 'react';
import { Card, List } from 'antd';
import {
  FileTextOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';

const QuickLinks = () => {
  const links = [
    {
      title: 'HR Policies',
      icon: <FileTextOutlined className="text-blue-600 text-xl" />,
      description: 'Company HR policies and guidelines'
    },
    {
      title: 'Forms',
      icon: <FormOutlined className="text-green-600 text-xl" />,
      description: 'Download HR related forms'
    },
    {
      title: 'Help Desk',
      icon: <QuestionCircleOutlined className="text-yellow-600 text-xl" />,
      description: 'Get help with HR related queries'
    },
    {
      title: 'Settings',
      icon: <SettingOutlined className="text-purple-600 text-xl" />,
      description: 'Configure your account settings'
    }
  ];

  return (
    <Card
      className="quick-links-card shadow-md rounded-2xl border border-gray-200 bg-white"
      bodyStyle={{ padding: '1.5rem' }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Quick Links
      </h3>
      <List
        itemLayout="horizontal"
        dataSource={links}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-50 transition-all duration-200 px-2 py-3 rounded-lg">
            <List.Item.Meta
              avatar={
                <div className="link-icon flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                  {item.icon}
                </div>
              }
              title={
                <a
                  href="#link"
                  className="text-md font-medium text-gray-900 hover:text-blue-600"
                >
                  {item.title}
                </a>
              }
              description={
                <p className="text-sm text-gray-600">{item.description}</p>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuickLinks;
