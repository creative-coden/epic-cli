module.exports = function(){
    return `const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ImageminWebP = require('imagemin-webp');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const postcssPresetEnv = require('postcss-preset-env');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  stats: {
    children: false,
  },
  context: resolve(__dirname, '../../src'),
  entry: {
    app: { import: './index.tsx' },
    // home: {
    //   import: './components/Home/index.tsx'
    // },
  },
  resolve: {
    fallback: { path: require.resolve('path-browserify') },
    extensions: ['.tsx', '.ts', '.js', '.css', '.json', '.ico'],
    alias: {
      '@components': resolve(__dirname, '../../src/components'),
      '@assets': resolve(__dirname, '../../shared/assets'),
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, '../../dist'),
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[/]node_modules[/]/,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv({ browsers: 'last 2 versions' })],
              },
            },
          },
        ],
      },
      {
        test: /.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../shared/assets/images',
          to: './assets/images',
        },
        {
          from: '../shared/assets/icons',
          to: './assets/icons',
        },
        {
          from: '../src/manifest.webmanifest',
          to: './',
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      exclude: [/.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [
        {
          urlPattern: /.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['vendors', 'app'],
      chunksSortMode: 'manual',
    }),
    new ImageminPlugin({
      plugins: [ImageminWebP({ quality: 50 })],
    }),
  ],
};  
`
}