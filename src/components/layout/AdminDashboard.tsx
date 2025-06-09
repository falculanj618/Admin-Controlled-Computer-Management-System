import React, { useState } from 'react';
import { ComputerGrid } from '../computers/ComputerGrid';
import { ComputerControls } from '../computers/ComputerControls';
import { SpectateView } from '../computers/SpectateView';
import { LogOutIcon, MonitorIcon } from 'lucide-react';
import { useComputers, Computer } from '../../context/ComputerContext';
interface AdminDashboardProps {
  username: string;
  onLogout: () => void;
}
export const AdminDashboard = ({
  username,
  onLogout
}: AdminDashboardProps) => {
  const {
    computers,
    toggleSpectate
  } = useComputers();
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const spectatedComputer = computers.find(c => c.isBeingSpectated);
  const handleCloseSpectate = () => {
    if (spectatedComputer) {
      toggleSpectate(spectatedComputer.id);
    }
  };
  return <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <MonitorIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              CompShop Admin Panel
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Computer Status</h2>
              <ComputerGrid computers={computers} onSelectComputer={setSelectedComputer} selectedComputerId={selectedComputer?.id} />
            </div>
          </div>
          <div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Computer Controls</h2>
              <ComputerControls selectedComputer={selectedComputer} />
            </div>
            <div className="mt-6 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">Available</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {computers.filter(c => c.status === 'available').length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">In Use</p>
                  <p className="text-2xl font-bold text-green-800">
                    {computers.filter(c => c.status === 'in-use').length}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">Maintenance</p>
                  <p className="text-2xl font-bold text-yellow-800">
                    {computers.filter(c => c.status === 'maintenance').length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">Total</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {computers.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {spectatedComputer && <SpectateView computer={spectatedComputer} onClose={handleCloseSpectate} />}
    </div>;
};