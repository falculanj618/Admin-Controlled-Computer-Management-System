import React from 'react';
import { Computer } from '../../context/ComputerContext';
import { MonitorIcon, XIcon, ActivityIcon, AppWindowIcon } from 'lucide-react';
interface SpectateViewProps {
  computer: Computer;
  onClose: () => void;
}
export const SpectateView = ({
  computer,
  onClose
}: SpectateViewProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'browser':
        return <div className="h-4 w-4" />;
      case 'application':
        return <AppWindowIcon className="h-4 w-4" />;
      default:
        return <ActivityIcon className="h-4 w-4" />;
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <MonitorIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium">
              Monitoring {computer.name} - {computer.user}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 aspect-video relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-green-500 font-mono mb-4">
                      {computer.activeApplication || 'No active application'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Live monitoring simulation
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  Session Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-blue-700">User: {computer.user}</p>
                  <p className="text-sm text-blue-700">
                    Time Remaining: {formatTime(computer.timeRemaining)}
                  </p>
                  <p className="text-sm text-blue-700">Status: Active</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-4">Activity Log</h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {computer.activityLogs.map((log, index) => <div key={index} className="flex items-start space-x-2 bg-white p-2 rounded shadow-sm">
                    <div className="text-gray-500 mt-1">
                      {getActivityIcon(log.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {log.action} {log.details}
                      </p>
                      <p className="text-xs text-gray-500">{log.timestamp}</p>
                    </div>
                  </div>)}
                {computer.activityLogs.length === 0 && <p className="text-center text-gray-500 text-sm">
                    No activity recorded yet
                  </p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};