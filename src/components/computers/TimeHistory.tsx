import React from 'react';
import { Session } from '../../context/ComputerContext';
import { HistoryIcon } from 'lucide-react';
interface TimeHistoryProps {
  sessions: Session[];
}
export const TimeHistory = ({
  sessions
}: TimeHistoryProps) => {
  return <div className="space-y-4">
      <div className="flex items-center">
        <HistoryIcon className="h-5 w-5 text-gray-500 mr-2" />
        <h4 className="font-medium text-gray-700">Usage History</h4>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {sessions.length > 0 ? <div className="divide-y divide-gray-200">
            {sessions.map((session, index) => <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">
                      {session.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.computerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">
                      {session.timeLimit} minutes
                    </p>
                    <p className="text-xs text-gray-500">{session.startTime}</p>
                  </div>
                </div>
              </div>)}
          </div> : <div className="p-4 text-center text-gray-500">
            No usage history available
          </div>}
      </div>
    </div>;
};