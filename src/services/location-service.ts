import * as Location from 'expo-location';
import { WeatherError } from '../types/weather';

export class LocationService {
  private static instance: LocationService;

  private constructor() {}

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async requestLocationPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      const locationError: WeatherError = new Error('Failed to request location permission') as WeatherError;
      locationError.type = 'LOCATION_ERROR';
      locationError.details = error;
      throw locationError;
    }
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    try {
      const hasPermission = await this.requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      const locationError: WeatherError = new Error('Failed to get current location') as WeatherError;
      locationError.type = 'LOCATION_ERROR';
      locationError.details = error;
      throw locationError;
    }
  }
} 