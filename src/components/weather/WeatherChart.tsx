import React from 'react';
import { LineChart } from 'react-native-svg-charts';
import { StyledView } from '../../styles/global';
import { WeatherData } from '../../types/weather';

interface WeatherChartProps {
  data: WeatherData[];
}

export function WeatherChart({ data }: WeatherChartProps) {
  const temperatures = data.map(d => d.temperature);
  const timestamps = data.map(d => d.timestamp);

  return (
    <StyledView className="h-64 w-full bg-white rounded-lg p-4 shadow-sm">
      <LineChart
        style={{ height: 200 }}
        data={temperatures}
        svg={{ stroke: '#007AFF' }}
        contentInset={{ top: 20, bottom: 20 }}
      />
    </StyledView>
  );
} 