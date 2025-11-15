// src/types/index.ts

export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be a hash
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  createdAt: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // To handle initial load from localStorage
  role: 'user' | 'admin' | null;
}

export interface Transaction {
  id: string;
  senderId: string;
  receiverId: string;
  receiverName: string; // Denormalized for easy display
  amount: number;
  note: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Receiver {
  id: string;
  userId: string; // The user who owns this receiver
  name: string;
  accountNumber: string;
  bankName: string;
  createdAt: string;
}

export interface NewTransactionData {
  receiverId: string;
  amount: number;
  note: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  isDefault: boolean;
  createdAt: string;
}

export interface NewBankAccountData {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  isDefault: boolean;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export interface NewAddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}