import { create } from 'zustand';
import { fetchWeatherData, WeatherData } from '@/services/weatherService';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface Location {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherState {
  weatherData: WeatherData | null;
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: () => Promise<void>;
}

async function getAddressFromCoordinates(latitude: number, longitude: number): Promise<Location> {
  try {
    // 使用 Google Places API 进行反向地理编码
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    const data = await response.json();
    console.log('Google Places API response:', data);

    if (data.status !== 'OK' || !data.results[0]) {
      throw new Error('Failed to get address from coordinates');
    }

    const addressComponents = data.results[0].address_components;
    const city = addressComponents.find((component: any) => 
      component.types.includes('locality') || component.types.includes('sublocality')
    )?.long_name || 'Unknown City';

    const state = addressComponents.find((component: any) => 
      component.types.includes('administrative_area_level_1')
    )?.long_name || 'Unknown State';

    const country = addressComponents.find((component: any) => 
      component.types.includes('country')
    )?.long_name || 'Unknown Country';

    return {
      city,
      state,
      country,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error('Error getting address:', error);
    // 返回默认值
    return {
      city: 'Unknown City',
      state: 'Unknown State',
      country: 'Unknown Country',
      latitude,
      longitude,
    };
  }
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  location: null,
  isLoading: false,
  error: null,
  fetchWeather: async () => {
    try {
      console.log('Starting fetchWeather...');
      set({ isLoading: true, error: null });

      // Request location permissions
      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission status:', status);
      
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }

      // Get current location
      console.log('Getting current position...');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log('Current position:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date(location.timestamp).toISOString(),
      });
      
      // Get location details using Google Places API
      console.log('Getting address from coordinates...');
      const locationData = await getAddressFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );
      console.log('Location data:', locationData);

      // Update location in store
      set({ location: locationData });

      // Fetch weather data
      console.log('Fetching weather data...');
      const data = await fetchWeatherData(
        location.coords.latitude,
        location.coords.longitude
      );
      console.log('Weather data received:', data);

      set({ weatherData: data, isLoading: false });
    } catch (error) {
      console.error('Error in fetchWeather:', error);
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
      }
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch weather data',
        isLoading: false,
      });
    }
  },
})); 