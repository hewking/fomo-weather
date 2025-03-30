import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const SETTINGS_OPTIONS = [
  {
    title: 'Units',
    icon: 'ruler',
    value: 'Celsius',
  },
  {
    title: 'Location',
    icon: 'map-marker',
    value: 'Auto',
  },
  {
    title: 'Notifications',
    icon: 'bell',
    value: 'On',
  },
  {
    title: 'Refresh Interval',
    icon: 'refresh',
    value: '30 min',
  },
  {
    title: 'About',
    icon: 'information',
    value: '',
  },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView style={styles.content}>
        {SETTINGS_OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={option.title}
            style={[
              styles.optionItem,
              index === SETTINGS_OPTIONS.length - 1 && styles.lastItem,
            ]}
          >
            <View style={styles.optionLeft}>
              <MaterialCommunityIcons
                name={option.icon}
                size={24}
                color={theme.colors.primary}
                style={styles.optionIcon}
              />
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <View style={styles.optionRight}>
              {option.value && (
                <Text style={styles.optionValue}>{option.value}</Text>
              )}
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="rgba(0,0,0,0.3)"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: theme.spacing.sm,
  },
  optionTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontSize: 16,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
}); 