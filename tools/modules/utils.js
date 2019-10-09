const { HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const config = require('../config');

const hotModuleReplacement = () => ({
  plugins: [new HotModuleReplacementPlugin()],
});

const friendlyErrors = () => ({
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
});

const cleanBuildFolder = () => ({
  plugins: [new CleanWebpackPlugin(
    {
      root: config.paths.dist.base,
      verbose: true,
      dry: false,
    })],
});

const caseSensitivePathsPlugin = () => ({
  plugins: [new CaseSensitivePathsPlugin()],
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

const threadLoader = name => ({
  loader: 'thread-loader',
  options: {
    workerParallelJobs: 50,
    poolRespawn: false,
    name,
  },
});

module.exports = {
  hotModuleReplacement,
  friendlyErrors,
  cleanBuildFolder,
  buildAnalyzer,
  caseSensitivePathsPlugin,
  threadLoader,
};
