import React from 'react';
import { Computer } from '../../context/ComputerContext';
import { MonitorIcon, UserIcon, ClockIcon, WrenchIcon } from 'lucide-react';
interface ComputerCardProps {
  computer: Computer;
  isSelected: boolean;
  onClick: () => void;
}
export const ComputerCard = ({
  computer,
  isSelected,
  onClick
}: ComputerCardProps) => {
  const getStatusColor = () => {
    switch (computer.status) {
      case 'available':
        return 'bg-green-500';
      case 'in-use':
        return 'bg-blue-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getStatusText = () => {
    switch (computer.status) {
      case 'available':
        return 'Available';
      case 'in-use':
        return 'In Use';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  return <div className={`
        border rounded-lg p-4 cursor-pointer transition-all
        ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:bg-gray-50'}
      `} onClick={onClick}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <MonitorIcon className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-medium">{computer.name}</h3>
        </div>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${getStatusColor()} mr-2`}></div>
          <span className="text-sm text-gray-600">{getStatusText()}</span>
        </div>
      </div>
      <div className="space-y-2">
        {computer.status === 'in-use' && <>
            <div className="flex items-center text-sm text-gray-600">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>{computer.user || 'Unknown user'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-2" />
              <span>{formatTime(computer.timeRemaining)} remaining</span>
            </div>
          </>}
        {computer.status === 'maintenance' && <div className="flex items-center text-sm text-gray-600">
            <WrenchIcon className="h-4 w-4 mr-2" />
            <span>Under maintenance</span>
          </div>}
        {computer.status === 'available' && <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>Ready to use</span>
          </div>}
      </div>
    </div>;
};