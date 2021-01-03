module.exports = function(){
    return `const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const stripAnsi = require('strip-ansi');
const webpackConfig = require('../tooling/webpack.dev');

const bundler = webpack(webpackConfig);

bundler.plugin('done', stats => {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browserSync.sockets.emit('fullscreen:message', {
      title: 'Webpack Error:',
      body: stripAnsi(stats.toString()),
      timeout: 100000,
    });
  }
  browserSync.reload();
});

browserSync.init({
  server: 'sync',
  open: false,
  logFileChanges: false,
  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    }),
  ],
  plugins: ['bs-fullscreen-message'],
  files: ['src/**/*'],
});
`
}