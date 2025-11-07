import { Region, WeatherDataPoint, WeatherCondition, TimePeriod } from '../types';

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getWeatherCondition = (temp: number, humidity: number): WeatherCondition => {
    if (temp <= 0) return '눈';
    if (humidity > 85 && temp > 5) return '비';
    if (humidity > 70) return '흐림';
    if (humidity > 50) return '구름 많음';
    return '맑음';
}

const generateWeatherData = (baseTemp: number, baseHumidity: number, numDays: number): WeatherDataPoint[] => {
  const data: WeatherDataPoint[] = [];
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // 월별 데이터에 더 흥미로운 변화를 주기 위해 변동성 추가
    const tempFluctuation = getRandomInt(-5, 5) + Math.sin(i / 5) * 2;
    const humidityFluctuation = getRandomInt(-15, 15) + Math.cos(i/3) * 5;

    const temperature = Math.round(baseTemp + tempFluctuation);
    const humidity = Math.min(100, Math.max(0, Math.round(baseHumidity + humidityFluctuation)));

    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      day: days[date.getDay()],
      temperature,
      humidity,
      weather: getWeatherCondition(temperature, humidity),
    });
  }
  return data;
};

const regionBaseConditions: Record<Region, { baseTemp: number, baseHumidity: number }> = {
  '제주시': { baseTemp: 22, baseHumidity: 65 },
  '서귀포시': { baseTemp: 24, baseHumidity: 75 },
  '한라산': { baseTemp: 10, baseHumidity: 80 },
  '성산': { baseTemp: 21, baseHumidity: 70 },
  '애월': { baseTemp: 23, baseHumidity: 68 },
};

export const fetchWeatherData = (region: Region, period: TimePeriod): Promise<WeatherDataPoint[]> => {
  console.log(`Fetching ${period} weather data for ${region}...`);
  const numDays = period === 'weekly' ? 7 : 30;
  const { baseTemp, baseHumidity } = regionBaseConditions[region];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateWeatherData(baseTemp, baseHumidity, numDays));
    }, 1000); // 네트워크 지연 시뮬레이션
  });
};
