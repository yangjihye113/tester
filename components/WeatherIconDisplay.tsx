import React from 'react';
import { WeatherDataPoint, WeatherCondition } from '../types';

const getWeatherIcon = (weather: WeatherCondition) => {
    switch (weather) {
        case '맑음': return '☀️';
        case '구름 많음': return '🌥️';
        case '흐림': return '☁️';
        case '비': return '🌧️';
        case '눈': return '❄️';
        default: return '';
    }
};

interface WeatherIconDisplayProps {
    data: WeatherDataPoint[];
}

const WeatherIconDisplay: React.FC<WeatherIconDisplayProps> = ({ data }) => {
    return (
        <div className="mb-8 relative">
            <div className="overflow-x-auto pb-4 -mx-6 px-6">
                <div className="flex flex-row gap-4">
                    {data.map((dayData) => (
                        <div key={dayData.date} className="bg-base-100 p-4 rounded-lg flex flex-col items-center justify-between transition-transform transform hover:scale-105 flex-shrink-0 w-36">
                            <div>
                                <p className="font-bold text-gray-300">{dayData.date}</p>
                                <p className="text-sm text-gray-400">({dayData.day})</p>
                            </div>
                            <div className="text-5xl my-4">{getWeatherIcon(dayData.weather)}</div>
                            <p className="font-semibold text-info">{dayData.weather}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherIconDisplay;