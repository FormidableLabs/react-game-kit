/* global __dirname:false */

const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './demo/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: path.resolve(__dirname, 'demo'),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader',
        },
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')],
        use: {
          loader: 'style-loader!css-loader!postcss-loader',
        },
      },
    ],
  },
};
