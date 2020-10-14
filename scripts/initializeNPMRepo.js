const { spawn } = require('child_process');

module.exports = (function initializeNPMRepo() {
  const _npm = {
    completed: false,
    appSetup: null,
    appDirectories: [],
    initialized: false,
    set: function set(args) {
      this.appSetup = Object.assign({}, args);
      switch (this.appSetup.setup.toLowerCase()) {
        case 'both':
          this.appDirectories = [].concat(this.appSetup.clientDirectory, this.appSetup.serverDirectory);
          return;
        case 'frontend':
          this.appDirectories = [].concat(this.appSetup.clientDirectory);
          return;
        case 'backend':
          this.appDirectories.push(this.appSetup.serverDirectory);
          return;
        default:
          throw new Error('Error with app setup configuration');
      }
    },
    retrieveResults: function retrieveResults() {
      return this.appSetup;
    },
    runInitialization: function runInitialization() {
      this.appDirectories.forEach(function (folder) {
        const options = { shell: true, stdio: ['ignore', 'ignore', 'inherit'], cwd: folder };
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
    initializeNPMRepo: function initializeNPMRepo(args) {
      if (_npm.isCompleted()) return;
      _npm.set(args);
      _npm.runInitialization();
      const results = _npm.retrieveResults();
      _npm.setCompleted();
      return results;
    },
  };
})();
