import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
// import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
