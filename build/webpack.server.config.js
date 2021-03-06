const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

const isProd = process.env.NODE_ENV === 'production'
module.exports = merge(base, {
  target: 'node',
  entry: './src/server.entry.js',
  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: false, // isProd ? config.build.productionSourceMap : config.dev.cssSourceMap,
      extract: isProd
    })
  },
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
