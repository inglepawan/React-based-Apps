import React from 'react';
import { Form, Input, Button, Select, DatePicker, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const AddEmployee = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Employee added successfully!');
    navigate('/employees');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Employee</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-8"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please input first name!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please input last name!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input phone number!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Employment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please select department!' }]}
              >
                <Select placeholder="Select Department">
                  <Option value="it">IT</Option>
                  <Option value="hr">Human Resources</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please input position!' }]}
              >
                <Input placeholder="Position" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="joinDate"
                label="Join Date"
                rules={[{ required: true, message: 'Please select join date!' }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="employeeId"
                label="Employee ID"
                rules={[{ required: true, message: 'Please input employee ID!' }]}
              >
                <Input placeholder="Employee ID" />
              </Form.Item>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Additional Information</h3>

            <Form.Item
              name="photo"
              label="Employee Photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="photo" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="notes" label="Notes">
              <TextArea rows={4} placeholder="Additional notes..." />
            </Form.Item>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <Button type="primary" htmlType="submit" className="w-full md:w-auto">
              Add Employee
            </Button>
            <Button
              htmlType="button"
              onClick={() => navigate('/employees')}
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
