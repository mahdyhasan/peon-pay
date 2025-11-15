// src/pages/user/SendMoneyPage.tsx

// FIX 1: Import FormEvent directly from 'react'
import React, { useState, useEffect, type FormEvent } from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../services/dbService';
import type { User, Receiver, NewTransactionData } from '../../types';

const SendMoneyPage: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedReceiverId, setSelectedReceiverId] = useState('');
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReceivers = async () => {
      // This check is essential and correct
      if (user) {
        const userReceivers = await dbService.getReceivers(user.id);
        setReceivers(userReceivers);
      }
    };
    fetchReceivers();
    // FIX 2: Use user.id in the dependency array. It's the specific value we use.
  }, [user.id]);

  // The handleSubmit function is correctly typed
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!user || !selectedReceiverId || !amount) {
      setMessage('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const transactionData: NewTransactionData = {
        receiverId: selectedReceiverId,
        amount: parseFloat(amount),
        note: note,
      };

      await dbService.createTransaction(user.id, transactionData);
      setMessage('Transaction successful!');
      setAmount('');
      setNote('');
      setSelectedReceiverId('');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Send Money</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="receiver" className="block text-sm font-medium text-gray-700">Send To</label>
            <select
              id="receiver"
              value={selectedReceiverId}
              onChange={(e) => setSelectedReceiverId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a receiver</option>
              {receivers.map((receiver) => (
                <option key={receiver.id} value={receiver.id}>
                  {receiver.name} - {receiver.bankName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note (Optional)</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Sending...' : 'Send Money'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default SendMoneyPage;