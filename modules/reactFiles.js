const createCypressJson = require('../templates/frontend/react/shared/config/cypress');
const createCypressUnitJson = require('../templates/frontend/react/shared/config/cypres.unit');
const createDefinitionFile = require('../templates/frontend/react/cypress/integration/definitions/definition');
const createFeatureFile = require('../templates/frontend/react/cypress/integration/features/feature');
const createStub = require('../templates/frontend/react/cypress/fixtures/stub');
const createPlugin = require('../templates/frontend/react/cypress/plugins/plugins');
const createSupport = require('../templates/frontend/react/cypress/support/support');

const createBrowserSyncFile = require('../templates/frontend/react/shared/tooling/browserConfig');
const createWebapckDev = require('../templates/frontend/react/shared/tooling/webpack.dev');
const createWebapckProd = require('../templates/frontend/react/shared/tooling/webpack.prod');
const createWebapckCommon = require('../templates/frontend/react/shared/tooling/webpack.common');
const createComponent = require('../templates/frontend/react/src/components/TestSpec/component');
const createSpec = require('../templates/frontend/react/src/components/TestSpec/spec');
const createHelmet = require('../templates/frontend/react/src/components/Helmet');
const createManifestFile = require('../templates/frontend/react/src/manifest');
const createHTMLFile = require('../templates/frontend/react/src/html');

const createTSConfig = require('../templates/frontend/react/tsconfig.js');
const createEsLintConfig = require('../templates/frontend/react/eslintrc');
const createNycFile = require('../templates/frontend/react/nyc.config');
const createEsLintIgnore = require('../templates/frontend/react/eslintignore');
const createGitignore = require('../templates/frontend/react/gitignore.js');
const createPrettier = require('../templates/frontend/react/prettierrc');
const createEnv = require('../templates/frontend/react/env');
const createEditorConfig = require('../templates/frontend/react/editorconfig');
const createDeployScript = require('../templates/frontend/react/deploy');
const createDockerCompose = require('../templates/frontend/react/dockerCompose');
const createPrettierIgnore = require('../templates/frontend/react/prettierIgnore');
const createTravisFile = require('../templates/frontend/react/travis');
const createStyleLintFile = require('../templates/frontend/react/stylelint');
const createAppFile = require('../templates/frontend/react/src/app');
const createHome = require('../templates/frontend/react/src/components/home/home');
const createHomeEntryFile = require('../templates/frontend/react/src/components/home/index');
const createHomeCSS = require('../templates/frontend/react/src/components/home/homecss');

const reactFiles = [
  { directory: 'shared/config/cypress.json', file: createCypressJson },
  { directory: 'shared/config/cypress-unit.json', file: createCypressUnitJson },
  { directory: 'cypress/integration/definitions/definitions.js', file: createDefinitionFile },
  { directory: 'cypress/integration/features/feature.feature', file: createFeatureFile },
  { directory: 'cypress/support/index.js', file: createSupport },
  { directory: 'cypress/plugins/index.js', file: createPlugin },
  { directory: 'cypress/fixtures/stub.json', file: createStub },
  { directory: 'shared/tooling/browserSync.js', file: createBrowserSyncFile },
  { directory: 'shared/tooling/webpack.common.js', file: createWebapckCommon },
  { directory: 'shared/tooling/webpack.dev.js', file: createWebapckDev },
  { directory: 'shared/tooling/webpack.prod.js', file: createWebapckProd },
  { directory: 'src/components/Greetings/Greetings.spec.tsx', file: createComponent },
  { directory: 'src/components/Greetings/Greetings.tsx', file: createSpec },
  { directory: 'src/components/Helmet/index.tsx', file: createHelmet },

  { directory: 'src/components/Home/Home.tsx', file: createHome },
  { directory: 'src/components/Home/index.tsx', file: createHomeEntryFile },
  { directory: 'src/components/Home/home.css', file: createHomeCSS },
  { directory: 'src/index.tsx', file: createAppFile },
  { directory: 'src/index.html', file: createHTMLFile },
  { directory: 'src/manifest.webmanifest', file: createManifestFile },
  { directory: 'tsconfig.json', file: createTSConfig },
  { directory: '.nycrc.json', file: createNycFile },
  { directory: '.eslintrc.json', file: createEsLintConfig },
  { directory: '.eslintignore', file: createEsLintIgnore },
  { directory: '.gitignore', file: createGitignore },
  { directory: '.prettierrc.json', file: createPrettier },
  { directory: '.env', file: createEnv },
  { directory: '.editorconfig', file: createEditorConfig },
  { directory: 'deploy.sh', file: createDeployScript },
  { directory: 'docker-compose.yml', file: createDockerCompose },
  { directory: '.prettierignore', file: createPrettierIgnore },
  { directory: '.travis.yml', file: createTravisFile },
  { directory: '.stylelintrc.json', file: createStyleLintFile },
];

exports.reactFiles = reactFiles;
