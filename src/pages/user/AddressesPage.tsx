// src/pages/user/AddressesPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import { Address, NewAddressData } from '../../types';
import Modal from '../../components/Modal';
import { formatDate } from '../../utils/formatters';

const AddressesPage: React.FC = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<NewAddressData>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false,
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        try {
          const userAddresses = await dbService.getAddresses(user.id);
          setAddresses(userAddresses);
        } catch (error) {
          console.error("Failed to fetch addresses:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchAddresses();
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
      await dbService.addAddress(user.id, formData);
      setSuccess('Address added successfully!');
      setIsModalOpen(false);
      setFormData({ street: '', city: '', state: '', zipCode: '', country: '', isDefault: false });
      const userAddresses = await dbService.getAddresses(user.id);
      setAddresses(userAddresses);
    } catch (err: any) {
      setError(err.message || 'Failed to add address.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading addresses...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Addresses</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Address
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {addresses.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Street
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City, State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {address.street}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {address.city}, {address.state} {address.zipCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {address.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(address.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">You have no saved addresses.</p>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Add New Address</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="street" type="text" placeholder="Street Address" required onChange={handleChange} value={formData.street} className="w-full p-2 border rounded"/>
          <div className="flex space-x-2">
            <input name="city" type="text" placeholder="City" required onChange={handleChange} value={formData.city} className="flex-1 p-2 border rounded"/>
            <input name="state" type="text" placeholder="State" required onChange={handleChange} value={formData.state} className="w-24 p-2 border rounded"/>
            <input name="zipCode" type="text" placeholder="Zip Code" required onChange={handleChange} value={formData.zipCode} className="w-24 p-2 border rounded"/>
          </div>
          <input name="country" type="text" placeholder="Country" required onChange={handleChange} value={formData.country} className="w-full p-2 border rounded"/>
          <div className="flex items-center">
            <input id="isDefault" name="isDefault" type="checkbox" onChange={handleChange} checked={formData.isDefault} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">Set as default address</label>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:bg-gray-400">
            {isSubmitting ? 'Adding...' : 'Add Address'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddressesPage;