const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const cssLoader = require('./modules/css').cssProdLoader;
const utils = require('./modules/utils');
const optimization = require('./modules/optimization');

const commonConfig = require('./webpack.common.js');
const config = require('./config');

const smp = new SpeedMeasurePlugin();

module.exports = () => {
  const ANALYZE = process.argv.includes('--analyze');
  const SMP = process.argv.includes('--smp');

  const prodConfig = merge(
    commonConfig,
    {
      mode: 'production',
      entry: [...config.entries],
      devtool: false,
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: config.paths.src.appHtml,
          minify: {
            removeComments: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
          },
        }),
      ],
    },
    utils.cleanBuildFolder(),
    optimization.optimizeModules(),
    cssLoader(),
    optimization.imageOptimization(),
    ANALYZE && utils.buildAnalyzer(),
  );

  return SMP ? smp.wrap(prodConfig) : prodConfig;
};
