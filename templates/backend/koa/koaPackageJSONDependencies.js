module.exports = {
  koa: {
    dependencies: [
      'koa',
      'koa-bodyparser',
      'koa-compress',
      'koa-helmet',
      'koa-logger',
      'koa-respond',
      'koa-router',
      '@koa/multer',
      'morgan',
      'redis',
      'clinic'
    ],
    devDependencies: [
      'eslint',
      'eslint-config-important-stuff',
      'eslint-config-prettier',
      'nodemon',
      'prettier',
      'mocha',
      'chai',
    ],
  },
};
