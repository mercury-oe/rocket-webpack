const path = require('path');
const merge = require('webpack-merge');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssLoader = require('./modules/css').cssDevLoader;
const utils = require('./modules/utils');

const commonConfig = require('./webpack.common.js');
const config = require(path.resolve('config'));

async function devConfig() {
  const HOST = config.devServerConfig.host();
  const suggestedPort = await choosePort(HOST, config.devServerConfig.port());

  return merge(
    commonConfig,
    {
      mode: 'development',
      entry: [
        'webpack-hot-middleware/client?reload=true&quiet=true',
      ],
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        host: HOST,
        port: suggestedPort,
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          filename: 'index.html',
          template: config.paths.appHtml,
        }),
      ],
    },
    cssLoader(),
    utils.hotModuleReplacement(),
    utils.friendlyErrors(),
  )
}

module.exports = devConfig;
