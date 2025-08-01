import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Button, Card, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          key: '1',
          date: '2023-08-01',
          status: 'Present',
          checkIn: '09:05 AM',
          checkOut: '06:15 PM',
          hours: '9h 10m',
          overtime: '1h 10m'
        },
        {
          key: '2',
          date: '2023-08-02',
          status: 'Present',
          checkIn: '09:15 AM',
          checkOut: '06:30 PM',
          hours: '9h 15m',
          overtime: '1h 15m'
        },
        {
          key: '3',
          date: '2023-08-03',
          status: 'Absent',
          checkIn: '-',
          checkOut: '-',
          hours: '-',
          overtime: '-'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [month]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === 'Present'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      )
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn'
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut'
    },
    {
      title: 'Working Hours',
      dataIndex: 'hours',
      key: 'hours'
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime'
    }
  ];

  const onMonthChange = (date) => {
    setMonth(date);
  };

  return (
    <div className="attendance-container px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Attendance Management
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <DatePicker
          picker="month"
          onChange={onMonthChange}
          className="w-52"
          placeholder="Select month"
        />
        <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
          Export Report
        </Button>
      </div>

      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card className="rounded-xl shadow-md">
            <Statistic
              title="Present Days"
              value={22}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-xl shadow-md">
            <Statistic
              title="Absent Days"
              value={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-xl shadow-md">
            <Statistic
              title="Leaves Taken"
              value={3}
              valueStyle={{ color: '#d48806' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-xl shadow-md">
            <Statistic
              title="Overtime Hours"
              value={15.5}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="rounded-xl shadow-lg">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowClassName="hover:bg-gray-50 transition"
        />
      </Card>
    </div>
  );
};

export default Attendance;
