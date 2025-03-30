import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WeatherData } from '../../types/weather';

interface Props {
  data: WeatherData[];
}

export const WeatherTable: React.FC<Props> = ({ data }) => {
  return (
    <ScrollView className="w-full bg-white rounded-lg shadow-sm">
      <View className="p-4">
        {data.map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center py-2 border-b border-gray-200"
          >
            <Text className="text-gray-600">
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
            <Text className="text-gray-900 font-medium">
              {item.temperature.toFixed(1)}°C
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}; 