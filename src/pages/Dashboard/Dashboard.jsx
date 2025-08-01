import React, { Suspense, lazy } from 'react';
import { Row, Col, Card, Statistic, Progress, Button } from 'antd';
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

const LiveClock = lazy(() => import('../../components/dashboard/LiveClock'));
const AttendanceWidget = lazy(() => import('../../components/dashboard/AttendanceWidget'));
const CalendarWidget = lazy(() => import('../../components/dashboard/CalendarWidget'));
const BirthdayList = lazy(() => import('../../components/dashboard/BirthdayList'));
const AnniversaryList = lazy(() => import('../../components/dashboard/AnniversaryList'));
const QuickLinks = lazy(() => import('../../components/dashboard/QuickLinks'));

const Dashboard = () => {
  // Mock data for statistics
  const stats = [
    {
      title: 'Total Employees',
      value: 156,
      prefix: <UserOutlined />,
      suffix: '',
      valueStyle: { color: '#3f8600' },
      prefixStyle: { color: '#52c41a' },
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Present Today',
      value: 142,
      prefix: <ClockCircleOutlined />,
      suffix: '',
      valueStyle: { color: '#1890ff' },
      prefixStyle: { color: '#1890ff' },
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Monthly Payroll',
      value: 125000,
      prefix: <DollarOutlined />,
      suffix: '',
      valueStyle: { color: '#722ed1' },
      prefixStyle: { color: '#722ed1' },
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Leave Requests',
      value: 8,
      prefix: <CalendarOutlined />,
      suffix: '',
      valueStyle: { color: '#fa8c16' },
      prefixStyle: { color: '#fa8c16' },
      change: '-2',
      changeType: 'decrease'
    }
  ];

  const LoadingCard = ({ title }) => (
    <Card className="h-full">
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="loading mb-2"></div>
          <p className="text-gray-500 text-sm">Loading {title}...</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your team today.</p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    valueStyle={stat.valueStyle}
                    prefixStyle={stat.prefixStyle}
                  />
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpOutlined className="text-green-500 mr-1" />
                    ) : (
                      <ArrowDownOutlined className="text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[24, 24]}>
        {/* Left Column */}
        <Col xs={24} lg={8}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Suspense fallback={<LoadingCard title="Live Clock" />}>
                <LiveClock />
              </Suspense>
            </Col>
            <Col span={24}>
              <Suspense fallback={<LoadingCard title="Quick Links" />}>
                <QuickLinks />
              </Suspense>
            </Col>
          </Row>
        </Col>

        {/* Center Column */}
        <Col xs={24} lg={10}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Suspense fallback={<LoadingCard title="Attendance" />}>
                <AttendanceWidget />
              </Suspense>
            </Col>
            <Col span={24}>
              <Suspense fallback={<LoadingCard title="Calendar" />}>
                <CalendarWidget />
              </Suspense>
            </Col>
          </Row>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={6}>
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Suspense fallback={<LoadingCard title="Birthdays" />}>
                <BirthdayList />
              </Suspense>
            </Col>
            <Col span={24}>
              <Suspense fallback={<LoadingCard title="Anniversaries" />}>
                <AnniversaryList />
              </Suspense>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Additional Metrics */}
      <Row gutter={[24, 24]} className="mt-8">
        <Col xs={24} lg={12}>
          <Card title="Department Performance" className="h-full">
            <div className="space-y-4">
              {[
                { name: 'Engineering', progress: 85, color: '#52c41a' },
                { name: 'Sales', progress: 72, color: '#1890ff' },
                { name: 'Marketing', progress: 68, color: '#722ed1' },
                { name: 'HR', progress: 91, color: '#fa8c16' }
              ].map((dept, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{dept.name}</span>
                    <span className="text-sm text-gray-500">{dept.progress}%</span>
                  </div>
                  <Progress 
                    percent={dept.progress} 
                    strokeColor={dept.color}
                    showInfo={false}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Activities" className="h-full">
            <div className="space-y-4">
              {[
                { action: 'New employee joined', time: '2 hours ago', type: 'success' },
                { action: 'Leave request approved', time: '4 hours ago', type: 'info' },
                { action: 'Payroll processed', time: '1 day ago', type: 'success' },
                { action: 'Performance review due', time: '2 days ago', type: 'warning' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
