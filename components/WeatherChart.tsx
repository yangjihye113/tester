import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { WeatherDataPoint } from '../types';

interface WeatherChartProps {
  data: WeatherDataPoint[];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as WeatherDataPoint;
    return (
      <div className="bg-base-100 p-4 rounded-lg shadow-xl border border-gray-700">
        <p className="font-bold text-lg text-white">{`${label} (${data.day})`}</p>
        <p style={{ color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value}°C`}</p>
        <p style={{ color: payload[1].color }}>{`${payload[1].name}: ${payload[1].value}%`}</p>
      </div>
    );
  }
  return null;
};

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  // 데이터가 많을 경우(월별 보기) X축 레이블 간격 조정
  const xAxisInterval = data.length > 10 ? Math.floor(data.length / 7) : 0;

  return (
    <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
        <LineChart
            data={data}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="date" stroke="#A0AEC0" interval={xAxisInterval} />
            <YAxis yAxisId="left" stroke="#FB923C" label={{ value: '온도 (°C)', angle: -90, position: 'insideLeft', fill: '#FB923C', dy: 40 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#60A5FA" label={{ value: '습도 (%)', angle: -90, position: 'insideRight', fill: '#60A5FA', dy: -20 }}/>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="temperature" name="온도" stroke="#FB923C" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="humidity" name="습도" stroke="#60A5FA" strokeWidth={2} activeDot={{ r: 8 }}/>
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;