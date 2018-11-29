const path = require('path');
const merge = require('webpack-merge');

const javaScriptLoader = require('./modules/javascript');
const assetsLoaders = require('./modules/assets');
const optimization = require('./modules/optimization');

const config = require(path.resolve('config'));

module.exports = merge(
  {
    entry: [
      ...config.entries,
    ],
    output: config.output,
    resolve: {
      modules: ['node_modules', config.paths.src.base],
    },
  },
  javaScriptLoader(),
  assetsLoaders.fontsLoader(),
  assetsLoaders.imagesLoader(),
  assetsLoaders.svgLoader(),
  optimization.contextReplacement(),
);
