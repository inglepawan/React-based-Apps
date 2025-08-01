import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import EmployeeList from './pages/Employees/Employee.jsx';
import Login from './pages/Auth/Login';
// import ProtectedRoute from './components/common/ProtectedRoute';

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
                {/* <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
                {/* <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} /> */}
                {/* Add other protected routes here */}
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;