const { promises: fsPromises } = require('fs');
const { resolve } = require('path');
const koa = [
  'server/config',
  'server/controller',
  'server/routes',
  'server/services',
  'server/utils',
  'server/tests/fixtures',
  'server/tests/integration',
  'server/tests/unit',
];

module.exports = (function directorySetup() {
  const directory = {
    appSetup: null,
    react: [],
    appDirectories: [],
    koa,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      const directoryPath = resolve(__dirname, `../../${this.appSetup.appName}`);
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.appSetup.clientDirectory = resolve(__dirname, `${directoryPath}/${this.appSetup.appName}_client`);
          this.appSetup.serverDirectory = resolve(__dirname, `${directoryPath}/${this.appSetup.appName}_service`);
          this.appDirectories.push(this.appSetup.clientDirectory, this.appSetup.serverDirectory, ...this.appendPath());
          return;
        case 'frontend':
          this.appSetup.clientDirectory = resolve(__dirname, `${directoryPath}/${this.appSetup.appName}_client`);
          this.appDirectories.push(this.appSetup.clientDirectory, ...this.appendPath());
          return;
        case 'backend':
          this.appSetup.serverDirectory = resolve(__dirname, `${directoryPath}/${this.appSetup.appName}_service`);
          this.appDirectories.push(this.appSetup.serverDirectory, ...this.appendPath());
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    useDirectory: function useDirectory(filePath) {
      if (filePath.split('/').includes('server')) {
        return this.appSetup.serverDirectory;
      }
      return this.appSetup.clientDirectory;
    },
    appendPath: function appendPath() {
      const array =
        this.appSetup.setup === 'both'
          ? [].concat(this[this.appSetup.frontEnd.toLowerCase()], this[this.appSetup.backEnd.toLowerCase()])
          : this[this.appSetup[this.appSetup.setup].toLowerCase()];
      return array.reduce(
        function (acc, filePath) {
          const precedingPath = this.useDirectory(filePath);
          acc.push(precedingPath + '/' + filePath);
          return acc;
        }.bind(this),
        [],
      );
    },
    makeDirectories: async function makeDirectories() {
      try {
        for (let path of this.appDirectories) {
          await fsPromises.mkdir(path, { recursive: true });
        }
      } catch (error) {
        console.error(error);
      }
    },
    retrieveResults: function retrieveResults() {
      return this.appSetup;
    },
  };
  return {
    createDirectory: async function createDirectory(args) {
      try {
        directory.set(args);
        await directory.makeDirectories();
        const results = directory.retrieveResults();
        return results;
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
