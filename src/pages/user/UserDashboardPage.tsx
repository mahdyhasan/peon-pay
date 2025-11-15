// src/pages/user/UserDashboardPage.tsx

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user.firstName}!
      </h1>
      <p className="mt-2 text-gray-600">Here's an overview of your account.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Current Balance</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{formatCurrency(user.balance)}</p>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <a href="/user/send-money" className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Send Money
            </a>
            <a href="/user/history" className="block w-full text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">
              View History
            </a>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Account Information</h3>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;