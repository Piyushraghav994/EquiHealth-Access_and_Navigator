import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EquiHealthUserRecord } from '../types/registration';
import { authService, AuthResult, AuthSession } from '../services/authService';

interface AuthContextType {
  currentUser: EquiHealthUserRecord | null;
  equiHealthId: string | null;
  isAuthenticated: boolean;
  login: (equiHealthId: string, pin: string) => Promise<AuthResult>;
  logout: () => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => authService.getCurrentSession());

  useEffect(() => {
    // Sync initial session state
    const current = authService.getCurrentSession();
    setSession(current);
  }, []);

  const login = async (equiHealthId: string, pin: string): Promise<AuthResult> => {
    const result = await authService.login(equiHealthId, pin);
    if (result.success && result.user) {
      setSession(authService.getCurrentSession());
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  const refreshSession = () => {
    setSession(authService.getCurrentSession());
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: session?.user || null,
        equiHealthId: session?.equiHealthId || null,
        isAuthenticated: !!session,
        login,
        logout,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
