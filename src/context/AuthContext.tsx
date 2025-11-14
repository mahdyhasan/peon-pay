// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { dbService } from '../services/dbService';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    role: null,
  });

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await dbService.getMe();
        if (user) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            role: user.role,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            role: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          role: null,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const { user } = await dbService.login({ username, password });
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        role: user.role,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      // Let the component handle the error display
      throw error;
    }
  };

  const logout = async () => {
    await dbService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};