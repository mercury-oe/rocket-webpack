const path = require('path');

const config = require('../config');

const javaScriptLoader = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(config.paths.cacheDir, 'js'),
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.resolve(config.paths.cacheDir, 'babel'),
            },
          },
        ],
      },
    ],
  },
});

module.exports = javaScriptLoader;
