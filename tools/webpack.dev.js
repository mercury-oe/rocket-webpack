const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');
const config = require(path.resolve('config'));

const devServer = {
  public: config.devServerConfig.public(),
  // contentBase: path.resolve(__dirname, config.paths.templates),
  host: config.devServerConfig.host(),
  port: config.devServerConfig.port(),
  https: !!parseInt(config.devServerConfig.https()),
  quiet: true,
  hot: true,
  hotOnly: true,
  overlay: true,
  stats: 'errors-only',
  open: config.devServerConfig.autoOpenBrowser,
  watchOptions: {
    poll: !!parseInt(config.devServerConfig.poll()),
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
};


const imageLoader = {
  test: /\.(png|jpe?g|gif|svg|webp)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash].[ext]'
      }
    }
  ]
};

const postcssLoader = {
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: true
      }
    },
    {
      loader: 'resolve-url-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
};

module.exports = merge(
  common,
  {
    output: {
      filename: path.join('./js', '[name].[hash].js'),
      publicPath: config.devServerConfig.public() + '/',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: devServer,
    module: {
      rules: [
        postcssLoader,
        imageLoader,
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: config.paths.appHtml,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin(dashboard.setData),
    ],
  }
);
