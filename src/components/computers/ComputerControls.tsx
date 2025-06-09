import React, { useState } from 'react';
import { Computer, useComputers } from '../../context/ComputerContext';
import { PlusIcon, MinusIcon, UserIcon, WrenchIcon, PowerIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { TimeHistory } from './TimeHistory';
interface ComputerControlsProps {
  selectedComputer: Computer | null;
}
export const ComputerControls = ({
  selectedComputer
}: ComputerControlsProps) => {
  const {
    assignComputer,
    releaseComputer,
    addTime,
    setMaintenanceMode,
    toggleSpectate
  } = useComputers();
  const [timeToAdd, setTimeToAdd] = useState(30);
  const [customTime, setCustomTime] = useState('');
  const [username, setUsername] = useState('');
  if (!selectedComputer) {
    return <div className="text-center py-8 px-4">
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-gray-500 font-medium mb-2">
            No Computer Selected
          </h3>
          <p className="text-gray-400 text-sm">
            Select a computer from the grid to manage it
          </p>
        </div>
      </div>;
  }
  const handleAssignComputer = () => {
    if (username.trim() && selectedComputer) {
      assignComputer(selectedComputer.id, username);
      setUsername('');
    }
  };
  const handleAddTime = () => {
    if (selectedComputer) {
      addTime(selectedComputer.id, timeToAdd);
    }
  };
  const handleReleaseComputer = () => {
    if (selectedComputer) {
      releaseComputer(selectedComputer.id);
    }
  };
  const handleToggleMaintenance = () => {
    if (selectedComputer) {
      setMaintenanceMode(selectedComputer.id, selectedComputer.status !== 'maintenance');
    }
  };
  const handleToggleSpectate = () => {
    if (selectedComputer) {
      toggleSpectate(selectedComputer.id);
    }
  };
  return <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">
          {selectedComputer.name} -{' '}
          {selectedComputer.status.charAt(0).toUpperCase() + selectedComputer.status.slice(1)}
        </h3>
        {selectedComputer.user && <p className="text-sm text-blue-700">
            Current user: {selectedComputer.user}
          </p>}
        {selectedComputer.timeRemaining > 0 && <p className="text-sm text-blue-700">
            Time remaining: {selectedComputer.timeRemaining} minutes
          </p>}
      </div>
      {selectedComputer.status === 'available' && <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Assign to User</h4>
          <div className="flex space-x-2">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border" />
            <button onClick={handleAssignComputer} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <UserIcon className="h-4 w-4 mr-1" />
              Assign
            </button>
          </div>
          <div>
            <button onClick={handleToggleMaintenance} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 w-full justify-center">
              <WrenchIcon className="h-4 w-4 mr-1" />
              Set to Maintenance
            </button>
          </div>
        </div>}
      {selectedComputer.status === 'in-use' && <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-700">Manage Time</h4>
            <button onClick={handleToggleSpectate} className={`
                inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
                ${selectedComputer.isBeingSpectated ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}
              `}>
              {selectedComputer.isBeingSpectated ? <>
                  <EyeOffIcon className="h-4 w-4 mr-1" />
                  Stop Spectating
                </> : <>
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Spectate
                </>}
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <button onClick={() => setTimeToAdd(Math.max(0, timeToAdd - 15))} className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-medium">
                {timeToAdd} minutes
              </span>
              <button onClick={() => setTimeToAdd(timeToAdd + 15)} className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex space-x-2">
              <input type="number" value={customTime} onChange={e => setCustomTime(e.target.value)} placeholder="Custom time in minutes" className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border" min="1" />
              <button onClick={() => {
            const minutes = parseInt(customTime);
            if (!isNaN(minutes) && minutes > 0) {
              addTime(selectedComputer.id, minutes);
              setCustomTime('');
            }
          }} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Add Custom
              </button>
            </div>
          </div>
          <button onClick={handleAddTime} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full justify-center">
            <PlusIcon className="h-4 w-4 mr-1" />
            Add {timeToAdd} Minutes
          </button>
          <button onClick={handleReleaseComputer} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full justify-center">
            <PowerIcon className="h-4 w-4 mr-1" />
            End Session
          </button>
        </div>}
      {selectedComputer.status === 'maintenance' && <div>
          <button onClick={handleToggleMaintenance} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full justify-center">
            <PowerIcon className="h-4 w-4 mr-1" />
            Mark as Available
          </button>
        </div>}
      {selectedComputer && <TimeHistory sessions={selectedComputer.sessionHistory} />}
    </div>;
};