import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
        tabBarStyle: {
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.select({
            ios: 88,
            android: 68,
            web: 80,
            default: 80,
          }),
          paddingBottom: Platform.select({
            ios: 30,
            android: 10,
            web: 16,
            default: 16,
          }),
          paddingTop: Platform.select({
            ios: 10,
            android: 10,
            web: 12,
            default: 12,
          }),
        },
        tabBarLabelStyle: {
          fontSize: Platform.select({
            ios: 12,
            android: 12,
            web: 15,
            default: 15,
          }),
          fontWeight: '500',
          marginTop: Platform.select({
            ios: 4,
            android: 4,
            web: 8,
            default: 8,
          }),
        },
        tabBarIconStyle: {
          marginTop: Platform.select({
            ios: 4,
            android: 4,
            web: 0,
            default: 0,
          }),
        },
        tabBarItemStyle: {
          paddingVertical: Platform.select({
            ios: 0,
            android: 0,
            web: 12,
            default: 12,
          }),
          minHeight: Platform.select({
            ios: 'auto',
            android: 'auto',
            web: 'auto',
            default: 'auto',
          }),
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="weather-partly-cloudy" 
              size={Platform.select({
                ios: size,
                android: size,
                web: 32,
                default: 32,
              })} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
              name="cog" 
              size={Platform.select({
                ios: size,
                android: size,
                web: 32,
                default: 32,
              })} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
