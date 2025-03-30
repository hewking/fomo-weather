import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WeatherChart } from '../../components/WeatherChart';
import { WeatherTable } from '../../components/WeatherTable';
import { useWeatherStore } from '../../store/weatherStore';

export default function WeatherScreen() {
  const { fetchWeather, isLoading, error, weatherData } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = React.useCallback(() => {
    fetchWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText} onPress={fetchWeather}>
              Tap to retry
            </Text>
          </View>
        ) : weatherData ? (
          <>
            <View style={styles.currentWeather}>
              <Text style={styles.temperature}>
                {weatherData.hourly.temperature_2m[0].toFixed(1)}°C
              </Text>
              <Text style={styles.time}>
                {new Date(weatherData.hourly.time[0]).toLocaleTimeString()}
              </Text>
            </View>
            <WeatherChart />
            <WeatherTable />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 8,
  },
  retryText: {
    color: '#007AFF',
    fontSize: 16,
  },
  currentWeather: {
    alignItems: 'center',
    padding: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
});
