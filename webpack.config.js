const path = require('path');
const GasPlugin = require("gas-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    ds: './src/entrypoint/ds.ts',
    webhook: './src/entrypoint/webhook.ts',
    talk: './src/entrypoint/talk.ts',
    zoi: './src/entrypoint/zoi.ts',
    github_pr_remind: './src/entrypoint/github_pr_remind.ts',
    github_pr_remind_all_user: './src/entrypoint/github_pr_remind_all_user.ts',
    test: './src/entrypoint/test.ts',
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
        test: /\.(js|ts)$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', '.ts'
    ]
  },
  plugins: [
    new GasPlugin(),
    new webpack.EnvironmentPlugin([
      'SLACK_TOKEN',
      'SLACK_TALK_CHANNEL',
      'SLACK_TALK_TO_ACCOUNT',
      'SLACK_DS_CHANNEL',
      'SLACK_OWNER_CHANNEL',
      'SLACK_DEBUG_CHANNEL',
      'TW_CONSUMER_KEY',
      'TW_CONSUMER_SECRET',
      'TW_ACCESS_TOKEN',
      'TW_ACCESS_TOKEN_SECRET',
      'DOCOMO_APIKEY',
      'GITHUB_ACCESS_TOKEN',
      'GITHUB_TARGET_ORGS',
    ])
  ]
};
