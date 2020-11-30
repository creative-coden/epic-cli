const { spawn } = require('child_process');
const { promises: fsPromises } = require('fs');
const { resolve } = require('path');
const projectProperties = require('../modules');

module.exports = (function initializeNPMRepo() {
  const _npm = {
    completed: false,
    appSetup: null,
    project: [],
    appDirectories: [],
    projectProperties,
    initialized: false,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup) {
        case 'both':
          this.appDirectories = [].concat(
            {
              folder: this.appSetup.clientDirectory,
              setup: this.projectProperties[this.appSetup.frontend].packageJsonProperties,
            },
            {
              folder: this.appSetup.serverDirectory,
              setup: this.projectProperties[this.appSetup.backend].packageJsonProperties,
            },
          );
          return;
        case 'frontend':
          this.appDirectories = [].concat({
            folder: this.appSetup.clientDirectory,
            setup: this.projectProperties[this.appSetup.frontend].packageJsonProperties,
          });
          return;
        case 'backend':
          this.appDirectories = [].concat({
            folder: this.appSetup.serverDirectory,
            setup: this.projectProperties[this.appSetup.backend].packageJsonProperties,
          });
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    retrieveResults: function retrieveResults() {
      return this.appSetup;
    },
    addRunConfigToPackageJson: function addRunConfigToPackageJson(json, setup) {
      if (!setup.runCommands.length) return json;
      const keys = Object.keys(json);
      const runCommands = [].concat(keys, setup.runCommands);
      for (let property of runCommands) {
        if (!setup.runCommands.includes(property)) {
          continue;
        }
        json[property] = setup[property];
      }
      return json;
    },
    updatePackageScripts: async function updatePackageScripts() {
      for (let file of this.appDirectories) {
        try {
          const json = await fsPromises.readFile(resolve(`${file.folder}/package.json`), { encoding: 'utf-8' });
          const copy = Object.assign({}, JSON.parse(json));
          copy.scripts = file.setup.scripts;
          const runCommands = this.addRunConfigToPackageJson(copy, file.setup);
          await fsPromises.writeFile(`${file.folder}/package.json`, JSON.stringify(runCommands, undefined, 2), {
            encoding: 'utf-8',
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    runInitialization: function runInitialization() {
      this.appDirectories.forEach(function (obj) {
        const options = { shell: true, stdio: ['ignore', 'ignore', 'inherit'], cwd: obj.folder };
        const command = 'npm init -y';
        spawn(command, { ...options });
      });
    },
    isCompleted: function isCompleted() {
      return this.completed;
    },
    setCompleted: function setCompleted() {
      this.completed = true;
    },
  };
  return {
    initializeNPMRepo: async function initializeNPMRepo(args) {
      if (_npm.isCompleted()) return;
      _npm.set(args);
      _npm.runInitialization();
      const timer = setTimeout(function () {
        _npm.updatePackageScripts();
        clearTimeout(timer);
      }, 800);
      const results = _npm.retrieveResults();
      _npm.setCompleted();
      return results;
    },
  };
})();
