const path = require('path');

const pkg = require(path.resolve('package.json'));
const config = require(path.resolve('config'));

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
};

const baseConfig = {
  entry: config.entries,
  module: {
    rules: [
      babelLoader,
    ],
  }
};

module.exports = baseConfig;
