import React, { Suspense, lazy } from 'react';
import { Row, Col } from 'antd';

const LiveClock = lazy(() => import('../../components/dashboard/LiveClock'));
const AttendanceWidget = lazy(() => import('../../components/dashboard/AttendanceWidget'));
const CalendarWidget = lazy(() => import('../../components/dashboard/CalendarWidget'));
const BirthdayList = lazy(() => import('../../components/dashboard/BirthdayList'));
const AnniversaryList = lazy(() => import('../../components/dashboard/AnniversaryList'));
const QuickLinks = lazy(() => import('../../components/dashboard/QuickLinks'));

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header>
        <h1 className="page-title" aria-label="Dashboard Main Heading">Dashboard</h1>
      </header>

      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} md={8}>
          <Suspense fallback={<div>Loading LiveClock...</div>}>
            <LiveClock />
          </Suspense>
          <Suspense fallback={<div>Loading QuickLinks...</div>}>
            <QuickLinks />
          </Suspense>
        </Col>

        <Col xs={24} md={16}>
          <Suspense fallback={<div>Loading Attendance...</div>}>
            <AttendanceWidget />
          </Suspense>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} lg={16}>
          <Suspense fallback={<div>Loading Calendar...</div>}>
            <CalendarWidget />
          </Suspense>
        </Col>

        <Col xs={24} lg={8}>
          <Suspense fallback={<div className="text-gray-500">Loading Birthdays...</div>}>
            <BirthdayList />
          </Suspense>
          <Suspense fallback={<div className="text-gray-500">Loading Anniversaries...</div>}>
            <AnniversaryList />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
