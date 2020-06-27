const child_process = require('child_process');
const os = require('os');
const where = os.platform() === ('linux' || 'darwin' )? 'which' : 'where';
const checkJavaIsInstalled = function checkJavaIsInstalled() {
    const java = child_process.spawn(where, ['java']);
    java.on('close', function onClose(signal) {
        console.log(signal);
    });
    java.stderr.on('error', function javaError(error) {
        console.log('java path error:', error);
    });
}

const checkMavenIsInstalled = function checkMavenIsInstalled() {
    const maven = child_process.spawn(where, ['mvn']);
    maven.on('close', function onClose(signal) {
        console.log(signal);
    });
    maven.stderr.on('error', function mavenError(error) {
        console.log('Maven path error:', error);
    });
}

const checkSpringCLIIsInstalled = function checkSpringCLIIsInstalled() {
    const springCLI = child_process.spawn(where, ['spring']);
    springCLI.on('close', function onClose(signal) {
        console.log(signal);
    });
    springCLI.stderr.on('error', function springCLIError(error) {
        console.log('springCLI path error:', error);
    });
}

module.exports = function springBootSetup() {
    checkJavaIsInstalled();
    checkMavenIsInstalled();
    checkSpringCLIIsInstalled();
}
