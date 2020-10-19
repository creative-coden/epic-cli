const { spawn } = require('child_process');
const { promises: fsPromises } = require('fs');
const { resolve } = require('path');

const koa = { scripts: { start: 'nodemon --es-module-specifier-resolution=node --experimental-modules --no-warnings ./index.mjs', test: 'npm start' } };
const react = { scripts: { start: 'nodemon ./server.js', test: 'npm start' } };

module.exports = (function initializeNPMRepo() {
  const _npm = {
    completed: false,
    appSetup: null,
    koa,
    react,
    project: [],
    appDirectories: [],
    initialized: false,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.appDirectories = [].concat(
            {
              folder: this.appSetup.clientDirectory,
              setup: this[this.appSetup.frontEnd.toLowerCase()],
            },
            {
              folder: this.appSetup.serverDirectory,
              setup: this[this.appSetup.backEnd.toLowerCase()],
            },
          );
          return;
        case 'frontend':
          this.appDirectories = [].concat({
            folder: this.appSetup.clientDirectory,
            setup: this[this.appSetup.frontEnd.toLowerCase()],
          });
          return;
        case 'backend':
          this.appDirectories = [].concat({
            folder: this.appSetup.serverDirectory,
            setup: this[this.appSetup.backEnd.toLowerCase()],
          });
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    retrieveResults: function retrieveResults() {
      return this.appSetup;
    },
    updatePackageScripts: async function updatePackageScripts() {
      for (let file of this.appDirectories) {
        try {
          const json = await fsPromises.readFile(resolve(`${file.folder}/package.json`), { encoding: 'utf-8' });
          const copy = Object.assign({}, JSON.parse(json));
          copy.scripts = file.setup.scripts;
          await fsPromises.writeFile(`${file.folder}/package.json`, JSON.stringify(copy, undefined, 2), {
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
