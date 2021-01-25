const {
  directories: fastifyDirectories,
  packageJsonProperties: fastifyPackage,
  projectDependencies: fastifyDependencies,
} = require('./fastifySetup');
const {
  directories: reactDirectories,
  packageJsonProperties: reactPackage,
  projectDependencies: reactDependencies,
} = require('./reactSetup');
const { fastifyFiles } = require('./fastifyFiles');
const { reactFiles } = require('./reactFiles');
const { resolve } = require('path');

module.exports = {
  fastify: {
    files: fastifyFiles,
    directories: fastifyDirectories,
    packageJsonProperties: fastifyPackage,
    projectDependencies: fastifyDependencies,
    folderToCopy: [],
  },
  react: {
    files: reactFiles,
    directories: reactDirectories,
    packageJsonProperties: reactPackage,
    projectDependencies: reactDependencies,
    folderToCopy: [
      { shared: resolve(__dirname, '../templates/frontend/react/shared/assets') },
      { cypress: resolve(__dirname, '../templates/frontend/react/cypress') },
    ],
  },
};
