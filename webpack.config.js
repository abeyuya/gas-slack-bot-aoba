const path = require('path');
const GasPlugin = require("gas-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    ds: [
      './src/lib/polyfill.js',
      './src/entrypoint/ds.ts'
    ],
    webhook: [
      './src/lib/polyfill.js',
      './src/entrypoint/webhook.ts'
    ],
    talk: [
      './src/lib/polyfill.js',
      './src/entrypoint/talk.ts'
    ],
    zoi: [
      './src/lib/polyfill.js',
      './src/entrypoint/zoi.ts'
    ],
    github_pr_remind: [
      './src/lib/polyfill.js',
      './src/entrypoint/github_pr_remind.ts'
    ],
    github_pr_remind_all_user: [
      './src/lib/polyfill.js',
      './src/entrypoint/github_pr_remind_all_user.ts'
    ],
    jiho: [
      './src/lib/polyfill.js',
      './src/entrypoint/jiho.ts'
    ],
    test: [
      './src/lib/polyfill.js',
      './src/entrypoint/test.ts'
    ],
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
      'SLACK_MY_USER_ID',
      'SLACK_TALK_CHANNEL',
      'SLACK_TALK_TO_ACCOUNT',
      'SLACK_DS_CHANNEL',
      'SLACK_OWNER_CHANNEL',
      'SLACK_REVIEW_CHANNEL',
      'SLACK_B_TOKEN',
      'SLACK_B_MY_USER_ID',
      'SLACK_C_TOKEN',
      'SLACK_C_MY_USER_ID',
      'SLACK_DEBUG_CHANNEL',
      'SLACK_DEBUG_TOKEN',
      'SLACK_DEBUG_MY_USER_ID',
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
