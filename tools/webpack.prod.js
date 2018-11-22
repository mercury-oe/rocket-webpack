const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

const common = require('./webpack.common.js');
const config = require(path.resolve('config'));

const extractTextPluginOptions = { publicPath: Array(config.cssFilename.split('/').length).join('../') };

const configureCleanWebpack = {
  root: config.paths.dist.base,
  verbose: true,
  dry: false
};

const configureImageLoader =  {
  test: /\.(png|jpe?g|gif|svg|webp)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash].[ext]'
      }
    },
    {
      loader: 'img-loader',
      options: {
        plugins: [
          require('imagemin-gifsicle')({
            interlaced: true,
          }),
          require('imagemin-mozjpeg')({
            progressive: true,
            arithmetic: false,
          }),
          require('imagemin-optipng')({
            optimizationLevel: 5,
          }),
          require('imagemin-svgo')({
            plugins: [
              {convertPathData: false},
            ]
          }),
        ]
      }
    }
  ]
};

const postcssLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: false,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      extractTextPluginOptions
    )
  ),
};

module.exports = merge(
  common,
  {
    output: {
      filename: path.join('./js', '[name].[chunkhash].js'),
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        postcssLoader,
        configureImageLoader,
      ],
    },
    plugins: [
      new CleanWebpackPlugin(config.paths.dist.clean,
        configureCleanWebpack,
      ),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: config.cssFilename,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: config.paths.appHtml,
      }),
      new ImageminWebpWebpackPlugin(),
    ]
  }
);
