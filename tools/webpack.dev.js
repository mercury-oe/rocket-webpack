const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssLoader = require('./modules/css').cssDevLoader;
const utils = require('./modules/utils');

const commonConfig = require('./webpack.common.js');
const config = require('./config');

function devConfig() {
  return merge(
    commonConfig,
    {
      mode: 'development',
      entry: [
        `${require.resolve('webpack-dev-server/client')}?/`,
        require.resolve('webpack/hot/dev-server'),
        /**
         * Важно! Чтобы код нашего приложения подключался после всех hot клиентов
         * иначе webpackDevServer после возникновения ошибок в коде не будет обновлять приложение
         */
        ...config.entries,
      ],
      output: {
        publicPath: config.paths.publicPath,
      },
      devtool: 'cheap-module-source-map',
      performance: {
        hints: false,
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: config.paths.src.appHtml,
        }),
      ],
    },
    utils.hotModuleReplacement(),
    cssLoader(),
    utils.friendlyErrors(),
  );
}

module.exports = devConfig;
