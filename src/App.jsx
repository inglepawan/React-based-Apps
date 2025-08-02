import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import EmployeeList from './pages/Employees/Employee.jsx';
import AddEmployee from './pages/Employees/AddEmployee.jsx';
import ViewEmployee from './pages/Employees/ViewEmployee.jsx';
import AttendanceIndex from './pages/Attendance/Index.jsx';
import AttendanceReport from './pages/Attendance/Report.jsx';
import LeaveIndex from './pages/Leave/Index.jsx';
import ApplyLeave from './pages/Leave/ApplyLeave.jsx';
import ApproveLeave from './pages/Leave/ApproveLeave.jsx';
import PayrollIndex from './pages/Payroll/Index.jsx';
import PerformanceIndex from './pages/Performance/Index.jsx';
import RecruitmentIndex from './pages/Recruitment/Index.jsx';
import SettingsIndex from './pages/Settings/Index.jsx';
import Login from './pages/Auth/Login';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/employees/:id" element={<ViewEmployee />} />
                <Route path="/attendance" element={<AttendanceIndex />} />
                <Route path="/attendance/report" element={<AttendanceReport />} />
                <Route path="/leave" element={<LeaveIndex />} />
                <Route path="/leave/apply" element={<ApplyLeave />} />
                <Route path="/leave/approve" element={<ApproveLeave />} />
                <Route path="/payroll" element={<PayrollIndex />} />
                <Route path="/performance" element={<PerformanceIndex />} />
                <Route path="/recruitment" element={<RecruitmentIndex />} />
                <Route path="/settings" element={<SettingsIndex />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;