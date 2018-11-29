const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const modules = require('postcss-icss-selectors');

const config = require(path.resolve('config'));

const cssLoader = ({ sourceMap = false } = { sourceMap: false }) => ({
  loader:  'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[path][name]__[local]--[hash:base64:8]',
    sourceMap,
  },
});

const postCssLoader = ({ sourceMap, minimize } = { sourceMap: false, minimize: false }) => {
  const plugins = [];

  if (minimize) {
    plugins.push(
      cssnano({ preset: [ 'default', { normalizeUrl: false }] }),
    );
  }

  return {
    loader:  'postcss-loader',
    options: {
      sourceMap,
      config: {
        path: 'postcss.config.js',
      },
      plugins: (loader) => {
        return [
          ...plugins,
          modules({
            mode: loader.resourcePath.includes('.m.css')
              ? 'local'
              : 'global'
          })
        ]
      },
    },
  };
};

const cssDevLoader = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  [
          'style-loader',
          cssLoader({ sourceMap: true }),
          postCssLoader({ sourceMap: true, minimize: false }),
        ],
      },
    ],
  },
});

const cssProdLoader = () => ({
  module: {
    rules: [
      {
        test:    /\.css$/,
        include: [ config.paths.src.base, /node_modules/ ],
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader({ sourceMap: false }),
          postCssLoader({ sourceMap: false, minimize: true }),
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: config.names.cssFilename,
      chunkFilename: config.names.chunkNameCss,
    }),
  ],
});

module.exports = {
  cssDevLoader,
  cssProdLoader,
};
