// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout'; // NEW IMPORT
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'; // NEW IMPORT
import AboutUsPage from './pages/AboutUsPage'; // NEW IMPORT
import ContactUsPage from './pages/ContactUsPage'; // NEW IMPORT
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

  return (
    <UserLayout>
      <Routes>
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/send-money" element={<SendMoneyPage />} /> {/* NEW ROUTE */}
        <Route path="/history" element={<HistoryPage />} /> {/* NEW ROUTE */}
        <Route path="/bank-accounts" element={<BankAccountsPage />} /> {/* NEW ROUTE */}
        <Route path="/addresses" element={<AddressesPage />} /> {/* NEW ROUTE */}
        <Route path="/receivers" element={<ReceiversPage />} /> {/* NEW ROUTE */}

        {/* Add other user routes here */}
        <Route path="/" element={<Navigate to="/user/dashboard" />} />
      </Routes>
    </UserLayout>
  );
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

  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/transactions" element={<AllTransactionsPage />} /> {/* NEW ROUTE */}
        {/* Add other admin routes here */}
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </AdminLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutUsPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactUsPage /></PublicLayout>} />
          
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            }
          />
          
          {/* Protected Routes */}
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;