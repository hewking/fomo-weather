import { create } from 'zustand';
import { WeatherStore, WeatherData, WeatherError } from '../types/weather';
import { WeatherApiService } from '../services/weather-api';

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  isLoading: false,
  error: null,
  fetchWeather: async (lat: number, lon: number) => {
    set({ isLoading: true, error: null });
    try {
      const weatherService = WeatherApiService.getInstance();
      const data = await weatherService.getWeatherData(lat, lon);
      set({ weatherData: data, isLoading: false });
    } catch (error) {
      set({ error: error as WeatherError, isLoading: false });
    }
  },
})); 