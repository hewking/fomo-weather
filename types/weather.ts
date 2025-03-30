export interface WeatherData {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
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
} 