import React, { useState, useEffect, useCallback } from "react";
import { Card, Table, Button, Row, Col, Statistic, DatePicker, Badge } from "antd";
import { CalendarOutlined, DownloadOutlined, BarChartOutlined } from "@ant-design/icons";
import { format } from "date-fns";

const { RangePicker } = DatePicker;

const AttendanceReport = () => {
  const [data] = useState([
    {
      key: 1,
      date: '2024-12-01',
      status: 'Present',
      checkIn: '08:30 AM',
      checkOut: '05:30 PM',
      hours: '9.0',
      overtime: '0.5'
    },
    {
      key: 2,
      date: '2024-12-02',
      status: 'Present',
      checkIn: '08:45 AM',
      checkOut: '05:15 PM',
      hours: '8.5',
      overtime: '0.0'
    },
    {
      key: 3,
      date: '2024-12-03',
      status: 'Absent',
      checkIn: '-',
      checkOut: '-',
      hours: '0.0',
      overtime: '0.0'
    },
    {
      key: 4,
      date: '2024-12-04',
      status: 'Present',
      checkIn: '08:15 AM',
      checkOut: '05:45 PM',
      hours: '9.5',
      overtime: '1.0'
    },
    {
      key: 5,
      date: '2024-12-05',
      status: 'Half Day',
      checkIn: '08:30 AM',
      checkOut: '01:30 PM',
      hours: '5.0',
      overtime: '0.0'
    }
  ]);
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = useCallback(async () => {
    if (dateRange.length !== 2) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    if (dateRange.length === 2) {
      fetchReport();
    }
  }, [dateRange, fetchReport]);

  const stats = data.reduce((acc, rec) => {
    if (rec.status === "Present") acc.present++;
    if (rec.status === "Absent") acc.absent++;
    if (rec.status === "Half Day") acc.halfDay++;
    return acc;
  }, { present: 0, absent: 0, halfDay: 0 });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'success';
      case 'Absent': return 'error';
      case 'Half Day': return 'warning';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => format(new Date(date), 'MMM dd, yyyy')
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
              status === 'Present' ? 'text-green-600' : 
              status === 'Absent' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {status}
            </span>
          } 
        />
      )
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
      render: (time) => time !== '-' ? time : <span className="text-gray-400">-</span>
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
      render: (time) => time !== '-' ? time : <span className="text-gray-400">-</span>
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours) => <span className="font-medium">{hours}h</span>
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime',
      render: (overtime) => (
        <span className={`font-medium ${overtime > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
          {overtime}h
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Report</h1>
          <p className="text-gray-600 mt-1">Track and analyze employee attendance patterns</p>
        </div>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />}
          size="large"
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Export Report
        </Button>
      </div>

      {/* Date Range Picker */}
      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <CalendarOutlined className="text-blue-500" />
            <span className="font-medium text-gray-700">Select Date Range:</span>
          </div>
          <RangePicker 
            size="large"
            onChange={(dates) => setDateRange(dates)}
            className="w-full md:w-auto"
          />
          <Button 
            type="primary" 
            loading={loading}
            onClick={fetchReport}
            disabled={dateRange.length !== 2}
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Present Days"
              value={stats.present}
              valueStyle={{ color: '#52c41a' }}
              prefix={<BarChartOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Absent Days"
              value={stats.absent}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<BarChartOutlined className="text-red-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center hover:shadow-md transition-shadow">
            <Statistic
              title="Half Days"
              value={stats.halfDay}
              valueStyle={{ color: '#faad14' }}
              prefix={<BarChartOutlined className="text-yellow-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Attendance Table */}
      <Card title="Detailed Attendance Records" className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={data} 
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`
          }}
          className="custom-table"
        />
      </Card>
    </div>
  );
};

export default AttendanceReport;
