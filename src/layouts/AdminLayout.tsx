// src/layouts/AdminLayout.tsx

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

// Define the props for the component, including children
interface AdminLayoutProps {
  children?: React.ReactNode; // children is optional because we use <Outlet />
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-900 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">PeonPay</h2>
          <p className="text-purple-300">Admin Panel</p>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/dashboard"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/admin/dashboard') ? 'bg-purple-700' : 'hover:bg-purple-800'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/admin/users') ? 'bg-purple-700' : 'hover:bg-purple-800'
            }`}
          >
            User Management
          </Link>
          <Link
            to="/admin/transactions"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/admin/transactions') ? 'bg-purple-700' : 'hover:bg-purple-800'
            }`}
          >
            All Transactions
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <Link to="/login" className="text-red-600 hover:text-red-800">
              Logout
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;