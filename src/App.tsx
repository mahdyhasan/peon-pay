// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import UserDashboardPage from './pages/user/UserDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import SendMoneyPage from './pages/user/SendMoneyPage';
import HistoryPage from './pages/user/HistoryPage';
import BankAccountsPage from './pages/user/BankAccountsPage';
import AddressesPage from './pages/user/AddressesPage';
import ReceiversPage from './pages/user/ReceiversPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import AllTransactionsPage from './pages/admin/AllTransactionsPage';

// Component to handle protected user routes
const UserRoutes = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || role !== 'user') {
    return <Navigate to="/login" />;
  }

  // Just return the Layout, the Routes are now inside the main App component
  return <UserLayout />;
};

// Update the AdminRoutes component to include the new route
const AdminRoutes = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // Just return the Layout, the Routes are now inside the main App component
  return <AdminLayout />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout children={undefined} />}>
            {/* Nested routes under PublicLayout */}
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="contact" element={<ContactUsPage />} />
          </Route>
          
          {/* Auth Route (Login) */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            }
          />
          
          {/* Protected Routes */}
          <Route path="/user/*" element={<UserRoutes />}>
            {/* Nested routes under UserLayout */}
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="send-money" element={<SendMoneyPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="bank-accounts" element={<BankAccountsPage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="receivers" element={<ReceiversPage />} />
            {/* Redirect /user to /user/dashboard */}
            <Route path="" element={<Navigate to="dashboard" />} />
          </Route>

          <Route path="/admin/*" element={<AdminRoutes />}>
            {/* Nested routes under AdminLayout */}
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="transactions" element={<AllTransactionsPage />} />
            {/* Redirect /admin to /admin/dashboard */}
            <Route path="" element={<Navigate to="dashboard" />} />
          </Route>

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;