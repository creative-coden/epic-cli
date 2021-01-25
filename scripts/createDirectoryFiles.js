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
    deferExecution: function (sources, destinations, timeout) {
      new Promise(function (resolve, reject) {
        timeout = setTimeout(resolve, 800);
      });
    },
    copyFoldersOver: async function copyFoldersOver(appLayer) {
      if (this.appSetup.setup === appLayer) {
        const sources = this.projectProperties[this.appSetup[appLayer]].folderToCopy;
        const destinations = `${this.appSetup.clientDirectory}`;
        let index = sources.length - 1;

        let pauseCopy = setInterval(function () {
          const path = sources && sources[index] ? Object.keys(sources[index])[0] : null;

          if (!path) {
            clearInterval(pauseCopy);
            return;
          }
          
          spawn(`cp -R ${sources[index][path]} ${destinations}/${path}`, {
            shell: true,
            stdio: ['ignore', 'ignore', 'inherit'],
          });
          index--;
        }, 800);
      }
    },
    includeAppName: function includeAppName(path) {
      if (
        path.directory.toLowerCase().includes('helmet') ||
        path.directory.toLowerCase().includes('manifest') ||
        path.directory.toLowerCase().includes('dockerfile')
      ) {
        return path.file(this.appSetup.appName);
      }
      return path.file();
    },
    appendAppNameToEnvFile: async function appendAppNameToEnvFile(directory, appName, layer) {
      try {
        await fsPromises.appendFile(directory, `APP_NAME=${appName}_${layer.split('_')[1]}`);
      } catch (error) {
        console.error(error);
      }
    },
    modifyContentInFile: async function modifyContentInFile(nameOfFile, func) {
      try {
        for (let file of this.appDirectories) {
          const { directory } = file;
          if (!directory.includes(nameOfFile)) {
            continue;
          }
          const layer = directory.split('/').find(item => item.includes('service') || item.includes('client'));
          await func(directory, this.appSetup.appName, layer);
        }
      } catch (error) {
        console.error(error);
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
        await _files.modifyContentInFile('.env', _files.appendAppNameToEnvFile);
        await _files.copyFoldersOver('frontend');
        const results = _files.retrieveResults();
        _files.setCompleted();
        return results;
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
