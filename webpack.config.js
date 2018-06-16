const path = require('path');
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    ds: './src/entrypoint/ds.ts'
  },
  devtool: false,
  output: {
    libraryTarget: 'commonjs',
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
    new GasPlugin()
  ]
};

// const path = require('path');
// const GasPlugin = require("gas-webpack-plugin");
//
// module.exports = {
//   entry: {
//     ds: './src/entrypoint/ds.ts'
//   },
//   target: 'node',
//   module: {
//     loaders: [
//       {
//         test: /\.ts(x?)$/,
//         loader: 'ts-loader',
//       },
//     ],
//   },
//   resolve: {
//     extensions: [
//       '.ts',
//     ],
//   },
//   output: {
//     libraryTarget: 'commonjs',
//     path: path.join(__dirname, '.webpack'),
//     filename: '[name].js',
//   },
//   plugins: [
//     new GasPlugin()
//   ]
// };
