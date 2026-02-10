'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { LoginResponse } from '@/services/api';

const STORAGE_TOKEN = 'token';
const STORAGE_USER = 'user';

export interface AuthUser {
  usuarioId: number;
  nome: string;
  email: string;
  admin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadStored(): { token: string | null; user: AuthUser | null } {
  if (typeof window === 'undefined') return { token: null, user: null };
  const token = localStorage.getItem(STORAGE_TOKEN);
  const raw = localStorage.getItem(STORAGE_USER);
  let user: AuthUser | null = null;
  if (raw) {
    try {
      user = JSON.parse(raw) as AuthUser;
    } catch {
      localStorage.removeItem(STORAGE_USER);
    }
  }
  return { token, user };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { token: t, user: u } = loadStored();
    setToken(t);
    setUser(u);
    setIsLoading(false);
  }, []);

  const login = useCallback((data: LoginResponse) => {
    const authUser: AuthUser = {
      usuarioId: data.usuarioId,
      nome: data.nome,
      email: data.email,
      admin: data.admin,
    };
    localStorage.setItem(STORAGE_TOKEN, data.token);
    localStorage.setItem(STORAGE_USER, JSON.stringify(authUser));
    setToken(data.token);
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin = useCallback(() => user?.admin === true, [user]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
