// src/pages/user/UserDashboardPage.tsx

import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Current Balance</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            ${user.balance.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Full Name</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Email Address</h3>
          <p className="text-xl text-gray-900 mt-2">{user.email}</p>
        </div>
      </div>
      {/* We will add charts and recent activity here later */}
    </div>
  );
};

export default UserDashboardPage;