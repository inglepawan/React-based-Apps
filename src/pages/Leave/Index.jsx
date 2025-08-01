import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MyLeaves from './MyLeaves';
import LeaveRequests from './LeaveRequests';
import ApplyLeave from './ApplyLeave';
import './Leave.css';

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

  return (
    <div className="leave-container px-6 py-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-md">
      <h1 className="page-title text-3xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
        Leave Management
      </h1>

      <div className="leave-header flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="w-full md:w-auto"
          tabBarStyle={{ marginBottom: 0 }}
        >
          <TabPane tab="My Leaves" key="myLeaves" />
          <TabPane tab="Leave Requests" key="leaveRequests" />
        </Tabs>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className="apply-leave-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
        >
          Apply Leave
        </Button>
      </div>

      <div className="leave-content bg-white p-4 rounded-lg shadow-inner border border-gray-100">
        {activeTab === 'myLeaves' ? <MyLeaves /> : <LeaveRequests />}
      </div>

      <Modal
        title={<h2 className="text-xl font-semibold">Apply for Leave</h2>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
        className="rounded-xl"
        bodyStyle={{ padding: '1.5rem' }}
      >
        <ApplyLeave onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default Leave;
