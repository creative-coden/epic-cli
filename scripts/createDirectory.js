const { promises: fsPromises } = require('fs');
const { resolve } = require('path');
const projectProperties = require('../modules');

module.exports = (function directorySetup() {
  const directory = {
    appSetup: null,
    appDirectories: [],
    projectProperties,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      const directoryPath = resolve(this.appSetup.rootDirectory, `${this.appSetup.appName}`);
      
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.appSetup.clientDirectory = resolve(directoryPath, `${this.appSetup.appName}_client`);
          this.appSetup.serverDirectory = resolve(directoryPath, `${this.appSetup.appName}_service`);
          this.appDirectories = [].concat(this.appSetup.clientDirectory, this.appSetup.serverDirectory, this.appendPath());
          return;
        case 'frontend':
          this.appSetup.clientDirectory = resolve(directoryPath, `${this.appSetup.appName}_client`);
          this.appDirectories = [].concat(this.appSetup.clientDirectory, this.appendPath());
          return;
        case 'backend':
          this.appSetup.serverDirectory = resolve(directoryPath, `${this.appSetup.appName}_service`);
          this.appDirectories = [].concat(this.appSetup.serverDirectory, this.appendPath());
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
          ? [].concat(this.projectProperties[this.appSetup.frontend].directories, this.projectProperties[this.appSetup.backend].directories)
          : this.appSetup.setup === 'frontend'
          ? this.projectProperties[this.appSetup.frontend].directories
          : this.projectProperties[this.appSetup.backend].directories;
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
