import { WeatherResponse, WeatherData, WeatherError } from '../types/weather';

const API_BASE_URL = 'https://api.open-meteo.com/v1';

export class WeatherApiService {
  private static instance: WeatherApiService;
  private baseUrl: string;

  private constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(): WeatherApiService {
    if (!WeatherApiService.instance) {
      WeatherApiService.instance = new WeatherApiService();
    }
    return WeatherApiService.instance;
  }

  async getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherResponse = await response.json();
      
      // 获取当前时间的数据
      const currentHour = new Date().getHours();
      const currentTemperature = data.hourly.temperature_2m[currentHour];
      const currentTime = data.hourly.time[currentHour];

      return {
        temperature: currentTemperature,
        timestamp: currentTime,
        location: {
          latitude: lat,
          longitude: lon,
        },
      };
    } catch (error) {
      const weatherError: WeatherError = new Error('Failed to fetch weather data') as WeatherError;
      weatherError.type = 'API_ERROR';
      weatherError.details = error;
      throw weatherError;
    }
  }
} 