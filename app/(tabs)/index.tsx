import React, { useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherChart } from '../../components/WeatherChart';
import { WeatherTable } from '../../components/WeatherTable';
import { CurrentWeather } from '../../components/CurrentWeather';
import { WeatherSkeleton } from '../../components/WeatherSkeleton';
import { useWeatherStore } from '../../store/weatherStore';
import { theme } from '../../constants/theme';

export default function WeatherScreen() {
  const { fetchWeather, isLoading, error, weatherData, location } = useWeatherStore();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    if (weatherData && location) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [weatherData, location]);

  const onRefresh = React.useCallback(() => {
    fetchWeather();
  }, []);

  const getTimeBasedColors = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      // Morning: Warm sunrise colors
      return ['#FF8C42', '#FFB566', '#FFF1E6'] as const;
    } else if (hour >= 12 && hour < 18) {
      // Afternoon: Blue sky colors
      return ['#4A90E2', '#81C3F5', '#C4E3FF'] as const;
    } else if (hour >= 18 && hour < 20) {
      // Evening: Sunset colors
      return ['#FF5F6D', '#FFC371', '#FFE4B5'] as const;
    } else {
      // Night: Dark blue colors
      return ['#2C3E50', '#3498DB', '#85C1E9'] as const;
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <LinearGradient 
      colors={getTimeBasedColors()}
      style={styles.backgroundGradient}
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={styles.locationContainer}>
            <View style={styles.locationHeader}>
              <MaterialCommunityIcons name="map-marker" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.headerLocation}>Current Location</Text>
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.headerTitle}>{location?.city || 'Loading...'}</Text>
              <Text style={styles.headerSubtitle}>
                {location ? `${location.state}, ${location.country}` : 'Getting location...'}
              </Text>
            </View>
            <Text style={styles.currentTime}>{getCurrentTime()}</Text>
          </View>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={fetchWeather}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="refresh" size={24} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading} 
              onRefresh={onRefresh}
              tintColor="#FFF"
            />
          }
        >
          {isLoading ? (
            <WeatherSkeleton />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchWeather}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.weatherContent}>
              <CurrentWeather />
              <WeatherChart />
              <WeatherTable />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  locationContainer: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerLocation: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginLeft: 4,
  },
  locationDetails: {
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  currentTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  weatherContent: {
    padding: theme.spacing.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    marginTop: 100,
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.layout.borderRadius,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
