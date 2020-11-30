const createConfig = require('../templates/backend/fastify/server/config/app.js');
const createController = require('../templates/backend/fastify/server/controller/api.controller.js');
const uploadController = require('../templates/backend/fastify/server/controller/upload.controller.js');
const createRoutes = require('../templates/backend/fastify/server/routes/index.js');
const createServices = require('../templates/backend/fastify/server/services/api.services.js');
const uploadService = require('../templates/backend/fastify/server/services/upload.service.js');
const createServerIndexFile =  require('../templates/backend/fastify/server/index.js');
const createTSConfig =  require('../templates/backend/fastify/tsconfig.js');
const createEsLintConfig =  require('../templates/backend/fastify/eslintrc');
const createGitignore =  require('../templates/backend/fastify/gitignore.js');
const createPrettier =  require('../templates/backend/fastify/prettierrc');
const createEnv = require('../templates/backend/fastify/env');
const createNycConfig = require('../templates/backend/fastify/nyc.config.js');

const fastifyFiles = [
  { directory: 'server/config/app.ts', file: createConfig() },
  { directory: 'server/controller/customer.controller.ts', file: createController() },
  { directory: 'server/controller/upload.controller.ts', file: uploadController() },
  { directory: 'server/routes/index.ts', file: createRoutes() },
  { directory: 'server/services/customer.service.ts', file: createServices() },
  { directory: 'server/services/upload.service.ts', file: uploadService() },
  { directory: 'server/__tests__/fixtures/index.ts', file: uploadService() },
  { directory: 'server/__tests__/integration/index.ts', file: uploadService() },
  { directory: 'server/__tests__/unit/index.ts', file: createConfig() },
  { directory: 'index.ts', file: createServerIndexFile() },
  { directory: 'tsconfig.json', file: createTSConfig() },
  { directory: '.eslintrc', file: createEsLintConfig() },
  { directory: '.gitignore', file: createGitignore() },
  { directory: '.prettierrc', file: createPrettier() },
  { directory: '.env', file: createEnv() },
  { directory: 'nyc.config.js', file: createNycConfig() },
];

exports.fastifyFiles = fastifyFiles;