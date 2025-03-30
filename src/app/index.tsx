import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useWeatherStore } from "../stores/weather-store";
import { LocationService } from "../services/location-service";
import { WeatherChart } from "../components/weather/WeatherChart";
import { WeatherTable } from "../components/weather/WeatherTable";

export default function HomeScreen() {
  const { weatherData, isLoading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    const getWeather = async () => {
      try {
        const locationService = LocationService.getInstance();
        const location = await locationService.getCurrentLocation();
        await fetchWeather(location.latitude, location.longitude);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    getWeather();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg">{error.message}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500 text-lg">No weather data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-gray-900">
          Current Weather
        </Text>
        <Text className="text-4xl font-bold text-primary mt-2">
          {weatherData.temperature.toFixed(1)}°C
        </Text>
      </View>

      <WeatherChart data={[weatherData]} />
      <View className="h-4" />
      <WeatherTable data={[weatherData]} />
    </View>
  );
}
