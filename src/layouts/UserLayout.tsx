// src/layouts/UserLayout.tsx

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

// Define the props for the component, including children
interface UserLayoutProps {
  children?: React.ReactNode; // children is optional because we use <Outlet />
}

const UserLayout: React.FC<UserLayoutProps> = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">PeonPay</h2>
          <p className="text-indigo-300">User Dashboard</p>
        </div>
        <nav className="mt-4">
          <Link
            to="/user/dashboard"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/user/dashboard') ? 'bg-indigo-700' : 'hover:bg-indigo-800'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/user/send-money"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/user/send-money') ? 'bg-indigo-700' : 'hover:bg-indigo-800'
            }`}
          >
            Send Money
          </Link>
          <Link
            to="/user/history"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/user/history') ? 'bg-indigo-700' : 'hover:bg-indigo-800'
            }`}
          >
            Transaction History
          </Link>
          <Link
            to="/user/receivers"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/user/receivers') ? 'bg-indigo-700' : 'hover:bg-indigo-800'
            }`}
          >
            Receivers
          </Link>
          <Link
            to="/user/bank-accounts"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/user/bank-accounts') ? 'bg-indigo-700' : 'hover:bg-indigo-800'
            }`}
          >
            Bank Accounts
          </Link>
          <Link
            to="/user/addresses"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              isActive('/user/addresses') ? 'bg-indigo-700' : 'hover:bg-indigo-800'
            }`}
          >
            Addresses
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Welcome back, User!</h1>
            <Link to="/login" className="text-red-600 hover:text-red-800">
              Logout
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* The <Outlet> component will render the matched child route's element */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;