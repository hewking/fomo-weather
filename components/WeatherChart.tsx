import React, { useState, useRef, useCallback } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useWeatherStore } from '../store/weatherStore';
import { theme } from '../constants/theme';
import { Card } from './Card';
import { GestureHandlerRootView, PinchGestureHandler, PinchGestureHandlerEventPayload, PinchGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedGestureHandler, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - theme.spacing.md * 2;

export function WeatherChart() {
  const { weatherData } = useWeatherStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleDataPoints, setVisibleDataPoints] = useState(24);
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);

  // 用于捏合缩放的动画值
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event: any) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
      ],
    };
  });

  React.useEffect(() => {
    fadeAnim.value = 0;
    scaleAnim.value = 1;
    
    fadeAnim.value = withSpring(1);
    scaleAnim.value = withSpring(1);
  }, [weatherData]);

  if (!weatherData) return null;

  // 根据可见数据点数量调整显示的数据
  const timeLabels = weatherData.hourly.time.slice(0, visibleDataPoints).map((time) => 
    new Date(time).toLocaleTimeString([], { hour: '2-digit' })
  );
  const tempData = weatherData.hourly.temperature_2m.slice(0, visibleDataPoints);

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
    scaleAnim.value = withSpring(0.95);
    scaleAnim.value = withSpring(1);
    setSelectedIndex(index);
  };

  const handlePinchGestureEvent = useCallback((event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      const newScale = event.nativeEvent.scale;
      if (newScale > 1) {
        // 放大时显示更多数据点
        setVisibleDataPoints(prev => Math.min(prev + 6, 48));
      } else if (newScale < 1) {
        // 缩小时显示更少数据点
        setVisibleDataPoints(prev => Math.max(prev - 6, 12));
      }
    }
  }, []);

  return (
    <Card style={styles.cardContainer}>
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
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
        <GestureHandlerRootView style={styles.chartWrapper}>
          <PinchGestureHandler onGestureEvent={pinchHandler} onHandlerStateChange={handlePinchGestureEvent}>
            <Animated.View style={[styles.chartContainer, animatedStyle]}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chartScrollContainer}
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
            </Animated.View>
          </PinchGestureHandler>
        </GestureHandlerRootView>
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
          <View style={styles.legendItem}>
            <Text style={styles.legendText}>Pinch to zoom</Text>
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
  chartWrapper: {
    overflow: 'hidden',
  },
  chartContainer: {
    overflow: 'hidden',
  },
  chartScrollContainer: {
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