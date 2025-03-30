import { create } from 'zustand';
import { WeatherState, Location, WeatherData } from '../types/weather';
import { fetchWeatherData, getCurrentLocation } from '../services/weatherApi';

export const useWeatherStore = create<WeatherState>((set) => ({
  currentLocation: null,
  weatherData: null,
  isLoading: false,
  error: null,

  fetchWeather: async () => {
    set({ isLoading: true, error: null });
    try {
      const location = await getCurrentLocation();
      const weatherData = await fetchWeatherData(location);
      set({ currentLocation: location, weatherData, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setLocation: (location: Location) => {
    set({ currentLocation: location });
  },

  clearError: () => {
    set({ error: null });
  },
})); 