import React, { useState } from 'react';
import { Tabs, Button, Modal, Card, Row, Col, Statistic, Badge } from 'antd';
import { PlusOutlined, CalendarOutlined, ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';
import ApplyLeave from './ApplyLeave';

const { TabPane } = Tabs;

const Leave = () => {
  const [activeTab, setActiveTab] = useState('myLeaves');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Mock data for leave statistics
  const leaveStats = [
    {
      title: 'Total Leave Days',
      value: 25,
      icon: <CalendarOutlined className="text-blue-500" />,
      color: 'blue'
    },
    {
      title: 'Used Leave Days',
      value: 12,
      icon: <ClockCircleOutlined className="text-orange-500" />,
      color: 'orange'
    },
    {
      title: 'Remaining Leave Days',
      value: 13,
      icon: <CheckOutlined className="text-green-500" />,
      color: 'green'
    }
  ];

  // Mock data for leave history
  const leaveHistory = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-11-15',
      endDate: '2024-11-20',
      days: 5,
      status: 'Approved',
      reason: 'Family vacation'
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-10-10',
      endDate: '2024-10-12',
      days: 2,
      status: 'Approved',
      reason: 'Medical appointment'
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2024-12-25',
      endDate: '2024-12-26',
      days: 1,
      status: 'Pending',
      reason: 'Personal matters'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'processing';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const MyLeaves = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {leaveStats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card className="text-center hover:shadow-md transition-shadow">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: `var(--${stat.color}-600)` }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Leave History */}
      <Card title="Leave History" className="shadow-sm">
        <div className="space-y-4">
          {leaveHistory.map((leave) => (
            <div key={leave.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CalendarOutlined className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{leave.type}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">{leave.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{leave.days} days</div>
                <Badge 
                  status={getStatusColor(leave.status)} 
                  text={
                    <span className={`font-medium ${
                      leave.status === 'Approved' ? 'text-green-600' : 
                      leave.status === 'Rejected' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {leave.status}
                    </span>
                  } 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const LeaveRequests = () => (
    <div className="space-y-6">
      <Card title="Pending Leave Requests" className="shadow-sm">
        <div className="space-y-4">
          {leaveHistory.filter(leave => leave.status === 'Pending').map((leave) => (
            <div key={leave.id} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ClockCircleOutlined className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{leave.type}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">{leave.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{leave.days} days</div>
                <Badge status="processing" text="Pending" />
              </div>
            </div>
          ))}
          {leaveHistory.filter(leave => leave.status === 'Pending').length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pending leave requests
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage your leave requests and track your leave balance</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={showModal}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Apply Leave
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: 'myLeaves',
              label: 'My Leaves',
              children: <MyLeaves />
            },
            {
              key: 'leaveRequests',
              label: 'Leave Requests',
              children: <LeaveRequests />
            }
          ]}
        />
      </Card>

      {/* Apply Leave Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <CalendarOutlined className="text-blue-500" />
            <span className="text-xl font-semibold">Apply for Leave</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <ApplyLeave onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default Leave;
