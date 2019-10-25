const webpack = require('webpack');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

const options = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ChromeExtensionReloader({
      port: 9999,
      reloadPage: true,
      entries: {
        background: 'background',
        popup: 'popup',
        contentScripts: 'content'
      }
    })
  ]
});
module.exports = options;
