import axios from 'axios';
import * as Location from 'expo-location';
import { WeatherData, Location as LocationType } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';

export async function fetchWeatherData(location: LocationType): Promise<WeatherData> {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        hourly: 'temperature_2m',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export async function getCurrentLocation(): Promise<LocationType> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission not granted');
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    throw new Error('Failed to get location');
  }
} 