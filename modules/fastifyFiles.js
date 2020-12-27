const createAppConfig = require('../templates/backend/fastify/server/config/app.js');
const createController = require('../templates/backend/fastify/server/controller/api.controller.js');
const uploadController = require('../templates/backend/fastify/server/controller/upload.controller.js');
const createParamsFile = require('../templates/backend/fastify/server/schemas/params.js');
const createRequestFile = require('../templates/backend/fastify/server/schemas/request.js');
const createResponseFile = require('../templates/backend/fastify/server/schemas/response.js');
const createSuccessFile = require('../templates/backend/fastify/server/schemas/success.js');
const createTypesFile = require('../templates/backend/fastify/server/types/types.js');
const createRoutes = require('../templates/backend/fastify/server/routes/index.js');
const createServices = require('../templates/backend/fastify/server/services/api.services.js');
const uploadService = require('../templates/backend/fastify/server/services/upload.service.js');
const createServerIndexFile = require('../templates/backend/fastify/server/index.js');
const createTSConfig = require('../templates/backend/fastify/tsconfig.js');
const createEsLintConfig = require('../templates/backend/fastify/eslintrc');
const createEsLintIgnore = require('../templates/backend/fastify/eslintignore');
const createGitignore = require('../templates/backend/fastify/gitignore.js');
const createPrettier = require('../templates/backend/fastify/prettierrc');
const createEnv = require('../templates/backend/fastify/env');
const createNycConfig = require('../templates/backend/fastify/nyc.config.js');
const createEditorConfig = require('../templates/backend/fastify/editorconfig');
const createConfig = require('../templates/backend/fastify/server/config/config');
const createIntegrationFile = require('../templates/backend/fastify/server/tests/integration/integration.js');
const createSupportSetup = require('../templates/backend/fastify/server/tests/support/setup.js');
const createDeployScript = require('../templates/backend/fastify/deploy');
const createDockerCompose = require('../templates/backend/fastify/dockerCompose');
const createPrettierIgnore = require('../templates/backend/fastify/prettierIgnore');
const createTravisFile = require('../templates/backend/fastify/travis');

const fastifyFiles = [
  { directory: 'server/config/app.ts', file: createAppConfig },
  { directory: 'server/config/config.ts', file: createConfig },
  { directory: 'server/controller/customer.controller.ts', file: createController },
  { directory: 'server/controller/upload.controller.ts', file: uploadController },
  { directory: 'server/schemas/params.json', file: createParamsFile },
  { directory: 'server/schemas/request.json', file: createRequestFile },
  { directory: 'server/schemas/response.json', file: createResponseFile },
  { directory: 'server/schemas/success.json', file: createSuccessFile },
  { directory: 'server/types/index.ts', file: createTypesFile },
  { directory: 'server/routes/index.ts', file: createRoutes },
  { directory: 'server/services/customer.service.ts', file: createServices },
  { directory: 'server/services/upload.service.ts', file: uploadService },
  { directory: 'server/__tests__/fixtures/index.ts', file: uploadService },
  { directory: 'server/__tests__/integration/index.ts', file: createIntegrationFile },
  { directory: 'server/__tests__/support/setup.ts', file: createSupportSetup },
  { directory: 'server/__tests__/unit/index.ts', file: createConfig },
  { directory: 'index.ts', file: createServerIndexFile },
  { directory: 'tsconfig.json', file: createTSConfig },
  { directory: '.eslintrc.json', file: createEsLintConfig },
  { directory: '.eslintignore', file: createEsLintIgnore },
  { directory: '.gitignore', file: createGitignore },
  { directory: '.prettierrc.json', file: createPrettier },
  { directory: '.env', file: createEnv },
  { directory: '.editorconfig', file: createEditorConfig },
  { directory: '.nycrc.json', file: createNycConfig },
  { directory: 'deploy.sh', file: createDeployScript },
  { directory: 'docker-compose.yml', file: createDockerCompose },
  { directory: '.prettierignore', file: createPrettierIgnore },
  { directory: '.travis.yml', file: createTravisFile },
];

exports.fastifyFiles = fastifyFiles;
