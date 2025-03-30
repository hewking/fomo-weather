import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';

interface SettingOption {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value?: string;
  type: 'toggle' | 'select' | 'link';
  isEnabled?: boolean;
  onPress?: () => void;
}

const SETTINGS_OPTIONS: SettingOption[] = [
  {
    title: 'Temperature Unit',
    icon: 'thermometer',
    value: 'Celsius',
    type: 'select',
  },
  {
    title: 'Location Services',
    icon: 'map-marker',
    type: 'toggle',
    isEnabled: true,
  },
  {
    title: 'Weather Alerts',
    icon: 'bell-ring',
    type: 'toggle',
    isEnabled: true,
  },
  {
    title: 'Auto Refresh',
    icon: 'refresh',
    value: '30 min',
    type: 'select',
  },
  {
    title: 'Dark Mode',
    icon: 'theme-light-dark',
    type: 'toggle',
    isEnabled: false,
  },
  {
    title: 'About',
    icon: 'information',
    type: 'link',
  },
  {
    title: 'Rate App',
    icon: 'star',
    type: 'link',
  },
  {
    title: 'Privacy Policy',
    icon: 'shield-check',
    type: 'link',
  },
];

export default function SettingsScreen() {
  const renderSettingItem = (option: SettingOption, index: number) => {
    return (
      <TouchableOpacity
        key={option.title}
        style={[
          styles.optionItem,
          index === 0 && styles.firstItem,
          index === SETTINGS_OPTIONS.length - 1 && styles.lastItem,
        ]}
      >
        <View style={styles.optionLeft}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={option.icon}
              size={22}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.optionTitle}>{option.title}</Text>
        </View>
        <View style={styles.optionRight}>
          {option.type === 'toggle' && (
            <Switch
              value={option.isEnabled}
              onValueChange={() => {}}
              trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
              thumbColor={'#FFFFFF'}
            />
          )}
          {option.type === 'select' && (
            <>
              <Text style={styles.optionValue}>{option.value}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="rgba(0,0,0,0.3)"
                style={styles.chevron}
              />
            </>
          )}
          {option.type === 'link' && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="rgba(0,0,0,0.3)"
              style={styles.chevron}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#F6F6F6', '#FFFFFF'] as const}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {SETTINGS_OPTIONS.slice(0, 5).map(renderSettingItem)}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            {SETTINGS_OPTIONS.slice(5).map(renderSettingItem)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    ...theme.typography.h1,
    color: theme.colors.text,
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,122,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: theme.spacing.xs,
  },
  chevron: {
    marginLeft: theme.spacing.xs,
  },
}); 