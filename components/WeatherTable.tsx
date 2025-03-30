import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';
import Animated, { 
  FadeInDown, 
  FadeOutUp,
  Layout
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CELL_WIDTH = width / 4;

type WeatherIcon = 'sunny' | 'partly-sunny' | 'cloudy' | 'rainy' | 'thunderstorm' | 'snow' | 'help-circle';

export function WeatherTable() {
  const { weatherData } = useWeatherStore();

  if (!weatherData) return null;

  const renderWeatherIcon = useCallback((weatherCode: number): WeatherIcon => {
    // 根据天气代码返回对应的图标
    const icons: { [key: number]: WeatherIcon } = {
      0: 'sunny', // 晴天
      1: 'partly-sunny', // 多云
      2: 'cloudy', // 阴天
      3: 'rainy', // 雨天
      4: 'thunderstorm', // 雷暴
      5: 'snow', // 雪
    };
    return icons[weatherCode] || 'help-circle';
  }, []);

  return (
    <Card>
      <View style={styles.header}>
        <Text style={[styles.headerCell, { width: CELL_WIDTH }]}>Time</Text>
        <Text style={[styles.headerCell, { width: CELL_WIDTH }]}>Weather</Text>
        <Text style={[styles.headerCell, { width: CELL_WIDTH }]}>Temp</Text>
        <Text style={[styles.headerCell, { width: CELL_WIDTH }]}>Humidity</Text>
      </View>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {weatherData.hourly.time.map((time, index) => (
          <Animated.View 
            key={time}
            entering={FadeInDown.delay(index * 50)}
            exiting={FadeOutUp}
            layout={Layout.springify()}
            style={styles.row}
          >
            <Text style={[styles.cell, { width: CELL_WIDTH }]}>
              {new Date(time).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
            <View style={[styles.iconCell, { width: CELL_WIDTH }]}>
              <Ionicons 
                name={renderWeatherIcon(weatherData.hourly.weathercode[index])} 
                size={20} 
                color={theme.colors.primary} 
              />
            </View>
            <Text style={[styles.cell, { width: CELL_WIDTH }]}>
              {weatherData.hourly.temperature_2m[index].toFixed(1)}°C
            </Text>
            <Text style={[styles.cell, { width: CELL_WIDTH }]}>
              {weatherData.hourly.relativehumidity_2m[index]}%
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  scrollContent: {
    paddingBottom: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
    backgroundColor: 'rgba(65, 145, 255, 0.05)',
    borderTopLeftRadius: theme.layout.borderRadius,
    borderTopRightRadius: theme.layout.borderRadius,
  },
  headerCell: {
    ...theme.typography.h2,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  cell: {
    ...theme.typography.body,
    textAlign: 'center',
    fontSize: 14,
    color: theme.colors.text,
  },
  iconCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 