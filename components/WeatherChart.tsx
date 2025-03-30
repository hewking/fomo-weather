import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - theme.spacing.md * 4;

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
    <Card>
      <LineChart
        data={data}
        width={chartWidth}
        height={220}
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: theme.layout.borderRadius,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: theme.colors.primary,
          },
          propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: theme.colors.border,
          },
        }}
        bezier
        style={styles.chart}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  chart: {
    marginVertical: theme.spacing.sm,
    borderRadius: theme.layout.borderRadius,
  },
}); 