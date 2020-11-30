const { promises: fsPromises } = require('fs');
const projectProperties = require('../modules');

module.exports = (function fileSetup() {
  const _files = {
    completed: false,
    appSetup: null,
    appDirectories: [],
    projectProperties,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup) {
        case 'both':
          this.appDirectories = [].concat(
            this.projectProperties[this.appSetup.frontend].files,
             this.projectProperties[this.appSetup.backend].files,
          );
          return;
        case 'frontend':
          this.appDirectories = [].concat(this.projectProperties[this.appSetup.frontend].files);
          return;
        case 'backend':
          this.appDirectories = [].concat( this.projectProperties[this.appSetup.backend].files);
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
    isCompleted: function isCompleted() {
      return this.completed;
    },
    setCompleted: function setCompleted() {
      this.completed = true;
    },
  };
  return {
    createDirectoryFiles: async function createDirectoryFiles(args) {
      if (_files.isCompleted()) return;
      try {
        _files.set(args);
        _files.prependPath();
        await _files.writeToFiles();
        const results = _files.retrieveResults();
        _files.setCompleted();
        return results;
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
