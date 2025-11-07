import React from 'react';
import { TimePeriod } from '../types';

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
}

const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({ selectedPeriod, onSelectPeriod }) => {
  const periods: { value: TimePeriod; label: string }[] = [
    { value: 'weekly', label: '주별' },
    { value: 'monthly', label: '월별' },
  ];

  return (
    <div className="flex justify-center bg-neutral rounded-full p-1">
      {periods.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSelectPeriod(value)}
          className={`px-6 py-2 text-sm font-bold rounded-full transition-colors duration-300 focus:outline-none
            ${selectedPeriod === value 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-white'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodSelector;
