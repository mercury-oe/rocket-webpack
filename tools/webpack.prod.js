const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssLoader = require('./modules/css').cssProdLoader;
const utils = require('./modules/utils');
const optimization = require('./modules/optimization');

const commonConfig = require('./webpack.common.js');
const config = require('./config');

module.exports = () => {
  const ANALYZE = process.argv.includes('--analyze');

  return merge(
    commonConfig,
    {
      mode: 'production',
      devtool: false,
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          filename: 'index.html',
          template: config.paths.appHtml,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }),
      ],
    },
    utils.cleanBuildFolder(),
    cssLoader(),
    optimization.imageOptimization(),
    ANALYZE && utils.buildAnalyzer(),
  );
};
