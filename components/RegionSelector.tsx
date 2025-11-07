
import React from 'react';
import { Region } from '../types';

interface RegionSelectorProps {
  regions: Region[];
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, selectedRegion, onSelectRegion }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onSelectRegion(region)}
          className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200
            ${selectedRegion === region 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-neutral text-gray-300 hover:bg-base-100'
            }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default RegionSelector;
