/* global __dirname:false */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./demo/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: {
          loader: 'style-loader!css-loader!postcss-loader',
        },
      },
    ],
  },
};
