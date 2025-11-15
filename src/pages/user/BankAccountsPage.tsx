// src/pages/user/BankAccountsPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import type { BankAccount, NewBankAccountData } from '../../types';
import Modal from '../../components/Modal';
import { formatDate } from '../../utils/formatters';

const BankAccountsPage: React.FC = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<NewBankAccountData>({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    isDefault: false,
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      if (user) {
        try {
          const userAccounts = await dbService.getBankAccounts(user.id);
          setAccounts(userAccounts);
        } catch (error) {
          console.error("Failed to fetch bank accounts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchAccounts();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await dbService.addBankAccount(user.id, formData);
      setSuccess('Bank account added successfully!');
      setIsModalOpen(false);
      setFormData({ bankName: '', accountNumber: '', accountHolderName: '', isDefault: false });
      // Refetch accounts to update the list
      const userAccounts = await dbService.getBankAccounts(user.id);
      setAccounts(userAccounts);
    } catch (err: any) {
      setError(err.message || 'Failed to add bank account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading bank accounts...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bank Accounts</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Account
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {accounts.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Holder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {account.bankName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {account.accountHolderName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {account.accountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(account.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">You have no saved bank accounts.</p>
          </div>
        )}
      </div>

      {/* Add Account Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Add New Bank Account</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <input name="bankName" type="text" placeholder="Bank Name" required onChange={handleChange} value={formData.bankName} className="w-full p-2 border rounded"/>
          <input name="accountHolderName" type="text" placeholder="Account Holder Name" required onChange={handleChange} value={formData.accountHolderName} className="w-full p-2 border rounded"/>
          <input name="accountNumber" type="text" placeholder="Account Number" required onChange={handleChange} value={formData.accountNumber} className="w-full p-2 border rounded"/>
          <div className="flex items-center">
            <input id="isDefault" name="isDefault" type="checkbox" onChange={handleChange} checked={formData.isDefault} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">Set as default account</label>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:bg-gray-400">
            {isSubmitting ? 'Adding...' : 'Add Account'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BankAccountsPage;