import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';
import Animated, { 
  FadeInDown, 
  FadeOutUp,
  Layout,
  withSpring
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_PADDING = Platform.OS === 'ios' ? theme.spacing.sm : theme.spacing.md;
const CARD_MARGIN = Platform.OS === 'ios' ? theme.spacing.xs : theme.spacing.sm;
const AVAILABLE_WIDTH = width - (CARD_PADDING * 2) - (CARD_MARGIN * 2);
const CELL_WIDTH = Math.floor(AVAILABLE_WIDTH / 4);

type WeatherIcon = 'sunny-outline' | 'partly-sunny-outline' | 'cloudy-outline' | 'rainy-outline' | 'thunderstorm-outline' | 'snow-outline' | 'help-circle-outline';

function formatTime(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isTomorrow = new Date(now.getTime() + 86400000).toDateString() === date.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  } else if (isTomorrow) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString([], { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}

export function WeatherTable() {
  const { weatherData } = useWeatherStore();

  if (!weatherData?.hourly?.time) return null;

  const renderWeatherIcon = useCallback((weatherCode: number): WeatherIcon => {
    const icons: { [key: number]: WeatherIcon } = {
      0: 'sunny-outline',
      1: 'partly-sunny-outline',
      2: 'cloudy-outline',
      3: 'rainy-outline',
      4: 'thunderstorm-outline',
      5: 'snow-outline',
    };
    return icons[weatherCode] || 'help-circle-outline';
  }, []);

  const timeData = weatherData.hourly.time || [];
  const tempData = weatherData.hourly.temperature_2m || [];
  const weatherCodes = weatherData.hourly.weathercode || [];
  const humidityData = weatherData.hourly.relativehumidity_2m || [];

  const formattedData = useMemo(() => 
    timeData.map((time, index) => ({
      time: formatTime(new Date(time)),
      temp: (tempData[index] || 0).toFixed(1),
      humidity: humidityData[index] || 0,
      weatherCode: weatherCodes[index] || 0,
      isToday: new Date(time).toDateString() === new Date().toDateString(),
      isTomorrow: new Date(time).toDateString() === new Date(new Date().getTime() + 86400000).toDateString(),
    })), [timeData, tempData, humidityData, weatherCodes]);

  return (
    <Card style={styles.card}>
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
        bounces={false}
        decelerationRate="fast"
        snapToInterval={Platform.OS === 'ios' ? 36 : undefined}
        snapToAlignment="start"
      >
        {formattedData.map((item, index) => (
          <Animated.View 
            key={item.time}
            entering={FadeInDown.delay(index * 30).springify()}
            exiting={FadeOutUp.springify()}
            layout={Layout.springify()}
            style={[
              styles.row,
              Platform.OS === 'ios' && styles.rowIOS,
              item.isToday && styles.todayRow,
              item.isTomorrow && styles.tomorrowRow
            ]}
          >
            <Text 
              style={[
                styles.cell, 
                { width: CELL_WIDTH },
                item.isToday && styles.todayText,
                item.isTomorrow && styles.tomorrowText
              ]} 
              numberOfLines={1}
            >
              {item.time}
            </Text>
            <View style={[styles.iconCell, { width: CELL_WIDTH }]}>
              <Ionicons 
                name={renderWeatherIcon(item.weatherCode)} 
                size={16} 
                color={theme.colors.primary} 
              />
            </View>
            <Text style={[styles.cell, { width: CELL_WIDTH }]} numberOfLines={1}>
              {item.temp}°C
            </Text>
            <Text style={[styles.cell, { width: CELL_WIDTH }]} numberOfLines={1}>
              {item.humidity}%
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: CARD_MARGIN,
    paddingHorizontal: CARD_PADDING,
  },
  container: {
    maxHeight: 300,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.xs : theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.xs : theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: Platform.OS === 'ios' ? theme.spacing.xs : theme.spacing.sm,
    backgroundColor: 'rgba(65, 145, 255, 0.05)',
    borderTopLeftRadius: theme.layout.borderRadius,
    borderTopRightRadius: theme.layout.borderRadius,
  },
  headerCell: {
    ...theme.typography.h2,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: Platform.OS === 'ios' ? 12 : 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  rowIOS: {
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  todayRow: {
    backgroundColor: 'rgba(65, 145, 255, 0.05)',
  },
  tomorrowRow: {
    backgroundColor: 'rgba(65, 145, 255, 0.02)',
  },
  cell: {
    ...theme.typography.body,
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 12 : 13,
    color: theme.colors.text,
    paddingHorizontal: 1,
  },
  todayText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  tomorrowText: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  iconCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 
