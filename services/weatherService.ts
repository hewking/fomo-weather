export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
} 