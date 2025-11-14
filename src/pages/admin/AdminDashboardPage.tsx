// src/pages/admin/AdminDashboardPage.tsx

import React from 'react';

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">5,678</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Volume</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">$98,765</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Pending Verifications</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">12</p>
        </div>
      </div>
      {/* We will add charts and detailed stats here later */}
    </div>
  );
};

export default AdminDashboardPage;