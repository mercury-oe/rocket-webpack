const webpack = require('webpack');
const ImageminWebpackPlugin = require('imagemin-webpack');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const contextReplacement = () => ({
  plugins: [new webpack.ContextReplacementPlugin(/moment\/locale$/, /ru/)],
});

const imageOptimization = () => ({
  plugins: [
    new ImageminWebpackPlugin({
      imageminOptions: {
        plugins: [
          imageminMozjpeg({
            progressive: true,
            quality: 60,
          }),
          imageminPngquant({
            quality: 60,
          }),
          imageminSvgo(),
        ],
      },
    }),
    new ImageminWebpWebpackPlugin(),
  ],
});

module.exports = {
  contextReplacement,
  imageOptimization,
};
