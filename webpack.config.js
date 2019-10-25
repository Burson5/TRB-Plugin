const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const config =
    argv && argv.hot
      ? require('./webpack/webpack.dev.conf')
      : require('./webpack/webpack.prod.conf');

  if (config && config.plugins && Array.isArray(config.plugins)) {
    const API_ENV = env || (argv && argv.host ? 'dev' : 'production');

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.API_ENV': JSON.stringify(API_ENV), // 这里不需要去定义 process.env.NODE_ENV，交给 CLI -p 和 webpack mode 去自动设置
        'process.env.USE_LOCAL': JSON.stringify(argv.uselocal), // api环境用自己配置的，不用客户端传来的，便于调试各个环境
        'process.env.LOG': !!argv.log // 可以配置日志的显示与否
      })
    );

    if (argv && argv.anal) {
      // --anal=1 输出包的体积分析
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerPort: 8088,
          openAnalyzer: false
        })
      );
    }
  }

  return config;
};
