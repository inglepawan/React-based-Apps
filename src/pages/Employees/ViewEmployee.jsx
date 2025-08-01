import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Tabs, Avatar, Tag } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { getEmployeeById } from '../../api/employees';

const { TabPane } = Tabs;

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!employee) return <div className="text-center py-20 text-red-500">Employee not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/employees')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Employees
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/employees/edit/${id}`)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card
        className="shadow-md rounded-xl bg-white"
        loading={loading}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar size={100} src={employee.avatar} className="shadow-md" />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">{employee.name}</h1>
            <p className="text-gray-500">{employee.position}</p>
            <Tag color={employee.status === 'Active' ? 'green' : 'red'}>
              {employee.status}
            </Tag>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultActiveKey="1" className="mt-6">
          <TabPane tab="Basic Information" key="1">
            <Descriptions
              bordered
              column={1}
              className="bg-white rounded-md overflow-hidden"
              labelStyle={{ fontWeight: 'bold', backgroundColor: '#f9fafb' }}
            >
              <Descriptions.Item label="Employee ID">{employee.employeeId}</Descriptions.Item>
              <Descriptions.Item label="Department">{employee.department}</Descriptions.Item>
              <Descriptions.Item label="Position">{employee.position}</Descriptions.Item>
              <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{employee.phone}</Descriptions.Item>
              <Descriptions.Item label="Join Date">{employee.joinDate}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={employee.status === 'Active' ? 'green' : 'red'}>
                  {employee.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab="Attendance" key="2">
            <div className="bg-gray-100 p-4 rounded-md text-gray-700">
              <p>Attendance records will be displayed here</p>
            </div>
          </TabPane>

          <TabPane tab="Leave History" key="3">
            <div className="bg-gray-100 p-4 rounded-md text-gray-700">
              <p>Leave history will be displayed here</p>
            </div>
          </TabPane>

          <TabPane tab="Documents" key="4">
            <div className="bg-gray-100 p-4 rounded-md text-gray-700">
              <p>Employee documents will be displayed here</p>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ViewEmployee;
