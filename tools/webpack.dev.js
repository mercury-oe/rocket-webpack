const path = require('path');
const merge = require('webpack-merge');
const choosePort = require('react-dev-utils/WebpackDevServerUtils').choosePort;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssLoader = require('./modules/css').cssDevLoader;
const utils = require('./modules/utils');

const common = require('./webpack.common.js');
const config = require(path.resolve('config'));

async function devConfig() {
  const HOST = config.devServerConfig.host();
  const suggestedPort = await choosePort(HOST, config.devServerConfig.port());

  return merge(
    common,
    {
      mode: 'development',
      entry: [
        config.entries.main,
        'webpack-hot-middleware/client?reload=true&quiet=true',
      ],
      output: {
        filename: path.join('./js', '[name].[hash].js'),
        publicPath: config.devServerConfig.public() + '/',
      },
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
    utils.connectHotModuleReplacement(),
  )
}

module.exports = devConfig;
