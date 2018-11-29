const javaScriptLoader = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
            cacheDirectory: true,
          },
        },
      },
    ],
  },
});

module.exports = javaScriptLoader;
