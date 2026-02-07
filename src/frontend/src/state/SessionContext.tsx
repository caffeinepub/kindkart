import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'User' | 'NGO' | 'DeliveryPartner' | 'Admin';

interface SessionContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  clearSession: () => void;
  startSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_KEY = 'kindkart_session_authenticated';
const ROLE_KEY = 'kindkart_role';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRoleState] = useState<UserRole | null>(null);

  // Initialize session from localStorage
  useEffect(() => {
    const sessionAuth = localStorage.getItem(SESSION_KEY);
    const storedRole = localStorage.getItem(ROLE_KEY) as UserRole | null;

    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      if (storedRole) {
        setRoleState(storedRole);
      }
    }
  }, []);

  const startSession = () => {
    setIsAuthenticated(true);
    localStorage.setItem(SESSION_KEY, 'true');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(ROLE_KEY, newRole);
  };

  const clearSession = () => {
    setIsAuthenticated(false);
    setRoleState(null);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(ROLE_KEY);
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, role, setRole, clearSession, startSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
