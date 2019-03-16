const path = require('path');

const config = require('../config');
const { threadLoader } = require('../modules/utils');

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
          threadLoader('js'),
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
