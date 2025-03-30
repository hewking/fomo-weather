import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';

export function WeatherTable() {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Temperature</Text>
      </View>
      <ScrollView style={styles.container}>
        {weatherData.hourly.time.map((time, index) => (
          <View key={time} style={styles.row}>
            <Text style={styles.cell}>
              {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text style={styles.cell}>
              {weatherData.hourly.temperature_2m[index].toFixed(1)}°C
            </Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  headerCell: {
    flex: 1,
    ...theme.typography.h2,
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  cell: {
    flex: 1,
    ...theme.typography.body,
    textAlign: 'center',
  },
}); 