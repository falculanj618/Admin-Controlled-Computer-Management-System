import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserIcon, LockIcon, LogInIcon } from 'lucide-react';
interface LoginFormProps {
  onLogin: (username: string, role: string) => void;
}
export const LoginForm = ({
  onLogin
}: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login
  } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const loginResult = login(username, password);
    if (loginResult.success) {
      onLogin(username, loginResult.role);
    } else {
      setError('Invalid username or password');
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">CompShop System</h1>
          <p className="text-gray-600 mt-2">
            Login to access the computer management system
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3" placeholder="Enter your username" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 border px-3" placeholder="Enter your password" required />
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <LogInIcon className="h-5 w-5 mr-2" />
            Sign in
          </button>
        </form>
        <div className="mt-6">
          <div className="text-sm text-center">
            <p className="text-gray-500">Demo Accounts:</p>
            <p className="text-gray-500">Admin: admin / admin123</p>
            <p className="text-gray-500">User: user1 / user123</p>
          </div>
        </div>
      </div>
    </div>;
};