import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  Space, 
  Avatar, 
  Tag, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Badge,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  UserAddOutlined, 
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  UserOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Search } = Input;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      employeeId: 'EMP001',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      joinDate: '2022-01-15',
      salary: 85000
    },
    {
      id: 2,
      name: 'Jane Smith',
      employeeId: 'EMP002',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      joinDate: '2021-08-20',
      salary: 75000
    },
    {
      id: 3,
      name: 'Mike Johnson',
      employeeId: 'EMP003',
      email: 'mike.johnson@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      joinDate: '2023-03-10',
      salary: 65000
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      employeeId: 'EMP004',
      email: 'sarah.wilson@company.com',
      department: 'HR',
      position: 'HR Specialist',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      joinDate: '2022-11-05',
      salary: 70000
    },
    {
      id: 5,
      name: 'David Brown',
      employeeId: 'EMP005',
      email: 'david.brown@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      status: 'Inactive',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      joinDate: '2023-01-20',
      salary: 72000
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredEmployees = employees.filter(employee => {
    const searchStr = searchText.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchStr) ||
      employee.department.toLowerCase().includes(searchStr) ||
      employee.position.toLowerCase().includes(searchStr) ||
      employee.email.toLowerCase().includes(searchStr) ||
      employee.employeeId.toLowerCase().includes(searchStr)
    );
  });

  const getStatusColor = (status) => {
    return status === 'Active' ? 'green' : 'red';
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': 'blue',
      'Marketing': 'purple',
      'Sales': 'orange',
      'HR': 'green',
      'Finance': 'cyan'
    };
    return colors[department] || 'default';
  };

  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => navigate(`/employees/${record.id}`)}>
        View Details
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit Employee
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
        Delete Employee
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.avatar} size={40} className="border-2 border-gray-200" />
          <div>
            <div className="font-semibold text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.employeeId}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (department) => (
        <Tag color={getDepartmentColor(department)} className="font-medium">
          {department}
        </Tag>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position) => (
        <span className="font-medium text-gray-700">{position}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'Active' ? 'success' : 'error'} 
          text={
            <span className={`font-medium ${status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </span>
          } 
        />
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => (
        <span className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Dropdown overlay={actionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} className="hover:bg-gray-100" />
        </Dropdown>
      ),
    },
  ];

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: <TeamOutlined className="text-blue-500" />,
      color: 'blue'
    },
    {
      title: 'Active Employees',
      value: employees.filter(emp => emp.status === 'Active').length,
      icon: <UserOutlined className="text-green-500" />,
      color: 'green'
    },
    {
      title: 'Departments',
      value: new Set(employees.map(emp => emp.department)).size,
      icon: <ClockCircleOutlined className="text-purple-500" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-gray-600 mt-1">Manage your organization's workforce</p>
        </div>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />}
          size="large"
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          onClick={() => navigate('/employees/add')}
        >
          Add Employee
        </Button>
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

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <Search
            placeholder="Search by name, ID, department, or email..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            style={{ width: 400 }}
            className="shadow-sm"
          />
          <div className="flex space-x-2">
            <Button>Filter</Button>
            <Button>Export</Button>
          </div>
        </div>
      </Card>

      {/* Employee Table */}
      <Card title="Employee List" className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={filteredEmployees} 
          loading={loading}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employees`
          }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};

export default EmployeeList;
