// src/pages/admin/AdminDashboardPage.tsx

import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/dbService';
import type { User, Transaction } from '../../types';

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalVolume: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [allUsers, allTransactions] = await Promise.all([
          dbService.getAllUsers(),
          dbService.getTransactions(),
        ]);
        
        const volume = allTransactions.reduce((acc, txn) => acc + txn.amount, 0);

        setStats({
          totalUsers: allUsers.length,
          totalTransactions: allTransactions.length,
          totalVolume: volume,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">System overview and key metrics.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalUsers}</p>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Transactions</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalTransactions}</p>
        </div>

        {/* Total Volume Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Volume</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.totalVolume)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;