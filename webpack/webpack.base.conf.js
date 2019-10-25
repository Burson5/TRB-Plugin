const path = require('path');
const webpack = require('webpack');
const os = require('os');
const HappyPack = require('happypack');
const tsImportPluginFactory = require('ts-import-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const dllManifestOfVendorFrame = require('../lib/vendor_frame.manifest.dll.json');
const dllManifestOfVendorUI = require('../lib/vendor_ui.manifest.dll.json');

const dirs = require('./config/dirs');

const happyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const extractSass = new ExtractTextPlugin(
  `css/bundle_sass.[chunkhash].min.css`
);
const extractLess = new ExtractTextPlugin(
  `css/bundle_less.[chunkhash].min.css`
);
const extractCSS = new ExtractTextPlugin(`css/bundle_css.[chunkhash].min.css`);

module.exports = {
  context: dirs.src,
  entry: {
    popup: dirs.popup,
    background: dirs.background,
    content: dirs.content
  },
  output: {
    path: dirs.dist,
    publicPath: '/',
    filename: 'js/[name].min.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': dirs.src
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: 'css'
              })
            ]
          })
        },
        exclude: /node_modules/,
        include: dirs.src
      },
      {
        test: /\.(json|conf)$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            // importLoaders=1 配置(css-loader作用于@import的资源之前)有多少个loader
            // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            // modules css模块
            // localIdentName 查询参数，配置生成的ident
            'css-loader?importLoaders=1&modules&localIdentName=[local]__[name]-[hash:base64:8]',
            'sass-loader'
          ]
        })
      },

      {
        test: /\.less$/,
        use: extractLess.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader?javascriptEnabled=true']
        })
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // 分发子进程进行打包
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyPackThreadPool,
      verbose: true
    }),
    // popup html模板 将js引入其中
    new HtmlWebpackPlugin({
      title: 'popup',
      template: 'index.html',
      filename: 'popup.html',
      inject: true,
      chunks: ['popup'],
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    }),
    // background html模板 将js引入其中
    new HtmlWebpackPlugin({
      title: 'background',
      template: 'index.html',
      filename: 'background.html',
      inject: true,
      chunks: ['background'],
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联css
      }
    }),
    // 引入框架 dll
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: dllManifestOfVendorFrame
    }),
    // 引入ui dll
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: dllManifestOfVendorUI
    }),
    // 将dll引入html
    new AddAssetHtmlWebpackPlugin([
      {
        typeOfAsset: 'js',
        includeSourcemap: false,
        filepath: path.resolve(dirs.lib, '**/*.dll.js'),
        publicPath: '/js',
        outputPath: '/js'
      }
    ]),
    // 抽取样式
    extractSass,
    extractLess,
    extractCSS,
    // 复制静态资源
    new CopyWebpackPlugin([
      { from: '.assets', to: 'assets' },
      { from: 'manifest.json', to: 'manifest.json', flatten: true }
    ])
  ]
};
