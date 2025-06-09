import React, { useState, createContext, useContext } from 'react';
interface AuthContextType {
  currentUser: string | null;
  userRole: string | null;
  login: (username: string, password: string) => {
    success: boolean;
    role: string;
  };
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({
  children
}: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  // Mock user database
  const users = [{
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  }, {
    username: 'user1',
    password: 'user123',
    role: 'user'
  }, {
    username: 'user2',
    password: 'user456',
    role: 'user'
  }];
  const login = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(username);
      setUserRole(user.role);
      return {
        success: true,
        role: user.role
      };
    }
    return {
      success: false,
      role: ''
    };
  };
  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };
  const value = {
    currentUser,
    userRole,
    login,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};