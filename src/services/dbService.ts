// src/services/dbService.ts

// src/services/dbService.ts
import type { User, AuthCredentials, Transaction, Receiver, NewTransactionData, BankAccount, NewBankAccountData, Address, NewAddressData } from '../types';


// A simple class to manage our localStorage "database"
class LocalDBService {
  private readonly STORAGE_KEY = 'peonpay_db';

  constructor() {
    this.seedDatabase();
  }

  // Helper to get the "database" from localStorage
  private getDB(): Record<string, any> {
    const db = localStorage.getItem(this.STORAGE_KEY);
    if (db) {
      return JSON.parse(db);
    }
    // Return a fully initialized empty database to prevent undefined errors
    return {
      users: [],
      transactions: [],
      receivers: [],
      bankAccounts: [],
      addresses: [], // Added addresses to the initial empty DB structure
    };
  }

  // Helper to save the "database" to localStorage
  private saveDB(db: Record<string, any>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(db));
  }

  // Seed the database with initial data if it's empty
  private seedDatabase(): void {
    const db = this.getDB();
    if (db.users.length === 0) {
      const initialUsers: User[] = [
        {
          id: 'user-1',
          username: 'user',
          password: 'user',
          role: 'user',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          balance: 5000,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'admin-1',
          username: 'admin',
          password: 'admin',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@peonpay.com',
          balance: 0,
          createdAt: new Date().toISOString(),
        },
      ];
      db.users = initialUsers;

      // Add initial bank account for the demo user
      const initialBankAccounts: BankAccount[] = [
        {
            id: 'bank-1',
            userId: 'user-1',
            bankName: 'Global Bank',
            accountNumber: '1234567890',
            accountHolderName: 'John Doe',
            isDefault: true,
            createdAt: new Date().toISOString(),
        }
      ];
      db.bankAccounts = initialBankAccounts;

      // Add initial address for the demo user
      const initialAddresses: Address[] = [
        {
            id: 'addr-1',
            userId: 'user-1',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'USA',
            isDefault: true,
            createdAt: new Date().toISOString(),
        }
      ];
      db.addresses = initialAddresses;
        
      // Add initial receiver for the demo user
      const initialReceivers: Receiver[] = [
        {
            id: 'receiver-1',
            userId: 'user-1',
            name: 'Admin User',
            accountNumber: 'ACC-ADMIN-001',
            bankName: 'Central Admin Bank',
            createdAt: new Date().toISOString(),
        }
      ];
      db.receivers = initialReceivers;

      this.saveDB(db);
    }
  }

  // --- Authentication Methods ---
  public async login(credentials: AuthCredentials): Promise<{ user: User; token: string }> {
    const db = this.getDB();
    const user = db.users.find(
      (u: User) => u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const token = `fake-jwt-token-for-${user.id}`;
    localStorage.setItem('peonpay_token', token);
    localStorage.setItem('peonpay_userId', user.id);

    return { user, token };
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('peonpay_token');
    localStorage.removeItem('peonpay_userId');
  }

  public async getMe(): Promise<User | null> {
    const token = localStorage.getItem('peonpay_token');
    const userId = localStorage.getItem('peonpay_userId');
    
    if (!token || !userId) {
      return null;
    }

    const db = this.getDB();
    const user = db.users.find((u: User) => u.id === userId);
    return user || null;
  }

  // --- Receiver Methods ---
  public async getReceivers(userId: string): Promise<Receiver[]> {
    const db = this.getDB();
    const receivers = db.receivers || [];
    return receivers.filter((r: Receiver) => r.userId === userId);
  }

  public async addReceiver(userId: string, receiverData: Omit<Receiver, 'id' | 'userId' | 'createdAt'>): Promise<Receiver> { 
    const db = this.getDB();
    const newReceiver: Receiver = {
        id: `receiver-${Date.now()}`,
        userId,
        createdAt: new Date().toISOString(),
        ...receiverData,
    };
    if (!db.receivers) {
        db.receivers = [];
    }
    db.receivers.push(newReceiver);
    this.saveDB(db);
    return newReceiver;
  }

  // --- Transaction Methods ---
  public async getTransactions(userId?: string): Promise<Transaction[]> {
    const db = this.getDB();
    const transactions = db.transactions || [];
    if (userId) {
      return transactions.filter((t: Transaction) => t.senderId === userId || t.receiverId === userId);
    }
    return transactions;
  }

  public async createTransaction(userId: string, data: NewTransactionData): Promise<Transaction> {
    const db = this.getDB();
    const sender = db.users.find((u: User) => u.id === userId);
    const receiver = db.users.find((u: User) => u.id === data.receiverId);

    if (!sender || !receiver) {
      throw new Error('Sender or Receiver not found.');
    }

    if (sender.balance < data.amount) {
      throw new Error('Insufficient balance.');
    }

    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      senderId: sender.id,
      receiverId: receiver.id,
      receiverName: `${receiver.firstName} ${receiver.lastName}`,
      amount: data.amount,
      note: data.note,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    sender.balance -= data.amount;
    receiver.balance += data.amount;

    if (!db.transactions) {
      db.transactions = [];
    }
    db.transactions.push(newTransaction);
    this.saveDB(db);

    return newTransaction;
  }

  // --- User Methods ---
public async getAllUsers(): Promise<Omit<User, 'password'>[]> { // Also good practice to omit password from the return type
  const db = this.getDB();
  // FIX: Add type annotation to the map callback
  return db.users.map((user: User) => {
    // Destructure to remove the password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}

  // --- Bank Account Methods ---
  public async getBankAccounts(userId: string): Promise<BankAccount[]> {
    const db = this.getDB();
    const accounts = db.bankAccounts || [];
    return accounts.filter((a: BankAccount) => a.userId === userId);
  }

  public async addBankAccount(userId: string, accountData: NewBankAccountData): Promise<BankAccount> {
    const db = this.getDB();
    const newAccount: BankAccount = {
      id: `bank-${Date.now()}`,
      userId,
      createdAt: new Date().toISOString(),
      ...accountData,
    };
    if (!db.bankAccounts) {
      db.bankAccounts = [];
    }
    db.bankAccounts.push(newAccount);
    this.saveDB(db);
    return newAccount;
  }

  // --- Address Methods ---
  public async getAddresses(userId: string): Promise<Address[]> {
    const db = this.getDB();
    const addresses = db.addresses || [];
    return addresses.filter((a: Address) => a.userId === userId);
  }

  public async addAddress(userId: string, addressData: NewAddressData): Promise<Address> {
    const db = this.getDB();
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      userId,
      createdAt: new Date().toISOString(),
      ...addressData,
    };
    if (!db.addresses) {
      db.addresses = [];
    }
    db.addresses.push(newAddress);
    this.saveDB(db);
    return newAddress;
  }
}

// Export a singleton instance
export const dbService = new LocalDBService();