export interface WeatherData {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    relativehumidity_2m: number[];
  };
}

export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface WeatherState {
  currentLocation: Location | null;
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (location: Location) => void;
  fetchWeather: () => Promise<void>;
  clearError: () => void;
} 