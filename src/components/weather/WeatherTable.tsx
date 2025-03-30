import React from 'react';
import { StyledView, StyledText, StyledScrollView } from '../../styles/global';
import { WeatherData } from '../../types/weather';

interface WeatherTableProps {
  data: WeatherData[];
}

export function WeatherTable({ data }: WeatherTableProps) {
  return (
    <StyledScrollView className="w-full bg-white rounded-lg shadow-sm">
      <StyledView className="p-4">
        {data.map((item, index) => (
          <StyledView
            key={index}
            className="flex-row justify-between items-center py-2 border-b border-gray-200"
          >
            <StyledView>
              <StyledText className="text-gray-600">
                {new Date(item.timestamp).toLocaleTimeString()}
              </StyledText>
            </StyledView>
            <StyledView className="flex-row space-x-4">
              <StyledText className="text-gray-900 font-medium">
                {item.temperature.toFixed(1)}°C
              </StyledText>
              <StyledText className="text-gray-900 font-medium">
                {item.humidity}%
              </StyledText>
              <StyledText className="text-gray-900 font-medium">
                {item.windSpeed} m/s
              </StyledText>
            </StyledView>
          </StyledView>
        ))}
      </StyledView>
    </StyledScrollView>
  );
} 