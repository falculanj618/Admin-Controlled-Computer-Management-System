import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ComputerProvider } from './context/ComputerContext';
import { LoginForm } from './components/auth/LoginForm';
import { AdminDashboard } from './components/layout/AdminDashboard';
import { UserDashboard } from './components/layout/UserDashboard';
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const handleLogin = (user: string, role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUsername(user);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUsername('');
  };
  return <AuthProvider>
      <ComputerProvider>
        <div className="min-h-screen bg-gray-100">
          {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : userRole === 'admin' ? <AdminDashboard username={username} onLogout={handleLogout} /> : <UserDashboard username={username} onLogout={handleLogout} />}
        </div>
      </ComputerProvider>
    </AuthProvider>;
}