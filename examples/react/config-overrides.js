const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    process: require.resolve('process/browser'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    https: require.resolve('https-browserify'),
    http: require.resolve('stream-http'),
    url: require.resolve('url'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    asset: require.resolve('assert'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
