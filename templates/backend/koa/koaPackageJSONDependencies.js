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
      'multer',
      'winston',
      'morgan',
      'redis',
      'dotenv',
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
