const path = require('path');

const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require(path.resolve('config'));

const connectHotModuleReplacement = () => ({
  plugins: [ new HotModuleReplacementPlugin() ],
});

const connectFriendlyErrors = () => ({
  plugins: [ new FriendlyErrorsWebpackPlugin() ],
});

const cleanBuildFolder = () => ({
  plugins: [new CleanWebpackPlugin(config.paths.dist.clean,
    {
      root: config.paths.dist.base,
      verbose: true,
      dry: false
    },
  )],
});

module.exports = {
  connectHotModuleReplacement,
  connectFriendlyErrors,
  cleanBuildFolder,
};
