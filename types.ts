export type Region = '제주시' | '서귀포시' | '한라산' | '성산' | '애월';

export type WeatherCondition = '맑음' | '구름 많음' | '흐림' | '비' | '눈';

export interface WeatherDataPoint {
  date: string;
  day: string;
  temperature: number;
  humidity: number;
  weather: WeatherCondition;
}

export type TimePeriod = 'weekly' | 'monthly';
