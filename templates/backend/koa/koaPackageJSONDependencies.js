module.exports = {
  koa: {
    dependencies: [
      'body-parser',
      'compression',
      'koa',
      'koa-bodyparser',
      'koa-compress',
      'koa-helmet',
      'koa-logger',
      'koa-respond',
      'koa-router',
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
