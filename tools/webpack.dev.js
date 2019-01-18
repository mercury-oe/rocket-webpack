const merge = require('webpack-merge');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssLoader = require('./modules/css').cssDevLoader;
const utils = require('./modules/utils');

const commonConfig = require('./webpack.common.js');
const config = require('./config');

async function devConfig() {
  const HOST = config.devServerConfig.host();
  const suggestedPort = await choosePort(HOST, config.devServerConfig.port());

  return merge(
    commonConfig,
    {
      mode: 'development',
      entry: [
        `${require.resolve('webpack-dev-server/client')}?/`,
        require.resolve('webpack/hot/dev-server'),
      ],
      output: {
        publicPath: config.paths.publicPath,
      },
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        host: HOST,
        port: suggestedPort,
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: config.paths.src.appHtml,
        }),
      ],
    },
    cssLoader(),
    utils.hotModuleReplacement(),
    utils.friendlyErrors(),
  );
}

module.exports = devConfig;
