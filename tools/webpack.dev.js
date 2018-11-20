const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');
const config = require(path.resolve('config'));


const devServer = {
  public: config.devServerConfig.public(),
  // contentBase: path.resolve(__dirname, config.paths.templates),
  host: config.devServerConfig.host(),
  port: config.devServerConfig.port(),
  https: !!parseInt(config.devServerConfig.https()),
  quiet: true,
  hot: true,
  hotOnly: true,
  overlay: true,
  stats: 'errors-only',
  open: config.devServerConfig.autoOpenBrowser,
  watchOptions: {
    poll: !!parseInt(config.devServerConfig.poll()),
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
};


module.exports = merge(
  common,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: devServer,
  }
);
