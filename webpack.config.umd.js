/* globals __dirname */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDom',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
  output: {
    library: 'ReactGameKit',
    libraryTarget: 'umd',
    filename: 'react-game-kit.min.js',
    path: path.join(__dirname, 'umd'),
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.SourceMapDevToolPlugin('[file].map'),
  ],
};
