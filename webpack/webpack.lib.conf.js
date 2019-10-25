const path = require('path');
const webpack = require('webpack');

const dirs = require('./config/dirs');

module.exports = {
  context: dirs.src,
  entry: {
    frame: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'mobx',
      'mobx-react'
    ],
    ui: ['antd']
  },

  output: {
    library: '[name]',
    path: dirs.lib,
    publicPath: '/',
    filename: 'vendor_[name].dll.js'
  },

  mode: 'production',

  devtool: false,

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dirs.lib, 'vendor_[name].manifest.dll.json'),
      name: '[name]'
    })
  ]
};
