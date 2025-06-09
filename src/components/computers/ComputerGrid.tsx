import React from 'react';
import { Computer } from '../../context/ComputerContext';
import { ComputerCard } from './ComputerCard';
interface ComputerGridProps {
  computers: Computer[];
  onSelectComputer: (computer: Computer) => void;
  selectedComputerId?: number;
}
export const ComputerGrid = ({
  computers,
  onSelectComputer,
  selectedComputerId
}: ComputerGridProps) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {computers.map(computer => <ComputerCard key={computer.id} computer={computer} isSelected={computer.id === selectedComputerId} onClick={() => onSelectComputer(computer)} />)}
    </div>;
};