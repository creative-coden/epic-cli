module.exports = function(){
    return `const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  profile: true,
  performance: {
    hints: 'error',
    maxEntrypointSize: 500000,
  },
  plugins: [
    new BundleAnalyzerPlugin({ 
      analyzerMode: 'static', 
      reportFilename: '../artifacts/bundleAnalyzer.html' 
    }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      seed: {
        name: 'Assets Manifest file',
      },
    }),
  ],
});  
`
}