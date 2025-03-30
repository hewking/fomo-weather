const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // 自定义配置
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, './src'),
    crypto: 'crypto-browserify',
    stream: 'stream-browserify',
    buffer: 'buffer',
    util: 'util',
    assert: 'assert',
    http: 'stream-http',
    https: 'https-browserify',
    os: 'os-browserify',
    url: 'url',
  };

  // 添加 fallback 配置
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    util: require.resolve('util'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  };

  return config;
}; 