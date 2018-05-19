// import webpack from 'webpack';
// import merge from 'webpack-merge';
// import common from './webpack.common';
// import path from 'path';
// import BundleTracker from 'webpack-bundle-tracker';
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

const BUILD_DIR = path.resolve(__dirname, 'assets/js/build');

const config = merge.strategy({
  entry: 'prepend'
})(common, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ],
  output: {
    publicPath: 'http://localhost:3000/js/build/'
  },
  devServer: {
    contentBase: BUILD_DIR,
    hot: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats-dev.json'})
  ]
});

module.exports = config;