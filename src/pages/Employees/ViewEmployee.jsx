import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Tabs, Avatar, Tag, Row, Col, Statistic, Badge, Progress } from 'antd';
import { ArrowLeftOutlined, EditOutlined, UserOutlined, CalendarOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock employee data
        const mockEmployee = {
          id: id,
          name: 'John Doe',
          employeeId: 'EMP001',
          email: 'john.doe@company.com',
          phone: '+1 (555) 123-4567',
          department: 'Engineering',
          position: 'Senior Developer',
          status: 'Active',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          joinDate: '2022-01-15',
          salary: 85000,
          manager: 'Jane Smith',
          location: 'New York',
          skills: ['React', 'Node.js', 'Python', 'AWS'],
          education: 'Bachelor of Computer Science',
          experience: '5 years'
        };
        
        setEmployee(mockEmployee);
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="loading mb-4"></div>
          <p className="text-gray-500">Loading employee details...</p>
        </div>
      </div>
    );
  }
  
  if (!employee) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-lg mb-2">Employee not found</div>
        <Button type="primary" onClick={() => navigate('/employees')}>
          Back to Employees
        </Button>
      </div>
    );
  }

  const attendanceStats = [
    {
      title: 'Present Days',
      value: 22,
      icon: <ClockCircleOutlined className="text-green-500" />,
      color: 'green'
    },
    {
      title: 'Leave Days',
      value: 3,
      icon: <CalendarOutlined className="text-orange-500" />,
      color: 'orange'
    },
    {
      title: 'Overtime Hours',
      value: 12,
      icon: <ClockCircleOutlined className="text-blue-500" />,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/employees')}
            className="text-gray-600 hover:text-gray-800"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Profile</h1>
            <p className="text-gray-600 mt-1">View and manage employee information</p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="large"
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview */}
      <Card className="shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-center md:text-left">
            <Avatar size={120} src={employee.avatar} className="border-4 border-gray-200 shadow-lg" />
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-lg text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
              <Badge 
                status={employee.status === 'Active' ? 'success' : 'error'} 
                text={
                  <span className={`font-medium ${employee.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {employee.status}
                  </span>
                } 
              />
            </div>
          </div>
          
          <div className="flex-1">
            <Row gutter={[16, 16]}>
              {attendanceStats.map((stat, index) => (
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
          </div>
        </div>
      </Card>

      {/* Employee Details */}
      <Card title="Employee Information" className="shadow-sm">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Basic Information',
              children: (
                <div className="space-y-6">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={12}>
                      <Descriptions
                        bordered
                        column={1}
                        size="small"
                        labelStyle={{ fontWeight: '600', backgroundColor: '#f9fafb' }}
                      >
                        <Descriptions.Item label="Employee ID">{employee.employeeId}</Descriptions.Item>
                        <Descriptions.Item label="Full Name">{employee.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{employee.phone}</Descriptions.Item>
                        <Descriptions.Item label="Department">{employee.department}</Descriptions.Item>
                        <Descriptions.Item label="Position">{employee.position}</Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Descriptions
                        bordered
                        column={1}
                        size="small"
                        labelStyle={{ fontWeight: '600', backgroundColor: '#f9fafb' }}
                      >
                        <Descriptions.Item label="Join Date">{new Date(employee.joinDate).toLocaleDateString()}</Descriptions.Item>
                        <Descriptions.Item label="Manager">{employee.manager}</Descriptions.Item>
                        <Descriptions.Item label="Location">{employee.location}</Descriptions.Item>
                        <Descriptions.Item label="Salary">${employee.salary.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Education">{employee.education}</Descriptions.Item>
                        <Descriptions.Item label="Experience">{employee.experience}</Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill, index) => (
                        <Tag key={index} color="blue" className="px-3 py-1 text-sm">
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )
            },
            {
              key: '2',
              label: 'Attendance',
              children: (
                <div className="space-y-6">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Card className="text-center">
                        <Progress
                          type="circle"
                          percent={95}
                          format={(percent) => `${percent}%`}
                          strokeColor="#52c41a"
                        />
                        <p className="mt-2 text-sm text-gray-600">Attendance Rate</p>
                      </Card>
                    </Col>
                    <Col xs={24} md={16}>
                      <Card title="Recent Attendance">
                        <div className="space-y-3">
                          {[
                            { date: '2024-12-01', status: 'Present', time: '08:30 AM - 05:30 PM' },
                            { date: '2024-12-02', status: 'Present', time: '08:45 AM - 05:15 PM' },
                            { date: '2024-12-03', status: 'Present', time: '08:15 AM - 05:45 PM' }
                          ].map((record, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <div className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</div>
                                <div className="text-sm text-gray-500">{record.time}</div>
                              </div>
                              <Badge status="success" text="Present" />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )
            },
            {
              key: '3',
              label: 'Leave History',
              children: (
                <Card title="Leave Records">
                  <div className="space-y-4">
                    {[
                      { type: 'Annual Leave', date: '2024-11-15 to 2024-11-20', days: 5, status: 'Approved' },
                      { type: 'Sick Leave', date: '2024-10-10 to 2024-10-12', days: 2, status: 'Approved' },
                      { type: 'Personal Leave', date: '2024-12-25 to 2024-12-26', days: 1, status: 'Pending' }
                    ].map((leave, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{leave.type}</h4>
                          <p className="text-sm text-gray-600">{leave.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{leave.days} days</div>
                          <Badge 
                            status={leave.status === 'Approved' ? 'success' : 'processing'} 
                            text={leave.status} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            },
            {
              key: '4',
              label: 'Documents',
              children: (
                <Card title="Employee Documents">
                  <div className="space-y-4">
                    {[
                      { name: 'Employment Contract', type: 'PDF', size: '2.5 MB', date: '2022-01-15' },
                      { name: 'ID Card', type: 'JPG', size: '1.2 MB', date: '2022-01-20' },
                      { name: 'Performance Review', type: 'PDF', size: '3.1 MB', date: '2024-06-15' }
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileOutlined className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                            <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{new Date(doc.date).toLocaleDateString()}</div>
                          <Button type="link" size="small">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default ViewEmployee;
