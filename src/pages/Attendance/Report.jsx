import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Table, DatePicker, Statistic, Row, Col, Spin } from "antd";
import { getAttendanceReport } from "../../api/attendance";
import { format } from "date-fns";
import logger from "../../utils/logger.js";

const { RangePicker } = DatePicker;

const AttendanceReport = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = useCallback(async () => {
    if (dateRange.length !== 2) return;
    try {
      setLoading(true);
      const report = await getAttendanceReport(
        'current-user-id',
        format(dateRange[0], 'yyyy-MM-dd'),
        format(dateRange[1], 'yyyy-MM-dd')
      );
      setData(report);
    } catch (error) {
      logger.error('Failed to fetch attendance report:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const stats = data.reduce((acc, rec) => {
    if (rec.status === "Present") acc.present++;
    if (rec.status === "Absent") acc.absent++;
    if (rec.status === "Half Day") acc.halfDay++;
    return acc;
  }, { present: 0, absent: 0, halfDay: 0 });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'Present' ? 'green' : status === 'Absent' ? 'red' : 'orange';
        return (
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: color === 'green' ? '#f6ffed' : color === 'red' ? '#fff2f0' : '#fff7e6',
            color: color === 'green' ? '#52c41a' : color === 'red' ? '#ff4d4f' : '#fa8c16',
            border: `1px solid ${color === 'green' ? '#b7eb8f' : color === 'red' ? '#ffb3b3' : '#ffd591'}`
          }}>
            {status}
          </span>
        );
      }
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        Attendance Report
      </h1>

      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <RangePicker
          onChange={(dates) => setDateRange(dates || [])}
          style={{ marginRight: '16px' }}
        />
        <Button type="primary" disabled={!data.length}>
          Export
        </Button>
      </div>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Present Days"
              value={stats.present}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Absent Days"
              value={stats.absent}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Half Days"
              value={stats.halfDay}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </Card>
    </div>
  );
};

export default AttendanceReport;
