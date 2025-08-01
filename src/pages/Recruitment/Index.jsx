import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Card, Dropdown, Menu, Tabs } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Recruitment = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        {
          key: '1',
          position: 'Senior React Developer',
          department: 'Engineering',
          type: 'Full-time',
          status: 'Active',
          applicants: 24,
          posted: '2023-07-15'
        },
        {
          key: '2',
          position: 'HR Manager',
          department: 'Human Resources',
          type: 'Full-time',
          status: 'Active',
          applicants: 18,
          posted: '2023-07-20'
        },
        {
          key: '3',
          position: 'Marketing Intern',
          department: 'Marketing',
          type: 'Internship',
          status: 'Closed',
          applicants: 42,
          posted: '2023-06-10'
        }
      ]);

      setCandidates([
        {
          key: '1',
          name: 'Alex Johnson',
          position: 'Senior React Developer',
          status: 'Screening',
          applied: '2023-08-01',
          experience: '5 years'
        },
        {
          key: '2',
          name: 'Sarah Williams',
          position: 'HR Manager',
          status: 'Interview',
          applied: '2023-07-28',
          experience: '7 years'
        },
        {
          key: '3',
          name: 'Michael Chen',
          position: 'Senior React Developer',
          status: 'Offer',
          applied: '2023-07-25',
          experience: '6 years'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const jobColumns = [
    { title: 'Position', dataIndex: 'position', key: 'position' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    { title: 'Applicants', dataIndex: 'applicants', key: 'applicants' },
    { title: 'Posted', dataIndex: 'posted', key: 'posted' },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link">View Details</Button>
    }
  ];

  const candidateColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColor = {
          Screening: 'blue',
          Interview: 'orange',
          Offer: 'green',
          Rejected: 'red'
        };
        return <Tag color={statusColor[status] || 'default'}>{status}</Tag>;
      }
    },
    { title: 'Applied', dataIndex: 'applied', key: 'applied' },
    { title: 'Experience', dataIndex: 'experience', key: 'experience' },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view">View Profile</Menu.Item>
              <Menu.Item key="schedule">Schedule Interview</Menu.Item>
              <Menu.Item key="reject">Reject</Menu.Item>
              <Menu.Item key="hire">Make Offer</Menu.Item>
            </Menu>
          }
        >
          <Button>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ];

  const jobMenu = (
    <Menu>
      <Menu.Item key="1">Full-time Position</Menu.Item>
      <Menu.Item key="2">Part-time Position</Menu.Item>
      <Menu.Item key="3">Internship</Menu.Item>
      <Menu.Item key="4">Contract</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recruitment</h1>

      <div className="flex justify-end mb-6">
        <Dropdown overlay={jobMenu}>
          <Button type="primary" icon={<PlusOutlined />}>
            Post New Job <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Tabs defaultActiveKey="1" className="recruitment-tabs">
        <TabPane tab="Job Openings" key="1">
          <Card className="shadow rounded-lg">
            <Table
              columns={jobColumns}
              dataSource={jobs}
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Candidates" key="2">
          <Card className="shadow rounded-lg">
            <Table
              columns={candidateColumns}
              dataSource={candidates}
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Interview Schedule" key="3">
          <Card className="shadow rounded-lg p-4 text-center text-gray-500">
            <h3 className="text-lg font-medium">Interview Schedule (Coming Soon)</h3>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Recruitment;
