const child_process = require('child_process');
const os = require('os');
const { resolve } = require('path');
const fsPromise = require('fs').promises;

const where = os.platform() === ('linux' || 'darwin') ? 'which' : 'where';

function childProcess(command) {
  return child_process.spawn(command.split(' ')[0], [command.split(' ')[1]]);
}

function dependencyCheck(chunk, dependency) {
  if (!chunk) {
    return dependency;
  }
  return;
}

function executeSpringCommand(appName) {
  const projectPath = resolve(__dirname, '../../');
  child_process.spawn(
    `spring init --dependencies=web,data-jpa,h2 --package-name=com.dashboard.aidashboard --name=${appName} ${appName}`,
    {
      shell: true,
      stdio: 'inherit',
      cwd: projectPath,
    },
  );
}

function unameCheck() {
  const linux = child_process.spawn('uname');
  return new Promise(function (resolve, reject) {
    linux.stdout.on('data', function (data) {
      resolve(data);
    });
  });
}


async function linuxDependencyInstallation() {
  const directory = resolve(__dirname, './installDependencies.sh');
  try {
    await fsPromise.chmod(directory, 0o755);
    await child_process.spawn(directory, { stdio: 'inherit' });
  } catch (error) {
    console.error(error);
  }
}

function displayMissingDependencyMessage(missingDependencies) {
  missingDependencies.forEach(function (dependency) {
    console.log('❌'.padStart(2, ' ').concat(dependency.split(' ')[1]));
  });
}

module.exports = function springBootSetup(appName) {
  const springCLIDependencies = [`${where} java`, `${where} mvn`, `${where} spring`];
  const missingDependencies = [];
  let child;
  springCLIDependencies.forEach(async function cliDependency(dependency) {
    child = childProcess(dependency);
    let chunk;
    for await (const data of child.stdout) {
      try {
        chunk += data;
      } catch (error) {
        console.log('error is ', error);
      }
    }
    let isMissing = dependencyCheck(chunk, dependency);
    if (isMissing) {
      missingDependencies.push(isMissing);
    }
  });

  child.on('exit', function () {
    if (missingDependencies.length === 0) {
      return executeSpringCommand(appName);
    }

    if (missingDependencies.length > 0) {
      unameCheck()
        .then(function (response) {
          if (response.toString().trim() === 'Linux') {
            return linuxDependencyInstallation();
          }
          return displayMissingDependencyMessage(missingDependencies);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
};
