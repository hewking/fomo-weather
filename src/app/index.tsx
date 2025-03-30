import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useWeatherStore } from "../stores/weather-store";
import { LocationService } from "../services/location-service";
import { WeatherChart } from "../components/weather/WeatherChart";
import { WeatherTable } from "../components/weather/WeatherTable";
import { StyledView, StyledText } from "../styles/global";

export default function HomeScreen() {
  const { weatherData, isLoading, error, fetchWeather } = useWeatherStore();

  useEffect(() => {
    const getWeather = async () => {
      try {
        const locationService = LocationService.getInstance();
        const location = await locationService.getCurrentLocation();
        console.log("location", location);
        await fetchWeather(location.latitude, location.longitude);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    getWeather();
  }, []);

  if (isLoading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#007AFF" />
      </StyledView>
    );
  }

  if (error) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-100">
        <StyledText className="text-red-500 text-lg">{error.message}</StyledText>
      </StyledView>
    );
  }

  if (!weatherData) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-100">
        <StyledText className="text-gray-500 text-lg">No weather data available</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-gray-100 p-4">
      <StyledView className="mb-4">
        <StyledText className="text-2xl font-bold text-gray-900">
          Current Weather
        </StyledText>
        <StyledText className="text-4xl font-bold text-primary mt-2">
          {weatherData.temperature.toFixed(1)}°C
        </StyledText>
      </StyledView>

      <WeatherChart data={[weatherData]} />
      <StyledView className="h-4" />
      <WeatherTable data={[weatherData]} />
    </StyledView>
  );
}
