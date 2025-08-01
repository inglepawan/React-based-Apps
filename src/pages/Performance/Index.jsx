import React, { useState, useEffect } from 'react';
import { Tabs, Card, Progress, Table, Rate, Row, Col } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Performance = () => {
  const [activeTab, setActiveTab] = useState('myPerformance');
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setPerformanceData([
        {
          key: '1',
          quarter: 'Q1 2023',
          rating: 4.5,
          manager: 'Sarah Johnson',
          status: 'Completed',
        },
        {
          key: '2',
          quarter: 'Q4 2022',
          rating: 4.0,
          manager: 'Michael Chen',
          status: 'Completed',
        },
        {
          key: '3',
          quarter: 'Q3 2022',
          rating: 3.8,
          manager: 'Sarah Johnson',
          status: 'Completed',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: 'Period',
      dataIndex: 'quarter',
      key: 'quarter',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} allowHalf />,
    },
    {
      title: 'Reviewed By',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            status === 'Completed'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <a href="#view-details" className="text-blue-600">View Details</a>,
    },
  ];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Management</h1>

      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} className="bg-white p-4 rounded-lg shadow mb-6">
        <TabPane tab="My Performance" key="myPerformance" />
        <TabPane tab="Team Performance" key="teamPerformance" />
        <TabPane tab="Goals" key="goals" />
      </Tabs>

      {activeTab === 'myPerformance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Current Rating</h3>
              <div className="flex items-center gap-2">
                <Rate disabled defaultValue={4.2} allowHalf />
                <span className="text-gray-600 text-sm">4.2 / 5</span>
              </div>
            </Card>

            <Card className="shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Performance Trend</h3>
              <Progress percent={75} status="active" />
            </Card>

            <Card className="shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Rank in Department</h3>
              <div className="flex items-center gap-2">
                <TrophyOutlined className="text-yellow-500 text-xl" />
                <span className="text-gray-700 font-medium">#3</span>
              </div>
            </Card>
          </div>

          <Card className="shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Performance History</h3>
            <Table
              columns={columns}
              dataSource={performanceData}
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      )}

      {activeTab === 'teamPerformance' && (
        <Card className="shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600">Team Performance Dashboard (Coming Soon)</h3>
        </Card>
      )}

      {activeTab === 'goals' && (
        <Card className="shadow rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600">My Goals (Coming Soon)</h3>
        </Card>
      )}
    </div>
  );
};

export default Performance;
