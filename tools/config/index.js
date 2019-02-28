const path = require('path');

const chunkNameJs = '[name].[contenthash].[id].js';

module.exports = {
  paths: {
    src: {
      base: path.resolve('src/'),
      js: path.resolve('src/'),
      css: path.resolve('src/css/'),
      templates: path.resolve('src/templates/'),
      appHtml: path.resolve('src/templates/index.html'),
    },
    dist: {
      base: path.resolve('dist'),
      clean: [
        './img',
        './images',
        './css',
        './js',
        './fonts',
        './assets',
      ],
    },
    publicPath: '/',
  },
  entries: [
    path.resolve('src/index.js'),
  ],
  output: {
    path: path.resolve('dist'),
    filename: path.join('./js', '[name].[contenthash].js'),
    chunkFilename: chunkNameJs,
    publicPath: './',
  },
  names: {
    chunkNameJs,
    chunkNameCss: '[name].[contenthash].[id].css',
    chunkNameAsset: '[name].[hash:8].[ext]',
    cssFilename: 'css/[name].[contenthash].css',
  },
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:3000',
    host: () => process.env.DEVSERVER_HOST || 'localhost',
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 3000,
    https: () => process.env.DEVSERVER_HTTPS || false,
    autoOpenBrowser: true,
  },
};
