module.exports = function(){
    return `const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    overlay: true,
    hot: true,
    stats: 'errors-only',
    contentBase: resolve(__dirname, './dist'),
    writeToDisk: true,
    compress: true,
    historyApiFallback: true,
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});   
`
}