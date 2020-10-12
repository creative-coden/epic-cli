const { promises: fsPromises } = require('fs');
const { resolve } = require('path');
const { koaFiles } = require('./koaFiles');

module.exports = (function fileSetup() {
  const _files = {
    appSetup: null,
    react: [],
    appDirectories: [],
    koa: koaFiles,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.appDirectories.push(
            ...this[this.appSetup.frontEnd.toLowerCase()],
            ...this[this.appSetup.backEnd.toLowerCase()],
          );
          return;
        case 'frontend':
          this.appDirectories.push(...this[this.appSetup.frontEnd.toLowerCase()]);
          return;
        case 'backend':
          this.appDirectories.push(...this[this.appSetup.backEnd.toLowerCase()]);
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    useDirectory: function useDirectory(context) {
      if (context === 'server') {
        return this.appSetup.serverDirectory;
      }
      return this.appSetup.clientDirectory;
    },
    prependPath: function prependPath() {
      let context = '';
      this.appDirectories.forEach(
        function (path, index) {
          if (!path.directory.includes('server') && !path.directory.includes('client')) {
            context = context;
            const filePath = this.useDirectory(context);
            this.appDirectories[index].directory = filePath + '/' + path.directory;
            return;
          }
          if (path.directory.split('/').includes('server')) {
            context = 'server';
            const filePath = this.useDirectory(context);
            this.appDirectories[index].directory = filePath + '/' + path.directory;
            return;
          }
          if (path.directory.split('/').includes('client')) {
            context = 'client';
            const filePath = this.useDirectory(context);
            this.appDirectories[index].directory = filePath + '/' + path.directory;
            return;
          }
        }.bind(this),
      );
    },
    writeToFiles: async function writeToFiles() {
      try {
        for (let path of this.appDirectories) {
          await fsPromises.writeFile(path.directory, path.file);
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
    createDirectoryFiles: async function createDirectoryFiles(args) {
      try {
        _files.set(args);
        _files.prependPath();
        await _files.writeToFiles();
        // const results = _files.retrieveResults();
        // return results;
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
