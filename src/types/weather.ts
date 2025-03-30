export interface WeatherData {
  temperature: number;
  humidity?: number;
  windSpeed?: number;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timezone: {
    name: string;
    abbreviation: string;
    offsetSeconds: number;
  };
  hourlyForecast: {
    time: Date[];
    temperature2m: Float32Array | number[];
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