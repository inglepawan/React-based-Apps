import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Avatar, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { getEmployees } from '../../api/employee';


const { Search } = Input;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredEmployees = employees.filter(employee => {
    const searchStr = searchText.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchStr) ||
      employee.department.toLowerCase().includes(searchStr) ||
      employee.position.toLowerCase().includes(searchStr) ||
      employee.email.toLowerCase().includes(searchStr)
    );
  });

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-4">
          <Avatar src={record.avatar} size="large" />
          <div>
            <div className="font-semibold text-gray-800">{text}</div>
            <div className="text-sm text-gray-500">{record.employeeId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'} className="px-2 py-1 rounded-full text-xs font-medium">
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => navigate(`/employees/${record.id}`)}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </Button>
          <Button type="link" className="text-yellow-600 hover:text-yellow-800">
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Employee Directory</h1>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => navigate('/employees/add')}
        >
          Add Employee
        </Button>
      </div>

      <div className="mb-6">
        <Search
          placeholder="Search employees"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ maxWidth: 400 }}
          className="shadow-sm"
        />
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm border">
        <Table 
          columns={columns} 
          dataSource={filteredEmployees} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
