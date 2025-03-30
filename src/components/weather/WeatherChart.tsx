import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { WeatherData } from '../../types/weather';

interface Props {
  data: WeatherData[];
}

export const WeatherChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map(item => item.temperature);

  return (
    <View className="h-64 w-full bg-white rounded-lg p-4 shadow-sm">
      <LineChart
        data={chartData}
        svg={{ stroke: '#007AFF' }}
        style={{ height: 200 }}
        contentInset={{ top: 20, bottom: 20 }}
      />
    </View>
  );
}; 