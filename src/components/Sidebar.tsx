// src/components/Sidebar.tsx

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  role: 'user' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();

  const userLinks = [
    { to: '/user/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/user/send-money', label: 'Send Money', icon: '💸' },
    { to: '/user/history', label: 'History', icon: '🕰️' },
    { to: '/user/bank-accounts', label: 'Bank Accounts', icon: '🏦' },
    { to: '/user/addresses', label: 'Addresses', icon: '📍' },
    { to: '/user/receivers', label: 'Receivers', icon: '👥' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Overview', icon: '📈' },
    { to: '/admin/users', label: 'User Management', icon: '👤' },
    { to: '/admin/transactions', label: 'All Transactions', icon: '💳' },
    { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        PeonPay
      </div>
      <nav className="flex-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;