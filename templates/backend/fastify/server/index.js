module.exports = function () {
  return `import env from "dotenv";
import util from "util";
import app from "./server/config/app";
import { config } from "./server/config/config";

env.config();

process.on("uncaughtException", function uncaughtException(error) {
  app.log.error(\`\${config.appName} crashed \${error.stack} || \${error}\`);
});

process.on("unhandledRejection", function unhandledRejection(reason, promise) {
  app.log.error(\`unhandled rejection at \${util.inspect(promise)} reason \${reason}\`);
});

process.on("SIGINT", async function signalInt() {
  app.log.info(\`Shutting down the services of \${config.appName}\`);
  app.close().then(function close() {
    app.log.info("successfully closed!");
  }, function(err) {
    app.log.error("an error happened", err);
  });
});

(async function start() {
  try {
    const address = await app.listen(config.port, "0.0.0.0");
    app.log.info(\`\${config.appName} is up and listening on \${address}\`);
  } catch (error) {
    app.log.error(\`Error starting server \${error}\`);
    process.exit(1);
  }
})();`;
};
