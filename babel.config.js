module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      ['module-resolver', {
        alias: {
          '@': './src',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.web.ts',
          '.ios.tsx',
          '.android.tsx',
          '.web.tsx',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
        ],
      }],
    ],
  };
}; 