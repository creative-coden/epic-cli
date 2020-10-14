const { createDirectory } = require('./createDirectory');
const { createDirectoryFiles } = require('./createDirectoryFiles');
const { initializeGitRepo } = require('./initalizeGitRepo');
const { initializeNPMRepo } = require('./initializeNPMRepo');
function presetup() {
  return [].concat(createDirectory, initializeGitRepo, createDirectoryFiles, initializeNPMRepo, [...arguments]);
}
module.exports = (function setup() {
  const _config = {
    react: presetup(),
    koa: presetup(),
    userOptions: null,
    applicationLayer: [],
    get: function get() {
      return JSON.stringify(this.userOptions);
    },
    set: function set(options) {
      this.userOptions = options;
      if (options.frontEnd) {
        this.applicationLayer.push(options.frontEnd.toLowerCase());
      }
      if (options.backEnd) {
        this.applicationLayer.push(options.backEnd.toLowerCase());
      }
    },
    run: async function run() {
      for (let app of this.applicationLayer) {
        try {
          await this.initiateAppSetup(app);
        } catch (error) {
          console.error(error);
        }
      }
    },
    initiateAppSetup: async function initiateAppSetup(framework) {
      return _config[framework].reduce(async function runInSequence(promiseChain, currentFunction) {
        try {
          const result = await promiseChain;
          return currentFunction(result);
        } catch (error) {
          console.error(error);
        }
      }, Promise.resolve(this.userOptions));
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
