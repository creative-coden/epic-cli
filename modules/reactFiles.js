const createCypressJson = require('../templates/frontend/react/shared/config/cypress');
const createJestJSON = require('../templates/frontend/react/shared/config/jest');
const createNginxConf = require('../templates/frontend/react/shared/config/nginx.conf');

const createWebapckDev = require('../templates/frontend/react/shared/tooling/webpack.dev');
const createWebapckProd = require('../templates/frontend/react/shared/tooling/webpack.prod');
const createWebapckCommon = require('../templates/frontend/react/shared/tooling/webpack.common');
const createStyleMock = require('../templates/frontend/react/tests/mocks/styleMock');
const createHomeSpec = require('../templates/frontend/react/tests/components/HomeSpec');
const createHelmet = require('../templates/frontend/react/src/components/Helmet');
const createManifestFile = require('../templates/frontend/react/src/manifest');
const createHTMLFile = require('../templates/frontend/react/src/html');

const createTSConfig = require('../templates/frontend/react/tsconfig.js');
const createEsLintConfig = require('../templates/frontend/react/eslintrc');
const createEsLintIgnore = require('../templates/frontend/react/eslintignore');
const createGitignore = require('../templates/frontend/react/gitignore.js');
const createPrettier = require('../templates/frontend/react/prettierrc');
const createEnv = require('../templates/frontend/react/env');
const createEditorConfig = require('../templates/frontend/react/editorconfig');
const createDockerCompose = require('../templates/frontend/react/dockerCompose');
const createDockerIgonore = require('../templates/frontend/react/dockerIgnore');
const createDockerFile = require('../templates/frontend/react/docker');
const createPrettierIgnore = require('../templates/frontend/react/prettierIgnore');
const createCircleCIFile = require('../templates/frontend/react/circleci');
const createStyleLintFile = require('../templates/frontend/react/stylelint');
const createAppFile = require('../templates/frontend/react/src/app');
const createHome = require('../templates/frontend/react/src/components/home/home');
const createHomeEntryFile = require('../templates/frontend/react/src/components/home/index');
const createHomeCSS = require('../templates/frontend/react/src/components/home/homecss');

const reactFiles = [
  { directory: '.circleci/config.yml', file: createCircleCIFile },
  { directory: 'shared/config/cypress.json', file: createCypressJson },
  { directory: 'shared/config/jest.config.json', file: createJestJSON },
  { directory: 'shared/config/nginx.conf', file: createNginxConf },
  { directory: 'shared/tooling/webpack.common.js', file: createWebapckCommon },
  { directory: 'shared/tooling/webpack.dev.js', file: createWebapckDev },
  { directory: 'shared/tooling/webpack.prod.js', file: createWebapckProd },
  { directory: 'src/components/Helmet/index.tsx', file: createHelmet },

  { directory: 'tests/mocks/styleMock.js', file: createStyleMock },
  { directory: 'tests/components/Home.spec.tsx', file: createHomeSpec },
  { directory: 'src/components/Home/Home.tsx', file: createHome },
  { directory: 'src/components/Home/index.tsx', file: createHomeEntryFile },
  { directory: 'src/components/Home/home.css', file: createHomeCSS },
  { directory: 'src/index.tsx', file: createAppFile },
  { directory: 'src/index.html', file: createHTMLFile },
  { directory: 'src/manifest.webmanifest', file: createManifestFile },
  { directory: 'tsconfig.json', file: createTSConfig },
  { directory: '.eslintrc.json', file: createEsLintConfig },
  { directory: '.eslintignore', file: createEsLintIgnore },
  { directory: '.gitignore', file: createGitignore },
  { directory: '.prettierrc.json', file: createPrettier },
  { directory: '.env', file: createEnv },
  { directory: '.editorconfig', file: createEditorConfig },
  { directory: 'docker-compose.yml', file: createDockerCompose },
  { directory: '.prettierignore', file: createPrettierIgnore },
  { directory: '.stylelintrc.json', file: createStyleLintFile },
  { directory: '.dockerignore', file: createDockerIgonore },
  { directory: 'Dockerfile', file: createDockerFile },
];

exports.reactFiles = reactFiles;
