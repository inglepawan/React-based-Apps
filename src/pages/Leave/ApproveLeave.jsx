import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, Modal, message, Avatar } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { getLeaveRequests, approveLeave, rejectLeave } from '../../api/leave';

const ApproveLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await getLeaveRequests();
        setLeaves(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      message.success('Leave approved successfully');
      setLeaves(leaves.filter(leave => leave.id !== id));
    } catch {
      message.error('Failed to approve leave');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      message.success('Leave rejected successfully');
      setLeaves(leaves.filter(leave => leave.id !== id));
    } catch {
      message.error('Failed to reject leave');
    }
  };

  const showDetails = (leave) => {
    setSelectedLeave(leave);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.employeeAvatar} size="small" />
          <span className="text-gray-800 font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
    },
    {
      title: 'Date Range',
      dataIndex: 'dateRange',
      key: 'dateRange',
      render: (_, record) => (
        `${record.startDate} to ${record.endDate}`
      ),
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={
            status === 'Pending'
              ? 'orange'
              : status === 'Approved'
              ? 'green'
              : 'red'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showDetails(record)}>
            View
          </Button>
          <Button
            type="text"
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== 'Pending'}
            className="text-green-600 hover:text-green-800"
          >
            Approve
          </Button>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
            disabled={record.status !== 'Pending'}
            className="text-red-600 hover:text-red-800"
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-7xl mx-auto mt-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Approve Leave Requests
      </h1>

      <Table
        columns={columns}
        dataSource={leaves}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="rounded-xl"
      />

      <Modal
        title="Leave Request Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedLeave && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Avatar src={selectedLeave.employeeAvatar} size="small" />
              <span className="font-semibold text-gray-800">{selectedLeave.employeeName}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Leave Type: </span>
              {selectedLeave.leaveType}
            </div>
            <div>
              <span className="font-medium text-gray-600">Date Range: </span>
              {selectedLeave.startDate} to {selectedLeave.endDate}
            </div>
            <div>
              <span className="font-medium text-gray-600">Days: </span>
              {selectedLeave.days}
            </div>
            <div>
              <span className="font-medium text-gray-600">Reason: </span>
              {selectedLeave.reason}
            </div>
            <div>
              <span className="font-medium text-gray-600">Status: </span>
              <Tag
                color={
                  selectedLeave.status === 'Pending'
                    ? 'orange'
                    : selectedLeave.status === 'Approved'
                    ? 'green'
                    : 'red'
                }
              >
                {selectedLeave.status}
              </Tag>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => {
                  handleApprove(selectedLeave.id);
                  setModalVisible(false);
                }}
                disabled={selectedLeave.status !== 'Pending'}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<CloseOutlined />}
                onClick={() => {
                  handleReject(selectedLeave.id);
                  setModalVisible(false);
                }}
                disabled={selectedLeave.status !== 'Pending'}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApproveLeave;
