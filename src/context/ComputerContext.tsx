import React, { useEffect, useState, createContext, useContext } from 'react';
export interface ActivityLog {
  timestamp: string;
  action: string;
  details: string;
  type: 'system' | 'browser' | 'application';
}
export interface Session {
  username: string;
  startTime: string;
  timeLimit: number;
  computerName: string;
}
export interface Computer {
  id: number;
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
  timeRemaining: number;
  user: string | null;
  isBeingSpectated?: boolean;
  lastActivity?: string;
  activityLogs: ActivityLog[];
  activeApplication?: string;
  sessionHistory: Session[];
}
interface ComputerContextType {
  computers: Computer[];
  assignComputer: (computerId: number, user: string) => void;
  releaseComputer: (computerId: number) => void;
  addTime: (computerId: number, minutes: number) => void;
  setMaintenanceMode: (computerId: number, maintenance: boolean) => void;
  toggleSpectate: (computerId: number) => void;
}
const ComputerContext = createContext<ComputerContextType | undefined>(undefined);
export const useComputers = () => {
  const context = useContext(ComputerContext);
  if (context === undefined) {
    throw new Error('useComputers must be used within a ComputerProvider');
  }
  return context;
};
interface ComputerProviderProps {
  children: ReactNode;
}
export const ComputerProvider = ({
  children
}: ComputerProviderProps) => {
  const [computers, setComputers] = useState<Computer[]>([{
    id: 1,
    name: 'PC 1',
    status: 'available',
    timeRemaining: 0,
    user: null,
    isBeingSpectated: false,
    lastActivity: '',
    activityLogs: [],
    activeApplication: '',
    sessionHistory: []
  }, {
    id: 2,
    name: 'PC 2',
    status: 'available',
    timeRemaining: 0,
    user: null,
    isBeingSpectated: false,
    lastActivity: '',
    activityLogs: [],
    activeApplication: '',
    sessionHistory: []
  }, {
    id: 3,
    name: 'PC 3',
    status: 'available',
    timeRemaining: 0,
    user: null,
    isBeingSpectated: false,
    lastActivity: '',
    activityLogs: [],
    activeApplication: '',
    sessionHistory: []
  }, {
    id: 4,
    name: 'PC 4',
    status: 'available',
    timeRemaining: 0,
    user: null,
    isBeingSpectated: false,
    lastActivity: '',
    activityLogs: [],
    activeApplication: '',
    sessionHistory: []
  }, {
    id: 5,
    name: 'PC 5',
    status: 'available',
    timeRemaining: 0,
    user: null,
    isBeingSpectated: false,
    lastActivity: '',
    activityLogs: [],
    activeApplication: '',
    sessionHistory: []
  }, {
    id: 6,
    name: 'PC 6',
    status: 'available',
    timeRemaining: 0,
    user: null,
    isBeingSpectated: false,
    lastActivity: '',
    activityLogs: [],
    activeApplication: '',
    sessionHistory: []
  }]);
  // Simulated activity monitoring
  useEffect(() => {
    const activitySimulator = setInterval(() => {
      setComputers(prevComputers => prevComputers.map(computer => {
        if (computer.status === 'in-use') {
          const activities = [{
            type: 'browser',
            action: 'Visited',
            details: 'learning portal'
          }, {
            type: 'application',
            action: 'Opened',
            details: 'VS Code'
          }, {
            type: 'system',
            action: 'Connected',
            details: 'USB device'
          }, {
            type: 'browser',
            action: 'Searched',
            details: 'programming tutorial'
          }, {
            type: 'application',
            action: 'Started',
            details: 'Terminal'
          }];
          const randomActivity = activities[Math.floor(Math.random() * activities.length)];
          const newLog: ActivityLog = {
            timestamp: new Date().toLocaleTimeString(),
            ...randomActivity
          };
          return {
            ...computer,
            lastActivity: `${randomActivity.action} ${randomActivity.details}`,
            activeApplication: randomActivity.type === 'application' ? randomActivity.details : computer.activeApplication,
            activityLogs: [...computer.activityLogs.slice(-9), newLog]
          };
        }
        return computer;
      }));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(activitySimulator);
  }, []);
  // Add timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setComputers(prevComputers => prevComputers.map(computer => {
        if (computer.status === 'in-use' && computer.timeRemaining > 0) {
          const newTimeRemaining = computer.timeRemaining - 1;
          // Automatically release computer when time runs out
          if (newTimeRemaining <= 0) {
            return {
              ...computer,
              status: 'available',
              user: null,
              timeRemaining: 0,
              activityLogs: [],
              activeApplication: '',
              isBeingSpectated: false
            };
          }
          return {
            ...computer,
            timeRemaining: newTimeRemaining
          };
        }
        return computer;
      }));
    }, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);
  const assignComputer = (computerId: number, user: string) => {
    setComputers(computers.map(computer => {
      if (computer.id === computerId) {
        const newSession: Session = {
          username: user,
          startTime: new Date().toLocaleString(),
          timeLimit: 0,
          computerName: computer.name
        };
        return {
          ...computer,
          status: 'in-use',
          user,
          timeRemaining: 0,
          sessionHistory: [...computer.sessionHistory, newSession]
        };
      }
      return computer;
    }));
  };
  const releaseComputer = (computerId: number) => {
    setComputers(computers.map(computer => {
      if (computer.id === computerId) {
        return {
          ...computer,
          status: 'available',
          user: null,
          timeRemaining: 0
        };
      }
      return computer;
    }));
  };
  const addTime = (computerId: number, minutes: number) => {
    setComputers(computers.map(computer => {
      if (computer.id === computerId) {
        const updatedHistory = [...computer.sessionHistory];
        if (updatedHistory.length > 0) {
          const currentSession = updatedHistory[updatedHistory.length - 1];
          currentSession.timeLimit += minutes;
        }
        return {
          ...computer,
          timeRemaining: computer.timeRemaining + minutes * 60,
          sessionHistory: updatedHistory
        };
      }
      return computer;
    }));
  };
  const setMaintenanceMode = (computerId: number, maintenance: boolean) => {
    setComputers(computers.map(computer => {
      if (computer.id === computerId) {
        return {
          ...computer,
          status: maintenance ? 'maintenance' : 'available',
          user: null,
          timeRemaining: 0
        };
      }
      return computer;
    }));
  };
  const toggleSpectate = (computerId: number) => {
    setComputers(computers.map(computer => {
      if (computer.id === computerId) {
        return {
          ...computer,
          isBeingSpectated: !computer.isBeingSpectated,
          lastActivity: computer.status === 'in-use' ? 'User is browsing the internet' : ''
        };
      }
      return computer;
    }));
  };
  const value = {
    computers,
    assignComputer,
    releaseComputer,
    addTime,
    setMaintenanceMode,
    toggleSpectate
  };
  return <ComputerContext.Provider value={value}>
      {children}
    </ComputerContext.Provider>;
};