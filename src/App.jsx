import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';
import { store, persistor } from './store/store';
import { AuthProvider } from './contexts/AuthContext.jsx';

// Lazy load components
const Layout = React.lazy(() => import('./components/common/Layout'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard.jsx'));
const EmployeeList = React.lazy(() => import('./pages/Employees/Employee.jsx'));
const Login = React.lazy(() => import('./pages/Auth/Login'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <Spin size="large" />
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <AuthProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/employees" element={<EmployeeList />} />
                  {/* Add other protected routes here */}
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;