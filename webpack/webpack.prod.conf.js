const webpack = require('webpack');

const WebpackShellPlugin = require('webpack-shell-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

const options = merge(base, {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new WebpackShellPlugin({
      onBuildEnd: ['node webpack/script/build-zip.js']
    }),
  ]
});
module.exports = options;
