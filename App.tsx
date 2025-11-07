import React, { useState, useEffect, useCallback } from 'react';
import { REGIONS } from './constants';
import { Region, WeatherDataPoint, TimePeriod } from './types';
import { fetchWeatherData } from './services/weatherService';
import RegionSelector from './components/RegionSelector';
import TimePeriodSelector from './components/TimePeriodSelector';
import WeatherChart from './components/WeatherChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherIconDisplay from './components/WeatherIconDisplay';

const App: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(REGIONS[0]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('weekly');
  const [weatherData, setWeatherData] = useState<WeatherDataPoint[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherData = useCallback(async (region: Region, period: TimePeriod) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherData(region, period);
      setWeatherData(data);
    } catch (err) {
      setError('날씨 데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadWeatherData(selectedRegion, timePeriod);
  }, [selectedRegion, timePeriod, loadWeatherData]);

  const periodText = timePeriod === 'weekly' ? '7일' : '한 달';
  const forecastTitle = `${selectedRegion} ${timePeriod === 'weekly' ? '주간' : '월간'} 날씨 예보`;

  return (
    <div className="min-h-screen bg-base-300 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            제주도 날씨 시각화
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            지역을 선택하여 앞으로 {periodText}간의 날씨 예보를 확인하세요.
          </p>
        </header>

        <main>
          <div className="bg-base-200 rounded-xl shadow-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                <TimePeriodSelector selectedPeriod={timePeriod} onSelectPeriod={setTimePeriod} />
                <RegionSelector 
                  regions={REGIONS} 
                  selectedRegion={selectedRegion} 
                  onSelectRegion={setSelectedRegion} 
                />
            </div>

            <div className="mt-8 min-h-[450px] flex flex-col items-center justify-center">
              {loading && <LoadingSpinner />}
              {error && <ErrorMessage message={error} />}
              {weatherData && !loading && !error && (
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-center mb-6 text-info">{forecastTitle}</h2>
                  <WeatherIconDisplay data={weatherData} />
                  <WeatherChart data={weatherData} />
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Jeju Weather Analytics. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;