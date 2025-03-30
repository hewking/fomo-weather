import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';

export function CurrentWeather() {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.temperature}>
          {weatherData.hourly.temperature_2m[0].toFixed(1)}°C
        </Text>
        <Text style={styles.time}>
          {new Date(weatherData.hourly.time[0]).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  temperature: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  time: {
    ...theme.typography.caption,
    marginTop: theme.spacing.sm,
  },
}); 