const createConfig = require('../templates/backend/koa/server/config/app.js');
const createController = require('../templates/backend/koa/server/controller/api.controller.js');
const createRoutes = require('../templates/backend/koa/server/routes/index.js');
const createServices = require('../templates/backend/koa/server/services/api.services.js');
const createMiddleware = require('../templates/backend/koa/server/Middleware/cacheHandler.js');
const createServerIndexFile =  require('../templates/backend/koa/server/index.js');
const createEslint =  require('../templates/backend/koa/eslintrc.js');
const createGitignore =  require('../templates/backend/koa/gitignore.js');
const createPrettier =  require('../templates/backend/koa/prettierrc');

const koaFiles = [
  { directory: 'server/config/app.mjs', file: createConfig() },
  { directory: 'server/controller/customer.controller.mjs', file: createController() },
  { directory: 'server/routes/index.mjs', file: createRoutes() },
  { directory: 'server/services/customer.service.mjs', file: createServices() },
  { directory: 'server/Middleware/cacheHandler.mjs', file: createMiddleware() },
  { directory: 'server/tests/fixtures/index.mjs', file: createMiddleware() },
  { directory: 'server/tests/integration/index.mjs', file: createMiddleware() },
  { directory: 'server/tests/unit/index.mjs', file: createConfig() },
  { directory: 'index.mjs', file: createServerIndexFile() },
  { directory: '.eslintrc', file: createEslint() },
  { directory: '.gitignore', file: createGitignore() },
  { directory: '.prettierrc', file: createPrettier() },
];

exports.koaFiles = koaFiles;