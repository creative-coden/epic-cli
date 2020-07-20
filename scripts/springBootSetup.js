const child_process = require('child_process');
const os = require('os');
const { resolve } = require('path');

const where = os.platform() === ('linux' || 'darwin') ? 'which' : 'where';

function childProcess(command, args) {
    console.log(command.split(' ')[0], '---', command.split(' ')[1])
    return child_process.spawn(command.split(' ')[0], [command.split(' ')[1]]);
}
function dependencyCheck(chunk, dependency) {
    console.log('chunk', chunk);
    if (!chunk.trim().length) {
        return dependency;
    }
    return;
}
function executeSpringCommand(appName) {
    const projectPath = resolve(__dirname, '../../');
    console.log('appName', appName, '---', projectPath)
    const spring = child_process.spawn(`spring init --dependencies=web,data-jpa,h2 --package-name=com.dashboard.aidashboard --name=${appName} ${appName}`, {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
        detached: true,
        cwd: projectPath
    })
    spring.unref();

}
module.exports = function springBootSetup(appName) {
    const springCLIDependencies = [`${where} java`, `${where} mvn`, `${where} spring`];
    const missingDependencies = [];
    let child;
    springCLIDependencies.forEach(async function cliDependency(dependency) {
        child = childProcess(dependency);
        let chunk;
        try {
            for await (const data of child.stdout) {
                chunk += data;
            }
        } catch (error) {
            console.log('error is ', error);
        }
        let isMissing = dependencyCheck(chunk, dependency);
        if (isMissing) {
            missingDependencies.push(isMissing);
        }
    })
    child.on('exit', function () {
        console.log('isdependencyExists', missingDependencies);
        if (missingDependencies.length === 0)
            executeSpringCommand(appName);
    });
}
