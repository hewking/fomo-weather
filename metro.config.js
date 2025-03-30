const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname, {
  // Add any custom config here
});

// Add support for expo-router
config.resolver.sourceExts.push('mjs');

module.exports = config; 