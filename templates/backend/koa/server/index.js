module.exports = function () {
  return `import app from './config/app.mjs';
import util from 'util';
import http from 'http';

const server = http.createServer(app.callback());

process.on('uncaughtException', function uncaughtException(error) {
  console.log('Api world crashed' + error.stack || error);
});

process.on('unhandledRejection', function unhandledRejection(reason, promise) {
  console.log(\`unhandled rejection at \${util.inspect(promise)} reason \${reason}\`);
});

process.on('SIGINT', function signalInt() {
  console.log(\`Shutting down the services of Api\`);
  server.close(function close() {
    process.exit(1);
  });
});

(async function startApp() {
  await server.listen(process.env.SERVER_PORT);
  console.log('server is up and running');
})();
  
  `;
};
