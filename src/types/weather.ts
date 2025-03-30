export interface WeatherData {
  temperature: number;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export interface WeatherError extends Error {
  type: 'NETWORK_ERROR' | 'API_ERROR' | 'LOCATION_ERROR' | 'CACHE_ERROR';
  code?: string;
  details?: any;
}

export interface WeatherStore {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: WeatherError | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
} 