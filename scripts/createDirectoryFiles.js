const { spawn } = require('child_process');
const { promises: fsPromises } = require('fs');
const projectProperties = require('../modules');

module.exports = (function fileSetup() {
  const _files = {
    completed: false,
    appSetup: null,
    appDirectories: [],
    projectProperties,
    context: '',
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
          this.appDirectories = [].concat(this.projectProperties[this.appSetup.backend].files);
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
    copyFoldersOver: async function copyFoldersOver() {
      if (this.appSetup.setup === 'frontend') {
        const source = this.projectProperties[this.appSetup.frontend].folderToCopy;
        const destination = `${this.appSetup.clientDirectory}/shared`;
        spawn(`cp -R ${source} ${destination}`, {
          shell: true,
          stdio: ['ignore', 'ignore', 'inherit'],
        });
      }
    },
    includeAppName: function includeAppName(path) {
      if (path.directory.toLowerCase().includes('helmet') || path.directory.toLowerCase().includes('manifest')) {
        return path.file(this.appSetup.appName);
      }
      return path.file();
    },
    appendToEnvFile: async function appendToEnvFile() {
      for (let file of this.appDirectories) {
        const { directory } = file;
        if (!directory.includes('.env')) {
          continue;
        }
        const layer = directory
          .slice()
          .split('/')
          .find(item => item.includes('service') || item.includes('client'));
        await fsPromises.appendFile(directory, `APP_NAME = ${this.appSetup.appName}_${layer.split('_')[1]}`);
      }
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
          if (path.directory.includes('deploy.sh')) {
            await fsPromises.writeFile(path.directory, path.file(), { mode: 0o777 });
          }
          await fsPromises.writeFile(path.directory, this.includeAppName(path));
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
        await _files.appendToEnvFile();
        await _files.copyFoldersOver();
        const results = _files.retrieveResults();
        _files.setCompleted();
        return results;
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
