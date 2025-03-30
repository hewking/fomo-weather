import React, { useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - theme.spacing.md * 2;

export function WeatherChart() {
  const { weatherData } = useWeatherStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(1);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [weatherData]);

  if (!weatherData) return null;

  // 只显示24小时的数据
  const timeLabels = weatherData.hourly.time.slice(0, 24).map((time) => 
    new Date(time).toLocaleTimeString([], { hour: '2-digit' })
  );
  const tempData = weatherData.hourly.temperature_2m.slice(0, 24);

  const data = {
    labels: timeLabels,
    datasets: [{
      data: tempData,
      color: (opacity = 1) => `rgba(65, 145, 255, ${opacity})`,
      strokeWidth: 2,
    }],
  };

  const selectedTemp = tempData[selectedIndex];
  const selectedTime = weatherData.hourly.time[selectedIndex];
  const nextTemp = tempData[selectedIndex + 1] || selectedTemp;
  const tempDiff = nextTemp - selectedTemp;
  const tempTrend = tempDiff > 0 ? '↑' : tempDiff < 0 ? '↓' : '→';

  const handleDataPointPress = (index: number) => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    
    setSelectedIndex(index);
  };

  return (
    <Card style={styles.cardContainer}>
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Temperature Trend</Text>
          <TouchableOpacity
            style={styles.selectedTime}
            onPress={() => handleDataPointPress(0)}
          >
            <Text style={styles.selectedTimeText}>
              {new Date(selectedTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chartContainer}
        >
          <LineChart
            data={data}
            width={Math.max(chartWidth, timeLabels.length * 40)}
            height={200}
            withHorizontalLines={true}
            withVerticalLines={false}
            withDots={true}
            withShadow={false}
            withInnerLines={false}
            withOuterLines={true}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: theme.colors.background,
              backgroundGradientTo: theme.colors.background,
              backgroundGradientFromOpacity: 1,
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(65, 145, 255, ${opacity})`,
              labelColor: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#4191FF',
              },
              propsForBackgroundLines: {
                strokeWidth: 1,
                strokeDasharray: '6,3',
                stroke: 'rgba(0,0,0,0.1)',
              },
              fillShadowGradientFrom: '#4191FF',
              fillShadowGradientFromOpacity: 0.3,
              fillShadowGradientTo: '#4191FF',
              fillShadowGradientToOpacity: 0.01,
            }}
            bezier
            style={styles.chart}
            onDataPointClick={({ index }) => handleDataPointPress(index)}
            getDotProps={(value, index) => ({
              r: index === selectedIndex ? '6' : '4',
              strokeWidth: index === selectedIndex ? '3' : '2',
              stroke: index === selectedIndex ? '#1E90FF' : '#4191FF',
              fill: '#FFF',
            })}
          />
        </ScrollView>
        <View style={styles.selectedTemp}>
          <Text style={styles.selectedTempValue}>
            {selectedTemp.toFixed(1)}°C
          </Text>
          <View style={styles.trendContainer}>
            <Text style={[styles.trendText, {
              color: tempDiff > 0 ? '#FF6B6B' : tempDiff < 0 ? '#4ECDC4' : theme.colors.text
            }]}>
              {tempTrend} {Math.abs(tempDiff).toFixed(1)}°C
            </Text>
            <Text style={styles.selectedTempLabel}>
              at {new Date(selectedTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4191FF' }]} />
            <Text style={styles.legendText}>Temperature</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
            <Text style={styles.legendText}>Rising</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
            <Text style={styles.legendText}>Falling</Text>
          </View>
        </View>
      </Animated.View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
  },
  container: {
    padding: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  selectedTime: {
    backgroundColor: 'rgba(65, 145, 255, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.layout.borderRadius,
  },
  selectedTimeText: {
    ...theme.typography.body,
    color: '#4191FF',
    fontSize: 14,
  },
  chartContainer: {
    paddingRight: theme.spacing.sm,
  },
  chart: {
    marginVertical: theme.spacing.xs,
    borderRadius: theme.layout.borderRadius,
  },
  selectedTemp: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  selectedTempValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '600',
  },
  trendContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  trendText: {
    ...theme.typography.body,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  selectedTempLabel: {
    ...theme.typography.caption,
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    ...theme.typography.caption,
    color: 'rgba(0,0,0,0.7)',
    fontSize: 12,
  },
}); 