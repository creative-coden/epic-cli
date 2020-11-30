const { createDirectory } = require('./createDirectory');
const { createDirectoryFiles } = require('./createDirectoryFiles');
const { initializeGitRepo } = require('./initalizeGitRepo');
const { initializeNPMRepo } = require('./initializeNPMRepo');
const { installPackageDependencies } = require('./installPackageDependencies');

function presetup() {
  return [].concat(createDirectory, initializeGitRepo, createDirectoryFiles, initializeNPMRepo, installPackageDependencies);
}

module.exports = (function setup() {
  const _config = {
    projectSetupFunctions: presetup(),
    applicationLayer: [],
    appSetup: null,
    get: function get() {
      return JSON.stringify(this.appSetup);
    },
    set: function set(options) {
      options.appName = options.appName.toLowerCase();
      options.setup = options.setup.toLowerCase();
      this.appSetup = Object.assign({}, options);

      switch (this.appSetup.setup) {
        case 'both': {
          this.appSetup.frontend = options.frontend.toLowerCase();
          this.appSetup.backend = options.backend.toLowerCase();
          this.applicationLayer = [].concat(this.appSetup.frontend, this.appSetup.backend);
          return;
        }
        case 'frontend': {
          this.appSetup.frontend = options.frontend.toLowerCase();
          this.applicationLayer = [].concat(this.appSetup.frontend);
          return;
        }
        case 'backend': {
          this.appSetup.backend = options.backend.toLowerCase();
          this.applicationLayer = [].concat(this.appSetup.backend);
          return;
        }
      }
    },
    run: async function run() {
      for (let i = 0; i < this.applicationLayer.length; i++) {
        try {
          await this.initiateAppSetup();
        } catch (error) {
          console.error(error);
        }
      }
    },
    initiateAppSetup: async function initiateAppSetup() {
      return this.projectSetupFunctions.reduce(async function runInSequence(promiseChain, currentFunction) {
        try {
          const result = await promiseChain;
          return currentFunction(result);
        } catch (error) {
          console.error(error);
        }
      }, Promise.resolve(this.appSetup));
    },
  };
  return {
    runAppSetup: function runAppSetup(args) {
      try {
        _config.set(args);
        _config.run();
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
