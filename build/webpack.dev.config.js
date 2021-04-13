const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = merge(baseWebpackConfig , {
  entry : {
    main : './example/main.js'
  },
  output : {
    path : path.resolve(__dirname , '../example/dist'),
    filename : '[name].js',
    publicPath : ''
  },
  devtool : 'eval-source-map',
  devServer : {
    contentBase : path.resolve(__dirname , '../examples/dist'),
    clientLogLevel : 'warning',
    compress : true,
    port : 8080,
    host : 'localhost',
    open : false,
    // 禁止打印编译信息，使用friendly-errors-webpack-plugin所必须的设置
    quiet : true
  },
  resolve : {
    alias : {
      'vue' : 'vue/dist/vue.esm.js',
      '@example' : path.resolve(__dirname , '../example')
    },
    extensions : ['.js' , '.vue' , '.json' , '.md']
  },
  plugins : [
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template : './example/index.html',
      inject : true,
      filename : 'index.html'
    })
  ]
});