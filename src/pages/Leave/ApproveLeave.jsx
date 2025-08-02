import React, { useState } from 'react';
import { Table, Button, Tag, Space, Modal, message, Avatar, Card, Row, Col, Statistic, Badge } from 'antd';
import { CheckOutlined, CloseOutlined, CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ApproveLeave = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      employeeAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      leaveType: 'Annual Leave',
      startDate: '2024-12-15',
      endDate: '2024-12-20',
      days: 5,
      status: 'Pending',
      reason: 'Family vacation',
      department: 'Engineering'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      leaveType: 'Sick Leave',
      startDate: '2024-12-10',
      endDate: '2024-12-12',
      days: 2,
      status: 'Approved',
      reason: 'Medical appointment',
      department: 'Marketing'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      leaveType: 'Personal Leave',
      startDate: '2024-12-25',
      endDate: '2024-12-26',
      days: 1,
      status: 'Pending',
      reason: 'Personal matters',
      department: 'Sales'
    },
    {
      id: 4,
      employeeName: 'Sarah Wilson',
      employeeAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      leaveType: 'Maternity Leave',
      startDate: '2024-01-01',
      endDate: '2024-04-01',
      days: 90,
      status: 'Approved',
      reason: 'Maternity leave',
      department: 'HR'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLeaves(leaves.map(leave => 
        leave.id === id ? { ...leave, status: 'Approved' } : leave
      ));
      message.success('Leave approved successfully');
    } catch {
      message.error('Failed to approve leave');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLeaves(leaves.map(leave => 
        leave.id === id ? { ...leave, status: 'Rejected' } : leave
      ));
      message.success('Leave rejected successfully');
    } catch {
      message.error('Failed to reject leave');
    } finally {
      setLoading(false);
    }
  };

  const showDetails = (leave) => {
    setSelectedLeave(leave);
    setModalVisible(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'processing';
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.employeeAvatar} size={40} className="border-2 border-gray-200" />
          <div>
            <div className="font-semibold text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.department}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      render: (type) => (
        <Tag color="blue" className="font-medium">{type}</Tag>
      )
    },
    {
      title: 'Date Range',
      dataIndex: 'dateRange',
      key: 'dateRange',
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-900">
            {new Date(record.startDate).toLocaleDateString()} - {new Date(record.endDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">{record.days} days</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={getStatusColor(status)} 
          text={
            <span className={`font-medium ${
              status === 'Approved' ? 'text-green-600' : 
              status === 'Rejected' ? 'text-red-600' : 'text-orange-600'
            }`}>
              {status}
            </span>
          } 
        />
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            onClick={() => showDetails(record)}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </Button>
          {record.status === 'Pending' && (
            <>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(record.id)}
                loading={loading}
                className="bg-green-500 hover:bg-green-600 border-green-500"
              >
                Approve
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleReject(record.id)}
                loading={loading}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const stats = [
    {
      title: 'Total Requests',
      value: leaves.length,
      icon: <CalendarOutlined className="text-blue-500" />,
      color: 'blue'
    },
    {
      title: 'Pending',
      value: leaves.filter(leave => leave.status === 'Pending').length,
      icon: <ClockCircleOutlined className="text-orange-500" />,
      color: 'orange'
    },
    {
      title: 'Approved',
      value: leaves.filter(leave => leave.status === 'Approved').length,
      icon: <CheckOutlined className="text-green-500" />,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Approval</h1>
          <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
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

      {/* Leave Requests Table */}
      <Card title="Leave Requests" className="shadow-sm">
        <Table
          columns={columns}
          dataSource={leaves}
          loading={loading}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} requests`
          }}
          className="custom-table"
        />
      </Card>

      {/* Leave Details Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <CalendarOutlined className="text-blue-500" />
            <span>Leave Request Details</span>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedLeave && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Avatar src={selectedLeave.employeeAvatar} size={48} />
              <div>
                <div className="font-semibold text-gray-900">{selectedLeave.employeeName}</div>
                <div className="text-sm text-gray-500">{selectedLeave.department}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Leave Type</label>
                <div className="mt-1">
                  <Tag color="blue">{selectedLeave.leaveType}</Tag>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Duration</label>
                <div className="mt-1 font-medium text-gray-900">{selectedLeave.days} days</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Start Date</label>
                <div className="mt-1 font-medium text-gray-900">
                  {new Date(selectedLeave.startDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">End Date</label>
                <div className="mt-1 font-medium text-gray-900">
                  {new Date(selectedLeave.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Reason</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-700">
                {selectedLeave.reason}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <Badge 
                  status={getStatusColor(selectedLeave.status)} 
                  text={
                    <span className={`font-medium ${
                      selectedLeave.status === 'Approved' ? 'text-green-600' : 
                      selectedLeave.status === 'Rejected' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {selectedLeave.status}
                    </span>
                  } 
                />
              </div>
            </div>
            
            {selectedLeave.status === 'Pending' && (
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    handleApprove(selectedLeave.id);
                    setModalVisible(false);
                  }}
                  loading={loading}
                  className="bg-green-500 hover:bg-green-600 border-green-500"
                  block
                >
                  Approve Request
                </Button>
                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => {
                    handleReject(selectedLeave.id);
                    setModalVisible(false);
                  }}
                  loading={loading}
                  block
                >
                  Reject Request
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApproveLeave;
