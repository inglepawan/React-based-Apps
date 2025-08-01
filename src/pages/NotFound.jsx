import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">
        <Result
          status="404"
          title={<span className="text-6xl font-extrabold text-blue-600">404</span>}
          subTitle={
            <p className="text-lg text-gray-700">
              Sorry, the page you visited does not exist.
            </p>
          }
          extra={
            <Link to="/">
              <Button
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold rounded px-5 py-2"
              >
                Back to Home
              </Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default NotFound;
