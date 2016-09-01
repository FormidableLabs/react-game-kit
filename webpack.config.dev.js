const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './demo/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo'),
      ],
    }, {
      test: /\.css$/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo'),
      ],
      loader: 'style!css!postcss',
    }],
  },
};
