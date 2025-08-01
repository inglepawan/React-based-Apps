import React, { useState } from 'react';
import {
  Tabs,
  Form,
  Input,
  Button,
  Upload,
  message,
  Card
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Received values:', values);
    setTimeout(() => {
      message.success('Profile updated successfully!');
      setLoading(false);
    }, 1500);
  };

  const normFile = (e) => {
    return Array.isArray(e) ? e : e?.fileList;
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <Tabs defaultActiveKey="profile" className="mb-4">
        <TabPane tab="Profile" key="profile">
          <Card className="shadow rounded-lg p-6">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

                <Form.Item
                  name="avatar"
                  label="Profile Picture"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="avatar"
                    listType="picture"
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>

                <div className="grid md:grid-cols-2 gap-4">
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
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>

                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Current Password"
                  />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { min: 6, message: 'Password must be at least 6 characters!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="New Password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  dependencies={['newPassword']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords do not match!')
                        );
                      }
                    })
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm New Password"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="mt-2"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Notifications" key="notifications">
          <Card className="shadow rounded-lg p-6 text-center text-gray-500">
            <h3 className="text-lg font-medium">Notification Settings (Coming Soon)</h3>
          </Card>
        </TabPane>

        <TabPane tab="Preferences" key="preferences">
          <Card className="shadow rounded-lg p-6 text-center text-gray-500">
            <h3 className="text-lg font-medium">System Preferences (Coming Soon)</h3>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
