const { spawn } = require('child_process');
const packages = require('../modules/index');

module.exports = (function packageDependencies() {
  const _package = {
    appSetup: null,
    project: [],
    packages,
    complete: false,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.project = [].concat(
            {
              folder: this.appSetup.clientDirectory,
              install: this.packages[this.appSetup.frontEnd.toLowerCase()][this.appSetup.frontEnd.toLowerCase()],
            },
            {
              folder: this.appSetup.serverDirectory,
              install: this.packages[this.appSetup.backEnd.toLowerCase()][this.appSetup.backEnd.toLowerCase()],
            },
          );
          return;
        case 'frontend':
          this.project = [].concat({
            folder: this.appSetup.clientDirectory,
            install: this.packages[this.appSetup.frontEnd.toLowerCase()][this.appSetup.frontEnd.toLowerCase()],
          });
          return;
        case 'backend':
          this.project = [].concat({
            folder: this.appSetup.serverDirectory,
            install: this.packages[this.appSetup.backEnd.toLowerCase()][this.appSetup.backEnd.toLowerCase()],
          });
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    installPackages: function installPackages() {
      try {
        for (let npm of this.project) {
          const options = {
            shell: true,
            stdio: ['ignore', 'inherit', 'inherit'],
            cwd: npm.folder,
          };
          spawn(`npm install ${npm.install.dependencies.join(' ')} && npm i -D ${npm.install.devDependencies.join(' ')}`, {
            ...options,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    retrieveResults: function retrieveResults() {
      return this.appSetup;
    },
    isComplete: function isComplete() {
      return this.complete;
    },
    setComplete: function setComplete() {
      this.complete = true;
    },
  };
  return {
    installPackageDependencies: async function installPackageDependencies(args) {
      if (_package.isComplete()) return;
      try {
        _package.set(args);
        _package.installPackages();
        _package.setComplete();
        // const results = directory.retrieveResults();
        // console.log(results, 'line 74');
        // return results;
      } catch (error) {
        console.error(error);
      }
    },
  };
})();
