import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';

export function CurrentWeather() {
  const { weatherData } = useWeatherStore();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!weatherData) return null;

  const currentTemp = weatherData.hourly.temperature_2m[0];
  const nextTemp = weatherData.hourly.temperature_2m[1];
  const tempDiff = nextTemp - currentTemp;
  const tempTrend = tempDiff > 0 ? '↑' : tempDiff < 0 ? '↓' : '→';

  return (
    <Card>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.mainInfo}>
          <Text style={styles.temperature}>
            {currentTemp.toFixed(1)}°C
          </Text>
          <Text style={styles.trend}>
            {tempTrend} {Math.abs(tempDiff).toFixed(1)}°C
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Feels like</Text>
            <Text style={styles.detailValue}>
              {currentTemp.toFixed(1)}°C
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>65%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>12 km/h</Text>
          </View>
        </View>
        <Text style={styles.time}>
          {new Date(weatherData.hourly.time[0]).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Animated.View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  temperature: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  trend: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  time: {
    ...theme.typography.caption,
  },
}); 