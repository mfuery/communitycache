"use strict";
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
const base_config = require('./webpack.common');

const config = merge(base_config, {
  output: {
    ...base_config.output
  },

  plugins: [
    new CleanWebpackPlugin(['assets/build']),
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': JSON.stringify('production')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // })
  ]
});

module.exports = config;
