const { spawn } = require('child_process');
const { promisify } = require('util');
const spawnPromise = promisify(spawn);

module.exports = (function initializeGitRepo() {
  const _git = {
    appSetup: null,
    appDirectories: [],
    gitRepos: [],
    initialized: false,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.appDirectories = [].concat(this.appSetup.clientDirectory, this.appSetup.serverDirectory);
          this.gitRepos = [].concat(
            { url: this.appSetup.gitHubFrontEndUrl, folder: this.appSetup.clientDirectory },
            { url: this.appSetup.gitHubBackEndUrl, folder: this.appSetup.serverDirectory },
          );
          return;
        case 'frontend':
          this.appDirectories = [].concat(this.appSetup.clientDirectory);
          this.gitRepos = [].concat({ url: this.appSetup.gitHubFrontEndUrl, folder: this.appSetup.clientDirectory });
          return;
        case 'backend':
          this.appDirectories.push(this.appSetup.serverDirectory);
          this.gitRepos = [].concat({ url: this.appSetup.gitHubBackEndUrl, folder: this.appSetup.serverDirectory });
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    retrieveResults: function retrieveResults() {
      return this.appSetup;
    },
    runInitialization: function runInitialization() {
      if (!this.initialized) {
        this.gitRepos.forEach(function (prop) {
          const options = { shell: true, stdio: ['ignore', 'ignore', 'inherit'], cwd: prop.folder };
          const command = `git init && git remote add origin ${prop.url}`;
          spawn(command, { ...options });
        });
        this.initialized = true;
      }
    },
  };
  return {
    initializeGitRepo: function initializeGitRepo(args) {
      _git.set(args);
      _git.runInitialization();
      const results = _git.retrieveResults();
      return results;
    },
  };
})();
