import React, { useState, useEffect } from 'react';
import { Table, Card, Select, Button, Statistic, Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const Payroll = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          key: '1',
          month: 'January 2023',
          basicSalary: '₹45,000',
          allowances: '₹12,000',
          deductions: '₹5,500',
          netSalary: '₹51,500',
          status: 'Paid'
        },
        {
          key: '2',
          month: 'February 2023',
          basicSalary: '₹45,000',
          allowances: '₹12,000',
          deductions: '₹5,500',
          netSalary: '₹51,500',
          status: 'Paid'
        },
        {
          key: '3',
          month: 'March 2023',
          basicSalary: '₹45,000',
          allowances: '₹12,000',
          deductions: '₹5,500',
          netSalary: '₹51,500',
          status: 'Paid'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [year]);

  const downloadPayslip = (record) => {
    console.log('Downloading payslip for:', record.month);
    // Real implementation: trigger file download
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month'
    },
    {
      title: 'Basic Salary',
      dataIndex: 'basicSalary',
      key: 'basicSalary'
    },
    {
      title: 'Allowances',
      dataIndex: 'allowances',
      key: 'allowances'
    },
    {
      title: 'Deductions',
      dataIndex: 'deductions',
      key: 'deductions'
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      key: 'netSalary'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
          status === 'Paid'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => downloadPayslip(record)}>
          Download Payslip
        </Button>
      )
    }
  ];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payroll Management</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <Select
          defaultValue={year.toString()}
          style={{ width: 120 }}
          onChange={handleYearChange}
        >
          <Option value="2023">2023</Option>
          <Option value="2022">2022</Option>
          <Option value="2021">2021</Option>
        </Select>

        <Button type="primary" icon={<DownloadOutlined />} className="bg-blue-600 hover:bg-blue-700">
          Export All
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow rounded-lg">
          <Statistic
            title="Total Earnings (YTD)"
            value={154500}
            precision={2}
            prefix="₹"
          />
        </Card>
        <Card className="shadow rounded-lg">
          <Statistic
            title="Total Tax Paid (YTD)"
            value={18500}
            precision={2}
            prefix="₹"
          />
        </Card>
        <Card className="shadow rounded-lg">
          <Statistic
            title="Average Monthly Salary"
            value={51500}
            precision={2}
            prefix="₹"
          />
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow rounded-lg">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 12 }}
        />
      </Card>
    </div>
  );
};

export default Payroll;
