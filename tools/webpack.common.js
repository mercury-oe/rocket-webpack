const merge = require('webpack-merge');

const javaScriptLoader = require('./modules/javascript');
const assetsLoaders = require('./modules/assets');
const optimization = require('./modules/optimization');

const config = require('./config');

module.exports = merge(
  {
    output: { ...config.output },
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
