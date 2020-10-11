module.exports = {
  koa: {
    dependencies: [
      'body-parser',
      'compression',
      'env-cmd',
      'koa',
      'koa-bodyparser',
      'koa-compress',
      'koa-helmet',
      'koa-logger',
      'koa-respond',
      'koa-router',
      'morgan',
      'redis',
    ],
    devDependencies: ['eslint', 'eslint-config-important-stuff', 'eslint-config-prettier', 'nodemon', 'prettier'],
  },
};
