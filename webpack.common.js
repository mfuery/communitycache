// import webpack from 'webpack';
// import path from 'path';
// import BundleTracker from 'webpack-bundle-tracker';
const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

const BUILD_DIR = path.resolve(__dirname, 'assets/js/build');
const APP_DIR = path.resolve(__dirname, 'assets/js');

const config = {
  context: __dirname,
  entry: [
    `${APP_DIR}/entry.jsx`
  ],
  output: {
    path: BUILD_DIR,
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: []
          }
        }
      },
      {
        test: /\.ne$/,
        loader: 'nearley-loader'
      },
      { // scss loader for webpack
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'})
  ]
};

module.exports = config;