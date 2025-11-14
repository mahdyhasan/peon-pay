// src/pages/user/ReceiversPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import { Receiver } from '../../types';
import Modal from '../../components/Modal';
import { formatDate } from '../../utils/formatters';

const ReceiversPage: React.FC = () => {
  const { user } = useAuth();
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form data matches Omit<Receiver, 'id' | 'userId'>
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    bankName: '',
  });

  useEffect(() => {
    const fetchReceivers = async () => {
      if (user) {
        try {
          const userReceivers = await dbService.getReceivers(user.id);
          setReceivers(userReceivers);
        } catch (error) {
          console.error("Failed to fetch receivers:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchReceivers();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await dbService.addReceiver(user.id, formData);
      setSuccess('Receiver added successfully!');
      setIsModalOpen(false);
      setFormData({ name: '', accountNumber: '', bankName: '' });
      // Refetch receivers to update the list
      const userReceivers = await dbService.getReceivers(user.id);
      setReceivers(userReceivers);
    } catch (err: any) {
      setError(err.message || 'Failed to add receiver.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading receivers...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Receivers</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Receiver
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {receivers.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank
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
              {receivers.map((receiver) => (
                <tr key={receiver.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {receiver.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {receiver.bankName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {receiver.accountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(receiver.createdAt)} {/* Note: createdAt is not in Receiver type, let's fix that */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">You have no saved receivers.</p>
          </div>
        )}
      </div>

      {/* Add Receiver Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Add New Receiver</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Receiver's Name" required onChange={handleChange} value={formData.name} className="w-full p-2 border rounded"/>
          <input name="bankName" type="text" placeholder="Bank Name" required onChange={handleChange} value={formData.bankName} className="w-full p-2 border rounded"/>
          <input name="accountNumber" type="text" placeholder="Account Number" required onChange={handleChange} value={formData.accountNumber} className="w-full p-2 border rounded"/>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:bg-gray-400">
            {isSubmitting ? 'Adding...' : 'Add Receiver'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ReceiversPage;