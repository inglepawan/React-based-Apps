import React from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const ApplyLeave = ({ onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Leave application submitted successfully!');
    form.resetFields();
    onCancel();
  };

  const leaveTypes = [
    'Casual Leave',
    'Sick Leave',
    'Earned Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Compensatory Leave'
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <SmileOutlined className="text-blue-500" />
        Apply for Leave
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-5"
      >
        <Form.Item
          name="leaveType"
          label={<span className="text-gray-700 font-medium">Leave Type</span>}
          rules={[{ required: true, message: 'Please select leave type!' }]}
        >
          <Select placeholder="Select leave type">
            {leaveTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="dateRange"
          label={<span className="text-gray-700 font-medium">Date Range</span>}
          rules={[{ required: true, message: 'Please select date range!' }]}
        >
          <DatePicker.RangePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="duration"
          label={<span className="text-gray-700 font-medium">Duration (Days)</span>}
          rules={[{ required: true, message: 'Please input duration!' }]}
        >
          <Input type="number" min={0.5} step={0.5} />
        </Form.Item>

        <Form.Item
          name="reason"
          label={<span className="text-gray-700 font-medium">Reason</span>}
          rules={[{ required: true, message: 'Please input reason!' }]}
        >
          <TextArea rows={4} placeholder="Enter reason for leave..." />
        </Form.Item>

        <Form.Item
          name="contactDetails"
          label={<span className="text-gray-700 font-medium">Contact During Leave</span>}
          rules={[{ required: true, message: 'Please input contact details!' }]}
        >
          <Input placeholder="Phone number or email where you can be reached" />
        </Form.Item>

        <Form.Item className="flex gap-4 mt-6">
          <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Application
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplyLeave;
