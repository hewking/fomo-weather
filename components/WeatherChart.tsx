import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useWeatherStore } from '../store/weatherStore';

const screenWidth = Dimensions.get('window').width;

export function WeatherChart() {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  const data = {
    labels: weatherData.hourly.time.map((time) => 
      new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [{
      data: weatherData.hourly.temperature_2m,
    }],
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
} 