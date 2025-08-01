import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <div className="mb-2 sm:mb-0">
          © {new Date().getFullYear()} <span className="font-semibold text-gray-800">HRMS Portal</span>. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#privacy" className="hover:text-blue-500 transition-colors duration-200">Privacy Policy</a>
          <a href="#terms" className="hover:text-blue-500 transition-colors duration-200">Terms of Service</a>
          <a href="#contact" className="hover:text-blue-500 transition-colors duration-200">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
