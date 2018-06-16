const path = require('path');
const GasPlugin = require("gas-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    ds: './src/entrypoint/ds.ts'
  },
  devtool: false,
  output: {
    libraryTarget: 'this',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  plugins: [
    new GasPlugin(),
    new webpack.EnvironmentPlugin([
      'SLACK_TOKEN',
      'TWITTER_KEY',
      'TWITTER_SECRET'
    ])
  ]
};
