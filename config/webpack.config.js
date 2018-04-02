const path = require('path')
const paths = require('./paths')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const resolve = dir => path.resolve(__dirname, '../src', dir)

module.exports = {
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.less'],
    alias: {
      'react-native': 'react-native-web',
      '@': resolve('./'),
      actions: resolve('./actions')
    }
  },
  module: {
    strictExportPresence: true,
    rules: [{
      test: /\.(js|jsx|mjs)$/,
      enforce: 'pre',
      use: [{
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint')
        },
        loader: require.resolve('eslint-loader')
      }],
      include: paths.appSrc
    }, {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.(js|jsx|mjs)$/,
      include: paths.appSrc,
      loader: require.resolve('babel-loader'),
      options: {
        compact: true
      }
    }, {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
    }]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
