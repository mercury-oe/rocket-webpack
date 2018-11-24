const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminWebpWebpackPlugin= require('imagemin-webp-webpack-plugin');

const common = require('./webpack.common.js');
const config = require(path.resolve('config'));

const configureCleanWebpack = {
  root: config.paths.dist.base,
  verbose: true,
  dry: false
};

const configureOptimization = {
  splitChunks: {
    cacheGroups: {
      default: false,
      common: false,
      styles: {
        name: config.vars.cssName,
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    }
  },
  minimizer: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        },
        safe: true,
        discardComments: true
      },
    })
  ]
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
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        minimize: true,
        sourceMap: false,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
      },
    },
  ],
};

module.exports = merge(
  common,
  {
    output: {
      filename: path.join('./js', '[name].[chunkhash].js'),
    },
    mode: 'production',
    // devtool: 'source-map',
    module: {
      rules: [
        postcssLoader,
        configureImageLoader,
      ],
    },
    optimization: configureOptimization,
    plugins: [
      new CleanWebpackPlugin(config.paths.dist.clean,
        configureCleanWebpack,
      ),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: config.cssFilename,
        chunkFilename: '[id].[hash].css',
      }),
      // new ExtractTextPlugin({
      //   filename: config.cssFilename,
      // }),
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: config.paths.appHtml,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new ImageminWebpWebpackPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
  }
);
