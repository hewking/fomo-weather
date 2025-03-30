import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../constants/theme';
import { Card } from './Card';

export function WeatherSkeleton() {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <>
      <Card>
        <View style={styles.currentWeatherSkeleton}>
          <Animated.View style={[styles.temperatureSkeleton, { opacity }]} />
          <Animated.View style={[styles.timeSkeleton, { opacity }]} />
        </View>
      </Card>
      <Card>
        <View style={styles.chartSkeleton}>
          <Animated.View style={[styles.chartLine, { opacity }]} />
          <Animated.View style={[styles.chartLine, { opacity }]} />
          <Animated.View style={[styles.chartLine, { opacity }]} />
        </View>
      </Card>
      <Card>
        <View style={styles.tableSkeleton}>
          <View style={styles.tableHeader}>
            <Animated.View style={[styles.headerCell, { opacity }]} />
            <Animated.View style={[styles.headerCell, { opacity }]} />
          </View>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.tableRow}>
              <Animated.View style={[styles.cell, { opacity }]} />
              <Animated.View style={[styles.cell, { opacity }]} />
            </View>
          ))}
        </View>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  currentWeatherSkeleton: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  temperatureSkeleton: {
    width: 120,
    height: 60,
    backgroundColor: theme.colors.border,
    borderRadius: theme.layout.borderRadius,
    marginBottom: theme.spacing.sm,
  },
  timeSkeleton: {
    width: 80,
    height: 20,
    backgroundColor: theme.colors.border,
    borderRadius: theme.layout.borderRadius,
  },
  chartSkeleton: {
    height: 220,
    justifyContent: 'space-around',
    padding: theme.spacing.md,
  },
  chartLine: {
    height: 2,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
  },
  tableSkeleton: {
    padding: theme.spacing.md,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  headerCell: {
    flex: 1,
    height: 24,
    backgroundColor: theme.colors.border,
    borderRadius: theme.layout.borderRadius,
    marginHorizontal: theme.spacing.sm,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  cell: {
    flex: 1,
    height: 20,
    backgroundColor: theme.colors.border,
    borderRadius: theme.layout.borderRadius,
    marginHorizontal: theme.spacing.sm,
  },
}); 