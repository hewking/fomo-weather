import { fetchWeatherApi } from 'openmeteo';
import { WeatherResponse, WeatherData, WeatherError } from '../types/weather';

const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

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

  private range(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  }

  async getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      const params = {
        latitude: lat,
        longitude: lon,
        hourly: "temperature_2m"
      };

      const responses = await fetchWeatherApi(this.baseUrl, params);
      const response = responses[0];

      // 获取时区和位置信息
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();

      const hourly = response.hourly()!;
      
      // 处理天气数据
      const weatherData = {
        hourly: {
          time: this.range(
            Number(hourly.time()), 
            Number(hourly.timeEnd()), 
            hourly.interval()
          ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
          temperature2m: hourly.variables(0)!.valuesArray()!,
        }
      };

      // 获取当前小时的数据
      const currentHour = new Date().getHours();
      
      return {
        temperature: weatherData.hourly.temperature2m[currentHour],
        timestamp: weatherData.hourly.time[currentHour].toISOString(),
        location: {
          latitude: lat,
          longitude: lon,
        },
        timezone: {
          name: timezone || '',
          abbreviation: timezoneAbbreviation || '',
          offsetSeconds: utcOffsetSeconds
        },
        hourlyForecast: weatherData.hourly
      };
    } catch (error) {
      const weatherError: WeatherError = new Error('Failed to fetch weather data') as WeatherError;
      weatherError.type = 'API_ERROR';
      weatherError.details = error;
      throw weatherError;
    }
  }
} 