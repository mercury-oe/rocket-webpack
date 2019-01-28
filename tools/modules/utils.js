const { HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../config');

const hotModuleReplacement = () => ({
  plugins: [new HotModuleReplacementPlugin()],
});

const friendlyErrors = () => ({
  plugins: [
    new ErrorOverlayPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
});

const cleanBuildFolder = () => ({
  plugins: [new CleanWebpackPlugin(config.paths.dist.clean,
    {
      root: config.paths.dist.base,
      verbose: true,
      dry: false,
    })],
});

const buildAnalyzer = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      generateStatsFile: true,
    }),
  ],
});

module.exports = {
  hotModuleReplacement,
  friendlyErrors,
  cleanBuildFolder,
  buildAnalyzer,
};
