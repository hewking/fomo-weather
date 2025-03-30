import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - theme.spacing.md * 4;

export function WeatherChart() {
  const { weatherData } = useWeatherStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!weatherData) return null;

  const data = {
    labels: weatherData.hourly.time.map((time) => 
      new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [{
      data: weatherData.hourly.temperature_2m,
    }],
  };

  const selectedTemp = weatherData.hourly.temperature_2m[selectedIndex];
  const selectedTime = weatherData.hourly.time[selectedIndex];

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>Temperature Trend</Text>
        <TouchableOpacity
          style={styles.selectedTime}
          onPress={() => setSelectedIndex(0)}
        >
          <Text style={styles.selectedTimeText}>
            {new Date(selectedTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </View>
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
        onDataPointClick={({ index }) => setSelectedIndex(index)}
        getDotProps={(value, index) => ({
          r: index === selectedIndex ? 8 : 6,
          strokeWidth: index === selectedIndex ? 3 : 2,
        })}
      />
      <View style={styles.selectedTemp}>
        <Text style={styles.selectedTempValue}>
          {selectedTemp.toFixed(1)}°C
        </Text>
        <Text style={styles.selectedTempLabel}>
          at {new Date(selectedTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  selectedTime: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.layout.borderRadius,
  },
  selectedTimeText: {
    ...theme.typography.body,
    color: theme.colors.primary,
  },
  chart: {
    marginVertical: theme.spacing.sm,
    borderRadius: theme.layout.borderRadius,
  },
  selectedTemp: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  selectedTempValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  selectedTempLabel: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
}); 