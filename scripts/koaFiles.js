const createConfig = require('../templates/backend/koa/server/config/app.js');
const createController = require('../templates/backend/koa/server/controller/api.controller.js');
const uploadController = require('../templates/backend/koa/server/controller/upload.controller.js');
const createRoutes = require('../templates/backend/koa/server/routes/index.js');
const createServices = require('../templates/backend/koa/server/services/api.services.js');
const uploadService = require('../templates/backend/koa/server/services/upload.service.js');
const createMiddleware = require('../templates/backend/koa/server/middleware/cacheHandler.js');
const createServerIndexFile =  require('../templates/backend/koa/server/index.js');
const createTSConfig =  require('../templates/backend/koa/tsconfig.js');
const createEsLintConfig =  require('../templates/backend/koa/eslintrc');
const createGitignore =  require('../templates/backend/koa/gitignore.js');
const createPrettier =  require('../templates/backend/koa/prettierrc');
const createLogger = require('../templates/backend/koa/server/libs/logger');
const createEnv = require('../templates/backend/koa/env');

const koaFiles = [
  { directory: 'server/config/app.ts', file: createConfig() },
  { directory: 'server/controller/customer.controller.ts', file: createController() },
  { directory: 'server/controller/upload.controller.ts', file: uploadController() },
  { directory: 'server/routes/index.ts', file: createRoutes() },
  { directory: 'server/services/customer.service.ts', file: createServices() },
  { directory: 'server/services/upload.service.ts', file: uploadService() },
  { directory: 'server/middleware/cacheHandler.ts', file: createMiddleware() },
  { directory: 'server/libs/logger.ts', file: createLogger() },
  { directory: 'server/tests/fixtures/index.ts', file: createMiddleware() },
  { directory: 'server/tests/integration/index.ts', file: createMiddleware() },
  { directory: 'server/tests/unit/index.ts', file: createConfig() },
  { directory: 'index.ts', file: createServerIndexFile() },
  { directory: 'tsconfig.json', file: createTSConfig() },
  { directory: '.eslintrc', file: createEsLintConfig() },
  { directory: '.gitignore', file: createGitignore() },
  { directory: '.prettierrc', file: createPrettier() },
  { directory: '.env', file: createEnv() },
];

exports.koaFiles = koaFiles;