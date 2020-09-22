module.exports = (function setup() {
  const _private = {
    react: [],
    koa: [],
    userOptions: null,
    applicationLayer: [],
    get: function get() {
      return JSON.stringify(this.userOptions);
    },
    set: function set(options) {
      this.userOptions = options;
      if (!options.frontEnd.includes('N/A')) {
        this.applicationLayer.push(options.frontEnd.toLowerCase());
      }
      if (!options.backEnd.includes('N/A')) {
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
    initiateAppSetup: async function initiateAppSetup(layer) {
      return _private[layer].reduce(async function runInSequence(promiseChain, currentFunction) {
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
    facade: function facade(args) {
      try {
        _private.set(args);
        _private.run();
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
