import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WeatherChart } from '../../components/WeatherChart';
import { WeatherTable } from '../../components/WeatherTable';
import { CurrentWeather } from '../../components/CurrentWeather';
import { useWeatherStore } from '../../store/weatherStore';
import { theme } from '../../constants/theme';

export default function WeatherScreen() {
  const { fetchWeather, isLoading, error } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = React.useCallback(() => {
    fetchWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText} onPress={fetchWeather}>
              Tap to retry
            </Text>
          </View>
        ) : (
          <>
            <CurrentWeather />
            <WeatherChart />
            <WeatherTable />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    ...theme.typography.body,
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  retryText: {
    ...theme.typography.body,
    color: theme.colors.primary,
  },
});
