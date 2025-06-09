import React from 'react';
import { LogOutIcon, MonitorIcon, ClockIcon } from 'lucide-react';
import { useComputers } from '../../context/ComputerContext';
interface UserDashboardProps {
  username: string;
  onLogout: () => void;
}
export const UserDashboard = ({
  username,
  onLogout
}: UserDashboardProps) => {
  const {
    computers
  } = useComputers();
  const userComputer = computers.find(comp => comp.user === username);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  return <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <MonitorIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              CompShop User Panel
            </h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600">
              Welcome, <span className="font-semibold">{username}</span>
            </span>
            <button onClick={onLogout} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <LogOutIcon className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Computer</h2>
          {userComputer ? <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <MonitorIcon className="h-10 w-10 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-blue-800">
                    {userComputer.name}
                  </h3>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
                  <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-lg font-medium">
                    {formatTime(userComputer.timeRemaining)} remaining
                  </span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-800 mb-2">Status</h4>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-700 font-medium">Active</span>
                </div>
                <div className="mt-4 bg-blue-100 p-3 rounded-lg">
                  <p className="text-blue-800">
                    Please contact the admin if you need more time or
                    assistance.
                  </p>
                </div>
              </div>
            </div> : <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <MonitorIcon className="h-16 w-16 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-xl font-medium text-yellow-800 mb-2">
                No Computer Assigned
              </h3>
              <p className="text-yellow-700">
                You don't have a computer assigned to you yet. Please contact
                the admin.
              </p>
            </div>}
        </div>
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Available Computers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {computers.filter(comp => comp.status === 'available').map(comp => <div key={comp.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <MonitorIcon className="h-6 w-6 text-gray-500 mr-2" />
                    <h3 className="font-medium text-gray-800">{comp.name}</h3>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-green-700">Available</span>
                  </div>
                </div>)}
            {computers.filter(comp => comp.status === 'available').length === 0 && <div className="col-span-full text-center py-6 text-gray-500">
                No computers available at the moment.
              </div>}
          </div>
        </div>
      </main>
    </div>;
};