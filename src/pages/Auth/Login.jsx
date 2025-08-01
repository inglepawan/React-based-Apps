import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch {
      setError('Invalid email or password');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800">HRMS Portal</h2>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    prefix={<UserOutlined className="text-gray-400" />}
                    value={values.email}
                    onChange={handleChange}
                    className="!py-2.5 !px-4 !rounded-md !text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 ml-1" />
                </div>

                <div>
                  <Input.Password
                    name="password"
                    type="password"
                    placeholder="Password"
                    prefix={<LockOutlined className="text-gray-400" />}
                    value={values.password}
                    onChange={handleChange}
                    className="!py-2.5 !px-4 !rounded-md !text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 ml-1" />
                </div>
              </div>

              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="w-full h-10 text-sm font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
