import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWeatherStore } from '../store/weatherStore';

export function WeatherTable() {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Temperature (°C)</Text>
      </View>
      {weatherData.hourly.time.map((time, index) => (
        <View key={time} style={styles.row}>
          <Text style={styles.cell}>
            {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text style={styles.cell}>
            {weatherData.hourly.temperature_2m[index].toFixed(1)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
}); 