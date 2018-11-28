const cssLoader = ({ sourceMap = false } = { sourceMap: false }) => ({
  loader:  'css-loader',
  options: {
    modules:        true,
    importLoaders:  1,
    localIdentName: '[path][name]__[local]--[hash:base64:8]',
    sourceMap,
  },
});

const postCssLoader = ({ sourceMap, minimize } = { sourceMap: false, minimize: false }) => {
  return {
    loader:  'postcss-loader',
    options: {
      sourceMap,
      config: {
        path: 'postcss.config.js',
      }
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

module.exports = {
  cssDevLoader,
};
